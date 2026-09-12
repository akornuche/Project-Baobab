import { NextRequest, NextResponse } from 'next/server';
import { getMeiliClient } from '@/lib/meilisearch';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const index = searchParams.get('index') || 'guides';
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100);
    const offset = parseInt(searchParams.get('offset') || '0');
    const domain = searchParams.get('domain');
    const state = searchParams.get('state');
    const category = searchParams.get('category');

    if (!query || query.length < 2) {
      return NextResponse.json({ results: [], total: 0, query: '' });
    }

    // Validate index name
    if (!['guides', 'directories'].includes(index)) {
      return NextResponse.json({ error: 'Invalid index' }, { status: 400 });
    }

    const client = getMeiliClient();
    if (!client) {
      return NextResponse.json({ error: 'Search service unavailable' }, { status: 503 });
    }

    // Build filter array
    const filters = [];
    if (index === 'guides' && domain) {
      filters.push(`domain = "${domain}"`);
    }
    if (index === 'directories' && state) {
      filters.push(`state = "${state}"`);
    }
    if (index === 'directories' && category) {
      filters.push(`category = "${category}"`);
    }

    const searchOptions: any = {
      limit,
      offset,
      attributesToHighlight: ['title', 'subtitle', 'description', 'name'],
      highlightPreTag: '<mark>',
      highlightPostTag: '</mark>',
    };

    // Add filters if present
    if (filters.length > 0) {
      searchOptions.filter = filters.join(' AND ');
    }

    // Add facets for faceted search
    if (index === 'guides') {
      searchOptions.facets = ['domain', 'subdomain', 'verified'];
    } else if (index === 'directories') {
      searchOptions.facets = ['category', 'state', 'verified', 'premium'];
    }

    const searchResult = await client.index(index).search(query, searchOptions);

    return NextResponse.json({
      results: searchResult.hits,
      total: searchResult.totalHits,
      facetDistribution: searchResult.facetDistribution || {},
      query,
      index,
    });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Search failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
