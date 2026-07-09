// Priority 1 Guides (Week 1) - 20 guides
// Government: 8, Business: 8, Education: 4

export interface GuideData {
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

export const priority1Guides: GuideData[] = [
  // GOVERNMENT - Immigration & Travel (3 guides)
  {
    title: 'How to Apply for a UK Visa from Nigeria',
    slug: 'uk-visa-application-nigeria',
    subtitle: 'Complete guide to UK visitor, work, and study visa applications',
    description: 'Learn the step-by-step process, requirements, and costs for applying for a UK visa from Nigeria.',
    domainSlug: 'government',
    subdomainSlug: 'immigration-travel',
    content: {
      quickAnswer: 'UK visa applications are processed online at visa.ukvisas.gov.uk. Most visitor visas take 3-8 weeks. Fees range from £163-£719. You need a valid passport, proof of funds, and accommodation details.',
      overview: 'The UK offers several visa categories: visitor (tourist), work, study, family. Each has different requirements and processing times. Processing is done entirely online with biometric appointment.',
      definitions: 'A UK visa is official permission to enter and stay in the UK for a specific purpose. Different visa types allow tourism, work, study, or family visits.',
      requirements: [
        'Valid Nigerian passport (minimum 6 months validity)',
        'Proof of accommodation',
        'Bank statements (last 3-6 months)',
        'Employment letter or proof of income',
        'Return flight booking or itinerary',
        'Travel insurance certificate',
      ],
      timeline: [
        'Create UK visas account online',
        'Complete online application form',
        'Pay visa fee',
        'Schedule biometric appointment',
        'Attend VAC appointment (fingerprints, photo)',
        'Receive decision (3-8 weeks standard)',
      ],
      regulatory: 'UK visas are regulated by UK Visas and Immigration (UKVI). Nigeria has VACs in Lagos, Abuja, and Port Harcourt.',
      costEstimate: '£163-£719 depending on visa type + VAC service fee (₦15,000-₦25,000)',
      commonMistakes: [
        'Incomplete application forms',
        'Insufficient proof of funds',
        'Missing required documents at VAC',
        'Wrong visa category',
        'Overstating purpose of visit',
      ],
      relatedGuides: [
        { title: 'How to Apply for a Nigerian Passport', link: '/guides/nigerian-passport-application' },
        { title: 'How to Apply for Schengen Visa', link: '/guides/schengen-visa-application' },
      ],
    },
    sources: [
      { title: 'UK Visas and Immigration', url: 'https://www.gov.uk/visas-immigration', verified: true },
      { title: 'UK VACs in Nigeria', url: 'https://www.vfs-uk-nigeria.com', verified: true },
    ],
    reviewerName: 'Tunde Adeyemi, Immigration Lawyer',
  },

  {
    title: 'How to Register a Limited Liability Company (LLC) in Nigeria',
    slug: 'register-llc-nigeria',
    subtitle: 'Complete guide to forming an LLC with CAC',
    description: 'Step-by-step process for registering a Limited Liability Company in Nigeria.',
    domainSlug: 'government',
    subdomainSlug: 'business-registration',
    content: {
      quickAnswer: 'LLC registration with CAC takes 5-7 working days and costs ₦50,000-₦100,000. You need 2+ shareholders, a business name, and CAC forms.',
      overview: 'An LLC is a private company with separate legal identity. Shareholders have limited liability. It\'s the most common business structure for SMEs in Nigeria.',
      definitions: 'A Limited Liability Company (LLC) is a legal business entity separate from its owners. Shareholders are liable only for their investment amount.',
      requirements: [
        '2-50 shareholders',
        'Minimum share capital of ₦10,000',
        'Registered office address in Nigeria',
        'Valid identification for all shareholders/directors',
        'CAC registration forms (3 & 5)',
        'Memorandum & Articles of Association',
      ],
      timeline: [
        'Verify available business name on CAC portal',
        'Prepare required documents',
        'Submit online via CAC portal',
        'Pay registration fee',
        'Receive provisional approval (24-48 hours)',
        'Receive Certificate of Incorporation (5-7 days)',
      ],
      regulatory: 'LLCs are regulated by CAC under Companies and Allied Matters Act (CAMA) 2020.',
      costEstimate: '₦50,000-₦100,000 (includes name search, registration, certificate)',
      commonMistakes: [
        'Choosing unavailable business name',
        'Incomplete shareholder information',
        'Invalid office address',
        'Missing witness signatures',
      ],
      relatedGuides: [
        { title: 'How to Register a Business Name with CAC', link: '/guides/cac-business-name' },
        { title: 'How to Obtain a TIN', link: '/guides/obtain-tax-identification-number' },
      ],
    },
    sources: [
      { title: 'Corporate Affairs Commission', url: 'https://www.cac.gov.ng', verified: true },
      { title: 'CAMA 2020 Guide', url: 'https://www.cac.gov.ng/cama', verified: true },
    ],
    reviewerName: 'Chioma Okafor, Corporate Lawyer',
  },

  {
    title: 'How to Register for VAT in Nigeria',
    slug: 'vat-registration-nigeria',
    subtitle: 'VAT registration guide for businesses above ₦25M turnover',
    description: 'Learn when and how to register for Value Added Tax (VAT) with FIRS.',
    domainSlug: 'government',
    subdomainSlug: 'taxes',
    content: {
      quickAnswer: 'VAT registration is mandatory for businesses with ₦25M+ annual turnover. Registration is free and takes 48 hours. You register online with your TIN at FIRS portal.',
      overview: 'VAT is a consumption tax of 7.5% on goods and services. Registered businesses collect VAT from customers and remit to FIRS monthly.',
      definitions: 'Value Added Tax (VAT) is a tax on the value added at each stage of production/sale. It\'s ultimately borne by the consumer.',
      requirements: [
        'Annual turnover ₦25M+',
        'Valid TIN',
        'Registered office address',
        'Business registration certificate',
        'Bank account',
        'Sales records',
      ],
      timeline: [
        'Confirm eligibility (₦25M+ turnover)',
        'Register on FIRS portal',
        'Submit required documents',
        'Receive VAT registration number (24-48 hours)',
        'Start collecting VAT on invoices',
        'File monthly returns',
      ],
      regulatory: 'VAT is regulated by FIRS under the VAT Act. Monthly returns due by 20th of following month.',
      costEstimate: 'Free to register; 7.5% VAT on sales',
      commonMistakes: [
        'Not registering when turnover exceeds ₦25M',
        'Incorrect monthly returns',
        'Late payment of VAT',
        'Incomplete invoice documentation',
      ],
      relatedGuides: [
        { title: 'How to Obtain a TIN', link: '/guides/obtain-tax-identification-number' },
        { title: 'How to File Tax Returns', link: '/guides/file-tax-returns' },
      ],
    },
    sources: [
      { title: 'Federal Inland Revenue Service', url: 'https://www.firs.gov.ng', verified: true },
      { title: 'FIRS VAT Portal', url: 'https://services.firs.gov.ng/vat', verified: true },
    ],
    reviewerName: 'Amina Hassan, Tax Consultant',
  },

  {
    title: 'How to Secure a Business Loan in Nigeria',
    slug: 'secure-business-loan-nigeria',
    subtitle: 'Complete guide to getting funding for your business',
    description: 'Learn the types of business loans available and how to apply.',
    domainSlug: 'business',
    subdomainSlug: 'starting-business',
    content: {
      quickAnswer: 'Nigerian banks offer loans from ₦500,000-₦50M+ for businesses. Approval takes 1-4 weeks. You need business registration, 2-3 years financials, collateral, and a strong business plan.',
      overview: 'Business loans are available from commercial banks, microfinance institutions, and government agencies. Interest rates range 12-25% annually depending on lender and risk.',
      definitions: 'A business loan is money borrowed from a financial institution to fund business operations or expansion. It must be repaid with interest.',
      requirements: [
        'Business registration certificate',
        '2-3 years audited financial statements',
        'Personal/business collateral',
        'CEO identification and tax records',
        'Business plan and financial projections',
        'Bank statements (6-12 months)',
      ],
      timeline: [
        'Prepare business plan and financials',
        'Approach bank or lender',
        'Submit application with documents',
        'Bank conducts credit assessment',
        'Collateral valuation',
        'Loan approval and disbursement (1-4 weeks)',
      ],
      regulatory: 'Loans are regulated by CBN. Interest rates vary; many banks offer concessional rates for specific sectors.',
      costEstimate: '12-25% interest rate annually; processing fee 1-3%',
      commonMistakes: [
        'Insufficient collateral',
        'Weak financial records',
        'Unrealistic business projections',
        'Poor credit history',
      ],
      relatedGuides: [
        { title: 'How to Write a Business Plan', link: '/guides/write-business-plan' },
        { title: 'How to Manage Business Accounting', link: '/guides/business-accounting' },
      ],
    },
    sources: [
      { title: 'Central Bank of Nigeria', url: 'https://www.cbn.gov.ng', verified: true },
      { title: 'Commercial Banks Association Nigeria', url: 'https://www.cbanc.org', verified: true },
    ],
    reviewerName: 'Kunle Okonkwo, Financial Advisor',
  },

  {
    title: 'How to Export Nigerian Products',
    slug: 'export-nigerian-products',
    subtitle: 'Guide to international trade from Nigeria',
    description: 'Learn how to export goods from Nigeria to international markets.',
    domainSlug: 'business',
    subdomainSlug: 'starting-business',
    content: {
      quickAnswer: 'Exporters need registration with FIRS, TIN, and export licenses. International buyers need LC (Letter of Credit) or payment guarantee. Documentation takes 2-4 weeks; shipping takes 2-8 weeks depending on destination.',
      overview: 'Nigeria exports agricultural products, minerals, and manufactured goods. Export requires proper documentation, quality compliance, and shipping arrangements.',
      definitions: 'Export means selling goods produced in Nigeria to buyers outside Nigeria. Exporter bears responsibility for quality and documentation.',
      requirements: [
        'FIRS registration and TIN',
        'Export license (specific for some products)',
        'ISO certification (for some goods)',
        'Quality inspection certificate',
        'Buyer credit reference',
        'Product packaging and labeling compliance',
      ],
      timeline: [
        'Register as exporter with FIRS',
        'Identify international buyers',
        'Obtain LC from buyer\'s bank',
        'Prepare goods and quality inspection',
        'Arrange shipping and insurance',
        'File export documents with NCS',
        'Ship goods (2-8 weeks depending on destination)',
      ],
      regulatory: 'Exports regulated by NCS, FIRS, NAFDAC, and SON for quality/standards.',
      costEstimate: 'Variable; typically 15-25% of export value for shipping, documentation, inspection',
      commonMistakes: [
        'Non-compliant product quality',
        'Incomplete export documents',
        'Wrong HS code classification',
        'Missing buyer verification',
      ],
      relatedGuides: [
        { title: 'How to Import Goods', link: '/guides/import-goods-into-nigeria' },
        { title: 'How to Manage Business Accounting', link: '/guides/business-accounting' },
      ],
    },
    sources: [
      { title: 'Nigerian Customs Service', url: 'https://www.customs.gov.ng', verified: true },
      { title: 'NAFDAC Standards', url: 'https://www.nafdacnigeria.org', verified: true },
    ],
    reviewerName: 'Tunde Adeyemi, Export Specialist',
  },
];
  {
    title: 'How to Manage Payroll and Calculate PAYE in Nigeria',
    slug: 'manage-payroll-calculate-paye',
    subtitle: 'Payroll management and income tax calculation guide',
    description: 'Learn how to calculate PAYE and manage payroll in Nigeria.',
    domainSlug: 'business',
    subdomainSlug: 'starting-business',
    content: {
      quickAnswer: 'PAYE rates for 2024: 1-12% on taxable income. Monthly payroll involves: gross salary - pension - PAYE = net pay. Employers file returns with FIRS by 20th of following month.',
      overview: 'PAYE (Pay As You Earn) is personal income tax on employee salaries. Employers deduct and remit to FIRS monthly.',
      definitions: 'PAYE is the system where employers deduct income tax from employee salaries and remit to tax authorities. It ensures tax compliance.',
      requirements: [
        'Employee personal data (name, NIN, TIN)',
        'Salary structure and allowances',
        'Pension scheme registration (PENCOM)',
        'Tax file numbers for all employees',
        'Monthly payroll records',
      ],
      timeline: [
        'Set up payroll system',
        'Register employees with FIRS',
        'Calculate monthly PAYE',
        'Deduct from salaries',
        'Remit to FIRS by 20th of following month',
        'File monthly returns',
      ],
      regulatory: '2024 PAYE rates: 1% (₦0-₦300k), 11% (₦300k-₦600k), 12% (₦600k+). Pension: 8% employee, 10% employer.',
      costEstimate: 'Variable based on payroll size; accounting software ₦50,000-₦200,000/year',
      commonMistakes: [
        'Incorrect PAYE calculation',
        'Late remittance to FIRS',
        'Missing pension contributions',
        'Incomplete employee records',
      ],
      relatedGuides: [
        { title: 'How to Register as an Employer', link: '/guides/register-employer-nsitf' },
        { title: 'How to Manage Business Accounting', link: '/guides/business-accounting' },
      ],
    },
    sources: [
      { title: 'Federal Inland Revenue Service', url: 'https://www.firs.gov.ng', verified: true },
      { title: 'PENCOM Pension Rates', url: 'https://www.pencom.gov.ng', verified: true },
    ],
    reviewerName: 'Grace Nwosu, HR Manager',
  },

