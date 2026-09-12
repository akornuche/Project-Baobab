import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * GET /api/directory/subscriptions/[id]
 * Get subscription details
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const subscription = await prisma.directorySubscription.findUnique({
      where: { id },
      include: {
        listing: true,
      },
    });

    if (!subscription) {
      return NextResponse.json(
        { error: 'Subscription not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(subscription);
  } catch (error) {
    console.error('Error fetching subscription:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subscription' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

/**
 * PATCH /api/directory/subscriptions/[id]
 * Update subscription (mark as paid, etc.)
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { paymentStatus, transactionId, invoiceUrl, autoRenew } = body;

    const subscription = await prisma.directorySubscription.findUnique({
      where: { id },
    });

    if (!subscription) {
      return NextResponse.json(
        { error: 'Subscription not found' },
        { status: 404 }
      );
    }

    // Update subscription
    const updated = await prisma.directorySubscription.update({
      where: { id },
      data: {
        ...(paymentStatus && { paymentStatus }),
        ...(transactionId && { transactionId }),
        ...(invoiceUrl && { invoiceUrl }),
        ...(autoRenew !== undefined && { autoRenew }),
      },
    });

    // If payment completed, update listing tier
    if (paymentStatus === 'COMPLETED') {
      await prisma.directoryListing.update({
        where: { id: subscription.listingId },
        data: {
          premiumTier: subscription.tier,
          premium: subscription.tier !== 'free',
          premiumStartDate: subscription.startDate,
          premiumEndDate: subscription.endDate,
        },
      });
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating subscription:', error);
    return NextResponse.json(
      { error: 'Failed to update subscription' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

/**
 * DELETE /api/directory/subscriptions/[id]
 * Cancel subscription
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { reason } = body;

    const subscription = await prisma.directorySubscription.findUnique({
      where: { id },
    });

    if (!subscription) {
      return NextResponse.json(
        { error: 'Subscription not found' },
        { status: 404 }
      );
    }

    // Cancel subscription
    const cancelled = await prisma.directorySubscription.update({
      where: { id },
      data: {
        cancelledAt: new Date(),
        cancellationReason: reason || 'User requested',
        autoRenew: false,
      },
    });

    // If was the active subscription, revert listing to free tier
    const activeSub = await prisma.directorySubscription.findFirst({
      where: {
        listingId: subscription.listingId,
        cancelledAt: null,
        paymentStatus: 'COMPLETED',
      },
    });

    if (!activeSub) {
      await prisma.directoryListing.update({
        where: { id: subscription.listingId },
        data: {
          premiumTier: 'free',
          premium: false,
          premiumStartDate: null,
          premiumEndDate: null,
        },
      });
    }

    return NextResponse.json({ message: 'Subscription cancelled', cancelled });
  } catch (error) {
    console.error('Error cancelling subscription:', error);
    return NextResponse.json(
      { error: 'Failed to cancel subscription' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
