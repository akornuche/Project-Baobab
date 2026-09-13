import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

/**
 * Related Content API
 * Finds relevant guides, calculators, and directories based on current page context
 */
export async function POST(request: NextRequest) {
  try {
    const { currentUrl, currentType, currentCategory, limit = 3 } =
      await request.json();

    let relatedContent: any[] = [];

    if (currentType === 'guide') {
      // Find related guides by category and subdomain
      const guideName = currentUrl.split('/').pop();
      const currentGuide = await prisma.guide.findUnique({
        where: { slug: guideName },
        select: { domainId: true, subdomainId: true },
      });

      if (currentGuide) {
        // Get guides from same domain or subdomain
        const guides = await prisma.guide.findMany({
          where: {
            AND: [
              { isDeleted: false },
              { published: true },
              {
                OR: [
                  { domainId: currentGuide.domainId },
                  { subdomainId: currentGuide.subdomainId },
                ],
              },
              { slug: { not: guideName } },
            ],
          },
          include: { domain: true },
          take: limit,
        });

        relatedContent = guides.map((guide) => ({
          title: guide.title,
          url: `/guides/${guide.slug}`,
          description: guide.subtitle || guide.description?.slice(0, 100),
          type: 'guide',
          category: guide.domain.name,
        }));
      }
    } else if (currentType === 'calculator') {
      // Find related calculators and guides
      const calculators = await prisma.tool.findMany({
        where: {},
        take: limit - 1,
      });

      const relevantGuides = await prisma.guide.findMany({
        where: {
          isDeleted: false,
          published: true,
          toolId: { not: null },
        },
        include: { tool: true },
        take: 1,
      });

      relatedContent = [
        ...calculators.map((tool) => ({
          title: tool.name,
          url: `/calculators/${tool.id}`,
          description: undefined,
          type: 'calculator',
        })),
        ...relevantGuides.map((guide) => ({
          title: guide.title,
          url: `/guides/${guide.slug}`,
          description: guide.subtitle?.slice(0, 100),
          type: 'guide',
          category: 'Related Guide',
        })),
      ].slice(0, limit);
    } else if (currentType === 'directory') {
      // Find related directory listings
      const listings = await prisma.directoryListing.findMany({
        where: { isDeleted: false },
        take: limit,
      });

      relatedContent = listings.map((listing) => ({
        title: listing.name,
        url: `/directory/${listing.id}`,
        description: listing.description?.slice(0, 100),
        type: 'directory',
        category: listing.category,
      }));
    }

    return NextResponse.json({
      success: true,
      content: relatedContent,
    });
  } catch (error) {
    console.error('Error fetching related content:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch related content' },
      { status: 500 }
    );
  }
}
