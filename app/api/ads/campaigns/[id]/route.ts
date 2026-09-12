import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * GET /api/ads/campaigns/[id]
 * Get a specific campaign with all ads
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const campaign = await prisma.adCampaign.findUnique({
      where: { id },
      include: {
        ads: {
          where: { isDeleted: false },
          include: {
            impressionEvents: { take: 100 },
            clickEvents: { take: 100 },
          },
        },
      },
    });

    if (!campaign || campaign.isDeleted) {
      return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
    }

    return NextResponse.json(campaign);
  } catch (error) {
    console.error('Error fetching campaign:', error);
    return NextResponse.json(
      { error: 'Failed to fetch campaign' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

/**
 * PUT /api/ads/campaigns/[id]
 * Update a campaign
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();

    const campaign = await prisma.adCampaign.findUnique({ where: { id } });
    if (!campaign || campaign.isDeleted) {
      return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
    }

    const updated = await prisma.adCampaign.update({
      where: { id },
      data: {
        title: body.title || campaign.title,
        description: body.description !== undefined ? body.description : campaign.description,
        advertiserName: body.advertiserName || campaign.advertiserName,
        advertiserEmail: body.advertiserEmail || campaign.advertiserEmail,
        advertiserPhone: body.advertiserPhone || campaign.advertiserPhone,
        advertiserUrl: body.advertiserUrl || campaign.advertiserUrl,
        status: body.status || campaign.status,
        budget: body.budget !== undefined ? parseFloat(body.budget) : campaign.budget,
      },
      include: { ads: true },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating campaign:', error);
    return NextResponse.json(
      { error: 'Failed to update campaign' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

/**
 * DELETE /api/ads/campaigns/[id]
 * Soft delete a campaign
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const campaign = await prisma.adCampaign.findUnique({ where: { id } });
    if (!campaign || campaign.isDeleted) {
      return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
    }

    await prisma.adCampaign.update({
      where: { id },
      data: { isDeleted: true },
    });

    return NextResponse.json({ message: 'Campaign deleted' });
  } catch (error) {
    console.error('Error deleting campaign:', error);
    return NextResponse.json(
      { error: 'Failed to delete campaign' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