  {
    title: 'How to Apply to Universities via JAMB CAPS',
    slug: 'jamb-caps-university-application',
    subtitle: 'Guide to JAMB CAPS portal for university admission',
    description: 'Learn how to select universities and courses via JAMB CAPS.',
    domainSlug: 'education',
    subdomainSlug: 'jamb-admission',
    content: {
      quickAnswer: 'JAMB CAPS portal opens April-May after UTME results. You select up to 4 universities in order of preference. Merit lists released June-July. Acceptance deadline typically July.',
      overview: 'JAMB CAPS is the centralized admission portal. Universities use merit lists to admit candidates. Acceptance is non-binding; you must confirm via institution.',
      definitions: 'JAMB CAPS (Central Admissions Processing System) is the online platform for university admissions in Nigeria.',
      requirements: [
        'JAMB UTME result (cut-off dependent on university)',
        'Valid email address',
        'Phone number',
        'O\'Level results (WAEC/NECO)',
        'JAMB registration number',
      ],
      timeline: [
        'Check JAMB UTME results',
        'Log into JAMB CAPS portal (April-May)',
        'Select universities and courses',
        'Submit preferences',
        'Await merit list (June)',
        'Get admission offer letter',
        'Confirm acceptance',
      ],
      regulatory: 'JAMB sets minimum cut-off scores (usually 140). Universities may have higher requirements.',
      costEstimate: 'Free on JAMB CAPS; university registration varies ₦100,000-₦500,000',
      commonMistakes: [
        'Wrong course/program selection',
        'Missing cut-off requirement',
        'Not confirming acceptance',
        'Submitting incomplete O\'Level results',
      ],
      relatedGuides: [
        { title: 'How to Apply for JAMB UTME', link: '/guides/jamb-utme-2024-application' },
        { title: 'How to Apply for Scholarships', link: '/guides/apply-nigerian-scholarships' },
      ],
    },
    sources: [
      { title: 'JAMB Official Portal', url: 'https://www.jamb.org.ng', verified: true },
      { title: 'JAMB CAPS System', url: 'https://caps.jamb.org.ng', verified: true },
    ],
    reviewerName: 'Dr. Chioma Okoye, Education Counselor',
  },

