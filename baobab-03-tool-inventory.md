# BAOBAB TOOL INVENTORY
**Version 1.0 — Nigeria MVP**

---

## 1. Calculator Engine Features

The generic calculator component supports:

### Input Types
- `number` — Numeric input with min/max/step
- `select` — Dropdown with options
- `boolean` — Checkbox/switch
- `range` — Slider input
- `text` — Single-line text input
- `textarea` — Multi-line text input
- `date` — Date picker
- `radio` — Radio button group

### Output Types
- `fixed` — Single calculated value (e.g., total cost)
- `breakdown` — Detailed cost/time breakdown (e.g., "Fee: ₦10,000 | VAT: ₦750 | Total: ₦10,750")
- `range` — Min/Max range (e.g., "7–14 days")
- `conditional` — Multiple possible outputs based on inputs (e.g., "If Business Name: ₦50,000, if Limited Company: ₦10,000–₦50,000")

### Calculation Types
- `fixed_formula` — Simple formula (e.g., `total = base + (rate * quantity)`)
- `tiered` — Bracket-based pricing (e.g., CAC fees based on share capital)
- `conditional` — If/else logic (e.g., `if entity_type === 'Business Name', fee = ₦50,000`)
- `lookup` — Table-based lookup (e.g., fee based on state)
- `composite` — Combination of multiple calculations

---

## 2. MVP Calculator Requirements

### 2.1 CAC Registration Cost & Time Estimator (Priority: High)
**Purpose:** Estimate cost and time to register a business with CAC

**Input Fields:**
- Entity type: `select` — Business Name, Limited Company, Sole Proprietorship
- Share capital: `number` — Minimum ₦0, default ₦100,000, step ₦1,000
- Number of shareholders: `number` — Minimum 1, default 1
- Use accredited agent: `boolean` — Yes/No
- State of registration: `select` — All 36 states + FCT

**Output Types:**
- `breakdown` — CAC fees, professional fees, VAT, total
- `range` — Timeline (standard: 7–14 days, expedited: 3–5 days)
- `conditional` — Different calculations based on entity type

**Calculation Logic:**
- Business Name: Fixed ₦50,000 (including VAT)
- Limited Company:
  - Up to ₦100,000 share capital: ₦10,000 registration fee
  - Above ₦100,000: ₦10,000 + additional fees per ₦100,000 tier
  - VAT: 7.5% of registration fee
- Timeline: Standard (7–14 days), Expedited (+₦25,000)

**Files:**
- `lib/calculators/cac-estimator.ts` — Business logic
- `app/tools/cac-estimator/page.tsx` — UI component

---

### 2.2 Business Startup Cost Calculator (Priority: High)
**Purpose:** Estimate total cost to start a business (CAC + TIN + Bank + VAT)

**Input Fields:**
- Entity type: `select` — Business Name, Limited Company
- Share capital: `number` — Same as CAC estimator
- Use accredited agent: `boolean` — Same as CAC estimator
- Bank account: `boolean` — Will you open a bank account? (adds cost)
- TIN registration: `boolean` — Will you register for TIN? (adds cost)

**Output Types:**
- `breakdown` — CAC, Bank, TIN, VAT, total
- `conditional` — Different calculations based on entity type

**Calculation Logic:**
- CAC: Use CAC estimator logic
- Bank: ₦5,000–₦10,000 (fixed or tiered based on minimum balance)
- TIN: Free (NGaaS), but add ₦5,000 if using agent
- VAT: 7.5% of applicable fees

**Files:**
- `lib/calculators/startup-cost.ts` — Business logic
- `app/tools/startup-cost/page.tsx` — UI component

---

### 2.3 Business Name vs Ltd Company Comparator (Priority: High)
**Purpose:** Compare pros/cons of Business Name vs Limited Company

**Input Fields:**
- Business type: `select` — Small business, Medium business, Large business
- Number of owners: `number` — 1–10+
- Investment amount: `number` — Minimum ₦0
- Liability protection: `boolean` — Do you need limited liability?

**Output Types:**
- `conditional` — Recommendation (Business Name or Limited Company)
- `comparison` — Side-by-side comparison table

**Calculation Logic:**
- Business Name: Suitable for small businesses, low cost, unlimited liability
- Limited Company: Suitable for medium/large businesses, higher cost, limited liability

**Files:**
- `lib/calculators/entity-comparator.ts` — Business logic
- `app/tools/entity-comparator/page.tsx` — UI component

