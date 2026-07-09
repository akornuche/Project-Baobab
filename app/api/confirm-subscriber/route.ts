import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

/**
 * Send confirmation email with token
 */
export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Check if subscriber exists
    const subscriber = await prisma.emailSubscriber.findUnique({
      where: { email },
    });

    if (!subscriber) {
      return NextResponse.json(
        { error: 'Email not found' },
        { status: 404 }
      );
    }

    // If already confirmed, return success
    if (subscriber.confirmedAt) {
      return NextResponse.json({
        message: 'Email already confirmed',
        alreadyConfirmed: true,
      });
    }

    // Generate new confirmation token
    const confirmationToken = uuidv4();
    
    await prisma.emailSubscriber.update({
      where: { email },
      data: {
        confirmationToken,
        updatedAt: new Date(),
      },
    });

    // In production, send actual email
    // For now, log to console
    const confirmationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/confirm-subscriber?token=${confirmationToken}`;
    
    console.log(`📧 Confirmation email for ${email}:`);
    console.log(`   URL: ${confirmationUrl}`);
    console.log(`   Token: ${confirmationToken}`);

    return NextResponse.json({
      message: 'Confirmation email sent (mock)',
      token: confirmationToken,
    });
  } catch (error) {
    console.error('Error sending confirmation:', error);
    return NextResponse.json(
      { error: 'Failed to send confirmation' },
      { status: 500 }
    );
  }
}

/**
 * Verify confirmation token and confirm email
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { error: 'Token is required' },
        { status: 400 }
      );
    }

    // Find subscriber by token
    const subscriber = await prisma.emailSubscriber.findUnique({
      where: { confirmationToken: token },
    });

    if (!subscriber) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 404 }
      );
    }

    // Update subscriber as confirmed
    await prisma.emailSubscriber.update({
      where: { id: subscriber.id },
      data: {
        confirmedAt: new Date(),
        confirmationToken: null, // Clear token after use
        isActive: true,
        updatedAt: new Date(),
      },
    });

    // Redirect to success page
    const successUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001'}/confirmed?email=${subscriber.email}`;
    
    return NextResponse.json({
      success: true,
      redirect: successUrl,
    });
  } catch (error) {
    console.error('Error confirming email:', error);
    return NextResponse.json(
      { error: 'Failed to confirm email' },
      { status: 500 }
    );
  }
}
