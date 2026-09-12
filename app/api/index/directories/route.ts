import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { indexDirectoryBatch, indexDirectory } from '@/lib/meilisearch-indexing';

const prisma = new PrismaClient();

/**
 * GET /api/index/directories
 * Manually trigger directory indexing (admin only)
 */
export async function GET(request: NextRequest) {
  try {
    // TODO: Add auth check for admin users

    // Fetch all verified, non-deleted directories
    const directories = await prisma.directoryListing.findMany({
      where: {
        verified: true,
        isDeleted: false,
      },
    });

    if (directories.length === 0) {
      return NextResponse.json({ message: 'No directories to index', indexed: 0 });
    }

    // Index all directories
    await indexDirectoryBatch(directories);

    return NextResponse.json({
      message: 'Directories indexed successfully',
      indexed: directories.length,
      directories: directories.map((d) => ({ id: d.id, name: d.name, category: d.category })),
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
 * POST /api/index/directories
 * Index a specific directory
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { directoryId } = body;

    if (!directoryId) {
      return NextResponse.json({ error: 'directoryId required' }, { status: 400 });
    }

    const directory = await prisma.directoryListing.findUnique({
      where: { id: directoryId },
    });

    if (!directory) {
      return NextResponse.json({ error: 'Directory not found' }, { status: 404 });
    }

    // Only index verified directories
    if (!directory.verified) {
      return NextResponse.json({ error: 'Directory not verified' }, { status: 400 });
    }

    await indexDirectory(directory);

    return NextResponse.json({
      message: 'Directory indexed successfully',
      directory: { id: directory.id, name: directory.name, category: directory.category },
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
