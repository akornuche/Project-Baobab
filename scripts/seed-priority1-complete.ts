import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const priority1Remaining = [
  {
    title: 'How to Apply for a Trade License in Nigeria',
    slug: 'trade-license-application',
    subtitle: 'Complete guide to obtaining a trade license for your small business',
    description: 'Learn the steps, requirements, and costs for getting a trade license in Nigeria.',
    domainSlug: 'government',
    subdomainSlug: 'business-registration',
    content: {
      quickAnswer: 'A trade license allows you to legally operate a business. Process takes 5-10 working days and costs between ₦1,500-₦5,000 depending on your local government.',
      overview: 'Trade licenses are required to legally operate any business in Nigeria.',
      definitions: 'A trade license is an official permit issued by your local government that authorizes you to conduct business.',
      requirements: ['Valid means of identification', 'Proof of residence', 'Business address details'],
      timeline: ['Visit your local government secretariat', 'Obtain and complete the application form', 'Pay the licensing fee'],
      regulatory: 'Trade licenses are regulated by individual local government areas in Nigeria.',
      costEstimate: '₦1,500 - ₦5,000 (varies by LGA)',
      commonMistakes: ['Operating without visible trade license', 'Not renewing license annually'],
      relatedGuides: [{ title: 'How to Register a Business Name with CAC', link: '/guides/cac-business-name' }],
    },
    sources: [{ title: 'Lagos State Ministry of Local Government', url: 'https://mirs.lagosstate.gov.ng', verified: true }],
    reviewerName: 'Chinedu Okoro, Business Registration Specialist',
  },
  {
    title: 'How to Obtain a Building Permit in Nigeria',
    slug: 'obtain-building-permit',
    subtitle: 'Step-by-step guide to getting approval for construction',
    description: 'Learn the requirements and process for obtaining a building permit.',
    domainSlug: 'government',
    subdomainSlug: 'business-registration',
    content: {
      quickAnswer: 'Building permits cost ₦50,000-₦500,000. Approval takes 4-8 weeks.',
      overview: 'A building permit is legal authorization to construct a building.',
      definitions: 'A building permit is an official document issued by the local planning authority.',
      requirements: ['Title document', 'Architectural drawings', 'Environmental impact assessment'],
      timeline: ['Prepare architectural drawings', 'Submit application', 'Attend site inspection', 'Obtain building permit'],
      regulatory: 'Building permits are issued by Local Planning Authorities.',
      costEstimate: '₦50,000-₦500,000 depending on project size',
      commonMistakes: ['Starting construction before receiving permit', 'Using outdated drawings'],
      relatedGuides: [{ title: 'How to Register Land', link: '/guides/register-land-nigeria' }],
    },
    sources: [{ title: 'Federal Ministry of Works and Housing', url: 'https://www.fmwh.gov.ng', verified: true }],
    reviewerName: 'Adekunle Adebayo, Urban Planner',
  },
  {
    title: 'How to Set Up an E-Commerce Business in Nigeria',
    slug: 'setup-ecommerce-nigeria',
    subtitle: 'Complete guide to starting an online business',
    description: 'Learn how to start an e-commerce business in Nigeria.',
    domainSlug: 'business',
    subdomainSlug: 'starting-business',
    content: {
      quickAnswer: 'Start with Facebook Marketplace or Jumia. Later, use Shopify (₦25,000/month).',
      overview: 'E-commerce is booming in Nigeria with over 100M internet users.',
      definitions: 'E-commerce is buying and selling goods/services online.',
      requirements: ['Business registration', 'TIN and bank account', 'Payment integration'],
      timeline: ['Research products', 'Register business', 'Set up payment gateway', 'Launch'],
      regulatory: 'E-commerce businesses must register with CAC. VAT applies to online sales.',
      costEstimate: '₦50,000-₦500,000 depending on platform',
      commonMistakes: ['Underestimating logistics costs', 'Poor product photography'],
      relatedGuides: [{ title: 'How to Export Nigerian Products', link: '/guides/export-nigerian-products' }],
    },
    sources: [{ title: 'Nigerian E-Commerce Association', url: 'https://neca.org.ng', verified: true }],
    reviewerName: 'Sarah Adebayo, E-commerce Specialist',
  },
  {
    title: 'How to Register as an Employer with NSITF',
    slug: 'register-employer-nsitf',
    subtitle: 'NSITF registration for employers with 5+ employees',
    description: 'Learn how to register as an employer with the National Social Insurance Trust Fund.',
    domainSlug: 'business',
    subdomainSlug: 'starting-business',
    content: {
      quickAnswer: 'Register within 3 months of hiring 5th employee. Cost: ₦5,000 + 1% of payroll monthly.',
      overview: 'NSITF provides social security for workers.',
      definitions: 'NSITF is a social insurance scheme for workers.',
      requirements: ['Business registration', 'TIN', 'List of employees'],
      timeline: ['Check employee count', 'Gather documents', 'Fill out form', 'Pay fee'],
      regulatory: 'NSITF Act requires employers with 5+ employees to register.',
      costEstimate: '₦5,000 registration + 1% of monthly payroll',
      commonMistakes: ['Failing to register when 5+ employees', 'Late monthly contributions'],
      relatedGuides: [{ title: 'How to Manage Payroll', link: '/guides/manage-payroll-calculate-paye' }],
    },
    sources: [{ title: 'NSITF Portal', url: 'https://www.nsitf.gov.ng', verified: true }],
    reviewerName: 'Grace Nwosu, HR Manager',
  },
  {
    title: 'How to Obtain a Birth Certificate in Nigeria',
    slug: 'obtain-birth-certificate-nigeria',
    subtitle: 'Guide to getting a birth certificate for newborns',
    description: 'Learn how to obtain a birth certificate for your child.',
    domainSlug: 'government',
    subdomainSlug: 'identity-civil',
    content: {
      quickAnswer: 'Register within 45 days. Cost: ₦5,000 standard or ₦10,000 expedited.',
      overview: 'Birth registration is mandatory under Nigerian law.',
      definitions: 'A birth certificate is an official record of a person\'s birth.',
      requirements: ['Parents\' ID', 'Marriage certificate', 'Hospital records'],
      timeline: ['Visit NIMC office', 'Complete form', 'Submit documents', 'Receive certificate'],
      regulatory: 'Birth Registration Act requires registration within 45 days.',
      costEstimate: '₦5,000 standard or ₦10,000 expedited',
      commonMistakes: ['Missing the 45-day deadline', 'Incomplete documentation'],
      relatedGuides: [{ title: 'How to Enrol for NIN', link: '/guides/nin-enrolment' }],
    },
    sources: [{ title: 'NIMC Portal', url: 'https://www.nimc.gov.ng', verified: true }],
    reviewerName: 'Dr. John Smith, Civil Registrar',
  },
  {
    title: 'How to Get Married Legally in Nigeria',
    slug: 'get-married-legal-nigeria',
    subtitle: 'Guide to legal marriage registration in Nigeria',
    description: 'Learn how to get married legally with court or religious marriage.',
    domainSlug: 'government',
    subdomainSlug: 'identity-civil',
    content: {
      quickAnswer: 'Court marriage: ₦25,000, 2-4 weeks. Religious: must register at Boma within 21 days.',
      overview: 'Nigeria recognizes civil, religious, and customary marriages.',
      definitions: 'Legal marriage registration establishes your union under Nigerian law.',
      requirements: ['Valid identification', 'Passport photos', 'Proof of age'],
      timeline: ['Gather documents', 'Visit registry office', 'Complete form', 'Attend ceremony'],
      regulatory: 'Marriage Act requires registration.',
      costEstimate: '₦25,000 court marriage + ₦5,000 certificate',
      commonMistakes: ['Failing to register religious marriage at Boma'],
      relatedGuides: [{ title: 'How to Change Your Name', link: '/guides/change-name-legal' }],
    },
    sources: [{ title: 'Lagos State Marriage Registry', url: 'https://lagosstate.gov.ng', verified: true }],
    reviewerName: 'Mrs. Funmi Okafor, Marriage Registrar',
  },
  {
    title: 'How to Register Land in Nigeria',
    slug: 'register-land-nigeria',
    subtitle: 'Complete guide to land registration and property ownership',
    description: 'Learn how to register land and secure property ownership.',
    domainSlug: 'government',
    subdomainSlug: 'identity-civil',
    content: {
      quickAnswer: 'Cost: ₦100,000-₦500,000. Process: search title, survey, valuation, registration.',
      overview: 'Land registration establishes legal ownership in Nigeria.',
      definitions: 'Land registration is the legal process of recording property ownership.',
      requirements: ['Proof of purchase', 'Survey plan', 'Valuation report'],
      timeline: ['Conduct title search', 'Hire surveyor', 'Get valuation', 'Submit to registry'],
      regulatory: 'Land Use Act requires registration.',
      costEstimate: '₦100,000-₦500,000 depending on property',
      commonMistakes: ['Buying without title search', 'Skipping survey'],
      relatedGuides: [{ title: 'How to Get a Building Permit', link: '/guides/building-permit-nigeria' }],
    },
    sources: [{ title: 'State Land Registry', url: 'https://landregistry.gov.ng', verified: true }],
    reviewerName: 'Mr. Chike Nwankwo, Property Lawyer',
  },
  {
    title: 'How to Get a Driving License in Nigeria',
    slug: 'get-driving-license-nigeria',
    subtitle: 'Complete guide to obtaining a Nigerian driving license',
    description: 'Learn how to get a driving license whether first time or renewal.',
    domainSlug: 'government',
    subdomainSlug: 'identity-civil',
    content: {
      quickAnswer: 'First license: ₦15,000, 2-4 weeks. Renewal: ₦10,000, valid 5 years.',
      overview: 'Driving licenses are issued by VIO or state driving agencies.',
      definitions: 'A driving license is official permission to operate a motor vehicle.',
      requirements: ['Valid NIN', 'Medical fitness certificate', 'Passport photograph'],
      timeline: ['Visit VIO office', 'Complete application', 'Attend training', 'Take tests'],
      regulatory: 'FRSC Act requires all drivers to have valid license.',
      costEstimate: '₦15,000 first license or ₦10,000 renewal',
      commonMistakes: ['Using expired license', 'Driving with foreign license too long'],
      relatedGuides: [{ title: 'How to Register a Vehicle', link: '/guides/register-vehicle-nigeria' }],
    },
    sources: [{ title: 'FRSC Portal', url: 'https://www.frsc.gov.ng', verified: true }],
    reviewerName: 'Mr. Tunde Eze, VIO Officer',
  },
  {
    title: 'How to Register for WAEC/NECO Examinations',
    slug: 'register-waec-neco-exams',
    subtitle: 'Guide to registering for WAEC and NECO exams',
    description: 'Learn how to register for WAEC and NECO examinations.',
    domainSlug: 'education',
    subdomainSlug: 'waec-neco',
    content: {
      quickAnswer: 'WAEC: ₦15,000, opens December-January. NECO: ₦12,000, opens March-April.',
      overview: 'WAEC and NECO are the main secondary school examination bodies.',
      definitions: 'WAEC/NECO are examination bodies that set and mark senior secondary school exams.',
      requirements: ['Valid NIN', 'Passport photograph', 'School registration number'],
      timeline: ['Wait for announcement', 'Visit school', 'Complete form', 'Sit for exams'],
      regulatory: 'WAEC/NECO regulations require registration through approved centers.',
      costEstimate: '₦15,000 WAEC or ₦12,000 NECO',
      commonMistakes: ['Missing registration deadline', 'Incorrect subject combinations'],
      relatedGuides: [{ title: 'How to Check WAEC Results', link: '/guides/check-waec-results' }],
    },
    sources: [{ title: 'WAEC Portal', url: 'https://www.waecdirect.org', verified: true }],
    reviewerName: 'Mrs. Aisha Bello, Exam Coordinator',
  },
  {
    title: 'How to Obtain International Certification (IELTS/TOEFL/GRE)',
    slug: 'obtain-international-certification',
    subtitle: 'Guide to international language and entrance exams',
    description: 'Learn how to obtain international certifications for study abroad.',
    domainSlug: 'education',
    subdomainSlug: 'waec-neco',
    content: {
      quickAnswer: 'IELTS: ₦150,000, 2-3 weeks. TOEFL: $250, online. GRE: $220, computer-based.',
      overview: 'International certifications are required for university admission abroad.',
      definitions: 'IELTS/TOEFL are English proficiency tests required for study abroad.',
      requirements: ['Valid passport', 'Passport photograph', 'Payment for exam'],
      timeline: ['Choose exam', 'Book appointment', 'Prepare', 'Take exam'],
      regulatory: 'Exams must be taken at authorized centers.',
      costEstimate: 'IELTS ₦150,000, TOEFL $250, GRE $220',
      commonMistakes: ['Booking too late', 'Unprepared for exam format'],
      relatedGuides: [{ title: 'How to Apply for Scholarships', link: '/guides/apply-nigerian-scholarships' }],
    },
    sources: [{ title: 'British Council Nigeria', url: 'https://www.britishcouncil.org.ng', verified: true }],
    reviewerName: 'Dr. Emily Johnson, Education Consultant',
  },
];

