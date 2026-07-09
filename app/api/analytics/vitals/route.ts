import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Web Vitals Analytics Endpoint
 * Records Core Web Vitals metrics for analysis and optimization
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      LCP,
      FID,
      CLS,
      FCP,
      TTFB,
      INP,
      timestamp,
      url,
      userAgent,
    } = body;

    // Store vitals data (could also be sent to external analytics service)
    // For now, we'll log it and could expand to database storage
    const vitalsData = {
      timestamp: new Date(timestamp),
      url,
      userAgent,
      LCP: LCP || null,
      FID: FID || null,
      CLS: CLS || null,
      FCP: FCP || null,
      TTFB: TTFB || null,
      INP: INP || null,
    };

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Web Vitals:', vitalsData);
    }

    // TODO: Store in database if needed
    // await prisma.pageVitals.create({ data: vitalsData });

    return NextResponse.json({
      success: true,
      message: 'Vitals recorded successfully',
    });
  } catch (error) {
    console.error('Error recording web vitals:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to record vitals' },
      { status: 500 }
    );
  }
}

/**
 * GET endpoint to retrieve vitals analytics
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const days = parseInt(searchParams.get('days') || '7');

    // In a real implementation, query from database
    // For now, return sample data structure
    const analyticsData = {
      period: `Last ${days} days`,
      totalPageViews: 0,
      averageVitals: {
        LCP: null,
        FID: null,
        CLS: null,
        INP: null,
      },
      distribution: {
        good: 0,
        needsImprovement: 0,
        poor: 0,
      },
    };

    return NextResponse.json({
      success: true,
      data: analyticsData,
    });
  } catch (error) {
    console.error('Error fetching vitals analytics:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
