import { NextRequest, NextResponse } from 'next/server';
import { getMeiliClient } from '@/lib/meilisearch';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const index = searchParams.get('index') || 'guides';
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    if (!query || query.length < 2) {
      return NextResponse.json({ results: [], total: 0 });
    }

    const client = getMeiliClient();
    if (!client) {
      return NextResponse.json({ error: 'Meilisearch not configured' }, { status: 503 });
    }

    const searchResult = await client.index(index).search(query, {
      limit,
      offset,
      attributesToHighlight: ['*'],
      highlightPreTag: '<mark>',
      highlightPostTag: '</mark>',
    });

    return NextResponse.json({ results: searchResult.hits, total: searchResult.totalHits });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}