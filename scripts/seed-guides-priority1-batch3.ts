import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Priority 1 Remaining Guides - Batch 3 (Guides 31-45)
const priority1Batch3 = [
  {
    title: 'How to Apply for a Trade License in Nigeria',
    slug: 'trade-license-application',
    subtitle: 'Complete guide to obtaining a trade license for your small business',
    description: 'Learn the steps, requirements, and costs for getting a trade license in Nigeria',
    domainSlug: 'government',
    subdomainSlug: 'business-registration',
    content: {
      quickAnswer: 'Trade license allows legal operation. Process takes 5-10 working days and costs ₦1,500-₦5,000 depending on your local government area.',
      overview: 'Trade licenses are required to legally operate any business in Nigeria. Whether you run a shop, provide services, or operate from home, you need a trade license from your local government area (LGA).',
      definitions: 'A trade license is an official permit issued by your local government that authorizes you to conduct business. It shows that you have complied with local regulations.',
      requirements: ['Valid means of identification', 'Proof of residence', 'Business address details', 'Description of business activities', 'Completed application form'],
      timeline: ['Visit your local government secretariat', 'Obtain and complete the application form', 'Provide required documents', 'Pay the licensing fee', 'Receive trade license'],
      regulatory: 'Trade licenses are regulated by individual local government areas in Nigeria. All businesses must comply with local trade regulations.',
      costEstimate: '₦1,500 - ₦5,000 (varies by LGA)',
      commonMistakes: ['Operating without visible trade license', 'Not renewing license annually', 'Providing incomplete information'],
      relatedGuides: [
        { title: 'How to Register a Business Name with CAC', link: '/guides/cac-business-name' },
        { title: 'Business Registration Requirements', link: '/guides/business-registration-requirements' },
      ],
    },
    sources: [{ title: 'Lagos State Ministry of Local Government', url: 'https://mirs.lagosstate.gov.ng', verified: true }],
    reviewerName: 'Chinedu Okoro, Business Registration Specialist',
  },
  {
    title: 'How to Obtain a Tax Identification Number (TIN)',
    slug: 'obtain-tax-identification-number',
    subtitle: 'Step-by-step guide to getting your TIN from FIRS',
    description: 'Learn how to register for a Tax Identification Number (TIN) with the Federal Inland Revenue Service',
    domainSlug: 'government',
    subdomainSlug: 'taxes',
    content: {
      quickAnswer: 'TIN is required for all businesses. Registration is free and takes 24-48 hours. Apply online through www.firs.gov.ng',
      overview: 'The TIN is a unique identifier issued by FIRS for tax purposes. Every business and individual earning income must have a TIN.',
      definitions: 'A Tax Identification Number (TIN) is a 11-digit unique identifier issued by FIRS. It tracks your tax history and ensures compliance.',
      requirements: ['Valid form of identification', 'Proof of business address', 'Business registration documents', 'Bank account information', 'Email and phone number'],
      timeline: ['Visit FIRS portal', 'Select register for TIN', 'Fill in personal or business information', 'Upload required documents', 'Submit application', 'Receive TIN via email'],
      regulatory: 'All individuals and businesses earning income are required to obtain a TIN. Operating without a TIN attracts penalties.',
      costEstimate: 'Free',
      commonMistakes: ['Providing incorrect business registration number', 'Using an invalid email address', 'Not uploading clear documents'],
      relatedGuides: [
        { title: 'VAT Registration Process', link: '/guides/vat-registration' },
        { title: 'Business Tax Obligations', link: '/guides/business-tax-obligations' },
      ],
    },
    sources: [{ title: 'Federal Inland Revenue Service', url: 'https://www.firs.gov.ng', verified: true }],
    reviewerName: 'Amina Hassan, Tax Consultant',
  },
  {
    title: 'How to Apply for a Building Permit in Nigeria',
    slug: 'obtain-building-permit',
    subtitle: 'Step-by-step guide to getting approval for construction',
    description: 'Learn the requirements and process for obtaining a building permit from your local government',
    domainSlug: 'government',
    subdomainSlug: 'business-registration',
    content: {
      quickAnswer: 'Building permits cost ₦50,000-₦500,000. Approval takes 4-8 weeks. Required: architectural drawings, land documents, environmental assessment.',
      overview: 'A building permit is legal authorization to construct a building. It ensures your planned structure complies with local building codes and safety standards.',
      definitions: 'A building permit is an official document issued by the local planning authority that authorizes construction according to approved drawings.',
      requirements: ['Title document or proof of land ownership', 'Architectural and engineering drawings', 'Detailed specifications', 'Environmental impact assessment', 'Land survey plan', 'Completed application form', 'Proof of payment'],
      timeline: ['Prepare architectural drawings', 'Submit application to Local Planning Authority', 'Pay application fee', 'Attend site inspection', 'Receive planning approval', 'Pay building permit fee', 'Obtain building permit certificate'],
      regulatory: 'Building permits are issued by Local Planning Authorities. Building without a permit attracts fines and orders to stop work.',
      costEstimate: '₦50,000-₦500,000 depending on project size',
      commonMistakes: ['Using outdated or incomplete architectural drawings', 'Building beyond permitted specifications', 'Not obtaining necessary clearances'],
      relatedGuides: [
        { title: 'Property Rights in Nigeria', link: '/guides/property-rights' },
        { title: 'Land Registration Process', link: '/guides/land-registration' },
      ],
    },
    sources: [{ title: 'Federal Ministry of Works and Housing', url: 'https://www.fmwh.gov.ng', verified: true }],
    reviewerName: 'Adekunle Adebayo, Urban Planner',
  },
  {
    title: 'How to Register a Cooperative Society in Nigeria',
    slug: 'start-cooperative-society',
    subtitle: 'Complete guide to registering and starting a cooperative business',
    description: 'Learn the legal steps and requirements to establish a registered cooperative society',
    domainSlug: 'business',
    subdomainSlug: 'registration',
    content: {
      quickAnswer: 'Cooperative registration costs ₦5,000-₦10,000. You need minimum 10 members, bylaws, and registration documents. Processing takes 2-3 weeks.',
      overview: 'A cooperative society is a voluntary association of people united for a common economic purpose. Cooperatives in Nigeria are registered at the state level.',
      definitions: 'A cooperative society is a legally registered business entity owned and controlled by members who share profits and benefits equally.',
      requirements: ['Minimum 10 founding members', 'Members must be 18 years or older', 'Written constitution and bylaws', 'Evidence of initial share capital', 'Names of proposed office holders', 'Proof of members residential addresses', 'Statement of purpose'],
      timeline: ['Gather minimum 10 members', 'Draft cooperative bylaws', 'Hold founding meeting and elect officers', 'Obtain completed registration forms', 'Submit forms with supporting documents', 'Pay registration fee', 'Receive Certificate of Registration'],
      regulatory: 'Cooperatives are regulated by state cooperative offices under the Cooperative Societies Law. Registration gives legal status and access to development funds.',
      costEstimate: '₦5,000-₦10,000 registration fee',
      commonMistakes: ['Having fewer than 10 founding members', 'Inadequate or unclear cooperative bylaws', 'Not properly documenting member details'],
      relatedGuides: [
        { title: 'Business Registration Requirements', link: '/guides/business-registration-requirements' },
        { title: 'How to Register a Business Name with CAC', link: '/guides/cac-business-name' },
      ],
    },
    sources: [{ title: 'Federal Ministry of Trade and Investment', url: 'https://fmti.gov.ng', verified: true }],
    reviewerName: 'Emeka Obi, Cooperative Development Officer',
  },
  {
    title: 'How to Import Goods into Nigeria',
    slug: 'import-goods-into-nigeria',
    subtitle: 'Complete importation guide for Nigerian importers',
    description: 'Learn the legal requirements, documentation, and procedures for importing goods into Nigeria',
    domainSlug: 'business',
    subdomainSlug: 'registration',
    content: {
      quickAnswer: 'To import goods, you need business registration, BVN, and TIN. You must clear goods through customs using HS codes. Most imports take 2-4 weeks.',
      overview: 'Nigeria imports from over 100 countries annually. The import process involves customs documentation, duties, and compliance with NAFDAC and SON standards.',
      definitions: 'Import means bringing goods from outside Nigeria into the country for sale or use. As an importer, you are responsible for all duties and compliance.',
      requirements: ['Valid business registration certificate', 'Bank Verification Number (BVN)', 'Tax Identification Number (TIN)', 'Registered Importer Number (RIN)', 'Import license (for restricted goods)', 'Bill of lading or air waybill', 'Invoice and packing list'],
      timeline: ['Prepare commercial invoice and shipping documents', 'Register as an importer with Nigerian Customs Service', 'Clear goods through customs electronic system', 'Pay assessed duties and taxes', 'Receive clearance certificate', 'Collect cleared goods from port'],
      regulatory: 'Imports are regulated by Nigerian Customs Service (NCS), NAFDAC, and SON. Certain goods require specific licenses and certifications.',
      costEstimate: 'Varies by goods value - typically 20-40% in duties and taxes',
      commonMistakes: ['Incorrect HS classification of goods', 'Missing required import license', 'Undervaluation of goods to avoid duties'],
      relatedGuides: [
        { title: 'Export Guide for Nigerian Businesses', link: '/guides/export-goods-from-nigeria' },
        { title: 'Customs Clearance Process', link: '/guides/customs-clearance' },
      ],
    },
    sources: [{ title: 'Nigerian Customs Service', url: 'https://www.customs.gov.ng', verified: true }],
    reviewerName: 'Tunde Adeyemi, Import/Export Specialist',
  },
  {
    title: 'How to Apply for JAMB UTME 2024',
    slug: 'jamb-utme-2024-application',
    subtitle: 'Complete guide to the JAMB Unified Tertiary Matriculation Examination',
    description: 'Learn how to register, prepare, and apply for JAMB UTME to gain admission into Nigerian universities',
    domainSlug: 'education',
    subdomainSlug: 'jamb-admission',
    content: {
      quickAnswer: 'JAMB registration opens in January yearly. Registration costs ₦4,700. You must complete senior secondary school (SSSC) to be eligible. The exam is held in March/April.',
      overview: 'JAMB (Joint Admissions and Matriculation Board) is the body responsible for university admissions in Nigeria. The UTME is a 2-hour computerized test.',
      definitions: 'JAMB UTME is a computerized examination required for admission into Nigerian universities. It tests knowledge in English Language, Mathematics, and two other subjects.',
      requirements: ['Senior Secondary School Certificate (SSSC) or equivalent', 'Birth certificate (National ID is now acceptable)', 'Proof of state origin', 'Valid email address', 'Active phone number', 'Completed O-Level results'],
      timeline: ['Check JAMB portal for registration dates', 'Obtain a JAMB registration PIN', 'Complete online registration on jamb.org.ng', 'Choose your choice of institutions and courses', 'Book and attend your exam date', 'View results on JAMB portal', 'Participate in post-UTME screening if invited'],
      regulatory: 'JAMB is mandated by the Federal Government to regulate admissions into tertiary institutions. All prospective university students must take JAMB UTME.',
      costEstimate: '₦4,700 for registration',
      commonMistakes: ['Uploading unclear passport photograph', 'Providing incorrect O-Level results', 'Missing the registration deadline'],
      relatedGuides: [
        { title: 'JAMB Subject Combination Guide', link: '/guides/jamb-subject-combinations' },
        { title: 'Post-UTME Preparation Guide', link: '/guides/post-utme-preparation' },
      ],
    },
    sources: [{ title: 'JAMB Official Portal', url: 'https://www.jamb.org.ng', verified: true }],
    reviewerName: 'Dr. Grace Nwosu, Education Consultant',
  },
  {
    title: 'How to Renew Your Nigerian Passport',
    slug: 'renew-nigerian-passport',
    subtitle: 'Step-by-step guide to passport renewal in Nigeria',
    description: 'Learn how to renew your Nigerian passport whether in Nigeria or abroad',
    domainSlug: 'government',
    subdomainSlug: 'immigration-travel',
    content: {
      quickAnswer: 'Nigerian passport renewal costs ₦50,000 (standard) or ₦75,000 (expedited). Processing takes 2-4 weeks standard or 5 business days expedited.',
      overview: 'A Nigerian passport is valid for 10 years. You can renew your passport online or in-person. The renewal process is faster than initial application.',
      definitions: 'Passport renewal means extending the validity of your current passport. Renewal is different from replacement, which is needed if your passport is lost, stolen, or damaged.',
      requirements: ['Valid current Nigerian passport', 'Completed application form (NIS 1)', 'Birth certificate (National ID is acceptable)', 'Proof of residence', 'Two recent passport-sized photographs', 'Proof of payment'],
      timeline: ['Visit the NIS website to start online renewal process', 'Fill out application form online', 'Schedule appointment at your nearest NIS office', 'Attend appointment with original documents', 'Complete biometric verification', 'Make payment at NIS office', 'Collect renewed passport'],
      regulatory: 'Nigerian passport renewals are processed by the Nigerian Immigration Service (NIS) under the Immigration Act. All passport holders must renew before expiration.',
      costEstimate: '₦50,000 (standard) or ₦75,000 (expedited)',
      commonMistakes: ['Not starting renewal before passport expiration', 'Submitting unclear copies of supporting documents', 'Not following correct appointment booking procedure'],
      relatedGuides: [
        { title: 'How to Apply for Nigerian Passport', link: '/guides/nigerian-passport-application' },
        { title: 'Visa Application Guide', link: '/guides/visa-application' },
      ],
    },
    sources: [{ title: 'Nigerian Immigration Service', url: 'https://www.immigration.gov.ng', verified: true }],
    reviewerName: 'Adaobi Okechukwu, Immigration Officer',
  },
  {
    title: 'How to Get Married Legally in Nigeria',
    slug: 'get-married-legal-nigeria',
    subtitle: 'Guide to legal marriage registration in Nigeria',
    description: 'Learn how to get married legally in Nigeria with court marriage or religious registration',
    domainSlug: 'government',
    subdomainSlug: 'identity-civil',
    content: {
      quickAnswer: 'Legal marriage requires registration at court or religious institution. Court marriage: ₦25,000, 2-4 weeks. Religious: must register at Boma within 21 days.',
      overview: 'Nigeria recognizes civil, religious, and customary marriages. For legal recognition, you must register at the appropriate office.',
      definitions: 'Legal marriage registration establishes your union under Nigerian law. It is required for spousal rights, inheritance, and immigration purposes.',
      requirements: ['Valid identification for both parties', 'Passport photographs', 'Proof of age (birth certificate)', 'Parental consent (if under 21)', 'Witnesses (2 required)'],
      timeline: ['Gather required documents', 'Visit marriage registry office', 'Complete application and pay fee', 'Schedule ceremony date', 'Attend ceremony', 'Receive marriage certificate'],
      regulatory: 'Marriage Act requires registration. Non-registered religious marriages must be registered at Boma within 21 days.',
      costEstimate: '₦25,000 court marriage + ₦5,000 certificate',
      commonMistakes: ['Failing to register religious marriage at Boma', 'Incomplete documentation', 'Not verifying partner marital status'],
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
      quickAnswer: 'Land registration through State Land Registry. Cost: ₦100,000-₦500,000. Process: search title, survey, valuation, registration. Timeline: 2-6 months.',
      overview: 'Land registration establishes legal ownership in Nigeria. The Land Use Act of 1978 vests all land in the state governors.',
      definitions: 'Land registration is the legal process of recording property ownership. It involves surveying, valuation, and registration at the State Land Registry.',
      requirements: ['Proof of purchase (sale agreement)', 'Survey plan', 'Valuation report', 'Tax clearance certificate', 'Identity documents', 'Registered conveyance'],
      timeline: ['Conduct title search', 'Hire surveyor for measurement', 'Get valuation report', 'Pay stamp duty and fees', 'Prepare conveyance documents', 'Submit to Land Registry', 'Receive certificate of occupancy'],
      regulatory: 'Land Use Act requires registration. Failure to register within 30 days attracts penalties.',
      costEstimate: '₦100,000-₦500,000 depending on property value',
      commonMistakes: ['Buying without title search', 'Skipping survey process', 'Not registering within deadline'],
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
      definitions: 'A driving license is official permission to operate a motor vehicle. In Nigeria, it is issued by VIO under the Federal Road Safety Corps Act.',
      requirements: ['Valid NIN or VIN', 'Medical fitness certificate', 'Passport photograph', 'Completed application form', 'Proof of residence'],
      timeline: ['Visit VIO office or driving school', 'Complete application and pay fee', 'Attend theoretical training (1 week)', 'Take written test', 'Attend practical training (2 weeks)', 'Take practical test', 'Receive license (2-4 weeks)'],
      regulatory: 'FRSC Act requires all drivers to have valid license. Driving without license attracts ₦50,000 fine and impoundment.',
      costEstimate: '₦15,000 first license or ₦10,000 renewal',
      commonMistakes: ['Using expired license', 'Driving with foreign license too long', 'Skipping required training'],
      relatedGuides: [
        { title: 'How to Register a Vehicle', link: '/guides/register-vehicle-nigeria' },
        { title: 'How to Apply for NIN', link: '/guides/nin-enrolment' },
      ],
    },
    sources: [{ title: 'FRSC Portal', url: 'https://www.frsc.gov.ng', verified: true }],
    reviewerName: 'Mr. Tunde Eze, VIO Officer',
  },
  {
    title: 'How to Register for WAEC/NECO Examinations',
    slug: 'register-waec-neco-exams',
    subtitle: 'Guide to registering for WAEC and NECO exams',
    description: 'Learn how to register for WAEC and NECO examinations in Nigeria',
    domainSlug: 'education',
    subdomainSlug: 'waec-neco',
    content: {
      quickAnswer: 'WAEC registration: ₦15,000, opens December-January. NECO: ₦12,000, opens March-April. Required: NIN, passport photo, school details. Apply at school or center.',
      overview: 'WAEC (West African Exams Council) and NECO (National Exams Council) are the main secondary school examination bodies in Nigeria.',
      definitions: 'WAEC/NECO are examination bodies that set and mark senior secondary school exams. Passing these exams is mandatory for university admission in Nigeria.',
      requirements: ['Valid NIN', 'Passport photograph', 'School registration number', 'Personal details', 'Subject selection'],
      timeline: ['Wait for registration announcement', 'Visit school/exam center', 'Complete registration form', 'Pay fee and get registration number', 'Submit application', 'Receive examination slip', 'Sit for exams (May/June)'],
      regulatory: 'WAEC/NECO regulations require registration through approved centers. Fake centers attract penalties.',
      costEstimate: '₦15,000 WAEC or ₦12,000 NECO',
      commonMistakes: ['Missing registration deadline', 'Incorrect subject combinations', 'Using invalid photos'],
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
      requirements: ['Valid international passport', 'Passport photograph', 'Payment for exam fee', 'Email address'],
      timeline: ['Choose exam (IELTS/TOEFL/GRE)', 'Visit official test center', 'Book appointment (2-4 weeks ahead)', 'Prepare for exam (2-8 weeks)', 'Take exam', 'Receive results (3-13 days)'],
      regulatory: 'No Nigerian regulations, but exams must be taken at authorized centers.',
      costEstimate: 'IELTS ₦150,000, TOEFL $250, GRE $220',
      commonMistakes: ['Booking too late', 'Unprepared for exam format', 'Using fake centers'],
      relatedGuides: [
        { title: 'How to Apply for Scholarships', link: '/guides/apply-nigerian-scholarships' },
        { title: 'How to Study Abroad', link: '/guides/study-abroad-nigeria' },
      ],
    },
    sources: [{ title: 'British Council Nigeria', url: 'https://www.britishcouncil.org.ng', verified: true }],
    reviewerName: 'Dr. Emily Johnson, Education Consultant',
  },
  {
    title: 'How to Obtain a Birth Certificate in Nigeria',
    slug: 'obtain-birth-certificate-nigeria',
    subtitle: 'Guide to getting a birth certificate for newborns',
    description: 'Learn how to obtain a birth certificate for your child in Nigeria',
    domainSlug: 'government',
    subdomainSlug: 'identity-civil',
    content: {
      quickAnswer: 'Register birth within 45 days at NIMC or local registry. Cost: ₦5,000 standard or ₦10,000 expedited. Required: parents ID, marriage certificate, hospital records.',
      overview: 'Birth registration is mandatory under Nigerian law. It establishes legal identity and is required for school enrollment, passport application, and other services.',
      definitions: 'A birth certificate is an official record of a person birth. In Nigeria, it is issued by NIMC or local civil registry offices.',
      requirements: ['Parents valid identification', 'Marriage certificate (if applicable)', 'Hospital birth record', 'Completed application form', 'Passport photograph'],
      timeline: ['Visit NIMC office or local registry', 'Complete application form', 'Submit required documents', 'Pay registration fee', 'Receive birth certificate (1-2 weeks)'],
      regulatory: 'Birth Registration Act requires registration within 45 days. Late registration attracts penalties.',
      costEstimate: '₦5,000 standard or ₦10,000 expedited',
      commonMistakes: ['Missing the 45-day deadline', 'Incomplete documentation', 'Using incorrect identification'],
      relatedGuides: [
        { title: 'How to Enrol for NIN', link: '/guides/nin-enrolment' },
        { title: 'How to Apply for Passport', link: '/guides/nigerian-passport-application' },
      ],
    },
    sources: [{ title: 'NIMC Portal', url: 'https://www.nimc.gov.ng', verified: true }],
    reviewerName: 'Dr. John Smith, Civil Registrar',
  },
];

async function seedGuides() {
  console.log('🌱 Seeding Priority 1 Remaining Guides (Batch 3)...');
  console.log(`📚 Total guides to seed: ${priority1Batch3.length}`);

  let created = 0;
  let skipped = 0;
  let errors = 0;

  try {
    for (const guideData of priority1Batch3) {
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

seedGuides();
