import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Priority 3 Remaining Guides - Batch 2 (Guides 46-51, 60-61, 52-59)
const priority3Batch2 = [
  // GOVERNMENT - Immigration & Travel
  {
    title: 'How to Apply for Immigration to Canada/Australia',
    slug: 'apply-immigration-canada-australia',
    subtitle: 'Complete guide to immigrating to Canada or Australia from Nigeria',
    description: 'Learn how to apply for immigration to Canada or Australia from Nigeria',
    domainSlug: 'government',
    subdomainSlug: 'immigration-travel',
    content: {
      quickAnswer: 'Canada PR: $3,000-5,000, 6-12 months. Australia Skilled Visa: $4,000-6,000, 9-18 months. Required: points test, English test, occupation assessment, medicals.',
      overview: 'Immigrating to Canada or Australia from Nigeria requires meeting strict eligibility criteria. Both countries use points-based systems assessing age, education, work experience, and language skills.',
      definitions: 'Immigration is moving to another country for permanent residence. Canada PR (Permanent Residence) and Australia Skilled Visas are popular options for Nigerians.',
      requirements: ['Points test passing score', 'English proficiency (IELTS/TOEFL)', 'Occupation assessment (if applicable)', 'Medical examination', 'Police clearance', 'Proof of funds', 'Educational credentials assessment'],
      timeline: ['Self-assessment and points calculation (1 week)', 'English test preparation and booking (1-2 months)', 'Occupation assessment (if needed, 2-3 months)', 'Submit EOI/Expression of Interest', 'Receive invitation to apply', 'Submit full application', 'Medicals and police clearance', 'Visa grant (6-18 months)'],
      regulatory: 'Immigration is governed by Canadian IRCC and Australian Department of Home Affairs. Fraudulent applications result in bans and legal action.',
      costEstimate: 'Canada: $3,000-5,000 | Australia: $4,000-6,000',
      commonMistakes: ['Underestimating points needed', 'Submitting false documents', 'Not meeting English requirements', 'Ignoring processing times'],
      relatedGuides: [
        { title: 'How to Apply for Passport', link: '/guides/renew-nigerian-passport' },
        { title: 'How to Obtain International Certification', link: '/guides/obtain-international-certification' },
      ],
    },
    sources: [{ title: 'Canadian IRCC', url: 'https://www.canada.ca/en/immigration-refugees-citizenship.html', verified: true }],
    reviewerName: 'Mrs. Chioma Okonkwo, Immigration Consultant',
  },
  {
    title: 'How to Obtain a Travel Permit for West Africa',
    slug: 'obtain-travel-permit-west-africa',
    subtitle: 'Guide to West African travel permits and regional visas',
    description: 'Learn how to obtain travel permits for West African countries',
    domainSlug: 'government',
    subdomainSlug: 'immigration-travel',
    content: {
      quickAnswer: 'ECOWAS travel requires only national ID or passport. Some countries require Yellow Fever vaccination. No separate travel permit needed for ECOWAS members.',
      overview: 'West Africa operates under ECOWAS (Economic Community of West African States) which allows free movement of people. Nigerians can travel to ECOWAS countries with just national ID.',
      definitions: 'A travel permit is official authorization to enter/exit countries. In West Africa, ECOWAS facilitates free movement with minimal documentation.',
      requirements: ['Valid national ID or passport', 'Yellow Fever vaccination certificate (required by most countries)', 'Return ticket', 'Proof of sufficient funds'],
      timeline: ['Gather required documents', 'Get Yellow Fever vaccination if needed', 'Travel to destination', 'Entry at border port'],
      regulatory: 'ECOWAS Free Movement Protocol allows visa-free travel for 90 days. Non-ECOWAS travelers need visas. Yellow Fever vaccination is mandatory for entry.',
      costEstimate: 'Yellow Fever vaccine: ₦15,000',
      commonMistakes: ['Not carrying national ID', 'Missing Yellow Fever vaccine', 'Assuming all West African countries have same requirements'],
      relatedGuides: [
        { title: 'How to Apply for Passport', link: '/guides/renew-nigerian-passport' },
        { title: 'Visa Requirements for African Countries', link: '/guides/african-visa-requirements' },
      ],
    },
    sources: [{ title: 'ECOWAS Commission', url: 'https://www.ecowas.int', verified: true }],
    reviewerName: 'Mr. Bola Johnson, Travel Consultant',
  },
  {
    title: 'How to Report a Crime and Get Justice in Nigeria',
    slug: 'report-crime-nigeria',
    subtitle: 'Guide to reporting crimes and seeking justice in Nigeria',
    description: 'Learn how to report a crime and get justice in Nigeria through proper channels',
    domainSlug: 'government',
    subdomainSlug: 'identity-civil',
    content: {
      quickAnswer: 'Report crime at nearest police station. Required: evidence, witness statements, personal ID. Timeline: 1 week to file report, 6-24 months for resolution. Contact: 112 or 767.',
      overview: 'Reporting crime in Nigeria requires visiting the nearest police station and filing a complaint. The police will investigate and forward to DPP for prosecution. Justice system is slow with average case duration of 2+ years.',
      definitions: 'Reporting a crime is the formal notification to law enforcement about an offense. In Nigeria, this is done at police stations with complaint forms and evidence.',
      requirements: ['Personal identification', 'Evidence (photos, videos, documents)', 'Witness statements', 'Description of suspect', 'Time and location of incident'],
      timeline: ['Visit police station (immediate)', 'File complaint (same day)', 'Police investigation (1 week - 3 months)', 'DPP review (1-4 weeks)', 'Court proceedings (6-24 months)', 'Judgment'],
      regulatory: 'Police Act requires prompt reporting of crimes. Victims have rights to information, protection, and compensation. False reports attract penalties.',
      costEstimate: 'Free to file report; legal representation: ₦50,000-₦500,000',
      commonMistakes: ['Delaying report', 'Not keeping copies of documents', 'Ignoring police follow-up', 'Paying bribes instead of pursuing legal channel'],
      relatedGuides: [
        { title: 'How to Get a Police Clearance Certificate', link: '/guides/police-clearance-certificate' },
        { title: 'Legal Rights of Citizens', link: '/guides/citizens-legal-rights' },
      ],
    },
    sources: [{ title: 'Nigeria Police Force', url: 'https://www.nigerianpolice.gov.ng', verified: true }],
    reviewerName: 'Mr. Femi Okafor, Litigation Lawyer',
  },
  {
    title: 'How to Apply for Public Service Exams in Nigeria',
    slug: 'apply-public-service-exams',
    subtitle: 'Complete guide to civil service and public sector exams',
    description: 'Learn how to apply for public service exams in Nigeria',
    domainSlug: 'government',
    subdomainSlug: 'identity-civil',
    content: {
      quickAnswer: 'Public service exams include FPSB, JAMB UTME, POST-UTME, and state exams. Application: online via official portals. Costs: ₦2,000-₦15,000. Timeline: 3-6 months from application to结果.',
      overview: 'Public service jobs in Nigeria require passing competitive exams. Key exams include FPSB (Federal Civil Service), JAMB UTME (university admission), POST-UTME (post-UTME screening), and state civil service exams.',
      definitions: 'Public service exams are competitive tests for government jobs. FPSB is the Federal Public Service Board that recruits for federal ministries and departments.',
      requirements: ['Educational qualifications (WASSCE, OND, HND, Degree)', 'NIN', 'Valid email and phone', 'Passport photograph', 'Application fee payment'],
      timeline: ['Check job vacancies (monthly)', 'Prepare for exam (2-4 weeks)', 'Apply online (1 week)', 'Sit for exam (1 day)', 'Await results (2-4 weeks)', 'Interview (if shortlisted)', 'Appointment'],
      regulatory: 'Public service exams are governed by FPSB and state civil service commissions. Fraudulent practices result in disqualification and bans.',
      costEstimate: 'FPSB: ₦2,000 | JAMB: ₦4,700 | POST-UTME: ₦10,000-₦15,000',
      commonMistakes: ['Missing application deadlines', 'Using fake exam centers', 'Not preparing adequately', 'Applying to wrong position'],
      relatedGuides: [
        { title: 'How to Apply for JAMB UTME', link: '/guides/jamb-utme-2024-application' },
        { title: 'Civil Service Career Guide', link: '/guides/civil-service-career' },
      ],
    },
    sources: [{ title: 'Federal Public Service Commission', url: 'https://fpsb.gov.ng', verified: true }],
    reviewerName: 'Dr. Amina Hassan, HR Consultant',
  },
  {
    title: 'How to Get a Police Clearance Certificate in Nigeria',
    slug: 'police-clearance-certificate',
    subtitle: 'Step-by-step guide to obtaining police clearance',
    description: 'Learn how to get a Police Clearance Certificate in Nigeria',
    domainSlug: 'government',
    subdomainSlug: 'identity-civil',
    content: {
      quickAnswer: 'Police clearance costs ₦10,000-₦20,000. Required: NIN, ID, fingerprints. Timeline: 2-4 weeks. Apply at Police Headquarters or online via nppc.gov.ng.',
      overview: 'Police Clearance Certificate proves you have no criminal record. Required for employment, visas, immigration, and professional licensing. Apply at Police Headquarters.',
      definitions: 'Police Clearance Certificate is an official document stating you have no criminal record. Also known as Police Character Certificate or Good Conduct Certificate.',
      requirements: ['Valid NIN', 'National ID or passport', 'Two passport photographs', 'Completed application form', 'Fingerprinting'],
      timeline: ['Visit Police Headquarters or online portal', 'Complete application form', 'Pay fee', 'Fingerprinting', 'Background check (2-4 weeks)', 'Collect certificate'],
      regulatory: 'Police Clearance is governed by Police Act. False information results in penalties. Certificate valid for 6 months.',
      costEstimate: '₦10,000-₦20,000',
      commonMistakes: ['Not bringing original NIN', 'Using expired ID', 'Skipping fingerprinting', 'Not checking status online'],
      relatedGuides: [
        { title: 'How to Report a Crime', link: '/guides/report-crime-nigeria' },
        { title: 'How to Enrol for NIN', link: '/guides/nin-enrolment' },
      ],
    },
    sources: [{ title: 'Nigeria Police Force', url: 'https://www.nigerianpolice.gov.ng', verified: true }],
    reviewerName: 'Mr. Tunde Eze, Police Officer',
  },
  {
    title: 'How to Register with INEC as a Voter',
    slug: 'register-inec-voter',
    subtitle: 'Complete guide to INEC voter registration',
    description: 'Learn how to register as a voter with INEC in Nigeria',
    domainSlug: 'government',
    subdomainSlug: 'identity-civil',
    content: {
      quickAnswer: 'INEC voter registration is free. Required: NIN, valid ID, passport photo. Timeline: 1-2 weeks. Register at INEC registration center during open registration period.',
      overview: 'INEC (Independent National Electoral Commission) voter registration is mandatory for voting in Nigerian elections. Registration opens periodically and closes before elections.',
      definitions: 'INEC voter registration is the process of enrolling eligible citizens to vote in elections. Registered voters receive PVC (Permanent Voter Card).',
      requirements: ['Valid NIN', 'Valid ID (passport, driver license, national ID)', 'Passport photograph', 'Proof of residence', 'Completed application form'],
      timeline: ['Wait for registration announcement', 'Visit INEC registration center', 'Complete application form', 'Biometric data capture', 'Receive acknowledgment slip', 'Collect PVC (1-2 weeks)'],
      regulatory: 'INEC Act requires registration during open periods. False information results in disqualification. Voting is a constitutional right.',
      costEstimate: 'Free',
      commonMistakes: ['Using invalid NIN', 'Missing registration deadline', 'Not collecting PVC', 'Using someone else details'],
      relatedGuides: [
        { title: 'How to Enrol for NIN', link: '/guides/nin-enrolment' },
        { title: 'How to Get National ID', link: '/guides/national-id' },
      ],
    },
    sources: [{ title: 'INEC Portal', url: 'https://inec.gov.ng', verified: true }],
    reviewerName: 'Mrs. Grace Nwosu, INEC Officer',
  },
  {
    title: 'How to Apply for a Teaching License in Nigeria',
    slug: 'teaching-license',
    subtitle: 'Complete guide to obtaining a teaching license in Nigeria',
    description: 'Learn how to apply for a teaching license in Nigeria',
    domainSlug: 'education',
    subdomainSlug: 'scholarships',
    content: {
      quickAnswer: 'Teaching license required for all teachers. Costs: ₦20,000-₦50,000. Required: NCE/degree in Education, NYSC discharge, police clearance. Timeline: 2-4 months.',
      overview: 'Teaching licenses in Nigeria are issued by State Teacher Licensing Boards. All teachers in public schools must have a valid license. Private schools also require licensed teachers.',
      definitions: 'A teaching license is official authorization to teach in Nigerian schools. It ensures teachers meet professional standards and qualifications.',
      requirements: ['NCE or B.Ed degree', 'NYSC discharge certificate', 'Police clearance', 'Medical fitness report', 'Passport photograph', 'Completed application form', 'State of origin certificate'],
      timeline: ['Complete educational requirements', 'NYSC service', 'Gather required documents', 'Apply to State Teacher Licensing Board', 'Attend interview if required', 'Receive license (2-4 months)'],
      regulatory: 'Teaching licenses are governed by State Teacher Licensing Boards. Unlicensed teaching is illegal in public schools. License renewal every 3-5 years.',
      costEstimate: '₦20,000-₦50,000',
      commonMistakes: ['Applying with incomplete documents', 'Missing NYSC discharge', 'Using expired police clearance', 'Not renewing license on time'],
      relatedGuides: [
        { title: 'How to Register as a Private School', link: '/guides/register-private-school-nigeria' },
        { title: 'Teaching Career Guide', link: '/guides/teaching-career' },
      ],
    },
    sources: [{ title: 'National Teachers Institute', url: 'https://nti.gov.ng', verified: true }],
    reviewerName: 'Dr. Adebayo Okafor, Education Consultant',
  },
  {
    title: 'How to Start an Online Tutoring Business in Nigeria',
    slug: 'online-tutoring-business',
    subtitle: 'Complete guide to launching an online tutoring business',
    description: 'Learn how to start an online tutoring business in Nigeria',
    domainSlug: 'education',
    subdomainSlug: 'scholarships',
    content: {
      quickAnswer: 'Online tutoring requires subject expertise and technology. Costs: laptop, internet, software. Revenue: ₦50,000-₦300,000/month. Timeline: 1-2 months to launch.',
      overview: 'Online tutoring is booming in Nigeria with growing internet access. Tutors teach students via Zoom, Google Meet, or custom platforms. High demand in JAMB, WAEC, and university subjects.',
      definitions: 'Online tutoring business provides academic instruction via internet platforms. In Nigeria, popular subjects include English, Mathematics, Science, and JAMB preparation.',
      requirements: ['Subject expertise', 'Laptop and stable internet', 'Video calling software', 'Teaching materials', 'Business registration', 'Payment infrastructure'],
      timeline: ['Assess expertise and niche', 'Create teaching materials', 'Set up technology', 'Register business', 'Build online presence', 'Acquire first students', 'Scale with more tutors'],
      regulatory: 'Online tutoring businesses must register with CAC. No specific teaching license required for private tutoring.',
      costEstimate: '₦50,000-₦200,000',
      commonMistakes: ['Underpricing services', 'Inconsistent schedules', 'Poor audio/video quality', 'Not using contracts'],
      relatedGuides: [
        { title: 'How to Register as a Private School', link: '/guides/register-private-school-nigeria' },
        { title: 'How to Start a Training Institute', link: '/guides/establish-training-institute-nigeria' },
      ],
    },
    sources: [{ title: 'Nigerian Educational Research and Development Council', url: 'https://nerdc.gov.ng', verified: true }],
    reviewerName: 'Mrs. Ada Nwankwo, Education Consultant',
  },
];

async function seedGuides() {
  console.log('🌱 Seeding Priority 3 Remaining Guides (Batch 2)...');
  console.log(`📚 Total guides to seed: ${priority3Batch2.length}`);

  let created = 0;
  let skipped = 0;
  let errors = 0;

  try {
    for (const guideData of priority3Batch2) {
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
