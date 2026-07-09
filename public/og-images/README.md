# Open Graph Images

This directory contains Open Graph images for social media sharing.

## Image Types

### Static Images
Pre-generated images for specific contexts:
- `baobab-default.jpg` - Default/homepage image
- `guides.jpg` - Guides section image
- `calculators.jpg` - Calculators/Tools section image

### Domain-Specific Images
Generated dynamically but also available as static fallbacks:
- `government.jpg` - Government domain
- `business.jpg` - Business domain
- `education.jpg` - Education domain

## Dimensions

All images are **1200 x 630 pixels** (1.9:1 aspect ratio).

This is the ideal size for:
- Twitter Card (Summary Large Image)
- Facebook sharing
- LinkedIn sharing
- Most messaging apps

## Generation

### Dynamic Generation
Images are generated on-demand via `/app/og-images/[slug]/route.tsx` using Next.js ImageResponse API.

URL format: `https://baobab.ng/og-images/{slug}.jpg`

### Static Fallback
If dynamic generation fails, static images in this directory are used as fallback.

## Adding New Images

1. Create a 1200x630px image using:
   - Figma
   - Canva
   - Adobe Creative Suite
   - Online editors like Pixlr or Photopea

2. Save as JPEG format
3. Optimize for web:
   - Target: 15-25KB
   - Quality: 85%
   - Progressive JPEG enabled

4. Upload to this directory

5. Reference in metadata:
   ```typescript
   image: 'https://baobab.ng/og-images/myimage.jpg'
   ```

## Optimization Tips

1. **Color Contrast**
   - Ensure text is readable on all backgrounds
   - Use light text on dark backgrounds
   - Minimum contrast ratio: 4.5:1

2. **File Size**
   - Compress with TinyJPG or similar
   - Target: 15-25KB per image
   - Use progressive JPEG for faster loading

3. **Text Legibility**
   - Use sans-serif fonts
   - Avoid small text (<18px)
   - Leave adequate margins (50px+)

4. **Branding**
   - Include Baobab logo or icon
   - Use consistent color scheme
   - Add domain color accent

## Troubleshooting

### Image Not Showing on Social Media

1. Use [Twitter Card Validator](https://cards-dev.twitter.com/validator)
2. Use [Facebook Debugger](https://developers.facebook.com/tools/debug/)
3. Check image URL is publicly accessible
4. Verify image dimensions are 1200x630

### Low Click-Through Rate

1. Test different designs
2. Ensure title is clear and compelling
3. Use high-contrast colors
4. Include relevant emoji or icon
5. Make sure text is readable at thumbnail size

## References

- [Open Graph Protocol](https://ogp.me/)
- [Twitter Cards](https://developer.twitter.com/en/docs/twitter-for-websites/cards)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
