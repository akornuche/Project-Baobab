import { CalculatorResult } from '@/lib/types';

interface DocChecklistInput {
  process: string;
  entity_type: string;
  is_foreigner: boolean;
}

interface DocumentRequirement {
  title: string;
  description: string;
  isMandatory: boolean;
  notes?: string;
}

interface DocChecklistResult {
  checklist: DocumentRequirement[];
  totalDocuments: number;
  mandatoryCount: number;
  optionalCount: number;
}

export async function calculate(inputs: DocChecklistInput): Promise<CalculatorResult> {
  const { process, entity_type, is_foreigner } = inputs;

  // Define document requirements for different processes
  const documentRequirements: Record<string, DocumentRequirement[]> = {
    cac_business_name: [
      { title: 'Business Name Search', description: 'Submit proposed business names through CAC portal', isMandatory: true },
      { title: 'Form A', description: 'Completed business registration form', isMandatory: true },
      { title: 'Proof of Address', description: 'Valid utility bill or lease agreement', isMandatory: true },
      { title: 'Passport Photograph', description: 'Recent passport-sized photographs of owners', isMandatory: true },
      { title: 'NIN', description: 'National Identity Number for all owners', isMandatory: true },
    ],
    cac_limited_company: [
      { title: 'Company Name Search', description: 'Submit proposed company names through CAC portal', isMandatory: true },
      { title: 'Form C', description: 'Completed company registration form', isMandatory: true },
      { title: 'Memorandum and Articles', description: 'Memorandum and Articles of Association', isMandatory: true },
      { title: 'Passport Photographs', description: 'Recent passport-sized photographs of directors', isMandatory: true },
      { title: 'NIN', description: 'National Identity Number for all directors', isMandatory: true },
      { title: 'Proof of Address', description: 'Valid utility bill or lease agreement', isMandatory: true },
    ],
    tin_registration: [
      { title: 'CAC Certificate', description: 'Business registration certificate', isMandatory: true },
      { title: 'Business Address', description: 'Valid business address', isMandatory: true },
      { title: 'Directors Information', description: 'Full details of all directors', isMandatory: true },
      { title: 'Business Activity Details', description: 'Nature of business operations', isMandatory: true },
    ],
    bank_account: [
      { title: 'CAC Certificate', description: 'Business registration certificate', isMandatory: true },
      { title: 'TIN Certificate', description: 'Taxpayer Identification Number', isMandatory: true },
      { title: 'Business Address', description: 'Valid business address', isMandatory: true },
      { title: 'Passport Photographs', description: 'Recent passport-sized photographs of signatories', isMandatory: true },
      { title: 'Utility Bill', description: 'Valid utility bill (not more than 3 months)', isMandatory: true },
    ],
    vat_registration: [
      { title: 'CAC Certificate', description: 'Business registration certificate', isMandatory: true },
      { title: 'TIN Certificate', description: 'Taxpayer Identification Number', isMandatory: true },
      { title: 'Business Bank Account', description: 'Business bank account details', isMandatory: true },
      { title: 'Business Activity Details', description: 'Nature of business operations', isMandatory: true },
    ],
  };

  // Get requirements for the selected process
  const requirements = documentRequirements[process] || [];

  // Add foreigner-specific requirements
  if (is_foreigner) {
    requirements.push({
      title: 'Valid Work Permit',
      description: 'Work permit for foreign nationals',
      isMandatory: true,
      notes: 'Required for foreign nationals conducting business in Nigeria',
    });
  }

  const totalDocuments = requirements.length;
  const mandatoryCount = requirements.filter((doc) => doc.isMandatory).length;
  const optionalCount = totalDocuments - mandatoryCount;

  return {
    total: totalDocuments,
    checklist: requirements,
    breakdown: {
      'Total Documents': totalDocuments,
      'Mandatory Documents': mandatoryCount,
      'Optional Documents': optionalCount,
    },
    disclaimer: `Document requirements may vary based on specific circumstances. Verify with the relevant authority before submission.`,
  };
}