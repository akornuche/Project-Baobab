# BAOBAB PAGE PRODUCTION TEMPLATE
**Version 1.0 — Nigeria MVP**

---

## 1. Page Structure (Fixed Template)

Every Baobab page follows this structure. No exceptions. This is non-negotiable for consistency and SEO.

```
1. Hero Header (H1, subtitle, domain/subdomain badge, last verified date)
2. Quick Answer Box (the one-sentence answer to the user's question)
3. Overview (why this matters, what the user will learn)
4. Understanding the Basics (definitions, glossary-style explanations)
5. Requirements Checklist (what the user needs before starting)
6. Timeline (step-by-step process with estimated time per step)
7. Regulatory Picture (current regulations, where applicable)
8. Stats/Context Callout (numbers, timelines, or context the user needs to know)
9. Common Mistakes (what users get wrong, with examples)
10. What Happens Next (related guides, tools, directory listings)
11. Directory Cross-Sell (curated list of verified vendors)
12. Feedback (report outdated info, ask questions)
```

**Rule:** Each section is optional only if it has *nothing* to say for this specific topic. Never include placeholder text.

---

## 2. Content Block Format (JSON Schema)

### 2.1 Quick Answer Box
```json
{
  "type": "quick-answer",
  "content": {
    "question": "What is the question this page answers?",
    "answer": "The one-sentence answer (under 20 words)."
  }
}
```

### 2.2 Overview
```json
{
  "type": "overview",
  "content": {
    "sectionTitle": "Why This Matters",
    "introduction": "Background and context (2–3 paragraphs).",
    "learningObjectives": ["What the user will learn", "What they'll be able to do"]
  }
}
```

### 2.3 Understanding the Basics
```json
{
  "type": "definitions",
  "content": {
    "sectionTitle": "Understanding the Basics",
    "definitions": [
      {
        "term": "Term name",
        "definition": "Clear, jargon-free explanation (1–2 sentences).",
        "example": "Concrete example (optional)"
      }
    ]
  }
}
```

### 2.4 Requirements Checklist
```json
{
  "type": "checklist",
  "content": {
    "sectionTitle": "What You Need",
    "requirements": [
      {
        "title": "Requirement name",
        "description": "Explanation of what it is and where to get it",
        "isMandatory": true,
        "notes": "Additional context (optional)"
      }
    ],
    "prerequisites": ["What must be completed before starting this guide"]
  }
}
```

### 2.5 Timeline/Steps
```json
{
  "type": "timeline",
  "content": {
    "sectionTitle": "Step-by-Step Process",
    "steps": [
      {
        "stepNumber": 1,
        "title": "Step title",
        "description": "Detailed instructions ( paragraphs)",
        "estimatedTime": "15 minutes",
        "inputs": ["What the user needs to have ready"],
        "outputs": ["What they'll have after completing this step"],
        "cost": "₦1,500"  // Optional, omit if N/A
      }
    ],
    "totalEstimatedTime": "2 hours",
    "totalEstimatedCost": "₦3,500"
  }
}
```

### 2.6 Regulatory Picture
```json
{
  "type": "regulatory",
  "content": {
    "sectionTitle": "Regulatory Context",
    "currentRegulations": "Current laws/rules affecting this process",
    "recentChanges": ["Changes in the last 12 months"],
    "officialSource": {
      "title": "Official source name",
      "url": "https://official.gov.ng",
      "lastVerified": "2025-01-15"
    }
  }
}
```

### 2.7 Stats/Context Callout
```json
{
  "type": "stats",
  "content": {
    "sectionTitle": "Key Facts",
    "stats": [
      {
        "label": "Stat label",
        "value": "Numerical value",
        "unit": "days, ₦, etc.",
        "source": "Source name"
      }
    ],
    "context": "Explanation of why these stats matter"
  }
}
```

### 2.8 Common Mistakes
```json
{
  "type": "common-mistakes",
  "content": {
    "sectionTitle": "What to Avoid",
    "mistakes": [
      {
        "title": "Mistake name",
        "description": "What users do wrong and why it's a problem",
        "solution": "How to avoid it",
        "realExample": "Concrete example of someone who made this mistake"
      }
    ]
  }
}
```

