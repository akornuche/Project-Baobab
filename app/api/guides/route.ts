import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const domainId = searchParams.get('domainId');
    const subdomainId = searchParams.get('subdomainId');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');

    const where: any = { isDeleted: false };

    if (domainId) {
      where.domainId = domainId;
    }

    if (subdomainId) {
      where.subdomainId = subdomainId;
    }

    const guides = await prisma.guide.findMany({
      where,
      include: {
        domain: true,
        subdomain: true,
      },
      take: limit,
      skip: offset,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ guides });
  } catch (error) {
    console.error('Error fetching guides:', error);
    return NextResponse.json({ error: 'Failed to fetch guides' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { title, slug, domainId, subdomainId, content, reviewerId } = data;

    if (!title || !slug || !domainId || !subdomainId) {
      return NextResponse.json(
        { error: 'Missing required fields: title, slug, domainId, subdomainId' },
        { status: 400 }
      );
    }

    const guide = await prisma.guide.create({
      data: {
        title,
        slug,
        domainId,
        subdomainId,
        content: content || {},
        reviewerId,
      },
    });

    return NextResponse.json({ guide }, { status: 201 });
  } catch (error) {
    console.error('Error creating guide:', error);
    return NextResponse.json({ error: 'Failed to create guide' }, { status: 500 });
  }
}