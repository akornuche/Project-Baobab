import { PrismaClient } from '@prisma/client';
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';

const prisma = new PrismaClient();

interface AuditResult {
  category: string;
  status: 'pass' | 'warning' | 'fail';
  message: string;
  details?: string[];
}

const auditResults: AuditResult[] = [];

function addResult(
  category: string,
  status: 'pass' | 'warning' | 'fail',
  message: string,
  details?: string[]
) {
  auditResults.push({ category, status, message, details });
}

async function auditMetadata() {
  console.log('\n📋 Auditing Metadata Configuration...');

  // Check for metadata files
  const metadataFiles = [
    'lib/metadata-builder.ts',
    'lib/seo.ts',
    'app/layout.tsx',
  ];

  for (const file of metadataFiles) {
    const filePath = resolve(file);
    if (existsSync(filePath)) {
      addResult('Metadata', 'pass', `✅ ${file} exists`);
    } else {
      addResult('Metadata', 'fail', `❌ ${file} missing`);
    }
  }
}

async function auditStructuredData() {
  console.log('🏗️ Auditing Structured Data...');

  const schemaFiles = [
    'components/SEO/StructuredData.tsx',
    'components/SEO/CalculatorSchema.tsx',
  ];

  for (const file of schemaFiles) {
    const filePath = resolve(file);
    if (existsSync(filePath)) {
      addResult(
        'Structured Data',
        'pass',
        `✅ ${file} exists`
      );
    } else {
      addResult('Structured Data', 'fail', `❌ ${file} missing`);
    }
  }
}

async function auditRobotsAndSitemap() {
  console.log('🤖 Auditing Robots.txt & Sitemap...');

  const robotsFile = resolve('app/robots.ts');
  const sitemapFile = resolve('app/sitemap.ts');

  if (existsSync(robotsFile)) {
    addResult('Robots & Sitemap', 'pass', '✅ robots.ts exists');
  } else {
    addResult('Robots & Sitemap', 'fail', '❌ robots.ts missing');
  }

  if (existsSync(sitemapFile)) {
    addResult('Robots & Sitemap', 'pass', '✅ sitemap.ts exists');
  } else {
    addResult('Robots & Sitemap', 'fail', '❌ sitemap.ts missing');
  }
}

async function auditOGImages() {
  console.log('🖼️ Auditing OG Image Generation...');

  const ogImageRoute = resolve('app/og-images/[slug]/route.tsx');
  const ogImageManager = resolve('lib/og-image-manager.ts');

  if (existsSync(ogImageRoute)) {
    addResult(
      'OG Images',
      'pass',
      '✅ OG image generation route exists'
    );
  } else {
    addResult('OG Images', 'fail', '❌ OG image route missing');
  }

  if (existsSync(ogImageManager)) {
    addResult('OG Images', 'pass', '✅ OG image manager utility exists');
  } else {
    addResult('OG Images', 'warning', '⚠️ OG image manager utility missing');
  }
}

async function auditImageOptimization() {
  console.log('🎨 Auditing Image Optimization...');

  const optimizedImageComponent = resolve('components/SEO/OptimizedImage.tsx');
  const altTextManager = resolve('lib/alt-text-manager.ts');

  if (existsSync(optimizedImageComponent)) {
    addResult(
      'Image Optimization',
      'pass',
      '✅ OptimizedImage component exists'
    );
  } else {
    addResult('Image Optimization', 'fail', '❌ OptimizedImage missing');
  }

  if (existsSync(altTextManager)) {
    addResult('Image Optimization', 'pass', '✅ Alt text manager exists');
  } else {
    addResult('Image Optimization', 'fail', '❌ Alt text manager missing');
  }
}

async function auditAnalytics() {
  console.log('📊 Auditing Analytics Integration...');

  const analyticsLib = resolve('lib/analytics.ts');
  const webVitalsLib = resolve('lib/web-vitals.ts');
  const ga4Component = resolve('components/Analytics/GA4Tracker.tsx');
  const vitalsComponent = resolve('components/Analytics/WebVitalsMonitor.tsx');

  if (existsSync(analyticsLib)) {
    addResult('Analytics', 'pass', '✅ GA4 library exists');
  } else {
    addResult('Analytics', 'warning', '⚠️ GA4 library missing');
  }

  if (existsSync(webVitalsLib)) {
    addResult('Analytics', 'pass', '✅ Web Vitals library exists');
  } else {
    addResult('Analytics', 'fail', '❌ Web Vitals library missing');
  }

  if (existsSync(ga4Component)) {
    addResult('Analytics', 'pass', '✅ GA4Tracker component exists');
  } else {
    addResult('Analytics', 'warning', '⚠️ GA4Tracker component missing');
  }

  if (existsSync(vitalsComponent)) {
    addResult('Analytics', 'pass', '✅ WebVitalsMonitor component exists');
  } else {
    addResult('Analytics', 'fail', '❌ WebVitalsMonitor missing');
  }
}

