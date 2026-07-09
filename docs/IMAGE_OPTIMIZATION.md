# Image Optimization Guide

## Overview

Baobab implements comprehensive image optimization for SEO, performance, and accessibility. This guide covers image formats, sizing, alt text, and best practices.

## Image Optimization Strategy

### 1. Format Selection

| Format | Use Case | Compression | Browser Support |
|--------|----------|-------------|-----------------|
| **WebP** | Primary format | Excellent (25-35% smaller) | 96%+ (with fallback) |
| **AVIF** | Modern optimization | Excellent (50%+ smaller) | 70%+ (with fallback) |
| **JPEG** | Fallback for older browsers | Good | 100% |
| **PNG** | Transparency needed | Poor compression | 100% |
| **SVG** | Icons and logos | Excellent for vectors | 100% |

### 2. Image Sizing

#### Standard Sizes

- **Thumbnail:** 150x150px (0.5:1 - square)
- **Small:** 300x300px (1:1 - square)
- **Medium:** 600x400px (1.5:1 - landscape)
- **Large:** 1200x800px (1.5:1 - landscape)
- **OG Image:** 1200x630px (1.9:1 - social)

#### Responsive Breakpoints

```typescript
sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 80vw"
```

- **Mobile (< 640px):** 100% of viewport width
- **Tablet (640-1024px):** 90% of viewport width
- **Desktop (> 1024px):** 80% of viewport width

### 3. File Size Targets

| Image Type | Target Size | Max Size | Method |
|-----------|------------|----------|--------|
| Thumbnail | 10-15KB | 25KB | High compression |
| Medium | 20-40KB | 75KB | Balanced |
| Large | 50-100KB | 150KB | Quality priority |
| OG Image | 15-25KB | 50KB | High compression |

### 4. Implementation

#### Using OptimizedImage Component

```typescript
import { OptimizedImage } from '@/components/SEO/OptimizedImage';

<OptimizedImage
  src="/images/guide-header.jpg"
  alt="How to Register a Business Name with CAC - Step-by-step guide for Nigeria"
  width={1200}
  height={630}
  priority
  quality={85}
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 80vw"
  caption="Business registration process with CAC"
/>
```

#### Using ResponsiveImage Component

```typescript
import { ResponsiveImage } from '@/components/SEO/OptimizedImage';

<ResponsiveImage
  src="/images/guide-content.jpg"
  alt="Steps for business registration in Nigeria"
  width={1000}
  height={600}
  caption="Step-by-step registration process"
/>
```

## Alt Text Best Practices

### Alt Text Rules

1. **Be Concise** (max 125 characters)
   - ✅ "CAC business registration cost calculator"
   - ❌ "This is a picture of a calculator that you can use to calculate the cost of registering your business with CAC"

2. **Describe Content and Purpose**
   - ✅ "Verified CAC registration agent office in Lagos"
   - ❌ "Office building"

3. **Include Keywords Naturally**
   - ✅ "JAMB UTME result checking on official portal"
   - ❌ "JAMB result checking Nigeria JAMB UTME Nigeria portal"

4. **Avoid Redundancy**
   - ❌ "Image of CAC registration guide"
   - ✅ "CAC registration guide: step-by-step instructions"

5. **For Decorative Images**
   - Use empty alt text: `alt=""`
   - Do not omit alt attribute

### Alt Text by Content Type

#### Guide Images

```
Template: "{Guide Title} - Step-by-step guide for Nigeria"
Example: "How to Register a Business Name with CAC - Step-by-step guide for Nigeria"
Max Length: 100 characters
```

#### Calculator Images

```
Template: "{Calculator Name} - Interactive calculator tool"
Example: "CAC Registration Cost Estimator - Interactive calculator tool"
Max Length: 85 characters
```

#### Directory Listings

```
Template: "{Business Name} - {Category} in {Location}"
Example: "Baobab Legal Services - Business registration agent in Lagos"
Max Length: 95 characters
```

#### Badges and Icons

```
Template: "{Badge Type} badge - {Description}"
Example: "Verified badge - This listing has been verified"
Max Length: 60 characters
```

## Implementation Checklist

### Image Creation

- [ ] Image is 1200px wide minimum
- [ ] Image is in correct aspect ratio
- [ ] Image has sufficient contrast (4.5:1)
- [ ] Text in image is at least 12px
- [ ] Color is not the only way to convey information

### Image Optimization

- [ ] Image is compressed to target file size
- [ ] Image is in WebP or AVIF format (with JPEG fallback)
- [ ] Image has descriptive filename
- [ ] Image metadata is cleaned (no EXIF data)

