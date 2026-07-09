import { CalculatorResult } from '@/lib/types';

interface JAMBInput {
  course: string;
}

// Required subjects for common courses
const COURSE_REQUIREMENTS: Record<string, string[]> = {
  'medicine': ['Use English', 'Use of Mathematics', 'Biology', 'Chemistry', 'Physics'],
  'engineering': ['Use English', 'Use of Mathematics', 'Physics', 'Chemistry', 'Mathematics'],
  'law': ['Use English', 'Government', 'Literature in English', 'CRS/IRS', 'Any other Social Science subject'],
  'accounting': ['Use English', 'Use of Mathematics', 'Commerce', 'Government', 'Economics'],
  'computer_science': ['Use English', 'Use of Mathematics', 'Physics', 'Chemistry', 'Mathematics'],
  'economics': ['Use English', 'Use of Mathematics', 'Economics', 'Mathematics', 'Any other Social Science subject'],
  'mass_communication': ['Use English', 'Literature in English', 'Government', 'Economics', 'Any other Social Science subject'],
};

export async function calculate(inputs: JAMBInput): Promise<CalculatorResult> {
  const { course } = inputs;

  const requiredSubjects = COURSE_REQUIREMENTS[course.toLowerCase()] || [
    'Use English',
    'Use of Mathematics',
    'Any three other subjects',
  ];

  return {
    details: {
      required_subjects: requiredSubjects,
      notes: 'These are typical requirements. Verify with JAMB and your chosen university.',
    },
    disclaimer: 'Subject requirements may vary by university. Always check with your preferred institution.',
  };
}