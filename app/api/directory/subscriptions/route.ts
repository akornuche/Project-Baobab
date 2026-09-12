import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { calculateSubscriptionEndDate, getTierPricing } from '@/lib/directory-pricing';

const prisma = new PrismaClient();

/**
 * GET /api/directory/subscriptions
 * Get subscriptions for a listing
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const listingId = searchParams.get('listingId');
    const status = searchParams.get('status');

    if (!listingId) {
      return NextResponse.json(
        { error: 'listingId is required' },
        { status: 400 }
      );
    }

    const whereClause: any = { listingId };
    if (status) whereClause.paymentStatus = status;

    const subscriptions = await prisma.directorySubscription.findMany({
      where: whereClause,
      orderBy: { startDate: 'desc' },
    });

    return NextResponse.json({ subscriptions });
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subscriptions' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

/**
 * POST /api/directory/subscriptions
 * Create a new subscription (initiate upgrade)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { listingId, tier, billingPeriod = 'monthly' } = body;

    if (!listingId || !tier) {
      return NextResponse.json(
        { error: 'Missing required fields: listingId, tier' },
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

    // Get pricing
    const pricing = getTierPricing(tier, billingPeriod as any);
    if (!pricing) {
      return NextResponse.json(
        { error: 'Invalid tier' },
        { status: 400 }
      );
    }

    // Cancel any existing active subscriptions
    await prisma.directorySubscription.updateMany({
      where: {
        listingId,
        cancelledAt: null,
        paymentStatus: 'COMPLETED',
      },
      data: {
        cancelledAt: new Date(),
        cancellationReason: 'Replaced by new subscription',
      },
    });

    // Create new subscription
    const startDate = new Date();
    const endDate = calculateSubscriptionEndDate(startDate, billingPeriod as any);

    const subscription = await prisma.directorySubscription.create({
      data: {
        listingId,
        tier,
        startDate,
        endDate,
        autoRenew: true,
        paymentStatus: 'PENDING',
        amountPaid: pricing.price,
      },
    });

    return NextResponse.json(subscription, { status: 201 });
  } catch (error) {
    console.error('Error creating subscription:', error);
    return NextResponse.json(
      { error: 'Failed to create subscription' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
