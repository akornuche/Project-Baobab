import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * GET /api/directory/reviews
 * Get reviews for a listing
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const listingId = searchParams.get('listingId');
    const status = searchParams.get('status') || 'APPROVED';
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    if (!listingId) {
      return NextResponse.json(
        { error: 'listingId is required' },
        { status: 400 }
      );
    }

    const [reviews, total] = await Promise.all([
      prisma.directoryReview.findMany({
        where: {
          listingId,
          status: status === 'ALL' ? undefined : status,
        },
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset,
      }),
      prisma.directoryReview.count({
        where: {
          listingId,
          status: status === 'ALL' ? undefined : status,
        },
      }),
    ]);

    return NextResponse.json({
      reviews,
      total,
      limit,
      offset,
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

/**
 * POST /api/directory/reviews
 * Create a new review
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { listingId, rating, title, comment, reviewer, email } = body;

    if (!listingId || !rating) {
      return NextResponse.json(
        { error: 'Missing required fields: listingId, rating' },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    // Verify listing exists
    const listing = await prisma.directoryListing.findUnique({
      where: { id: listingId },
    });

    if (!listing) {
      return NextResponse.json(
        { error: 'Listing not found' },
        { status: 404 }
      );
    }

    // Create review
    const review = await prisma.directoryReview.create({
      data: {
        listingId,
        rating,
        title,
        comment,
        reviewer,
        email,
        status: 'PENDING', // Reviews require moderation
      },
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error('Error creating review:', error);
    return NextResponse.json(
      { error: 'Failed to create review' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