### 2.9 What Happens Next
```json
{
  "type": "related-guides",
  "content": {
    "sectionTitle": "Next Steps",
    "relatedGuides": [
      {
        "slug": "related-guide-slug",
        "title": "Guide title",
        "description": "Why this guide is relevant"
      }
    ],
    "relatedTools": [
      {
        "slug": "calculator-slug",
        "title": "Calculator name",
        "description": "How this tool helps with the next steps"
      }
    ],
    "directoryCrossSell": {
      "title": "Find a Professional",
      "category": "relevant-category",
      "description": "When to hire a professional instead of DIY"
    }
  }
}
```

### 2.10 Directory Cross-Sell
```json
{
  "type": "directory-cross-sell",
  "content": {
    "sectionTitle": "Verified Professionals",
    "category": "relevant-category",
    "description": "Curated list of 3–5 verified vendors with badges (verified, premium)",
    "listings": [
      {
        "id": "listing-id",
        "name": "Business name",
        "description": "What they do",
        "verified": true,
        "premium": false,
        "contact": {
          "phone": "08012345678",
          "email": "contact@business.com",
          "website": "https://business.com"
        }
      }
    ]
  }
}
```

### 2.11 Feedback
```json
{
  "type": "feedback",
  "content": {
    "reportOutdated": {
      "title": "Report Outdated Information",
      "description": "If you notice the information on this page is incorrect or outdated, please let us know.",
      "formFields": [
        {
          "name": "issueType",
          "type": "select",
          "options": ["Fee changed", "Process changed", "Website URL changed", "Other"]
        },
        {
          "name": "details",
          "type": "textarea",
          "label": "Please describe the issue"
        },
        {
          "name": "officialSource",
          "type": "url",
          "label": "Link to official source (if available)"
        }
      ]
    }
  }
}
```

---

## 3. Editor Workflow

### 3.1 Draft
- Write content following the template structure
- Include all relevant sections (skip empty ones)
- Add placeholder `related_guides` and `related_tools` with slugs
- Add `sources` array with official reference links
- Set `domain` and `subdomain` from taxonomy

### 3.2 Submitted for Review
- Assign reviewer
- Ensure all fees/costs/timelines have official source links
- Verify section structure matches template

### 3.3 Published
- Set `lastVerified` timestamp
- Add reviewer name
- Generate `related_guides` and `related_tools` links (if not added earlier)
- Update `verified_by` and `verified_at` fields

---

## 4. Page Template Fields

```json
{
  "slug": "guide-slug",
  "title": "Guide title",
  "subtitle": "Short subtitle (optional)",
  "description": "Meta description (under 160 characters)",
  "domain": "Government",
  "subdomain": "Business Registration",
  "contentBlocks": [
    // Array of content blocks from Section 2
  ],
  "sources": [
    {
      "title": "Official source name",
      "url": "https://official.gov.ng",
      "lastVerified": "2025-01-15"
    }
  ],
  "relatedGuides": ["slug1", "slug2"],
  "relatedTools": ["calculator-slug"],
  "reviewer": {
    "name": "Reviewer Name",
    "lastVerified": "2025-01-15"
  },
  "createdAt": "2025-01-01T00:00:00Z",
  "updatedAt": "2025-01-15T00:00:00Z"
}
```

---

## 5. Style Guide

### 5.1 Tone
- Clear, direct, and practical
- Avoid jargon. If jargon is unavoidable, define it in the "Understanding the Basics" section
- Assume the user is time-pressed and wants to accomplish a task, not read an essay
- Use active voice: "Submit the form online" not "The form should be submitted online"

### 5.2 Formatting
- Use short paragraphs (2–3 sentences max)
- Use bullet points for lists of items
- Use bold for key deadlines, fees, or important actions
- Use italics sparingly for emphasis

### 5.3 Numbers and Currency
- Use Nigerian Naira (₦) symbol
- Format numbers: ₦50,000 (comma as thousands separator)
- Use "days" for time, not "working days" unless specifically required

### 5.4 Links
- Link to official sources, not third-party sites
- Link to specific sections, not just homepage URLs
- Use descriptive anchor text: "See CAC's official fee schedule" not "Click here"

---

## 6. Quality Checklist

Before publishing a guide:
- [ ] All fees have official source links
- [ ] All legal/process steps have official source links
- [ ] Timeline estimates match official sources
- [ ] "Common mistakes" section is populated with real examples
- [ ] "Related guides" and "related tools" are added
- [ ] Directory listings cross-sell is populated (or marked "TBD")
- [ ] Reviewer has verified all factual claims
- [ ] `lastVerified` date is set
- [ ] No placeholder text (e.g., "[Add here]", "TBD")
