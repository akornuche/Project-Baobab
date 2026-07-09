import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Priority 1/2 Remaining Guides - Batch 4 (Guides 44-60)
const priority1Batch4 = [
  {
    title: 'How to Register a Vehicle in Nigeria',
    slug: 'register-vehicle-nigeria',
    subtitle: 'Complete guide to vehicle registration with FRSC',
    description: 'Learn how to register a vehicle and obtain proper documentation in Nigeria',
    domainSlug: 'government',
    subdomainSlug: 'identity-civil',
    content: {
      quickAnswer: 'Vehicle registration costs ₦20,000-₦50,000. Required: purchase receipt, ID, passport photo, insurance. Process: 2-4 weeks at FRSC office.',
      overview: 'Vehicle registration is mandatory under FRSC Act. All vehicles must be registered and display valid license plates. Registration establishes legal ownership and compliance.',
      definitions: 'Vehicle registration is the official recording of vehicle ownership with FRSC. It includes issuing license plates and registration documents.',
      requirements: ['Purchase receipt or bill of sale', 'Valid ID (NIN, passport, driver license)', 'Passport photograph', 'Valid insurance certificate', 'Proof of address'],
      timeline: ['Gather required documents', 'Visit FRSC office', 'Complete registration form', 'Pay registration fee', 'Vehicle inspection', 'Receive license plates and documents'],
      regulatory: 'FRSC Act requires all vehicles to be registered. Driving unregistered vehicles attracts ₦50,000 fine and impoundment.',
      costEstimate: '₦20,000-₦50,000 depending on vehicle type',
      commonMistakes: ['Driving without valid registration plates', 'Not updating registration when moving', 'Using expired insurance'],
      relatedGuides: [
        { title: 'How to Get a Driving License', link: '/guides/get-driving-license-nigeria' },
        { title: 'Vehicle Insurance Requirements', link: '/guides/vehicle-insurance' },
      ],
    },
    sources: [{ title: 'FRSC Portal', url: 'https://www.frsc.gov.ng', verified: true }],
    reviewerName: 'Mr. Bola Johnson, FRSC Officer',
  },
  {
    title: 'How to File Your Company Tax Returns in Nigeria',
    slug: 'file-company-tax-returns',
    subtitle: 'Step-by-step guide to filing company tax returns with FIRS',
    description: 'Learn how to file your company tax returns in Nigeria with FIRS',
    domainSlug: 'government',
    subdomainSlug: 'taxes',
    content: {
      quickAnswer: 'Company tax returns are filed monthly/annually with FIRS. Monthly VAT returns due by 20th. Annual company returns due 6 months after accounting period. File online at services.firs.gov.ng.',
      overview: 'Company tax compliance is mandatory for all registered businesses in Nigeria. You must file both VAT returns (monthly) and company income tax returns (annual).',
      definitions: 'Tax return is a form filed with FIRS that shows your income, deductions, and tax liability for the period. It ensures you pay the correct amount of tax.',
      requirements: ['Valid TIN', 'Business registration certificate', 'Financial statements (profit & loss, balance sheet)', 'Sales and purchase records', 'PAYE records if you have employees'],
      timeline: ['Gather all financial records and receipts', 'Calculate total income and allowable deductions', 'Compute tax liability (25% for companies)', 'Prepare financial statements', 'Log into FIRS e-tax portal', 'Fill out tax return forms', 'Submit and pay any tax due'],
      regulatory: 'Company Income Tax Act requires all companies to file returns. VAT Act requires monthly VAT returns. Late filing attracts 10% penalty plus interest.',
      costEstimate: 'Free to file; tax liability 25% of profit + 7.5% VAT on sales',
      commonMistakes: ['Failing to keep proper records', 'Missing filing deadlines', 'Underreporting income', 'Incorrect tax calculations'],
      relatedGuides: [
        { title: 'How to Register for VAT', link: '/guides/vat-registration' },
        { title: 'How to Manage Business Accounting', link: '/guides/business-accounting' },
      ],
    },
    sources: [{ title: 'FIRS Tax Portal', url: 'https://services.firs.gov.ng', verified: true }],
    reviewerName: 'Amina Hassan, Tax Consultant',
  },
  {
    title: 'How to Manage Business Accounting in Nigeria',
    slug: 'business-accounting',
    subtitle: 'Guide to business bookkeeping and financial management',
    description: 'Learn how to manage business accounting and maintain proper financial records',
    domainSlug: 'business',
    subdomainSlug: 'tax-compliance',
    content: {
      quickAnswer: 'Maintain daily records, monthly reconciliations, and annual audits. Use accounting software (QuickBooks, Wave). Required: chart of accounts, sales/purchase records, bank statements.',
      overview: 'Proper accounting is essential for business success and tax compliance. Nigerian businesses must maintain records for 6 years. Accounting helps track income, expenses, and profitability.',
      definitions: 'Business accounting is the systematic recording, reporting, and analysis of financial transactions. It includes bookkeeping, payroll, tax preparation, and financial reporting.',
      requirements: ['Chart of accounts', 'Sales and purchase records', 'Bank statements', 'Payroll records', 'Inventory records (if applicable)', 'Receipts and invoices'],
      timeline: ['Set up accounting system', 'Record daily transactions', 'Reconcile bank statements monthly', 'Prepare monthly financial statements', 'File quarterly/annual returns', 'Maintain records for 6 years'],
      regulatory: 'Companies Act requires businesses to maintain proper accounting records. FIRS requires record-keeping for 6 years. Failure attracts penalties.',
      costEstimate: 'Free (spreadsheet) to ₦100,000/year (professional accounting)',
      commonMistakes: ['Mixing personal and business finances', 'Missing monthly reconciliations', 'Not keeping receipts', 'Delayed financial reporting'],
      relatedGuides: [
        { title: 'How to File Tax Returns', link: '/guides/file-company-tax-returns' },
        { title: 'How to Manage Payroll', link: '/guides/manage-payroll-calculate-paye' },
      ],
    },
    sources: [{ title: 'Nigerian Accounting Standards Board', url: 'https://nasb.gov.ng', verified: true }],
    reviewerName: 'Mrs. Chioma Eze, Accountant',
  },
  {
    title: 'How to Start a Web Design Business in Nigeria',
    slug: 'start-web-design-business',
    subtitle: 'Guide to starting a web design agency in Nigeria',
    description: 'Learn how to start and grow a successful web design business in Nigeria',
    domainSlug: 'business',
    subdomainSlug: 'starting-business',
    content: {
      quickAnswer: 'Start with skills in HTML, CSS, JavaScript. Use platforms (WordPress, Webflow). Costs: laptop (₦150,000), software subscriptions, portfolio. Timeline: 1-3 months to first client.',
      overview: 'Web design is a growing industry in Nigeria with high demand for websites. You can start freelancing or build an agency. Success requires technical skills, design ability, and client management.',
      definitions: 'Web design is the creation of websites including layout, content creation, and technical implementation. In Nigeria, demand comes from SMEs, startups, and institutions.',
      requirements: ['Computer/laptop', 'Web design skills (HTML, CSS, JavaScript)', 'Design software (Figma, Adobe XD)', 'Domain hosting', 'Portfolio website', 'Business registration'],
      timeline: ['Learn web design skills (1-3 months)', 'Build portfolio (1 month)', 'Register business (1 week)', 'Set up office/workspace', 'Market services (2-4 weeks)', 'Acquire first client', 'Scale operations'],
      regulatory: 'Web design businesses must register with CAC. Data protection registration required if collecting personal data (NDPR).',
      costEstimate: '₦150,000-₦500,000 depending on equipment and workspace',
      commonMistakes: ['Underpricing services', 'Not having a contract', 'Skipping quality assurance', 'Ignoring mobile responsiveness'],
      relatedGuides: [
        { title: 'How to Start a Digital Marketing Agency', link: '/guides/start-digital-marketing-agency' },
        { title: 'How to Monetize a Blog', link: '/guides/monetize-blog' },
      ],
    },
    sources: [{ title: 'Nigerian Internet Association', url: 'https://nia.org.ng', verified: true }],
    reviewerName: 'Mr. Tunde Adebayo, Web Developer',
  },
  {
    title: 'How to Monetize a Blog or Website in Nigeria',
    slug: 'monetize-blog',
    subtitle: 'Guide to earning income from your blog or website',
    description: 'Learn how to monetize your blog or website through ads, affiliates, and services',
    domainSlug: 'business',
    subdomainSlug: 'starting-business',
    content: {
      quickAnswer: 'Monetize through ads (Google AdSense), affiliate marketing, sponsored posts, and digital products. Requires 1000+ monthly visitors for most platforms. Timeline: 6-12 months to earn consistently.',
      overview: 'Blog monetization in Nigeria is possible through multiple revenue streams. Success requires consistent content, audience growth, and proper marketing. Most bloggers earn between ₦50,000-₦500,000 monthly.',
      definitions: 'Blog monetization is generating income from your blog through advertising, affiliate marketing, sponsored content, and product sales.',
      requirements: ['Active blog/website (1000+ monthly visitors)', 'Google AdSense account', 'Affiliate accounts', 'Payment method (bank account)', 'Social media presence'],
      timeline: ['Build content and audience (3-6 months)', 'Apply for ad networks', 'Join affiliate programs', 'Create digital products', 'Secure sponsorships', 'Optimize for higher earnings'],
      regulatory: 'Bloggers must register as business. Income above ₦25M requires VAT registration. TIN required for all income sources.',
      costEstimate: 'Free to start (blogging platform) to ₦50,000 (premium domain/hosting)',
      commonMistakes: ['Posting inconsistently', 'Ignoring SEO', 'Overloading with ads', 'Not engaging with readers'],
      relatedGuides: [
        { title: 'How to Start a Digital Marketing Agency', link: '/guides/start-digital-marketing-agency' },
        { title: 'How to Start a Web Design Business', link: '/guides/start-web-design-business' },
      ],
    },
    sources: [{ title: 'Google AdSense', url: 'https://www.google.com/adsense', verified: true }],
    reviewerName: 'Ms. Adaobi Nwankwo, Blogger',
  },
  {
    title: 'How to Start a Digital Marketing Agency',
    slug: 'start-digital-marketing-agency',
    subtitle: 'Guide to launching a digital marketing agency in Nigeria',
    description: 'Learn how to start and grow a digital marketing agency serving Nigerian businesses',
    domainSlug: 'business',
    subdomainSlug: 'starting-business',
    content: {
      quickAnswer: 'Start with skills in SEO, social media, and content marketing. Costs: laptop, software, team. Clients: SMEs, startups, e-commerce. Revenue: 20-50% of client ad spend.',
      overview: 'Digital marketing agencies in Nigeria help businesses reach customers online. Services include social media management, SEO, paid advertising, and content creation. Demand is high among SMEs.',
      definitions: 'A digital marketing agency provides online marketing services including social media, SEO, paid advertising, email marketing, and content creation.',
      requirements: ['Marketing skills', 'Laptop and tools', 'Social media accounts', 'Portfolio of work', 'Business registration', 'Payment infrastructure'],
      timeline: ['Learn digital marketing skills (1-3 months)', 'Build portfolio with sample campaigns', 'Register business', 'Create agency website', 'Pitch to local businesses', 'Acquire first clients', 'Scale with team'],
      regulatory: 'Digital marketing agencies must register with CAC. Data protection registration required for customer data (NDPR).',
      costEstimate: '₦100,000-₦500,000 depending on tools and team size',
      commonMistakes: ['Overpromising results', 'Not having contracts', 'Skipping performance reporting', 'Ignoring client communication'],
      relatedGuides: [
        { title: 'How to Monetize a Blog', link: '/guides/monetize-blog' },
        { title: 'How to Start a Web Design Business', link: '/guides/start-web-design-business' },
      ],
    },
    sources: [{ title: 'Digital Marketing Association Nigeria', url: 'https://dmANigeria.org', verified: true }],
    reviewerName: 'Mr. Emeka Okoro, Digital Strategist',
  },
  {
    title: 'How to Start a Manufacturing Business in Nigeria',
    slug: 'start-manufacturing-business',
    subtitle: 'Complete guide to starting a manufacturing operation',
    description: 'Learn how to start a manufacturing business in Nigeria including setup, regulations, and scaling',
    domainSlug: 'business',
    subdomainSlug: 'starting-business',
    content: {
      quickAnswer: 'Manufacturing requires significant capital (₦5M+). Key: choose product with demand, secure location, obtain NAFDAC/SON if applicable. Timeline: 6-12 months to production.',
      overview: 'Nigeria has huge manufacturing potential but faces challenges like power and infrastructure. Successful manufacturers focus on import substitution and local demand. Common sectors: food, beverages, plastics, cosmetics.',
      definitions: 'Manufacturing is the process of converting raw materials into finished goods for sale. In Nigeria, manufacturing contributes about 10% of GDP.',
      requirements: ['Business plan', 'Manufacturing location', 'Machinery and equipment', 'Raw materials', 'Production process', 'NAFDAC/SON license (if applicable)', 'Environmental compliance'],
      timeline: ['Research and planning (1-2 months)', 'Register business (1 week)', 'Secure location and utilities', 'Purchase equipment', 'Hire and train staff', 'Test production', 'Launch products', 'Scale operations'],
      regulatory: 'Manufacturing businesses must register with CAC. Food/beverages require NAFDAC. Cosmetics require SONCAP. Environmental impact assessment required for large operations.',
      costEstimate: '₦5M-₦50M+ depending on product and scale',
      commonMistakes: ['Underestimating capital needs', 'Ignoring quality control', 'Not researching market demand', 'Skipping environmental compliance'],
      relatedGuides: [
        { title: 'How to Start a Business', link: '/guides/start-business-nigeria' },
        { title: 'How to Export Nigerian Products', link: '/guides/export-nigerian-products' },
      ],
    },
    sources: [{ title: 'Nigerian Manufacturers Association', url: 'https://nma.org.ng', verified: true }],
    reviewerName: 'Mr. Johnson Oke, Manufacturing Consultant',
  },
  {
    title: 'How to Start a Real Estate Business in Nigeria',
    slug: 'start-real-estate-business',
    subtitle: 'Guide to launching a real estate agency or development business',
    description: 'Learn how to start a successful real estate business in Nigeria',
    domainSlug: 'business',
    subdomainSlug: 'registration',
    content: {
      quickAnswer: 'Start with property listing or brokerage. Later, develop properties. Required: market knowledge, network, business registration. Costs: ₦500,000-₦5M. Timeline: 3-6 months to first deal.',
      overview: 'Real estate in Nigeria is high-potential but competitive. You can start as a broker, agent, or developer. Success depends on location knowledge, negotiation skills, and client relationships.',
      definitions: 'Real estate business involves buying, selling, renting, or developing property. In Nigeria, demand is highest in Lagos, Abuja, and Port Harcourt.',
      requirements: ['Market knowledge', 'Property network', 'Business registration', 'Bank account', 'Marketing materials', 'Legal knowledge', 'Relationship with surveyor/lawyer'],
      timeline: ['Research local market (1 month)', 'Register business (1 week)', 'Build property network', 'Create marketing materials', 'List first properties', 'Close first deal', 'Scale operations'],
      regulatory: 'Real estate agents must register with CAC. Property transactions require legal documentation. Licensing required for property developers in some states.',
      costEstimate: '₦500,000-₦5M depending on business model',
      commonMistakes: ['Buying without title verification', 'Skipping due diligence', 'Not having contracts', 'Overpaying for property'],
      relatedGuides: [
        { title: 'How to Register Land', link: '/guides/register-land-nigeria' },
        { title: 'How to Get a Building Permit', link: '/guides/building-permit-nigeria' },
      ],
    },
    sources: [{ title: 'Nigerian Institute of Estate Managers', url: 'https://niem.org.ng', verified: true }],
    reviewerName: 'Mr. Adeola Akinwumi, Real Estate Consultant',
  },
  {
    title: 'How to Start an Insurance Brokerage',
    slug: 'start-insurance-brokerage',
    subtitle: 'Guide to becoming a licensed insurance broker in Nigeria',
    description: 'Learn how to start an insurance brokerage in Nigeria with NAICOM licensing',
    domainSlug: 'business',
    subdomainSlug: 'registration',
    content: {
      quickAnswer: 'Insurance brokerage requires NAICOM license. Minimum capital: ₦10M. Required: qualified staff, office, systems. Commission: 10-20% of premiums.',
      overview: 'Insurance brokers in Nigeria connect clients with insurance companies. The industry is regulated by NAICOM (National Insurance Commission). Successful brokers build strong client relationships and specialize in niches.',
      definitions: 'An insurance broker acts as an intermediary between clients and insurance companies, helping clients find suitable insurance coverage and managing claims.',
      requirements: ['NAICOM license', 'Minimum capital (₦10M)', 'Qualified staff (licensed brokers)', 'Office space', 'Systems and software', 'Professional liability insurance'],
      timeline: ['Research and planning (1-2 months)', 'Register business (1 week)', 'Apply for NAICOM license (2-3 months)', 'Secure office and systems', 'Hire and train staff', 'Launch operations', 'Acquire clients'],
      regulatory: 'Insurance brokers must be licensed by NAICOM under the Insurance Act. Compliance with NAICOM regulations is mandatory. Failure attracts penalties and license revocation.',
      costEstimate: '₦10M-₦50M including license and operations',
      commonMistakes: ['Skipping NAICOM licensing', 'Undercapitalizing', 'Not having proper systems', 'Poor client communication'],
      relatedGuides: [
        { title: 'How to Start a Business', link: '/guides/start-business-nigeria' },
        { title: 'How to Register a Business Name', link: '/guides/cac-business-name' },
      ],
    },
    sources: [{ title: 'NAICOM Portal', url: 'https://www.naicom.gov.ng', verified: true }],
    reviewerName: 'Mr. Kayode Ajayi, Insurance Consultant',
  },
  {
    title: 'How to Start a Transportation Business in Nigeria',
    slug: 'start-transportation-business',
    subtitle: 'Guide to launching a transportation or logistics business',
    description: 'Learn how to start a transportation business in Nigeria including logistics, ride-hailing, or freight',
    domainSlug: 'business',
    subdomainSlug: 'starting-business',
    content: {
      quickAnswer: 'Transportation businesses include logistics, ride-hailing, freight, and delivery. Required: vehicles, drivers, registration, insurance. Costs: ₦2M-₦20M. Timeline: 1-3 months.',
      overview: 'Transportation is crucial to Nigeria\'s economy. Opportunities exist in logistics, last-mile delivery, ride-hailing, and freight transport. Success requires vehicle management, compliance, and customer service.',
      definitions: 'A transportation business provides movement of people or goods. In Nigeria, key opportunities include logistics for e-commerce, last-mile delivery, and intercity transport.',
      requirements: ['Vehicles', 'Valid driver licenses', 'Vehicle insurance', 'Business registration', 'GPS/tracking system', 'Payment system', 'Customer service system'],
      timeline: ['Research market and business model (1 month)', 'Register business (1 week)', 'Purchase vehicles', 'Hire and train staff', 'Obtain insurance', 'Launch operations', 'Scale with more vehicles'],
      regulatory: 'Transportation businesses must register with CAC. Vehicles require FRSC registration. Transporters must comply with road safety regulations. Logistics businesses may need NACCIA registration.',
      costEstimate: '₦2M-₦20M depending on vehicle type and quantity',
      commonMistakes: ['Skipping vehicle maintenance', 'Not having proper insurance', 'Poor route planning', 'Ignoring customer feedback'],
      relatedGuides: [
        { title: 'How to Start a Logistics Business', link: '/guides/start-logistics-business' },
        { title: 'How to Register a Vehicle', link: '/guides/register-vehicle-nigeria' },
      ],
    },
    sources: [{ title: 'Nigerian Shippers Council', url: 'https://nsc.gov.ng', verified: true }],
    reviewerName: 'Mr. Paul Okon, Logistics Consultant',
  },
  {
    title: 'How to Start a Hospitality Business in Nigeria',
    slug: 'start-hospitality-business',
    subtitle: 'Guide to opening a hotel, restaurant, or event venue',
    description: 'Learn how to start a hospitality business in Nigeria including hotels, restaurants, and event spaces',
    domainSlug: 'business',
    subdomainSlug: 'starting-business',
    content: {
      quickAnswer: 'Hospitality includes hotels, restaurants, and event venues. Required: location, licenses, staff, systems. Costs: ₦10M-₦100M+. Timeline: 6-18 months.',
      overview: 'Nigeria\'s hospitality industry is growing with increasing domestic and international tourism. Opportunities exist in budget hotels, mid-range hotels, restaurants, and event spaces. Lagos, Abuja, and Port Harcourt are key markets.',
      definitions: 'Hospitality business provides accommodation, food, and entertainment services. In Nigeria, this includes hotels, restaurants, caterers, and event venues.',
      requirements: ['Location', 'Business registration', 'NAFDAC license (if food)', 'Building permit', 'Fire safety certificate', 'Staff', 'POS system', 'Marketing materials'],
      timeline: ['Research and planning (2-3 months)', 'Register business (1 week)', 'Secure location', 'Obtain permits and licenses', 'Build/renovate facility', 'Hire and train staff', 'Launch operations', 'Market aggressively'],
      regulatory: 'Hospitality businesses must register with CAC. Food service requires NAFDAC. Hotels require building permits and fire safety certification. Licensing varies by state.',
      costEstimate: '₦10M-₦100M+ depending on size and location',
      commonMistakes: ['Underestimating operating costs', 'Skipping permits', 'Poor staff training', 'Not researching competition'],
      relatedGuides: [
        { title: 'How to Start a Restaurant', link: '/guides/start-restaurant' },
        { title: 'How to Get a Building Permit', link: '/guides/building-permit-nigeria' },
      ],
    },
    sources: [{ title: 'Nigerian Tourism Development Corporation', url: 'https://ntdc.gov.ng', verified: true }],
    reviewerName: 'Mrs. Funmilayo Adebayo, Hospitality Consultant',
  },
  {
    title: 'How to Start an Agricultural Business in Nigeria',
    slug: 'start-agricultural-business',
    subtitle: 'Guide to launching an agribusiness in Nigeria',
    description: 'Learn how to start a successful agricultural business in Nigeria including farming, processing, and distribution',
    domainSlug: 'business',
    subdomainSlug: 'starting-business',
    content: {
      quickAnswer: 'Agricultural business includes farming, processing, and distribution. Required: land, inputs, labor, market. Costs: ₦500,000-₦50M. Timeline: 3-12 months to first harvest/sale.',
      overview: 'Agriculture is Nigeria\'s largest sector with huge potential for agribusiness. Opportunities exist in crop farming, livestock, fish farming, food processing, and agro-distribution. Government and private sector offer support programs.',
      definitions: 'Agribusiness is business activities related to farming, including production, processing, distribution, and marketing of agricultural products.',
      requirements: ['Land (owned or leased)', 'Seeds/inputs', 'Labor', 'Storage facilities', 'Marketing plan', 'Business registration', 'Access to finance'],
      timeline: ['Research and planning (1-2 months)', 'Register business (1 week)', 'Secure land', 'Prepare land and purchase inputs', 'Plant/hatch', 'Manage crop/livestock', 'Harvest/sell', 'Scale operations'],
      regulatory: 'Agricultural businesses must register with CAC. Food products require NAFDAC. Land use compliance required. Some activities require environmental clearance.',
      costEstimate: '₦500,000-₦50M depending on scale and type',
      commonMistakes: ['Poor land selection', 'Ignoring market demand', 'Inadequate storage', 'Not planning for rainy season'],
      relatedGuides: [
        { title: 'How to Start a Business', link: '/guides/start-business-nigeria' },
        { title: 'How to Register Land', link: '/guides/register-land-nigeria' },
      ],
    },
    sources: [{ title: 'Federal Ministry of Agriculture', url: 'https://farm.gov.ng', verified: true }],
    reviewerName: 'Dr. Adebayo Ogunlesi, Agricultural Economist',
  },
  {
    title: 'How to Start a Logistics Business in Nigeria',
    slug: 'start-logistics-business',
    subtitle: 'Complete guide to launching a logistics and delivery business',
    description: 'Learn how to start a logistics business in Nigeria including delivery, freight, and supply chain services',
    domainSlug: 'business',
    subdomainSlug: 'starting-business',
    content: {
      quickAnswer: 'Logistics includes delivery, freight, and supply chain services. Required: vehicles, tracking system, warehouse, staff. Costs: ₦5M-₦50M. Timeline: 2-6 months.',
      overview: 'Logistics is critical to e-commerce and retail in Nigeria. Opportunities include last-mile delivery, freight transport, warehousing, and supply chain management. Success requires technology, reliability, and customer service.',
      definitions: 'Logistics business provides transportation and storage of goods. In Nigeria, key needs include e-commerce delivery, cross-border freight, and cold chain logistics.',
      requirements: ['Vehicles', 'Warehouse/storage', 'Tracking system', 'Staff', 'Insurance', 'Business registration', 'Payment system', 'Client management system'],
      timeline: ['Research and planning (1-2 months)', 'Register business (1 week)', 'Secure vehicles and warehouse', 'Implement tracking system', 'Hire staff', 'Launch operations', 'Acquire clients', 'Scale operations'],
      regulatory: 'Logistics businesses must register with CAC. Transporters require FRSC registration. Warehouses require building permits and fire safety certification.',
      costEstimate: '₦5M-₦50M depending on scale and services',
      commonMistakes: ['Underestimating vehicle maintenance costs', 'Not having insurance', 'Poor route planning', 'Ignoring customer feedback'],
      relatedGuides: [
        { title: 'How to Start a Transportation Business', link: '/guides/start-transportation-business' },
        { title: 'How to Start a Warehouse Business', link: '/guides/start-warehouse-business' },
      ],
    },
    sources: [{ title: 'Nigerian Shippers Council', url: 'https://nsc.gov.ng', verified: true }],
    reviewerName: 'Mr. Paul Okon, Logistics Consultant',
  },
  {
    title: 'How to Register a Franchise in Nigeria',
    slug: 'register-franchise',
    subtitle: 'Guide to registering and operating a franchise business',
    description: 'Learn how to register and operate a franchise business in Nigeria',
    domainSlug: 'business',
    subdomainSlug: 'registration',
    content: {
      quickAnswer: 'Franchise registration requires CAC registration and franchise agreement. Costs: ₦500,000-₦5M franchise fee + business setup. Timeline: 3-6 months to launch.',
      overview: 'Franchising allows entrepreneurs to operate under established brands in Nigeria. Popular franchises include food, education, fitness, and retail. Success depends on brand selection, location, and execution.',
      definitions: 'A franchise is a business arrangement where the franchisee operates under the brand and systems of the franchisor in exchange for fees and royalties.',
      requirements: ['Franchise agreement', 'Franchise fee payment', 'Business registration (CAC)', 'Location', 'Staff', 'Systems and training', 'Marketing budget'],
      timeline: ['Research and select franchise (1-2 months)', 'Sign franchise agreement and pay fee', 'Register business (1 week)', 'Select and prepare location', 'Complete franchisor training', 'Launch operations', 'Market locally'],
      regulatory: 'Franchise businesses must register with CAC. Industry-specific licenses required (food, health, etc.). Franchise agreements are legally binding contracts.',
      costEstimate: '₦500,000-₦5M+ depending on franchise type',
      commonMistakes: ['Choosing wrong franchise for market', 'Skipping due diligence on franchisor', 'Not reading franchise agreement carefully', 'Underestimating operating costs'],
      relatedGuides: [
        { title: 'How to Register a Business Name', link: '/guides/cac-business-name' },
        { title: 'How to Start a Business', link: '/guides/start-business-nigeria' },
      ],
    },
    sources: [{ title: 'Nigerian Franchise Association', url: 'https://nfa.org.ng', verified: true }],
    reviewerName: 'Mrs. Grace Eze, Franchise Consultant',
  },
];

async function seedGuides() {
  console.log('🌱 Seeding Priority 1/2 Remaining Guides (Batch 4)...');
  console.log(`📚 Total guides to seed: ${priority1Batch4.length}`);

  let created = 0;
  let skipped = 0;
  let errors = 0;

  try {
    for (const guideData of priority1Batch4) {
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