---

### 2.4 Document Requirements Checklist Generator (Priority: Medium)
**Purpose:** Generate checklist of required documents for a process

**Input Fields:**
- Process: `select` — CAC Business Name, CAC Limited Company, TIN, Bank Account, VAT
- Entity type: `select` — Individual, Company
- Foreigner: `boolean` — Are you a foreigner?

**Output Types:**
- `checklist` — Array of required documents with descriptions

**Calculation Logic:**
- Look up documents based on process + entity type + foreigner flag
- Mark documents as "mandatory" or "optional"

**Files:**
- `lib/calculators/doc-checklist.ts` — Business logic
- `app/tools/doc-checklist/page.tsx` — UI component

---

### 2.5 Verified Directory Search (Priority: High)
**Purpose:** Enhanced directory search with filters and sorting

**Input Fields:**
- Category: `select` — Accountants, Registration Agents, Business Lawyers, Web Developers, Payroll Services
- Location: `text` — State, city, or area
- Premium only: `boolean` — Show premium listings only
- Verified only: `boolean` — Show verified listings only

**Output Types:**
- `list` — Filtered directory listings with search relevance score

**Calculation Logic:**
- Full-text search using Meilisearch
- Filter by category, location, verified, premium
- Sort by relevance, newest, verified first

**Files:**
- `lib/search/directory-search.ts` — Search logic
- `app/tools/directory-search/page.tsx` — UI component

---

### 2.6 JAMB/WAEC Subject Combination Checker (Priority: Medium)
**Purpose:** Check subject requirements for university admission

**Input Fields:**
- Exam type: `select` — JAMB, WAEC, Both
- Course: `select` — Select course from list (e.g., Medicine, Law, Engineering)
- WAEC credits: `boolean` — Do you have 5 credits including English and Maths?

**Output Types:**
- `conditional` — Subject requirements for the selected course
- `checklist` — Check if user meets requirements

**Calculation Logic:**
- Look up course requirements from database
- Compare with user's inputs
- Mark requirements as "met" or "missing"

**Files:**
- `lib/calculators/exam-checker.ts` — Business logic
- `app/tools/exam-checker/page.tsx` — UI component

---

### 2.7 VAT Calculator (Priority: Medium)
**Purpose:** Calculate VAT on goods/services

**Input Fields:**
- Amount: `number` — Price excluding VAT
- VAT rate: `select` — 7.5% (standard), 0% (exempt), custom rate

**Output Types:**
- `breakdown` — Original amount, VAT, total

**Calculation Logic:**
- VAT = Amount × VAT rate
- Total = Amount + VAT

**Files:**
- `lib/calculators/vat-calculator.ts` — Business logic
- `app/tools/vat-calculator/page.tsx` — UI component

---

### 2.8 Passport Cost & Processing Time Estimator (Priority: Medium)
**Purpose:** Estimate cost and time to get a Nigerian passport

**Input Fields:**
- Passport type: `select` — Standard (32-page), Premium (64-page)
- Age: `number` — Applicant age
- Processing type: `select` — Standard (4–6 weeks), Expedited (1–2 weeks)

**Output Types:**
- `breakdown` — Passport fee, processing fee, total
- `range` — Timeline (standard vs expedited)

**Calculation Logic:**
- Standard: ₦25,000
- Premium: ₦45,000
- Expedited: +₦10,000

**Files:**
- `lib/calculators/passport-estimator.ts` — Business logic
- `app/tools/passport-estimator/page.tsx` — UI component

---

### 2.9 PAYE/Payroll Tax Estimator (Priority: Medium)
**Purpose:** Estimate PAYE and payroll taxes for employees

**Input Fields:**
- Monthly salary: `number` — Gross salary
- Number of employees: `number` — Total employees
- Pension contribution: `boolean` — Does employee contribute to pension?

**Output Types:**
- `breakdown` — PAYE, NHF, HIT, Pension, Net pay
- `conditional` — Tax brackets based on salary

**Calculation Logic:**
- PAYE: Progressive tax rates (0%, 7%, 17%, 24%, 32%, 37%, 40%)
- NHF: 2.5% of gross salary
- HIT: 1% of gross salary
- Pension: 8% of gross salary (employee contribution)

**Files:**
- `lib/calculators/paye-calculator.ts` — Business logic
- `app/tools/paye-calculator/page.tsx` — UI component

