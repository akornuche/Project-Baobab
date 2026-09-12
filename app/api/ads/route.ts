import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * GET /api/ads
 * Get ads for a specific zone or all ads
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const zone = searchParams.get('zone');
    const size = searchParams.get('size');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    const whereClause: any = {
      isDeleted: false,
      status: 'ACTIVE',
      campaign: {
        status: 'ACTIVE',
        isDeleted: false,
      },
    };

    if (zone) {
      whereClause.zone = zone;
    }
    if (size) {
      whereClause.size = size;
    }

    const [ads, total] = await Promise.all([
      prisma.advertisement.findMany({
        where: whereClause,
        include: {
          campaign: true,
        },
        orderBy: [
          { priority: 'desc' },
          { createdAt: 'desc' },
        ],
        take: limit,
        skip: offset,
      }),
      prisma.advertisement.count({ where: whereClause }),
    ]);

    return NextResponse.json({
      ads,
      total,
      limit,
      offset,
    });
  } catch (error) {
    console.error('Error fetching ads:', error);
    return NextResponse.json(
      { error: 'Failed to fetch ads' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

/**
 * POST /api/ads
 * Create a new advertisement
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      campaignId,
      title,
      imageUrl,
      linkUrl,
      altText,
      zone,
      size,
      priority,
    } = body;

    if (!campaignId || !title) {
      return NextResponse.json(
        { error: 'Missing required fields: campaignId, title' },
        { status: 400 }
      );
    }

    // Verify campaign exists
    const campaign = await prisma.adCampaign.findUnique({
      where: { id: campaignId },
    });

    if (!campaign) {
      return NextResponse.json(
        { error: 'Campaign not found' },
        { status: 404 }
      );
    }

    const ad = await prisma.advertisement.create({
      data: {
        campaignId,
        title,
        imageUrl,
        linkUrl,
        altText,
        zone: zone || 'content',
        size: size || 'medium_rectangle',
        priority: priority ? parseInt(priority) : 0,
        status: 'ACTIVE',
      },
      include: { campaign: true },
    });

    return NextResponse.json(ad, { status: 201 });
  } catch (error) {
    console.error('Error creating ad:', error);
    return NextResponse.json(
      { error: 'Failed to create advertisement' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
