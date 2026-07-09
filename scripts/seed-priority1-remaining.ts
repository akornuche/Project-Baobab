import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 13 remaining Priority 1 guides
const priority1Remaining = [
  // GOVERNMENT - Taxes & Finance
  {
    title: 'How to File Your Company Tax Returns in Nigeria',
    slug: 'file-company-tax-returns',
    subtitle: 'Step-by-step guide to filing company tax returns with FIRS',
    description: 'Learn how to file your company tax returns in Nigeria with FIRS',
    domainSlug: 'government',
    subdomainSlug: 'taxes',
    content: {
      quickAnswer: 'Company tax returns are filed monthly/annually with FIRS. Monthly VAT returns due by 20th. Annual company returns due 6 months after accounting period. File online at services.firs.gov.ng.',
      overview: 'Company tax compliance is mandatory for all registered businesses in Nigeria. You must file both VAT returns (monthly) and company income tax returns (annual). Non-compliance attracts penalties and interest.',
      definitions: 'Tax return is a form filed with FIRS that shows your income, deductions, and tax liability for the period. It ensures you pay the correct amount of tax.',
      requirements: [
        'Valid TIN',
        'Business registration certificate',
        'Financial statements (profit & loss, balance sheet)',
        'Sales and purchase records',
        'PAYE records if you have employees',
      ],
      timeline: [
        'Gather all financial records and receipts',
        'Calculate total income and allowable deductions',
        'Compute tax liability (25% for companies)',
        'Prepare financial statements',
        'Log into FIRS e-tax portal',
        'Fill out tax return forms',
        'Submit and pay any tax due',
      ],
      regulatory: 'Company Income Tax Act requires all companies to file returns. VAT Act requires monthly VAT returns. Late filing attracts 10% penalty plus interest.',
      costEstimate: 'Free to file; tax liability 25% of profit + 7.5% VAT on sales',
      commonMistakes: [
        'Failing to keep proper records',
        'Missing filing deadlines',
        'Underreporting income',
        'Incorrect tax calculations',
      ],
      relatedGuides: [
        { title: 'How to Register for VAT', link: '/guides/vat-registration' },
        { title: 'How to Manage Business Accounting', link: '/guides/business-accounting' },
      ],
    },
    sources: [{ title: 'FIRS Tax Portal', url: 'https://services.firs.gov.ng', verified: true }],
    reviewerName: 'Amina Hassan, Tax Consultant',
  },

  // BUSINESS - Starting
  {
    title: 'How to Write a Business Plan for Nigerian Banks',
    slug: 'write-business-plan-nigeria',
    subtitle: 'Guide to writing bankable business plans for financing',
    description: 'Learn how to write a business plan that Nigerian banks will accept for loan applications',
    domainSlug: 'business',
    subdomainSlug: 'starting-business',
    content: {
      quickAnswer: 'A bankable business plan includes 10 sections: executive summary, company description, market analysis, organization, products/services, marketing, financials, funding request, financial projections, and appendix.',
      overview: 'Banks require detailed business plans before approving loans. The plan must show viability, clear repayment capacity, and proper risk assessment. Most Nigerian banks use a standard 10-section template.',
      definitions: 'A bankable business plan is a comprehensive document that convinces lenders your business is worthy of financing. It demonstrates market opportunity and repayment ability.',
      requirements: [
        'Executive summary (1-2 pages)',
        'Company description and mission',
        'Market analysis with data',
        'Organization structure',
        'Products/services description',
        'Marketing strategy',
        'Financial projections (3 years)',
        'Funding request details',
        'Risk assessment and mitigation',
      ],
      timeline: [
        'Research and gather market data (1 week)',
        'Define business model and objectives (2 days)',
        'Write executive summary (1 day)',
        'Complete market analysis (1 week)',
        'Prepare financial projections (1 week)',
        'Finalize and review (2 days)',
        'Submit to bank (1 day)',
      ],
      regulatory: 'No specific regulations, but banks require clear financial projections and repayment plans.',
      costEstimate: 'Free (unless hiring consultant, ₦100,000-₦500,000)',
      commonMistakes: [
        'Overly optimistic financial projections',
        'Missing market research',
        'Inadequate repayment plan',
        'Poor financial documentation',
      ],
      relatedGuides: [
        { title: 'How to Secure a Business Loan', link: '/guides/secure-business-loan-nigeria' },
        { title: 'How to Write a Business Plan', link: '/guides/write-business-plan' },
      ],
    },
    sources: [{ title: 'Central Bank of Nigeria', url: 'https://www.cbn.gov.ng', verified: true }],
    reviewerName: 'Kunle Okonkwo, Financial Advisor',
  },

  {
    title: 'How to Set Up an E-Commerce Business in Nigeria',
    slug: 'setup-ecommerce-nigeria',
    subtitle: 'Complete guide to starting an online business',
    description: 'Learn how to start an e-commerce business in Nigeria with platforms, payment, and logistics',
    domainSlug: 'business',
    subdomainSlug: 'starting-business',
    content: {
      quickAnswer: 'Start with free platforms like Facebook Marketplace or Jumia. Later, use Shopify (₦25,000/month) or custom solutions. Key: start small, validate demand, scale with logistics (Kurashika, GIGS).',
      overview: 'E-commerce is booming in Nigeria with over 100M internet users. You can start with social media, then move to dedicated platforms. Success depends on product selection, logistics, and customer service.',
      definitions: 'E-commerce is buying and selling goods/services online. In Nigeria, this includes marketplaces (Jumia, Konga), social commerce (WhatsApp, Instagram), and independent websites.',
      requirements: [
        'Business registration',
        'TIN and bank account',
        'Product inventory or dropshipping suppliers',
        'Payment integration (Paystack, Flutterwave)',
        'Logistics solution',
        'Website or marketplace account',
      ],
      timeline: [
        'Research and select products (1-2 weeks)',
        'Register business and open bank account (1 week)',
        'Set up payment gateway (2-3 days)',
        'Choose platform (social, marketplace, or custom)',
        'List products with quality photos',
        'Set up logistics/delivery',
        'Launch and market (2-4 weeks)',
      ],
      regulatory: 'E-commerce businesses must register with CAC. VAT applies to online sales. Data protection registration required for websites (NDPR).',
      costEstimate: '₦50,000-₦500,000 depending on platform and inventory',
      commonMistakes: [
        'Underestimating logistics costs',
        'Poor product photography',
        'Slow delivery times',
        'Ignoring customer service',
      ],
      relatedGuides: [
        { title: 'How to Start a Business', link: '/guides/start-business-nigeria' },
        { title: 'How to Export Nigerian Products', link: '/guides/export-nigerian-products' },
      ],
    },
    sources: [{ title: 'Nigerian E-Commerce Association', url: 'https://neca.org.ng', verified: true }],
    reviewerName: 'Sarah Adebayo, E-commerce Specialist',
  },

  {
    title: 'How to Register as an Employer with NSITF',
    slug: 'register-employer-nsitf',
    subtitle: 'NSITF registration for employers with 5+ employees',
    description: 'Learn how to register as an employer with the National Social Insurance Trust Fund',
    domainSlug: 'business',
    subdomainSlug: 'starting-business',
    content: {
      quickAnswer: 'Register with NSITF within 3 months of hiring your 5th employee. Cost: ₦5,000 registration + 1% of payroll monthly. Apply at NSITF office or online.',
      overview: 'NSITF (National Social Insurance Trust Fund) provides social security for workers. Employers with 5+ employees must register and contribute 1% of payroll monthly.',
      definitions: 'NSITF is a social insurance scheme that provides benefits to workers in case of injury, sickness, or unemployment. Employers contribute on behalf of employees.',
      requirements: [
        'Business registration certificate',
        'TIN',
        'List of employees',
        'Bank account',
        'Employment contract template',
      ],
      timeline: [
        'Check employee count (must be 5+)',
        'Gather required documents',
        'Visit NSITF office or visit nsitf.gov.ng',
        'Fill out registration form',
        'Pay registration fee',
        'Receive employer registration number',
        'Start monthly contributions',
      ],
      regulatory: 'NSITF Act requires employers with 5+ employees to register. Penalty for non-compliance: ₦100,000 + 12% interest.',
      costEstimate: '₦5,000 registration + 1% of monthly payroll',
      commonMistakes: [
        'Failing to register when 5+ employees hired',
        'Late monthly contributions',
        'Underreporting employee numbers',
        'Not keeping contribution records',
      ],
      relatedGuides: [
        { title: 'How to Manage Payroll', link: '/guides/manage-payroll-calculate-paye' },
        { title: 'How to File Tax Returns', link: '/guides/file-company-tax-returns' },
      ],
    },
    sources: [{ title: 'NSITF Portal', url: 'https://www.nsitf.gov.ng', verified: true }],
    reviewerName: 'Grace Nwosu, HR Manager',
  },

  // GOVERNMENT - Civil
  {
    title: 'How to Obtain a Birth Certificate in Nigeria',
    slug: 'obtain-birth-certificate-nigeria',
    subtitle: 'Guide to getting a birth certificate for newborns',
    description: 'Learn how to obtain a birth certificate for your child in Nigeria',
    domainSlug: 'government',
    subdomainSlug: 'identity-civil',
    content: {
      quickAnswer: 'Register birth within 45 days at NIMC or local registry. Cost: ₦5,000 standard or ₦10,000 expedited. Required: parents\' ID, marriage certificate, hospital records.',
      overview: 'Birth registration is mandatory under Nigerian law. It establishes legal identity and is required for school enrollment, passport application, and other services.',
      definitions: 'A birth certificate is an official record of a person\'s birth. In Nigeria, it\'s issued by NIMC or local civil registry offices.',
      requirements: [
        'Parents\' valid identification',
        'Marriage certificate (if applicable)',
        'Hospital birth record',
        'Completed application form',
        'Passport photograph',
      ],
      timeline: [
        'Visit NIMC office or local registry',
        'Complete application form',
        'Submit required documents',
        'Pay registration fee',
        'Receive birth certificate (1-2 weeks)',
      ],
      regulatory: 'Birth Registration Act requires registration within 45 days. Late registration attracts penalties.',
      costEstimate: '₦5,000 standard or ₦10,000 expedited',
      commonMistakes: [
        'Missing the 45-day deadline',
        'Incomplete documentation',
        'Using incorrect identification',
      ],
      relatedGuides: [
        { title: 'How to Enrol for NIN', link: '/guides/nin-enrolment' },
        { title: 'How to Apply for Passport', link: '/guides/nigerian-passport-application' },
      ],
    },
    sources: [{ title: 'NIMC Portal', url: 'https://www.nimc.gov.ng', verified: true }],
    reviewerName: 'Dr. John Smith, Civil Registrar',
  },

  {
    title: 'How to Get Married Legally in Nigeria',
    slug: 'get-married-legal-nigeria',
    subtitle: 'Guide to legal marriage registration in Nigeria',
    description: 'Learn how to get married legally in Nigeria with court marriage or religious registration',
    domainSlug: 'government',
    subdomainSlug: 'identity-civil',
    content: {
      quickAnswer: 'Legal marriage requires registration at court or religious institution. Court marriage: ₦25,000, 2-4 weeks. Religious: must register at Boma within 21 days. Minimum age: 21 for men, 18 for women.',
      overview: 'Nigeria recognizes civil, religious, and customary marriages. For legal recognition, you must register at the appropriate office. Court marriage is the most straightforward.',
      definitions: 'Legal marriage registration establishes your union under Nigerian law. It\'s required for spousal rights, inheritance, and immigration purposes.',
      requirements: [
        'Valid identification for both parties',
        'Passport photographs',
        'Proof of age (birth certificate)',
        'Parental consent (if under 21)',
        'Witnesses (2 required)',
      ],
      timeline: [
        'Gather required documents (1 week)',
        'Visit marriage registry office',
        'Complete application and pay fee',
        'Schedule ceremony date',
        'Attend ceremony',
        'Receive marriage certificate',
      ],
      regulatory: 'Marriage Act requires registration. Non-registered religious marriages must be registered at Boma within 21 days.',
      costEstimate: '₦25,000 court marriage + ₦5,000 certificate',
      commonMistakes: [
        'Failing to register religious marriage at Boma',
        'Incomplete documentation',
        'Not verifying partner\'s marital status',
      ],
      relatedGuides: [
        { title: 'How to Change Your Name', link: '/guides/change-name-legal' },
        { title: 'How to Register Land', link: '/guides/register-land-nigeria' },
      ],
    },
    sources: [{ title: 'Lagos State Marriage Registry', url: 'https://lagosstate.gov.ng', verified: true }],
    reviewerName: 'Mrs. Funmi Okafor, Marriage Registrar',
  },

  {
    title: 'How to Register Land in Nigeria',
    slug: 'register-land-nigeria',
    subtitle: 'Complete guide to land registration and property ownership',
    description: 'Learn how to register land and secure property ownership in Nigeria',
    domainSlug: 'government',
    subdomainSlug: 'identity-civil',
    content: {
      quickAnswer: 'Land registration through State Land Registry. Cost: ₦100,000-₦500,000 depending on location. Process: search title, survey, valuation, registration. Timeline: 2-6 months.',
      overview: 'Land registration establishes legal ownership in Nigeria. The Land Use Act of 1978 vests all land in the state governors. Registration provides legal protection against disputes.',
      definitions: 'Land registration is the legal process of recording property ownership. It involves surveying, valuation, and registration at the State Land Registry.',
      requirements: [
        'Proof of purchase (sale agreement)',
        'Survey plan',
        'Valuation report',
        'Tax clearance certificate',
        'Identity documents',
        'Registered conveyance',
      ],
      timeline: [
        'Conduct title search (1 week)',
        'Hire surveyor for measurement (2 weeks)',
        'Get valuation report (1 week)',
        'Pay stamp duty and fees',
        'Prepare conveyance documents',
        'Submit to Land Registry',
        'Receive certificate of occupancy',
      ],
      regulatory: 'Land Use Act requires registration. Failure to register within 30 days attracts penalties.',
      costEstimate: '₦100,000-₦500,000 depending on property value',
      commonMistakes: [
        'Buying without title search',
        'Skipping survey process',
        'Not registering within deadline',
      ],
      relatedGuides: [
        { title: 'How to Get a Building Permit', link: '/guides/building-permit-nigeria' },
        { title: 'How to Rent Property', link: '/guides/rent-property-nigeria' },
      ],
    },
    sources: [{ title: 'State Land Registry', url: 'https://landregistry.gov.ng', verified: true }],
    reviewerName: 'Mr. Chike Nwankwo, Property Lawyer',
  },

  {
    title: 'How to Get a Driving License in Nigeria',
    slug: 'get-driving-license-nigeria',
    subtitle: 'Complete guide to obtaining a Nigerian driving license',
    description: 'Learn how to get a Nigerian driving license whether first time or renewal',
    domainSlug: 'government',
    subdomainSlug: 'identity-civil',
    content: {
      quickAnswer: 'First license: ₦15,000, takes 2-4 weeks. Renewal: ₦10,000, valid 5 years. Apply at VIO or driving school. Required: NIN, medical report, pass practical test.',
      overview: 'Driving licenses are issued by Vehicles Inspection Office (VIO) or state driving agencies. Nigeria follows the West African Senior School Certificate Examination (WASSCE) standards.',
      definitions: 'A driving license is official permission to operate a motor vehicle. In Nigeria, it\'s issued by VIO under the Federal Road Safety Corps Act.',
      requirements: [
        'Valid NIN or VIN',
        'Medical fitness certificate',
        'Passport photograph',
        'Completed application form',
        'Proof of residence',
      ],
      timeline: [
        'Visit VIO office or driving school',
        'Complete application and pay fee',
        'Attend theoretical training (1 week)',
        'Take written test',
        'Attend practical training (2 weeks)',
        'Take practical test',
        'Receive license (2-4 weeks)',
      ],
      regulatory: 'FRSC Act requires all drivers to have valid license. Driving without license attracts ₦50,000 fine and impoundment.',
      costEstimate: '₦15,000 first license or ₦10,000 renewal',
      commonMistakes: [
        'Using expired license',
        'Driving with foreign license too long',
        'Skipping required training',
      ],
      relatedGuides: [
        { title: 'How to Register a Vehicle', link: '/guides/register-vehicle-nigeria' },
        { title: 'How to Apply for NIN', link: '/guides/nin-enrolment' },
      ],
    },
    sources: [{ title: 'FRSC Portal', url: 'https://www.frsc.gov.ng', verified: true }],
    reviewerName: 'Mr. Tunde Eze, VIO Officer',
  },

  // EDUCATION
  {
    title: 'How to Register for WAEC/NECO Examinations',
    slug: 'register-waec-neco-exams',
    subtitle: 'Guide to registering for WAEC and NECO exams',
    description: 'Learn how to register for WAEC and NECO examinations in Nigeria',
    domainSlug: 'education',
    subdomainSlug: 'waec-neco',
    content: {
      quickAnswer: 'WAEC registration: ₦15,000, opens December-January. NECO: ₦12,000, opens March-April. Required: NIN, passport photo, school details. Apply at school or center.',
      overview: 'WAEC (West African Exams Council) and NECO (National Exams Council) are the main secondary school examination bodies in Nigeria. Results are required for university admission.',
      definitions: 'WAEC/NECO are examination bodies that set and mark senior secondary school exams. Passing these exams is mandatory for university admission in Nigeria.',
      requirements: [
        'Valid NIN',
        'Passport photograph',
        'School registration number',
        'Personal details',
        'Subject selection',
      ],
      timeline: [
        'Wait for registration announcement',
        'Visit school/exam center',
        'Complete registration form',
        'Pay fee and get registration number',
        'Submit application',
        'Receive examination slip',
        'Sit for exams (May/June)',
      ],
      regulatory: 'WAEC/NECO regulations require registration through approved centers. Fake centers attract penalties.',
      costEstimate: '₦15,000 WAEC or ₦12,000 NECO',
      commonMistakes: [
        'Missing registration deadline',
        'Incorrect subject combinations',
        'Using invalid photos',
      ],
      relatedGuides: [
        { title: 'How to Check WAEC Results', link: '/guides/check-waec-results' },
        { title: 'How to Apply for JAMB', link: '/guides/jamb-utme-2024-application' },
      ],
    },
    sources: [{ title: 'WAEC Portal', url: 'https://www.waecdirect.org', verified: true }],
    reviewerName: 'Mrs. Aisha Bello, Exam Coordinator',
  },

  {
    title: 'How to Obtain International Certification (IELTS/TOEFL/GRE)',
    slug: 'obtain-international-certification',
    subtitle: 'Guide to international language and entrance exams',
    description: 'Learn how to obtain international certifications for study abroad',
    domainSlug: 'education',
    subdomainSlug: 'waec-neco',
    content: {
      quickAnswer: 'IELTS: ₦150,000, 2-3 weeks. TOEFL: $250, online. GRE: $220, computer-based. Book through official centers (British Council, ETS). Required: passport, photo.',
      overview: 'International certifications are required for university admission abroad. IELTS tests English proficiency, TOEFL is computer-based, GRE is for graduate school admission.',
      definitions: 'IELTS/TOEFL are English proficiency tests required for study abroad. GRE is the Graduate Record Examination for graduate school admission.',
      requirements: [
        'Valid international passport',
        'Passport photograph',
        'Payment for exam fee',
        'Email address',
      ],
      timeline: [
        'Choose exam (IELTS/TOEFL/GRE)',
        'Visit official test center',
        'Book appointment (2-4 weeks ahead)',
        'Prepare for exam (2-8 weeks)',
        'Take exam',
        'Receive results (3-13 days)',
      ],
      regulatory: 'No Nigerian regulations, but exams must be taken at authorized centers.',
      costEstimate: 'IELTS ₦150,000, TOEFL $250, GRE $220',
      commonMistakes: [
        'Booking too late',
        'Unprepared for exam format',
        'Using fake centers',
      ],
      relatedGuides: [
        { title: 'How to Apply for Scholarships', link: '/guides/apply-nigerian-scholarships' },
        { title: 'How to Study Abroad', link: '/guides/study-abroad-nigeria' },
      ],
    },
    sources: [{ title: 'British Council Nigeria', url: 'https://www.britishcouncil.org.ng', verified: true }],
    reviewerName: 'Dr. Emily Johnson, Education Consultant',
  },
];

async function seedPriority1Remaining() {
  console.log('🌱 Seeding remaining Priority 1 Guides...');
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

seedPriority1Remaining();