---

### 2.10 Invoice Generator (Priority: Low)
**Purpose:** Generate simple downloadable invoice template

**Input Fields:**
- Business name: `text`
- Client name: `text`
- Invoice number: `text`
- Date: `date`
- Line items: `array` — Description, quantity, unit price, tax rate

**Output Types:**
- `download` — PDF invoice template
- `preview` — Preview invoice before download

**Calculation Logic:**
- Calculate totals (subtotal, tax, grand total)
- Format invoice with business/client info

**Files:**
- `lib/calculators/invoice-generator.ts` — Business logic
- `app/tools/invoice-generator/page.tsx` — UI component

---

## 3. Future Calculator Ideas (Not MVP)

- Tax savings calculator
- Business insurance estimator
- Business loan affordability calculator
- Breakeven point calculator
- Cash flow projector
- Business valuation calculator

---

## 4. Calculator Implementation Guidelines

### 4.1 File Structure
```
lib/
  calculators/
    cac-estimator.ts
    startup-cost.ts
    entity-comparator.ts
    doc-checklist.ts
    vat-calculator.ts
    passport-estimator.ts
    paye-calculator.ts
    invoice-generator.ts

app/
  tools/
    [calculator-slug]/
      page.tsx
      calculator.tsx
      [property-name].test.ts
```

### 4.2 Calculator Function Signature
```typescript
export type InputSchema = {
  [key: string]: {
    type: 'number' | 'select' | 'boolean' | 'range' | 'text' | 'textarea' | 'date' | 'radio';
    label: string;
    options?: { value: string; label: string }[];
    min?: number;
    max?: number;
    step?: number;
    default?: string | number | boolean;
    description?: string;
  };
};

export type OutputSchema = {
  type: 'fixed' | 'breakdown' | 'range' | 'conditional' | 'checklist';
  fields: {
    [key: string]: {
      label: string;
      value: string | number | boolean;
      unit?: string;
      description?: string;
    };
  };
};

export type CalculatorResult = {
  success: boolean;
  data: Record<string, any>;
  error?: string;
};

export function calculate(inputs: Record<string, any>): CalculatorResult;
```

### 4.3 Calculator Testing
- Unit tests for each calculation type
- Edge case tests (zero values, max values, invalid inputs)
- Integration tests with calculator component
- Accessibility tests (keyboard navigation, screen reader)

---

## 5. Calculator Configuration Schema

Each calculator has a configuration file that defines its inputs, outputs, and calculation logic:

```json
{
  "slug": "cac-estimator",
  "name": "CAC Registration Cost & Time Estimator",
  "description": "Estimate the cost and time to register your business with CAC",
  "inputs": {
    "entity_type": {
      "type": "select",
      "label": "Entity Type",
      "options": [
        { "value": "business_name", "label": "Business Name" },
        { "value": "limited_company", "label": "Limited Company" },
        { "value": "sole_proprietorship", "label": "Sole Proprietorship" }
      ],
      "default": "business_name",
      "description": "Choose the type of business entity"
    },
    "share_capital": {
      "type": "number",
      "label": "Share Capital (₦)",
      "min": 0,
      "max": 10000000,
      "step": 1000,
      "default": 100000,
      "description": "Amount of share capital (for Limited Companies)"
    }
  },
  "outputs": {
    "breakdown": {
      "cac_fee": { "label": "CAC Registration Fee", "unit": "₦" },
      "professional_fee": { "label": "Professional/Agent Fee", "unit": "₦" },
      "vat": { "label": "VAT (7.5%)", "unit": "₦" },
      "total": { "label": "Total Estimated Cost", "unit": "₦" }
    },
    "timeline": {
      "standard": { "label": "Standard Processing", "unit": "days" },
      "expedited": { "label": "Expedited Processing", "unit": "days" }
    }
  },
  "calculation_type": "tiered",
  "tiers": {
    "business_name": {
      "cac_fee": 50000,
      "professional_fee": 25000,
      "vat_rate": 0.075,
      "timeline_standard": 7,
      "timeline_expedited": 3
    },
    "limited_company": {
      "base_fee": 10000,
      "cap": 100000,
      "additional_tier": 100000,
      "additional_fee": 5000,
      "professional_fee": 50000,
      "vat_rate": 0.075,
      "timeline_standard": 14,
      "timeline_expedited": 5
    }
  }
}
```