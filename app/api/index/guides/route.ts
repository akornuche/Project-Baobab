import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { indexGuideBatch, indexGuide } from '@/lib/meilisearch-indexing';

const prisma = new PrismaClient();

/**
 * GET /api/index/guides
 * Manually trigger guide indexing (admin only)
 */
export async function GET(request: NextRequest) {
  try {
    // TODO: Add auth check for admin users
    const reindex = request.nextUrl.searchParams.get('reindex') === 'true';

    // Fetch all published, non-deleted guides
    const guides = await prisma.guide.findMany({
      where: {
        published: true,
        isDeleted: false,
      },
      include: {
        domain: true,
        subdomain: true,
      },
    });

    if (guides.length === 0) {
      return NextResponse.json({ message: 'No guides to index', indexed: 0 });
    }

    // Index all guides
    await indexGuideBatch(guides);

    return NextResponse.json({
      message: 'Guides indexed successfully',
      indexed: guides.length,
      guides: guides.map((g) => ({ id: g.id, slug: g.slug, title: g.title })),
    });
  } catch (error) {
    console.error('Indexing error:', error);
    return NextResponse.json(
      { error: 'Indexing failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

/**
 * POST /api/index/guides
 * Index a specific guide
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { guideId } = body;

    if (!guideId) {
      return NextResponse.json({ error: 'guideId required' }, { status: 400 });
    }

    const guide = await prisma.guide.findUnique({
      where: { id: guideId },
      include: {
        domain: true,
        subdomain: true,
      },
    });

    if (!guide) {
      return NextResponse.json({ error: 'Guide not found' }, { status: 404 });
    }

    // Only index published guides
    if (!guide.published) {
      return NextResponse.json({ error: 'Guide not published' }, { status: 400 });
    }

    await indexGuide(guide);

    return NextResponse.json({
      message: 'Guide indexed successfully',
      guide: { id: guide.id, slug: guide.slug, title: guide.title },
    });
  } catch (error) {
    console.error('Indexing error:', error);
    return NextResponse.json(
      { error: 'Indexing failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
