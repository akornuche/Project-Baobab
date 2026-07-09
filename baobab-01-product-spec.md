# PROJECT BAOBAB — Master Product Specification
**Version 1.0 — Nigeria MVP**
*This document is the single source of truth for any agent (human or AI) picking up this project. It consolidates every decision made across planning sessions.*

---

## 1. What This Is

Project Baobab is **not a blog or content site.** It is a task-completion platform — a structured, verified knowledge system that helps Nigerians accomplish real-world administrative, business, and life tasks (registering a business, getting a passport, applying to school), organized as reusable structured data rather than freeform articles.

**North Star test for every page:** *Can this page help someone accomplish something today?* If no, it doesn't get built.

**The three-pillar model:**
```
Knowledge (guides) → Tools (calculators/checklists) → Data (structured, reusable facts)
```
Most competitors stop at Knowledge. Baobab's differentiation is Tools and Data — content that functions like a service, not an essay.

---

## 2. Scope Boundaries (What We Are and Aren't Building Right Now)

| In scope (MVP) | Explicitly out of scope (later phases) |
|---|---|
| Nigeria only, federal-level content | Other African countries (Year 2+) |
| 3 launch domains: Government, Business, Education | Full 20-domain taxonomy (later expansion) |
| State-level content only where it materially changes the guide (e.g. PAYE) | Full state-by-state content for every guide |
| Keyword-based search | Task-based natural language search |
| Structured `related_guides`/`related_tools` arrays | Full knowledge graph engine |
| Human-verified, AI-assisted drafting | Per-guide AI assistant / chatbot |
| Display ads + directory listings (from launch) | Membership/Pro tier, API licensing, enterprise |

This scope was deliberately narrowed from an original 54-country, 20-domain, 10,000-page vision. **Do not re-expand scope without explicit sign-off** — the plan's core lesson learned was that engine-first, scale-first approaches delay any real validation.

---

## 3. Brand

**Working name shortlist:** Baobab (trust/gravitas), Kwenu (local, verb-brand potential), Fasi, Nauta — not finalized. Whichever agent picks this up should treat the name as still open pending validation (domain/trademark check).

**Mission:** Organize practical Nigerian knowledge and make it instantly useful.

**Vision:** Become the first site a Nigerian opens when they need to get something done.

**Core values:** Accuracy over volume. Task-completion over reading. Transparency (sponsored/AI-assisted/verification status always visible). Local trust (naira, real offices, current forms).

---

## 4. Trust & Editorial Policies (Non-negotiable)