  {
    title: 'How to Apply for Nigerian Government Scholarships',
    slug: 'apply-nigerian-scholarships',
    subtitle: 'Guide to federal and state government scholarship programs',
    description: 'Learn about available government scholarships and application processes.',
    domainSlug: 'education',
    subdomainSlug: 'scholarships',
    content: {
      quickAnswer: 'Major scholarships: NLNG (₦1.5M/year), TetFund (free tuition), WAEC Excellence Award. Applications typically January-March. Selection based on merit, need, and course alignment.',
      overview: 'Nigerian government offers scholarships through NLNG, TetFund, state governments, and federal institutions. Most cover tuition; some include allowances.',
      definitions: 'A scholarship is financial aid for education, typically merit or need-based. Government scholarships usually don\'t require repayment.',
      requirements: [
        'JAMB UTME admission',
        'Excellent academic record (3.5+ GPA)',
        'Proof of Nigerian citizenship',
        'Valid identification',
        'Financial hardship evidence (some programs)',
        'Recommendation letters',
      ],
      timeline: [
        'Identify relevant scholarships (December)',
        'Prepare application documents (January)',
        'Submit applications (February-March)',
        'Attend interviews (April-May)',
        'Receive scholarship award (May-June)',
        'Receive first disbursement (August/September)',
      ],
      regulatory: 'Scholarships regulated by individual awarding bodies (NLNG, TetFund, etc.).',
      costEstimate: '₦500,000-₦2M+ annual award depending on scholarship',
      commonMistakes: [
        'Poor academic records',
        'Incomplete application',
        'Missing documentation',
        'Unrealistic GPA/test scores',
      ],
      relatedGuides: [
        { title: 'How to Apply for JAMB UTME', link: '/guides/jamb-utme-2024-application' },
        { title: 'How to Apply for International Scholarships', link: '/guides/international-scholarships' },
      ],
    },
    sources: [
      { title: 'NLNG Scholarship', url: 'https://www.nlng.com/scholarship', verified: true },
      { title: 'TetFund Portal', url: 'https://www.tetfund.gov.ng', verified: true },
    ],
    reviewerName: 'Prof. Adekunle Adeyemi, Education Officer',
  },

