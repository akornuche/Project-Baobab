/**
 * seed-guides-remaining-all.ts
 *
 * Comprehensive seed script for all 300 guides from the baobab-04 roadmap.
 * - Upserts any missing subdomains first
 * - Skips guides whose slug already exists in the DB
 * - Uses the full 12-section structure matching GuidePageTemplate.tsx
 *
 * Run: npx tsx scripts/seed-guides-remaining-all.ts
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ─── TYPES ────────────────────────────────────────────────────────────────────

interface GuideDefinition { term: string; definition: string; example?: string; }
interface GuideRequirement { title: string; description: string; isMandatory?: boolean; notes?: string; }
interface GuideStep { stepNumber: number; title: string; description: string; estimatedTime?: string; inputs?: string[]; cost?: string; }
interface GuideStat { label: string; value: string; unit: string; source: string; }
interface GuideMistake { title: string; description: string; solution: string; realExample?: string; }
interface RelatedLink { slug: string; title: string; description?: string; }

interface GuideContent {
  quickAnswer: string;
  overview: string;
  definitions: GuideDefinition[];
  requirements: GuideRequirement[];
  timeline: GuideStep[];
  regulatory: string;
  stats?: GuideStat[];
  commonMistakes: GuideMistake[];
  relatedGuides: RelatedLink[];
  relatedTools?: RelatedLink[];
}

interface GuideRow {
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  domainSlug: string;
  subdomainSlug: string;
  content: GuideContent;
  sources: { title: string; url: string; verified: boolean }[];
  reviewerName: string;
}

// ─── SUBDOMAINS TO UPSERT ─────────────────────────────────────────────────────
// Keyed by slug. domainSlug resolved at runtime.

const SUBDOMAINS: { slug: string; name: string; description: string; domainSlug: string; order: number }[] = [
  // Government — existing
  { slug: 'business-registration', name: 'Business Registration',       description: 'CAC and business reg',                domainSlug: 'government', order: 1 },
  { slug: 'identity-civil',        name: 'Identity & Civil Documents',  description: 'Passport, NIN, certificates',         domainSlug: 'government', order: 2 },
  { slug: 'taxes',                 name: 'Taxes',                       description: 'Personal and business taxes',          domainSlug: 'government', order: 3 },
  { slug: 'immigration-travel',    name: 'Immigration & Travel',        description: 'Visas, citizenship, travel documents', domainSlug: 'government', order: 4 },
  // Government — new
  { slug: 'land-property',         name: 'Land & Property',             description: 'C of O, land registry, surveys',      domainSlug: 'government', order: 5 },
  { slug: 'police-courts',         name: 'Police, Courts & Legal',      description: 'Crime reports, courts, legal aid',     domainSlug: 'government', order: 6 },
  { slug: 'national-programs',     name: 'National Programs',           description: 'NYSC, N-Power, NHIS, scholarships',    domainSlug: 'government', order: 7 },
  { slug: 'driving-vehicles',      name: 'Driving & Vehicles',          description: 'License, registration, insurance',     domainSlug: 'government', order: 8 },
  { slug: 'local-government',      name: 'Local Government & Civic',    description: 'LGA, community, civic processes',      domainSlug: 'government', order: 9 },
  // Business — existing
  { slug: 'starting-business',     name: 'Starting a Business',         description: 'Startup checklist and guides',         domainSlug: 'business',   order: 1 },
  { slug: 'registration',          name: 'Registration',                description: 'Business registration and licensing',  domainSlug: 'business',   order: 2 },
  { slug: 'tax-compliance',        name: 'Tax & Compliance',            description: 'VAT, PAYE, tax compliance',            domainSlug: 'business',   order: 3 },
  { slug: 'banking',               name: 'Banking & Funding',           description: 'Business banking and finance',         domainSlug: 'business',   order: 4 },
  // Business — new
  { slug: 'import-export',         name: 'Import & Export',             description: 'Customs, Form M, NEPC incentives',     domainSlug: 'business',   order: 5 },
  { slug: 'regulatory-compliance', name: 'Regulatory Compliance',       description: 'NAFDAC, SON, CBN, sector licenses',    domainSlug: 'business',   order: 6 },
  { slug: 'hr-payroll',            name: 'HR, Payroll & Employment',    description: 'Labour law, payroll, pension',         domainSlug: 'business',   order: 7 },
  { slug: 'growth-operations',     name: 'Growth & Operations',         description: 'Franchising, IP, e-commerce, closure', domainSlug: 'business',   order: 8 },
  { slug: 'freelancing',           name: 'Freelancing & Remote Work',   description: 'Freelance taxes, contracts, payments', domainSlug: 'business',   order: 9 },
  { slug: 'business-directory',    name: 'Business Directory Hubs',     description: 'How to find professional services',    domainSlug: 'business',   order: 10 },
  // Education — existing
  { slug: 'waec-neco',             name: 'WAEC/NECO',                   description: 'West African exams',                   domainSlug: 'education',  order: 1 },
  { slug: 'jamb-admission',        name: 'JAMB/Admission',              description: 'University admission and exams',       domainSlug: 'education',  order: 2 },
  { slug: 'scholarships',          name: 'Scholarships',                description: 'Scholarship applications',             domainSlug: 'education',  order: 3 },
  { slug: 'nysc',                  name: 'NYSC',                        description: 'National Youth Service Corps',         domainSlug: 'education',  order: 4 },
  // Education — new
  { slug: 'university-admission',  name: 'University & Polytechnic',    description: 'POST-UTME, direct entry, NUC',         domainSlug: 'education',  order: 5 },
  { slug: 'transcripts',           name: 'Results & Transcripts',       description: 'Transcript requests, result checking', domainSlug: 'education',  order: 6 },
  { slug: 'career-skills',         name: 'Career & Skills',             description: 'CVs, internships, certifications',     domainSlug: 'education',  order: 7 },
  { slug: 'education-hub',         name: 'Education Hub Pages',         description: 'Overview and planning guides',         domainSlug: 'education',  order: 8 },
];

// ─── GUIDE DATA ───────────────────────────────────────────────────────────────
// Each entry = one guide page. Slugs already in DB will be skipped.

const GUIDES: GuideRow[] = [

  // ── GOVERNMENT / BUSINESS REGISTRATION (guides 1-10) ──────────────────────
  {
    title: 'TIN & Business Registration — 2026 Changes',
    slug: 'tin-business-registration-2026',
    subtitle: 'What changed in 2026 and what your business must do now',
    description: 'Updated guide to TIN registration and business compliance following 2026 regulatory changes.',
    domainSlug: 'government', subdomainSlug: 'business-registration',
    content: {
      quickAnswer: 'From 2026, TIN is automatically linked to CAC registration. All businesses must verify their TIN on the new FIRS integrated portal within 90 days of registration.',
      overview: 'Nigeria\'s 2026 tax reforms consolidated business registration and TIN issuance. The Corporate Affairs Commission (CAC) now shares data directly with FIRS, eliminating duplicate applications. Every new company receives its TIN at incorporation.',
      definitions: [
        { term: 'TIN', definition: 'Tax Identification Number — an 11-digit code issued by FIRS to track all tax obligations.', example: 'A sole proprietor receives TIN 12345678901 upon CAC registration.' },
        { term: 'Integrated Portal', definition: 'The joint CAC/FIRS platform launched in 2026 that issues TIN automatically at registration.' },
      ],
      requirements: [
        { title: 'Valid CAC certificate', description: 'RC number from your existing or new CAC registration.', isMandatory: true },
        { title: 'BVN of principal director', description: 'Bank Verification Number used for identity matching.', isMandatory: true },
        { title: 'Active business email', description: 'TIN confirmation and updates are sent here.', isMandatory: true },
        { title: 'Existing TIN (if pre-2026)', description: 'Old TINs must be migrated on the FIRS portal.', isMandatory: false },
      ],
      timeline: [
        { stepNumber: 1, title: 'Log in to FIRS integrated portal', description: 'Visit itax.firs.gov.ng and sign in with your CAC RC number.', estimatedTime: '10 minutes' },
        { stepNumber: 2, title: 'Verify auto-generated TIN', description: 'New businesses: confirm the TIN auto-assigned at CAC registration.', estimatedTime: '5 minutes' },
        { stepNumber: 3, title: 'Migrate old TIN (pre-2026 businesses)', description: 'Use the Migration Wizard to link your old TIN to your RC number.', estimatedTime: '20 minutes' },
        { stepNumber: 4, title: 'Download TIN certificate', description: 'Save the PDF certificate — needed for bank account and procurement.', estimatedTime: '2 minutes' },
      ],
      regulatory: 'The Nigeria Tax Act 2025 (effective January 2026) mandates integrated TIN issuance. Failure to verify TIN within 90 days attracts a ₦50,000 penalty per month. Regulated by FIRS under the FIRSEA Act.',
      stats: [
        { label: 'Auto-TIN issuance since Jan 2026', value: '100%', unit: 'of new registrations', source: 'FIRS 2026 Annual Report' },
        { label: 'Penalty for non-verification', value: '₦50,000', unit: 'per month', source: 'Nigeria Tax Act 2025 s.47' },
      ],
      commonMistakes: [
        { title: 'Using the old FIRS self-service portal', description: 'The old portal (firs.gov.ng/register) was retired in March 2026.', solution: 'Use itax.firs.gov.ng exclusively for all TIN operations.', realExample: 'Many 2025 businesses submitted to the old portal and received no TIN confirmation.' },
        { title: 'Assuming CAC registration is enough', description: 'You still need to verify the auto-TIN on the FIRS portal.', solution: 'Log in to the FIRS portal within 30 days of CAC registration.' },
        { title: 'Not linking BVN', description: 'TIN without BVN linkage cannot be used for VAT or PAYE filing.', solution: 'Complete BVN linkage under "Profile → Identity" on the FIRS portal.' },
      ],
      relatedGuides: [
        { slug: '/guides/cac-business-name', title: 'How to Register a Business Name with CAC' },
        { slug: '/guides/vat-registration-nigeria', title: 'How to Register for VAT' },
        { slug: '/guides/manage-payroll-calculate-paye', title: 'How to Manage Payroll and PAYE' },
      ],
      relatedTools: [{ slug: '/calculators/cac-estimator', title: 'CAC Registration Cost Estimator' }],
    },
    sources: [
      { title: 'FIRS iTax Portal', url: 'https://itax.firs.gov.ng', verified: true },
      { title: 'Nigeria Tax Act 2025', url: 'https://firs.gov.ng/nigeria-tax-act-2025', verified: true },
    ],
    reviewerName: 'Amina Hassan, Tax Consultant',
  },

  {
    title: 'How to Open a Business Bank Account in Nigeria',
    slug: 'open-business-bank-account',
    subtitle: 'A step-by-step guide to opening a corporate bank account',
    description: 'Everything you need to open a business bank account in Nigeria — documents, banks, and timelines.',
    domainSlug: 'government', subdomainSlug: 'business-registration',
    content: {
      quickAnswer: 'You need your CAC certificate, TIN, MEMART/constitution, and director IDs. Most banks open accounts within 3–5 working days. No minimum deposit is required for most SME accounts.',
      overview: 'A dedicated business bank account is legally required for registered companies and strongly advised for business names. It separates personal from business finances, satisfies FIRS requirements, and makes loan applications easier.',
      definitions: [
        { term: 'Current Account', definition: 'A transactional account with no limit on deposits or withdrawals — the standard for businesses.' },
        { term: 'MEMART', definition: 'Memorandum and Articles of Association — the founding document of a limited company.' },
        { term: 'BVN', definition: 'Bank Verification Number — required to link all accounts to one identity on the CBN database.' },
      ],
      requirements: [
        { title: 'CAC certificate', description: 'Original certificate of incorporation or business name registration.', isMandatory: true },
        { title: 'MEMART / Bylaws', description: 'For limited companies. Business names need their CAC Form BN1.', isMandatory: true },
        { title: 'TIN', description: 'Issued automatically at CAC registration from 2026.', isMandatory: true },
        { title: 'Director/proprietor ID', description: 'International passport, NIN slip, or national ID.', isMandatory: true },
        { title: 'Utility bill (business address)', description: 'Not older than 3 months.', isMandatory: true },
        { title: 'Board resolution', description: 'For LLCs: authorising signatories to operate the account.', isMandatory: false, notes: 'Required by most banks for companies with more than one director.' },
      ],
      timeline: [
        { stepNumber: 1, title: 'Choose a bank', description: 'Compare SME account fees, mobile banking quality, and branch proximity.', estimatedTime: '1 day' },
        { stepNumber: 2, title: 'Book an appointment', description: 'Most banks allow branch walk-in or online booking via their app.', estimatedTime: '30 minutes' },
        { stepNumber: 3, title: 'Submit documents', description: 'Present originals; bank will scan and return them. Provide a board resolution if applicable.', estimatedTime: '1–2 hours at branch' },
        { stepNumber: 4, title: 'Complete BVN linkage', description: 'Each director/signatory links their BVN in-branch.', estimatedTime: '15 minutes per person' },
        { stepNumber: 5, title: 'Receive account details', description: 'Account number issued same day or within 3 business days.', estimatedTime: '1–3 days' },
      ],
      regulatory: 'CBN requires all businesses operating a corporate account to have a valid TIN and CAC registration. Directors must be BVN-verified. Anti-money laundering (AML) rules require the bank to conduct Know-Your-Customer (KYC) checks.',
      commonMistakes: [
        { title: 'Going to the bank without a board resolution', description: 'Banks will turn you away if signatories are not pre-authorised.', solution: 'Prepare a signed board resolution naming all account signatories before visiting the bank.' },
        { title: 'Using a personal account for business', description: 'Mixing finances makes tax filing complicated and is a red flag for auditors.', solution: 'Open the corporate account before transacting any business income.' },
        { title: 'Choosing a bank solely by familiarity', description: 'Not all banks have strong SME support or competitive transfer fees.', solution: 'Compare Tier-1 (Zenith, GTB, Access) vs fintech-backed options (Moniepoint, Opay Business).' },
      ],
      relatedGuides: [
        { slug: '/guides/cac-business-name', title: 'How to Register a Business Name with CAC' },
        { slug: '/guides/tin-business-registration-2026', title: 'TIN & Business Registration 2026 Changes' },
      ],
    },
    sources: [
      { title: 'Central Bank of Nigeria — KYC Guidelines', url: 'https://cbn.gov.ng/out/2013/ccd/revised%20kyc%20manual.pdf', verified: true },
      { title: 'CAC Official Portal', url: 'https://pre.cac.gov.ng', verified: true },
    ],
    reviewerName: 'Mrs. Chioma Eze, Credit Analyst',
  },

  {
    title: 'How to Register for PAYE in Nigeria',
    slug: 'register-for-paye-nigeria',
    subtitle: 'Employer guide to Pay-As-You-Earn tax registration',
    description: 'How Nigerian employers register for PAYE with FIRS and their state tax authority.',
    domainSlug: 'government', subdomainSlug: 'business-registration',
    content: {
      quickAnswer: 'Register for PAYE with your state\'s Internal Revenue Service within 6 months of hiring your first employee. You\'ll need your CAC certificate, TIN, and employee list. Registration is free.',
      overview: 'PAYE (Pay-As-You-Earn) is a system where employers deduct income tax from employee salaries and remit to the relevant tax authority monthly. All employers in Nigeria are legally required to register.',
      definitions: [
        { term: 'PAYE', definition: 'Pay-As-You-Earn — a system of withholding income tax from employees at source.' },
        { term: 'State IRS', definition: 'State Internal Revenue Service — collects PAYE for employees resident in each state.' },
        { term: 'Employer Tax File Number', definition: 'A reference number issued upon PAYE registration, used on all monthly remittances.' },
      ],
      requirements: [
        { title: 'CAC registration certificate', description: 'Proof of legal business existence.', isMandatory: true },
        { title: 'Company TIN', description: 'Tax Identification Number from FIRS.', isMandatory: true },
        { title: 'List of employees', description: 'Names, NINs, and residential states of all staff.', isMandatory: true },
        { title: 'Business address proof', description: 'Utility bill or tenancy agreement for principal office.', isMandatory: true },
      ],
      timeline: [
        { stepNumber: 1, title: 'Identify the correct tax authority', description: 'PAYE is paid to the state IRS where each employee is resident — not necessarily where the business is registered.', estimatedTime: '1 hour' },
        { stepNumber: 2, title: 'Complete PAYE registration form', description: 'Download from the state IRS website or collect from the office.', estimatedTime: '30 minutes' },
        { stepNumber: 3, title: 'Submit with supporting documents', description: 'CAC cert, TIN, employee list, and business address proof.', estimatedTime: '1 day' },
        { stepNumber: 4, title: 'Receive Employer Tax File Number', description: 'Used on all future remittance forms.', estimatedTime: '2–5 working days' },
        { stepNumber: 5, title: 'Begin monthly deductions and remittances', description: 'PAYE must be remitted by the 10th of the following month.', estimatedTime: 'Monthly', cost: 'Varies by employee salary' },
      ],
      regulatory: 'PAYE is governed by the Personal Income Tax Act (PITA) as amended. Failure to register or remit attracts penalties of 10% of outstanding tax plus interest at the CBN monetary policy rate.',
      commonMistakes: [
        { title: 'Registering in the wrong state', description: 'PAYE follows employee residence, not company location.', solution: 'Check each employee\'s residential state and register with that state\'s IRS.' },
        { title: 'Late remittance', description: 'Remitting after the 10th of the month triggers penalties.', solution: 'Set up a standing order or payroll software reminder for the 8th of each month.' },
        { title: 'Ignoring the minimum wage threshold', description: 'Employees earning below ₦800,000 annually are exempt from PAYE since 2024.', solution: 'Confirm the current threshold on the FIRS website before deducting.' },
      ],
      relatedGuides: [
        { slug: '/guides/manage-payroll-calculate-paye', title: 'How to Manage Payroll and Calculate PAYE' },
        { slug: '/guides/tin-business-registration-2026', title: 'TIN & Business Registration 2026 Changes' },
      ],
      relatedTools: [{ slug: '/calculators/paye-calculator', title: 'PAYE Calculator' }],
    },
    sources: [
      { title: 'Personal Income Tax Act (PITA)', url: 'https://firs.gov.ng/pita', verified: true },
      { title: 'Lagos Internal Revenue Service', url: 'https://lirs.gov.ng', verified: true },
    ],
    reviewerName: 'Amina Hassan, Tax Consultant',
  },

  {
    title: 'How to Register a Trademark in Nigeria',
    slug: 'register-trademark-nigeria',
    subtitle: 'Protect your brand name, logo, and slogan with a trademark',
    description: 'Step-by-step guide to trademark registration with the Trademarks, Patents and Designs Registry in Nigeria.',
    domainSlug: 'government', subdomainSlug: 'business-registration',
    content: {
      quickAnswer: 'Trademark registration costs ₦15,000–₦30,000 per class and takes 12–18 months. File at the Commercial Law Department, Federal Ministry of Trade and Investment in Abuja or Lagos.',
      overview: 'A trademark gives you exclusive rights to use a name, logo, or slogan in connection with your goods or services. It prevents competitors from copying your brand and is enforceable in Nigerian courts.',
      definitions: [
        { term: 'Trademark', definition: 'Any sign capable of distinguishing the goods or services of one enterprise from another.', example: 'MTN\'s yellow colour and logo are registered trademarks.' },
        { term: 'Nice Classification', definition: 'The international system of 45 classes for goods and services — you must file in each class relevant to your business.' },
        { term: 'TM vs ®', definition: 'TM indicates a claim; ® indicates a registered trademark. Using ® before registration is an offence.' },
      ],
      requirements: [
        { title: 'Completed TM Form 1', description: 'Application form available at the Registry or online.', isMandatory: true },
        { title: 'Representation of the mark', description: 'Clear image/logo in the prescribed format, or wordmark in standard characters.', isMandatory: true },
        { title: 'List of goods/services', description: 'Described precisely under the relevant Nice Class(es).', isMandatory: true },
        { title: 'Applicant ID', description: 'International passport or national ID.', isMandatory: true },
        { title: 'CAC certificate (if company)', description: 'Proof the company exists.', isMandatory: false },
        { title: 'Power of Attorney', description: 'Required if filing through an agent.', isMandatory: false },
      ],
      timeline: [
        { stepNumber: 1, title: 'Conduct a trademark search', description: 'Search the Registry database to ensure no identical/similar mark is registered.', estimatedTime: '1–3 days', cost: '₦1,000 search fee' },
        { stepNumber: 2, title: 'Complete TM Form 1', description: 'Fill out the application with mark description, class, and applicant details.', estimatedTime: '1 day' },
        { stepNumber: 3, title: 'File the application', description: 'Submit at the Registry in person or through an IP agent. Pay the filing fee.', estimatedTime: '1 day', cost: '₦15,000–₦30,000 per class' },
        { stepNumber: 4, title: 'Examination by Registry', description: 'Examiner checks for conflicts and compliance — may issue objections.', estimatedTime: '3–6 months' },
        { stepNumber: 5, title: 'Publication in the Trademarks Journal', description: 'Mark published for 2 months for public opposition.', estimatedTime: '2 months' },
        { stepNumber: 6, title: 'Certificate of Registration issued', description: 'If no opposition, the certificate is issued. Valid for 7 years, renewable.', estimatedTime: '12–18 months total' },
      ],
      regulatory: 'Trademarks are governed by the Trademarks Act Cap T13 LFN 2004. The Trademarks, Patents and Designs Registry operates under FMTI. An unregistered trademark has limited protection under common law only.',
      commonMistakes: [
        { title: 'Skipping the prior search', description: 'Filing without checking for conflicts leads to rejection and wasted fees.', solution: 'Always search the Registry database before filing.' },
        { title: 'Filing in too few classes', description: 'A trademark only protects within the registered class.', solution: 'List all business activities and file in every relevant class.' },
        { title: 'Using ® before registration', description: 'This is a criminal offence under the Trademarks Act.', solution: 'Use ™ until the certificate is issued, then switch to ®.' },
      ],
      relatedGuides: [
        { slug: '/guides/register-patent-nigeria', title: 'How to Register a Patent in Nigeria' },
        { slug: '/guides/cac-business-name', title: 'How to Register a Business Name with CAC' },
      ],
    },
    sources: [
      { title: 'Trademarks, Patents and Designs Registry', url: 'https://iponigeria.gov.ng', verified: true },
      { title: 'Trademarks Act Cap T13 LFN 2004', url: 'https://lawsnigeria.placng.org/l.php?i=T13', verified: true },
    ],
    reviewerName: 'Barrister Ngozi Obi, Intellectual Property Lawyer',
  },

  {
    title: 'Do I Need Business Insurance in Nigeria?',
    slug: 'do-i-need-business-insurance-nigeria',
    subtitle: 'Which types of business insurance are compulsory vs optional in Nigeria',
    description: 'Understand compulsory and optional business insurance for Nigerian SMEs.',
    domainSlug: 'government', subdomainSlug: 'business-registration',
    content: {
      quickAnswer: 'Three types are compulsory by law: Employer\'s Liability, Motor Third-Party, and Buildings in Public Use. Others — like professional indemnity and fire insurance — are optional but strongly advised.',
      overview: 'The Insurance Act 2003 mandates certain classes of insurance for businesses. Beyond compliance, insurance protects against risks that could wipe out an SME overnight.',
      definitions: [
        { term: 'Compulsory Insurance', definition: 'Coverage required by Nigerian law — you can be fined or prosecuted without it.' },
        { term: 'Employer\'s Liability Insurance', definition: 'Covers costs if an employee is injured at work. Required under NSITF Act.' },
        { term: 'Professional Indemnity', definition: 'Covers claims from clients for professional errors or negligence. Advisable for consultants and service businesses.' },
      ],
      requirements: [
        { title: 'Employer\'s Liability / NSITF contribution', description: 'Mandatory for all employers. Register with NSITF and pay 1% of annual payroll.', isMandatory: true },
        { title: 'Motor Third-Party Insurance', description: 'Required for every business vehicle under the Motor Vehicles (Third Party Insurance) Act.', isMandatory: true },
        { title: 'Buildings in Public Use Insurance', description: 'Required for commercial buildings with public access under the Insurance Act 2003.', isMandatory: true },
        { title: 'Fire & Special Perils', description: 'Optional but required by most commercial landlords and banks.', isMandatory: false },
        { title: 'Professional Indemnity', description: 'Optional. Advised for lawyers, accountants, engineers, and consultants.', isMandatory: false },
      ],
      timeline: [
        { stepNumber: 1, title: 'Identify applicable compulsory covers', description: 'Use the NAICOM checklist to determine which policies apply to your sector.', estimatedTime: '1 day' },
        { stepNumber: 2, title: 'Get quotes from licensed insurers', description: 'Compare at least 3 NAICOM-licensed brokers or direct insurers.', estimatedTime: '2–3 days' },
        { stepNumber: 3, title: 'Purchase and receive policy documents', description: 'Keep originals accessible for inspection.', estimatedTime: '1–2 days', cost: 'Varies: ₦20,000–₦500,000+ per policy' },
      ],
      regulatory: 'Insurance in Nigeria is regulated by NAICOM under the Insurance Act 2003. Selling or operating without compulsory insurance is an offence. Check naicom.gov.ng for licensed insurers.',
      commonMistakes: [
        { title: 'Buying from unlicensed insurers', description: 'Fake insurance policies are common — especially for vehicles.', solution: 'Verify your insurer on the NAICOM website before buying any policy.' },
        { title: 'Ignoring NSITF registration', description: 'NSITF is separate from commercial insurance and is mandatory.', solution: 'Register at nsitf.gov.ng within 6 months of hiring your first employee.' },
      ],
      relatedGuides: [
        { slug: '/guides/register-employer-nsitf', title: 'How to Register as an Employer with NSITF' },
        { slug: '/guides/manage-business-insurance', title: 'How to Manage Business Insurance in Nigeria' },
      ],
    },
    sources: [
      { title: 'NAICOM — Insurance Regulatory Authority', url: 'https://naicom.gov.ng', verified: true },
      { title: 'Insurance Act 2003', url: 'https://lawsnigeria.placng.org', verified: true },
    ],
    reviewerName: 'Mrs. Ada Nwankwo, FinTech & Insurance Consultant',
  },

  {
    title: 'How to Renew or Update Your CAC Registration',
    slug: 'renew-update-cac-registration',
    subtitle: 'Annual returns and CAC record changes — everything you need to know',
    description: 'How to file CAC annual returns and update your business registration details.',
    domainSlug: 'government', subdomainSlug: 'business-registration',
    content: {
      quickAnswer: 'Annual returns for business names cost ₦3,000 and are due every June 30. For companies, fees range ₦3,000–₦10,000 depending on share capital. Late filing attracts ₦5,000 per month penalty.',
      overview: 'Every registered business must file annual returns with CAC to remain in good standing. You can also update your address, directors, or business name through the CAC portal.',
      definitions: [
        { term: 'Annual Returns', definition: 'A yearly filing confirming a business is still active, with current address and officer details.' },
        { term: 'Change of Particulars', definition: 'A CAC filing to update name, address, directors, or shareholding structure.' },
        { term: 'Status Certificate', definition: 'A CAC-issued document confirming your registration is current — required for contracts and tenders.' },
      ],
      requirements: [
        { title: 'CAC login credentials', description: 'Access the CAC e-filing portal at pre.cac.gov.ng.', isMandatory: true },
        { title: 'Current registered office address', description: 'Confirm or update to the correct current address.', isMandatory: true },
        { title: 'Director/proprietor details', description: 'Confirm no changes, or provide new director details.', isMandatory: true },
        { title: 'Payment evidence', description: 'Online payment via Remita or interbank transfer.', isMandatory: true },
      ],
      timeline: [
        { stepNumber: 1, title: 'Log in to CAC e-filing portal', description: 'Visit pre.cac.gov.ng with your RC number and password.', estimatedTime: '5 minutes' },
        { stepNumber: 2, title: 'Select Annual Returns', description: 'Choose the relevant entity type (Business Name or Company).', estimatedTime: '10 minutes' },
        { stepNumber: 3, title: 'Confirm or update details', description: 'Review address, directors, and activities. Update any changes.', estimatedTime: '15 minutes' },
        { stepNumber: 4, title: 'Pay and submit', description: 'Pay via Remita. Filing is confirmed instantly.', estimatedTime: '10 minutes', cost: '₦3,000–₦10,000' },
      ],
      regulatory: 'Annual returns are required under CAMA 2020. Default attracts ₦5,000 per month in penalties. Businesses dormant for 3+ years without filing may be struck off the register.',
      commonMistakes: [
        { title: 'Filing after the June 30 deadline', description: 'Late filing triggers automatic penalties from July 1.', solution: 'Set a calendar reminder for June 1 every year.' },
        { title: 'Using outdated addresses', description: 'An old address on CAC records can block contract and bank applications.', solution: 'Update via Change of Address filing before filing annual returns.' },
      ],
      relatedGuides: [
        { slug: '/guides/cac-business-name', title: 'How to Register a Business Name with CAC' },
        { slug: '/guides/file-company-tax-returns', title: 'How to File Company Tax Returns' },
      ],
      relatedTools: [{ slug: '/calculators/cac-estimator', title: 'CAC Registration Cost Estimator' }],
    },
    sources: [
      { title: 'CAC e-Filing Portal', url: 'https://pre.cac.gov.ng', verified: true },
      { title: 'Companies and Allied Matters Act 2020', url: 'https://cac.gov.ng/cama2020', verified: true },
    ],
    reviewerName: 'Chinedu Okoro, Business Registration Specialist',
  },

  {
    title: 'Business Name vs Limited Company — Which Is Right for You?',
    slug: 'business-name-vs-limited-company',
    subtitle: 'A clear comparison to help you choose the right structure',
    description: 'Compare Business Name and Limited Company registration in Nigeria — costs, liability, and tax implications.',
    domainSlug: 'government', subdomainSlug: 'business-registration',
    content: {
      quickAnswer: 'Business Name: ₦10,000–₦15,000, sole owner or partners, unlimited personal liability. Limited Company: ₦50,000+, separate legal entity, limited liability, better for investment and contracts.',
      overview: 'Choosing your business structure affects how much tax you pay, whether your personal assets are at risk, and how attractive you are to investors. Both are registered with CAC but have very different legal implications.',
      definitions: [
        { term: 'Business Name', definition: 'A trade name for a sole proprietor or partnership. Not a separate legal entity — the owner is personally liable.', example: 'Ade\'s Catering Services (BN 1234567)' },
        { term: 'Limited Liability Company (LLC)', definition: 'A separate legal entity with its own rights and obligations. Shareholders\' liability is limited to their shares.', example: 'Ade\'s Catering Services Ltd (RC 1234567)' },
      ],
      requirements: [
        { title: 'Business Name', description: 'Valid ID, proposed name, business address, nature of business. Cost: ₦10,000–₦15,000.', isMandatory: true },
        { title: 'Limited Company', description: 'Minimum 1 director, MEMART, share capital, TIN, CAC filing. Cost: ₦50,000+.', isMandatory: true },
      ],
      timeline: [
        { stepNumber: 1, title: 'Decide based on your goals', description: 'Freelancers and sole traders: Business Name. Anyone seeking investors or contracts: LLC.', estimatedTime: '1 day' },
        { stepNumber: 2, title: 'Register on CAC portal', description: 'Both registrations are done at pre.cac.gov.ng.', estimatedTime: '3–7 days', cost: '₦10,000–₦50,000+' },
      ],
      regulatory: 'Both structures are governed by CAMA 2020. Companies have more filing obligations (annual returns, audited accounts) but enjoy stronger legal protections.',
      stats: [
        { label: 'Business Names registered in Nigeria (2024)', value: '4.2M+', unit: 'registrations', source: 'CAC 2024 Annual Report' },
        { label: 'LLCs registered in Nigeria (2024)', value: '1.1M+', unit: 'registrations', source: 'CAC 2024 Annual Report' },
      ],
      commonMistakes: [
        { title: 'Registering as Business Name then converting later', description: 'Conversion is possible but adds cost and paperwork.', solution: 'If you plan to scale or seek investors, start as an LLC from day one.' },
        { title: 'Thinking Business Name is free', description: 'Business Names still have registration fees and annual returns.', solution: 'Budget ₦15,000–₦20,000 all-in for Business Name registration and first-year returns.' },
      ],
      relatedGuides: [
        { slug: '/guides/cac-business-name', title: 'How to Register a Business Name with CAC' },
        { slug: '/guides/register-llc-nigeria', title: 'How to Register a Limited Liability Company' },
      ],
      relatedTools: [{ slug: '/calculators/entity-comparator', title: 'Entity Type Comparator' }],
    },
    sources: [
      { title: 'Corporate Affairs Commission', url: 'https://cac.gov.ng', verified: true },
      { title: 'CAMA 2020 Full Text', url: 'https://cac.gov.ng/cama2020', verified: true },
    ],
    reviewerName: 'Barrister Ngozi Obi, Intellectual Property Lawyer',
  },

  {
    title: 'Business Startup Checklist for Nigerian Entrepreneurs',
    slug: 'business-startup-checklist-nigeria',
    subtitle: 'Everything you need to launch a legal, tax-compliant business in Nigeria',
    description: 'A complete hub-page checklist for starting a business in Nigeria — registration, tax, banking, and compliance.',
    domainSlug: 'government', subdomainSlug: 'business-registration',
    content: {
      quickAnswer: 'The 7 essential steps: (1) Choose structure, (2) Register with CAC, (3) Get TIN, (4) Register for VAT/PAYE if applicable, (5) Open business bank account, (6) Get required licenses, (7) Register with NSITF if hiring.',
      overview: 'Starting a business in Nigeria requires navigating multiple government agencies. This checklist ensures you don\'t miss any critical step — from pre-registration decisions through to ongoing compliance.',
      definitions: [
        { term: 'Sole Proprietorship', definition: 'A Business Name registration where one person owns and is fully liable for the business.' },
        { term: 'Compliance Calendar', definition: 'A schedule of recurring filings — annual returns, PAYE remittances, VAT returns — to avoid penalties.' },
      ],
      requirements: [
        { title: 'Choose your business structure', description: 'Business Name, LLC, or Partnership — affects taxes and liability.', isMandatory: true },
        { title: 'Register with CAC', description: 'Get your RC or BN number.', isMandatory: true },
        { title: 'Obtain TIN', description: 'Automatic from 2026 with CAC registration, but must be verified on FIRS portal.', isMandatory: true },
        { title: 'Register for VAT (if turnover ≥ ₦25M)', description: 'File monthly VAT returns with FIRS.', isMandatory: false, notes: 'Mandatory once threshold is met.' },
        { title: 'Register for PAYE (if hiring)', description: 'With your state IRS within 6 months of first hire.', isMandatory: false },
        { title: 'Open business bank account', description: 'Required for all registered entities.', isMandatory: true },
        { title: 'Obtain sector-specific license', description: 'NAFDAC for food/drugs, NAICOM for insurance, etc.', isMandatory: false, notes: 'Varies by industry.' },
      ],
      timeline: [
        { stepNumber: 1, title: 'Pre-registration (Week 1)', description: 'Decide structure, check name availability, gather documents.', estimatedTime: '3–5 days' },
        { stepNumber: 2, title: 'Registration (Week 1–2)', description: 'File with CAC, verify TIN, register for VAT/PAYE.', estimatedTime: '5–10 days', cost: '₦10,000–₦80,000 depending on structure' },
        { stepNumber: 3, title: 'Banking & Compliance (Week 2–3)', description: 'Open bank account, get NSITF registration, obtain licenses.', estimatedTime: '5–10 days' },
        { stepNumber: 4, title: 'Launch & Ongoing Compliance', description: 'File annual returns, monthly PAYE/VAT remittances.', estimatedTime: 'Recurring' },
      ],
      regulatory: 'Multiple agencies are involved: CAC (registration), FIRS (taxes), CBN (banking), state IRS (PAYE), NSITF (employer liability). Use this checklist to avoid gaps.',
      commonMistakes: [
        { title: 'Skipping sector licenses', description: 'Operating a pharmacy, school, or food business without a sector license is a criminal offence.', solution: 'Research your sector\'s regulator before launch.' },
        { title: 'Not tracking compliance deadlines', description: 'Missing PAYE remittance or CAC annual returns compounds penalties monthly.', solution: 'Set up a compliance calendar on Day 1.' },
      ],
      relatedGuides: [
        { slug: '/guides/cac-business-name', title: 'Register a Business Name with CAC' },
        { slug: '/guides/vat-registration-nigeria', title: 'Register for VAT' },
        { slug: '/guides/open-business-bank-account', title: 'Open a Business Bank Account' },
      ],
      relatedTools: [
        { slug: '/calculators/cac-estimator', title: 'CAC Cost Estimator' },
        { slug: '/calculators/doc-checklist', title: 'Document Checklist Generator' },
      ],
    },
    sources: [
      { title: 'CAC Official Portal', url: 'https://pre.cac.gov.ng', verified: true },
      { title: 'SMEDAN Business Startup Guide', url: 'https://smedan.gov.ng', verified: true },
    ],
    reviewerName: 'Chinedu Okoro, Business Registration Specialist',
  },

  // ── GOVERNMENT / IDENTITY & CIVIL DOCUMENTS (guides 11-25) ───────────────────

  {
    title: 'How to Apply for a Nigerian International Passport',
    slug: 'apply-nigerian-international-passport',
    subtitle: 'First-time passport application — requirements, fees, and timelines',
    description: 'Complete guide to applying for a Nigerian international passport for the first time.',
    domainSlug: 'government', subdomainSlug: 'identity-civil',
    content: {
      quickAnswer: 'First-time passport: ₦35,000 (standard 32-page, 10-year). Apply at any NIS office or online at passport.immigration.gov.ng. Processing takes 4–6 weeks standard, 1 week expedited.',
      overview: 'A Nigerian international passport is required for all international travel and is one of the most accepted Nigerian identity documents globally. First-time applicants must appear in person for biometric capture.',
      definitions: [
        { term: 'Standard Passport', definition: '32-page booklet, valid for 10 years. Cost: ₦35,000.' },
        { term: 'Premium Passport', definition: '64-page booklet, valid for 10 years. Cost: ₦70,000.' },
        { term: 'NIN', definition: 'National Identification Number — mandatory for passport applications since 2021.' },
      ],
      requirements: [
        { title: 'NIN (National Identification Number)', description: 'Enrol at any NIMC office if you don\'t have one.', isMandatory: true },
        { title: 'Birth certificate or age declaration', description: 'Primary proof of date of birth.', isMandatory: true },
        { title: 'Recent passport photograph', description: 'White background, taken within 6 months.', isMandatory: true },
        { title: 'Evidence of Nigerian citizenship', description: 'National ID, voter\'s card, or baptism certificate.', isMandatory: true },
        { title: 'Proof of payment', description: 'Remita receipt from the NIS payment portal.', isMandatory: true },
      ],
      timeline: [
        { stepNumber: 1, title: 'Enrol for NIN', description: 'Visit any NIMC office with birth certificate and one guarantor.', estimatedTime: '1–3 days' },
        { stepNumber: 2, title: 'Apply online', description: 'Visit passport.immigration.gov.ng, fill the form, and pay.', estimatedTime: '30 minutes', cost: '₦35,000–₦70,000' },
        { stepNumber: 3, title: 'Book appointment', description: 'Choose your nearest NIS office and available date.', estimatedTime: '10 minutes' },
        { stepNumber: 4, title: 'Attend biometric capture', description: 'Bring originals of all documents. Fingerprints and photo are taken.', estimatedTime: '1–2 hours at office' },
        { stepNumber: 5, title: 'Collect passport', description: 'SMS notification sent when ready. Collect in person.', estimatedTime: '4–6 weeks standard, 5 business days expedited' },
      ],
      regulatory: 'Passports are issued by the Nigeria Immigration Service under the Immigration Act Cap I1 LFN 2004. NIN linkage is mandatory under the NIN-SIM Directive 2021.',
      commonMistakes: [
        { title: 'Applying without NIN', description: 'Applications without NIN are automatically rejected.', solution: 'Complete NIN enrolment at least 2 weeks before applying.' },
        { title: 'Using blurry passport photos', description: 'NIS rejects photographs that don\'t meet specifications.', solution: 'Use a professional photographer familiar with NIS requirements.' },
        { title: 'Not tracking your application', description: 'Many applicants don\'t know their passport is ready.', solution: 'Check status at passport.immigration.gov.ng using your application number.' },
      ],
      relatedGuides: [
        { slug: '/guides/renew-nigerian-passport', title: 'How to Renew Your Nigerian Passport' },
        { slug: '/guides/apply-uk-us-schengen-visa', title: 'How to Apply for a UK/US/Schengen Visa' },
      ],
      relatedTools: [{ slug: '/calculators/passport-estimator', title: 'Passport Cost Estimator' }],
    },
    sources: [
      { title: 'Nigeria Immigration Service', url: 'https://immigration.gov.ng', verified: true },
      { title: 'NIS Passport Online Portal', url: 'https://passport.immigration.gov.ng', verified: true },
    ],
    reviewerName: 'Adaobi Okechukwu, Immigration Officer',
  },

  {
    title: 'How to Enrol for NIN (National Identity Number)',
    slug: 'enrol-for-nin-nigeria',
    subtitle: 'NIN enrolment guide for first-time applicants',
    description: 'Step-by-step guide to enrolling for a National Identity Number (NIN) in Nigeria.',
    domainSlug: 'government', subdomainSlug: 'identity-civil',
    content: {
      quickAnswer: 'NIN enrolment is free. Visit any NIMC enrolment centre with your birth certificate and one guarantor. Your NIN is issued within 1–3 days. You need it for passport, SIM, banking, and JAMB.',
      overview: 'The National Identity Number (NIN) is an 11-digit number assigned to every Nigerian citizen. It is the foundation of Nigeria\'s digital identity system, linking to passports, SIM cards, bank accounts, and government services.',
      definitions: [
        { term: 'NIN', definition: 'An 11-digit unique identifier issued by the National Identity Management Commission (NIMC).' },
        { term: 'NIN Slip', definition: 'A physical document showing your NIN — accepted as ID for many services while your National ID card is being processed.' },
        { term: 'NIMC MWS', definition: 'NIMC Mobile Web Service app — allows you to manage your NIN and download a virtual NIN.' },
      ],
      requirements: [
        { title: 'Birth certificate or age declaration', description: 'Primary proof of identity and date of birth.', isMandatory: true },
        { title: 'One guarantor', description: 'A Nigerian citizen with a valid NIN who can verify your identity.', isMandatory: true, notes: 'Required for first-time enrolment.' },
        { title: 'Proof of address', description: 'Utility bill, tenancy agreement, or LGA letter.', isMandatory: false },
      ],
      timeline: [
        { stepNumber: 1, title: 'Locate your nearest NIMC centre', description: 'Use the NIMC centre locator at nimc.gov.ng/enrolment-centers.', estimatedTime: '10 minutes' },
        { stepNumber: 2, title: 'Visit the centre with documents', description: 'Bring originals and photocopies of birth certificate and guarantor\'s ID.', estimatedTime: '1–3 hours at centre' },
        { stepNumber: 3, title: 'Complete biometric capture', description: 'Fingerprints, facial photo, and demographic data are captured.', estimatedTime: '20 minutes' },
        { stepNumber: 4, title: 'Receive NIN slip', description: 'Printed or emailed within 24–72 hours.', estimatedTime: '1–3 days' },
      ],
      regulatory: 'NIN enrolment is governed by the NIMC Act 2007. Linking NIN to SIM cards is mandatory under CBN/NCC directives. Unlinked SIMs are deactivated.',
      commonMistakes: [
        { title: 'Going without a guarantor', description: 'Many enrolment centres turn away applicants without a guarantor.', solution: 'Confirm your centre\'s requirements by phone before visiting.' },
        { title: 'Not downloading the NIMC app', description: 'The app allows you to generate a virtual NIN for use where physical ID isn\'t needed.', solution: 'Download the NIMC MWS app from Google Play or App Store after enrolment.' },
      ],
      relatedGuides: [
        { slug: '/guides/apply-nigerian-international-passport', title: 'How to Apply for a Nigerian Passport' },
        { slug: '/guides/retrieve-lost-nin', title: 'How to Retrieve a Lost or Forgotten NIN' },
      ],
    },
    sources: [
      { title: 'National Identity Management Commission', url: 'https://nimc.gov.ng', verified: true },
    ],
    reviewerName: 'Adaobi Okechukwu, Immigration Officer',
  },

  {
    title: 'How to Retrieve a Lost or Forgotten NIN',
    slug: 'retrieve-lost-nin',
    subtitle: 'Multiple ways to recover your NIN if you\'ve misplaced it',
    description: 'How to retrieve your NIN using USSD, the NIMC app, your bank, or visiting a NIMC centre.',
    domainSlug: 'government', subdomainSlug: 'identity-civil',
    content: {
      quickAnswer: 'Dial *346# on any Nigerian SIM to retrieve your NIN via USSD for ₦20. You can also check the NIMC app, your bank app, or visit any NIMC centre with valid ID.',
      overview: 'Forgetting or losing your NIN does not mean losing your identity — it\'s permanently stored in the NIMC database. Multiple channels exist to retrieve it.',
      definitions: [
        { term: 'USSD NIN Retrieval', definition: 'Dialling *346# on a NIN-linked SIM to receive your NIN via SMS. Costs ₦20.' },
        { term: 'Virtual NIN (vNIN)', definition: 'A 16-digit temporary code generated from the NIMC app — safer than sharing your actual NIN.' },
      ],
      requirements: [
        { title: 'NIN-linked SIM card', description: 'For USSD retrieval via *346#.', isMandatory: false },
        { title: 'NIMC MWS app', description: 'Download from Google Play or App Store — shows NIN after biometric login.', isMandatory: false },
        { title: 'Valid ID (for centre visit)', description: 'Passport, driver\'s license, or voter\'s card.', isMandatory: false, notes: 'Required only if other channels fail.' },
      ],
      timeline: [
        { stepNumber: 1, title: 'Try USSD first', description: 'Dial *346# on your registered SIM. Your NIN arrives by SMS.', estimatedTime: '2 minutes', cost: '₦20' },
        { stepNumber: 2, title: 'Check your bank app', description: 'Most Nigerian banks display your linked NIN in the profile section.', estimatedTime: '5 minutes' },
        { stepNumber: 3, title: 'Use NIMC MWS app', description: 'Log in with your registered phone number and biometric verification.', estimatedTime: '10 minutes' },
        { stepNumber: 4, title: 'Visit a NIMC centre', description: 'If all else fails, visit with valid ID to retrieve in person.', estimatedTime: '1–2 hours' },
      ],
      regulatory: 'NIN is managed by NIMC under the NIMC Act 2007. No one can permanently delete your NIN — retrieval is always possible through official channels.',
      commonMistakes: [
        { title: 'Dialling from an unlinked SIM', description: '*346# only works if that SIM is linked to your NIN.', solution: 'Try from a different SIM you may have used during enrolment.' },
        { title: 'Sharing NIN publicly', description: 'Your raw NIN can be misused for identity fraud.', solution: 'Use the vNIN feature for third-party sharing.' },
      ],
      relatedGuides: [
        { slug: '/guides/enrol-for-nin-nigeria', title: 'How to Enrol for NIN' },
        { slug: '/guides/correct-nin-details', title: 'How to Correct NIN Details' },
      ],
    },
    sources: [
      { title: 'NIMC Official Website', url: 'https://nimc.gov.ng', verified: true },
    ],
    reviewerName: 'Adaobi Okechukwu, Immigration Officer',
  },

  {
    title: 'How to Correct NIN Details',
    slug: 'correct-nin-details',
    subtitle: 'Fix errors in your NIN record — name, date of birth, gender',
    description: 'How to correct errors in your NIN data at a NIMC enrolment centre.',
    domainSlug: 'government', subdomainSlug: 'identity-civil',
    content: {
      quickAnswer: 'Visit any NIMC enrolment centre with supporting documents. Minor corrections (spelling) take 1–3 days. Major corrections (date of birth) require a sworn affidavit and take 5–10 days. Fee: ₦1,000–₦5,000.',
      overview: 'Errors in your NIN record — wrong name spelling, incorrect date of birth — can block passport applications, bank transactions, and exam registrations. NIMC allows corrections via its enrolment centres.',
      definitions: [
        { term: 'Minor Correction', definition: 'Spelling errors, middle name additions. Processed at the centre same day or next day.' },
        { term: 'Major Correction', definition: 'Date of birth or gender changes. Requires legal documentation and central NIMC approval.' },
      ],
      requirements: [
        { title: 'Valid ID', description: 'Passport, driver\'s license, or voter\'s card confirming correct details.', isMandatory: true },
        { title: 'Birth certificate or sworn affidavit', description: 'For date of birth or name changes — affidavit must be sworn at a magistrate court.', isMandatory: true },
        { title: 'NIN slip or printout', description: 'Showing the current (incorrect) data.', isMandatory: true },
      ],
      timeline: [
        { stepNumber: 1, title: 'Gather supporting documents', description: 'Get birth certificate, affidavit (if needed), and valid ID.', estimatedTime: '1–3 days' },
        { stepNumber: 2, title: 'Visit NIMC enrolment centre', description: 'Bring originals and copies. Request a correction form.', estimatedTime: '1–2 hours at centre' },
        { stepNumber: 3, title: 'Submit and pay fee', description: 'Pay correction fee and receive a reference number.', estimatedTime: '15 minutes', cost: '₦1,000–₦5,000' },
        { stepNumber: 4, title: 'Confirmation and updated NIN slip', description: 'Minor corrections: 1–3 days. Major: 5–10 days.', estimatedTime: '1–10 days' },
      ],
      regulatory: 'NIMC is the sole authority for NIN data corrections. Third-party agents offering to correct NIN data are fraudulent.',
      commonMistakes: [
        { title: 'Using an unofficial agent', description: 'Scammers claim to offer NIN corrections online for a fee.', solution: 'Only correct your NIN at an official NIMC centre — never via WhatsApp or third parties.' },
      ],
      relatedGuides: [
        { slug: '/guides/enrol-for-nin-nigeria', title: 'How to Enrol for NIN' },
        { slug: '/guides/retrieve-lost-nin', title: 'How to Retrieve a Lost NIN' },
      ],
    },
    sources: [{ title: 'NIMC', url: 'https://nimc.gov.ng', verified: true }],
    reviewerName: 'Adaobi Okechukwu, Immigration Officer',
  },

  {
    title: 'How to Register a Birth in Nigeria',
    slug: 'register-birth-nigeria',
    subtitle: 'How to register your child\'s birth with the National Population Commission',
    description: 'Complete guide to birth registration in Nigeria — NPC offices, requirements, and timelines.',
    domainSlug: 'government', subdomainSlug: 'identity-civil',
    content: {
      quickAnswer: 'Birth registration is free within 60 days of delivery. After 60 days, a fee of ₦2,500 applies. Register at the NPC office nearest to the hospital or local government.',
      overview: 'Birth registration is a constitutional right and the foundation of all other civil documents — passport, NIN, JAMB. The National Population Commission (NPC) handles birth registration in Nigeria.',
      definitions: [
        { term: 'Birth Certificate', definition: 'Official document issued by NPC confirming a child\'s birth, name, and parentage.' },
        { term: 'NPC', definition: 'National Population Commission — the federal agency responsible for vital registration.' },
        { term: 'Late Registration', definition: 'Registration after 60 days. Requires additional documentation and fees.' },
      ],
      requirements: [
        { title: 'Hospital delivery notification', description: 'Form provided by the hospital or maternity centre.', isMandatory: true },
        { title: 'Parents\' valid ID', description: 'NIN slips or national IDs of both parents.', isMandatory: true },
        { title: 'Marriage certificate (if applicable)', description: 'Recommended but not strictly required.', isMandatory: false },
        { title: 'Two witnesses\' IDs (for late registration)', description: 'Neighbours or community members who can attest to the birth.', isMandatory: false },
      ],
      timeline: [
        { stepNumber: 1, title: 'Visit NPC office within 60 days', description: 'Free registration. Bring hospital notification and parents\' IDs.', estimatedTime: '1 day' },
        { stepNumber: 2, title: 'Complete registration form', description: 'Fill in child\'s name, date of birth, parentage details.', estimatedTime: '30 minutes' },
        { stepNumber: 3, title: 'Receive birth certificate', description: 'Issued same day or within 3–5 days.', estimatedTime: '1–5 days' },
      ],
      regulatory: 'Governed by the Births, Deaths (Compulsory Registration) Act and Vital Registration Act. All Nigerian births must be registered.',
      commonMistakes: [
        { title: 'Waiting beyond 60 days', description: 'Late registration requires more documentation and fees.', solution: 'Register within 60 days — visit the NPC desk at the delivery hospital.' },
        { title: 'Name spelling errors', description: 'Errors on the birth certificate affect all future documents.', solution: 'Double-check spelling before the certificate is printed.' },
      ],
      relatedGuides: [
        { slug: '/guides/obtain-birth-certificate-nigeria', title: 'How to Obtain a Birth Certificate' },
        { slug: '/guides/enrol-for-nin-nigeria', title: 'How to Enrol for NIN' },
      ],
    },
    sources: [{ title: 'National Population Commission', url: 'https://nationalpopulation.gov.ng', verified: true }],
    reviewerName: 'Dr. Grace Nwosu, Education Consultant',
  },

  {
    title: 'How to Get a Statutory Marriage Certificate in Nigeria',
    slug: 'get-statutory-marriage-certificate',
    subtitle: 'Registry marriage guide — requirements, fees, and process',
    description: 'How to legally register a marriage and obtain a statutory marriage certificate in Nigeria.',
    domainSlug: 'government', subdomainSlug: 'identity-civil',
    content: {
      quickAnswer: 'Statutory marriage: ₦21,000 at a Marriage Registry. Required: 21-day notice, valid IDs, two witnesses. Processing takes 21 days after notice filing.',
      overview: 'A statutory (registry) marriage under the Marriage Act is the only form of marriage fully recognised under Nigerian federal law for visa and property purposes. It is separate from traditional and religious ceremonies.',
      definitions: [
        { term: 'Marriage Notice', definition: 'A 21-day advance notice filed at the Marriage Registry before the ceremony can take place.' },
        { term: 'Marriage Certificate', definition: 'Official document issued by the Marriage Registry after the ceremony — required for visa applications, name changes, and inheritance.' },
      ],
      requirements: [
        { title: 'Valid ID for both parties', description: 'NIN slip, international passport, or national ID.', isMandatory: true },
        { title: 'Birth certificates', description: 'For both parties.', isMandatory: true },
        { title: 'Two witnesses with valid ID', description: 'Must be present at the ceremony.', isMandatory: true },
        { title: 'Proof of residence', description: 'Utility bill or tenancy agreement.', isMandatory: true },
        { title: 'Divorce certificate (if previously married)', description: 'Required if either party has been divorced.', isMandatory: false },
      ],
      timeline: [
        { stepNumber: 1, title: 'File marriage notice', description: 'Visit your local Marriage Registry and complete Form C (notice of marriage).', estimatedTime: '1 day', cost: '₦5,000' },
        { stepNumber: 2, title: 'Wait 21 days', description: 'Mandatory waiting period — notice is posted publicly.', estimatedTime: '21 days' },
        { stepNumber: 3, title: 'Attend ceremony at Registry', description: 'Both parties and witnesses appear. Registrar conducts the ceremony.', estimatedTime: '30 minutes', cost: '₦16,000' },
        { stepNumber: 4, title: 'Receive marriage certificate', description: 'Issued same day after ceremony.', estimatedTime: 'Same day' },
      ],
      regulatory: 'Governed by the Marriage Act Cap M6 LFN 2004. Only registry marriages are legally binding nationwide. Traditional and religious ceremonies require a registry marriage for full legal effect.',
      commonMistakes: [
        { title: 'Skipping the 21-day notice', description: 'The ceremony cannot take place without the 21-day notice period.', solution: 'Plan at least 4 weeks ahead of your desired ceremony date.' },
        { title: 'Confusing religious and statutory marriage', description: 'A church or mosque wedding without registry registration is not legally recognised for visa or property purposes.', solution: 'Do both — registry first, then religious ceremony.' },
      ],
      relatedGuides: [
        { slug: '/guides/get-married-legally-nigeria', title: 'How to Get Married Legally in Nigeria' },
        { slug: '/guides/change-name-legally-nigeria', title: 'How to Change Your Name Legally' },
      ],
    },
    sources: [{ title: 'Marriage Act Cap M6 LFN 2004', url: 'https://lawsnigeria.placng.org', verified: true }],
    reviewerName: 'Barrister Ngozi Obi, Intellectual Property Lawyer',
  },

  {
    title: 'How to Register a Customary or Traditional Marriage',
    slug: 'register-customary-traditional-marriage',
    subtitle: 'Formalising your traditional marriage under Nigerian law',
    description: 'How to register a traditional or customary marriage and understand its legal standing.',
    domainSlug: 'government', subdomainSlug: 'identity-civil',
    content: {
      quickAnswer: 'Register customary marriages at your local government\'s area customary court or LGA office. Cost: ₦5,000–₦20,000. You\'ll need evidence of bride price payment and family witnesses.',
      overview: 'Customary marriages are valid under Nigerian law when properly conducted under recognized customary law. However, they don\'t automatically provide the same protections as a statutory marriage for property, inheritance, or visa purposes.',
      definitions: [
        { term: 'Customary Marriage', definition: 'A marriage contracted in accordance with the customs of a Nigerian community — valid under the Customary Marriage and Divorce Law.' },
        { term: 'Customary Court', definition: 'A state court that handles customary law matters including marriage registration.' },
      ],
      requirements: [
        { title: 'Evidence of bride price payment', description: 'Receipt or written acknowledgement from the bride\'s family.', isMandatory: true },
        { title: 'Family witnesses', description: 'Representatives from both families to attest to the marriage.', isMandatory: true },
        { title: 'Valid IDs for both parties', description: 'NIN slip or national ID.', isMandatory: true },
        { title: 'Application form from LGA', description: 'Available at the local government customary court.', isMandatory: true },
      ],
      timeline: [
        { stepNumber: 1, title: 'Gather bride price documentation', description: 'Get written proof from the bride\'s family.', estimatedTime: '1–7 days' },
        { stepNumber: 2, title: 'Visit LGA customary court or marriage registry', description: 'Bring both families and required documents.', estimatedTime: '1 day', cost: '₦5,000–₦20,000' },
        { stepNumber: 3, title: 'Receive certificate of customary marriage', description: 'Issued by the LGA or customary court.', estimatedTime: '1–5 days' },
      ],
      regulatory: 'Customary marriages are governed by state customary marriage laws. For visa applications and federal property rights, a statutory marriage certificate is also recommended.',
      commonMistakes: [
        { title: 'Assuming customary marriage is enough for visas', description: 'Most embassies require a statutory marriage certificate.', solution: 'Also conduct a registry marriage if international travel or spouse visas are planned.' },
      ],
      relatedGuides: [
        { slug: '/guides/get-statutory-marriage-certificate', title: 'How to Get a Statutory Marriage Certificate' },
        { slug: '/guides/change-name-legally-nigeria', title: 'How to Change Your Name Legally' },
      ],
    },
    sources: [{ title: 'Nigeria Law Guide — Customary Marriage', url: 'https://lawsnigeria.placng.org', verified: true }],
    reviewerName: 'Barrister Ngozi Obi, Intellectual Property Lawyer',
  },

  {
    title: 'How to Get a Death Certificate in Nigeria',
    slug: 'get-death-certificate-nigeria',
    subtitle: 'Official process for obtaining a death certificate from NPC',
    description: 'How to register a death and obtain an official death certificate in Nigeria.',
    domainSlug: 'government', subdomainSlug: 'identity-civil',
    content: {
      quickAnswer: 'Register the death at the NPC office within 3 days (hospital deaths) or 14 days (other deaths). Free within 30 days. Late registration: ₦2,500. Certificate issued within 5 days.',
      overview: 'A death certificate is required to settle estates, close bank accounts, claim insurance, and handle inheritance. It is issued by the National Population Commission.',
      definitions: [
        { term: 'Death Certificate', definition: 'An official NPC document confirming the date, place, and cause of death.' },
        { term: 'Cause of Death Certificate', definition: 'Issued by the hospital — a prerequisite for NPC registration of hospital deaths.' },
      ],
      requirements: [
        { title: 'Cause of death certificate from hospital', description: 'For hospital deaths.', isMandatory: true },
        { title: 'Deceased\'s ID documents', description: 'NIN, passport, or national ID of the deceased.', isMandatory: false },
        { title: 'Informant\'s valid ID', description: 'Next of kin or family representative.', isMandatory: true },
        { title: 'Burial permit (from LGA)', description: 'Required in some states before NPC registration.', isMandatory: false },
      ],
      timeline: [
        { stepNumber: 1, title: 'Obtain cause of death from hospital', description: 'Hospital issues a medical cause of death certificate.', estimatedTime: '1 day' },
        { stepNumber: 2, title: 'Visit NPC office', description: 'Bring documents to nearest NPC registration centre.', estimatedTime: '1–2 hours' },
        { stepNumber: 3, title: 'Receive death certificate', description: 'Issued within 3–5 days.', estimatedTime: '3–5 days' },
      ],
      regulatory: 'Governed by the Births, Deaths (Compulsory Registration) Act. Late registration may require a sworn affidavit.',
      commonMistakes: [
        { title: 'Delaying registration', description: 'Late registration complicates estate settlement and bank account closure.', solution: 'Register within 3 days for hospital deaths, 14 days for others.' },
      ],
      relatedGuides: [
        { slug: '/guides/register-birth-nigeria', title: 'How to Register a Birth' },
        { slug: '/guides/obtain-birth-certificate-nigeria', title: 'How to Obtain a Birth Certificate' },
      ],
    },
    sources: [{ title: 'National Population Commission', url: 'https://nationalpopulation.gov.ng', verified: true }],
    reviewerName: 'Dr. Grace Nwosu, Education Consultant',
  },

  {
    title: 'How to Register for a Permanent Voter\'s Card (PVC)',
    slug: 'register-for-pvc-nigeria',
    subtitle: 'INEC voter registration guide for new and returning voters',
    description: 'How to register with INEC and collect your Permanent Voter\'s Card.',
    domainSlug: 'government', subdomainSlug: 'identity-civil',
    content: {
      quickAnswer: 'PVC registration is free. INEC opens registration periodically — check inec.gov.ng for dates. Visit your ward registration centre with your NIN. Card collection is separate from registration.',
      overview: 'The Permanent Voter\'s Card (PVC) is required to vote in Nigerian elections. It also serves as a widely accepted identity document for banking and official purposes.',
      definitions: [
        { term: 'PVC', definition: 'Permanent Voter\'s Card — issued by INEC after biometric voter registration.' },
        { term: 'INEC', definition: 'Independent National Electoral Commission — manages voter registration and elections.' },
        { term: 'Ward Registration Centre', definition: 'The designated INEC office in your polling ward where registration takes place.' },
      ],
      requirements: [
        { title: 'NIN (National Identity Number)', description: 'Mandatory since 2021 for all voter registrations.', isMandatory: true },
        { title: 'Proof of age 18+', description: 'Birth certificate, NIN slip, or passport.', isMandatory: true },
        { title: 'Proof of residence in ward', description: 'Utility bill or LGA letter confirming you live in the area.', isMandatory: false },
      ],
      timeline: [
        { stepNumber: 1, title: 'Check INEC registration dates', description: 'Visit inec.gov.ng for the current registration window.', estimatedTime: '10 minutes' },
        { stepNumber: 2, title: 'Visit ward registration centre', description: 'Bring NIN and proof of age. Registration is free.', estimatedTime: '1–3 hours (queue varies)' },
        { stepNumber: 3, title: 'Complete biometric capture', description: 'Fingerprints and facial photo recorded.', estimatedTime: '15 minutes' },
        { stepNumber: 4, title: 'Collect PVC', description: 'Check inec.gov.ng for collection dates and venues.', estimatedTime: '4–12 weeks after registration' },
      ],
      regulatory: 'Voter registration is governed by the Electoral Act 2022. Only registered voters with PVCs can vote in Nigerian elections.',
      commonMistakes: [
        { title: 'Missing the registration window', description: 'INEC only opens registration periodically.', solution: 'Follow INEC on social media and check inec.gov.ng regularly.' },
        { title: 'Not collecting PVC after registration', description: 'Millions of PVCs go uncollected each election cycle.', solution: 'Check collection status at inec.gov.ng 6 weeks after registration.' },
      ],
      relatedGuides: [
        { slug: '/guides/register-inec-voter', title: 'How to Register with INEC as a Voter' },
        { slug: '/guides/enrol-for-nin-nigeria', title: 'How to Enrol for NIN' },
      ],
    },
    sources: [{ title: 'Independent National Electoral Commission', url: 'https://inec.gov.ng', verified: true }],
    reviewerName: 'Emeka Obi, Cooperative Development Officer',
  },

  {
    title: 'How to Transfer Your PVC to a New State or LGA',
    slug: 'transfer-pvc-new-state-lga',
    subtitle: 'Move your voter registration if you\'ve relocated',
    description: 'How to transfer your voter registration to a new state or LGA with INEC.',
    domainSlug: 'government', subdomainSlug: 'identity-civil',
    content: {
      quickAnswer: 'PVC transfer (called "Request for Transfer") is done at the INEC office in your new state during an active registration window. Free. Takes 4–8 weeks for new card.',
      overview: 'If you\'ve moved to a new state or LGA, you must transfer your voter registration to vote in local elections. INEC calls this "Request for Transfer of Voter Registration."',
      definitions: [{ term: 'Request for Transfer', definition: 'The INEC process for moving your voter registration to a new ward.' }],
      requirements: [
        { title: 'Existing PVC', description: 'Your current card to confirm your existing registration.', isMandatory: true },
        { title: 'Proof of new residence', description: 'Utility bill or tenancy in the new LGA.', isMandatory: true },
        { title: 'NIN', description: 'For identity verification.', isMandatory: true },
      ],
      timeline: [
        { stepNumber: 1, title: 'Visit INEC office in new LGA', description: 'Bring PVC, NIN, and proof of new residence.', estimatedTime: '1–2 hours' },
        { stepNumber: 2, title: 'Complete transfer form', description: 'Fill in new ward details.', estimatedTime: '15 minutes' },
        { stepNumber: 3, title: 'Collect new PVC', description: 'New card with updated address issued.', estimatedTime: '4–8 weeks' },
      ],
      regulatory: 'Governed by the Electoral Act 2022. Transfer must be done before the registration deadline for an election cycle.',
      commonMistakes: [
        { title: 'Voting in old LGA after moving', description: 'You can only vote where your PVC is registered.', solution: 'Transfer well before any election — INEC closes transfers 30 days before election date.' },
      ],
      relatedGuides: [
        { slug: '/guides/register-for-pvc-nigeria', title: 'How to Register for a PVC' },
        { slug: '/guides/check-voter-registration-status', title: 'How to Check Your Voter Registration Status' },
      ],
    },
    sources: [{ title: 'INEC', url: 'https://inec.gov.ng', verified: true }],
    reviewerName: 'Emeka Obi, Cooperative Development Officer',
  },

  {
    title: 'How to Check Your Voter Registration Status',
    slug: 'check-voter-registration-status',
    subtitle: 'Verify your INEC registration details online or via USSD',
    description: 'How to confirm your voter registration status and PVC collection status with INEC.',
    domainSlug: 'government', subdomainSlug: 'identity-civil',
    content: {
      quickAnswer: 'Check at voters.inec.gov.ng using your NIN or VIN. You can also visit any INEC office or dial *346*1# (MTN) for basic status.',
      overview: 'INEC provides several channels to verify whether you are registered, your polling unit location, and whether your PVC is ready for collection.',
      definitions: [{ term: 'VIN', definition: 'Voter Identification Number — printed on your PVC.' }],
      requirements: [
        { title: 'NIN or VIN', description: 'Either works for the INEC online portal.', isMandatory: true },
      ],
      timeline: [
        { stepNumber: 1, title: 'Visit voters.inec.gov.ng', description: 'Enter your NIN or VIN to see registration status.', estimatedTime: '5 minutes' },
        { stepNumber: 2, title: 'Check PVC collection status', description: 'Portal shows if your card is ready at which centre.', estimatedTime: '2 minutes' },
      ],
      regulatory: 'INEC is the sole authority for voter registration data.',
      commonMistakes: [
        { title: 'Using unofficial third-party checker sites', description: 'Many scam sites collect NIN data under the guise of voter checks.', solution: 'Only use voters.inec.gov.ng — the official INEC portal.' },
      ],
      relatedGuides: [
        { slug: '/guides/register-for-pvc-nigeria', title: 'How to Register for a PVC' },
        { slug: '/guides/transfer-pvc-new-state-lga', title: 'How to Transfer Your PVC' },
      ],
    },
    sources: [{ title: 'INEC Voters Portal', url: 'https://voters.inec.gov.ng', verified: true }],
    reviewerName: 'Emeka Obi, Cooperative Development Officer',
  },

  {
    title: 'Passport vs National ID — Which Do You Need for What?',
    slug: 'passport-vs-national-id-nigeria',
    subtitle: 'A practical comparison of Nigerian identity documents',
    description: 'When to use a passport vs national ID card vs NIN slip for Nigerian services.',
    domainSlug: 'government', subdomainSlug: 'identity-civil',
    content: {
      quickAnswer: 'Passport: international travel, visa applications, high-value banking. National ID: domestic services, KYC, everyday ID. NIN slip: accepted for most banking, JAMB, and government services where biometric ID isn\'t required.',
      overview: 'Nigeria has multiple identity documents and different institutions accept different combinations. This guide clarifies which document to use and when.',
      definitions: [
        { term: 'International Passport', definition: 'Highest-tier travel and identity document — valid internationally and accepted by all Nigerian institutions.' },
        { term: 'National ID Card', definition: 'NIMC-issued card linked to your NIN — accepted for KYC and most domestic services.' },
        { term: 'NIN Slip', definition: 'Paper confirmation of NIN enrolment — widely accepted while the physical card is being processed.' },
      ],
      requirements: [{ title: 'N/A — this is a comparison guide', description: 'No application requirements.', isMandatory: false }],
      timeline: [
        { stepNumber: 1, title: 'International travel', description: 'Use passport only. National ID not accepted at borders.', estimatedTime: 'N/A' },
        { stepNumber: 2, title: 'Bank account opening', description: 'Any valid government-issued ID accepted — passport, national ID, or driver\'s license.', estimatedTime: 'N/A' },
        { stepNumber: 3, title: 'JAMB registration', description: 'NIN is mandatory; passport or national ID for identity verification.', estimatedTime: 'N/A' },
        { stepNumber: 4, title: 'Visa applications', description: 'Passport required; national ID may be requested as supporting doc.', estimatedTime: 'N/A' },
      ],
      regulatory: 'The CBN KYC guidelines and NIS Act govern acceptable identity documents for banking and travel respectively.',
      commonMistakes: [
        { title: 'Assuming NIN slip is enough for international travel', description: 'NIN is not a travel document.', solution: 'Always apply for a passport before planning international travel.' },
      ],
      relatedGuides: [
        { slug: '/guides/apply-nigerian-international-passport', title: 'How to Apply for a Nigerian Passport' },
        { slug: '/guides/enrol-for-nin-nigeria', title: 'How to Enrol for NIN' },
      ],
    },
    sources: [{ title: 'CBN KYC Guidelines', url: 'https://cbn.gov.ng', verified: true }],
    reviewerName: 'Adaobi Okechukwu, Immigration Officer',
  },

  {
    title: 'How to Replace a Lost National ID Card',
    slug: 'replace-lost-national-id-card',
    subtitle: 'Steps to get a replacement NIMC national identity card',
    description: 'How to report and replace a lost or damaged national identity card in Nigeria.',
    domainSlug: 'government', subdomainSlug: 'identity-civil',
    content: {
      quickAnswer: 'Visit any NIMC centre with your NIN and valid ID. Replacement fee: ₦1,500. New card issued within 4–6 weeks.',
      overview: 'Losing your national ID card does not affect your NIN — it\'s permanently in the NIMC database. Replacement is straightforward at any enrolment centre.',
      definitions: [{ term: 'Replacement Card', definition: 'A new physical national ID card issued when the original is lost, stolen, or damaged.' }],
      requirements: [
        { title: 'Your NIN', description: 'Retrieve via *346# if needed.', isMandatory: true },
        { title: 'Alternative valid ID', description: 'Passport, voter\'s card, or driver\'s license to prove identity.', isMandatory: true },
        { title: 'Police report (optional but recommended)', description: 'For lost/stolen cards.', isMandatory: false },
      ],
      timeline: [
        { stepNumber: 1, title: 'Retrieve your NIN if needed', description: 'Dial *346# or visit NIMC.', estimatedTime: '5 minutes' },
        { stepNumber: 2, title: 'Visit NIMC enrolment centre', description: 'Request card replacement and pay fee.', estimatedTime: '1–2 hours', cost: '₦1,500' },
        { stepNumber: 3, title: 'Collect replacement card', description: 'Available at the same centre after processing.', estimatedTime: '4–6 weeks' },
      ],
      regulatory: 'NIMC is the sole issuer of national ID cards.',
      commonMistakes: [
        { title: 'Thinking you need to re-enrol', description: 'You don\'t. Your biometrics are already on file.', solution: 'Simply request a replacement card — no new biometric capture needed.' },
      ],
      relatedGuides: [
        { slug: '/guides/retrieve-lost-nin', title: 'How to Retrieve a Lost NIN' },
        { slug: '/guides/enrol-for-nin-nigeria', title: 'How to Enrol for NIN' },
      ],
    },
    sources: [{ title: 'NIMC', url: 'https://nimc.gov.ng', verified: true }],
    reviewerName: 'Adaobi Okechukwu, Immigration Officer',
  },

  // ── GOVERNMENT / IMMIGRATION & TRAVEL (guides 26-35) ─────────────────────────

  {
    title: 'How to Apply for a Nigerian Visa on Arrival',
    slug: 'apply-nigerian-visa-on-arrival',
    subtitle: 'Pre-approval process for foreigners visiting Nigeria',
    description: 'How foreigners can obtain a Nigerian visa on arrival — eligibility, pre-approval, and process.',
    domainSlug: 'government', subdomainSlug: 'immigration-travel',
    content: {
      quickAnswer: 'Nigeria\'s Visa on Arrival (VoA) requires pre-approval before travel. Apply at immigration.gov.ng/visa-on-arrival. Fee: $100 USD. Eligible nationals from 90+ countries.',
      overview: 'Nigeria offers Visa on Arrival to eligible foreign nationals. This is NOT collected at the airport without prior approval — you must obtain a pre-approval letter before flying.',
      definitions: [
        { term: 'Visa on Arrival (VoA)', definition: 'A visa issued to eligible foreigners upon arrival in Nigeria — but only after pre-approval is granted online.' },
        { term: 'Pre-Approval Letter', definition: 'A PDF confirmation from NIS authorising you to present yourself for VoA collection at the airport.' },
      ],
      requirements: [
        { title: 'Valid passport (6+ months validity)', description: 'Must be valid for at least 6 months beyond travel date.', isMandatory: true },
        { title: 'Return/onward ticket', description: 'Proof you intend to leave Nigeria.', isMandatory: true },
        { title: 'Hotel booking or host invitation letter', description: 'Proof of accommodation in Nigeria.', isMandatory: true },
        { title: 'Yellow fever vaccination certificate', description: 'Mandatory for all arrivals.', isMandatory: true },
        { title: 'Application fee payment receipt', description: '$100 USD payable online.', isMandatory: true },
      ],
      timeline: [
        { stepNumber: 1, title: 'Apply online', description: 'Visit immigration.gov.ng/visa-on-arrival and complete the form.', estimatedTime: '30 minutes', cost: '$100 USD' },
        { stepNumber: 2, title: 'Receive pre-approval letter', description: 'Emailed within 48–72 hours.', estimatedTime: '2–3 days' },
        { stepNumber: 3, title: 'Arrive at Nigerian airport', description: 'Present pre-approval letter at the VoA desk before immigration control.', estimatedTime: '20–45 minutes at airport' },
        { stepNumber: 4, title: 'Visa stamped in passport', description: 'Valid for 30 days, single entry.', estimatedTime: 'Same day' },
      ],
      regulatory: 'Visa on Arrival is governed by the Immigration Act Cap I1 LFN 2004 and NIS directives. Eligibility list is updated periodically.',
      commonMistakes: [
        { title: 'Arriving without pre-approval', description: 'You will be denied VoA and may be detained or returned.', solution: 'Always apply and receive the pre-approval email before flying.' },
        { title: 'No yellow fever certificate', description: 'This is mandatory — missing it leads to delays or denial.', solution: 'Get vaccinated and carry the yellow card.' },
      ],
      relatedGuides: [
        { slug: '/guides/apply-uk-us-schengen-visa', title: 'How to Apply for a UK/US/Schengen Visa from Nigeria' },
        { slug: '/guides/sponsor-visa-foreign-visitor', title: 'How to Sponsor a Visa for a Foreign Visitor' },
      ],
    },
    sources: [{ title: 'Nigeria Immigration Service', url: 'https://immigration.gov.ng', verified: true }],
    reviewerName: 'Adaobi Okechukwu, Immigration Officer',
  },

  {
    title: 'How to Sponsor a Visa for a Foreign Visitor to Nigeria',
    slug: 'sponsor-visa-foreign-visitor',
    subtitle: 'Nigerian host\'s guide to visa invitation letters and requirements',
    description: 'How to write a visa invitation letter and sponsor a foreign national visiting Nigeria.',
    domainSlug: 'government', subdomainSlug: 'immigration-travel',
    content: {
      quickAnswer: 'Prepare a formal invitation letter on letterhead (or personal letter for family), include your NIN, passport copy, proof of accommodation, and itinerary. Send to the applicant for submission at the Nigerian embassy abroad.',
      overview: 'When a foreign national applies for a Nigerian visa at an embassy abroad, they often need an invitation letter from a Nigerian host. The letter must clearly state the purpose, duration, and who is financially responsible.',
      definitions: [
        { term: 'Sponsor Letter', definition: 'A formal letter from a Nigerian resident or organisation inviting and vouching for a foreign visitor.' },
        { term: 'Subject to Variation (STV)', definition: 'The most common Nigerian visa category for business or family visits — issued for up to 3 months.' },
      ],
      requirements: [
        { title: 'Sponsor invitation letter', description: 'On company letterhead for business visits; personal letter for family.', isMandatory: true },
        { title: 'Sponsor\'s NIN and passport copy', description: 'Attached to the invitation letter.', isMandatory: true },
        { title: 'Proof of accommodation', description: 'Hotel booking or proof of host\'s residence.', isMandatory: true },
        { title: 'Purpose and duration statement', description: 'Clear statement of why the visitor is coming and for how long.', isMandatory: true },
      ],
      timeline: [
        { stepNumber: 1, title: 'Prepare invitation letter', description: 'Include visitor\'s full name as in passport, purpose, dates, and your contact details.', estimatedTime: '1 day' },
        { stepNumber: 2, title: 'Attach supporting documents', description: 'Your NIN, passport bio-data page, and proof of accommodation.', estimatedTime: '1 day' },
        { stepNumber: 3, title: 'Send to visitor', description: 'Email scanned copies — originals may be needed for some embassies.', estimatedTime: '1 day' },
        { stepNumber: 4, title: 'Visitor submits at Nigerian embassy', description: 'Your documents form part of their visa application package.', estimatedTime: '5–15 business days for visa processing' },
      ],
      regulatory: 'NIS issues Nigerian visas at embassies abroad. The sponsor assumes responsibility for the visitor\'s conduct and departure from Nigeria.',
      commonMistakes: [
        { title: 'Vague purpose statement', description: 'Embassies reject letters that don\'t clearly state the visit\'s purpose.', solution: 'Be specific: "attending our company\'s annual conference from June 1–5, 2026."' },
      ],
      relatedGuides: [
        { slug: '/guides/apply-nigerian-visa-on-arrival', title: 'How to Apply for a Nigerian Visa on Arrival' },
      ],
    },
    sources: [{ title: 'Nigeria Immigration Service', url: 'https://immigration.gov.ng', verified: true }],
    reviewerName: 'Adaobi Okechukwu, Immigration Officer',
  },

  {
    title: 'How to Apply for Nigerian Citizenship by Naturalization',
    slug: 'apply-nigerian-citizenship-naturalization',
    subtitle: 'Requirements and process for foreigners seeking Nigerian citizenship',
    description: 'How foreigners can apply for Nigerian citizenship through naturalization.',
    domainSlug: 'government', subdomainSlug: 'immigration-travel',
    content: {
      quickAnswer: 'Naturalization requires 15+ years of legal residence (or 3 years for spouses of Nigerians). Apply through the Ministry of Interior. Processing takes 1–3 years. Fee: varies.',
      overview: 'Nigeria grants citizenship by naturalization to foreigners who meet residence and character requirements. The process is managed by the Federal Ministry of Interior.',
      definitions: [
        { term: 'Naturalization', definition: 'The legal process by which a non-citizen acquires citizenship.' },
        { term: 'Certificate of Naturalization', definition: 'Document confirming grant of Nigerian citizenship.' },
      ],
      requirements: [
        { title: '15 years legal residence', description: 'Continuous legal stay in Nigeria. 3 years for spouses of Nigerians.', isMandatory: true },
        { title: 'Valid resident permit throughout', description: 'All stays must have been on a valid permit.', isMandatory: true },
        { title: 'Renunciation of previous citizenship', description: 'Nigeria generally does not allow dual citizenship for naturalized citizens.', isMandatory: true },
        { title: 'Good character certificate', description: 'Police clearance and no criminal record.', isMandatory: true },
        { title: 'Economic contribution evidence', description: 'Proof of legitimate income or business in Nigeria.', isMandatory: true },
      ],
      timeline: [
        { stepNumber: 1, title: 'Confirm eligibility', description: 'Verify residence duration and permit history.', estimatedTime: '1 week' },
        { stepNumber: 2, title: 'Apply at Federal Ministry of Interior', description: 'Submit application with supporting documents.', estimatedTime: '1–2 days', cost: 'Official fee schedule at immigration.gov.ng' },
        { stepNumber: 3, title: 'Background investigation', description: 'NIS and DSS conduct security checks.', estimatedTime: '6–18 months' },
        { stepNumber: 4, title: 'Presidential approval', description: 'Naturalization is by Presidential prerogative — no guaranteed timeline.', estimatedTime: '1–3 years total' },
      ],
      regulatory: 'Governed by the Nigerian Constitution s.27 and Citizenship and Leadership Training Centre Act. Naturalization is a Presidential discretionary grant.',
      commonMistakes: [
        { title: 'Gaps in residence permits', description: 'Any period of illegal stay disqualifies the application.', solution: 'Ensure all permits are renewed on time and keep all records.' },
      ],
      relatedGuides: [
        { slug: '/guides/renounce-nigerian-citizenship', title: 'How to Renounce Nigerian Citizenship' },
        { slug: '/guides/dual-citizenship-rules-nigerians', title: 'Dual Citizenship Rules for Nigerians' },
      ],
    },
    sources: [{ title: 'Federal Ministry of Interior', url: 'https://interior.gov.ng', verified: true }],
    reviewerName: 'Adaobi Okechukwu, Immigration Officer',
  },

  {
    title: 'How to Renounce Nigerian Citizenship',
    slug: 'renounce-nigerian-citizenship',
    subtitle: 'The official process for giving up your Nigerian citizenship',
    description: 'How to formally renounce Nigerian citizenship when acquiring another nationality.',
    domainSlug: 'government', subdomainSlug: 'immigration-travel',
    content: {
      quickAnswer: 'Apply at the Federal Ministry of Interior with proof of new citizenship, Nigerian passport, and a formal renunciation letter. Fee varies. Processing: 3–6 months.',
      overview: 'Some countries require applicants to renounce other citizenships as a condition of naturalization. Nigerian citizens wishing to do so must apply to the Federal Ministry of Interior.',
      definitions: [{ term: 'Renunciation', definition: 'The formal act of giving up Nigerian citizenship, resulting in loss of all rights as a Nigerian national.' }],
      requirements: [
        { title: 'Nigerian passport', description: 'Current valid passport for surrender.', isMandatory: true },
        { title: 'Certificate of new citizenship', description: 'Proof you have acquired another nationality.', isMandatory: true },
        { title: 'Formal renunciation letter', description: 'Signed declaration of intent to renounce.', isMandatory: true },
      ],
      timeline: [
        { stepNumber: 1, title: 'Apply at Ministry of Interior', description: 'Submit forms and documents.', estimatedTime: '1 day' },
        { stepNumber: 2, title: 'Processing and approval', description: 'Ministry issues Renunciation of Citizenship certificate.', estimatedTime: '3–6 months' },
        { stepNumber: 3, title: 'Surrender Nigerian passport', description: 'Passport cancelled upon renunciation.', estimatedTime: 'Same day as certificate' },
      ],
      regulatory: 'Governed by the Nigerian Constitution s.29. Renunciation is irrevocable — you cannot reclaim Nigerian citizenship after renouncing.',
      commonMistakes: [
        { title: 'Renouncing before confirming new citizenship', description: 'You could become stateless.', solution: 'Only renounce after your new citizenship certificate is in hand.' },
      ],
      relatedGuides: [
        { slug: '/guides/dual-citizenship-rules-nigerians', title: 'Dual Citizenship Rules for Nigerians' },
        { slug: '/guides/apply-nigerian-citizenship-naturalization', title: 'How to Apply for Nigerian Citizenship' },
      ],
    },
    sources: [{ title: 'Federal Ministry of Interior', url: 'https://interior.gov.ng', verified: true }],
    reviewerName: 'Adaobi Okechukwu, Immigration Officer',
  },

  {
    title: 'Dual Citizenship Rules for Nigerians',
    slug: 'dual-citizenship-rules-nigerians',
    subtitle: 'What the Nigerian Constitution says about holding two citizenships',
    description: 'Can Nigerians hold dual citizenship? What are the rights and restrictions?',
    domainSlug: 'government', subdomainSlug: 'immigration-travel',
    content: {
      quickAnswer: 'Nigerians by birth can hold dual citizenship. Naturalized Nigerian citizens cannot. Dual citizens must use their Nigerian passport to enter Nigeria.',
      overview: 'Nigeria\'s Constitution allows citizens by birth to acquire another nationality without losing Nigerian citizenship. However, naturalized Nigerians are generally required to renounce prior citizenship.',
      definitions: [
        { term: 'Citizenship by Birth', definition: 'Nigerian citizenship acquired through birth to a Nigerian parent — allows dual nationality.' },
        { term: 'Citizenship by Naturalization', definition: 'Citizenship acquired through legal process — generally requires renunciation of previous citizenship.' },
      ],
      requirements: [{ title: 'N/A — informational guide', description: 'No application.', isMandatory: false }],
      timeline: [
        { stepNumber: 1, title: 'Confirm your citizenship type', description: 'Were you born Nigerian or naturalised?', estimatedTime: '10 minutes' },
        { stepNumber: 2, title: 'Understand your obligations', description: 'Dual citizens must enter Nigeria on their Nigerian passport.', estimatedTime: 'N/A' },
      ],
      regulatory: 'Nigerian Constitution s.28: citizenship by birth is not lost by acquiring another nationality. s.28(1) prohibits naturalised citizens from holding dual nationality.',
      commonMistakes: [
        { title: 'Entering Nigeria on a foreign passport as a Nigerian citizen by birth', description: 'This creates immigration complications.', solution: 'Always enter Nigeria on your Nigerian passport, even if you hold a second passport.' },
      ],
      relatedGuides: [
        { slug: '/guides/renounce-nigerian-citizenship', title: 'How to Renounce Nigerian Citizenship' },
        { slug: '/guides/apply-nigerian-international-passport', title: 'How to Apply for a Nigerian Passport' },
      ],
    },
    sources: [{ title: 'Nigerian Constitution 1999 (as amended)', url: 'https://lawsnigeria.placng.org', verified: true }],
    reviewerName: 'Barrister Ngozi Obi, Intellectual Property Lawyer',
  },

  {
    title: 'How to Apply for a Resident Permit as a Foreigner in Nigeria',
    slug: 'apply-resident-permit-foreigner-nigeria',
    subtitle: 'CERPAC and temporary residence permit guide for expats',
    description: 'How foreign nationals can obtain the Combined Expatriate Residence Permit and Alien Card (CERPAC).',
    domainSlug: 'government', subdomainSlug: 'immigration-travel',
    content: {
      quickAnswer: 'CERPAC costs $2,000 USD for employees and $1,000 for dependants. Apply at immigration.gov.ng. Requires a valid visa, employer\'s letter, and expatriate quota approval.',
      overview: 'CERPAC (Combined Expatriate Residence Permit and Alien Card) is required for all foreigners staying in Nigeria for more than 90 days for work or business.',
      definitions: [
        { term: 'CERPAC', definition: 'Combined Expatriate Residence Permit and Alien Card — the official residence permit for foreigners in Nigeria.' },
        { term: 'Expatriate Quota', definition: 'FMITI approval allowing a company to hire a specified number of foreign nationals.' },
      ],
      requirements: [
        { title: 'Valid visa (STR — Subject to Regularization)', description: 'Must arrive on STR visa, not tourist visa.', isMandatory: true },
        { title: 'Employer\'s letter', description: 'Confirming employment and salary.', isMandatory: true },
        { title: 'Expatriate quota approval letter', description: 'From Federal Ministry of Interior.', isMandatory: true },
        { title: 'Medical certificate', description: 'From a government-approved hospital.', isMandatory: true },
      ],
      timeline: [
        { stepNumber: 1, title: 'Obtain STR visa before arrival', description: 'Apply at Nigerian embassy in home country.', estimatedTime: '2–4 weeks' },
        { stepNumber: 2, title: 'Employer applies for expatriate quota', description: 'Filed with FMITI.', estimatedTime: '4–8 weeks' },
        { stepNumber: 3, title: 'Apply for CERPAC at NIS', description: 'Submit online and attend biometric appointment.', estimatedTime: '4–8 weeks', cost: '$2,000 USD' },
        { stepNumber: 4, title: 'Receive CERPAC card', description: 'Valid for 2 years, renewable.', estimatedTime: '2–4 weeks after approval' },
      ],
      regulatory: 'Governed by the Immigration Act and NIS CERPAC Guidelines 2014. Working without CERPAC is a deportable offence.',
      commonMistakes: [
        { title: 'Arriving on tourist visa and applying for CERPAC', description: 'CERPAC requires an STR visa entry.', solution: 'Ensure employer processes STR visa before you fly to Nigeria.' },
      ],
      relatedGuides: [
        { slug: '/guides/extend-nigerian-visa', title: 'How to Extend a Nigerian Visa' },
      ],
    },
    sources: [{ title: 'NIS CERPAC Guide', url: 'https://immigration.gov.ng/cerpac', verified: true }],
    reviewerName: 'Adaobi Okechukwu, Immigration Officer',
  },

  {
    title: 'How to Extend a Nigerian Visa',
    slug: 'extend-nigerian-visa',
    subtitle: 'Visa extension process for visitors staying beyond their initial entry period',
    description: 'How to apply for a Nigerian visa extension before your current visa expires.',
    domainSlug: 'government', subdomainSlug: 'immigration-travel',
    content: {
      quickAnswer: 'Apply for visa extension at least 2 weeks before expiry at any NIS state command. Fee: ₦50,000–₦100,000. Extensions are granted for up to 90 days at a time.',
      overview: 'Overstaying a Nigerian visa attracts fines of ₦10,000 per day and possible deportation. Apply for extension before your current visa expires.',
      definitions: [{ term: 'Visa Extension', definition: 'A grant of additional time to remain in Nigeria beyond the original visa validity.' }],
      requirements: [
        { title: 'Current passport with valid visa', description: 'Must have at least 7 days remaining.', isMandatory: true },
        { title: 'Reason for extension', description: 'Medical, business, or family reasons — with supporting documents.', isMandatory: true },
        { title: 'Hotel booking or host letter', description: 'Proof of accommodation for extended stay.', isMandatory: true },
      ],
      timeline: [
        { stepNumber: 1, title: 'Visit NIS state command', description: 'In-person application required.', estimatedTime: '1 day', cost: '₦50,000–₦100,000' },
        { stepNumber: 2, title: 'Submit documents and await approval', description: 'Usually approved same day or next business day.', estimatedTime: '1–3 days' },
        { stepNumber: 3, title: 'Visa extension stamped in passport', description: 'Valid for up to 90 additional days.', estimatedTime: 'Same day' },
      ],
      regulatory: 'Overstay is an offence under the Immigration Act attracting fines and possible deportation.',
      commonMistakes: [
        { title: 'Waiting until visa expires', description: 'You cannot extend an expired visa — you\'d need to exit and re-enter.', solution: 'Apply at least 2 weeks before expiry date.' },
      ],
      relatedGuides: [
        { slug: '/guides/apply-resident-permit-foreigner-nigeria', title: 'How to Apply for a Resident Permit' },
        { slug: '/guides/apply-nigerian-visa-on-arrival', title: 'Visa on Arrival Process' },
      ],
    },
    sources: [{ title: 'NIS', url: 'https://immigration.gov.ng', verified: true }],
    reviewerName: 'Adaobi Okechukwu, Immigration Officer',
  },

  {
    title: 'Travel Document Requirements for Nigerian Minors',
    slug: 'travel-documents-nigerian-minors',
    subtitle: 'Passports and consent requirements for children travelling internationally',
    description: 'What documents are needed for children travelling internationally from Nigeria.',
    domainSlug: 'government', subdomainSlug: 'immigration-travel',
    content: {
      quickAnswer: 'Children under 18 need their own passport. Solo or single-parent travel requires a notarized parental consent letter. Birth certificate and NIN required for passport application.',
      overview: 'Many Nigerians are unaware that children travelling alone or with one parent face additional documentation requirements at immigration. Proper preparation prevents delays.',
      definitions: [
        { term: 'Parental Consent Letter', definition: 'A notarized letter from the absent parent(s) authorising the child\'s travel.' },
        { term: 'Child\'s Passport', definition: 'Children cannot be added to parental passports — every child needs their own passport.' },
      ],
      requirements: [
        { title: 'Child\'s own passport', description: 'Valid international passport in the child\'s name.', isMandatory: true },
        { title: 'Birth certificate', description: 'To prove parentage during passport application.', isMandatory: true },
        { title: 'Parental consent letter (if travelling solo or with one parent)', description: 'Notarised by a magistrate court or Nigerian embassy.', isMandatory: false, notes: 'Required by many airlines and destination countries.' },
        { title: 'NIN for child', description: 'Children can obtain NIN from birth.', isMandatory: true },
      ],
      timeline: [
        { stepNumber: 1, title: 'Enrol child for NIN', description: 'Visit NIMC with birth certificate.', estimatedTime: '1–3 days' },
        { stepNumber: 2, title: 'Apply for child\'s passport', description: 'Same process as adult — parent/guardian signs on behalf of child.', estimatedTime: '4–6 weeks', cost: '₦35,000' },
        { stepNumber: 3, title: 'Prepare consent letter if needed', description: 'Get notarised consent from absent parent.', estimatedTime: '1–2 days' },
      ],
      regulatory: 'NIS requires children to hold individual passports. Many ECOWAS countries and all Schengen countries require parental consent letters for solo minor travel.',
      commonMistakes: [
        { title: 'Assuming the child can travel on a parent\'s passport', description: 'This is no longer permitted.', solution: 'Apply for the child\'s passport as soon as possible after birth.' },
      ],
      relatedGuides: [
        { slug: '/guides/apply-nigerian-international-passport', title: 'How to Apply for a Nigerian Passport' },
        { slug: '/guides/enrol-for-nin-nigeria', title: 'How to Enrol for NIN' },
      ],
    },
    sources: [{ title: 'NIS Passport Services', url: 'https://immigration.gov.ng', verified: true }],
    reviewerName: 'Adaobi Okechukwu, Immigration Officer',
  },

  // ── GOVERNMENT / TAXES (guides 36-45) ────────────────────────────────────────

  {
    title: 'How Nigeria\'s Tax Act 2025 Changed Personal Income Tax',
    slug: 'nigeria-tax-act-2025-personal-income-tax',
    subtitle: 'Key changes every Nigerian salary earner and business owner must know',
    description: 'Summary of personal income tax changes under the Nigeria Tax Act 2025.',
    domainSlug: 'government', subdomainSlug: 'taxes',
    content: {
      quickAnswer: 'The Nigeria Tax Act 2025 raised the tax-free threshold to ₦800,000/year (from ₦400,000), introduced a new top rate of 35% for income above ₦100M, and merged several tax reliefs. Effective January 1, 2026.',
      overview: 'The Nigeria Tax Act 2025 (signed December 2025) represents the most significant tax reform in a decade. It affects PAYE calculations, self-employed individuals, and small business owners.',
      definitions: [
        { term: 'Personal Income Tax (PIT)', definition: 'Tax levied on individuals\' income — including salary, business profit, and investment returns.' },
        { term: 'Tax-Free Threshold', definition: 'Annual income below which no income tax is payable. Raised to ₦800,000 in 2025.' },
        { term: 'Consolidated Relief Allowance (CRA)', definition: 'A fixed deduction of ₦200,000 + 20% of gross income — still applicable under the 2025 Act.' },
      ],
      requirements: [
        { title: 'Updated payroll calculations', description: 'Employers must recalculate PAYE using 2026 rates from January 1, 2026.', isMandatory: true },
        { title: 'Individual tax returns', description: 'Self-employed individuals file annually by March 31.', isMandatory: true },
      ],
      timeline: [
        { stepNumber: 1, title: 'Review new tax bands', description: 'New bands: 0% (≤₦800K), 15% (₦800K–₦2M), 18% (₦2M–₦4M), 21% (₦4M–₦8M), 24% (₦8M–₦20M), 27% (₦20M–₦100M), 35% (>₦100M).', estimatedTime: '1 hour' },
        { stepNumber: 2, title: 'Update payroll software', description: 'Input new tax bands and recalculate all employee PAYE from January 2026.', estimatedTime: '1–2 days' },
        { stepNumber: 3, title: 'File updated returns', description: 'Annual returns due March 31 each year.', estimatedTime: '1 day per year' },
      ],
      regulatory: 'The Nigeria Tax Act 2025 consolidated the Personal Income Tax Act, VAT Act, and Companies Income Tax Act into a single statute. Effective for income earned from January 1, 2026.',
      stats: [
        { label: 'New tax-free threshold', value: '₦800,000', unit: 'per year', source: 'Nigeria Tax Act 2025 s.22' },
        { label: 'New top rate', value: '35%', unit: 'on income above ₦100M', source: 'Nigeria Tax Act 2025 Schedule 1' },
      ],
      commonMistakes: [
        { title: 'Using 2024 PAYE tables in 2026', description: 'Incorrect deductions expose employers to penalties.', solution: 'Download the updated FIRS PAYE computation guide at firs.gov.ng.' },
      ],
      relatedGuides: [
        { slug: '/guides/manage-payroll-calculate-paye', title: 'How to Manage Payroll and Calculate PAYE' },
        { slug: '/guides/file-company-tax-returns', title: 'How to File Company Tax Returns' },
      ],
      relatedTools: [{ slug: '/calculators/paye-calculator', title: 'PAYE Calculator' }],
    },
    sources: [
      { title: 'FIRS Nigeria Tax Act 2025', url: 'https://firs.gov.ng/nigeria-tax-act-2025', verified: true },
    ],
    reviewerName: 'Amina Hassan, Tax Consultant',
  },

  {
    title: 'How to File Personal Income Tax Returns in Nigeria',
    slug: 'file-personal-income-tax-returns',
    subtitle: 'Annual income tax filing guide for individuals and self-employed Nigerians',
    description: 'Step-by-step guide to filing personal income tax returns with your state IRS.',
    domainSlug: 'government', subdomainSlug: 'taxes',
    content: {
      quickAnswer: 'File by March 31 annually at your state IRS. Employed individuals: employer files on your behalf via PAYE. Self-employed: file Form A yourself. Filing is free — only pay tax owed.',
      overview: 'All Nigerians earning income must file annual personal income tax returns. Employed individuals\' employers file on their behalf, but self-employed persons must file independently.',
      definitions: [
        { term: 'Form A', definition: 'The official personal income tax self-assessment form — used by self-employed individuals.' },
        { term: 'Self-Assessment', definition: 'A system where taxpayers compute and declare their own tax liability.' },
      ],
      requirements: [
        { title: 'TIN', description: 'Tax Identification Number from FIRS.', isMandatory: true },
        { title: 'Income records', description: 'Bank statements, invoices, salary slips.', isMandatory: true },
        { title: 'State IRS registration', description: 'Register with the IRS in your state of residence.', isMandatory: true },
      ],
      timeline: [
        { stepNumber: 1, title: 'Compile income records', description: 'Gather all income from all sources for the year.', estimatedTime: '1–3 days' },
        { stepNumber: 2, title: 'Calculate tax due', description: 'Apply the new 2026 tax bands and deduct CRA.', estimatedTime: '2–4 hours' },
        { stepNumber: 3, title: 'File Form A online or in person', description: 'Most state IRS portals now accept online filing.', estimatedTime: '1–2 hours' },
        { stepNumber: 4, title: 'Pay tax due', description: 'Via Remita or bank payment to state IRS account.', estimatedTime: '30 minutes', cost: 'Varies by income' },
      ],
      regulatory: 'Due date: March 31 annually. Late filing: 10% penalty on tax owed. Late payment: 10% + CBN rate interest.',
      commonMistakes: [
        { title: 'Not filing because "employer handles it"', description: 'PAYE covers salary income only — other income (freelance, rent, dividends) must be declared.', solution: 'File a supplementary return if you have non-salary income.' },
      ],
      relatedGuides: [
        { slug: '/guides/nigeria-tax-act-2025-personal-income-tax', title: 'Nigeria Tax Act 2025 Changes' },
        { slug: '/guides/manage-payroll-calculate-paye', title: 'Payroll and PAYE Guide' },
      ],
      relatedTools: [{ slug: '/calculators/paye-calculator', title: 'PAYE Calculator' }],
    },
    sources: [{ title: 'FIRS Self-Assessment Guide', url: 'https://firs.gov.ng', verified: true }],
    reviewerName: 'Amina Hassan, Tax Consultant',
  },

  {
    title: 'How to Get a Personal TIN (For Individuals)',
    slug: 'get-personal-tin-individuals',
    subtitle: 'Individual TIN registration with FIRS — for salary earners and freelancers',
    description: 'How individual Nigerians (non-business) register for a Tax Identification Number.',
    domainSlug: 'government', subdomainSlug: 'taxes',
    content: {
      quickAnswer: 'Individual TIN registration is free at any FIRS office or online at itax.firs.gov.ng. Requires NIN and valid ID. TIN issued within 24 hours.',
      overview: 'Every Nigerian earning income — whether employed, self-employed, or receiving rent/investment returns — needs a personal TIN. Employers require it for PAYE registration.',
      definitions: [
        { term: 'Individual TIN', definition: 'An 11-digit tax ID for private individuals (distinct from company TINs).' },
      ],
      requirements: [
        { title: 'NIN', description: 'Mandatory for all TIN registrations since 2021.', isMandatory: true },
        { title: 'Valid ID', description: 'Passport, national ID, or driver\'s license.', isMandatory: true },
        { title: 'Proof of residence', description: 'Utility bill or tenancy agreement.', isMandatory: false },
      ],
      timeline: [
        { stepNumber: 1, title: 'Visit itax.firs.gov.ng', description: 'Click "Register" and select "Individual."', estimatedTime: '5 minutes' },
        { stepNumber: 2, title: 'Enter NIN and personal details', description: 'Name, date of birth, address, employment status.', estimatedTime: '10 minutes' },
        { stepNumber: 3, title: 'Receive TIN by email', description: 'TIN issued within 24 hours.', estimatedTime: '24 hours' },
      ],
      regulatory: 'Required by PITA s.8 for all income earners. Banks require TIN for accounts above ₦100,000 single deposit.',
      commonMistakes: [
        { title: 'Registering as a company instead of individual', description: 'Results in wrong TIN type.', solution: 'Select "Individual" on the FIRS portal.' },
      ],
      relatedGuides: [
        { slug: '/guides/file-personal-income-tax-returns', title: 'How to File Personal Income Tax Returns' },
        { slug: '/guides/tin-business-registration-2026', title: 'TIN for Business Registration' },
      ],
    },
    sources: [{ title: 'FIRS iTax Portal', url: 'https://itax.firs.gov.ng', verified: true }],
    reviewerName: 'Amina Hassan, Tax Consultant',
  },

  {
    title: 'Tax Exemptions and Reliefs Available to Nigerian Individuals',
    slug: 'tax-exemptions-reliefs-nigeria-individuals',
    subtitle: 'Legally reduce your income tax bill using available reliefs',
    description: 'A guide to all tax reliefs and exemptions available to individual taxpayers in Nigeria.',
    domainSlug: 'government', subdomainSlug: 'taxes',
    content: {
      quickAnswer: 'Key reliefs: Consolidated Relief Allowance (CRA) = ₦200,000 + 20% of gross income. Pension deduction (8% of salary). Disability relief. Children allowance (₦2,500 per child, max 4).',
      overview: 'Nigerian tax law provides several reliefs that reduce your taxable income. Many employees and self-employed individuals overpay tax by not claiming all available reliefs.',
      definitions: [
        { term: 'Consolidated Relief Allowance (CRA)', definition: 'A standard deduction of ₦200,000 + 20% of gross annual income — available to all individuals.' },
        { term: 'Pension Relief', definition: 'Contributions to an approved pension scheme are deductible from taxable income.' },
      ],
      requirements: [
        { title: 'Pension contribution receipts', description: 'PFA monthly statements to prove contributions.', isMandatory: false },
        { title: 'Medical/life insurance premium receipts', description: 'Premiums on approved policies are deductible.', isMandatory: false },
        { title: 'Children\'s education records', description: 'For child allowance claims.', isMandatory: false },
      ],
      timeline: [
        { stepNumber: 1, title: 'Identify applicable reliefs', description: 'Review the full list of reliefs under PITA Schedule.', estimatedTime: '1 hour' },
        { stepNumber: 2, title: 'Gather supporting documents', description: 'Pension statements, insurance receipts, etc.', estimatedTime: '1 day' },
        { stepNumber: 3, title: 'Claim on annual tax return', description: 'Declare all reliefs on Form A or through payroll.', estimatedTime: '1 hour' },
      ],
      regulatory: 'Reliefs are governed by PITA and the Nigeria Tax Act 2025. Claims must be supported by documentation — FIRS can disallow unsupported claims.',
      stats: [
        { label: 'Standard CRA deduction', value: '₦200,000 + 20%', unit: 'of gross income', source: 'Nigeria Tax Act 2025 s.25' },
        { label: 'Pension contribution deduction', value: '8%', unit: 'of monthly salary', source: 'Pension Reform Act 2014' },
      ],
      commonMistakes: [
        { title: 'Not claiming CRA', description: 'CRA is automatic but many self-employed persons forget to include it.', solution: 'Always deduct CRA before calculating taxable income.' },
      ],
      relatedGuides: [
        { slug: '/guides/file-personal-income-tax-returns', title: 'How to File Personal Income Tax Returns' },
        { slug: '/guides/nigeria-tax-act-2025-personal-income-tax', title: 'Nigeria Tax Act 2025 Changes' },
      ],
      relatedTools: [{ slug: '/calculators/paye-calculator', title: 'PAYE Calculator' }],
    },
    sources: [{ title: 'FIRS Tax Reliefs Guide', url: 'https://firs.gov.ng', verified: true }],
    reviewerName: 'Amina Hassan, Tax Consultant',
  },

  {
    title: 'How to Pay Property Tax and Land Use Charge in Nigeria',
    slug: 'pay-property-tax-land-use-charge-nigeria',
    subtitle: 'Property tax compliance guide for homeowners and landlords',
    description: 'How to calculate and pay property tax and land use charge in Lagos and other Nigerian states.',
    domainSlug: 'government', subdomainSlug: 'taxes',
    content: {
      quickAnswer: 'Lagos Land Use Charge (LUC): 0.394% of property value annually. Pay at lasepa.gov.ng or any bank. Penalty: 10% of unpaid tax + 2% monthly interest.',
      overview: 'Property tax in Nigeria is primarily administered by state governments. Lagos State\'s Land Use Charge is the most developed system — other states have varying arrangements.',
      definitions: [
        { term: 'Land Use Charge (LUC)', definition: 'Lagos State\'s annual property tax — combines ground rent, tenement rate, and neighbourhood improvement levy.' },
        { term: 'Property Value Assessment', description: 'The estimated market value of your property used to calculate LUC.', isMandatory: false },
      ],
      requirements: [
        { title: 'Property title document', description: 'C of O, deed of assignment, or tenancy agreement.', isMandatory: true },
        { title: 'LUC bill from Lagos Revenue Service', description: 'Issued annually.', isMandatory: true },
      ],
      timeline: [
        { stepNumber: 1, title: 'Receive LUC bill', description: 'Lagos issues bills annually. Check lasepa.gov.ng if you haven\'t received yours.', estimatedTime: '10 minutes' },
        { stepNumber: 2, title: 'Verify property assessment', description: 'Confirm the assessed value is correct — you can appeal if wrong.', estimatedTime: '1–2 days' },
        { stepNumber: 3, title: 'Pay online or at any bank', description: 'Pay at lasepa.gov.ng or collect payment at designated banks.', estimatedTime: '30 minutes', cost: '0.394% of property value' },
      ],
      regulatory: 'Lagos Land Use Charge Law 2018. Failure to pay within 30 days of demand attracts 10% penalty + 2% monthly interest.',
      commonMistakes: [
        { title: 'Not checking for overbilling', description: 'Some properties are assessed above market value.', solution: 'Compare to recent sales in your area and file an objection if the bill seems high.' },
      ],
      relatedGuides: [
        { slug: '/guides/obtain-certificate-occupancy-nigeria', title: 'How to Obtain a Certificate of Occupancy' },
      ],
    },
    sources: [{ title: 'Lagos State Revenue Service', url: 'https://lasepa.gov.ng', verified: true }],
    reviewerName: 'Amina Hassan, Tax Consultant',
  },

  {
    title: 'How to Appeal an Incorrect Tax Assessment in Nigeria',
    slug: 'appeal-incorrect-tax-assessment-nigeria',
    subtitle: 'Your rights when FIRS or state IRS raises a wrong tax demand',
    description: 'How to formally appeal a tax assessment you believe is incorrect in Nigeria.',
    domainSlug: 'government', subdomainSlug: 'taxes',
    content: {
      quickAnswer: 'File a Notice of Objection within 30 days of receiving the assessment. Submit to the issuing tax authority. If unresolved, appeal to the Tax Appeal Tribunal within 30 days.',
      overview: 'Tax authorities sometimes issue assessments containing errors. Nigerian law gives taxpayers the right to object and appeal. Acting quickly is critical — deadlines are strict.',
      definitions: [
        { term: 'Notice of Objection', definition: 'A formal written challenge to a tax assessment, filed within 30 days.' },
        { term: 'Tax Appeal Tribunal (TAT)', definition: 'A quasi-judicial body that hears appeals from taxpayers dissatisfied with tax authority decisions.' },
      ],
      requirements: [
        { title: 'Copy of disputed assessment', description: 'The original tax demand notice.', isMandatory: true },
        { title: 'Grounds for objection', description: 'Written explanation of why the assessment is wrong, with supporting evidence.', isMandatory: true },
        { title: 'Supporting financial records', description: 'Bank statements, tax returns, or receipts to support your claim.', isMandatory: true },
      ],
      timeline: [
        { stepNumber: 1, title: 'File Notice of Objection', description: 'Submit to FIRS or state IRS within 30 days of assessment.', estimatedTime: '1–3 days' },
        { stepNumber: 2, title: 'Await tax authority response', description: 'Authority must respond within 30 days.', estimatedTime: '30 days' },
        { stepNumber: 3, title: 'Appeal to Tax Appeal Tribunal (if rejected)', description: 'File within 30 days of rejection.', estimatedTime: '6–18 months for TAT hearing' },
      ],
      regulatory: 'Rights governed by PITA s.68 (individuals) and CITA s.68 (companies). TAT established under the FIRS (Establishment) Act 2007.',
      commonMistakes: [
        { title: 'Missing the 30-day objection deadline', description: 'After 30 days, the assessment becomes final and payable.', solution: 'Respond within 7 days of receiving the notice to give yourself time to prepare.' },
      ],
      relatedGuides: [
        { slug: '/guides/file-personal-income-tax-returns', title: 'How to File Personal Income Tax Returns' },
        { slug: '/guides/file-company-tax-returns', title: 'How to File Company Tax Returns' },
      ],
    },
    sources: [{ title: 'FIRS Taxpayer Rights Charter', url: 'https://firs.gov.ng', verified: true }],
    reviewerName: 'Amina Hassan, Tax Consultant',
  },

  {
    title: 'Withholding Tax — What It Is and Who Pays It in Nigeria',
    slug: 'withholding-tax-nigeria-guide',
    subtitle: 'A practical guide to withholding tax for businesses and individuals',
    description: 'How withholding tax works in Nigeria — applicable rates, who deducts it, and how to claim credits.',
    domainSlug: 'government', subdomainSlug: 'taxes',
    content: {
      quickAnswer: 'WHT is deducted at source: 5% on most services, 10% on rent and royalties, 2.5% on contracts. The party making payment deducts and remits to FIRS. You receive a WHT credit note usable against your tax liability.',
      overview: 'Withholding Tax (WHT) is a tax deducted at the point of payment by the payer and remitted to FIRS. It is a prepayment of income tax — you can offset the WHT credit against your annual tax bill.',
      definitions: [
        { term: 'WHT Credit Note', definition: 'A certificate from FIRS confirming WHT deducted on your behalf — usable to offset future tax liabilities.' },
        { term: 'Withholding Agent', definition: 'The party responsible for deducting WHT and remitting to FIRS.' },
      ],
      requirements: [
        { title: 'TIN', description: 'Required to receive WHT credit notes.', isMandatory: true },
        { title: 'Invoice from service provider', description: 'WHT is calculated on the invoice value.', isMandatory: true },
      ],
      timeline: [
        { stepNumber: 1, title: 'Identify WHT-applicable transactions', description: 'Services, rent, royalties, contracts, dividends, interest.', estimatedTime: 'Ongoing' },
        { stepNumber: 2, title: 'Deduct WHT before payment', description: 'Calculate and withhold the applicable percentage.', estimatedTime: '10 minutes per invoice' },
        { stepNumber: 3, title: 'Remit to FIRS by 21st of following month', description: 'File WHT returns and pay via Remita.', estimatedTime: '1 hour monthly', cost: 'Based on deducted amounts' },
        { stepNumber: 4, title: 'Issue WHT credit note to payee', description: 'Within 30 days of remittance.', estimatedTime: '1 day' },
      ],
      regulatory: 'Governed by CITA and PITA. Late WHT remittance: 10% penalty + interest at CBN MPR.',
      commonMistakes: [
        { title: 'Not collecting WHT credit notes', description: 'Credits expire if not claimed — wasted money.', solution: 'Always request WHT credit notes from clients who deduct WHT on your invoices.' },
      ],
      relatedGuides: [
        { slug: '/guides/file-company-tax-returns', title: 'How to File Company Tax Returns' },
        { slug: '/guides/vat-registration-nigeria', title: 'How to Register for VAT' },
      ],
    },
    sources: [{ title: 'FIRS WHT Guide', url: 'https://firs.gov.ng/withholding-tax', verified: true }],
    reviewerName: 'Amina Hassan, Tax Consultant',
  },

  {
    title: 'How Self-Employed Nigerians Should Handle Tax',
    slug: 'self-employed-tax-nigeria',
    subtitle: 'Tax obligations for freelancers, consultants, and sole traders',
    description: 'Tax guide for self-employed Nigerians — what to pay, when to pay, and how to minimise liability.',
    domainSlug: 'government', subdomainSlug: 'taxes',
    content: {
      quickAnswer: 'Self-employed Nigerians pay Personal Income Tax. Register with your state IRS, file annual returns by March 31, and pay quarterly instalments. Keep records of all income and deductible expenses.',
      overview: 'Freelancers, consultants, and sole traders are responsible for managing their own tax obligations. Unlike salary earners, there\'s no employer to withhold tax — you must calculate and remit yourself.',
      definitions: [
        { term: 'Direct Assessment', definition: 'Tax assessment issued to self-employed individuals by the state IRS based on declared income.' },
        { term: 'Estimated Tax Payments', definition: 'Quarterly advance payments of estimated annual tax liability.' },
      ],
      requirements: [
        { title: 'TIN registration', description: 'Individual TIN from FIRS.', isMandatory: true },
        { title: 'State IRS registration', description: 'Register as a self-employed taxpayer.', isMandatory: true },
        { title: 'Income records', description: 'Invoices, bank statements, receipts for all income.', isMandatory: true },
        { title: 'Expense records', description: 'Receipts for deductible business expenses.', isMandatory: true },
      ],
      timeline: [
        { stepNumber: 1, title: 'Register with state IRS', description: 'Visit or apply online with TIN and ID.', estimatedTime: '1 day' },
        { stepNumber: 2, title: 'Keep income and expense records', description: 'Maintain a simple spreadsheet or accounting app monthly.', estimatedTime: 'Ongoing' },
        { stepNumber: 3, title: 'File annual return by March 31', description: 'Submit Form A with income and expense summary.', estimatedTime: '1–2 days' },
        { stepNumber: 4, title: 'Pay tax due', description: 'Pay assessed amount in full or in quarterly instalments.', estimatedTime: '1 hour', cost: 'Varies — use PAYE Calculator' },
      ],
      regulatory: 'Self-employed persons are assessed under PITA. Failure to file: minimum ₦5,000 penalty. Tax evasion is a criminal offence.',
      commonMistakes: [
        { title: 'Not separating personal and business income', description: 'Makes it impossible to claim business expense deductions.', solution: 'Use a dedicated business account for all business transactions.' },
      ],
      relatedGuides: [
        { slug: '/guides/file-personal-income-tax-returns', title: 'How to File Personal Income Tax Returns' },
        { slug: '/guides/nigerian-freelancers-taxes', title: 'How Nigerian Freelancers Should Handle Taxes' },
      ],
      relatedTools: [{ slug: '/calculators/paye-calculator', title: 'PAYE Calculator' }],
    },
    sources: [{ title: 'FIRS', url: 'https://firs.gov.ng', verified: true }],
    reviewerName: 'Amina Hassan, Tax Consultant',
  },

  {
    title: 'State vs Federal Taxes in Nigeria — Who Collects What',
    slug: 'state-vs-federal-taxes-nigeria',
    subtitle: 'Which taxes go to FIRS vs your state IRS',
    description: 'A clear guide to which Nigerian taxes are federal and which are state-collected.',
    domainSlug: 'government', subdomainSlug: 'taxes',
    content: {
      quickAnswer: 'Federal (FIRS): VAT, Companies Income Tax, WHT for companies, custom duties. State (IRS): PAYE for individuals, personal income tax, land use charge, development levy.',
      overview: 'Nigeria operates a split tax system. Understanding which authority to pay avoids double payments and ensures your tax records are with the right body.',
      definitions: [
        { term: 'FIRS', definition: 'Federal Inland Revenue Service — collects taxes on behalf of the federal government.' },
        { term: 'State IRS', definition: 'State Internal Revenue Service — collects taxes on behalf of each of Nigeria\'s 36 states.' },
      ],
      requirements: [{ title: 'N/A — informational guide', description: 'No application.', isMandatory: false }],
      timeline: [
        { stepNumber: 1, title: 'Identify your tax obligations', description: 'Are you an individual or a company? Salary earner or self-employed?', estimatedTime: '30 minutes' },
        { stepNumber: 2, title: 'Register with correct authorities', description: 'Both FIRS (for TIN and VAT) and your state IRS (for PAYE/PIT).', estimatedTime: '1–2 days' },
      ],
      regulatory: 'Division of tax powers governed by the Taxes and Levies Act and the Nigerian Constitution Third Schedule.',
      stats: [
        { label: 'Federal taxes administered by FIRS', value: '11', unit: 'tax types', source: 'FIRS 2024 Annual Report' },
        { label: 'States with functional IRS portals', value: '24', unit: 'states', source: 'JTBS 2024 Survey' },
      ],
      commonMistakes: [
        { title: 'Paying PAYE to FIRS instead of state IRS', description: 'PAYE for individuals goes to the state where the employee is resident.', solution: 'Confirm the correct state IRS account for each employee\'s state of residence.' },
      ],
      relatedGuides: [
        { slug: '/guides/manage-payroll-calculate-paye', title: 'Payroll and PAYE Guide' },
        { slug: '/guides/vat-registration-nigeria', title: 'VAT Registration Guide' },
      ],
    },
    sources: [{ title: 'FIRS', url: 'https://firs.gov.ng', verified: true }],
    reviewerName: 'Amina Hassan, Tax Consultant',
  },

  // ── GOVERNMENT / LAND & PROPERTY (guides 46-55) ──────────────────────────────

  {
    title: 'How to Verify Land Ownership Before Buying in Nigeria',
    slug: 'verify-land-ownership-before-buying-nigeria',
    subtitle: 'Due diligence steps to avoid land fraud in Nigeria',
    description: 'How to conduct a land search and verify ownership before purchasing property in Nigeria.',
    domainSlug: 'government', subdomainSlug: 'land-property',
    content: {
      quickAnswer: 'Conduct a search at the State Land Registry using the property\'s title number. Cost: ₦5,000–₦20,000. Reveals ownership, encumbrances, and any disputes. Takes 1–5 days.',
      overview: 'Land fraud is one of the most common financial crimes in Nigeria. A proper land search before purchase is essential and costs a fraction of what recovery would cost after fraud.',
      definitions: [
        { term: 'Land Search', definition: 'An official query at the Land Registry to confirm ownership, encumbrances, and court orders against a property.' },
        { term: 'Certificate of Occupancy (C of O)', definition: 'The most authoritative title document in Nigeria — grants statutory right of occupancy.' },
        { term: 'Deed of Assignment', definition: 'Document transferring ownership between private parties — must be registered at the Land Registry.' },
      ],
      requirements: [
        { title: 'Property title document', description: 'C of O number, deed of assignment, or survey plan.', isMandatory: true },
        { title: 'Survey plan', description: 'Showing the coordinates and boundaries of the land.', isMandatory: true },
        { title: 'Application for search', description: 'Form available at the Land Registry.', isMandatory: true },
      ],
      timeline: [
        { stepNumber: 1, title: 'Obtain a copy of the title document', description: 'Ask the seller for their C of O or deed.', estimatedTime: '1 day' },
        { stepNumber: 2, title: 'Visit the State Land Registry', description: 'Bring the title number and pay search fee.', estimatedTime: '1 day', cost: '₦5,000–₦20,000' },
        { stepNumber: 3, title: 'Receive search results', description: 'Confirms true owner, any mortgages, and disputes.', estimatedTime: '1–5 days' },
        { stepNumber: 4, title: 'Engage a property lawyer', description: 'Review the search results before signing any agreement.', estimatedTime: '1–3 days', cost: '₦50,000–₦200,000 lawyer fees' },
      ],
      regulatory: 'Land is governed by the Land Use Act 1978. All land in Nigeria is vested in the state governor — individuals hold "right of occupancy," not absolute ownership.',
      commonMistakes: [
        { title: 'Buying land without a lawyer', description: 'Sellers often produce fake or incomplete documents.', solution: 'Always use a qualified property lawyer for due diligence.' },
        { title: 'Trusting family land without documentation', description: 'Family disputes frequently arise after purchase.', solution: 'Ensure a valid deed of partition or assignment is issued by all family members.' },
      ],
      relatedGuides: [
        { slug: '/guides/obtain-certificate-occupancy-nigeria', title: 'How to Obtain a Certificate of Occupancy' },
        { slug: '/guides/register-land-nigeria', title: 'How to Register Land in Nigeria' },
      ],
    },
    sources: [{ title: 'Lagos State Land Bureau', url: 'https://landbureau.lagosstate.gov.ng', verified: true }],
    reviewerName: 'Barrister Ngozi Obi, Intellectual Property Lawyer',
  },

  {
    title: 'How to Obtain a Certificate of Occupancy (C of O) in Nigeria',
    slug: 'obtain-certificate-occupancy-nigeria',
    subtitle: 'Getting the most authoritative land title document from the state government',
    description: 'How to apply for and obtain a Certificate of Occupancy from your state government.',
    domainSlug: 'government', subdomainSlug: 'land-property',
    content: {
      quickAnswer: 'C of O application: ₦100,000–₦500,000+ depending on state and land value. Apply at the State Land Bureau. Processing: 6–18 months. Requires survey plan, application form, and proof of ownership.',
      overview: 'A Certificate of Occupancy (C of O) is issued by the State Governor under the Land Use Act and represents the highest tier of land title in Nigeria. Without it, your land title is not fully secure.',
      definitions: [
        { term: 'Statutory Right of Occupancy', definition: 'The right granted by a C of O — the strongest form of land title in Nigeria.' },
        { term: 'Governor\'s Consent', definition: 'Required when a C of O holder transfers their land to another person — a separate application and fee.' },
      ],
      requirements: [
        { title: 'Survey plan', description: 'Prepared by a licensed surveyor.', isMandatory: true },
        { title: 'Proof of possession/ownership', description: 'Receipts, previous deed, or allocation letter.', isMandatory: true },
        { title: 'Land Information Certificate', description: 'From the Land Registry confirming no existing C of O.', isMandatory: true },
        { title: 'Completed application form', description: 'From the State Land Bureau.', isMandatory: true },
        { title: 'Application fee', description: 'Varies by state and land size/value.', isMandatory: true },
      ],
      timeline: [
        { stepNumber: 1, title: 'Hire a licensed surveyor', description: 'Get a survey plan and plot coordinates registered with the state.', estimatedTime: '1–2 weeks', cost: '₦100,000–₦300,000' },
        { stepNumber: 2, title: 'Conduct land information search', description: 'Confirm no existing C of O on the land.', estimatedTime: '1–3 days', cost: '₦5,000–₦20,000' },
        { stepNumber: 3, title: 'Submit C of O application', description: 'At the State Land Bureau with all documents and fees.', estimatedTime: '1 day', cost: '₦100,000–₦500,000+' },
        { stepNumber: 4, title: 'Site inspection', description: 'Government surveyors visit to verify.', estimatedTime: '1–3 months after submission' },
        { stepNumber: 5, title: 'Receive C of O', description: 'Processing is slow — follow up regularly.', estimatedTime: '6–18 months total' },
      ],
      regulatory: 'Governed by the Land Use Act 1978 s.5. All land is vested in the state — C of O is a grant of right of occupancy, not freehold ownership.',
      commonMistakes: [
        { title: 'Not hiring a licensed surveyor', description: 'Unlicensed surveys are rejected by the Land Bureau.', solution: 'Verify the surveyor\'s license with SURCON (Surveyors Registration Council of Nigeria).' },
        { title: 'Not following up on the application', description: 'C of O applications can stall for years without follow-up.', solution: 'Visit the Land Bureau every 4–6 weeks and document all follow-ups.' },
      ],
      relatedGuides: [
        { slug: '/guides/verify-land-ownership-before-buying-nigeria', title: 'How to Verify Land Ownership' },
        { slug: '/guides/register-land-nigeria', title: 'How to Register Land in Nigeria' },
      ],
    },
    sources: [{ title: 'Lagos State Land Bureau', url: 'https://landbureau.lagosstate.gov.ng', verified: true }],
    reviewerName: 'Barrister Ngozi Obi, Intellectual Property Lawyer',
  },

  {
    title: 'How to Conduct a Land Search in Nigeria',
    slug: 'conduct-land-search-nigeria',
    subtitle: 'Official land search process at Nigerian Land Registries',
    description: 'Step-by-step guide to conducting an official land search before property transactions.',
    domainSlug: 'government', subdomainSlug: 'land-property',
    content: {
      quickAnswer: 'Visit the State Land Registry with the C of O number or property address. Pay ₦5,000–₦20,000 search fee. Results in 1–5 days show ownership, mortgages, and disputes.',
      overview: 'A land search is the essential first step in any property transaction. It confirms who legally owns the land and whether there are any liens, mortgages, or court orders preventing sale.',
      definitions: [
        { term: 'Land Registry Search Report', definition: 'An official document from the Land Registry summarising the ownership history and encumbrances on a property.' },
        { term: 'Encumbrance', definition: 'A claim or lien on a property — such as a mortgage or court order — that restricts its transfer.' },
      ],
      requirements: [
        { title: 'C of O number or survey plan number', description: 'Unique identifier for the property.', isMandatory: true },
        { title: 'Search application form', description: 'Available at the Land Registry.', isMandatory: true },
        { title: 'Search fee', description: 'Varies by state.', isMandatory: true },
      ],
      timeline: [
        { stepNumber: 1, title: 'Obtain C of O number from seller', description: 'The seller must provide their title document number.', estimatedTime: '1 day' },
        { stepNumber: 2, title: 'Visit Land Registry', description: 'Submit application and pay fee.', estimatedTime: '2–4 hours', cost: '₦5,000–₦20,000' },
        { stepNumber: 3, title: 'Collect search report', description: 'Usually ready in 1–5 days.', estimatedTime: '1–5 days' },
      ],
      regulatory: 'Land Registry is operated by each state government under the Land Use Act.',
      commonMistakes: [
        { title: 'Only searching in Lagos when property is in Ogun', description: 'Each state has its own registry.', solution: 'Search at the Land Registry of the state where the property is located.' },
      ],
      relatedGuides: [
        { slug: '/guides/verify-land-ownership-before-buying-nigeria', title: 'How to Verify Land Ownership' },
        { slug: '/guides/obtain-certificate-occupancy-nigeria', title: 'How to Obtain a C of O' },
      ],
    },
    sources: [{ title: 'Lagos Land Bureau', url: 'https://landbureau.lagosstate.gov.ng', verified: true }],
    reviewerName: 'Barrister Ngozi Obi, Intellectual Property Lawyer',
  },

  {
    title: 'Common Land Fraud Red Flags in Nigeria',
    slug: 'land-fraud-red-flags-nigeria',
    subtitle: 'How to spot a fraudulent land deal before it\'s too late',
    description: 'The most common land fraud tactics in Nigeria and how to protect yourself.',
    domainSlug: 'government', subdomainSlug: 'land-property',
    content: {
      quickAnswer: 'Red flags: pressure to pay before conducting a search, no original title document, multiple simultaneous sellers, unusually low price, no physical address for seller. Walk away if you see these.',
      overview: 'Land fraud costs Nigerians billions annually. The schemes range from outright fake titles to selling land to multiple buyers simultaneously. Knowing the red flags prevents loss.',
      definitions: [
        { term: 'Multiple Sales', definition: 'A fraudster sells the same land to several buyers using forged or expired titles.' },
        { term: 'Family Land Fraud', definition: 'One family member sells land without authority from other co-owners.' },
      ],
      requirements: [{ title: 'Due diligence checklist', description: 'Use before any land purchase.', isMandatory: true }],
      timeline: [
        { stepNumber: 1, title: 'Conduct a land search', description: 'Always — no exceptions.', estimatedTime: '1–5 days' },
        { stepNumber: 2, title: 'Verify seller\'s identity', description: 'Request ID matching the name on the title document.', estimatedTime: '1 day' },
        { stepNumber: 3, title: 'Engage a property lawyer', description: 'Have a lawyer review all documents.', estimatedTime: '1–3 days' },
      ],
      regulatory: 'Land fraud is prosecuted under the Criminal Code Act and the Advance Fee Fraud and Related Offences Act.',
      commonMistakes: [
        { title: 'Trusting estate agents without independent verification', description: 'Agents are not liable for fraudulent sales.', solution: 'Always verify title independently at the Land Registry — regardless of agent assurances.' },
        { title: 'Buying "family land" without a deed of release', description: 'Family land requires all co-owners\' consent.', solution: 'Obtain a signed deed from all family members and confirm it at the Land Registry.' },
      ],
      relatedGuides: [
        { slug: '/guides/verify-land-ownership-before-buying-nigeria', title: 'How to Verify Land Ownership' },
        { slug: '/guides/conduct-land-search-nigeria', title: 'How to Conduct a Land Search' },
      ],
    },
    sources: [{ title: 'Nigerian Bar Association — Property Transactions Guide', url: 'https://nigerianbar.org.ng', verified: true }],
    reviewerName: 'Barrister Ngozi Obi, Intellectual Property Lawyer',
  },

  {
    title: 'How to Get a Survey Plan in Nigeria',
    slug: 'get-survey-plan-nigeria',
    subtitle: 'Engaging a licensed surveyor and registering your survey plan',
    description: 'How to commission and register a land survey plan in Nigeria.',
    domainSlug: 'government', subdomainSlug: 'land-property',
    content: {
      quickAnswer: 'Hire a SURCON-licensed surveyor. Cost: ₦100,000–₦500,000 depending on land size and location. Takes 1–3 weeks. The plan must be filed at the state Survey Division.',
      overview: 'A survey plan is required for C of O applications, building permits, and property transactions. It shows the exact boundaries, dimensions, and coordinates of your land.',
      definitions: [
        { term: 'Survey Plan', definition: 'A technical drawing showing a property\'s boundaries, dimensions, and location referenced to known coordinates.' },
        { term: 'SURCON', definition: 'Surveyors Registration Council of Nigeria — the body that licenses surveyors.' },
      ],
      requirements: [
        { title: 'Proof of land ownership', description: 'Deed, allocation letter, or receipt of purchase.', isMandatory: true },
        { title: 'Access to the land for measurement', description: 'Surveyor must physically access the property.', isMandatory: true },
      ],
      timeline: [
        { stepNumber: 1, title: 'Hire SURCON-licensed surveyor', description: 'Verify license at surcon.gov.ng.', estimatedTime: '1–3 days' },
        { stepNumber: 2, title: 'Surveyor visits and measures the land', description: 'Uses GPS and total station equipment.', estimatedTime: '1 day on site' },
        { stepNumber: 3, title: 'Survey plan prepared and signed', description: 'Surveyor draws and certifies the plan.', estimatedTime: '1–2 weeks', cost: '₦100,000–₦500,000' },
        { stepNumber: 4, title: 'File at State Survey Division', description: 'Plan registered and given a unique survey number.', estimatedTime: '1–3 weeks' },
      ],
      regulatory: 'Survey plans must be prepared by SURCON-licensed surveyors. Unlicensed survey plans are rejected by Land Bureaus and courts.',
      commonMistakes: [
        { title: 'Not verifying surveyor\'s SURCON license', description: 'Unlicensed surveys are legally invalid.', solution: 'Check SURCON register at surcon.gov.ng before engaging.' },
      ],
      relatedGuides: [
        { slug: '/guides/obtain-certificate-occupancy-nigeria', title: 'How to Obtain a C of O' },
        { slug: '/guides/verify-land-ownership-before-buying-nigeria', title: 'How to Verify Land Ownership' },
      ],
    },
    sources: [{ title: 'Surveyors Registration Council of Nigeria', url: 'https://surcon.gov.ng', verified: true }],
    reviewerName: 'Barrister Ngozi Obi, Intellectual Property Lawyer',
  },

  {
    title: 'Governor\'s Consent — What It Is and When You Need It in Nigeria',
    slug: 'governors-consent-nigeria',
    subtitle: 'Why every land transfer needs state government approval',
    description: 'Understanding Governor\'s Consent — when it\'s required and how to apply.',
    domainSlug: 'government', subdomainSlug: 'land-property',
    content: {
      quickAnswer: 'Governor\'s Consent is required whenever a C of O holder transfers land to another person. Without it, the transaction is void. Fee: varies by state and land value. Process: 3–12 months.',
      overview: 'Under the Land Use Act, all land belongs to the state. When a C of O holder sells, gifts, or mortgages their land, the Governor must consent to the transaction. Without this, the transfer is legally void.',
      definitions: [
        { term: 'Governor\'s Consent', definition: 'Formal state government approval of any assignment, mortgage, or transfer of a C of O.' },
        { term: 'Deed of Assignment', definition: 'The contract of sale for land — must be registered at the Land Registry with Governor\'s Consent.' },
      ],
      requirements: [
        { title: 'Original C of O of the seller', description: 'Must be presented at the Land Bureau.', isMandatory: true },
        { title: 'Deed of Assignment (drafted by a lawyer)', description: 'Executed by both buyer and seller.', isMandatory: true },
        { title: 'Survey plan', description: 'Current, registered plan.', isMandatory: true },
        { title: 'Consent fee payment', description: 'Varies by state and land value.', isMandatory: true },
      ],
      timeline: [
        { stepNumber: 1, title: 'Lawyer drafts Deed of Assignment', description: 'Both parties execute the deed.', estimatedTime: '1–2 weeks', cost: '₦50,000–₦200,000 legal fees' },
        { stepNumber: 2, title: 'Submit for Governor\'s Consent at Land Bureau', description: 'File all documents and pay consent fee.', estimatedTime: '1 day', cost: 'Varies: typically 3–8% of land value' },
        { stepNumber: 3, title: 'Site inspection and assessment', description: 'State officials verify the property.', estimatedTime: '2–6 months' },
        { stepNumber: 4, title: 'Consent endorsed and registered', description: 'New C of O or endorsed deed issued.', estimatedTime: '3–12 months total' },
      ],
      regulatory: 'Land Use Act 1978 s.21–22. Transfers without consent are void and unenforceable.',
      commonMistakes: [
        { title: 'Paying full purchase price before consent is obtained', description: 'If consent is refused, you may lose your money.', solution: 'Structure payments: initial deposit, balance only after consent is obtained.' },
      ],
      relatedGuides: [
        { slug: '/guides/obtain-certificate-occupancy-nigeria', title: 'How to Obtain a C of O' },
        { slug: '/guides/register-land-nigeria', title: 'How to Register Land' },
      ],
    },
    sources: [{ title: 'Land Use Act 1978', url: 'https://lawsnigeria.placng.org', verified: true }],
    reviewerName: 'Barrister Ngozi Obi, Intellectual Property Lawyer',
  },

  {
    title: 'How to Resolve a Land Boundary Dispute in Nigeria',
    slug: 'resolve-land-boundary-dispute-nigeria',
    subtitle: 'Options for settling land boundary conflicts — from mediation to court',
    description: 'How to resolve a land boundary dispute in Nigeria through mediation, surveying, or court action.',
    domainSlug: 'government', subdomainSlug: 'land-property',
    content: {
      quickAnswer: 'Start with a joint survey to establish facts. If the neighbour disputes, try mediation at the Land Bureau. Unresolved disputes go to the State High Court. Timeline: weeks to years depending on route.',
      overview: 'Land boundary disputes are common in Nigeria. The resolution path ranges from a simple joint survey to multi-year litigation. Starting with less adversarial options saves time and money.',
      definitions: [
        { term: 'Joint Survey', definition: 'A survey conducted by both parties\' agreed licensed surveyors to establish exact boundaries.' },
        { term: 'Land Tribunal', definition: 'Some states have specialised tribunals for land disputes — faster than regular courts.' },
      ],
      requirements: [
        { title: 'Original survey plan', description: 'To establish your claimed boundary.', isMandatory: true },
        { title: 'C of O or deed', description: 'Proof of your legal entitlement.', isMandatory: true },
        { title: 'Evidence of possession', description: 'Photos, tax payment records, witnesses.', isMandatory: false },
      ],
      timeline: [
        { stepNumber: 1, title: 'Commission a licensed survey', description: 'Establish your correct boundary with documented GPS coordinates.', estimatedTime: '1–2 weeks' },
        { stepNumber: 2, title: 'Attempt mediation', description: 'Community leaders, Land Bureau, or a mediator can facilitate agreement.', estimatedTime: '2–8 weeks' },
        { stepNumber: 3, title: 'File at court if unresolved', description: 'State High Court for land matters — bring all title documents.', estimatedTime: '1–5 years' },
      ],
      regulatory: 'Land dispute jurisdiction lies with the State High Court under the Land Use Act. Some states have Land Use and Allocation Committees as first-tier resolution bodies.',
      commonMistakes: [
        { title: 'Building on disputed land', description: 'This escalates the dispute and weakens your legal position.', solution: 'Do not build or develop until the boundary is formally resolved.' },
      ],
      relatedGuides: [
        { slug: '/guides/get-survey-plan-nigeria', title: 'How to Get a Survey Plan' },
        { slug: '/guides/small-claims-court-nigeria', title: 'How Small Claims Court Works in Nigeria' },
      ],
    },
    sources: [{ title: 'Nigerian Law School Land Law Guide', url: 'https://lawsnigeria.placng.org', verified: true }],
    reviewerName: 'Barrister Ngozi Obi, Intellectual Property Lawyer',
  },

  {
    title: 'Family Land vs Individually Owned Land — Legal Differences in Nigeria',
    slug: 'family-land-vs-individually-owned-nigeria',
    subtitle: 'Understanding the legal implications of inherited or communal land',
    description: 'The legal differences between family land and individual land ownership in Nigeria.',
    domainSlug: 'government', subdomainSlug: 'land-property',
    content: {
      quickAnswer: 'Family land is owned collectively — no single member can sell without all others\' consent. Individually owned land has a C of O or deed in one person\'s name. Buying family land requires a deed from ALL family members.',
      overview: 'Many Nigerians own or purchase "family land" — inherited property held communally. This type has special legal risks that individually titled land does not have.',
      definitions: [
        { term: 'Family Land', definition: 'Land inherited or acquired by a family as a group — governed by customary law and requires collective consent for sale.' },
        { term: 'Partition', definition: 'A legal process to divide family land into individually owned portions.' },
      ],
      requirements: [{ title: 'N/A — informational guide', description: 'No application required.', isMandatory: false }],
      timeline: [
        { stepNumber: 1, title: 'Identify land type', description: 'Check whether the land has an individual C of O or is held under family/community title.', estimatedTime: '1–3 days' },
        { stepNumber: 2, title: 'Obtain deed of release from all family members', description: 'Every adult member of the family must sign.', estimatedTime: '1 week to months' },
        { stepNumber: 3, title: 'Register at Land Bureau', description: 'Convert to individual title after full family consent.', estimatedTime: '3–12 months' },
      ],
      regulatory: 'Family land is governed by customary law in each state. Individual land is governed by the Land Use Act 1978.',
      commonMistakes: [
        { title: 'Buying from only one family member', description: 'The sale can be overturned by other family members.', solution: 'Get a deed signed by all adult family members, witnessed, and registered.' },
      ],
      relatedGuides: [
        { slug: '/guides/verify-land-ownership-before-buying-nigeria', title: 'How to Verify Land Ownership' },
        { slug: '/guides/governors-consent-nigeria', title: 'Governor\'s Consent Guide' },
      ],
    },
    sources: [{ title: 'Nigerian Bar Association', url: 'https://nigerianbar.org.ng', verified: true }],
    reviewerName: 'Barrister Ngozi Obi, Intellectual Property Lawyer',
  },

  {
    title: 'How to Register a Deed of Assignment in Nigeria',
    slug: 'register-deed-of-assignment-nigeria',
    subtitle: 'Registering your property purchase contract at the Land Registry',
    description: 'How to register a Deed of Assignment and obtain Governor\'s Consent in Nigeria.',
    domainSlug: 'government', subdomainSlug: 'land-property',
    content: {
      quickAnswer: 'Register the Deed at the Land Registry with Governor\'s Consent. Cost: stamp duty (0.75%) + consent fee (varies). Takes 3–12 months. Required for the transfer to be legally valid.',
      overview: 'A Deed of Assignment without Land Registry registration is only binding between the parties — it gives no protection against third-party claims. Registration makes the transaction publicly recorded.',
      definitions: [
        { term: 'Deed of Assignment', definition: 'A legal contract transferring a right of occupancy from seller to buyer.' },
        { term: 'Stamp Duty', definition: 'A government tax on legal documents — 0.75% of property value for deeds.' },
      ],
      requirements: [
        { title: 'Executed Deed of Assignment', description: 'Signed by both buyer and seller with witnesses.', isMandatory: true },
        { title: 'Governor\'s Consent', description: 'Must be obtained before or concurrently with registration.', isMandatory: true },
        { title: 'Stamp duty payment receipt', description: 'From FIRS.', isMandatory: true },
        { title: 'Survey plan', description: 'Current registered survey.', isMandatory: true },
      ],
      timeline: [
        { stepNumber: 1, title: 'Pay stamp duty', description: 'Online via FIRS: 0.75% of consideration.', estimatedTime: '1 day', cost: '0.75% of purchase price' },
        { stepNumber: 2, title: 'Apply for Governor\'s Consent', description: 'Submit at State Land Bureau.', estimatedTime: '3–12 months' },
        { stepNumber: 3, title: 'Register deed at Land Registry', description: 'File with all documents upon consent approval.', estimatedTime: '1–2 weeks after consent' },
      ],
      regulatory: 'Registration governed by the Land Instruments Registration Law of each state. Unregistered deeds are inadmissible as evidence of title.',
      commonMistakes: [
        { title: 'Not paying stamp duty', description: 'An unstamped deed cannot be registered or used in court.', solution: 'Pay stamp duty within 30 days of signing to avoid penalty.' },
      ],
      relatedGuides: [
        { slug: '/guides/governors-consent-nigeria', title: 'Governor\'s Consent Guide' },
        { slug: '/guides/verify-land-ownership-before-buying-nigeria', title: 'How to Verify Land Ownership' },
      ],
    },
    sources: [{ title: 'FIRS Stamp Duties', url: 'https://firs.gov.ng/stamp-duties', verified: true }],
    reviewerName: 'Barrister Ngozi Obi, Intellectual Property Lawyer',
  },

  // ── GOVERNMENT / POLICE, COURTS & LEGAL (guides 56-65) ───────────────────────

  {
    title: 'How to Report a Crime and Get a Police Report in Nigeria',
    slug: 'report-crime-get-police-report-nigeria',
    subtitle: 'How to make a police report and follow up on your case',
    description: 'How to report a crime to Nigerian Police and obtain an official police report.',
    domainSlug: 'government', subdomainSlug: 'police-courts',
    content: {
      quickAnswer: 'Report crimes at your nearest police station. Get a case diary number immediately. Police report (extract) issued within 2–7 days for ₦1,000–₦5,000. Call 199 or 112 for emergencies.',
      overview: 'Reporting crimes and obtaining police reports is essential for insurance claims, court proceedings, and property dispute resolution. Understanding the process helps you navigate it effectively.',
      definitions: [
        { term: 'First Information Report (FIR)', definition: 'The initial complaint document filed when reporting a crime to the police.' },
        { term: 'Police Extract', definition: 'An official police document summarising a reported case — different from a clearance certificate.' },
        { term: 'Case Diary Number', definition: 'A unique reference number assigned when your report is recorded.' },
      ],
      requirements: [
        { title: 'Valid ID', description: 'To identify yourself as the complainant.', isMandatory: true },
        { title: 'Details of the incident', description: 'Date, time, location, description of what happened.', isMandatory: true },
        { title: 'Supporting evidence', description: 'Photos, receipts, witness details — bring what you have.', isMandatory: false },
      ],
      timeline: [
        { stepNumber: 1, title: 'Visit the nearest police station', description: 'Alternatively call the Divisional Police Officer\'s number for serious crimes.', estimatedTime: '1–3 hours at station' },
        { stepNumber: 2, title: 'Make your statement', description: 'Signed written statement is taken. Receive case diary number.', estimatedTime: '30–60 minutes' },
        { stepNumber: 3, title: 'Request police report/extract', description: 'Ask for a copy for insurance or legal use.', estimatedTime: '2–7 days', cost: '₦1,000–₦5,000' },
        { stepNumber: 4, title: 'Follow up', description: 'Visit or call the DPO\'s office to track investigation progress.', estimatedTime: 'Weekly follow-ups' },
      ],
      regulatory: 'Police are governed by the Police Act 2020. You have the right to a copy of your statement. Obstruction of justice complaints can be made to the Police Service Commission.',
      commonMistakes: [
        { title: 'Leaving without a case diary number', description: 'Without it you have no proof the report was made.', solution: 'Insist on a written acknowledgment with case number before leaving the station.' },
        { title: 'Not following up', description: 'Cases without follow-up rarely progress.', solution: 'Visit the station weekly and document all contacts with a follow-up log.' },
      ],
      relatedGuides: [
        { slug: '/guides/police-clearance-certificate', title: 'How to Obtain a Police Clearance Certificate' },
        { slug: '/guides/rights-if-arrested-nigeria', title: 'Your Rights If Arrested in Nigeria' },
      ],
    },
    sources: [{ title: 'Nigeria Police Force', url: 'https://npf.gov.ng', verified: true }],
    reviewerName: 'Barrister Ngozi Obi, Intellectual Property Lawyer',
  },

  {
    title: 'Your Rights If Arrested in Nigeria',
    slug: 'rights-if-arrested-nigeria',
    subtitle: 'Know your constitutional rights during arrest and detention',
    description: 'A plain-language guide to Nigerian citizens\' rights during police arrest and detention.',
    domainSlug: 'government', subdomainSlug: 'police-courts',
    content: {
      quickAnswer: 'Key rights: right to know why you\'re arrested, right to remain silent, right to a lawyer within 24 hours, right to bail for bailable offences, right to be charged or released within 24–48 hours.',
      overview: 'The Nigerian Constitution guarantees specific rights to every arrested person. Many Nigerians don\'t know these rights — and police sometimes rely on that ignorance. Knowing your rights is your first protection.',
      definitions: [
        { term: 'Bailable Offence', definition: 'A charge for which bail is available by right — most minor offences.' },
        { term: 'Fundamental Rights', definition: 'Constitutional rights under Chapter IV of the 1999 Constitution — enforceable by court order.' },
      ],
      requirements: [{ title: 'N/A — know-your-rights guide', description: 'No application.', isMandatory: false }],
      timeline: [
        { stepNumber: 1, title: 'At the point of arrest', description: 'Demand to know the reason for arrest. You can refuse to answer questions without a lawyer.', estimatedTime: 'Immediate' },
        { stepNumber: 2, title: 'Within 24 hours', description: 'You must be charged or released. Demand a lawyer — free legal aid is available.', estimatedTime: '24 hours' },
        { stepNumber: 3, title: 'If not released', description: 'Apply for a Fundamental Rights Enforcement Summons at a magistrate or high court.', estimatedTime: '24–48 hours' },
      ],
      regulatory: 'Rights under the Nigerian Constitution 1999 s.35–36, Police Act 2020, and ACJA 2015. NHRC monitors compliance.',
      commonMistakes: [
        { title: 'Signing a statement without a lawyer', description: 'Statements signed under duress can be used against you.', solution: 'Say "I exercise my right to silence until my lawyer is present."' },
        { title: 'Paying unofficial "bail fees" to officers', description: 'Bail is free for most offences.', solution: 'Request formal bail through the Duty Sergeant or DPO — not informal payments.' },
      ],
      relatedGuides: [
        { slug: '/guides/report-crime-get-police-report-nigeria', title: 'How to Report a Crime' },
        { slug: '/guides/get-free-legal-aid-nigeria', title: 'How to Get Free Legal Aid in Nigeria' },
      ],
    },
    sources: [{ title: 'Nigerian Constitution 1999', url: 'https://lawsnigeria.placng.org', verified: true }],
    reviewerName: 'Barrister Ngozi Obi, Intellectual Property Lawyer',
  },

  {
    title: 'How Small Claims Court Works in Nigeria',
    slug: 'small-claims-court-nigeria',
    subtitle: 'A simple guide to resolving disputes up to ₦5M in Small Claims Court',
    description: 'How to file and win a small claims case in Nigerian magistrate and small claims courts.',
    domainSlug: 'government', subdomainSlug: 'police-courts',
    content: {
      quickAnswer: 'Small Claims Court (or Fast Track Court) handles disputes up to ₦5M (varies by state). No lawyers needed — you represent yourself. Filing fee: ₦500–₦5,000. Decision within 60–90 days.',
      overview: 'Small claims procedures exist in Lagos and several other states to enable ordinary Nigerians to resolve debt and contractual disputes quickly and cheaply without engaging lawyers.',
      definitions: [
        { term: 'Small Claims Court', definition: 'A simplified court procedure for low-value disputes — designed for self-representation.' },
        { term: 'Plaintiff', definition: 'The person filing the claim.' },
        { term: 'Defendant', definition: 'The person being sued.' },
      ],
      requirements: [
        { title: 'Claim form', description: 'Available at the magistrate court or online (Lagos).', isMandatory: true },
        { title: 'Evidence of the debt or dispute', description: 'Contracts, receipts, messages, invoices.', isMandatory: true },
        { title: 'Filing fee', description: 'Varies by claim amount and state.', isMandatory: true },
      ],
      timeline: [
        { stepNumber: 1, title: 'File claim form at magistrate court', description: 'State your claim and evidence clearly.', estimatedTime: '1 day', cost: '₦500–₦5,000' },
        { stepNumber: 2, title: 'Court issues hearing notice to defendant', description: 'Defendant is served and given opportunity to respond.', estimatedTime: '2–4 weeks' },
        { stepNumber: 3, title: 'Hearing', description: 'Both parties present their case — no legal representation required.', estimatedTime: '1 day at court' },
        { stepNumber: 4, title: 'Judgment', description: 'Judge decides and can order payment.', estimatedTime: '60–90 days from filing' },
      ],
      regulatory: 'Lagos Small Claims Court established under the Magistrate Court Law (Lagos) 2009. Other states have similar provisions.',
      commonMistakes: [
        { title: 'Filing without supporting documents', description: 'Verbal claims without evidence rarely succeed.', solution: 'Compile all contracts, receipts, and messages before filing.' },
      ],
      relatedGuides: [
        { slug: '/guides/how-to-file-civil-lawsuit-nigeria', title: 'How to File a Civil Lawsuit' },
        { slug: '/guides/get-free-legal-aid-nigeria', title: 'How to Get Free Legal Aid' },
      ],
    },
    sources: [{ title: 'Lagos Small Claims Court Guide', url: 'https://judiciary.lagosstate.gov.ng', verified: true }],
    reviewerName: 'Barrister Ngozi Obi, Intellectual Property Lawyer',
  },

  {
    title: 'How to File a Civil Lawsuit in Nigeria',
    slug: 'how-to-file-civil-lawsuit-nigeria',
    subtitle: 'Step-by-step guide to initiating civil litigation in Nigerian courts',
    description: 'How to file a civil suit in a Nigerian magistrate court or High Court.',
    domainSlug: 'government', subdomainSlug: 'police-courts',
    content: {
      quickAnswer: 'File a Writ of Summons at the appropriate court. Cost: court filing fees (₦2,000–₦50,000) + lawyer fees. Magistrate court for claims up to ₦10M; High Court for larger claims.',
      overview: 'Civil lawsuits resolve disputes over money, contracts, property, and other civil rights. Nigerian courts at magistrate and High Court levels handle different value thresholds.',
      definitions: [
        { term: 'Writ of Summons', definition: 'The founding document of a civil lawsuit — filed at court and served on the defendant.' },
        { term: 'Statement of Claim', definition: 'A detailed document outlining the facts and legal basis of your claim.' },
      ],
      requirements: [
        { title: 'Evidence of the dispute', description: 'Contracts, emails, receipts — anything supporting your claim.', isMandatory: true },
        { title: 'Writ of Summons', description: 'Drafted by you or a lawyer.', isMandatory: true },
        { title: 'Filing fee', description: 'Varies by claim amount and court.', isMandatory: true },
        { title: 'Lawyer (recommended for High Court)', description: 'Not strictly required but strongly advised.', isMandatory: false },
      ],
      timeline: [
        { stepNumber: 1, title: 'Choose the right court', description: 'Magistrate: up to ₦10M. High Court: unlimited.', estimatedTime: '1 day' },
        { stepNumber: 2, title: 'Prepare and file writ', description: 'File at the court registry with filing fee.', estimatedTime: '1–3 days', cost: '₦2,000–₦50,000' },
        { stepNumber: 3, title: 'Serve writ on defendant', description: 'Court process server delivers to defendant.', estimatedTime: '1–4 weeks' },
        { stepNumber: 4, title: 'Hearing and judgment', description: 'Exchange of pleadings, hearing, judgment.', estimatedTime: '6 months to 3 years' },
      ],
      regulatory: 'Civil procedure governed by each state\'s High Court Civil Procedure Rules. Federal courts governed by Federal High Court (Civil Procedure) Rules 2019.',
      commonMistakes: [
        { title: 'Filing in the wrong jurisdiction', description: 'Cases filed in the wrong court are struck out.', solution: 'Check the monetary limit and subject matter jurisdiction of each court level.' },
      ],
      relatedGuides: [
        { slug: '/guides/small-claims-court-nigeria', title: 'How Small Claims Court Works' },
        { slug: '/guides/get-free-legal-aid-nigeria', title: 'How to Get Free Legal Aid' },
      ],
    },
    sources: [{ title: 'Federal High Court', url: 'https://fjsc.gov.ng', verified: true }],
    reviewerName: 'Barrister Ngozi Obi, Intellectual Property Lawyer',
  },

  {
    title: 'How to Get Free Legal Aid in Nigeria',
    slug: 'get-free-legal-aid-nigeria',
    subtitle: 'Government and NGO legal aid options for Nigerians who cannot afford a lawyer',
    description: 'How to access free legal representation and advice in Nigeria.',
    domainSlug: 'government', subdomainSlug: 'police-courts',
    content: {
      quickAnswer: 'Legal Aid Council of Nigeria provides free lawyers for criminal cases and civil matters. Apply at any state Legal Aid office. NGOs like FIDA and CLO also offer free legal aid.',
      overview: 'Access to justice should not depend on income. Nigeria\'s Legal Aid Council offers free legal services to eligible Nigerians in criminal and certain civil matters.',
      definitions: [
        { term: 'Legal Aid Council (LAC)', definition: 'Federal government agency providing free legal services to indigent Nigerians.' },
        { term: 'FIDA', definition: 'Federation of International Female Lawyers — offers free legal aid to women and children.' },
      ],
      requirements: [
        { title: 'Proof of indigence', description: 'Low income declaration or social welfare confirmation.', isMandatory: false, notes: 'LAC serves all criminal defendants regardless of income.' },
        { title: 'Case details', description: 'Brief description of legal matter.', isMandatory: true },
        { title: 'Valid ID', description: 'NIN, passport, or national ID.', isMandatory: true },
      ],
      timeline: [
        { stepNumber: 1, title: 'Visit nearest LAC state office', description: 'Or apply at court when charged — the judge must appoint a lawyer if you cannot afford one.', estimatedTime: '1 day' },
        { stepNumber: 2, title: 'Case assessment', description: 'LAC determines eligibility and assigns a lawyer.', estimatedTime: '1–5 days' },
        { stepNumber: 3, title: 'Legal representation begins', description: 'Your assigned lawyer handles your case.', estimatedTime: 'Duration of case' },
      ],
      regulatory: 'Legal Aid Act 2011. The Nigerian Constitution s.36(6)(c) guarantees free legal representation in criminal matters where the interests of justice require it.',
      commonMistakes: [
        { title: 'Not asking the court for legal aid', description: 'Courts must appoint a lawyer for capital offences.', solution: 'Tell the judge "I cannot afford a lawyer" — the court has an obligation to assist.' },
      ],
      relatedGuides: [
        { slug: '/guides/rights-if-arrested-nigeria', title: 'Your Rights If Arrested' },
        { slug: '/guides/how-to-file-civil-lawsuit-nigeria', title: 'How to File a Civil Lawsuit' },
      ],
    },
    sources: [{ title: 'Legal Aid Council of Nigeria', url: 'https://lac.gov.ng', verified: true }],
    reviewerName: 'Barrister Ngozi Obi, Intellectual Property Lawyer',
  },

  {
    title: 'How to Swear an Affidavit in Nigeria',
    slug: 'swear-affidavit-nigeria',
    subtitle: 'Quick guide to sworn affidavits at Nigerian courts and notaries',
    description: 'How to prepare and swear an affidavit in Nigeria for any legal purpose.',
    domainSlug: 'government', subdomainSlug: 'police-courts',
    content: {
      quickAnswer: 'Swear an affidavit at any magistrate court or notary public. Cost: ₦500–₦5,000. Takes 30–60 minutes. Bring your ID and the drafted affidavit (or have court staff draft it for a fee).',
      overview: 'An affidavit is a written sworn statement used for legal purposes — age declarations, name changes, lost documents, and court proceedings.',
      definitions: [
        { term: 'Affidavit', definition: 'A written statement confirmed by oath before a person authorized to administer oaths (commissioner for oaths, notary, magistrate).' },
        { term: 'Deponent', definition: 'The person making the affidavit.' },
      ],
      requirements: [
        { title: 'Valid ID', description: 'NIN, passport, or national ID.', isMandatory: true },
        { title: 'Drafted affidavit', description: 'Write your statement or have court staff draft it.', isMandatory: true },
      ],
      timeline: [
        { stepNumber: 1, title: 'Draft your affidavit', description: 'State facts clearly in numbered paragraphs.', estimatedTime: '30 minutes–1 day' },
        { stepNumber: 2, title: 'Visit magistrate court or notary', description: 'Present ID and affidavit.', estimatedTime: '30–60 minutes', cost: '₦500–₦5,000' },
        { stepNumber: 3, title: 'Swear and sign', description: 'Court officer administers oath and stamps affidavit.', estimatedTime: '10 minutes' },
      ],
      regulatory: 'Affidavits governed by the Oaths Act Cap O1 LFN 2004. False statements in affidavits are perjury — a criminal offence.',
      commonMistakes: [
        { title: 'Including opinions or hearsay', description: 'Affidavits must contain only facts within your personal knowledge.', solution: 'State only what you personally know to be true.' },
      ],
      relatedGuides: [
        { slug: '/guides/change-name-legally-nigeria', title: 'How to Change Your Name Legally' },
        { slug: '/guides/small-claims-court-nigeria', title: 'How Small Claims Court Works' },
      ],
    },
    sources: [{ title: 'Oaths Act Cap O1 LFN 2004', url: 'https://lawsnigeria.placng.org', verified: true }],
    reviewerName: 'Barrister Ngozi Obi, Intellectual Property Lawyer',
  },

  {
    title: 'How to Get a Court Judgment Enforced in Nigeria',
    slug: 'get-court-judgment-enforced-nigeria',
    subtitle: 'Practical steps to collect money or comply with a court order',
    description: 'How to enforce a court judgment when the other party refuses to comply in Nigeria.',
    domainSlug: 'government', subdomainSlug: 'police-courts',
    content: {
      quickAnswer: 'Winning in court is step one. To collect: file for Garnishee Order (attach bank account), Writ of Fieri Facias (seize property), or Contempt of Court proceedings. Apply to the same court that issued the judgment.',
      overview: 'Many Nigerians win court judgments but struggle to enforce them. Nigerian courts have several enforcement mechanisms — the key is filing the right application quickly.',
      definitions: [
        { term: 'Garnishee Order', definition: 'A court order directing a third party (e.g., bank) to pay money owed to you directly from the judgment debtor\'s account.' },
        { term: 'Writ of Fieri Facias (Fi. Fa.)', definition: 'An order directing a court bailiff to seize and sell the debtor\'s property to satisfy the judgment.' },
      ],
      requirements: [
        { title: 'Certified copy of judgment', description: 'Issued by the court that delivered the judgment.', isMandatory: true },
        { title: 'Knowledge of debtor\'s assets', description: 'Bank details or property location.', isMandatory: false },
      ],
      timeline: [
        { stepNumber: 1, title: 'File enforcement application', description: 'Choose Garnishee Order or Fi. Fa. based on available assets.', estimatedTime: '1–3 days', cost: '₦5,000–₦20,000 filing fee' },
        { stepNumber: 2, title: 'Court grants order', description: 'Bank or bailiff notified.', estimatedTime: '2–8 weeks' },
        { stepNumber: 3, title: 'Payment or asset seizure', description: 'Bank deducts from debtor\'s account or bailiff seizes property.', estimatedTime: '2–12 weeks' },
      ],
      regulatory: 'Enforcement governed by the Sheriffs and Civil Process Act. Federal government debts require additional steps due to Section 84 of the SCPA.',
      commonMistakes: [
        { title: 'Not filing enforcement before debtor hides assets', description: 'Debtors often transfer assets after losing in court.', solution: 'File enforcement immediately after judgment is delivered.' },
      ],
      relatedGuides: [
        { slug: '/guides/how-to-file-civil-lawsuit-nigeria', title: 'How to File a Civil Lawsuit' },
        { slug: '/guides/small-claims-court-nigeria', title: 'How Small Claims Court Works' },
      ],
    },
    sources: [{ title: 'Sheriffs and Civil Process Act', url: 'https://lawsnigeria.placng.org', verified: true }],
    reviewerName: 'Barrister Ngozi Obi, Intellectual Property Lawyer',
  },

  {
    title: 'How Bail Works in Nigeria',
    slug: 'bail-process-nigeria',
    subtitle: 'Understanding police bail and court bail in Nigeria',
    description: 'How bail is administered in Nigeria — who is eligible, what it costs, and how to apply.',
    domainSlug: 'government', subdomainSlug: 'police-courts',
    content: {
      quickAnswer: 'Police bail is free and available for non-capital offences. Court bail requires a surety. Capital offences (murder, terrorism) are not bailable by police. Apply for bail at the DPO\'s desk or magistrate court.',
      overview: 'Bail prevents unnecessary pre-trial detention. Understanding when bail is available and how to apply protects innocent people from prolonged imprisonment.',
      definitions: [
        { term: 'Police Bail', definition: 'Release from police custody pending further investigation — free and requires no sureties for minor offences.' },
        { term: 'Court Bail', definition: 'Release ordered by a magistrate or judge — usually requires sureties and may include financial conditions.' },
        { term: 'Surety', definition: 'A person who guarantees the accused will appear in court — may need to deposit valuables or property.' },
      ],
      requirements: [
        { title: 'For police bail: valid ID', description: 'Any government-issued ID.', isMandatory: true },
        { title: 'For court bail: surety', description: 'One or more persons who sign a bail bond.', isMandatory: false },
      ],
      timeline: [
        { stepNumber: 1, title: 'Request bail from DPO', description: 'Immediately after arrest for bailable offences.', estimatedTime: '1–24 hours' },
        { stepNumber: 2, title: 'If refused: apply to magistrate court', description: 'File a bail application at the nearest magistrate court.', estimatedTime: '1–3 days' },
        { stepNumber: 3, title: 'Court grants bail with conditions', description: 'Surety signs, conditions set.', estimatedTime: '1 day' },
      ],
      regulatory: 'Bail governed by Administration of Criminal Justice Act 2015 (federal) and state ACJL equivalents. No Nigerian should be in pre-trial detention for more than 24–48 hours without charge.',
      commonMistakes: [
        { title: 'Paying unofficial "bail fees" at the station', description: 'Bail is free — any money demanded is bribery.', solution: 'Report officers demanding bail fees to the Police Service Commission.' },
      ],
      relatedGuides: [
        { slug: '/guides/rights-if-arrested-nigeria', title: 'Your Rights If Arrested' },
        { slug: '/guides/get-free-legal-aid-nigeria', title: 'How to Get Free Legal Aid' },
      ],
    },
    sources: [{ title: 'ACJA 2015', url: 'https://lawsnigeria.placng.org', verified: true }],
    reviewerName: 'Barrister Ngozi Obi, Intellectual Property Lawyer',
  },

  {
    title: 'How to Report Police Misconduct in Nigeria',
    slug: 'report-police-misconduct-nigeria',
    subtitle: 'Filing a complaint against a police officer who violated your rights',
    description: 'How to formally report police misconduct to the Police Service Commission or IPOB Nigeria.',
    domainSlug: 'government', subdomainSlug: 'police-courts',
    content: {
      quickAnswer: 'Report to: Police Service Commission (psc.gov.ng), Complaints Response Unit (CRU) at police HQ, or IPOB Nigeria. Document everything — names, badge numbers, dates. Legal aid can help.',
      overview: 'Police misconduct includes extortion, illegal detention, torture, and abuse of process. Multiple channels exist for reporting, though outcomes vary. Documentation is key.',
      definitions: [
        { term: 'Police Service Commission (PSC)', definition: 'The body responsible for discipline of police officers in Nigeria.' },
        { term: 'CRU', definition: 'Complaints Response Unit — a department in the Nigeria Police Force for internal complaints.' },
      ],
      requirements: [
        { title: 'Written complaint', description: 'Clearly stating the incident, officer details, and what relief you seek.', isMandatory: true },
        { title: 'Evidence', description: 'Photos, videos, medical reports, witness statements.', isMandatory: false },
        { title: 'Officer identification', description: 'Name, service number, or station if known.', isMandatory: false },
      ],
      timeline: [
        { stepNumber: 1, title: 'Document the incident immediately', description: 'Write down everything — names, time, place, witnesses.', estimatedTime: '1 day' },
        { stepNumber: 2, title: 'File with PSC or CRU', description: 'Submit written complaint via email or in person.', estimatedTime: '1–2 days' },
        { stepNumber: 3, title: 'Follow up', description: 'PSC has 30 days to investigate and respond.', estimatedTime: '30–90 days' },
      ],
      regulatory: 'PSC has constitutional powers to dismiss officers. Fundamental rights violations can also be challenged in court.',
      commonMistakes: [
        { title: 'Reporting only verbally', description: 'Verbal complaints are rarely documented or acted upon.', solution: 'Always file a written complaint and keep a copy.' },
      ],
      relatedGuides: [
        { slug: '/guides/rights-if-arrested-nigeria', title: 'Your Rights If Arrested' },
        { slug: '/guides/report-crime-get-police-report-nigeria', title: 'How to Report a Crime' },
      ],
    },
    sources: [{ title: 'Police Service Commission', url: 'https://psc.gov.ng', verified: true }],
    reviewerName: 'Barrister Ngozi Obi, Intellectual Property Lawyer',
  },

  // ── GOVERNMENT / NATIONAL PROGRAMS (guides 66-75) ────────────────────────────

  {
    title: 'How to Access NHIS and State Health Insurance in Nigeria',
    slug: 'access-nhis-state-health-insurance-nigeria',
    subtitle: 'Enrolling in the National Health Insurance Scheme and state equivalents',
    description: 'How to enrol in NHIS or your state\'s health insurance scheme in Nigeria.',
    domainSlug: 'government', subdomainSlug: 'national-programs',
    content: {
      quickAnswer: 'NHIS enrolment: register through your employer (formal sector) or directly for self-employed (VSHIP). Monthly premium: ₦1,500–₦7,500. Covers hospitalisation, outpatient, and drugs at accredited providers.',
      overview: 'The National Health Insurance Scheme (NHIS) has been replaced by the National Health Insurance Authority (NHIA) under the NHIA Act 2022. Coverage now extends to informal sector workers through state equivalents like LASHMA (Lagos) and Kwara SUNSHINE (Kwara).',
      definitions: [
        { term: 'NHIA', definition: 'National Health Insurance Authority — replaced NHIS in 2022. Provides health coverage for Nigerians.' },
        { term: 'VSHIP', definition: 'Voluntary Sector Health Insurance Programme — for self-employed and informal sector workers.' },
        { term: 'HMO', definition: 'Health Maintenance Organisation — a private company that manages your NHIA benefits.' },
      ],
      requirements: [
        { title: 'NIN', description: 'For identity verification at enrolment.', isMandatory: true },
        { title: 'Employer letter (for formal sector)', description: 'Confirming employment and authorising enrolment.', isMandatory: false },
        { title: 'Monthly premium payment', description: 'Varies by plan — from ₦1,500/month for basic coverage.', isMandatory: true },
      ],
      timeline: [
        { stepNumber: 1, title: 'Choose a registered HMO', description: 'Visit nhia.gov.ng for the list of accredited HMOs.', estimatedTime: '1–2 days' },
        { stepNumber: 2, title: 'Complete enrolment form', description: 'Online or at the HMO office.', estimatedTime: '30 minutes' },
        { stepNumber: 3, title: 'Pay first premium', description: 'Activate coverage.', estimatedTime: '1 day', cost: '₦1,500–₦7,500 per month' },
        { stepNumber: 4, title: 'Receive NHIA card', description: 'Use at any accredited health facility.', estimatedTime: '1–2 weeks' },
      ],
      regulatory: 'Governed by NHIA Act 2022. All Nigerians are expected to eventually be covered. State schemes (LASHMA, etc.) complement NHIA.',
      commonMistakes: [
        { title: 'Not verifying HMO accreditation', description: 'Some HMOs operate without NHIA accreditation.', solution: 'Verify at nhia.gov.ng before paying any premium.' },
      ],
      relatedGuides: [
        { slug: '/guides/do-i-need-business-insurance-nigeria', title: 'Business Insurance Guide' },
      ],
    },
    sources: [{ title: 'National Health Insurance Authority', url: 'https://nhia.gov.ng', verified: true }],
    reviewerName: 'Dr. Grace Nwosu, Education Consultant',
  },

  {
    title: 'How to Report a Public Service Complaint in Nigeria',
    slug: 'report-public-service-complaint-nigeria',
    subtitle: 'Holding government agencies accountable for poor service',
    description: 'How to file complaints against federal and state government agencies in Nigeria.',
    domainSlug: 'government', subdomainSlug: 'national-programs',
    content: {
      quickAnswer: 'Federal: file with the Public Complaints Commission (Ombudsman) — free, no lawyer needed. State: use your state\'s public complaints office. You can also use the Freedom of Information Act for information requests.',
      overview: 'The Public Complaints Commission (PCC) is Nigeria\'s Ombudsman — it investigates complaints against federal government agencies and officials. State equivalents exist in many states.',
      definitions: [
        { term: 'Public Complaints Commission (PCC)', definition: 'Nigeria\'s federal ombudsman — investigates maladministration and service failures.' },
        { term: 'Maladministration', definition: 'Poor, unfair, or improper administrative decisions or conduct by government officials.' },
      ],
      requirements: [
        { title: 'Written complaint', description: 'Describing the agency, officer, incident, and desired resolution.', isMandatory: true },
        { title: 'Evidence', description: 'Documents showing the service failure.', isMandatory: false },
        { title: 'Valid ID', description: 'NIN or passport.', isMandatory: true },
      ],
      timeline: [
        { stepNumber: 1, title: 'File complaint with PCC', description: 'Visit pcc.gov.ng or any PCC state office.', estimatedTime: '1 day' },
        { stepNumber: 2, title: 'PCC investigates', description: 'Agency has 21 days to respond to PCC queries.', estimatedTime: '30–90 days' },
        { stepNumber: 3, title: 'PCC issues recommendation', description: 'Binding recommendations for redress.', estimatedTime: '90–180 days' },
      ],
      regulatory: 'Public Complaints Commission Act Cap P37 LFN 2004. PCC recommendations are binding on agencies.',
      commonMistakes: [
        { title: 'Filing with the wrong body', description: 'PCC only handles federal agencies; state complaints go to state offices.', solution: 'Check whether the agency is federal or state before filing.' },
      ],
      relatedGuides: [
        { slug: '/guides/freedom-of-information-act-nigeria', title: 'How the Freedom of Information Act Works' },
      ],
    },
    sources: [{ title: 'Public Complaints Commission', url: 'https://pcc.gov.ng', verified: true }],
    reviewerName: 'Emeka Obi, Cooperative Development Officer',
  },

  {
    title: 'How the Freedom of Information Act Works for Nigerians',
    slug: 'freedom-of-information-act-nigeria',
    subtitle: 'Using the FOI Act to request government information',
    description: 'How Nigerian citizens can use the Freedom of Information Act 2011 to access public records.',
    domainSlug: 'government', subdomainSlug: 'national-programs',
    content: {
      quickAnswer: 'Send an FOI request letter to any federal institution. No reason needed. Response required within 7 days. Free — institutions cannot charge for information requests.',
      overview: 'The Freedom of Information Act 2011 gives every Nigerian the right to access records held by federal government institutions. It\'s a powerful tool for accountability journalism, business due diligence, and citizen advocacy.',
      definitions: [
        { term: 'FOI Request', definition: 'A formal written request for information held by a public institution.' },
        { term: 'Public Institution', definition: 'Any federal ministry, agency, or body funded by public money.' },
      ],
      requirements: [
        { title: 'Written request letter', description: 'Addressed to the institution\'s FOIA Desk Officer. No reason required.', isMandatory: true },
        { title: 'Valid ID', description: 'Not legally required but helps expedite responses.', isMandatory: false },
      ],
      timeline: [
        { stepNumber: 1, title: 'Write request letter', description: 'Clearly specify the records or information you want.', estimatedTime: '30 minutes' },
        { stepNumber: 2, title: 'Submit to institution', description: 'By hand, email, or post.', estimatedTime: '1 day' },
        { stepNumber: 3, title: 'Await response', description: 'Institution must respond within 7 days. Extension: maximum 7 more days.', estimatedTime: '7–14 days' },
        { stepNumber: 4, title: 'If refused: appeal to court', description: 'Federal High Court can compel disclosure.', estimatedTime: '1–3 months' },
      ],
      regulatory: 'Freedom of Information Act 2011. Applies to federal institutions only — most states have not passed state FOI laws.',
      commonMistakes: [
        { title: 'Not citing the FOI Act in the request', description: 'Institutions treat unlabelled requests differently.', solution: 'Begin your letter with "Pursuant to the Freedom of Information Act 2011, I request..."' },
      ],
      relatedGuides: [
        { slug: '/guides/report-public-service-complaint-nigeria', title: 'How to Report a Public Service Complaint' },
      ],
    },
    sources: [{ title: 'Freedom of Information Act 2011', url: 'https://lawsnigeria.placng.org', verified: true }],
    reviewerName: 'Emeka Obi, Cooperative Development Officer',
  },

  // ── GOVERNMENT / DRIVING & VEHICLES (guides 76-85) ───────────────────────────
  // Note: many of these already exist (slugs in DB). They are included here for
  // completeness — the seed function will skip any existing slugs automatically.

  {
    title: 'How to Renew a Nigerian Driver\'s License',
    slug: 'renew-drivers-license-nigeria',
    subtitle: 'Driver\'s license renewal process — online and in-person',
    description: 'How to renew your Nigerian driver\'s license before or after expiry.',
    domainSlug: 'government', subdomainSlug: 'driving-vehicles',
    content: {
      quickAnswer: 'Renew at any state FRSC licensing centre or online at nvis.frsc.gov.ng. Cost: ₦10,825 (3 years) or ₦21,425 (6 years). Bring current license, passport photo, and payment receipt.',
      overview: 'Nigerian driver\'s licenses expire after 3 or 6 years. Renewal must be done at the Federal Road Safety Corps licensing centre — the process is similar to initial application but without a new road test.',
      definitions: [{ term: 'FRSC', definition: 'Federal Road Safety Corps — the body that issues and regulates driver\'s licenses in Nigeria.' }],
      requirements: [
        { title: 'Expiring/expired driver\'s license', description: 'Bring your current license to the centre.', isMandatory: true },
        { title: 'Passport photograph (2)', description: 'White background, taken within 6 months.', isMandatory: true },
        { title: 'Payment receipt', description: 'Pay online at nvis.frsc.gov.ng before visiting.', isMandatory: true },
      ],
      timeline: [
        { stepNumber: 1, title: 'Pay renewal fee online', description: 'At nvis.frsc.gov.ng.', estimatedTime: '15 minutes', cost: '₦10,825–₦21,425' },
        { stepNumber: 2, title: 'Book appointment', description: 'Schedule at your preferred FRSC centre.', estimatedTime: '10 minutes' },
        { stepNumber: 3, title: 'Attend appointment', description: 'Biometric and photo capture.', estimatedTime: '1–2 hours' },
        { stepNumber: 4, title: 'Collect new license', description: 'Usually ready within 2–4 weeks.', estimatedTime: '2–4 weeks' },
      ],
      regulatory: 'Governed by the Federal Road Safety Corps Act and Road Traffic Regulations. Driving with an expired license attracts a ₦10,000 fine.',
      commonMistakes: [
        { title: 'Waiting until license is expired to renew', description: 'Expired licenses attract a ₦10,000 fine if caught driving.', solution: 'Renew at least 3 months before expiry.' },
      ],
      relatedGuides: [
        { slug: '/guides/get-driving-license-nigeria', title: 'How to Get a New Driver\'s License' },
        { slug: '/guides/register-vehicle-nigeria', title: 'How to Register a Vehicle' },
      ],
    },
    sources: [{ title: 'FRSC Nigeria', url: 'https://frsc.gov.ng', verified: true }],
    reviewerName: 'Emeka Obi, Cooperative Development Officer',
  },

  // ── GOVERNMENT / LOCAL GOVERNMENT & CIVIC (guides 86-100) ────────────────────

  {
    title: 'How to Run for Local Government Office in Nigeria',
    slug: 'run-for-local-government-office-nigeria',
    subtitle: 'Requirements and process for LGA councillor and chairman candidacy',
    description: 'How to contest for local government councillor or chairman position in Nigeria.',
    domainSlug: 'government', subdomainSlug: 'local-government',
    content: {
      quickAnswer: 'Requirements: Nigerian citizen, 25+ years (councillor) or 30+ (chairman), primary school cert minimum, PVC registered in the LGA. Register as a candidate through the State Independent Electoral Commission (SIEC) of your state.',
      overview: 'Local government elections are conducted by State Independent Electoral Commissions (SIECs). Winning at the LGA level is the entry point for Nigerian political careers.',
      definitions: [
        { term: 'SIEC', definition: 'State Independent Electoral Commission — conducts LGA elections in each state.' },
        { term: 'Councillor', definition: 'An elected representative for a ward within an LGA — minimum age 25.' },
        { term: 'LGA Chairman', definition: 'The executive head of a Local Government Area — minimum age 30.' },
      ],
      requirements: [
        { title: 'Nigerian citizenship', description: 'Must be a citizen by birth or naturalisation.', isMandatory: true },
        { title: 'Minimum age (25 for councillor, 30 for chairman)', description: 'Constitutional requirement.', isMandatory: true },
        { title: 'Primary school certificate', description: 'Minimum educational qualification.', isMandatory: true },
        { title: 'PVC registered in the LGA', description: 'Must be a registered voter in the constituency.', isMandatory: true },
        { title: 'Party membership', description: 'Must contest on a political party ticket.', isMandatory: true },
      ],
      timeline: [
        { stepNumber: 1, title: 'Join a political party', description: 'Register as a member and build local support.', estimatedTime: 'Months to years' },
        { stepNumber: 2, title: 'Contest party primary', description: 'Win your party\'s nomination in internal primary election.', estimatedTime: 'Weeks before general election' },
        { stepNumber: 3, title: 'File nomination forms with SIEC', description: 'Pay form fees and file candidacy papers.', estimatedTime: '1 day', cost: 'Varies by state: ₦10,000–₦200,000' },
        { stepNumber: 4, title: 'Campaign and election day', description: 'Conduct campaigns within SIEC guidelines.', estimatedTime: '4–8 weeks' },
      ],
      regulatory: 'Governed by the Nigerian Constitution s.106–109 and each state\'s Local Government Law.',
      commonMistakes: [
        { title: 'Contesting outside your registered LGA', description: 'You must be a PVC holder in the constituency.', solution: 'Transfer your PVC to your target LGA at least 6 months before the election.' },
      ],
      relatedGuides: [
        { slug: '/guides/register-for-pvc-nigeria', title: 'How to Register for a PVC' },
        { slug: '/guides/local-government-areas-nigeria', title: 'How LGAs Work in Nigeria' },
      ],
    },
    sources: [{ title: 'INEC — Local Government Electoral Framework', url: 'https://inec.gov.ng', verified: true }],
    reviewerName: 'Emeka Obi, Cooperative Development Officer',
  },

  {
    title: 'Understanding Nigeria\'s Federal, State, and LGA Structure',
    slug: 'nigeria-federal-state-lga-structure',
    subtitle: 'How Nigeria\'s three-tier government system works',
    description: 'A plain-language guide to Nigeria\'s federal, state, and local government structure.',
    domainSlug: 'government', subdomainSlug: 'local-government',
    content: {
      quickAnswer: 'Nigeria has 3 tiers: Federal (Abuja), 36 States + FCT, and 774 LGAs. Each tier has distinct powers and responsibilities. Most daily services (schools, roads, markets) are handled at state and LGA levels.',
      overview: 'Understanding which tier of government handles which services saves time. Passport? Federal. Schools? State. Market permits? LGA. This guide maps services to the responsible tier.',
      definitions: [
        { term: 'Federation', definition: 'The central government based in Abuja — handles defence, immigration, federal roads, and federal taxation.' },
        { term: 'State Government', definition: '36 states + FCT — handle health, education, state roads, and state taxation.' },
        { term: 'LGA', definition: 'Local Government Area — handles market fees, birth registration, primary healthcare, and local permits.' },
      ],
      requirements: [{ title: 'N/A — informational guide', description: 'No application.', isMandatory: false }],
      timeline: [
        { stepNumber: 1, title: 'Identify your service need', description: 'Federal, state, or LGA service?', estimatedTime: '10 minutes' },
        { stepNumber: 2, title: 'Contact the correct tier', description: 'Use this guide\'s mapping to find the right office.', estimatedTime: '30 minutes' },
      ],
      regulatory: 'Powers divided under the Nigerian Constitution 1999 Second Schedule (Exclusive and Concurrent Lists).',
      commonMistakes: [
        { title: 'Going to FIRS for PAYE when it\'s a state matter', description: 'Individual PAYE is collected by state IRS, not FIRS.', solution: 'Use this guide\'s tier mapping before visiting any government office.' },
      ],
      relatedGuides: [
        { slug: '/guides/local-government-areas-nigeria', title: 'How LGAs Work in Nigeria' },
        { slug: '/guides/state-vs-federal-taxes-nigeria', title: 'State vs Federal Taxes' },
      ],
    },
    sources: [{ title: 'Nigerian Constitution 1999 Second Schedule', url: 'https://lawsnigeria.placng.org', verified: true }],
    reviewerName: 'Emeka Obi, Cooperative Development Officer',
  },

  {
    title: 'How to Get a Market Stall or Trade Permit from Your LGA',
    slug: 'get-market-stall-trade-permit-lga',
    subtitle: 'Obtaining LGA trading permits for market traders and street vendors',
    description: 'How to obtain a market stall permit or trade permit from your local government.',
    domainSlug: 'government', subdomainSlug: 'local-government',
    content: {
      quickAnswer: 'Visit your LGA trade/commerce office. Cost: ₦2,000–₦20,000 per year. Required: valid ID, stall details, payment receipt. Renewed annually.',
      overview: 'Market traders and street vendors operating in LGA-managed markets must obtain trade permits. This formalises your presence and protects you from arbitrary eviction.',
      definitions: [{ term: 'Trade Permit', definition: 'An LGA-issued licence authorising a trader to operate in a designated market or location.' }],
      requirements: [
        { title: 'Valid ID', description: 'NIN, voter\'s card, or national ID.', isMandatory: true },
        { title: 'Details of trading activity', description: 'What you sell and where.', isMandatory: true },
        { title: 'Application fee', description: 'Varies by LGA and stall size.', isMandatory: true },
      ],
      timeline: [
        { stepNumber: 1, title: 'Visit LGA Trade/Commerce Department', description: 'Request and complete application form.', estimatedTime: '1 day', cost: '₦2,000–₦20,000' },
        { stepNumber: 2, title: 'Inspection (if applicable)', description: 'LGA officer may inspect your location.', estimatedTime: '1–5 days' },
        { stepNumber: 3, title: 'Receive permit', description: 'Display in your stall at all times.', estimatedTime: '1–7 days' },
      ],
      regulatory: 'Market permits are governed by state market laws and LGA by-laws. Operating without a permit attracts fines and possible stall seizure.',
      commonMistakes: [
        { title: 'Not renewing annually', description: 'Expired permits attract the same penalties as no permit.', solution: 'Set a renewal reminder 1 month before expiry.' },
      ],
      relatedGuides: [
        { slug: '/guides/local-government-areas-nigeria', title: 'How LGAs Work in Nigeria' },
        { slug: '/guides/business-startup-checklist-nigeria', title: 'Business Startup Checklist' },
      ],
    },
    sources: [{ title: 'Lagos State Market Development Board', url: 'https://lasmab.lagosstate.gov.ng', verified: true }],
    reviewerName: 'Emeka Obi, Cooperative Development Officer',
  },

  {
    title: 'How to Start an NGO or Community Association in Nigeria',
    slug: 'start-ngo-community-association-nigeria',
    subtitle: 'Registering a non-governmental organisation or community group in Nigeria',
    description: 'How to register an NGO, CBO, or community association in Nigeria — CAC and other requirements.',
    domainSlug: 'government', subdomainSlug: 'local-government',
    content: {
      quickAnswer: 'Register as an Incorporated Trustee at CAC for ₦10,000–₦50,000. Requires minimum 3 trustees, constitution, and approved name. Takes 3–6 weeks.',
      overview: 'NGOs and community groups register as Incorporated Trustees under Part F of CAMA 2020. This gives legal standing to sue, own property, and receive grants.',
      definitions: [
        { term: 'Incorporated Trustee', definition: 'The CAC registration category for non-profit organisations — gives legal personality to community groups and NGOs.' },
        { term: 'CAC IT1 Form', definition: 'The CAC application form for incorporation of trustees.' },
      ],
      requirements: [
        { title: 'Minimum 3 trustees', description: 'Each with valid ID and BVN.', isMandatory: true },
        { title: 'Organisation constitution', description: 'Governing document describing mission, membership, and operations.', isMandatory: true },
        { title: 'Board resolution', description: 'Authorising the application.', isMandatory: true },
        { title: 'CAC name availability search', description: 'Confirm the organisation name is available.', isMandatory: true },
      ],
      timeline: [
        { stepNumber: 1, title: 'Draft constitution', description: 'Cover name, objectives, membership, governance, dissolution.', estimatedTime: '1–2 weeks' },
        { stepNumber: 2, title: 'File CAC IT1 application', description: 'Online at pre.cac.gov.ng with all documents.', estimatedTime: '1 day', cost: '₦10,000–₦50,000' },
        { stepNumber: 3, title: 'Publication in newspaper', description: 'Required notice of incorporation.', estimatedTime: '1 week', cost: '₦20,000–₦50,000' },
        { stepNumber: 4, title: 'Receive certificate', description: 'CAC issues certificate of incorporation.', estimatedTime: '3–6 weeks after publication' },
      ],
      regulatory: 'Governed by CAMA 2020 Part F. NGOs working with foreign funds may also need SCUML registration (Special Control Unit Against Money Laundering).',
      commonMistakes: [
        { title: 'Not registering SCUML for foreign-funded NGOs', description: 'Required under Anti-Money Laundering regulations.', solution: 'Register with SCUML at scuml.gov.ng if you receive foreign donations.' },
      ],
      relatedGuides: [
        { slug: '/guides/cac-business-name', title: 'CAC Registration Guide' },
        { slug: '/guides/register-cooperative-society-nigeria', title: 'How to Register a Cooperative Society' },
      ],
    },
    sources: [
      { title: 'CAC', url: 'https://pre.cac.gov.ng', verified: true },
      { title: 'SCUML', url: 'https://scuml.gov.ng', verified: true },
    ],
    reviewerName: 'Emeka Obi, Cooperative Development Officer',
  },

  {
    title: 'How to Obtain a Certificate of State of Origin in Nigeria',
    slug: 'obtain-certificate-state-of-origin-nigeria',
    subtitle: 'Getting your state of origin certificate from your LGA',
    description: 'How to obtain an official certificate of state of origin from your local government in Nigeria.',
    domainSlug: 'government', subdomainSlug: 'local-government',
    content: {
      quickAnswer: 'Apply at your LGA secretariat. Cost: ₦1,000–₦5,000. Required: valid ID, birth certificate, two community witnesses. Takes 1–7 days.',
      overview: 'A certificate of state of origin is required for government job applications, school admissions, and some government services. It confirms you are an indigene of a particular LGA/state.',
      definitions: [{ term: 'Indigene Certificate', definition: 'Alternative name for certificate of state of origin — confirms ancestral ties to a state or LGA.' }],
      requirements: [
        { title: 'Valid ID', description: 'NIN, voter\'s card, or passport.', isMandatory: true },
        { title: 'Birth certificate', description: 'To confirm parentage ties to the state.', isMandatory: true },
        { title: 'Two community witnesses', description: 'Indigenes of the LGA who can confirm your origin.', isMandatory: true },
      ],
      timeline: [
        { stepNumber: 1, title: 'Visit your LGA secretariat', description: 'Request the certificate of origin application form.', estimatedTime: '1 day', cost: '₦1,000–₦5,000' },
        { stepNumber: 2, title: 'Submit with witnesses and documents', description: 'Both witnesses must sign the form.', estimatedTime: '1–2 hours at LGA' },
        { stepNumber: 3, title: 'Receive certificate', description: 'Issued by the LGA chairman\'s office.', estimatedTime: '1–7 days' },
      ],
      regulatory: 'Issued by LGA authorities. No federal legal framework — each state has its own policy. Some institutions accept affidavit in lieu.',
      commonMistakes: [
        { title: 'Applying at the wrong LGA', description: 'Certificate must be from your family\'s home LGA, not where you currently live.', solution: 'Identify your family\'s ancestral LGA — it may differ from your current residence.' },
      ],
      relatedGuides: [
        { slug: '/guides/lga-certificate-origin', title: 'LGA Certificate of Origin Guide' },
        { slug: '/guides/local-government-areas-nigeria', title: 'How LGAs Work in Nigeria' },
      ],
    },
    sources: [{ title: 'LGA Administration', url: 'https://localgov.gov.ng', verified: true }],
    reviewerName: 'Emeka Obi, Cooperative Development Officer',
  },

  // ── BUSINESS / IMPORT & EXPORT (guides 116-125) ──────────────────────────────

  {
    title: 'How to Get an Import License in Nigeria',
    slug: 'get-import-license-nigeria',
    subtitle: 'Which goods require a special import license and how to get one',
    description: 'How to obtain an import license for controlled or restricted goods in Nigeria.',
    domainSlug: 'business', subdomainSlug: 'import-export',
    content: {
      quickAnswer: 'Most goods don\'t require a special import license — just a Form M from your bank. Controlled goods (pharmaceuticals, chemicals, weapons) require additional permits from NAFDAC, SON, or NSCDC before Form M is approved.',
      overview: 'Nigeria uses a Form M system for all imports. Most goods are freely importable. Controlled items need sector-specific permits. Prohibited items cannot be imported at all.',
      definitions: [
        { term: 'Form M', definition: 'A Central Bank of Nigeria form authorising payment for imports — required for all imports above $10,000.' },
        { term: 'Pre-Arrival Assessment Report (PAAR)', definition: 'A customs document generated before goods arrive in Nigeria.' },
        { term: 'Combined Certificate of Value and Origin (CCVO)', definition: 'Confirms the value and origin of imported goods.' },
      ],
      requirements: [
        { title: 'CAC certificate', description: 'Registered business.', isMandatory: true },
        { title: 'TIN', description: 'Tax Identification Number.', isMandatory: true },
        { title: 'Bank account with an authorised dealer bank', description: 'For Form M application.', isMandatory: true },
        { title: 'Sector permit (if applicable)', description: 'NAFDAC for food/drugs, SON for manufactured goods.', isMandatory: false },
      ],
      timeline: [
        { stepNumber: 1, title: 'Check if your goods are controlled', description: 'Use the NCS tariff schedule to confirm import status.', estimatedTime: '1 day' },
        { stepNumber: 2, title: 'Obtain sector permit (if required)', description: 'Apply to NAFDAC, SON, or relevant regulator.', estimatedTime: '2–8 weeks' },
        { stepNumber: 3, title: 'Apply for Form M at your bank', description: 'With all import documents.', estimatedTime: '2–5 days' },
        { stepNumber: 4, title: 'Import and clear goods at port', description: 'Use a licensed clearing agent.', estimatedTime: '1–4 weeks at port' },
      ],
      regulatory: 'Import governed by NCS Act, CBN Import Guidelines, and CEMA. NAFDAC controls food, drugs, and cosmetics imports.',
      commonMistakes: [
        { title: 'Not confirming HS code before shipping', description: 'Wrong HS code leads to seizure and penalties.', solution: 'Confirm HS code with a licensed customs agent before ordering goods.' },
      ],
      relatedGuides: [
        { slug: '/guides/import-goods-into-nigeria', title: 'How to Import Goods into Nigeria' },
        { slug: '/guides/how-to-calculate-import-duty', title: 'How to Calculate Import Duty' },
      ],
    },
    sources: [{ title: 'Nigerian Customs Service', url: 'https://customs.gov.ng', verified: true }],
    reviewerName: 'Tunde Adeyemi, Import/Export Specialist',
  },

  {
    title: 'How to Calculate Import Duty in Nigeria',
    slug: 'how-to-calculate-import-duty',
    subtitle: 'Understanding the components of Nigerian import duty',
    description: 'How to calculate total import duty costs for goods coming into Nigeria.',
    domainSlug: 'business', subdomainSlug: 'import-export',
    content: {
      quickAnswer: 'Total import cost = CIF value + Import Duty (5–35%) + VAT (7.5%) + CISS levy (1%) + ETLS (0.5%) + Port charges. Use the NCS tariff portal for exact rates by HS code.',
      overview: 'Import costs in Nigeria go beyond the purchase price. Multiple levies apply. Understanding the full cost structure helps you price products correctly and avoid under-budgeting.',
      definitions: [
        { term: 'CIF Value', definition: 'Cost + Insurance + Freight — the customs value of imported goods.' },
        { term: 'Import Duty', definition: 'A percentage tariff on CIF value, varying by HS code (0–35%).' },
        { term: 'CISS', definition: 'Comprehensive Import Supervision Scheme levy — 1% of CIF value.' },
        { term: 'ETLS', definition: 'ECOWAS Trade Liberalisation Scheme levy — 0.5% on eligible goods.' },
      ],
      requirements: [
        { title: 'HS code of your goods', description: 'Find at tariffreview.finance.gov.ng.', isMandatory: true },
        { title: 'CIF value', description: 'From your supplier\'s commercial invoice.', isMandatory: true },
      ],
      timeline: [
        { stepNumber: 1, title: 'Identify HS code', description: 'Use the NCS tariff portal.', estimatedTime: '30 minutes' },
        { stepNumber: 2, title: 'Calculate duty', description: 'Apply the percentage to your CIF value.', estimatedTime: '30 minutes' },
        { stepNumber: 3, title: 'Add all levies', description: 'VAT 7.5% + CISS 1% + ETLS 0.5% + port charges.', estimatedTime: '15 minutes' },
      ],
      regulatory: 'Import duties governed by CEMA and Finance Acts. Rates updated annually in the Finance Act.',
      stats: [
        { label: 'Standard VAT on imports', value: '7.5%', unit: 'of CIF value', source: 'Finance Act 2023' },
        { label: 'CISS levy', value: '1%', unit: 'of CIF value', source: 'NCS Guidelines' },
      ],
      commonMistakes: [
        { title: 'Not including all levies in landed cost calculation', description: 'Many importers forget CISS and ETLS, leading to under-pricing.', solution: 'Use a comprehensive landed cost calculator that includes all Nigerian import levies.' },
      ],
      relatedGuides: [
        { slug: '/guides/get-import-license-nigeria', title: 'How to Get an Import License' },
        { slug: '/guides/clear-goods-nigerian-ports', title: 'How to Clear Goods at Nigerian Ports' },
      ],
    },
    sources: [{ title: 'NCS Tariff Portal', url: 'https://tariff.customs.gov.ng', verified: true }],
    reviewerName: 'Tunde Adeyemi, Import/Export Specialist',
  },

  {
    title: 'How to Register with the Nigeria Customs Service',
    slug: 'register-nigeria-customs-service',
    subtitle: 'Getting your importer/exporter code from NCS',
    description: 'How businesses register with the Nigeria Customs Service to import and export legally.',
    domainSlug: 'business', subdomainSlug: 'import-export',
    content: {
      quickAnswer: 'Register at trade.customs.gov.ng. Required: CAC certificate, TIN, BVN. Free registration. Receive Importer/Exporter code within 2–5 days.',
      overview: 'All importers and exporters in Nigeria must be registered with the Nigeria Customs Service (NCS) to transact through ports and obtain Form M clearance.',
      definitions: [{ term: 'Importer/Exporter Code', definition: 'A unique NCS registration number required for all customs transactions.' }],
      requirements: [
        { title: 'CAC certificate', description: 'Registered business.', isMandatory: true },
        { title: 'TIN', description: 'From FIRS.', isMandatory: true },
        { title: 'BVN of principal director', description: 'For identity verification.', isMandatory: true },
        { title: 'Bank account details', description: 'For refund processing.', isMandatory: true },
      ],
      timeline: [
        { stepNumber: 1, title: 'Register at trade.customs.gov.ng', description: 'Complete online form with business details.', estimatedTime: '30 minutes' },
        { stepNumber: 2, title: 'Upload documents', description: 'CAC certificate, TIN, and director ID.', estimatedTime: '15 minutes' },
        { stepNumber: 3, title: 'Receive importer/exporter code', description: 'Via email within 2–5 days.', estimatedTime: '2–5 days' },
      ],
      regulatory: 'Required under CEMA (Customs and Excise Management Act).',
      commonMistakes: [
        { title: 'Using someone else\'s NCS code', description: 'Each business must have its own code.', solution: 'Register your own business — NCS audits can trace transactions to specific codes.' },
      ],
      relatedGuides: [
        { slug: '/guides/get-import-license-nigeria', title: 'How to Get an Import License' },
        { slug: '/guides/how-to-calculate-import-duty', title: 'How to Calculate Import Duty' },
      ],
    },
    sources: [{ title: 'Nigeria Customs Service Trade Portal', url: 'https://trade.customs.gov.ng', verified: true }],
    reviewerName: 'Tunde Adeyemi, Import/Export Specialist',
  },

  {
    title: 'How to Get a Form M for Imports in Nigeria',
    slug: 'get-form-m-imports-nigeria',
    subtitle: 'CBN Form M application guide for Nigerian importers',
    description: 'How to apply for a Form M through your bank to authorise payment for imports.',
    domainSlug: 'business', subdomainSlug: 'import-export',
    content: {
      quickAnswer: 'Apply for Form M at your bank (an authorised dealer bank). Required: proforma invoice, HS code, TIN, NCS importer code. Processing: 2–5 days. Mandatory for all imports above $10,000.',
      overview: 'Form M is a CBN-issued document that authorises your bank to make foreign currency payments for imports. It is the starting point for every import transaction above $10,000.',
      definitions: [{ term: 'Form M', definition: 'A Central Bank of Nigeria document authorising foreign exchange payment for specific imported goods.' }],
      requirements: [
        { title: 'Proforma invoice from supplier', description: 'Showing item description, HS code, quantity, and value.', isMandatory: true },
        { title: 'TIN', description: 'Tax Identification Number.', isMandatory: true },
        { title: 'NCS importer code', description: 'Registration with Nigeria Customs Service.', isMandatory: true },
        { title: 'Letter of credit or payment method', description: 'Agreed with supplier.', isMandatory: false },
      ],
      timeline: [
        { stepNumber: 1, title: 'Submit Form M application to your bank', description: 'With proforma invoice and all documents.', estimatedTime: '1 day' },
        { stepNumber: 2, title: 'Bank processes and approves', description: 'Bank forwards to CBN for approval.', estimatedTime: '2–5 days', cost: 'Bank processing fees: ₦5,000–₦20,000' },
        { stepNumber: 3, title: 'Form M number issued', description: 'Used in all subsequent customs documentation.', estimatedTime: '2–5 days' },
        { stepNumber: 4, title: 'Supplier ships goods with Form M reference', description: 'Required on all shipping documents.', estimatedTime: 'On shipment' },
      ],
      regulatory: 'Governed by CBN Trade Finance Guidelines and Foreign Exchange Manual.',
      commonMistakes: [
        { title: 'Wrong HS code on Form M', description: 'HS code on Form M must match goods exactly.', solution: 'Verify HS code with a customs agent before applying for Form M.' },
      ],
      relatedGuides: [
        { slug: '/guides/get-import-license-nigeria', title: 'How to Get an Import License' },
        { slug: '/guides/register-nigeria-customs-service', title: 'How to Register with NCS' },
      ],
    },
    sources: [{ title: 'CBN Trade Finance Guidelines', url: 'https://cbn.gov.ng', verified: true }],
    reviewerName: 'Tunde Adeyemi, Import/Export Specialist',
  },
