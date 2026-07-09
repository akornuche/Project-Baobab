import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Priority 3 Remaining Guides - Batch 1 (Guides 62-65)
const priority3Batch1 = [
  {
    title: 'How to Register as a Private School in Nigeria',
    slug: 'register-private-school-nigeria',
    subtitle: 'Complete guide to registering a private school in Nigeria',
    description: 'Learn how to register and operate a private school in Nigeria',
    domainSlug: 'education',
    subdomainSlug: 'scholarships',
    content: {
      quickAnswer: 'Private school registration costs ₦100,000-₦500,000. Required: premises, staff, curriculum, state approval. Timeline: 3-6 months.',
      overview: 'Private schools in Nigeria must be registered with the State Ministry of Education and approved by the National Board for Technical Education (NBTE) or National Board for Adult Education (NABTEB) depending on the level.',
      definitions: 'A private school is an educational institution not funded by government. Registration ensures compliance with educational standards and qualifies students for national examinations.',
      requirements: ['Registered company name', 'Owned or leased premises', 'Qualified teaching staff', 'Approved curriculum', 'School management committee', 'State Ministry of Education approval', 'NBTE/NABTEB approval (if applicable)'],
      timeline: ['Company registration (1 week)', 'Secure premises and facilities', 'Recruit qualified staff', 'Develop curriculum', 'Apply to State Ministry of Education', 'Inspection and approval', 'NBTE/NABTEB approval (if needed)', 'Operational license'],
      regulatory: 'Private schools must register with State Ministry of Education. Schools offering technical education require NBTE approval. All schools must follow national curriculum and prepare students for WAEC/NECO.',
      costEstimate: '₦100,000-₦500,000 depending on school size and location',
      commonMistakes: ['Operating without registration', 'Using unqualified teachers', 'Skipping state inspection', 'Not following national curriculum'],
      relatedGuides: [
        { title: 'How to Register a Business Name', link: '/guides/cac-business-name' },
        { title: 'How to Register a Company', link: '/guides/register-llc-nigeria' },
      ],
    },
    sources: [{ title: 'Federal Ministry of Education', url: 'https://www.education.gov.ng', verified: true }],
    reviewerName: 'Dr. Adebayo Okafor, Education Consultant',
  },
  {
    title: 'How to Apply for Research Grants as an Academic in Nigeria',
    slug: 'apply-research-grants-nigeria',
    subtitle: 'Complete guide to securing research funding in Nigeria',
    description: 'Learn how to apply for research grants as an academic in Nigeria',
    domainSlug: 'education',
    subdomainSlug: 'scholarships',
    content: {
      quickAnswer: 'Research grants include TETFUND, NBA, NASENI, and university funds. Application: 6-12 months ahead. Required: research proposal, CV, institutional approval. Success rate: 20-30%.',
      overview: 'Nigerian academics have access to multiple research grant opportunities. TETFUND is the largest source for university lecturers. Other sources include professional associations, government agencies, and international donors.',
      definitions: 'A research grant is financial aid awarded to support academic research. Unlike scholarships, grants fund specific research projects rather than personal study.',
      requirements: ['Research proposal (detailed)', 'CV with publication record', 'Institutional approval', 'Budget breakdown', 'Ethics approval (if applicable)', 'Letters of support'],
      timeline: ['Research grant opportunities (2-3 months)', 'Develop proposal (1-2 months)', 'Gather supporting documents', 'Submit application', 'Peer review (2-4 months)', 'Interview/presentation (if required)', 'Await decision', 'Start research if awarded'],
      regulatory: 'Grants require ethical compliance and proper financial reporting. TETFUND requires quarterly progress reports. Failure to comply may result in repayment demands.',
      costEstimate: 'Free to apply; grants range from ₦500,000 to ₦50M depending on scope',
      commonMistakes: ['Submitting generic proposals', 'Incomplete budget justification', 'Skipping ethics approval', 'Missing application deadlines'],
      relatedGuides: [
        { title: 'How to Apply for Scholarships', link: '/guides/apply-nigerian-scholarships' },
        { title: 'How to Publish Academic Research', link: '/guides/publish-academic-research' },
      ],
    },
    sources: [{ title: 'TETFUND Portal', url: 'https://www.camt.gov.ng', verified: true }],
    reviewerName: 'Prof. John Adewumi, Research Consultant',
  },
  {
    title: 'How to Publish Academic Research from Nigeria',
    slug: 'publish-academic-research-nigeria',
    subtitle: 'Guide to publishing academic papers from Nigerian institutions',
    description: 'Learn how to publish academic research from Nigerian institutions in international journals',
    domainSlug: 'education',
    subdomainSlug: 'scholarships',
    content: {
      quickAnswer: 'Publish in Scopus/Web of Science journals. Required: quality research, manuscript, journal selection. Timeline: 6-18 months. Cost: ₦200,000-₦1M for open access.',
      overview: 'Publishing academic research is crucial for career advancement. Nigerian academics face challenges with publication costs and journal access. Success requires selecting appropriate journals and following submission guidelines.',
      definitions: 'Publishing academic research means sharing findings in peer-reviewed journals. In Nigeria, academics must navigate publication fees, journal selection, and open access requirements.',
      requirements: ['Completed research with results', 'Manuscript following journal guidelines', 'Ethics approval (if applicable)', 'Data analysis and figures', 'Cover letter', 'Suggested reviewers'],
      timeline: ['Choose target journal (1 week)', 'Format manuscript (1-2 weeks)', 'Submit manuscript', 'Peer review process (2-6 months)', 'Address reviewer comments', 'Resubmit and accept', 'Production and publication'],
      regulatory: 'Research involving humans/animals requires ethics committee approval. Plagiarism and data fabrication are academic violations with serious consequences.',
      costEstimate: 'Free for subscription journals; ₦200,000-₦1M for open access journals',
      commonMistakes: ['Submitting to predatory journals', 'Ignoring journal scope', 'Poor English editing', 'Missing ethics approval'],
      relatedGuides: [
        { title: 'How to Apply for Research Grants', link: '/guides/apply-research-grants-nigeria' },
        { title: 'How to Obtain International Certification', link: '/guides/obtain-international-certification' },
      ],
    },
    sources: [{ title: 'Nigerian Journal of Scientific Research', url: 'https://njsr.org.ng', verified: true }],
    reviewerName: 'Dr. Ada Nwosu, Academic Publisher',
  },
  {
    title: 'How to Establish a Training Institute or Academy in Nigeria',
    slug: 'establish-training-institute-nigeria',
    subtitle: 'Complete guide to launching a training institute',
    description: 'Learn how to establish and operate a training institute in Nigeria',
    domainSlug: 'education',
    subdomainSlug: 'scholarships',
    content: {
      quickAnswer: 'Training institute registration costs ₦50,000-₦200,000. Required: premises, curriculum, certified instructors, approval. Timeline: 3-6 months.',
      overview: 'Training institutes in Nigeria provide vocational, technical, and professional training. Registration ensures legitimacy and allows graduates to sit for national certifications.',
      definitions: 'A training institute is an organization that provides structured training programs. In Nigeria, institutes must register with relevant regulatory bodies depending on their focus area.',
      requirements: ['Company registration', 'Training premises', 'Qualified instructors', 'Approved curriculum', 'Training materials', 'State Ministry of Education approval', 'NBTE approval (if technical/vocational)'],
      timeline: ['Company registration (1 week)', 'Secure premises', 'Hire qualified staff', 'Develop curriculum', 'Apply to relevant regulatory bodies', 'Inspection and approval', 'Operational license', 'Launch programs'],
      regulatory: 'Training institutes must register with State Ministry of Education. Technical institutes require NBTE approval. Professional training institutes may need relevant professional body approval.',
      costEstimate: '₦50,000-₦200,000 depending on program scope',
      commonMistakes: ['Operating without registration', 'Using unqualified instructors', 'Not following approved curriculum', 'Skipping regulatory inspections'],
      relatedGuides: [
        { title: 'How to Register as a Private School', link: '/guides/register-private-school-nigeria' },
        { title: 'How to Register a Business Name', link: '/guides/cac-business-name' },
      ],
    },
    sources: [{ title: 'National Board for Technical Education', url: 'https://nbte.gov.ng', verified: true }],
    reviewerName: 'Mr. Chike Eze, Training Consultant',
  },
];

async function seedGuides() {
  console.log('🌱 Seeding Priority 3 Remaining Guides (Batch 1)...');
  console.log(`📚 Total guides to seed: ${priority3Batch1.length}`);

  let created = 0;
  let skipped = 0;
  let errors = 0;

  try {
    for (const guideData of priority3Batch1) {
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
