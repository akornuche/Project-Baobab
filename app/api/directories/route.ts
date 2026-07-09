import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const state = searchParams.get('state');
    const city = searchParams.get('city');
    const premium = searchParams.get('premium');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');

    const where: any = { isDeleted: false };

    if (category) {
      where.category = category;
    }

    if (state) {
      where.state = state;
    }

    if (city) {
      where.city = city;
    }

    if (premium === 'true') {
      where.premium = true;
    }

    const directories = await prisma.directoryListing.findMany({
      where,
      take: limit,
      skip: offset,
      orderBy: {
        createdAt: 'desc',
      },
    });

    const total = await prisma.directoryListing.count({ where });
    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({ directories, total, totalPages });
  } catch (error) {
    console.error('Error fetching directories:', error);
    return NextResponse.json({ error: 'Failed to fetch directories' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { name, description, category, address, state, city, phone, email, website, guideId } = data;

    if (!name || !category || !state) {
      return NextResponse.json(
        { error: 'Missing required fields: name, category, state' },
        { status: 400 }
      );
    }

    const directory = await prisma.directoryListing.create({
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
        guideId,
        verified: false,
        premium: false,
      },
    });

    return NextResponse.json({ directory }, { status: 201 });
  } catch (error) {
    console.error('Error creating directory:', error);
    return NextResponse.json({ error: 'Failed to create directory' }, { status: 500 });
  }
}