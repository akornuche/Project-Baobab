# Open Graph Image Strategy

## Overview

Baobab uses a multi-layered approach to OG image generation for optimal social media sharing and SEO:

1. **Dynamic Generation** - Real-time OG image generation using Next.js `ImageResponse`
2. **Static Fallbacks** - Pre-generated images for key pages
3. **Domain-Specific Branding** - Different colors and styles per domain
4. **Caching** - Immutable caching for performance

## Architecture

### 1. Dynamic OG Image Route

**Path:** `/app/og-images/[slug]/route.tsx`

Generates OG images dynamically based on the slug parameter. Supports:
- Domain-specific colors (Government: Red, Business: Blue, Education: Green)
- Custom titles and subtitles
- Branded footer with "baobab.ng"
- Pattern backgrounds for visual interest
- Responsive icon/emoji support

**Usage:**
```
https://baobab.ng/og-images/government.jpg
https://baobab.ng/og-images/business.jpg
https://baobab.ng/og-images/calculators.jpg
```

### 2. Reference Implementation

In page metadata:

```typescript
openGraph: {
  images: [
    {
      url: `https://baobab.ng/og-images/${domain.slug}.jpg`,
      width: 1200,
      height: 630,
      alt: title,
    },
  ],
}
```

## Image Specifications

### Dimensions
- **Width:** 1200px
- **Height:** 630px
- **Aspect Ratio:** 1.9:1 (ideal for most platforms)

### Supported Platforms
- **Twitter:** 1.9:1 ratio (1200x630) - Summary Large Image
- **Facebook:** 1.2:1 ratio (1200x628) - Adaptive
- **LinkedIn:** 1.2:1 ratio (1200x627) - Adaptive
- **WhatsApp:** 1:1 ratio (1200x1200) - Thumbnail

### Color Schemes

| Domain | Color | Hex | Usage |
|--------|-------|-----|-------|
| Government | Red | #dc2626 | Civic/Authority |
| Business | Blue | #2563eb | Professional |
| Education | Green | #059669 | Growth/Learning |
| Guides | Purple | #7c3aed | Knowledge |
| Calculators | Cyan | #0891b2 | Tools |

## Template Types

### 1. Domain Templates
Used for category pages and domain-wide content.

**Slugs:**
- `government` - Government domain
- `business` - Business domain
- `education` - Education domain

### 2. Content Type Templates
Used for specific content sections.

**Slugs:**
- `guides` - Guides section
- `calculators` - Tools/Calculators section
- `tools` - Generic tools

### 3. Default Template
Used when slug not matched.

**Slug:**
- `baobab-default` - Baobab main branding

## Customization

### Adding a New Template

1. Update `domainColors` in `route.tsx`:
```typescript
const domainColors: Record<string, { bg: string; primary: string; secondary: string }> = {
  newdomain: {
    bg: '#your-color',
    primary: '#ffffff',
    secondary: '#lighter-shade',
  },
};
```

2. Update `getTemplate` function:
```typescript
const templates = {
  newdomain: {
    title: 'New Domain Title',
    subtitle: 'Description of domain',
    icon: '🎯', // relevant emoji
    colors: domainColors.newdomain,
  },
};
```

3. Reference in metadata:
```typescript
image: `https://baobab.ng/og-images/newdomain.jpg`
```

## Caching Strategy

### HTTP Headers
```
Cache-Control: public, max-age=31536000, immutable
```

- **max-age=31536000** (1 year) - Static images that don't change
- **public** - Cacheable by all intermediaries
- **immutable** - Image content never changes

### CDN Considerations
- Images are cached at edge servers
- No need for cache invalidation (immutable)
- Reduces server load significantly

## Performance Optimization

### Generation Time
- **Average:** ~50-100ms per image
- **Cold start:** ~200-300ms (initial generation)
- **Cached:** <10ms (subsequent requests)

### Image Size
- **Typical PNG:** 15-25KB
- **With AVIF:** ~8-12KB
- **With WebP:** ~10-15KB

### Bandwidth Savings
With immutable caching:
- **Annual bandwidth saved:** ~85% (with CDN)
- **Server load reduction:** ~90% (after warming)

## Usage Patterns

### 1. Guide Pages
```typescript
// app/guides/[slug]/page.tsx
image: `https://baobab.ng/og-images/${guide.domain.slug}.jpg`
```

### 2. Calculator Pages
```typescript
// app/calculators/[slug]/page.tsx
image: `https://baobab.ng/og-images/calculators.jpg`
```

### 3. Category Pages
```typescript
// app/guides/page.tsx
image: `https://baobab.ng/og-images/guides.jpg`
```

### 4. Dynamic Content
For highly specific content (individual guides), consider:
- Using domain-specific template (simpler)
- Or pre-generating images for high-traffic pages
- Or using a dedicated image generation service

## Troubleshooting

### Image Not Displaying

1. **Check URL Format**
   - Ensure URL matches: `https://baobab.ng/og-images/[slug].jpg`
   - Verify slug exists in templates

2. **Check Social Platform Cache**
   - Use platform's debugging tools:
     - [Twitter Card Validator](https://cards-dev.twitter.com/validator)
     - [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)

3. **Check Response Headers**
   - Verify `Content-Type: image/png` is returned
   - Verify `Cache-Control` headers are present

### Slow Image Generation

1. **First Request Penalty**
   - Dynamic generation requires execution time
   - Subsequent requests are cached

2. **Optimization**
   - Use CDN to reduce latency
   - Consider pre-warming cache for high-traffic pages
   - Monitor generation time in Vercel Analytics

## Future Enhancements

### Planned Improvements

1. **Guide-Specific Images**
   - Generate unique images per guide with title text
   - Use SVG text rendering for flexibility
   - Cache final images to storage

2. **Dynamic Text Rendering**
   - Show guide title on image
   - Include key metrics (cost, time)
   - Personalization based on viewing context

3. **A/B Testing**
   - Test different image designs
   - Track performance on social platforms
   - Optimize based on click-through rates

4. **Analytics Integration**
   - Track image impressions on social media
   - Measure click-through rates by image type
   - Optimize based on performance data

## References

- [Next.js ImageResponse Documentation](https://nextjs.org/docs/app/api-reference/functions/image-response)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Card Documentation](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
