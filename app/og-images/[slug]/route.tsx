/**
 * Dynamic Open Graph Image Generation
 * Generates OG images on-the-fly for social media sharing
 */

import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';

interface ImageParams {
  params: { slug: string };
}

/**
 * Domain-specific color schemes
 */
const domainColors: Record<string, { bg: string; primary: string; secondary: string }> = {
  government: {
    bg: '#dc2626',
    primary: '#ffffff',
    secondary: '#fecaca',
  },
  business: {
    bg: '#2563eb',
    primary: '#ffffff',
    secondary: '#bfdbfe',
  },
  education: {
    bg: '#059669',
    primary: '#ffffff',
    secondary: '#a7f3d0',
  },
  guides: {
    bg: '#7c3aed',
    primary: '#ffffff',
    secondary: '#ddd6fe',
  },
  calculators: {
    bg: '#0891b2',
    primary: '#ffffff',
    secondary: '#a5f3fc',
  },
};

/**
 * Get template for OG image
 */
function getTemplate(
  slug: string
): {
  title: string;
  subtitle: string;
  icon: string;
  colors: (typeof domainColors)[keyof typeof domainColors];
} {
  const templates: Record<
    string,
    {
      title: string;
      subtitle: string;
      icon: string;
      colors: (typeof domainColors)[keyof typeof domainColors];
    }
  > = {
    'baobab-default': {
      title: 'Baobab',
      subtitle: 'Get Things Done in Nigeria',
      icon: '🌳',
      colors: domainColors.business,
    },
    government: {
      title: 'Government',
      subtitle: 'Business Registration, Identity & Civil Documents, Taxes, Immigration',
      icon: '🏛️',
      colors: domainColors.government,
    },
    business: {
      title: 'Business',
      subtitle: 'Starting a Business, Funding, Tax Compliance, HR & Payroll',
      icon: '💼',
      colors: domainColors.business,
    },
    education: {
      title: 'Education',
      subtitle: 'WAEC, JAMB, NYSC, Scholarships, Admissions',
      icon: '🎓',
      colors: domainColors.education,
    },
    guides: {
      title: 'Guides',
      subtitle: 'Step-by-step instructions to accomplish tasks in Nigeria',
      icon: '📖',
      colors: domainColors.guides,
    },
    calculators: {
      title: 'Calculators',
      subtitle: 'Interactive tools to estimate costs and plan your tasks',
      icon: '🧮',
      colors: domainColors.calculators,
    },
    tools: {
      title: 'Tools',
      subtitle: 'Free calculators and estimators for Nigerian tasks',
      icon: '⚙️',
      colors: domainColors.calculators,
    },
  };

  return (
    templates[slug] ||
    templates['baobab-default']
  );
}

/**
 * Generate OG image
 */
export async function GET(
  _request: Request,
  { params }: ImageParams
) {
  const { slug } = params;
  const template = getTemplate(slug);
  const { title, subtitle, icon, colors } = template;

  try {
    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '1200px',
            height: '630px',
            backgroundColor: colors.bg,
            justifyContent: 'center',
            alignItems: 'center',
            color: colors.primary,
            fontFamily: 'system-ui, -apple-system, sans-serif',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Background pattern */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0.1,
              background: `repeating-linear-gradient(
                45deg,
                transparent,
                transparent 35px,
                rgba(255,255,255,0.5) 35px,
                rgba(255,255,255,0.5) 70px
              )`,
            }}
          />

          {/* Content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              zIndex: 10,
              gap: '20px',
            }}
          >
            {/* Icon */}
            <div
              style={{
                fontSize: '120px',
                lineHeight: 1,
              }}
            >
              {icon}
            </div>

            {/* Title */}
            <h1
              style={{
                fontSize: '72px',
                fontWeight: 'bold',
                margin: 0,
                letterSpacing: '-2px',
              }}
            >
              {title}
            </h1>

            {/* Subtitle */}
            <p
              style={{
                fontSize: '32px',
                margin: 0,
                opacity: 0.9,
                fontWeight: '500',
                maxWidth: '1000px',
              }}
            >
              {subtitle}
            </p>

            {/* Tagline */}
            <div
              style={{
                marginTop: '20px',
                paddingTop: '20px',
                borderTop: `2px solid ${colors.secondary}`,
              }}
            >
              <p
                style={{
                  fontSize: '24px',
                  margin: 0,
                  opacity: 0.8,
                }}
              >
                baobab.ng
              </p>
            </div>
          </div>

          {/* Corner accent */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: '300px',
              height: '300px',
              backgroundColor: colors.secondary,
              borderRadius: '300px 0 0 0',
              opacity: 0.2,
            }}
          />
        </div>
      ),
      {
        width: 1200,
        height: 630,
        headers: {
          'Content-Type': 'image/png',
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      }
    );
  } catch (error) {
    console.error('Error generating OG image:', error);
    // Return fallback response
    return new Response('Failed to generate image', { status: 500 });
  }
}
