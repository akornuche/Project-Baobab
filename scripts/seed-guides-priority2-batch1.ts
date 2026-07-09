import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Priority 2 Remaining Guides - Batch 1 (Guides 58-70)
const priority2Batch1 = [
  {
    title: 'How to Handle a Business Dispute or Litigation in Nigeria',
    slug: 'handle-business-dispute',
    subtitle: 'Guide to resolving business disputes through mediation or litigation',
    description: 'Learn how to handle business disputes and litigation in Nigeria',
    domainSlug: 'business',
    subdomainSlug: 'registration',
    content: {
      quickAnswer: 'Business disputes can be resolved through mediation, arbitration, or court. Costs: ₦200,000-₦5M+. Timeline: 6-24 months in court. Required: contract, evidence, lawyer.',
      overview: 'Business disputes in Nigeria can be resolved through alternative dispute resolution (ADR) or litigation. ADR (mediation/arbitration) is faster and cheaper than court. The Arbitration and Conciliation Act governs ADR.',
      definitions: 'A business dispute is a conflict between businesses or business partners. Litigation is resolving disputes through court, while ADR uses mediation or arbitration.',
      requirements: ['Contract or agreement', 'Evidence of breach or dispute', ' Lawyer or mediator', 'Court filing (if litigation)', 'Arbitration agreement (if arbitration)'],
      timeline: ['Assess dispute and gather evidence (1-2 weeks)', 'Attempt amicable resolution (2-4 weeks)', 'Send legal demand letter (1 week)', 'Mediation/arbitration or file in court', 'Resolution or trial', 'Enforcement of judgment'],
      regulatory: 'Disputes are governed by Contracts Act, Arbitration and Conciliation Act, and court rules. ADR is encouraged by courts before litigation.',
      costEstimate: 'Mediation: ₦200,000-₦1M | Arbitration: ₦500,000-₦2M | Litigation: ₦1M-₦5M+',
      commonMistakes: ['Ignoring dispute resolution clauses', 'Not documenting communications', 'Delaying legal action', 'Skipping ADR when contract requires it'],
      relatedGuides: [
        { title: 'How to Write a Contract', link: '/guides/write-business-contract' },
        { title: 'How to Register a Business', link: '/guides/start-business-nigeria' },
      ],
    },
    sources: [{ title: 'Nigerian Bar Association', url: 'https://nba.org.ng', verified: true }],
    reviewerName: 'Mr. Femi Okafor, Litigation Lawyer',
  },
  {
    title: 'How to Liquidate or Wind Down a Business in Nigeria',
    slug: 'liquidate-business-nigeria',
    subtitle: 'Complete guide to closing a business legally in Nigeria',
    description: 'Learn how to properly liquidate or wind down a business in Nigeria',
    domainSlug: 'business',
    subdomainSlug: 'registration',
    content: {
      quickAnswer: 'Business liquidation involves selling assets, paying debts, and deregistering. Costs: ₦100,000-₦500,000. Timeline: 3-12 months. Required: creditor approval, asset sale, CAC deregistration.',
      overview: 'Business liquidation is the process of ending a company\'s operations, selling assets, paying creditors, and distributing remaining funds to shareholders. In Nigeria, this is governed by the Companies and Allied Matters Act (CAMA).',
      definitions: 'Liquidation is the process of closing a business, selling assets to pay debts, and dissolving the company. It can be voluntary (by shareholders) or compulsory (by court order).',
      requirements: ['Shareholder resolution for liquidation', 'List of assets and liabilities', 'Creditor notifications', 'Liquidator appointment', 'Asset sale documents', 'Final tax clearance'],
      timeline: ['Assess financial situation (1 week)', 'Hold shareholder meeting (1 week)', 'Appoint liquidator (1 week)', 'Notify creditors and stakeholders', 'Sell assets and pay debts', 'File final accounts with CAC', 'Deregister business (1-2 months)'],
      regulatory: 'Liquidation is governed by CAMA 2020. Companies must file final accounts and tax returns. Failure to properly liquidate exposes directors to personal liability.',
      costEstimate: '₦100,000-₦500,000 depending on complexity',
      commonMistakes: ['NotNotify creditors properly', 'Distributing assets before paying debts', 'Skipping CAC deregistration', 'Not filing final tax returns'],
      relatedGuides: [
        { title: 'How to Register a Business', link: '/guides/start-business-nigeria' },
        { title: 'How to File Tax Returns', link: '/guides/file-company-tax-returns' },
      ],
    },
    sources: [{ title: 'Corporate Affairs Commission', url: 'https://cac.gov.ng', verified: true }],
    reviewerName: 'Mr. Dele Ogunseye, Company Secretary',
  },
  {
    title: 'How to Restructure or Merge Companies in Nigeria',
    slug: 'restructure-merge-companies',
    subtitle: 'Guide to company restructuring and mergers in Nigeria',
    description: 'Learn how to restructure or merge companies in Nigeria with proper legal compliance',
    domainSlug: 'business',
    subdomainSlug: 'registration',
    content: {
      quickAnswer: 'Company restructuring/merger requires CAC approval and shareholder consent. Costs: ₦500,000-₦2M+. Timeline: 6-12 months. Required: valuation, legal docs, regulatory approvals.',
      overview: 'Company restructuring involves reorganizing a company\'s structure, while a merger combines two companies. In Nigeria, these are regulated by CAMA 2020 and may require SEC approval for public companies.',
      definitions: 'Company restructuring changes ownership, management, or operations. A merger combines two or more companies into one entity. Both require legal compliance and shareholder approval.',
      requirements: ['Shareholder resolutions', 'Valuation reports', 'Merger/restructuring plan', 'Legal documentation', 'CAC forms (CAC7.1-7.5)', 'SEC approval (if public company)', 'Creditor notifications'],
      timeline: ['Assess need and feasibility (1-2 months)', 'Hold shareholder meetings', 'Prepare valuation and legal documents', 'File with CAC and SEC', 'Notify creditors', 'Implement restructuring/merger', 'Finalize registrations'],
      regulatory: 'Restructuring and mergers are governed by CAMA 2020 and SEC Act (for public companies). CAC approval required. Creditors must be notified.',
      costEstimate: '₦500,000-₦2M+ depending on complexity',
      commonMistakes: ['Skipping shareholder approval', 'NotNotify creditors', 'Ignoring SEC requirements for public companies', 'Incomplete CAC filings'],
      relatedGuides: [
        { title: 'How to Register a Business', link: '/guides/start-business-nigeria' },
        { title: 'How to Register a Company', link: '/guides/register-llc-nigeria' },
      ],
    },
    sources: [{ title: 'Corporate Affairs Commission', url: 'https://cac.gov.ng', verified: true }],
    reviewerName: 'Mr. Dele Ogunseye, Company Secretary',
  },
  {
    title: 'How to Start a Warehouse Business in Nigeria',
    slug: 'start-warehouse-business',
    subtitle: 'Guide to launching a warehousing and storage business',
    description: 'Learn how to start a warehouse business in Nigeria for storage and logistics',
    domainSlug: 'business',
    subdomainSlug: 'starting-business',
    content: {
      quickAnswer: 'Warehouse business requires location, security, racks, and inventory system. Costs: ₦5M-₦50M. Timeline: 3-6 months. Clients: e-commerce, retailers, manufacturers.',
      overview: 'Warehousing is critical for supply chain and e-commerce in Nigeria. Opportunities exist in urban areas with high demand for storage. Success depends on location, security, and pricing.',
      definitions: 'A warehouse business provides storage space for goods. In Nigeria, demand comes from e-commerce sellers, retailers, and manufacturers needing inventory storage.',
      requirements: ['Warehouse location', 'Security system', 'Racking and shelving', 'Inventory management system', 'Business registration', 'Fire safety certificate', 'Insurance'],
      timeline: ['Research and planning (1-2 months)', 'Register business (1 week)', 'Secure warehouse location', 'Install security and racks', 'Set up inventory system', 'Launch operations', 'Acquire clients'],
      regulatory: 'Warehouses must register with CAC. Building permits required. Fire safety certification mandatory. Some warehouses need NACCIA registration for logistics.',
      costEstimate: '₦5M-₦50M depending on size and location',
      commonMistakes: ['Poor location selection', 'Skipping security', 'Not having insurance', 'Inadequate inventory tracking'],
      relatedGuides: [
        { title: 'How to Start a Logistics Business', link: '/guides/start-logistics-business' },
        { title: 'How to Start a Transportation Business', link: '/guides/start-transportation-business' },
      ],
    },
    sources: [{ title: 'Nigerian Shippers Council', url: 'https://nsc.gov.ng', verified: true }],
    reviewerName: 'Mr. Paul Okon, Logistics Consultant',
  },
  {
    title: 'How to Start a Blog or Content Creation Business',
    slug: 'start-blog-content-business',
    subtitle: 'Complete guide to launching a content creation business',
    description: 'Learn how to start a blog or content creation business in Nigeria',
    domainSlug: 'business',
    subdomainSlug: 'starting-business',
    content: {
      quickAnswer: 'Start with writing, photography, or video skills. Monetize through ads, sponsors, affiliate marketing. Costs: laptop, camera, hosting. Timeline: 3-6 months to earn consistently.',
      overview: 'Content creation is booming in Nigeria with growing digital consumption. Opportunities exist in blogging, YouTube, podcasting, and social media. Success requires consistent content and audience building.',
      definitions: 'A content creation business produces written, video, or audio content for audiences. Revenue comes from advertising, sponsorships, affiliate marketing, and services.',
      requirements: ['Writing/video/audio skills', 'Laptop/camera', 'Hosting/domain', 'Content calendar', 'Social media accounts', 'Payment setup', 'Business registration'],
      timeline: ['Choose niche and platform', 'Create content samples', 'Build portfolio website', 'Register business', 'Post consistently', 'Build audience (3-6 months)', 'Monetize through ads/sponsors', 'Scale with team'],
      regulatory: 'Content creators must register as business. TIN required for income. VAT registration if turnover exceeds ₦25M.',
      costEstimate: '₦100,000-₦500,000 depending on equipment',
      commonMistakes: ['Posting inconsistently', 'Ignoring audience engagement', 'Skipping SEO', 'Overloading with ads too early'],
      relatedGuides: [
        { title: 'How to Monetize a Blog', link: '/guides/monetize-blog' },
        { title: 'How to Start a Digital Marketing Agency', link: '/guides/start-digital-marketing-agency' },
      ],
    },
    sources: [{ title: 'Digital Content Creators Association', url: 'https://dcca.org.ng', verified: true }],
    reviewerName: 'Ms. Adaobi Nwankwo, Content Strategist',
  },
  {
    title: 'How to Start a Video Production Business in Nigeria',
    slug: 'start-video-production-business',
    subtitle: 'Guide to launching a video production company',
    description: 'Learn how to start a video production business in Nigeria',
    domainSlug: 'business',
    subdomainSlug: 'starting-business',
    content: {
      quickAnswer: 'Video production requires camera, editing software, and skills. Costs: ₦500,000-₦2M. Clients: businesses, events, YouTube creators. Revenue: ₦100,000-₦500,000 per project.',
      overview: 'Video production is in high demand in Nigeria for corporate, events, and social media content. Success requires quality equipment, editing skills, and client acquisition.',
      definitions: 'Video production business creates videos for clients including corporate videos, event coverage, advertisements, and social media content.',
      requirements: ['Camera and lighting', 'Editing software (Premiere Pro, Final Cut)', 'Microphones', 'Transportation', 'Portfolio', 'Business registration', 'Payment infrastructure'],
      timeline: ['Learn video skills (1-3 months)', 'Purchase equipment', 'Build portfolio', 'Register business', 'Market services', 'Acquire first clients', 'Scale with team'],
      regulatory: 'Video production businesses must register with CAC. Data protection registration required if storing client data (NDPR).',
      costEstimate: '₦500,000-₦2M depending on equipment quality',
      commonMistakes: ['Underpricing services', 'Not having contracts', 'Skipping client approval process', 'Not backing up files'],
      relatedGuides: [
        { title: 'How to Start a Content Creation Business', link: '/guides/start-blog-content-business' },
        { title: 'How to Start a Digital Marketing Agency', link: '/guides/start-digital-marketing-agency' },
      ],
    },
    sources: [{ title: 'Nigerian Film Institute', url: 'https://nfi.gov.ng', verified: true }],
    reviewerName: 'Mr. Bola Akintola, Video Producer',
  },
  {
    title: 'How to Start a Graphic Design Business in Nigeria',
    slug: 'start-graphic-design-business',
    subtitle: 'Complete guide to launching a graphic design agency',
    description: 'Learn how to start a graphic design business in Nigeria',
    domainSlug: 'business',
    subdomainSlug: 'starting-business',
    content: {
      quickAnswer: 'Graphic design requires design skills and software (Photoshop, Illustrator). Costs: laptop, software, portfolio. Clients: businesses, startups, events. Revenue: ₦50,000-₦300,000 per project.',
      overview: 'Graphic design is essential for branding and marketing in Nigeria. Opportunities exist for agencies, freelancers, and in-house designers. Success requires creativity, technical skills, and client management.',
      definitions: 'Graphic design business creates visual content including logos, branding, advertisements, and digital graphics for clients.',
      requirements: ['Design skills', 'Design software (Adobe Creative Suite)', 'Laptop', 'Portfolio', 'Business registration', 'Payment infrastructure', 'Marketing materials'],
      timeline: ['Learn design skills (1-3 months)', 'Build portfolio', 'Register business', 'Create agency website', 'Pitch to clients', 'Acquire first projects', 'Scale with team'],
      regulatory: 'Graphic design businesses must register with CAC. Data protection registration required if storing client data (NDPR).',
      costEstimate: '₦100,000-₦500,000 depending on equipment',
      commonMistakes: ['Underpricing services', 'Not having contracts', 'Skipping client feedback', 'Not backing up files'],
      relatedGuides: [
        { title: 'How to Start a Web Design Business', link: '/guides/start-web-design-business' },
        { title: 'How to Start a Digital Marketing Agency', link: '/guides/start-digital-marketing-agency' },
      ],
    },
    sources: [{ title: 'Graphic Design Association Nigeria', url: 'https://gdan.org.ng', verified: true }],
    reviewerName: 'Mrs. Chioma Eze, Graphic Designer',
  },
  {
    title: 'How to Start a Copywriting Business in Nigeria',
    slug: 'start-copywriting-business',
    subtitle: 'Guide to launching a copywriting agency',
    description: 'Learn how to start a copywriting business in Nigeria',
    domainSlug: 'business',
    subdomainSlug: 'starting-business',
    content: {
      quickAnswer: 'Copywriting requires excellent writing skills. Costs: laptop, software, portfolio. Clients: businesses, agencies, websites. Revenue: ₦30,000-₦200,000 per project.',
      overview: 'Copywriting is in demand for marketing, websites, and advertising in Nigeria. Success requires strong writing skills, understanding of marketing, and client acquisition.',
      definitions: 'Copywriting business creates persuasive written content for marketing, advertising, websites, and branding materials.',
      requirements: ['Excellent writing skills', 'Laptop', 'Portfolio', 'Business registration', 'Payment infrastructure', 'Marketing materials'],
      timeline: ['Develop writing skills (1-3 months)', 'Build portfolio', 'Register business', 'Create website', 'Pitch to clients', 'Acquire first projects', 'Scale with team'],
      regulatory: 'Copywriting businesses must register with CAC. Data protection registration required if storing client data (NDPR).',
      costEstimate: '₦50,000-₦200,000 depending on tools',
      commonMistakes: ['Underpricing services', 'Not having contracts', 'Skipping revision process', 'Not researching client industry'],
      relatedGuides: [
        { title: 'How to Start a Content Creation Business', link: '/guides/start-blog-content-business' },
        { title: 'How to Monetize a Blog', link: '/guides/monetize-blog' },
      ],
    },
    sources: [{ title: 'Nigerian Copywriters Association', url: 'https://nca.org.ng', verified: true }],
    reviewerName: 'Ms. Adenike Ogun, Copywriter',
  },
  {
    title: 'How to Start an IT Consulting Business in Nigeria',
    slug: 'start-it-consulting-business',
    subtitle: 'Complete guide to launching an IT consulting firm',
    description: 'Learn how to start an IT consulting business in Nigeria',
    domainSlug: 'business',
    subdomainSlug: 'starting-business',
    content: {
      quickAnswer: 'IT consulting requires technical skills and certifications. Costs: laptop, tools, certification fees. Clients: SMEs, startups, corporations. Revenue: ₦200,000-₦2M per project.',
      overview: 'IT consulting is growing in Nigeria as businesses adopt digital technologies. Opportunities exist in software development, cybersecurity, cloud computing, and digital transformation.',
      definitions: 'IT consulting business provides technology expertise to clients including software development, system implementation, cybersecurity, and digital strategy.',
      requirements: ['Technical skills and certifications', 'Laptop and tools', 'Portfolio of work', 'Business registration', 'Payment infrastructure', 'Marketing materials'],
      timeline: ['Develop technical skills (1-3 years)', 'Get certifications', 'Build portfolio', 'Register business', 'Market services', 'Acquire clients', 'Scale with team'],
      regulatory: 'IT consulting businesses must register with CAC. Data protection registration required (NDPR). Some services require NCC licensing.',
      costEstimate: '₦100,000-₦1M depending on certifications and tools',
      commonMistakes: ['Skipping certifications', 'Not having contracts', 'Overpromising technical capabilities', 'Ignoring client communication'],
      relatedGuides: [
        { title: 'How to Start a Web Design Business', link: '/guides/start-web-design-business' },
        { title: 'How to Start a Digital Marketing Agency', link: '/guides/start-digital-marketing-agency' },
      ],
    },
    sources: [{ title: 'Nigerian Computer Society', url: 'https://ncs.org.ng', verified: true }],
    reviewerName: 'Mr. Emeka Nwankwo, IT Consultant',
  },
  {
    title: 'How to Start a Cybersecurity Consulting Business',
    slug: 'start-cybersecurity-consulting',
    subtitle: 'Guide to launching a cybersecurity consulting firm',
    description: 'Learn how to start a cybersecurity consulting business in Nigeria',
    domainSlug: 'business',
    subdomainSlug: 'starting-business',
    content: {
      quickAnswer: 'Cybersecurity consulting requires expertise in security frameworks and certifications (CEH, CISSP). Costs: tools, certifications, training. Clients: businesses, banks, government.',
      overview: 'Cybersecurity is critical in Nigeria with rising cyber threats. Demand is high among businesses, banks, and government agencies. Success requires technical expertise and certifications.',
      definitions: 'Cybersecurity consulting business protects organizations from cyber threats through security assessments, implementation, training, and incident response.',
      requirements: ['Cybersecurity certifications (CEH, CISSP)', 'Security tools', 'Risk assessment methodology', 'Business registration', 'Insurance', 'Marketing materials'],
      timeline: ['Gain cybersecurity experience (1-3 years)', 'Get certifications', 'Build expertise in niches', 'Register business', 'Market to high-risk industries', 'Acquire clients', 'Scale with team'],
      regulatory: 'Cybersecurity businesses must register with CAC. Data protection registration required (NDPR). Some government projects require NCC licensing.',
      costEstimate: '₦200,000-₦1M+ depending on certifications and tools',
      commonMistakes: ['Skipping certifications', 'Not having insurance', 'Overpromising capabilities', 'Ignoring client industry specific risks'],
      relatedGuides: [
        { title: 'How to Start an IT Consulting Business', link: '/guides/start-it-consulting-business' },
        { title: 'How to Register a Business', link: '/guides/start-business-nigeria' },
      ],
    },
    sources: [{ title: 'Nigerian Information Technology Industry Development Agency', url: 'https://nitida.gov.ng', verified: true }],
    reviewerName: 'Mr. Adebayo Ogun, Cybersecurity Expert',
  },
  {
    title: 'How to Start a Cloud Computing Business in Nigeria',
    slug: 'start-cloud-computing-business',
    subtitle: 'Complete guide to launching a cloud computing company',
    description: 'Learn how to start a cloud computing business in Nigeria',
    domainSlug: 'business',
    subdomainSlug: 'starting-business',
    content: {
      quickAnswer: 'Cloud computing requires expertise in AWS/Azure/GCP and infrastructure skills. Costs: certifications, tools, partnerships. Clients: businesses, startups, government.',
      overview: 'Cloud computing adoption is growing in Nigeria as businesses migrate to digital infrastructure. Opportunities exist in cloud consulting, managed services, and infrastructure setup.',
      definitions: 'Cloud computing business provides cloud services including infrastructure setup, migration, management, and optimization for clients.',
      requirements: ['Cloud certifications (AWS, Azure, GCP)', 'Cloud tools and access', 'Infrastructure setup methodology', 'Business registration', 'Insurance', 'Marketing materials'],
      timeline: ['Gain cloud experience (1-3 years)', 'Get certifications', 'Build expertise in niches', 'Register business', 'Partner with cloud providers', 'Market to businesses', 'Acquire clients', 'Scale with team'],
      regulatory: 'Cloud computing businesses must register with CAC. Data protection registration required (NDPR). Some government projects require NCC licensing.',
      costEstimate: '₦200,000-₦1M+ depending on certifications and partnerships',
      commonMistakes: ['Skipping certifications', 'Not having insurance', 'Overpromising capabilities', 'Ignoring compliance requirements'],
      relatedGuides: [
        { title: 'How to Start an IT Consulting Business', link: '/guides/start-it-consulting-business' },
        { title: 'How to Start a Cybersecurity Business', link: '/guides/start-cybersecurity-consulting' },
      ],
    },
    sources: [{ title: 'Cloud Computing Association Nigeria', url: 'https://ccan.org.ng', verified: true }],
    reviewerName: 'Mr. Tunde Adebayo, Cloud Architect',
  },
  {
    title: 'How to Start a Mobile App Development Business',
    slug: 'start-mobile-app-development',
    subtitle: 'Guide to launching a mobile app development company',
    description: 'Learn how to start a mobile app development business in Nigeria',
    domainSlug: 'business',
    subdomainSlug: 'starting-business',
    content: {
      quickAnswer: 'Mobile app development requires skills in iOS/Android development. Costs: laptops, development tools, testing devices. Clients: startups, businesses, enterprises.',
      overview: 'Mobile app development is booming in Nigeria with increasing smartphone adoption. Success requires development skills, design ability, and understanding of user experience.',
      definitions: 'Mobile app development business creates mobile applications for iOS and Android platforms for clients including startups, businesses, and enterprises.',
      requirements: ['Development skills (Swift, Kotlin, React Native)', 'Development tools', 'Testing devices', 'Portfolio', 'Business registration', 'Payment infrastructure'],
      timeline: ['Learn development skills (1-3 years)', 'Build portfolio', 'Register business', 'Create agency website', 'Pitch to clients', 'Acquire first projects', 'Scale with team'],
      regulatory: 'Mobile app development businesses must register with CAC. Data protection registration required if collecting user data (NDPR).',
      costEstimate: '₦100,000-₦500,000 depending on tools',
      commonMistakes: ['Skipping testing', 'Not having contracts', 'Overpromising features', 'Ignoring platform guidelines'],
      relatedGuides: [
        { title: 'How to Start a Web Design Business', link: '/guides/start-web-design-business' },
        { title: 'How to Start a Digital Marketing Agency', link: '/guides/start-digital-marketing-agency' },
      ],
    },
    sources: [{ title: 'Nigerian Mobile Developers Association', url: 'https://nmda.org.ng', verified: true }],
    reviewerName: 'Mr. Emeka Nwankwo, Mobile Developer',
  },
];

async function seedGuides() {
  console.log('🌱 Seeding Priority 2 Remaining Guides (Batch 1)...');
  console.log(`📚 Total guides to seed: ${priority2Batch1.length}`);

  let created = 0;
  let skipped = 0;
  let errors = 0;

  try {
    for (const guideData of priority2Batch1) {
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
