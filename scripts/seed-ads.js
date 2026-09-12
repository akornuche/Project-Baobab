/**
 * Seed ads with sample campaigns and advertisements
 */

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seedAds() {
  try {
    console.log('\n🎯 Seeding ads infrastructure...\n');

    // Create sample campaigns
    const campaign1 = await prisma.adCampaign.upsert({
      where: { id: 'sample-campaign-1' },
      update: {},
      create: {
        id: 'sample-campaign-1',
        title: 'Q3 2026 Business Tools Campaign',
        description: 'Promoting business registration and compliance tools',
        advertiserName: 'BusinessPro Nigeria',
        advertiserEmail: 'campaigns@businesspro.ng',
        advertiserPhone: '+2348012345678',
        advertiserUrl: 'https://businesspro.ng',
        startDate: new Date('2026-09-01'),
        endDate: new Date('2026-09-30'),
        budget: 1000000,
        status: 'ACTIVE',
      },
    });
    console.log(`✓ Created campaign: ${campaign1.title}`);

    const campaign2 = await prisma.adCampaign.upsert({
      where: { id: 'sample-campaign-2' },
      update: {},
      create: {
        id: 'sample-campaign-2',
        title: 'Education Platform Launch',
        description: 'Promoting education and scholarship opportunities',
        advertiserName: 'EduConnect Nigeria',
        advertiserEmail: 'info@educonnect.ng',
        advertiserPhone: '+2348098765432',
        advertiserUrl: 'https://educonnect.ng',
        startDate: new Date('2026-09-15'),
        endDate: new Date('2026-10-15'),
        budget: 750000,
        status: 'DRAFT',
      },
    });
    console.log(`✓ Created campaign: ${campaign2.title}`);

    // Create ads for campaign 1
    const ads = [
      {
        campaignId: campaign1.id,
        title: 'Register Your Business Today',
        imageUrl: 'https://placehold.co/728x90/3b82f6/ffffff?text=Register+Your+Business',
        linkUrl: 'https://businesspro.ng/register',
        altText: 'Business registration banner',
        zone: 'header',
        size: 'leaderboard',
        priority: 10,
      },
      {
        campaignId: campaign1.id,
        title: 'CAC Registration Made Easy',
        imageUrl: 'https://placehold.co/300x250/3b82f6/ffffff?text=CAC+Registration',
        linkUrl: 'https://businesspro.ng/cac',
        altText: 'CAC registration advertisement',
        zone: 'content',
        size: 'medium_rectangle',
        priority: 9,
      },
      {
        campaignId: campaign1.id,
        title: 'Compliance Solutions',
        imageUrl: 'https://placehold.co/300x600/3b82f6/ffffff?text=Compliance',
        linkUrl: 'https://businesspro.ng/compliance',
        altText: 'Business compliance tools',
        zone: 'sidebar',
        size: 'skyscraper',
        priority: 8,
      },
      {
        campaignId: campaign1.id,
        title: 'Get Professional Tax Help',
        imageUrl: 'https://placehold.co/300x250/10b981/ffffff?text=Tax+Services',
        linkUrl: 'https://businesspro.ng/tax',
        altText: 'Professional tax services',
        zone: 'infeed',
        size: 'medium_rectangle',
        priority: 7,
      },
    ];

    for (const adData of ads) {
      const ad = await prisma.advertisement.create({
        data: {
          ...adData,
          status: 'ACTIVE',
        },
      });
      console.log(`✓ Created ad: ${ad.title} (${ad.zone} - ${ad.size})`);
    }

    // Create ads for campaign 2 (unpublished)
    const eduAds = [
      {
        campaignId: campaign2.id,
        title: 'Scholarship Opportunities',
        imageUrl: 'https://placehold.co/728x90/8b5cf6/ffffff?text=Scholarships+Available',
        linkUrl: 'https://educonnect.ng/scholarships',
        altText: 'Scholarship opportunities banner',
        zone: 'header',
        size: 'leaderboard',
        priority: 10,
      },
      {
        campaignId: campaign2.id,
        title: 'Find Your Ideal Course',
        imageUrl: 'https://placehold.co/300x250/8b5cf6/ffffff?text=Course+Finder',
        linkUrl: 'https://educonnect.ng/courses',
        altText: 'Course finder tool',
        zone: 'content',
        size: 'medium_rectangle',
        priority: 9,
      },
    ];

    for (const adData of eduAds) {
      const ad = await prisma.advertisement.create({
        data: {
          ...adData,
          status: 'ACTIVE',
        },
      });
      console.log(`✓ Created ad: ${ad.title} (${ad.zone} - ${ad.size})`);
    }

    // Add some sample tracking data to first ad
    const firstAd = ads[0];
    const ad = await prisma.advertisement.findFirst({
      where: {
        campaignId: campaign1.id,
        title: firstAd.title,
      },
    });

    if (ad) {
      // Create mock impressions
      const impressionPromises = [];
      for (let i = 0; i < 150; i++) {
        impressionPromises.push(
          prisma.adImpression.create({
            data: {
              adId: ad.id,
              userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
              referrer: 'https://baobab.ng/guides',
              ipHash: 'mock-hash-' + i,
            },
          })
        );
      }
      await Promise.all(impressionPromises);

      // Create mock clicks
      const clickPromises = [];
      for (let i = 0; i < 15; i++) {
        clickPromises.push(
          prisma.adClick.create({
            data: {
              adId: ad.id,
              userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
              referrer: 'https://baobab.ng/guides',
              ipHash: 'mock-hash-click-' + i,
            },
          })
        );
      }
      await Promise.all(clickPromises);

      // Update ad metrics
      await prisma.advertisement.update({
        where: { id: ad.id },
        data: {
          impressions: 150,
          clicks: 15,
          ctr: (15 / 150) * 100,
        },
      });

      // Update campaign metrics
      await prisma.adCampaign.update({
        where: { id: campaign1.id },
        data: {
          totalImpressions: 150,
          totalClicks: 15,
        },
      });

      console.log(`✓ Added 150 sample impressions and 15 clicks`);
    }

    console.log('\n✨ Ad seeding completed successfully!');
    console.log(`   - 2 campaigns created`);
    console.log(`   - 6 advertisements created`);
    console.log(`   - Sample tracking data added\n`);
  } catch (error) {
    console.error('❌ Error seeding ads:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seedAds();