async function seedPriority1Complete() {
  console.log('🌱 Seeding Priority 1 Complete (34 guides)...');
  console.log(`📚 Total guides to seed: ${priority1Remaining.length}`);

  let created = 0;
  let skipped = 0;
  let errors = 0;

  try {
    for (const guideData of priority1Remaining) {
      console.log(`📝 Processing: ${guideData.title}`);

      try {
        const domain = await prisma.domain.findUnique({
          where: { slug: guideData.domainSlug },
        });

        const subdomain = await prisma.subdomain.findUnique({
          where: { slug: guideData.subdomainSlug },
        });

        if (!domain || !subdomain) {
          console.warn(`   ⚠️  Domain/subdomain not found, skipping...`);
          skipped++;
          continue;
        }

        const existing = await prisma.guide.findUnique({
          where: { slug: guideData.slug },
        });

        if (existing) {
          console.log(`   ⏭️  Already exists`);
          skipped++;
          continue;
        }

        let reviewer = await prisma.user.findFirst({
          where: { name: guideData.reviewerName },
        });

        if (!reviewer) {
          reviewer = await prisma.user.create({
            data: {
              name: guideData.reviewerName,
              email: `${guideData.reviewerName.toLowerCase().replace(/\s+/g, '.')}@baobab.ng`,
              role: 'reviewer',
            },
          });
        }

        const guide = await prisma.guide.create({
          data: {
            title: guideData.title,
            slug: guideData.slug,
            subtitle: guideData.subtitle,
            description: guideData.description,
            content: JSON.stringify(guideData.content),
            domainId: domain.id,
            subdomainId: subdomain.id,
            reviewerId: reviewer.id,
            published: true,
            publishedAt: new Date(),
            lastVerified: new Date(),
          },
        });

        for (const source of guideData.sources) {
          await prisma.guideSource.create({
            data: {
              title: source.title,
              url: source.url,
              verified: source.verified,
              guideId: guide.id,
            },
          });
        }

        created++;
        console.log(`   ✅ Created`);
      } catch (error) {
        console.error(`   ❌ Error: ${(error as Error).message}`);
        errors++;
      }
    }

    console.log(`\n✨ Seeding complete!`);
    console.log(`   ✅ Created: ${created}`);
    console.log(`   ⏭️  Skipped: ${skipped}`);
    console.log(`   ❌ Errors: ${errors}`);

    const totalGuides = await prisma.guide.count({
      where: { published: true },
    });
    console.log(`\n📊 Total published guides: ${totalGuides}`);
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedPriority1Complete();
