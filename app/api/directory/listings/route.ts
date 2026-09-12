import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * GET /api/directory/listings
 * Get directory listings with filtering and pagination
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const state = searchParams.get('state');
    const city = searchParams.get('city');
    const premiumOnly = searchParams.get('premiumOnly') === 'true';
    const verifiedOnly = searchParams.get('verifiedOnly') === 'true';
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    const whereClause: any = { isDeleted: false };

    if (category) whereClause.category = category;
    if (state) whereClause.state = state;
    if (city) whereClause.city = city;
    if (premiumOnly) whereClause.premium = true;
    if (verifiedOnly) whereClause.verified = true;

    const [listings, total] = await Promise.all([
      prisma.directoryListing.findMany({
        where: whereClause,
        include: {
          subscriptions: {
            where: { paymentStatus: 'COMPLETED', cancelledAt: null },
            orderBy: { startDate: 'desc' },
            take: 1,
          },
        },
        orderBy: [
          { premium: 'desc' },
          { rating: 'desc' },
          { createdAt: 'desc' },
        ],
        take: limit,
        skip: offset,
      }),
      prisma.directoryListing.count({ where: whereClause }),
    ]);

    return NextResponse.json({
      listings,
      total,
      limit,
      offset,
    });
  } catch (error) {
    console.error('Error fetching listings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch listings' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

/**
 * POST /api/directory/listings
 * Create a new directory listing
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      description,
      category,
      address,
      state,
      city,
      phone,
      email,
      website,
    } = body;

    if (!name || !category || !state || !city) {
      return NextResponse.json(
        { error: 'Missing required fields: name, category, state, city' },
        { status: 400 }
      );
    }

    const listing = await prisma.directoryListing.create({
      data: {
        name,
        description,
        category,
        address,
        state,
        city,
        phone,
        email,
        website,
        premiumTier: 'free',
      },
      include: {
        subscriptions: true,
      },
    });

    return NextResponse.json(listing, { status: 201 });
  } catch (error) {
    console.error('Error creating listing:', error);
    return NextResponse.json(
      { error: 'Failed to create listing' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