async function auditContent() {
  console.log('📚 Auditing Content...');

  try {
    const guides = await prisma.guide.count({ where: { published: true } });
    const tools = await prisma.tool.count();
    const directories = await prisma.directoryListing.count({
      where: { isDeleted: false },
    });

    if (guides >= 15) {
      addResult(
        'Content',
        'pass',
        `✅ ${guides} published guides available`
      );
    } else {
      addResult(
        'Content',
        'warning',
        `⚠️ Only ${guides} guides (target: 15+)`
      );
    }

    if (tools >= 5) {
      addResult('Content', 'pass', `✅ ${tools} calculator tools available`);
    } else {
      addResult('Content', 'warning', `⚠️ Only ${tools} tools (target: 5+)`);
    }

    if (directories >= 5) {
      addResult(
        'Content',
        'pass',
        `✅ ${directories} directory listings`
      );
    } else {
      addResult(
        'Content',
        'warning',
        `⚠️ Only ${directories} listings (target: 5+)`
      );
    }
  } catch (error) {
    addResult('Content', 'fail', '❌ Error checking content');
  }
}

async function auditInternalLinking() {
  console.log('🔗 Auditing Internal Linking...');

  const internalLinksComponent = resolve('components/SEO/InternalLinks.tsx');
  const relatedContentAPI = resolve('app/api/related-content/route.ts');

  if (existsSync(internalLinksComponent)) {
    addResult(
      'Internal Linking',
      'pass',
      '✅ Internal links component exists'
    );
  } else {
    addResult(
      'Internal Linking',
      'warning',
      '⚠️ Internal links component missing'
    );
  }

  if (existsSync(relatedContentAPI)) {
    addResult('Internal Linking', 'pass', '✅ Related content API exists');
  } else {
    addResult(
      'Internal Linking',
      'warning',
      '⚠️ Related content API missing'
    );
  }
}

async function auditPerformance() {
  console.log('⚡ Auditing Performance...');

  const cacheUtil = resolve('lib/cache.ts');
  const nextConfig = resolve('next.config.ts');

  if (existsSync(cacheUtil)) {
    addResult(
      'Performance',
      'pass',
      '✅ Caching utility exists'
    );
  } else {
    addResult(
      'Performance',
      'warning',
      '⚠️ Caching utility missing'
    );
  }

  if (existsSync(nextConfig)) {
    addResult(
      'Performance',
      'pass',
      '✅ Next.js config with optimizations exists'
    );
  } else {
    addResult('Performance', 'warning', '⚠️ Next.js config missing');
  }
}

async function generateReport() {
  console.log('\n' + '='.repeat(60));
  console.log('🔍 BAOBAB SEO AUDIT REPORT');
  console.log('='.repeat(60));

  await auditMetadata();
  await auditStructuredData();
  await auditRobotsAndSitemap();
  await auditOGImages();
  await auditImageOptimization();
  await auditAnalytics();
  await auditContent();
  await auditInternalLinking();
  await auditPerformance();

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 AUDIT SUMMARY');
  console.log('='.repeat(60));

  const passes = auditResults.filter((r) => r.status === 'pass').length;
  const warnings = auditResults.filter((r) => r.status === 'warning').length;
  const fails = auditResults.filter((r) => r.status === 'fail').length;

  console.log(`\n✅ Passed: ${passes}`);
  console.log(`⚠️  Warnings: ${warnings}`);
  console.log(`❌ Failed: ${fails}`);

  // Group by category
  console.log('\n' + '='.repeat(60));
  console.log('📑 RESULTS BY CATEGORY');
  console.log('='.repeat(60));

  const categories = [...new Set(auditResults.map((r) => r.category))];
  for (const category of categories) {
    const results = auditResults.filter((r) => r.category === category);
    const categoryStatus = results.some((r) => r.status === 'fail')
      ? '❌'
      : results.some((r) => r.status === 'warning')
        ? '⚠️'
        : '✅';

    console.log(`\n${categoryStatus} ${category}`);
    results.forEach((r) => {
      console.log(`   ${r.message}`);
      if (r.details) {
        r.details.forEach((d) => console.log(`      • ${d}`));
      }
    });
  }

  // Score
  const totalChecks = auditResults.length;
  const score = Math.round(((passes + warnings / 2) / totalChecks) * 100);

  console.log('\n' + '='.repeat(60));
  console.log(`📈 SEO SCORE: ${score}%`);
  console.log('='.repeat(60));

  if (score >= 90) {
    console.log('🌟 Excellent! Your SEO implementation is comprehensive.');
  } else if (score >= 70) {
    console.log('✅ Good! Address the warnings to improve further.');
  } else if (score >= 50) {
    console.log('⚠️  Fair - Consider implementing the missing components.');
  } else {
    console.log('❌ Needs improvement - Address failed items.');
  }

  console.log('\n' + '='.repeat(60));
}

async function runAudit() {
  try {
    await generateReport();
  } catch (error) {
    console.error('Error running audit:', error);
  } finally {
    await prisma.$disconnect();
  }
}

runAudit();
