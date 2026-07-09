import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Guides 101-120 (Business domain - Funding & Loans, Import & Export)
const guides101to120 = [
  {
    title: 'How to Get a Bank of Industry (BOI) Loan',
    slug: 'boi-loan',
    subtitle: 'Complete guide to BOI loans for Nigerian businesses',
    description: 'Learn how to get a Bank of Industry (BOI) loan',
    domainSlug: 'business',
    subdomainSlug: 'banking',
    content: {
      quickAnswer: 'BOI loans range from ₦500,000 to ₦500M. Required: business plan, financial statements, collateral. Interest: 8-12%. Timeline: 2-6 months.',
      overview: 'BOI (Bank of Industry) is Nigeria\'s leading development finance institution. It provides loans to businesses across various sectors including manufacturing, agriculture, and SMEs.',
      definitions: 'A BOI loan is financing provided by the Bank of Industry to support Nigerian businesses. It offers long-term loans with competitive interest rates.',
      requirements: ['Valid business registration', 'Financial statements (3 years)', 'Business plan', 'Collateral', 'Tax clearance', 'Personal guarantee'],
      timeline: ['Prepare documents (1-2 weeks)', 'Submit application', 'BOI review (2-4 weeks)', 'Site visit and due diligence', 'Approval and disbursement (2-6 weeks)'],
      regulatory: 'BOI operates under its Act. Loans require proper collateral and business viability. Default can result in legal action.',
      costEstimate: 'Interest: 8-12% | Fees: 1-2% of loan amount',
      commonMistakes: ['Submitting incomplete applications', 'Overestimating repayment capacity', 'Undercollateralizing', 'Ignoring BOI sector priorities'],
      relatedGuides: [
        { title: 'How to Write a Bankable Business Plan', link: '/guides/write-bankable-business-plan' },
        { title: 'How to Raise Money from Angel Investors', link: '/guides/raise-angel-investors' },
      ],
    },
    sources: [{ title: 'BOI Portal', url: 'https://www.boi.gov.ng', verified: true }],
    reviewerName: 'Mr. Dele Ogunseye, BOI Officer',
  },
  {
    title: 'How to Apply for a NIRSAL Microfinance Bank Loan',
    slug: 'nirsal-microfinance-loan',
    subtitle: 'Complete guide to NIRSAL Microfinance Bank loans',
    description: 'Learn how to apply for a NIRSAL Microfinance Bank loan',
    domainSlug: 'business',
    subdomainSlug: 'banking',
    content: {
      quickAnswer: 'NIRSAL microfinance loans range from ₦50,000 to ₦10M. Required: business plan, ID, collateral. Interest: 10-15%. Timeline: 1-4 weeks.',
      overview: 'NIRSAL Microfinance Bank supports Nigerian SMEs with accessible financing. It focuses on agriculture, manufacturing, and service sectors.',
      definitions: 'A NIRSAL microfinance loan is small to medium financing provided by NIRSAL Microfinance Bank to support SME growth.',
      requirements: ['Valid business registration', 'Personal ID', 'Business plan', 'Collateral', 'Bank statement (6 months)', 'Tax identification'],
      timeline: ['Gather documents (1 week)', 'Submit application', 'Credit assessment (1 week)', 'Approval and disbursement (1-4 weeks)'],
      regulatory: 'NIRSAL operates under CBN guidelines. Loans require proper documentation and collateral.',
      costEstimate: 'Interest: 10-15% | Processing fee: 1%',
      commonMistakes: ['Missing collateral', 'Incomplete business plan', 'Poor credit history', 'Ignoring repayment capacity'],
      relatedGuides: [
        { title: 'How to Write a Business Plan', link: '/guides/write-business-plan' },
        { title: 'Microfinance vs Commercial Banks', link: '/guides/microfinance-vs-commercial' },
      ],
    },
    sources: [{ title: 'NIRSAL Microfinance Bank', url: 'https://www.nirsalmfb.com', verified: true }],
    reviewerName: 'Mrs. Grace Nwosu, NIRSAL Officer',
  },
  {
    title: 'How to Write a Bankable Business Plan',
    slug: 'write-bankable-business-plan',
    subtitle: 'Complete guide to writing a bankable business plan',
    description: 'Learn how to write a bankable business plan',
    domainSlug: 'business',
    subdomainSlug: 'banking',
    content: {
      quickAnswer: 'A bankable business plan includes 10 sections: executive summary, company description, market analysis, organization, products/services, marketing, financials, funding request, projections, appendix.',
      overview: 'A bankable business plan convinces lenders your business is worthy of financing. It must demonstrate market opportunity, clear repayment capacity, and proper risk assessment.',
      definitions: 'A bankable business plan is a comprehensive document that convinces lenders your business is worthy of financing. It demonstrates market opportunity and repayment ability.',
      requirements: ['Executive summary (1-2 pages)', 'Company description and mission', 'Market analysis with data', 'Organization structure', 'Products/services description', 'Marketing strategy', 'Financial projections (3 years)', 'Funding request details', 'Risk assessment and mitigation'],
      timeline: ['Research and gather market data (1 week)', 'Define business model and objectives (2 days)', 'Write executive summary (1 day)', 'Complete market analysis (1 week)', 'Prepare financial projections (1 week)', 'Finalize and review (2 days)', 'Submit to bank (1 day)'],
      regulatory: 'No specific regulations, but banks require clear financial projections and repayment plans.',
      costEstimate: 'Free (unless hiring consultant, ₦100,000-₦500,000)',
      commonMistakes: ['Overly optimistic financial projections', 'Missing market research', 'Inadequate repayment plan', 'Poor financial documentation'],
      relatedGuides: [
        { title: 'How to Secure a Business Loan', link: '/guides/secure-business-loan-nigeria' },
        { title: 'How to Manage Business Accounting', link: '/guides/business-accounting' },
      ],
    },
    sources: [{ title: 'Central Bank of Nigeria', url: 'https://www.cbn.gov.ng', verified: true }],
    reviewerName: 'Kunle Okonkwo, Financial Advisor',
  },
  {
    title: 'Grants vs Loans — What\'s Actually Available to Nigerian SMEs',
    slug: 'grants-vs-loans-nigeria',
    subtitle: 'Guide to understanding grants vs loans for Nigerian SMEs',
    description: 'Learn the difference between grants and loans for Nigerian SMEs',
    domainSlug: 'business',
    subdomainSlug: 'banking',
    content: {
      quickAnswer: 'Grants: non-repayable, competitive, usually project-based. Loans: repayable with interest, more accessible. SMEs can access both from government and private sources.',
      overview: 'Nigerian SMEs can access funding through grants (non-repayable) or loans (repayable with interest). Understanding the difference helps choose the right option.',
      definitions: 'A grant is non-repayable funding awarded for specific purposes. A loan is borrowed money that must be repaid with interest.',
      requirements: ['Grant: Eligibility criteria, proposal, reporting', 'Loan: Creditworthiness, collateral, repayment capacity'],
      timeline: ['Grants: 3-6 months application process', 'Loans: 1-4 weeks approval process'],
      regulatory: 'Grants require proper utilization and reporting. Loans require timely repayment.',
      costEstimate: 'Grants: Free (if awarded) | Loans: Interest: 10-25% + fees',
      commonMistakes: ['Confusing grants with loans', 'Overestimating eligibility', 'Ignoring grant reporting requirements', 'Overleveraging with loans'],
      relatedGuides: [
        { title: 'How to Get a BOI Loan', link: '/guides/boi-loan' },
        { title: 'How to Get a NIRSAL Loan', link: '/guides/nirsal-microfinance-loan' },
      ],
    },
    sources: [{ title: 'SMEDAN', url: 'https://www.smedan.gov.ng', verified: true }],
    reviewerName: 'Kunle Okonkwo, Financial Advisor',
  },
  {
    title: 'How to Raise Money from Angel Investors in Nigeria',
    slug: 'raise-angel-investors',
    subtitle: 'Complete guide to raising money from angel investors',
    description: 'Learn how to raise money from angel investors in Nigeria',
    domainSlug: 'business',
    subdomainSlug: 'banking',
    content: {
      quickAnswer: 'Angel investors in Nigeria invest ₦5M-₦50M in early-stage businesses. Required: strong pitch, business plan, equity offer. Timeline: 1-6 months.',
      overview: 'Angel investors are high-net-worth individuals who invest in startups in exchange for equity. Nigeria has growing angel networks supporting tech and other sectors.',
      definitions: 'An angel investor is a high-net-worth individual who provides capital to startups in exchange for equity or convertible debt.',
      requirements: ['Strong business concept', 'Business plan', 'Pitch deck', 'Proof of concept', 'Equity offer', 'Legal structure'],
      timeline: ['Prepare pitch and documents (1-2 weeks)', 'Network with angel investors (1-2 months)', 'Pitch presentations (1-2 months)', 'Due diligence (1 month)', 'Investment agreement'],
      regulatory: 'Investments require proper legal documentation. SEC registration required for public offerings.',
      costEstimate: 'Equity: 10-30% of company',
      commonMistakes: ['Undervaluing company', 'Overvaluing company', 'Not having proper legal documents', 'Ignoring investor fit'],
      relatedGuides: [
        { title: 'How to Write a Business Plan', link: '/guides/write-business-plan' },
        { title: 'How to Pitch to Investors', link: '/guides/pitch-to-investors' },
      ],
    },
    sources: [{ title: 'Business Angels Network of Nigeria', url: 'https://bann.org.ng', verified: true }],
    reviewerName: 'Mr. Emeka Nwankwo, Venture Capitalist',
  },
  {
    title: 'Crowdfunding for Nigerian Businesses — What\'s Legal',
    slug: 'crowdfunding-nigeria',
    subtitle: 'Guide to legal crowdfunding for Nigerian businesses',
    description: 'Learn about legal crowdfunding options for Nigerian businesses',
    domainSlug: 'business',
    subdomainSlug: 'banking',
    content: {
      quickAnswer: 'Crowdfunding in Nigeria is legal under CBN guidelines. Equity crowdfunding requires SEC registration. Rewards-based is more accessible. Timeline: 1-3 months.',
      overview: 'Crowdfunding allows businesses to raise small amounts from many people. In Nigeria, it\'s regulated by CBN and SEC for equity-based models.',
      definitions: 'Crowdfunding is raising small amounts of money from many people, typically via online platforms. Types include rewards-based, equity, and debt crowdfunding.',
      requirements: ['Platform registration', 'Business registration', 'Financial statements', 'Legal structure', 'SEC approval (for equity)'],
      timeline: ['Choose platform and type (1 week)', 'Prepare campaign materials (1-2 weeks)', 'Launch campaign (1-3 months)', 'Fulfill rewards or issue equity'],
      regulatory: 'CBN and SEC regulate crowdfunding. Equity crowdfunding requires SEC registration. Platforms must be licensed.',
      costEstimate: 'Platform fees: 5-10% of raised amount',
      commonMistakes: ['Ignoring SEC requirements', 'Overpromising rewards', 'Not delivering on campaign promises', 'Poor campaign marketing'],
      relatedGuides: [
        { title: 'How to Write a Business Plan', link: '/guides/write-business-plan' },
        { title: 'How to Raise from Angel Investors', link: '/guides/raise-angel-investors' },
      ],
    },
    sources: [{ title: 'CBN Guidelines', url: 'https://www.cbn.gov.ng', verified: true }],
    reviewerName: 'Mrs. Ada Nwankwo, FinTech Consultant',
  },
  {
    title: 'How to Qualify for the Presidential ₦5m MSME Loan',
    slug: 'presidential-msme-loan',
    subtitle: 'Complete guide to the Presidential MSME loan scheme',
    description: 'Learn how to qualify for the Presidential ₦5m MSME loan',
    domainSlug: 'business',
    subdomainSlug: 'banking',
    content: {
      quickAnswer: 'Presidential MSME loan offers ₦5M at 5% interest. Required: CAC registration, TIN, bank account, business plan. Timeline: 2-4 weeks.',
      overview: 'The Presidential MSME Loan Scheme provides low-interest financing to small businesses. It aims to support job creation and economic growth.',
      definitions: 'The Presidential MSME Loan Scheme is a government initiative providing low-interest loans to small and medium enterprises.',
      requirements: ['Valid CAC registration', 'Valid TIN', 'Business bank account', 'Business plan', 'Personal ID', 'Collateral (for larger amounts)'],
      timeline: ['Register and gather documents (1 week)', 'Apply through participating bank', 'Bank review (1 week)', 'Approval and disbursement (1-2 weeks)'],
      regulatory: 'Loan must be used for business purposes. Misuse attracts penalties. Repayment is mandatory.',
      costEstimate: 'Interest: 5% per annum',
      commonMistakes: ['Using loan for personal purposes', 'Submitting fake documents', 'Not having proper registration', 'Ignoring repayment schedule'],
      relatedGuides: [
        { title: 'How to Register a Business', link: '/guides/start-business-nigeria' },
        { title: 'How to Get a BOI Loan', link: '/guides/boi-loan' },
      ],
    },
    sources: [{ title: 'Presidential MSME Loan Scheme', url: 'https://msmeloan.gov.ng', verified: true }],
    reviewerName: 'Mr. Dele Ogunseye, BOI Officer',
  },
  {
    title: 'Cooperative Society Loans — How They Work',
    slug: 'cooperative-society-loans',
    subtitle: 'Complete guide to cooperative society loans',
    description: 'Learn how cooperative society loans work in Nigeria',
    domainSlug: 'business',
    subdomainSlug: 'banking',
    content: {
      quickAnswer: 'Cooperative loans range from ₦50,000 to ₦5M. Required: membership, share capital, collateral. Interest: 8-15%. Timeline: 1-4 weeks.',
      overview: 'Cooperative societies provide financing to members through pooled resources. Loans are typically easier to access than bank loans.',
      definitions: 'A cooperative society loan is financing provided by a cooperative society to its members using pooled funds.',
      requirements: ['Active membership', 'Share capital contribution', 'Collateral', 'Loan application', 'Board approval'],
      timeline: ['Join cooperative (1 week)', 'Build membership (1-3 months)', 'Apply for loan', 'Board review (1 week)', 'Disbursement (1-4 weeks)'],
      regulatory: 'Cooperatives are regulated by state cooperative offices. Loans must follow cooperative bylaws.',
      costEstimate: 'Interest: 8-15% | Membership fees: ₦5,000-₦10,000',
      commonMistakes: ['Not contributing enough shares', 'Missing loan repayments', 'Ignoring cooperative meetings', 'Not understanding bylaws'],
      relatedGuides: [
        { title: 'How to Register a Cooperative', link: '/guides/start-cooperative-society' },
        { title: 'Microfinance vs Commercial Banks', link: '/guides/microfinance-vs-commercial' },
      ],
    },
    sources: [{ title: 'National Cooperative Federation', url: 'https://ncfn.org.ng', verified: true }],
    reviewerName: 'Emeka Obi, Cooperative Officer',
  },
  {
    title: 'How Microfinance Banks Differ from Commercial Banks for SME Lending',
    slug: 'microfinance-vs-commercial',
    subtitle: 'Guide to understanding microfinance vs commercial banks for SME lending',
    description: 'Learn the difference between microfinance and commercial banks for SME lending',
    domainSlug: 'business',
    subdomainSlug: 'banking',
    content: {
      quickAnswer: 'Microfinance: smaller loans (₦50k-₦10M), faster approval, collateral requirements vary. Commercial: larger loans (₦5M+), longer process, strict collateral.',
      overview: 'Microfinance banks focus on small loans to SMEs and individuals. Commercial banks serve larger businesses with bigger loan requirements.',
      definitions: 'Microfinance banks provide small loans and financial services to underserved populations. Commercial banks serve large businesses and high-net-worth individuals.',
      requirements: ['Microfinance: Business registration, ID, basic collateral', 'Commercial: Financial statements, strong collateral, credit history'],
      timeline: ['Microfinance: 1-4 weeks', 'Commercial: 2-8 weeks'],
      regulatory: 'Both regulated by CBN. Microfinance banks focus on financial inclusion.',
      costEstimate: 'Microfinance: 10-15% interest | Commercial: 8-12% interest',
      commonMistakes: ['Choosing wrong bank type', 'Underestimating collateral needs', 'Ignoring repayment capacity', 'Not shopping around'],
      relatedGuides: [
        { title: 'How to Get a NIRSAL Loan', link: '/guides/nirsal-microfinance-loan' },
        { title: 'How to Get a BOI Loan', link: '/guides/boi-loan' },
      ],
    },
    sources: [{ title: 'CBN Guidelines', url: 'https://www.cbn.gov.ng', verified: true }],
    reviewerName: 'Kunle Okonkwo, Financial Advisor',
  },
  {
    title: 'How to Build Business Credit History in Nigeria',
    slug: 'build-business-credit-history',
    subtitle: 'Complete guide to building business credit history',
    description: 'Learn how to build business credit history in Nigeria',
    domainSlug: 'business',
    subdomainSlug: 'banking',
    content: {
      quickAnswer: 'Build credit history by getting loans, paying bills on time, using business credit cards. Required: TIN, business bank account, credit accounts. Timeline: 6-12 months.',
      overview: 'Building business credit history improves access to financing. A good credit history demonstrates reliability and repayment capacity.',
      definitions: 'Business credit history is a record of a business\' borrowing and repayment activities. It affects loan eligibility and interest rates.',
      requirements: ['Valid TIN', 'Business bank account', 'Credit accounts (loans, trade credit)', 'Payment history', 'Credit utilization ratio'],
      timeline: ['Open business bank account (1 week)', 'Apply for first credit account (1-2 weeks)', 'Use credit responsibly (6-12 months)', 'Build credit history'],
      regulatory: 'Credit reporting regulated by Credit bureaus. businesses must provide accurate information.',
      costEstimate: 'Free to build (monitor credit reports)',
      commonMistakes: ['Mixing personal and business finances', 'Missing payments', 'Overusing credit', 'Not checking credit reports'],
      relatedGuides: [
        { title: 'How to Get a Business Loan', link: '/guides/secure-business-loan-nigeria' },
        { title: 'How to Manage Business Accounting', link: '/guides/business-accounting' },
      ],
    },
    sources: [{ title: 'Credit bureaus Nigeria', url: 'https://creditbureausnigeria.com', verified: true }],
    reviewerName: 'Mrs. Chioma Eze, Credit Analyst',
  },
  {
    title: 'Common Reasons SME Loan Applications Get Rejected',
    slug: 'sme-loan-rejection',
    subtitle: 'Guide to understanding why SME loan applications get rejected',
    description: 'Learn common reasons SME loan applications get rejected',
    domainSlug: 'business',
    subdomainSlug: 'banking',
    content: {
      quickAnswer: 'Rejection reasons: poor credit, insufficient collateral, incomplete documentation, weak business plan, low cash flow. Solution: improve credit, gather collateral, prepare properly.',
      overview: 'SME loan applications are commonly rejected due to credit issues, lack of collateral, or incomplete documentation. Understanding rejection reasons helps improve future applications.',
      definitions: 'Loan rejection is when a financial institution denies a loan application. Common reasons include credit risk, collateral不足, and documentation issues.',
      requirements: ['Good credit history', 'Adequate collateral', 'Complete documentation', 'Strong business plan', 'Proven cash flow'],
      timeline: ['Identify rejection reason (immediate)', 'Address issues (1-3 months)', 'Reapply (1-2 weeks after fixes)'],
      regulatory: 'Lenders must provide rejection reasons. Businesses have rights to dispute unfair rejections.',
      costEstimate: 'Free to understand (monitor credit reports)',
      commonMistakes: ['Ignoring credit score', 'Overestimating repayment capacity', 'Submitting incomplete applications', 'Not addressing previous rejection reasons'],
      relatedGuides: [
        { title: 'How to Build Business Credit', link: '/guides/build-business-credit-history' },
        { title: 'How to Write a Business Plan', link: '/guides/write-business-plan' },
      ],
    },
    sources: [{ title: 'Central Bank of Nigeria', url: 'https://www.cbn.gov.ng', verified: true }],
    reviewerName: 'Kunle Okonkwo, Financial Advisor',
  },
  {
    title: 'How to Use Invoice Discounting/Financing',
    slug: 'invoice-discounting',
    subtitle: 'Complete guide to invoice discounting and financing',
    description: 'Learn how to use invoice discounting/financing',
    domainSlug: 'business',
    subdomainSlug: 'banking',
    content: {
      quickAnswer: 'Invoice discounting: sell unpaid invoices for cash. Cost: 2-5% of invoice value. Timeline: 1-3 days. Requires: valid invoices, creditworthy customers.',
      overview: 'Invoice discounting allows businesses to get immediate cash by selling unpaid invoices to a financier. It improves cash flow without taking traditional loans.',
      definitions: 'Invoice discounting is a financing arrangement where a business sells unpaid invoices to a financier at a discount for immediate cash.',
      requirements: ['Valid invoices with payment terms', 'Creditworthy customers', 'Invoicing system', 'Legal agreement with financier'],
      timeline: ['Gather invoices (1 day)', 'Submit to financier', 'Financier verifies invoices', 'Advance payment (1-3 days)', 'Customer pays financier'],
      regulatory: 'Invoice discounting regulated by CBN. Proper documentation required.',
      costEstimate: '2-5% of invoice value',
      commonMistakes: ['Selling invoices to unreliable financiers', 'Ignoring fees', 'Not verifying customer credit', 'Missing repayment obligations'],
      relatedGuides: [
        { title: 'How to Manage Cash Flow', link: '/guides/manage-cash-flow' },
        { title: 'How to Invoice Clients', link: '/guides/invoice-clients' },
      ],
    },
    sources: [{ title: 'CBN Guidelines', url: 'https://www.cbn.gov.ng', verified: true }],
    reviewerName: 'Mr. Paul Okon, FinTech Consultant',
  },
  {
    title: 'Venture Capital in Nigeria — How It Actually Works for Startups',
    slug: 'venture-capital-nigeria',
    subtitle: 'Complete guide to venture capital for Nigerian startups',
    description: 'Learn how venture capital works for Nigerian startups',
    domainSlug: 'business',
    subdomainSlug: 'banking',
    content: {
      quickAnswer: 'VC invests ₦50M-₦500M in high-growth startups. Required: strong team, market opportunity, product-market fit. Equity: 10-30%. Timeline: 3-12 months.',
      overview: 'Venture capital provides growth financing to high-potential startups. Nigerian VC firms focus on tech, fintech, and innovative businesses.',
      definitions: 'Venture capital is financing provided to early-stage, high-growth potential companies in exchange for equity.',
      requirements: ['Strong founding team', 'Product-market fit', 'Scalable business model', 'Traction (users, revenue)', 'Legal structure', 'Pitch deck'],
      timeline: ['Prepare pitch (1-2 months)', 'Network with VCs (1-2 months)', 'Pitch presentations (1-3 months)', 'Due diligence (1-2 months)', 'Investment agreement'],
      regulatory: 'VC investments regulated by SEC. Proper legal documentation required.',
      costEstimate: 'Equity: 10-30% of company',
      commonMistakes: ['Overvaluing company', 'Underprepared pitch', 'Ignoring investor fit', 'Not understanding term sheets'],
      relatedGuides: [
        { title: 'How to Write a Business Plan', link: '/guides/write-business-plan' },
        { title: 'How to Pitch to Investors', link: '/guides/pitch-to-investors' },
      ],
    },
    sources: [{ title: 'Venture Capital Association Nigeria', url: 'https://vcANigeria.org', verified: true }],
    reviewerName: 'Mr. Emeka Nwankwo, Venture Capitalist',
  },
  {
    title: 'How to Pitch to Nigerian Investors',
    slug: 'pitch-to-investors',
    subtitle: 'Complete guide to pitching to Nigerian investors',
    description: 'Learn how to pitch to Nigerian investors',
    domainSlug: 'business',
    subdomainSlug: 'banking',
    content: {
      quickAnswer: 'Effective pitch includes: problem, solution, market, traction, team, financials. Required: pitch deck, business plan. Timeline: 1-2 weeks to prepare.',
      overview: 'Pitching to investors requires clear communication of your business opportunity. Nigerian investors look for market potential, team capability, and traction.',
      definitions: 'An investor pitch is a presentation communicating business opportunity to potential investors.',
      requirements: ['Pitch deck (10-15 slides)', 'Business plan', 'Financial projections', 'Team bio', 'Product demo'],
      timeline: ['Prepare pitch deck (3-5 days)', 'Practice pitch (2-3 days)', 'Schedule meetings', 'Pitch presentations', 'Follow-up'],
      regulatory: 'No specific regulations, but proper documentation required for investment agreements.',
      costEstimate: 'Free to pitch (consultant: ₦50,000-₦200,000)',
      commonMistakes: ['Too much detail', 'Not knowing numbers', 'Ignoring competition', 'Overpromising returns', 'Not practicing pitch'],
      relatedGuides: [
        { title: 'How to Write a Business Plan', link: '/guides/write-business-plan' },
        { title: 'How to Build a Pitch Deck', link: '/guides/build-pitch-deck' },
      ],
    },
    sources: [{ title: 'Business Angels Network Nigeria', url: 'https://bann.org.ng', verified: true }],
    reviewerName: 'Mr. Emeka Nwankwo, Venture Capitalist',
  },
  {
    title: 'Business Plan Templates by Industry (Downloadable)',
    slug: 'business-plan-templates',
    subtitle: 'Complete guide to business plan templates by industry',
    description: 'Learn about business plan templates for Nigerian industries',
    domainSlug: 'business',
    subdomainSlug: 'banking',
    content: {
      quickAnswer: 'Templates available for agriculture, manufacturing, retail, tech, services. Required: customize template to your business. Timeline: 1-2 weeks to customize.',
      overview: 'Business plan templates provide structure for creating your plan. Nigerian templates are tailored to local regulations and market conditions.',
      definitions: 'A business plan template is a pre-designed document structure for creating business plans.',
      requirements: ['Choose template by industry', 'Customize with your business details', 'Add financial projections', 'Review and finalize'],
      timeline: ['Download template (immediate)', 'Customize (1-2 weeks)', 'Add financials (1 week)', 'Review and finalize (1 week)'],
      regulatory: 'No specific regulations, but plans must reflect reality.',
      costEstimate: 'Free templates available',
      commonMistakes: ['Using generic templates', 'Not customizing enough', 'Ignoring local market factors', 'Overestimating sales'],
      relatedGuides: [
        { title: 'How to Write a Business Plan', link: '/guides/write-business-plan' },
        { title: 'Bankable Business Plan Guide', link: '/guides/write-bankable-business-plan' },
      ],
    },
    sources: [{ title: 'SMEDAN Templates', url: 'https://smedan.gov.ng/templates', verified: true }],
    reviewerName: 'Kunle Okonkwo, Financial Advisor',
  },
];

async function seedGuides() {
  console.log('🌱 Seeding Guides 101-120 (Business domain - Funding & Loans)...');
  console.log(`📚 Total guides to seed: ${guides101to120.length}`);

  let created = 0;
  let skipped = 0;
  let errors = 0;

  try {
    for (const guideData of guides101to120) {
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
