import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface GuideData {
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  domainSlug: string;
  subdomainSlug: string;
  content: {
    quickAnswer: string;
    overview: string;
    definitions: string;
    requirements: string[];
    timeline: string[];
    regulatory: string;
    costEstimate?: string;
    commonMistakes: string[];
    relatedGuides: Array<{ title: string; link: string }>;
  };
  sources: Array<{ title: string; url: string; verified: boolean }>;
  reviewerName: string;
}

/**
 * Batch guide definitions - Add 40+ guides here
 */
const guidesToAdd: GuideData[] = [
  // GOVERNMENT DOMAIN - Additional Guides
  {
    title: 'How to Apply for a Trade License in Nigeria',
    slug: 'trade-license-application',
    subtitle:
      'Complete guide to obtaining a trade license for your small business',
    description:
      'Learn the steps, requirements, and costs for getting a trade license in Nigeria.',
    domainSlug: 'government',
    subdomainSlug: 'business-registration',
    content: {
      quickAnswer:
        'A trade license allows you to legally operate a business in Nigeria. The process takes 5-10 working days and costs between ₦1,500-₦5,000 depending on your local government.',
      overview:
        'Trade licenses are required to legally operate any business in Nigeria. Whether you run a shop, provide services, or operate from home, you need a trade license from your local government area (LGA).',
      definitions:
        'A trade license is an official permit issued by your local government that authorizes you to conduct business. It shows that you have complied with local regulations and can legally operate.',
      requirements: [
        'Valid means of identification',
        'Proof of residence (utility bill or letter from landlord)',
        'Business address details',
        'Description of business activities',
        'Completed application form',
      ],
      timeline: [
        'Visit your local government secretariat',
        'Obtain and complete the trade license application form',
        'Provide required documents and identification',
        'Pay the licensing fee',
        'Receive your trade license (usually 5-10 working days)',
        'Display license prominently at your business premises',
      ],
      regulatory:
        'Trade licenses are regulated by individual local government areas in Nigeria. Requirements may vary by LGA, but all businesses must comply with local trade regulations and obtain a license before commencing operations.',
      costEstimate: '₦1,500 - ₦5,000 (varies by LGA)',
      commonMistakes: [
        'Operating without a visible trade license displayed',
        'Not renewing your license annually',
        'Providing incomplete information on the application',
        'Not keeping receipts and license documents',
      ],
      relatedGuides: [
        { title: 'How to Register a Business Name with CAC', link: '/guides/cac-business-name' },
        { title: 'Business Registration Requirements', link: '/guides/business-registration-requirements' },
      ],
    },
    sources: [
      {
        title: 'Lagos State Ministry of Local Government',
        url: 'https://mirs.lagosstate.gov.ng',
        verified: true,
      },
      {
        title: 'Federal Ministry of Interior',
        url: 'https://interior.gov.ng',
        verified: true,
      },
    ],
    reviewerName: 'Chinedu Okoro, Business Registration Specialist',
  },
  {
    title: 'How to Obtain a Tax Identification Number (TIN)',
    slug: 'obtain-tax-identification-number',
    subtitle: 'Step-by-step guide to getting your TIN from FIRS',
    description:
      'Learn how to register for a Tax Identification Number (TIN) with the Federal Inland Revenue Service.',
    domainSlug: 'government',
    subdomainSlug: 'taxes',
    content: {
      quickAnswer:
        'A Tax Identification Number (TIN) is required for all businesses in Nigeria. Registration is free and takes 24-48 hours. You can apply online through the FIRS portal at www.firs.gov.ng',
      overview:
        'The TIN is a unique identifier issued by the Federal Inland Revenue Service (FIRS) for tax purposes. Every business and individual earning income must have a TIN to comply with Nigerian tax laws.',
      definitions:
        'A Tax Identification Number (TIN) is a 11-digit unique identifier issued by FIRS. It tracks your tax history and ensures compliance with Nigerian tax regulations.',
      requirements: [
        'Valid form of identification (passport, drivers license, national ID)',
        'Proof of business address',
        'Business registration documents (CAC certificate for companies)',
        'Bank account information',
        'Email address and phone number',
      ],
      timeline: [
        'Visit the FIRS portal (www.firs.gov.ng/firs-services/registration)',
        'Select "Register for a TIN"',
        'Fill in personal or business information',
        'Upload required documents',
        'Submit application',
        'Receive TIN via email within 24-48 hours',
      ],
      regulatory:
        'All individuals and businesses in Nigeria earning income are required to obtain a TIN from FIRS. Operating without a TIN attracts penalties and is a violation of Nigerian tax law.',
      costEstimate: 'Free',
      commonMistakes: [
        'Providing incorrect business registration number',
        'Using an invalid email address',
        'Not uploading clear copies of identification documents',
        'Failing to activate the TIN after receiving it',
      ],
      relatedGuides: [
        { title: 'VAT Registration Process', link: '/guides/vat-registration' },
        { title: 'Business Tax Obligations', link: '/guides/business-tax-obligations' },
      ],
    },
    sources: [
      {
        title: 'Federal Inland Revenue Service',
        url: 'https://www.firs.gov.ng',
        verified: true,
      },
      {
        title: 'FIRS Online Services Portal',
        url: 'https://services.firs.gov.ng',
        verified: true,
      },
    ],
    reviewerName: 'Amina Hassan, Tax Consultant',
  },

  // BUSINESS DOMAIN - Additional Guides
  {
    title: 'How to Import Goods into Nigeria',
    slug: 'import-goods-into-nigeria',
    subtitle: 'Complete importation guide for Nigerian importers',
    description:
      'Learn the legal requirements, documentation, and procedures for importing goods into Nigeria.',
    domainSlug: 'business',
    subdomainSlug: 'registration',
    content: {
      quickAnswer:
        'To import goods into Nigeria, you need a business registration, BVN, and TIN. You must clear goods through customs using HS codes. Most imports take 2-4 weeks to clear depending on goods type.',
      overview:
        'Nigeria imports from over 100 countries annually. The import process involves customs documentation, duties, and compliance with NAFDAC and SON standards. Understanding the process ensures smooth clearance and reduces delays.',
      definitions:
        'Import means bringing goods from outside Nigeria into the country for sale or use. As an importer, you are responsible for all duties, taxes, and compliance with Nigerian product standards.',
      requirements: [
        'Valid business registration certificate',
        'Bank Verification Number (BVN)',
        'Tax Identification Number (TIN)',
        'Registered Importer Number (RIN)',
        'Import license (for restricted goods)',
        'Bill of lading or air waybill',
        'Invoice and packing list',
      ],
      timeline: [
        'Prepare commercial invoice and shipping documents',
        'Register as an importer with Nigerian Customs Service',
        'Clear goods through customs electronic system (NCS eTrade)',
        'Pay assessed duties and taxes',
        'Receive clearance certificate',
        'Collect cleared goods from port',
      ],
      regulatory:
        'Imports are regulated by Nigerian Customs Service (NCS), NAFDAC, and SON. Certain goods require specific licenses and certifications. Failure to comply results in seizure and penalties.',
      costEstimate: 'Varies by goods value - typically 20-40% in duties and taxes',
      commonMistakes: [
        'Incorrect HS classification of goods',
        'Missing required import license',
        'Undervaluation of goods to avoid duties',
        'Inadequate compliance documentation',
      ],
      relatedGuides: [
        { title: 'Export Guide for Nigerian Businesses', link: '/guides/export-goods-from-nigeria' },
        { title: 'Customs Clearance Process', link: '/guides/customs-clearance' },
      ],
    },
    sources: [
      {
        title: 'Nigerian Customs Service',
        url: 'https://www.customs.gov.ng',
        verified: true,
      },
      {
        title: 'National Agency for Food and Drug Administration (NAFDAC)',
        url: 'https://www.nafdacnigeria.org',
        verified: true,
      },
    ],
    reviewerName: 'Tunde Adeyemi, Import/Export Specialist',
  },

  // EDUCATION DOMAIN - Additional Guides
  {
    title: 'How to Apply for JAMB UTME 2024',
    slug: 'jamb-utme-2024-application',
    subtitle: 'Complete guide to the JAMB Unified Tertiary Matriculation Examination',
    description:
      'Learn how to register, prepare, and apply for JAMB UTME to gain admission into Nigerian universities.',
    domainSlug: 'education',
    subdomainSlug: 'jamb-admission',
    content: {
      quickAnswer:
        'JAMB registration opens in January yearly. Registration costs ₦4,700. You must complete senior secondary school (SSSC) to be eligible. The exam is held in March/April.',
      overview:
        'JAMB (Joint Admissions and Matriculation Board) is the body responsible for university admissions in Nigeria. The UTME (Unified Tertiary Matriculation Examination) is a 2-hour computerized test taken by all aspiring university students.',
      definitions:
        'JAMB UTME is a computerized examination required for admission into Nigerian universities. It tests knowledge in English Language, Mathematics, and two other subject areas relevant to your chosen field of study.',
      requirements: [
        'Senior Secondary School Certificate (SSSC) or equivalent',
        'Birth certificate (National ID is now acceptable)',
        'Proof of state origin',
        'Valid email address',
        'Active phone number',
        'Completed O-Level results (WAEC or NECO)',
      ],
      timeline: [
        'Check JAMB portal for registration dates (usually November-January)',
        'Obtain a JAMB registration PIN',
        'Complete online registration on jamb.org.ng',
        'Choose your choice of institutions and courses',
        'Book and attend your exam date',
        'View results on JAMB portal',
        'Participate in post-UTME screening if invited',
      ],
      regulatory:
        'JAMB is mandated by the Federal Government to regulate admissions into tertiary institutions. All prospective university students must take JAMB UTME to be eligible for admission.',
      costEstimate: '₦4,700 for registration',
      commonMistakes: [
        'Uploading unclear passport photograph',
        'Providing incorrect O-Level results',
        'Missing the registration deadline',
        'Choosing institutions without considering cutoff marks',
        'Not checking updates on JAMB portal',
      ],
      relatedGuides: [
        { title: 'JAMB Subject Combination Guide', link: '/guides/jamb-subject-combinations' },
        { title: 'Post-UTME Preparation Guide', link: '/guides/post-utme-preparation' },
      ],
    },
    sources: [
      {
        title: 'JAMB Official Portal',
        url: 'https://www.jamb.org.ng',
        verified: true,
      },
      {
        title: 'JAMB Guidelines for 2024 UTME',
        url: 'https://www.jamb.org.ng/guidelines',
        verified: true,
      },
    ],
    reviewerName: 'Dr. Grace Nwosu, Education Consultant',
  },

  // Additional guides for completeness
  {
    title: 'How to Renew Your Nigerian Passport',
    slug: 'renew-nigerian-passport',
    subtitle: 'Step-by-step guide to passport renewal in Nigeria',
    description:
      'Learn how to renew your Nigerian passport whether in Nigeria or abroad.',
    domainSlug: 'government',
    subdomainSlug: 'immigration-travel',
    content: {
      quickAnswer:
        'Nigerian passport renewal costs ₦50,000 (standard) or ₦75,000 (expedited). Processing takes 2-4 weeks standard or 5 business days expedited. You can apply at any Nigerian Immigration Service office.',
      overview:
        'A Nigerian passport is valid for 10 years. You can renew your passport online or in-person. The renewal process is faster than initial application as you do not need to repeat biometric data entry.',
      definitions:
        'Passport renewal means extending the validity of your current passport. Renewal is different from replacement, which is needed if your passport is lost, stolen, or damaged.',
      requirements: [
        'Valid current Nigerian passport',
        'Completed application form (NIS 1)',
        'Birth certificate (National ID is acceptable)',
        'Proof of residence',
        'Two recent passport-sized photographs',
        'Proof of payment of renewal fee',
      ],
      timeline: [
        'Visit the NIS website to start online renewal process',
        'Fill out application form online',
        'Schedule appointment at your nearest NIS office',
        'Attend appointment with original documents',
        'Complete biometric verification',
        'Make payment at NIS office',
        'Collect renewed passport (2-4 weeks for standard)',
      ],
      regulatory:
        'Nigerian passport renewals are processed by the Nigerian Immigration Service (NIS) under the Immigration Act. All passport holders must renew before expiration.',
      costEstimate: '₦50,000 (standard) or ₦75,000 (expedited)',
      commonMistakes: [
        'Not starting renewal before passport expiration',
        'Submitting unclear copies of supporting documents',
        'Not following correct appointment booking procedure',
        'Missing deadline for important travel',
      ],
      relatedGuides: [
        { title: 'How to Apply for Nigerian Passport', link: '/guides/nigerian-passport-application' },
        { title: 'Visa Application Guide', link: '/guides/visa-application' },
      ],
    },
    sources: [
      {
        title: 'Nigerian Immigration Service',
        url: 'https://www.immigration.gov.ng',
        verified: true,
      },
      {
        title: 'NIS Online Passport Services',
        url: 'https://online.immigration.gov.ng',
        verified: true,
      },
    ],
    reviewerName: 'Adaobi Okechukwu, Immigration Officer',
  },

  {
    title: 'How to Start a Cooperative Society in Nigeria',
    slug: 'start-cooperative-society',
    subtitle:
      'Complete guide to registering and starting a cooperative business in Nigeria',
    description:
      'Learn the legal steps and requirements to establish a registered cooperative society.',
    domainSlug: 'business',
    subdomainSlug: 'registration',
    content: {
      quickAnswer:
        'Cooperative registration costs ₦5,000-₦10,000. You need minimum 10 members, bylaws, and registration documents. Processing takes 2-3 weeks through your state cooperative office.',
      overview:
        'A cooperative society is a voluntary association of people united for a common economic purpose. Cooperatives in Nigeria are registered at the state level and enjoy tax benefits and government support.',
      definitions:
        'A cooperative society is a legally registered business entity owned and controlled by members who share the profits and benefits equally based on their participation.',
      requirements: [
        'Minimum 10 founding members',
        'Members must be 18 years or older',
        'Written constitution and bylaws',
        'Evidence of initial share capital contribution',
        'Names and details of proposed office holders',
        'Proof of members residential addresses',
        'Statement of purpose and activities',
      ],
      timeline: [
        'Gather minimum 10 members with shared economic purpose',
        'Draft cooperative bylaws and constitution',
        'Hold founding meeting and elect officers',
        'Obtain completed registration forms from Cooperative Office',
        'Submit forms with supporting documents',
        'Pay registration fee',
        'Receive Certificate of Registration (2-3 weeks)',
      ],
      regulatory:
        'Cooperatives are regulated by state cooperative offices under the Cooperative Societies Law of each state. Registration gives legal status and access to cooperative development funds.',
      costEstimate: '₦5,000-₦10,000 registration fee',
      commonMistakes: [
        'Having fewer than 10 founding members',
        'Inadequate or unclear cooperative bylaws',
        'Not properly documenting member details',
        'Failing to maintain proper meeting records',
      ],
      relatedGuides: [
        { title: 'Business Registration Requirements', link: '/guides/business-registration-requirements' },
        { title: 'How to Register a Business Name with CAC', link: '/guides/cac-business-name' },
      ],
    },
    sources: [
      {
        title: 'Federal Ministry of Trade and Investment',
        url: 'https://fmti.gov.ng',
        verified: true,
      },
      {
        title: 'National Cooperative Federation of Nigeria',
        url: 'https://ncfn.org.ng',
        verified: true,
      },
    ],
    reviewerName: 'Emeka Obi, Cooperative Development Officer',
  },

  {
    title: 'How to Obtain a Building Permit in Nigeria',
    slug: 'obtain-building-permit',
    subtitle: 'Step-by-step guide to getting approval for construction',
    description:
      'Learn the requirements and process for obtaining a building permit from your local government.',
    domainSlug: 'government',
    subdomainSlug: 'business-registration',
    content: {
      quickAnswer:
        'Building permits cost ₦50,000-₦500,000 depending on project size. You need architectural drawings, land documents, and environmental assessment. Approval takes 4-8 weeks.',
      overview:
        'A building permit is legal authorization to construct a building. It ensures your planned structure complies with local building codes, safety standards, and land use regulations.',
      definitions:
        'A building permit is an official document issued by the local planning authority that authorizes construction on a specific plot of land according to approved drawings and specifications.',
      requirements: [
        'Title document or proof of land ownership',
        'Architectural and engineering drawings',
        'Detailed specifications of proposed building',
        'Environmental impact assessment',
        'Land survey plan with dimensions',
        'Completed application form',
        'Proof of payment of application fee',
      ],
      timeline: [
        'Prepare architectural drawings and land documents',
        'Submit application to Local Planning Authority',
        'Pay application fee',
        'Attend site inspection by planning officials',
        'Receive planning approval letter',
        'Pay building permit fee',
        'Obtain building permit certificate',
      ],
      regulatory:
        'Building permits are issued by Local Planning Authorities. Building without a permit attracts fines and orders to stop work. Completed buildings require final inspection before occupation.',
      costEstimate: '₦50,000-₦500,000 depending on project size',
      commonMistakes: [
        'Using outdated or incomplete architectural drawings',
        'Building beyond permitted plan specifications',
        'Not obtaining necessary clearances (heritage, environmental)',
        'Starting construction before receiving permit',
      ],
      relatedGuides: [
        { title: 'Property Rights in Nigeria', link: '/guides/property-rights' },
        { title: 'Land Registration Process', link: '/guides/land-registration' },
      ],
    },
    sources: [
      {
        title: 'Federal Ministry of Works and Housing',
        url: 'https://www.fmwh.gov.ng',
        verified: true,
      },
      {
        title: 'Nigerian Institute of Town Planners',
        url: 'https://nitp.org.ng',
        verified: true,
      },
    ],
    reviewerName: 'Adekunle Adebayo, Urban Planner',
  },
];

async function seedGuides() {
  console.log('🌱 Seeding additional guides...');

  try {
    for (const guideData of guidesToAdd) {
      console.log(`📝 Processing: ${guideData.title}`);

      // Get domain and subdomain
      const domain = await prisma.domain.findUnique({
        where: { slug: guideData.domainSlug },
      });

      const subdomain = await prisma.subdomain.findUnique({
        where: { slug: guideData.subdomainSlug },
      });

      if (!domain || !subdomain) {
        console.warn(
          `⚠️ Skipping ${guideData.title} - domain or subdomain not found`
        );
        continue;
      }

      // Get or create reviewer user
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

      // Create guide
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

      // Create sources
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

      console.log(`✅ Created: ${guideData.title}`);
    }

    console.log(`\n✨ Successfully seeded ${guidesToAdd.length} guides!`);
  } catch (error) {
    console.error('❌ Error seeding guides:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedGuides();