### Alt Text

- [ ] Alt text provided for all non-decorative images
- [ ] Alt text is under 125 characters
- [ ] Alt text describes content and purpose
- [ ] Alt text includes relevant keywords
- [ ] Alt text doesn't contain "image of" or "picture of"

### Responsive

- [ ] Multiple sizes provided for breakpoints
- [ ] srcset attribute included
- [ ] sizes attribute specified
- [ ] Loading strategy defined (lazy/eager)
- [ ] Image dimensions specified (prevents layout shift)

## Image Optimization Workflow

### 1. Prepare

```bash
# Original image
1200x800px, 2MB JPEG
```

### 2. Format Conversion

```bash
# Convert to WebP (primary)
# Convert to JPEG (fallback)
```

### 3. Compression

```bash
# Target: 40KB max for large images
# Use ImageOptim, TinyJPG, or Squoosh
```

### 4. Generate Sizes

```bash
# Generate multiple sizes
# 300px, 600px, 1200px widths
```

### 5. Implement

```typescript
<OptimizedImage
  src="/images/file.jpg"
  alt="Alt text here"
  width={1200}
  height={800}
  quality={85}
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 80vw"
/>
```

## Core Web Vitals Impact

### Largest Contentful Paint (LCP)

- **Target:** < 2.5s
- **Image Impact:** Significant (often largest element)
- **Optimization:** Lazy load below-fold images, compress above-fold
- **Priority Images:** Use `priority={true}` on above-fold OG images

### Cumulative Layout Shift (CLS)

- **Issue:** Images without dimensions cause layout shift
- **Solution:** Always specify width and height
- **Implementation:** Done in OptimizedImage component

### First Input Delay (FID)

- **Image Impact:** Minimal
- **Optimization:** Use next/image for automatic optimization

## Performance Monitoring

### Lighthouse Audit

```bash
# Run Lighthouse audit
npm run lighthouse

# Check image metrics
# - Image properly sized
# - WebP/AVIF formats
# - Alt text presence
```

### Field Monitoring

Use Google Analytics to track:
- Image loading time
- Image dimensions on different devices
- User interaction with images

## Tools and Resources

### Image Optimization

- [Squoosh](https://squoosh.app/) - Web-based optimizer
- [TinyJPG](https://tinyjpg.com/) - Batch compression
- [ImageOptim](https://imageoptim.com/) - Mac app (batch)
- [Cloudinary](https://cloudinary.com/) - Cloud optimization

### Alt Text Validation

- [WAVE Browser Extension](https://wave.webaim.org/extension/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [axe DevTools](https://www.deque.com/axe/devtools/)

### SEO Validation

- [Screaming Frog](https://www.screamingfrog.co.uk/) - Alt text audit
- [Moz](https://moz.com/) - Image analysis
- [SEMrush](https://www.semrush.com/) - Image optimization report

## Examples

### Good Image Implementation

```typescript
// Guide with optimized image
<OptimizedImage
  src="/images/cac-guide-header.jpg"
  alt="How to Register a Business Name with CAC - Step-by-step guide for Nigeria"
  width={1200}
  height={630}
  priority
  quality={85}
  caption="CAC Business Name Registration Process"
/>

// Calculator with lazy loading
<OptimizedImage
  src="/images/calculator-cac.jpg"
  alt="CAC Registration Cost Estimator - Interactive calculator tool"
  width={600}
  height={400}
  loading="lazy"
  quality={80}
/>
```

### Bad Image Implementation

```typescript
// ❌ No alt text
<img src="/images/guide.jpg" />

// ❌ Generic alt text
<img src="/images/guide.jpg" alt="image" />

// ❌ No dimensions (causes CLS)
<img src="/images/guide.jpg" alt="CAC guide" />

// ❌ Too large file size
<img src="/images/guide-5mb.jpg" alt="CAC guide" width={1200} height={630} />
```

## FAQ

**Q: Should I use PNG or JPG?**
A: Use JPEG for photos/complex images (better compression), PNG for graphics with transparency, SVG for icons/logos.

**Q: How long should alt text be?**
A: Aim for under 125 characters. Should describe content, not be keyword stuffing.

**Q: Should decorative images have alt text?**
A: Yes, but use empty alt text: `alt=""`. This tells screen readers to skip the image.

**Q: How do I test image optimization?**
A: Use Google Lighthouse, PageSpeed Insights, or WebPageTest to measure impact.

**Q: Can I use AI-generated alt text?**
A: Not recommended. Human-written alt text is more accurate and contextual.
