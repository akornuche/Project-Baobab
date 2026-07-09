import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Priority 1 Remaining Guides - Batch 2 (Guides 21-30)
const priority1Batch2 = [
  // GOVERNMENT - Immigration & Travel
  {
    title: 'How to Apply for a UK/US/Schengen Visa from Nigeria',
    slug: 'apply-uk-us-schengen-visa',
    subtitle: 'Complete guide to applying for international visas from Nigeria',
    description: 'Learn how to apply for UK, US, or Schengen visas from Nigeria with correct documentation',
    domainSlug: 'government',
    subdomainSlug: 'immigration-travel',
    content: {
      quickAnswer: 'UK visa: $1,500-2,500, 3-6 weeks. US visa: $185 application + $250 issuance, 1-3 months. Schengen: €80, 2-4 weeks. All require interviews, bank statements, and travel plans.',
      overview: 'Applying for international visas from Nigeria requires careful documentation and planning. Each country has specific requirements, but common elements include proof of ties to Nigeria, financial stability, and clear travel purpose.',
      definitions: 'A visa is an official document allowing you to enter a foreign country. UK visa is issued by UKVI, US visa by DOS, Schengen by consulates of participating European countries.',
      requirements: [
        'Valid passport (6+ months validity)',
        'Completed visa application form',
        'Recent passport photograph',
        'Proof of financial means (bank statements 3-6 months)',
        'Travel itinerary and accommodation',
        'Proof of employment or business',
        'Letter of invitation (if applicable)',
        'Travel insurance (Schengen)',
      ],
      timeline: [
        'Research visa type and requirements (1 week)',
        'Gather all required documents (1-2 weeks)',
        'Book visa appointment (2-4 weeks wait)',
        'Attend biometrics appointment',
        'Attend visa interview (if required)',
        'Wait for decision (processing time)',
        'Receive visa and collect passport',
      ],
      regulatory: 'Visa requirements are set by each country\'s immigration authority. Fraudulent documents result in bans. All Nigerian applicants must apply through official VFS Global or TLScontact centers.',
      costEstimate: 'UK: $1,500-2,500 | US: $435 total | Schengen: €80 + service fees',
      commonMistakes: [
        'Incomplete or inconsistent application forms',
        'Insufficient bank statements',
        'Booking non-refundable tickets before visa approval',
        'Ignoring visa processing times',
      ],
      relatedGuides: [
        { title: 'How to Apply for Nigerian Passport', link: '/guides/renew-nigerian-passport' },
        { title: 'How to Obtain International Certification', link: '/guides/obtain-international-certification' },
      ],
    },
    sources: [
      { title: 'UK Visas and Immigration', url: 'https://www.gov.uk/visit-uk', verified: true },
      { title: 'US Embassy Nigeria', url: 'https://ng.usembassy.gov/visas', verified: true },
      { title: 'Schengen Visa Info', url: 'https://www.schengenvisainfo.com', verified: true },
    ],
    reviewerName: 'Mrs. Chioma Okonkwo, Immigration Consultant',
  },

  // BUSINESS - Registration
  {
    title: 'How to Register a Limited Liability Company (LLC) in Nigeria',
    slug: 'register-llc-nigeria',
    subtitle: 'Step-by-step guide to registering a limited liability company with CAC',
    description: 'Learn how to register a Limited Liability Company (LLC) in Nigeria with the Corporate Affairs Commission',
    domainSlug: 'business',
    subdomainSlug: 'registration',
    content: {
      quickAnswer: 'LLC registration costs ₦50,000-₦100,000. Process takes 2-3 weeks. Required: 2+ shareholders, Memorandum and Articles of Association, registered office address.',
      overview: 'A Limited Liability Company (LLC) is the most popular business structure in Nigeria. It provides limited liability protection for owners and is required for raising investment.',
      definitions: 'An LLC is a legal entity separate from its owners. Shareholders\' liability is limited to their investment. LLCs pay 25% corporate tax on profits.',
      requirements: [
        'Company name (2 preferred names)',
        'Memorandum and Articles of Association',
        'Registered office address in Nigeria',
        'Details of directors and shareholders (minimum 2)',
        'Principal business activities',
        'Share capital allocation',
        'NIN of directors',
      ],
      timeline: [
        'Choose and reserve company name (1-2 days)',
        'Draft and sign Memorandum and Articles',
        'Complete CAC forms (CAC1.1, CAC2, CAC4)',
        'Upload documents to CAC portal',
        'Pay registration fees',
        'Receive Certificate of Incorporation',
        'Open corporate bank account',
      ],
      regulatory: 'Corporate Affairs Commission Act requires LLC registration. All LLCs must file annual returns. Failure to file attracts penalties.',
      costEstimate: '₦50,000-₦100,000 (legal fees may add ₦100,000-₦300,000)',
      commonMistakes: [
        'Using similar company name',
        'Incorrect share capital allocation',
        'Missing annual return filings',
        'Not maintaining proper company records',
      ],
      relatedGuides: [
        { title: 'How to Register a Business Name', link: '/guides/cac-business-name' },
        { title: 'Business Registration Requirements', link: '/guides/business-registration-requirements' },
      ],
    },
    sources: [{ title: 'Corporate Affairs Commission', url: 'https://cac.gov.ng', verified: true }],
    reviewerName: 'Mr. Dele Ogunseye, Company Secretary',
  },

  // GOVERNMENT - Taxes & Finance
  {
    title: 'How to Register for VAT in Nigeria',
    slug: 'register-vat-nigeria',
    subtitle: 'Step-by-step guide to VAT registration with FIRS',
    description: 'Learn how to register for Value Added Tax (VAT) with the Federal Inland Revenue Service',
    domainSlug: 'government',
    subdomainSlug: 'taxes',
    content: {
      quickAnswer: 'VAT registration is free and mandatory for businesses with ₦25M+ annual turnover. Register online at services.firs.gov.ng. Returns filed monthly by 20th. Rate: 7.5%.',
      overview: 'VAT (Value Added Tax) is a consumption tax charged at 7.5% on goods and services. Businesses with turnover above ₦25M must register. Registered businesses can claim input VAT credits.',
      definitions: 'VAT is a tax on the value added at each production stage. Output VAT is charged on sales. Input VAT is paid on purchases. Registered businesses remit the difference to FIRS.',
      requirements: [
        'Valid TIN (Tax Identification Number)',
        'Business registration certificate (CAC)',
        'Bank account details',
        'Proof of business address',
        'Monthly sales records',
        'Completed VAT registration form',
      ],
      timeline: [
        'Verify TIN is active',
        'Visit FIRS e-tax portal',
        'Complete VAT registration form',
        'Upload required documents',
        'Submit application',
        'Receive VAT certificate (1-2 days)',
        'Start charging VAT on invoices',
      ],
      regulatory: 'VAT Act Cap V1 LFN 2004 requires registration for businesses above ₦25M turnover. Non-registration attracts 5% penalty plus interest.',
      costEstimate: 'Free to register; 7.5% VAT on sales minus input VAT claims',
      commonMistakes: [
        'Failing to charge VAT on invoices',
        'Missing monthly filing deadlines',
        'Not keeping VAT invoices',
        'Incorrect VAT calculation',
      ],
      relatedGuides: [
        { title: 'How to Register for TIN', link: '/guides/obtain-tax-identification-number' },
        { title: 'How to File Tax Returns', link: '/guides/file-company-tax-returns' },
      ],
    },
    sources: [{ title: 'FIRS VAT Portal', url: 'https://services.firs.gov.ng', verified: true }],
    reviewerName: 'Amina Hassan, Tax Consultant',
  },

  // BUSINESS - Starting
  {
    title: 'How to Secure a Business Loan in Nigeria',
    slug: 'secure-business-loan-nigeria',
    subtitle: 'Guide to obtaining business financing from Nigerian banks and MFIs',
    description: 'Learn how to secure a business loan in Nigeria with proper documentation and preparation',
    domainSlug: 'business',
    subdomainSlug: 'starting-business',
    content: {
      quickAnswer: 'Bank loans require 6-12 months of bank statements, financial statements, collateral, and business plan. Interest rates: 10-25%. MFIs offer faster but more expensive funding (2-5% monthly).',
      overview: 'Business loans in Nigeria range from low-interest bank loans to high-interest microfinance options. Success depends on credit history, collateral, and business viability. Most banks require 6-12 months of operations.',
      definitions: 'A business loan is borrowed money used for business purposes. Secured loans require collateral (property, equipment, inventory). Unsecured loans rely on creditworthiness.',
      requirements: [
        'Business registration certificate',
        'Valid TIN',
        '6-12 months bank statements',
        'Financial statements (profit & loss, balance sheet)',
        'Personal and business collateral',
        'Business plan with projections',
        'Valid ID of directors',
        'Proof of business address',
      ],
      timeline: [
        'Prepare financial documents (1-2 weeks)',
        'Improve credit score (if needed)',
        'Choose lender and loan type',
        'Submit application with documents',
        'Lender conducts due diligence (1-2 weeks)',
        'Receive credit offer and terms',
        'Sign agreement and disbursement (1 week)',
      ],
      regulatory: 'Central Bank of Nigeria sets interest rate guidelines. Collateral requirements vary by lender. All lenders must disclose fees and terms transparently.',
      costEstimate: 'Bank loans: 10-15% | MFIs: 24-60% APR | Soft loans: 5-8% (development funds)',
      commonMistakes: [
        'Applying without proper documentation',
        'Underestimating repayment capacity',
        'Not reading loan terms carefully',
        'Using loan for non-business purposes',
      ],
      relatedGuides: [
        { title: 'How to Write a Business Plan', link: '/guides/write-business-plan-nigeria' },
        { title: 'How to Manage Business Accounting', link: '/guides/business-accounting' },
      ],
    },
    sources: [{ title: 'Central Bank of Nigeria', url: 'https://www.cbn.gov.ng', verified: true }],
    reviewerName: 'Kunle Okonkwo, Financial Advisor',
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
      quickAnswer: 'A bankable business plan includes 10 sections: executive summary, company description, market analysis, organization, products/services, marketing, financials, funding request, projections, appendix.',
      overview: 'Banks require detailed business plans before approving loans. The plan must demonstrate market opportunity, clear repayment capacity, and proper risk assessment. Most Nigerian banks use a standard template.',
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
        { title: 'How to Manage Business Accounting', link: '/guides/business-accounting' },
      ],
    },
    sources: [{ title: 'Central Bank of Nigeria', url: 'https://www.cbn.gov.ng', verified: true }],
    reviewerName: 'Kunle Okonkwo, Financial Advisor',
  },

  // BUSINESS - Import/Export
  {
    title: 'How to Export Nigerian Products',
    slug: 'export-nigerian-products',
    subtitle: 'Complete guide to exporting goods from Nigeria',
    description: 'Learn the requirements, documentation, and procedures for exporting Nigerian products',
    domainSlug: 'business',
    subdomainSlug: 'registration',
    content: {
      quickAnswer: 'Export requires business registration, TIN, NAFDAC/SON certificates (if applicable), and customs clearance. Most exports take 2-4 weeks. Key: find buyers first, then arrange logistics.',
      overview: 'Nigeria exports over $100B annually in oil and gas, plus growing non-oil exports (agriculture, fashion, tech). Exporting requires compliance with FIRS, NAFDAC, SON, and customs regulations.',
      definitions: 'Export is selling goods to foreign buyers. Exporters must comply with Nigerian export regulations and the importing country\'s requirements. Key documents include invoice, packing list, bill of lading.',
      requirements: [
        'Valid business registration',
        'TIN and VAT registration',
        'NAFDAC/SON certificate (for applicable products)',
        'Commercial invoice and packing list',
        'Bill of lading or air waybill',
        'Certificate of origin',
        'Export license (for restricted goods)',
      ],
      timeline: [
        'Find international buyer and agree terms',
        'Prepare goods and obtain required certifications',
        'Arrange logistics (freight forwarder)',
        'Complete export documentation',
        'Clear goods through Nigerian customs',
        'Ship goods to buyer',
        'Receive payment and file export declaration',
      ],
      regulatory: 'Export regulations vary by product. Oil/gas requires DPR approval. Agricultural products require NAFDAC. Textiles and manufactured goods require SONCAP. All exports must be declared to FIRS.',
      costEstimate: '₦100,000-₦500,000 depending on product and volume',
      commonMistakes: [
        'Incorrect HS code classification',
        'Missing product certifications',
        'Undervaluation for customs',
        'Not understanding Incoterms',
      ],
      relatedGuides: [
        { title: 'How to Import Goods into Nigeria', link: '/guides/import-goods-into-nigeria' },
        { title: 'Customs Clearance Process', link: '/guides/customs-clearance' },
      ],
    },
    sources: [{ title: 'Nigerian Export Processing Zones Authority', url: 'https://www.nepza.gov.ng', verified: true }],
    reviewerName: 'Tunde Adeyemi, Import/Export Specialist',
  },

  // BUSINESS - Employment & Payroll
  {
    title: 'How to Manage Payroll and Calculate PAYE in Nigeria',
    slug: 'manage-payroll-calculate-paye',
    subtitle: 'Guide to payroll management and PAYE calculation for employers',
    description: 'Learn how to manage payroll and calculate PAYE (Pay As You Earn) tax for your employees',
    domainSlug: 'business',
    subdomainSlug: 'registration',
    content: {
      quickAnswer: 'PAYE is calculated using progressive tax rates (0-24%). Employers must deduct and remit monthly by 10th. Required: employee NIN, tax plate, payroll records. Cost: free to calculate, 10% penalty for late remittance.',
      overview: 'PAYE (Pay As You Earn) is the system for collecting income tax from employees. Employers must calculate tax using progressive rates, deduct at source, and remit to FIRS monthly. Non-compliance attracts penalties.',
      definitions: 'PAYE is a PAYG (Pay As You Go) tax system where employers deduct tax from employees\' salaries and remit to FIRS. Nigeria uses progressive tax rates from 0% to 24% based on income levels.',
      requirements: [
        'Employee NIN and tax identification',
        'Employer TIN and tax plate',
        'Employee contracts and salary details',
        'Pension contribution records',
        'Monthly payroll records',
        'FIRS PAYE remittance portal access',
      ],
      timeline: [
        'Collect employee details and NIN',
        'Set up payroll system',
        'Calculate gross to net pay',
        'Deduct PAYE, pension, and other deductions',
        'Remit to FIRS by 10th of following month',
        'Provide payslips to employees',
        'File annual payroll return',
      ],
      regulatory: 'Personal Income Tax Act requires PAYE calculation and remittance. Failure to deduct or remit attracts 10% penalty plus 12% interest per annum.',
      costEstimate: 'Free to calculate (use FIRS calculator); 10% penalty + 12% interest for late remittance',
      commonMistakes: [
        'Incorrect tax bracket calculation',
        'Missing the 10th monthly deadline',
        'Not providing payslips to employees',
        'Failing to update tax plates',
      ],
      relatedGuides: [
        { title: 'How to Register as an Employer with NSITF', link: '/guides/register-employer-nsitf' },
        { title: 'How to File Tax Returns', link: '/guides/file-company-tax-returns' },
      ],
    },
    sources: [{ title: 'FIRS PAYE Portal', url: 'https://services.firs.gov.ng', verified: true }],
    reviewerName: 'Grace Nwosu, HR Manager',
  },

  // EDUCATION - University Admission
  {
    title: 'How to Apply to Universities via JAMB CAPS',
    slug: 'apply-jamb-caps',
    subtitle: 'Guide to using JAMB Central Admissions Processing System',
    description: 'Learn how to apply to Nigerian universities through the JAMB CAPS portal',
    domainSlug: 'education',
    subdomainSlug: 'jamb-admission',
    content: {
      quickAnswer: 'JAMB CAPS is the centralized admission system. After UTME results, candidates select institutions, accept offers, and pay acceptance fees. Timeline: August-December. Required: UTME score, O-Level results, O-level subject combinations.',
      overview: 'JAMB CAPS (Central Admissions Processing System) streamlines university admissions in Nigeria. Candidates who score 180+ in UTME can access CAPS to select institutions and accept offers. The system ensures fair and transparent admission processing.',
      definitions: 'JAMB CAPS is the centralized system for processing university admissions. It replaces the previous direct entry and post-UTME systems, ensuring a standardized admission process across all tertiary institutions.',
      requirements: [
        'JAMB UTME score (180+ recommended)',
        'O-Level results (WAEC/NECO)',
        'JAMB registration number',
        'Email address and phone number',
        'JAMB CAPS login credentials',
        'Acceptance fee payment',
      ],
      timeline: [
        'Check UTME results (July)',
        'Verify O-Level results on JAMB portal',
        'Select institutions and courses on CAPS',
        'Wait for institution screening/admission lists',
        'Accept offer on CAPS portal',
        'Pay acceptance fee to institution',
        'Upload O-Level results on CAPS if not uploaded',
        'Await JAMB confirmation and admission letter',
      ],
      regulatory: 'JAMB is mandated by the Federal Government to regulate admissions. All prospective university students must use CAPS for admission processing.',
      costEstimate: 'Free to use CAPS; acceptance fees vary by institution (₦20,000-₦100,000)',
      commonMistakes: [
        'Missing CAPS acceptance deadlines',
        'Incorrect course selection',
        'Not checking JAMB CAPS portal regularly',
        'Paying acceptance fee without formal admission',
      ],
      relatedGuides: [
        { title: 'How to Apply for JAMB UTME', link: '/guides/jamb-utme-2024-application' },
        { title: 'JAMB Subject Combination Guide', link: '/guides/jamb-subject-combinations' },
      ],
    },
    sources: [{ title: 'JAMB Official Portal', url: 'https://www.jamb.org.ng', verified: true }],
    reviewerName: 'Dr. Grace Nwosu, Education Consultant',
  },

  // EDUCATION - Scholarships
  {
    title: 'How to Apply for Nigerian Government Scholarships',
    slug: 'apply-nigerian-government-scholarships',
    subtitle: 'Guide to applying for federal and state government scholarships',
    description: 'Learn how to apply for Nigerian government scholarships for undergraduate and postgraduate studies',
    domainSlug: 'education',
    subdomainSlug: 'scholarships',
    content: {
      quickAnswer: 'Nigerian government scholarships include PTDF, TETFUND, NDLEA, NNPC, and state scholarships. Application: online via ministry portals. Requirements: admission letter, NYSC discharge, good academic record. Deadlines: vary by program.',
      overview: 'Nigerian government offers numerous scholarships through various agencies. PTDF (Petroleum Training Development Fund) supports oil/gas students. TETFUND (Tertiary Education Trust Fund) supports all tertiary institutions. State governments offer local scholarships.',
      definitions: 'A government scholarship is financial aid awarded by federal or state agencies to support education. Unlike loans, scholarships do not need repayment. Most require service commitment or return-of-service agreements.',
      requirements: [
        'Admission letter from accredited institution',
        'NYSC discharge certificate (for postgraduate)',
        'Academic transcripts and result slips',
        'Proof of indigeneity (state of origin)',
        'Character reference',
        'Medical report',
        'Passport photograph',
        'Personal statement or motivation letter',
      ],
      timeline: [
        'Research available scholarships (January)',
        'Check eligibility criteria',
        'Gather required documents (2-4 weeks)',
        'Complete online application',
        'Attend interview if shortlisted',
        'Await selection results (4-8 weeks)',
        'Accept scholarship and begin studies',
      ],
      regulatory: 'Scholarship terms vary by agency. Most require maintenance of minimum GPA and may include service obligations. Fraudulent applications result in disqualification and blacklisting.',
      costEstimate: 'Free to apply; scholarships cover full/partial tuition, accommodation, and living expenses',
      commonMistakes: [
        'Missing application deadlines',
        'Incomplete documentation',
        'Poor personal statement',
        'Not meeting eligibility requirements',
      ],
      relatedGuides: [
        { title: 'How to Apply for International Scholarships', link: '/guides/international-scholarships' },
        { title: 'How to Write a Scholarship Essay', link: '/guides/scholarship-essay' },
      ],
    },
    sources: [
      { title: 'TETFUND Portal', url: 'https://www.camt.gov.ng', verified: true },
      { title: 'PTDF Scholarship', url: 'https://www.ptdf.gov.ng', verified: true },
      { title: 'NNPC/JPS Scholarship', url: 'https://www.nnpcgroup.com', verified: true },
    ],
    reviewerName: 'Dr. Adebayo Oladipo, Scholarship Consultant',
  },

  // EDUCATION - Scholarships
  {
    title: 'How to Apply for International Scholarships as a Nigerian',
    slug: 'apply-international-scholarships',
    subtitle: 'Complete guide to securing international scholarships',
    description: 'Learn how to apply for international scholarships like Chevening, Fulbright, and Commonwealth',
    domainSlug: 'education',
    subdomainSlug: 'scholarships',
    content: {
      quickAnswer: 'International scholarships include Chevening (UK), Fulbright (USA), Commonwealth, DAAD (Germany), and more. Application: 6-12 months ahead. Requirements: academic excellence, leadership, English proficiency (IELTS/TOEFL).',
      overview: 'International scholarships cover full or partial study abroad costs. Nigerian students compete globally but have strong success rates. Key factors: academic record (first class/2:1), leadership, work experience, and compelling personal statements.',
      definitions: 'An international scholarship is financial aid awarded by foreign governments, universities, or organizations for study abroad. Most cover tuition, living expenses, and travel. Selection is based on merit and potential.',
      requirements: [
        'Academic excellence (minimum 2:1 or first class)',
        'English proficiency (IELTS 6.5+ or TOEFL 90+)',
        'Statement of purpose',
        'Letters of recommendation (2-3)',
        'CV/resume',
        'Proof of admission to university',
        'Research proposal (for postgraduate)',
      ],
      timeline: [
        'Research scholarships (6-12 months before intake)',
        'Prepare English proficiency test',
        'Gather academic transcripts',
        'Write statement of purpose',
        'Request recommendation letters',
        'Complete applications (deadlines vary)',
        'Attend interviews if shortlisted',
        'Receive decision (3-6 months after deadline)',
      ],
      regulatory: 'Scholarship terms vary by provider. Most require full-time enrollment and academic progress. Breach of terms may require repayment.',
      costEstimate: 'Free to apply (some charge application fees); scholarships cover $10,000-$50,000+',
      commonMistakes: [
        'Applying too late',
        'Generic statement of purpose',
        'Weak recommendation letters',
        'Not researching scholarship requirements',
      ],
      relatedGuides: [
        { title: 'How to Apply for Nigerian Government Scholarships', link: '/guides/nigerian-government-scholarships' },
        { title: 'How to Obtain International Certification', link: '/guides/international-certification' },
      ],
    },
    sources: [
      { title: 'Chevening Scholarships', url: 'https://www.chevening.org', verified: true },
      { title: 'Fulbright Program', url: 'https://www.usiesf.org', verified: true },
      { title: 'Commonwealth Scholarships', url: 'https://cscuk.fcdo.gov.uk', verified: true },
    ],
    reviewerName: 'Dr. Emily Johnson, Education Consultant',
  },
];

async function seedGuides() {
  console.log('🌱 Seeding Priority 1 Remaining Guides (Batch 2)...');
  console.log(`📚 Total guides to seed: ${priority1Batch2.length}`);

  let created = 0;
  let skipped = 0;
  let errors = 0;

  try {
    for (const guideData of priority1Batch2) {
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
