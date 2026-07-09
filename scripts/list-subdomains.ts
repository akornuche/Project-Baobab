import { PrismaClient } from '@prisma/client';

const p = new PrismaClient();

async function listSubdomains() {
  const subdomains = await p.subdomain.findMany({
    include: { domain: true },
  });

  console.log('Available Subdomains:');
  subdomains.forEach((s) => {
    console.log(`${s.domain.slug}/${s.slug}`);
  });

  await p.$disconnect();
}

listSubdomains().catch((e) => {
  console.error(e);
  process.exit(1);
});
