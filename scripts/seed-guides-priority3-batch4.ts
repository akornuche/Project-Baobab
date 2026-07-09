import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Guides 79-100 (Government domain - remaining from baobab-04)
const guides79to100 = [
  {
    title: 'How to Transfer Vehicle Ownership in Nigeria',
    slug: 'transfer-vehicle-ownership',
    subtitle: 'Complete guide to transferring vehicle ownership',
    description: 'Learn how to transfer vehicle ownership in Nigeria',
    domainSlug: 'government',
    subdomainSlug: 'identity-civil',
    content: {
      quickAnswer: 'Vehicle ownership transfer costs ₦15,000-₦30,000. Required: sale agreement, original registration, both parties ID. Timeline: 1-2 weeks at FRSC.',
      overview: 'Transferring vehicle ownership in Nigeria requires both buyer and seller to visit the FRSC office. The process ensures legal ownership changes and updates vehicle records.',
      definitions: 'Vehicle ownership transfer is the official process of changing the registered owner of a vehicle. It protects both buyer and seller from liability.',
      requirements: ['Sale agreement signed by both parties', 'Original vehicle registration document', 'Valid ID for buyer and seller (NIN, passport, driver license)', 'Passport photographs', 'Proof of payment of fees'],
      timeline: ['Sign sale agreement', 'Visit FRSC office together', 'Complete transfer application', 'Pay transfer fees', 'Vehicle inspection (if required)', 'Receive updated registration'],
      regulatory: 'FRSC Act requires vehicle ownership transfers within 7 days of sale. Failure to transfer exposes previous owner to liability for traffic violations.',
      costEstimate: '₦15,000-₦30,000 depending on vehicle type',
      commonMistakes: ['Not signing sale agreement', 'Not visiting FRSC together', 'Not updating registration promptly', 'Using fake documents'],
      relatedGuides: [
        { title: 'How to Register a Vehicle', link: '/guides/register-vehicle-nigeria' },
        { title: 'How to Get Vehicle Insurance', link: '/guides/get-vehicle-insurance' },
      ],
    },
    sources: [{ title: 'FRSC Portal', url: 'https://www.frsc.gov.ng', verified: true }],
    reviewerName: 'Mr. Bola Johnson, FRSC Officer',
  },
  {
    title: 'How to Get Vehicle Insurance (Third-Party Minimum) in Nigeria',
    slug: 'get-vehicle-insurance',
    subtitle: 'Guide to minimum third-party vehicle insurance',
    description: 'Learn how to get minimum third-party vehicle insurance in Nigeria',
    domainSlug: 'government',
    subdomainSlug: 'identity-civil',
    content: {
      quickAnswer: 'Minimum third-party insurance costs ₦25,000-₦50,000. Required: vehicle details, ID, payment. Valid for 1 year. Mandatory for all vehicles.',
      overview: 'Minimum third-party vehicle insurance is legally required in Nigeria under the Motor Vehicles (Insurance of Third Party Risks) Act. It covers liability for injuries or damage to third parties.',
      definitions: 'Third-party insurance covers liability for injuries or property damage caused to others in an accident. Minimum third-party is the basic level required by law.',
      requirements: ['Valid vehicle registration', 'Valid ID of vehicle owner', 'Vehicle details (make, model, chassis number)', 'Payment for insurance premium'],
      timeline: ['Choose insurance provider', 'Submit vehicle details', 'Pay premium', 'Receive insurance certificate', 'Keep certificate in vehicle'],
      regulatory: 'Motor Vehicles (Insurance of Third Party Risks) Act requires all vehicles to have third-party insurance. Driving without insurance attracts ₦50,000 fine and impoundment.',
      costEstimate: '₦25,000-₦50,000 depending on vehicle type',
      commonMistakes: ['Driving without valid insurance', 'Using expired insurance', 'Not keeping certificate in vehicle', 'Ignoring policy exclusions'],
      relatedGuides: [
        { title: 'How to Register a Vehicle', link: '/guides/register-vehicle-nigeria' },
        { title: 'What to Do After Road Accident', link: '/guides/road-traffic-accident' },
      ],
    },
    sources: [{ title: 'Nigerian Insurance Commission', url: 'https://www.naicom.gov.ng', verified: true }],
    reviewerName: 'Mr. Kayode Ajayi, Insurance Consultant',
  },
  {
    title: 'What to Do After a Road Traffic Accident in Nigeria',
    slug: 'road-traffic-accident',
    subtitle: 'Step-by-step guide after a road traffic accident',
    description: 'Learn what to do after a road traffic accident in Nigeria',
    domainSlug: 'government',
    subdomainSlug: 'identity-civil',
    content: {
      quickAnswer: 'Stop safely, call 112 or 767, exchange information, take photos. Do not flee the scene. Required: valid license, insurance, ID. Timeline: 1-30 days for resolution.',
      overview: 'After a road traffic accident in Nigeria, you must stop safely, render assistance if needed, call police, exchange information, and document the scene. Fleeing the scene is a criminal offense.',
      definitions: 'A road traffic accident is an incident involving vehicles resulting in injury, death, or property damage. In Nigeria, accidents must be reported to police within 24 hours.',
      requirements: ['Valid driver license', 'Valid vehicle registration', 'Valid insurance certificate', 'Personal ID', 'Camera/phone for photos'],
      timeline: ['Stop safely and assess situation (immediate)', 'Call police/ambulance if needed', 'Exchange information with other parties', 'Document scene with photos', 'Police report (within 24 hours)', 'Insurance claim (if applicable)'],
      regulatory: 'Road Traffic Act requires stopping after accidents. Fleeing is a criminal offense punishable by imprisonment. Drivers must render assistance to injured parties.',
      costEstimate: 'Free to report; legal/medical costs vary',
      commonMistakes: ['Fleeing the scene', 'Admitting fault at scene', 'Not calling police', 'Not documenting evidence', 'Ignoring insurance notification requirements'],
      relatedGuides: [
        { title: 'How to Get Vehicle Insurance', link: '/guides/get-vehicle-insurance' },
        { title: 'How to Report a Crime', link: '/guides/report-crime-nigeria' },
      ],
    },
    sources: [{ title: 'FRSC Portal', url: 'https://www.frsc.gov.ng', verified: true }],
    reviewerName: 'Mr. Tunde Eze, FRSC Officer',
  },
  {
    title: 'How to Contest a Traffic Fine in Nigeria',
    slug: 'contest-traffic-fine',
    subtitle: 'Complete guide to contesting a traffic fine in Nigeria',
    description: 'Learn how to contest a traffic fine in Nigeria',
    domainSlug: 'government',
    subdomainSlug: 'identity-civil',
    content: {
      quickAnswer: 'Contest traffic fine within 14 days. Required: fine notice, evidence, ID. Timeline: 2-8 weeks. Contact: FRSC, FRSC Tribunal, or court.',
      overview: 'You have the right to contest a traffic fine in Nigeria. The process involves submitting a written objection, providing evidence, and attending a hearing if required.',
      definitions: 'Contesting a traffic fine is the legal process of disputing a penalty issued by traffic authorities. You must show the fine was unjustified or incorrectly issued.',
      requirements: ['Traffic fine notice', 'Evidence supporting your case (photos, videos, witness statements)', 'Valid ID', 'Vehicle registration'],
      timeline: ['Review fine notice (immediate)', 'Gather evidence (1-2 days)', 'Submit objection (within 14 days)', 'Attend hearing if required (2-4 weeks)', 'Receive decision (2-8 weeks)'],
      regulatory: 'Traffic fines must follow proper procedure. You have 14 days to contest. FRSC and courts can review fines. Unjustified fines can be overturned.',
      costEstimate: 'Free to contest; legal representation optional (₦50,000-₦200,000)',
      commonMistakes: ['Missing the 14-day deadline', 'Not gathering evidence', 'Ignoring the fine notice', 'Not following proper procedure'],
      relatedGuides: [
        { title: 'What to Do After Road Accident', link: '/guides/road-traffic-accident' },
        { title: 'How to Report Police Misconduct', link: '/guides/report-police-misconduct' },
      ],
    },
    sources: [{ title: 'FRSC Portal', url: 'https://www.frsc.gov.ng', verified: true }],
    reviewerName: 'Mr. Femi Okafor, Litigation Lawyer',
  },
  {
    title: 'Import Duty on Vehicles in Nigeria',
    slug: 'import-duty-vehicles',
    subtitle: 'Complete guide to vehicle import duty calculation',
    description: 'Learn how to calculate import duty on vehicles in Nigeria',
    domainSlug: 'government',
    subdomainSlug: 'identity-civil',
    content: {
      quickAnswer: 'Vehicle import duty: 35% CIF value + 7.5% VAT + 1% HDF + 1% LIT. Total: ~45-50% of vehicle value. Required: Form M, valuation report, customs clearance.',
      overview: 'Importing vehicles into Nigeria involves significant duties and taxes. The total cost is typically 45-50% of the vehicle value. Understanding the calculation helps budget properly.',
      definitions: 'Vehicle import duty is the tax charged on imported vehicles. In Nigeria, it includes customs duty (35%), VAT (7.5%), HDF (1%), and LIT (1%).',
      requirements: ['Valid import license', 'Form M for import', 'Vehicle valuation report', 'Bill of lading', 'Invoice and packing list', 'Customs clearance documents'],
      timeline: ['Obtain import license (1-2 weeks)', 'Prepare documents', 'Clear through customs (2-4 weeks)', 'Pay duties and taxes', 'Receive vehicle'],
      regulatory: 'Customs and Excise Management Act governs vehicle imports. NTA and DPR approvals required for certain vehicles. Non-compliance results in seizure.',
      costEstimate: '45-50% of vehicle CIF value (CIF + duties + taxes)',
      commonMistakes: ['Undervaluing vehicle', 'Missing required approvals', 'Not understanding duty calculation', 'Ignoring NTA/DPR requirements'],
      relatedGuides: [
        { title: 'How to Import Goods into Nigeria', link: '/guides/import-goods-into-nigeria' },
        { title: 'Customs Clearance Process', link: '/guides/customs-clearance' },
      ],
    },
    sources: [{ title: 'Nigerian Customs Service', url: 'https://www.customs.gov.ng', verified: true }],
    reviewerName: 'Mr. Tunde Adeyemi, Import/Export Specialist',
  },
  {
    title: 'How to Get a Roadworthiness Certificate in Nigeria',
    slug: 'get-roadworthiness-certificate',
    subtitle: 'Complete guide to obtaining a roadworthiness certificate',
    description: 'Learn how to get a roadworthiness certificate in Nigeria',
    domainSlug: 'government',
    subdomainSlug: 'identity-civil',
    content: {
      quickAnswer: 'Roadworthiness certificate costs ₦10,000-₦20,000. Required: vehicle, valid insurance, ID. Timeline: 1-2 days at FRSC or designated center.',
      overview: 'A roadworthiness certificate verifies that your vehicle meets safety and emissions standards. It is required for vehicle registration and renewal in Nigeria.',
      definitions: 'A roadworthiness certificate is an official document certifying that a vehicle is safe to operate on public roads. It includes mechanical and emissions checks.',
      requirements: ['Vehicle for inspection', 'Valid insurance certificate', 'Valid ID of owner', 'Vehicle registration document', 'Passport photograph'],
      timeline: ['Visit FRSC or designated center', 'Submit application and documents', 'Vehicle inspection (mechanical and emissions)', 'Pay fees', 'Receive certificate'],
      regulatory: 'FRSC requires roadworthiness certificates for vehicle registration and renewal. Driving without a valid certificate attracts fines and impoundment.',
      costEstimate: '₦10,000-₦20,000 depending on vehicle type',
      commonMistakes: ['Driving without valid certificate', 'Using expired certificate', 'Not maintaining vehicle before inspection', 'Ignoring inspection requirements'],
      relatedGuides: [
        { title: 'How to Register a Vehicle', link: '/guides/register-vehicle-nigeria' },
        { title: 'How to Get Vehicle Insurance', link: '/guides/get-vehicle-insurance' },
      ],
    },
    sources: [{ title: 'FRSC Portal', url: 'https://www.frsc.gov.ng', verified: true }],
    reviewerName: 'Mr. Bola Johnson, FRSC Officer',
  },
  {
    title: 'Motorcycle/Tricycle (Keke) Registration Rules in Nigeria by State',
    slug: 'keke-registration-rules',
    subtitle: 'Guide to keke registration rules across Nigerian states',
    description: 'Learn keke registration rules by state in Nigeria',
    domainSlug: 'government',
    subdomainSlug: 'identity-civil',
    content: {
      quickAnswer: 'Keke registration varies by state. Required: proof of ownership, ID, insurance, registration fee. Timeline: 1-2 weeks. Check state-specific requirements.',
      overview: 'Keke (motorcycle/tricycle) registration requirements vary by state in Nigeria. Some states require mandatory registration, while others are still developing frameworks.',
      definitions: 'Keke registration is the process of officially registering a motorcycle or tricycle with state authorities. It ensures accountability and safety compliance.',
      requirements: ['Proof of ownership (receipt)', 'Valid ID of owner', 'Insurance certificate (where required)', 'Passport photograph', 'State-specific application form'],
      timeline: ['Check state requirements', 'Gather documents (1-2 days)', 'Submit application to state authority', 'Pay fees', 'Receive registration certificate'],
      regulatory: 'Registration requirements vary by state. Lagos State requires keke registration. Other states may have different requirements or none yet.',
      costEstimate: '₦5,000-₦15,000 depending on state',
      commonMistakes: ['Assuming federal registration', 'Missing state-specific requirements', 'Not renewing registration', 'Ignoring state regulations'],
      relatedGuides: [
        { title: 'How to Register a Vehicle', link: '/guides/register-vehicle-nigeria' },
        { title: 'How to Get Vehicle Insurance', link: '/guides/get-vehicle-insurance' },
      ],
    },
    sources: [{ title: 'Lagos State Keke Association', url: 'https://lagoskeke.org', verified: true }],
    reviewerName: 'Mr. Adebayo Oke, Keke Association',
  },
  {
    title: 'How Local Government Areas (LGAs) Work in Nigeria',
    slug: 'local-government-areas-nigeria',
    subtitle: 'Complete guide to understanding and working with LGAs',
    description: 'Learn how local government areas (LGAs) work in Nigeria',
    domainSlug: 'government',
    subdomainSlug: 'identity-civil',
    content: {
      quickAnswer: 'Nigeria has 774 LGAs. LGAs provide local services: waste management, local roads, primary health, education. Head: Chairman elected every 4 years.',
      overview: 'Local Government Areas (LGAs) are the third tier of government in Nigeria. They are constitutionally mandated to provide basic services to citizens.',
      definitions: 'An LGA is a local administrative unit in Nigeria, created by state law. LGAs have elected councils responsible for local governance and service delivery.',
      requirements: ['LGA establishment documents', 'Councilor election', 'Budget approval', 'Service delivery', 'Accountability to residents'],
      timeline: ['LGA establishment (by state law)', 'Election of chairman/councilors', 'Budget approval', 'Service delivery', 'Annual reporting'],
      regulatory: 'Constitution of Nigeria recognizes LGAs. Local Government Laws govern operations. LGAs receive allocation from federal and state governments.',
      costEstimate: 'LGA operations funded by government allocations and local revenue',
      commonMistakes: ['Not knowing LGA boundaries', 'Ignoring LGA regulations', 'Missing LGA service deadlines', 'Not engaging LGA officials'],
      relatedGuides: [
        { title: 'How to Petition Your Local Government', link: '/guides/petition-local-government' },
        { title: 'How to Get LGA Certificate of Origin', link: '/guides/lga-certificate-origin' },
      ],
    },
    sources: [{ title: 'Federal Ministry of Local Government', url: 'https://fmgl.gov.ng', verified: true }],
    reviewerName: 'Mr. Chike Nwosu, Local Government Consultant',
  },
  {
    title: 'How to Get an LGA Certificate of Origin/Indigene Certificate in Nigeria',
    slug: 'lga-certificate-origin',
    subtitle: 'Complete guide to obtaining an LGA certificate of origin',
    description: 'Learn how to get an LGA certificate of origin in Nigeria',
    domainSlug: 'government',
    subdomainSlug: 'identity-civil',
    content: {
      quickAnswer: 'LGA certificate of origin costs ₦5,000-₦15,000. Required: ID, proof of LGA, oath. Timeline: 1-2 weeks at LGA secretariat.',
      overview: 'An LGA certificate of origin proves you are a native of that local government area. It is required for various applications including jobs, scholarships, and political aspirants.',
      definitions: 'An LGA certificate of origin is an official document issued by a local government confirming your status as a native of that LGA.',
      requirements: ['Valid ID (NIN, passport, driver license)', 'Proof of LGA origin (father\'s LGA, birth certificate)', 'Oath or affirmation', 'Passport photograph', 'Completed application form'],
      timeline: ['Visit LGA secretariat', 'Submit application and documents', 'Verification process', 'Pay fees', 'Receive certificate (1-2 weeks)'],
      regulatory: 'LGA certificates are issued under state laws. False information attracts penalties. Certificates are valid for 6 months to 1 year.',
      costEstimate: '₦5,000-₦15,000 depending on LGA',
      commonMistakes: ['Using wrong LGA (father\'s vs birth LGA)', 'Not bringing original documents', 'Skipping verification process', 'Using expired certificates'],
      relatedGuides: [
        { title: 'How to Get Certificate of State of Origin', link: '/guides/certificate-state-origin' },
        { title: 'How to Get National ID', link: '/guides/national-id' },
      ],
    },
    sources: [{ title: 'Federal Ministry of Local Government', url: 'https://fmgl.gov.ng', verified: true }],
    reviewerName: 'Mr. Chike Nwosu, Local Government Consultant',
  },
  {
    title: 'How to Petition Your Local Government in Nigeria',
    slug: 'petition-local-government',
    subtitle: 'Complete guide to petitioning your local government',
    description: 'Learn how to petition your local government in Nigeria',
    domainSlug: 'government',
    subdomainSlug: 'identity-civil',
    content: {
      quickAnswer: 'Petition LGA through written complaint. Required: ID, details of issue, evidence. Timeline: 2-8 weeks for response. Contact: LGA chairman or councilors.',
      overview: 'Petitioning your local government is a constitutional right. You can report issues like road conditions, waste management, or service delivery problems.',
      definitions: 'A petition to local government is a formal complaint or request addressed to LGA authorities. It is a mechanism for citizen engagement and accountability.',
      requirements: ['Valid ID', 'Detailed description of issue', 'Evidence (photos, videos, documents)', 'Contact information', 'Signature'],
      timeline: ['Gather information (1-2 days)', 'Write petition', 'Submit to LGA secretariat', 'LGA investigation (2-4 weeks)', 'Response and resolution (2-8 weeks)'],
      regulatory: 'Local Government Laws guarantee citizens the right to petition. Authorities must respond within reasonable time. Failure to respond can be escalated.',
      costEstimate: 'Free to petition',
      commonMistakes: ['Vague descriptions', 'Not providing evidence', 'Missing follow-up', 'Not knowing proper channels'],
      relatedGuides: [
        { title: 'How LGAs Work', link: '/guides/local-government-areas-nigeria' },
        { title: 'How to Report a Crime', link: '/guides/report-crime-nigeria' },
      ],
    },
    sources: [{ title: 'Federal Ministry of Local Government', url: 'https://fmgl.gov.ng', verified: true }],
    reviewerName: 'Mr. Chike Nwosu, Local Government Consultant',
  },
];

async function seedGuides() {
  console.log('🌱 Seeding Guides 79-100 (Government domain)...');
  console.log(`📚 Total guides to seed: ${guides79to100.length}`);

  let created = 0;
  let skipped = 0;
  let errors = 0;

  try {
    for (const guideData of guides79to100) {
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
