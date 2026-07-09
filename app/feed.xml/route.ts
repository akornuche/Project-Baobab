import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const guides = await prisma.guide.findMany({
    where: { isDeleted: false, published: true },
    include: { domain: true, subdomain: true, reviewer: true },
    orderBy: { publishedAt: 'desc' },
    take: 50,
  });

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Baobab Nigeria - Latest Guides</title>
    <link>https://baobab.ng</link>
    <description>Step-by-step guides to accomplish administrative, business, and life tasks in Nigeria</description>
    <language>en-ng</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="https://baobab.ng/feed.xml" rel="self" type="application/rss+xml" />
    ${guides
      .map(
        (guide) => `
    <item>
      <title>${escapeXml(guide.title)}</title>
      <link>https://baobab.ng/guides/${guide.slug}</link>
      <guid isPermaLink="true">https://baobab.ng/guides/${guide.slug}</guid>
      <description>${escapeXml(guide.description || guide.subtitle || '')}</description>
      <content:encoded><![CDATA[
        <p>${escapeXml(guide.description || guide.subtitle || '')}</p>
        <p><strong>Domain:</strong> ${escapeXml(guide.domain.name)}</p>
        <p><strong>Subdomain:</strong> ${escapeXml(guide.subdomain.name)}</p>
        ${guide.reviewer ? `<p><strong>Verified by:</strong> ${escapeXml(guide.reviewer.name || '')}</p>` : ''}
        <p><a href="https://baobab.ng/guides/${guide.slug}">Read full guide</a></p>
      ]]></content:encoded>
      <author>${escapeXml(guide.reviewer?.email || 'guides@baobab.ng')}</author>
      <category>${escapeXml(guide.domain.name)}</category>
      <pubDate>${guide.publishedAt?.toUTCString() || guide.createdAt.toUTCString()}</pubDate>
    </item>
    `
      )
      .join('')}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}

function escapeXml(str: string): string {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
