import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Subscribe to newsletter
 */
export async function POST(request: NextRequest) {
  try {
    const { email, name, source } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check if subscriber already exists
    const existing = await prisma.emailSubscriber.findUnique({
      where: { email },
    });

    if (existing) {
      if (existing.unsubscribedAt) {
        // Re-subscribe
        await prisma.emailSubscriber.update({
          where: { email },
          data: {
            unsubscribedAt: null,
            isActive: true,
            source: source || existing.source,
            updatedAt: new Date(),
          },
        });

        return NextResponse.json({
          message: 'Successfully re-subscribed',
          subscribed: true,
        });
      }

      return NextResponse.json({
        message: 'Already subscribed',
        subscribed: false,
      });
    }

    // Create new subscriber
    const subscriber = await prisma.emailSubscriber.create({
      data: {
        email,
        name: name || undefined,
        source: source || undefined,
      },
    });

    return NextResponse.json({
      message: 'Successfully subscribed',
      subscribed: true,
      subscriber: {
        id: subscriber.id,
        email: subscriber.email,
        name: subscriber.name,
      },
    });
  } catch (error) {
    console.error('Error subscribing:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    );
  }
}

/**
 * Get all subscribers (admin only)
 */
export async function GET(request: NextRequest) {
  try {
    // In production, add authentication check
    const subscribers = await prisma.emailSubscriber.findMany({
      orderBy: {
        subscribedAt: 'desc',
      },
      select: {
        id: true,
        email: true,
        name: true,
        subscribedAt: true,
        source: true,
        isActive: true,
      },
    });

    return NextResponse.json({
      success: true,
      subscribers,
    });
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subscribers' },
      { status: 500 }
    );
  }
}

/**
 * Unsubscribe from newsletter
 */
export async function DELETE(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const subscriber = await prisma.emailSubscriber.update({
      where: { email },
      data: {
        unsubscribedAt: new Date(),
        isActive: false,
      },
    });

    return NextResponse.json({
      message: 'Successfully unsubscribed',
      unsubscribed: true,
    });
  } catch (error) {
    console.error('Error unsubscribing:', error);
    return NextResponse.json(
      { error: 'Failed to unsubscribe' },
      { status: 500 }
    );
  }
}
