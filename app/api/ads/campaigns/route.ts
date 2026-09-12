import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * GET /api/ads/campaigns
 * Retrieve ad campaigns with filters
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    const whereClause: any = { isDeleted: false };
    if (status) {
      whereClause.status = status;
    }

    const [campaigns, total] = await Promise.all([
      prisma.adCampaign.findMany({
        where: whereClause,
        include: {
          ads: {
            where: { isDeleted: false },
          },
        },
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset,
      }),
      prisma.adCampaign.count({ where: whereClause }),
    ]);

    return NextResponse.json({
      campaigns,
      total,
      limit,
      offset,
    });
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    return NextResponse.json(
      { error: 'Failed to fetch campaigns' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

/**
 * POST /api/ads/campaigns
 * Create a new ad campaign
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      description,
      advertiserName,
      advertiserEmail,
      advertiserPhone,
      advertiserUrl,
      startDate,
      endDate,
      budget,
    } = body;

    if (!title || !advertiserName || !startDate || !endDate) {
      return NextResponse.json(
        { error: 'Missing required fields: title, advertiserName, startDate, endDate' },
        { status: 400 }
      );
    }

    const campaign = await prisma.adCampaign.create({
      data: {
        title,
        description,
        advertiserName,
        advertiserEmail,
        advertiserPhone,
        advertiserUrl,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        budget: budget ? parseFloat(budget) : null,
        status: 'DRAFT',
      },
    });

    return NextResponse.json(campaign, { status: 201 });
  } catch (error) {
    console.error('Error creating campaign:', error);
    return NextResponse.json(
      { error: 'Failed to create campaign' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