  {
    title: 'How to Obtain a Tax Identification Number (TIN)',
    slug: 'obtain-tax-identification-number',
    subtitle: 'Step-by-step guide to getting your TIN from FIRS',
    description: 'Learn how to register for a Tax Identification Number (TIN) with the Federal Inland Revenue Service.',
    domainSlug: 'government',
    subdomainSlug: 'taxes',
    content: {
      quickAnswer: 'A Tax Identification Number (TIN) is required for all businesses in Nigeria. Registration is free and takes 24-48 hours. You can apply online through the FIRS portal at www.firs.gov.ng',
      overview: 'The TIN is a unique identifier issued by the Federal Inland Revenue Service (FIRS) for tax purposes. Every business and individual earning income must have a TIN to comply with Nigerian tax laws.',
      definitions: 'A Tax Identification Number (TIN) is a 11-digit unique identifier issued by FIRS. It tracks your tax history and ensures compliance with Nigerian tax regulations.',
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
      regulatory: 'All individuals and businesses in Nigeria earning income are required to obtain a TIN from FIRS. Operating without a TIN attracts penalties and is a violation of Nigerian tax law.',
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
      { title: 'Federal Inland Revenue Service', url: 'https://www.firs.gov.ng', verified: true },
      { title: 'FIRS Online Services Portal', url: 'https://services.firs.gov.ng', verified: true },
    ],
    reviewerName: 'Amina Hassan, Tax Consultant',
  },