- **Fact-checking:** Every guide has a named Reviewer. No guide involving fees, legal steps, or government process publishes without verification against a linked official source. `last_verified_date` is user-visible. Recheck cadence: fee/government guides every 90 days; evergreen guides every 12 months.
- **AI-use policy:** AI may draft guides and code. No AI draft publishes without human verification against real official sources — never generated from model training-data memory alone, since fees/regulations change too fast to trust to memory. (This was proven necessary in practice: a mid-project regulatory change — TIN merging with CAC's RC/BN number, effective Jan 1 2026 — was caught only through live research, not model memory.)
- **Transparency:** Sponsored content, if ever used, is clearly labeled and editorially independent. Affiliate/lead-gen links disclosed inline. Directory listings marked Verified vs Paid Placement, visually distinct.
- **No fabricated data:** Never publish invented statistics (e.g. a fake "92% success rate") to appear more polished. Only publish figures with real, cited sources.

---

## 5. Information Architecture (Launch Taxonomy)

Three domains at launch, each with subdomains:

**Government**
Identity (Passport, NIN, Voter Registration), Business Registration (CAC), Taxes, Certificates (Birth/Marriage), Immigration, Land, Courts

**Business**
Starting a Business, Registration, Tax & Compliance (VAT, PAYE), Banking, Intellectual Property (Trademark), Insurance, Funding/Loans, HR & Payroll

**Education**
WAEC, NECO, JAMB, NYSC, Scholarships, Admission, Student Loans, Result Checking

Full 20-domain taxonomy (Money, Agriculture, Housing, Technology, Health, etc.) exists as a **future reference** (see Section 8) but is not active scope.

---

## 6. Data Model Summary

Full schema lives in the companion Database Schema section below (also see prior schema file). Core entities:

- **Guide** — the core content object (structured fields: cost, time, requirements, steps, FAQs, body_sections, sources, review metadata)
- **Tool** — calculators/checklists attached to guides
- **DirectoryListing** — local business listings (accountants, agents, tutors), Free/Paid tier
- **OfficialSource / Domain / Subdomain** — reference tables

Key principle: **content is structured data, not HTML.** Every guide is assembled from reusable components (see Page Template document) so that updating one component (e.g. a new "Estimated Waiting Time" field) can propagate across all pages using it.

---

## 7. Revenue Model (Sequenced, Not Simultaneous)

Following the flywheel: **Traffic → Trust → Tools → Email → Products → Ads → Business**

1. **Launch:** Email capture + display ads (immediate, low-effort)
2. **Month 2–3:** Directory premium listings (strongest early lever — proven, boring, high-margin, doesn't need traffic scale to work)
3. **Month 4+:** Lead-generation ("Get 3 Quotes") once directory vendor supply exists
4. **Later:** Membership/Pro tier, once enough premium tools exist to justify it
5. **Year 2+:** API/data licensing, enterprise portals, sponsored content — only once trust and traffic are proven; publishing these before credibility is earned actively damages trust

**Discarded/deferred ideas and why:** Sponsored content early (undermines unearned trust), fabricated "success rate" stats (dishonest polish), API/enterprise licensing before 6+ months of verified data (nothing to sell yet).

---

## 8. Tech Stack (Default, Adjustable)

Frontend: Next.js · Backend: Node.js (Express/NestJS) · DB: PostgreSQL · ORM: Prisma · Search: Meilisearch or Typesense · Caching: Redis (when traffic grows) · Storage: Cloudflare R2 · Hosting: VPS/cloud with CDN

Chosen because it's boring, production-proven, SEO-friendly, and heavily represented in coding-agent training data — which matters directly for build speed given the intent to use AI agents to accelerate development.

---

## 9. Build Sequence (Recap)

1. Foundation: brand, policies, schema (done — see this doc + schema file)
2. Engine: scoped to 3 domains only, Next.js/Postgres/Prisma/Meilisearch stack
3. Content: 60–100 flagship guides, real depth (800–1,500+ words each, not thin templated pages — see Page Template document), 8–10 calculators, directory seeding (15–20 listings in 2–3 categories)
4. Monetization wired in parallel per Section 7
5. Validate before scaling geography or domain count

**Realistic timeline with AI-agent-assisted coding:** ~10–14 weeks to launch-ready MVP. AI agents accelerate code/scaffolding significantly; they do **not** reduce the human fact-verification bottleneck, which remains the primary constraint on publishing velocity.

---

## 10. What Was Learned/Corrected Along the Way (Important Context)

- Original plan scoped to 54 countries / 20 domains / 10,000+ pages — deliberately cut down to Nigeria / 3 domains / ~100 pages for MVP validation.
- First page drafts were too thin (150–250 words) — risked Google's Helpful Content system flagging sitewide templated shallowness. Corrected by adding real editorial depth (Overview, Definitions, Regulatory Picture, Stats) per the Page Template document.
- A regulatory fact (TIN/RC number merger, Jan 2026) changed mid-project — proof that AI-memory-only drafting is unsafe for this content category and the human-verification policy is not optional overhead.
- Directory listings were originally scoped as a "later revenue layer" but should be pulled into MVP — they're low-effort, high-margin, and don't require Baobab's own traffic scale to start working (vendors pay for exposure to any real audience).

---

## 11. Appendix: Full 20-Domain Taxonomy (Reference Only, Not Active Scope)

Government, Business, Money, Education, Health, Technology, Agriculture, Construction/Housing, Legal, Travel, Transportation, Jobs/Employment, Utilities, Family, Security, Religion, Culture, Lifestyle, Environment, Energy — each with detailed subdomains as originally mapped. Retained here so future expansion doesn't require re-deriving the taxonomy from scratch.
