import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();

function hashIP(ip: string | null): string | null {
  if (!ip) return null;
  return crypto.createHash('sha256').update(ip).digest('hex');
}

/**
 * POST /api/ads/track/click
 * Track an ad click
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { adId } = body;

    if (!adId) {
      return NextResponse.json(
        { error: 'adId is required' },
        { status: 400 }
      );
    }

    // Verify ad exists and is active
    const ad = await prisma.advertisement.findUnique({
      where: { id: adId },
    });

    if (!ad || ad.isDeleted || ad.status !== 'ACTIVE') {
      return NextResponse.json(
        { error: 'Advertisement not found or inactive' },
        { status: 404 }
      );
    }

    // Get client info
    const userAgent = request.headers.get('user-agent') || undefined;
    const referrer = request.headers.get('referer') || undefined;
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               undefined;

    // Record click
    await prisma.adClick.create({
      data: {
        adId,
        userAgent,
        referrer,
        ipHash: hashIP(ip ?? null),
      },
    });

    // Update ad metrics
    const updatedAd = await prisma.advertisement.update({
      where: { id: adId },
      data: {
        clicks: { increment: 1 },
      },
    });

    // Update campaign metrics
    await prisma.adCampaign.update({
      where: { id: ad.campaignId },
      data: {
        totalClicks: { increment: 1 },
      },
    });

    // Calculate and update CTR
    if (updatedAd.impressions > 0) {
      const ctr = (updatedAd.clicks / updatedAd.impressions) * 100;
      await prisma.advertisement.update({
        where: { id: adId },
        data: { ctr },
      });
    }

    return NextResponse.json(
      { 
        message: 'Click tracked', 
        clicks: updatedAd.clicks,
        linkUrl: ad.linkUrl,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error tracking click:', error);
    return NextResponse.json(
      { error: 'Failed to track click' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