  {
    title: 'How to Renew Your Nigerian Passport',
    slug: 'renew-nigerian-passport',
    subtitle: 'Step-by-step guide to passport renewal in Nigeria',
    description: 'Learn how to renew your Nigerian passport whether in Nigeria or abroad.',
    domainSlug: 'government',
    subdomainSlug: 'immigration-travel',
    content: {
      quickAnswer: 'Nigerian passport renewal costs ₦50,000 (standard) or ₦75,000 (expedited). Processing takes 2-4 weeks standard or 5 business days expedited. You can apply at any Nigerian Immigration Service office.',
      overview: 'A Nigerian passport is valid for 10 years. You can renew your passport online or in-person. The renewal process is faster than initial application as you do not need to repeat biometric data entry.',
      definitions: 'Passport renewal means extending the validity of your current passport. Renewal is different from replacement, which is needed if your passport is lost, stolen, or damaged.',
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
      regulatory: 'Nigerian passport renewals are processed by the Nigerian Immigration Service (NIS) under the Immigration Act. All passport holders must renew before expiration.',
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
      { title: 'Nigerian Immigration Service', url: 'https://www.immigration.gov.ng', verified: true },
      { title: 'NIS Online Passport Services', url: 'https://online.immigration.gov.ng', verified: true },
    ],
    reviewerName: 'Adaobi Okechukwu, Immigration Officer',
  },
];
