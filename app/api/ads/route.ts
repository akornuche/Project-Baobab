import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const zone = searchParams.get('zone');
    const size = searchParams.get('size');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Mock ads data (in production, this would come from database)
    const mockAds = [
      {
        id: 'ad-1',
        zone: 'header',
        size: 'leaderboard',
        imageUrl: 'https://placehold.co/728x90/e2e8f0/475569?text=Header+Ad',
        alt: 'Premium Header Advertisement',
        link: 'https://example.com/ad1',
        startTime: new Date('2026-01-01'),
        endTime: new Date('2027-01-01'),
        impressionCount: 0,
        clickCount: 0,
        premium: false,
        verified: true,
      },
      {
        id: 'ad-2',
        zone: 'sidebar',
        size: 'skyscraper',
        imageUrl: 'https://placehold.co/300x600/e2e8f0/475569?text=Sidebar+Ad',
        alt: 'Sidebar Advertisement',
        link: 'https://example.com/ad2',
        startTime: new Date('2026-01-01'),
        endTime: new Date('2027-01-01'),
        impressionCount: 0,
        clickCount: 0,
        premium: false,
        verified: true,
      },
      {
        id: 'ad-3',
        zone: 'content',
        size: 'medium_rectangle',
        imageUrl: 'https://placehold.co/300x250/e2e8f0/475569?text=Content+Ad',
        alt: 'Content Advertisement',
        link: 'https://example.com/ad3',
        startTime: new Date('2026-01-01'),
        endTime: new Date('2027-01-01'),
        impressionCount: 0,
        clickCount: 0,
        premium: false,
        verified: true,
      },
    ];

    let filteredAds = mockAds;

    // Apply filters
    if (zone) {
      filteredAds = filteredAds.filter(ad => ad.zone === zone);
    }

    if (size) {
      filteredAds = filteredAds.filter(ad => ad.size === size);
    }

    // Paginate
    const total = filteredAds.length;
    const paginatedAds = filteredAds.slice(offset, offset + limit);

    return NextResponse.json({ ads: paginatedAds, total, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    console.error('Error fetching ads:', error);
    return NextResponse.json({ error: 'Failed to fetch ads' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { zone, size, imageUrl, alt, link, startTime, endTime, premium } = data;

    if (!zone || !size) {
      return NextResponse.json(
        { error: 'Missing required fields: zone, size' },
        { status: 400 }
      );
    }

    // In production, this would create an ad in the database
    const newAd = {
      id: `ad-${Date.now()}`,
      zone,
      size,
      imageUrl: imageUrl || null,
      alt: alt || 'Advertisement',
      link: link || null,
      startTime: startTime || new Date(),
      endTime: endTime || new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      impressionCount: 0,
      clickCount: 0,
      premium: premium || false,
      verified: true,
      createdAt: new Date(),
    };

    return NextResponse.json({ ad: newAd }, { status: 201 });
  } catch (error) {
    console.error('Error creating ad:', error);
    return NextResponse.json({ error: 'Failed to create ad' }, { status: 500 });
  }
}