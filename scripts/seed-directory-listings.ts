import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface DirectoryData {
  name: string;
  description: string;
  category: string;
  address: string;
  state: string;
  city: string;
  phone: string;
  email: string;
  website: string;
}

/**
 * Directory listings data - Sample premium and standard listings
 */
const directoriesToAdd: DirectoryData[] = [
  // Lagos-based services
  {
    name: 'Lawson Business Services',
    description:
      'Professional CAC registration and business setup services in Lagos',
    category: 'Business Registration',
    address: '123 Broad Street, Lagos Island',
    state: 'Lagos',
    city: 'Lagos',
    phone: '+234-8033-445-566',
    email: 'info@lawsonbusiness.com',
    website: 'https://lawsonbusiness.com',
  },
  {
    name: 'Trusted Accounting Solutions',
    description: 'Tax compliance, bookkeeping, and VAT registration services',
    category: 'Accounting & Tax',
    address: '456 Lekki Phase 1, Lagos',
    state: 'Lagos',
    city: 'Lekki',
    phone: '+234-7045-123-789',
    email: 'support@trustedaccounting.com',
    website: 'https://trustedaccounting.com',
  },
  {
    name: 'Delta Immigration Consultants',
    description:
      'Expert passport application, visa processing, and travel documentation',
    category: 'Immigration & Travel',
    address: '789 Victoria Island, Lagos',
    state: 'Lagos',
    city: 'Lagos',
    phone: '+234-8129-456-123',
    email: 'consult@deltaimmigration.com',
    website: 'https://deltaimmigration.com',
  },

  // Abuja-based services
  {
    name: 'Central Federal Estate Consultants',
    description: 'Property registration, title processing, and legal documentation',
    category: 'Property & Real Estate',
    address: '321 Central Business District, Abuja',
    state: 'Abuja',
    city: 'Abuja',
    phone: '+234-8050-123-456',
    email: 'info@centralestateabuja.com',
    website: 'https://centralestateabuja.com',
  },
  {
    name: 'Abuja School Placement Services',
    description:
      'School registration, admission processing, and educational consulting',
    category: 'Education Services',
    address: '654 Wuse 2, Abuja',
    state: 'Abuja',
    city: 'Wuse',
    phone: '+234-8012-789-456',
    email: 'placements@abujaschools.com',
    website: 'https://abujaschools.com',
  },

  // Kano-based services
  {
    name: 'Northern Region Trade Licenses',
    description:
      'Trade license registration and LGA documentation services across Northern Nigeria',
    category: 'Government Services',
    address: '987 Sabon Gari, Kano',
    state: 'Kano',
    city: 'Kano',
    phone: '+234-8065-234-567',
    email: 'help@northerntradelicenses.com',
    website: 'https://northerntradelicenses.com',
  },

  // Ogun State services
  {
    name: 'Abeokuta Business Formation',
    description:
      'One-stop shop for business name registration and legal entity formation',
    category: 'Business Formation',
    address: '234 Idi-Aba, Abeokuta',
    state: 'Ogun',
    city: 'Abeokuta',
    phone: '+234-8076-345-678',
    email: 'setup@abeokuatabusiness.com',
    website: 'https://abeokuatabusiness.com',
  },

  // Rivers State services
  {
    name: 'Port Harcourt Cooperative Society Registration',
    description:
      'Cooperative formation, registration, and development services in Rivers State',
    category: 'Cooperative Services',
    address: '456 GRA, Port Harcourt',
    state: 'Rivers',
    city: 'Port Harcourt',
    phone: '+234-8089-456-789',
    email: 'info@phcooperatives.com',
    website: 'https://phcooperatives.com',
  },

  // Enugu State services
  {
    name: 'Enugu Civil Documentation Services',
    description: 'Birth certificates, marriage registration, and civil documents',
    category: 'Civil Services',
    address: '789 Independence Layout, Enugu',
    state: 'Enugu',
    city: 'Enugu',
    phone: '+234-8091-567-890',
    email: 'civil@enuguservices.com',
    website: 'https://enuguservices.com',
  },

  // Online/National services
  {
    name: 'National FIRS TIN Registration Hub',
    description: 'Fast-track Tax Identification Number registration and support',
    category: 'Tax Services',
    address: 'Online Service - Multiple Locations',
    state: 'Federal',
    city: 'Various',
    phone: '+234-1-270-0555',
    email: 'support@firshub.ng',
    website: 'https://firshub.ng',
  },
  {
    name: 'Nigeria Import-Export Clearing Consultants',
    description: 'Customs clearance, HS coding, and import documentation services',
    category: 'Import/Export',
    address: 'Lagos Port Complex, Apapa',
    state: 'Lagos',
    city: 'Apapa',
    phone: '+234-8012-111-222',
    email: 'customs@nigeriaimportexport.com',
    website: 'https://nigeriaimportexport.com',
  },

  // Premium services (marked as premium)
  {
    name: 'Elite Business Formations - Premium',
    description:
      'VIP business registration package with personal account manager and priority processing',
    category: 'Business Registration',
    address: '100 Lekki Plaza, Lagos',
    state: 'Lagos',
    city: 'Lekki',
    phone: '+234-8100-888-999',
    email: 'vip@eliteformations.com',
    website: 'https://eliteformations.com',
  },
];

async function seedDirectories() {
  console.log('📚 Seeding directory listings...');

  try {
    for (const dirData of directoriesToAdd) {
      console.log(`📋 Processing: ${dirData.name}`);

      // Check if listing already exists
      const existing = await prisma.directoryListing.findFirst({
        where: { name: dirData.name },
      });

      if (existing) {
        console.log(`   ⏭️ Already exists, skipping...`);
        continue;
      }

      // Create listing
      const isPremium = dirData.name.includes('Premium') || dirData.name.includes('Elite');

      const listing = await prisma.directoryListing.create({
        data: {
          name: dirData.name,
          description: dirData.description,
          category: dirData.category,
          address: dirData.address,
          state: dirData.state,
          city: dirData.city,
          phone: dirData.phone,
          email: dirData.email,
          website: dirData.website,
          verified: Math.random() > 0.5, // Random verification status
          premium: isPremium,
        },
      });

      console.log(`   ✅ Created ${isPremium ? '(Premium)' : '(Standard)'}`);
    }

    console.log(
      `\n✨ Successfully seeded ${directoriesToAdd.length} directory listings!`
    );

    // Get statistics
    const total = await prisma.directoryListing.count();
    const premium = await prisma.directoryListing.count({
      where: { premium: true },
    });
    const verified = await prisma.directoryListing.count({
      where: { verified: true },
    });

    console.log('\n📊 Directory Statistics:');
    console.log(`   Total listings: ${total}`);
    console.log(`   Premium listings: ${premium}`);
    console.log(`   Verified listings: ${verified}`);
  } catch (error) {
    console.error('❌ Error seeding directories:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedDirectories();
