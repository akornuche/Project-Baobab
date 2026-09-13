import Link from 'next/link';
import { EmailSignup } from '@/components/Email/EmailSignup';
import { SearchAutocomplete } from '@/components/Search/Autocomplete';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getFeaturedGuides() {
  try {
    // Get 2 featured guides from each domain
    const domains = ['government', 'business', 'education'];
    const featuredGuides = [];

    for (const domainSlug of domains) {
      const domain = await prisma.domain.findUnique({
        where: { slug: domainSlug },
      });

      if (domain) {
        const guides = await prisma.guide.findMany({
          where: {
            domainId: domain.id,
            published: true,
            isDeleted: false,
          },
          include: { subdomain: true },
          take: 2,
          orderBy: {
            publishedAt: 'desc',
          },
        });

        featuredGuides.push({
          domain,
          guides,
        });
      }
    }

    return featuredGuides;
  } catch (error) {
    console.error('Error fetching featured guides:', error);
    return [];
  }
}

export default async function Home() {
  const featuredGuides = await getFeaturedGuides();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-20">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Get Things Done in Nigeria
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Step-by-step guides to accomplish administrative, business, and life tasks with confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/guides" className="px-8 py-3 bg-white text-blue-700 rounded-lg font-medium hover:bg-blue-50 transition-colors">
              Browse Guides
            </Link>
            <Link href="/calculators" className="px-8 py-3 bg-transparent border border-white text-white rounded-lg font-medium hover:bg-white/10 transition-colors">
              Use Tools
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Search Section */}
      <div className="bg-white py-12">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 text-center">What do you need to do?</h2>
          <div className="max-w-2xl mx-auto">
            <SearchAutocomplete placeholder="Search guides, services, or tools..." />
          </div>
          <p className="text-center text-sm text-gray-500 mt-4">
            Find answers to your questions about Nigerian services, business, and education
          </p>
        </div>
      </div>

      {/* Featured Guides by Domain */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Guides</h2>
          
          {featuredGuides.map((category) => (
            <div key={category.domain.slug} className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-semibold text-gray-900">
                  {category.domain.name} Guides
                </h3>
                <Link
                  href={`/guides?domain=${category.domain.slug}`}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  View all →
                </Link>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.guides.map((guide) => (
                  <Link
                    key={guide.id}
                    href={`/guides/${guide.slug}`}
                    className="flex flex-col p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg hover:border-blue-300 transition-all group"
                  >
                    <h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-blue-600">
                      {guide.title}
                    </h3>
                    {guide.subtitle && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {guide.subtitle}
                      </p>
                    )}
                    <p className="text-sm text-gray-500 mt-auto">
                      {category.domain.name} • {guide.subdomain.name}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📖</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Guides</h3>
              <p className="text-gray-600">
                Step-by-step instructions written by experts and verified against official sources.
              </p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🧮</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Interactive Tools</h3>
              <p className="text-gray-600">
                Calculators and checklists that help you plan and estimate costs and timelines.
              </p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Resources</h3>
              <p className="text-gray-600">
                Directory of trusted professionals and services to help you complete your tasks.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Domain Categories */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Explore by Category</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/guides?domain=government" className="p-6 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors hover:shadow-md">
              <h3 className="text-xl font-semibold mb-4">Government</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Business Registration</li>
                <li>• Identity & Civil Documents</li>
                <li>• Taxes</li>
                <li>• Immigration</li>
              </ul>
            </Link>
            <Link href="/guides?domain=business" className="p-6 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors hover:shadow-md">
              <h3 className="text-xl font-semibold mb-4">Business</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Starting a Business</li>
                <li>• Funding & Loans</li>
                <li>• Regulatory Compliance</li>
                <li>• HR & Payroll</li>
              </ul>
            </Link>
            <Link href="/guides?domain=education" className="p-6 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors hover:shadow-md">
              <h3 className="text-xl font-semibold mb-4">Education</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• WAEC & NECO</li>
                <li>• JAMB & Admission</li>
                <li>• Scholarships</li>
                <li>• NYSC</li>
              </ul>
            </Link>
          </div>
        </div>
      </div>

      {/* Email Signup Section */}
      <div className="py-16 bg-gradient-to-r from-purple-600 to-indigo-700">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
          <p className="text-purple-100 mb-8">
            Get the latest guides, tools, and resources delivered to your inbox.
          </p>
          <form action="/api/subscribers" method="POST" className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="px-6 py-3 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent text-lg flex-1"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-white text-purple-700 rounded-lg font-medium hover:bg-purple-50 transition-colors"
            >
              Subscribe
            </button>
          </form>
          <p className="mt-4 text-sm text-purple-200">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>

      {/* Quick Tools Section */}
      <div className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Popular Tools</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/calculators/cac-estimator" className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">CAC Cost Estimator</h3>
              <p className="text-gray-600">Calculate the cost of registering your business with CAC</p>
            </Link>
            <Link href="/calculators/business-startup-calculator" className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Business Startup Calculator</h3>
              <p className="text-gray-600">Estimate total startup costs for your business</p>
            </Link>
            <Link href="/calculators/vat-calculator" className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🧮</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">VAT Calculator</h3>
              <p className="text-gray-600">Calculate VAT on your sales (7.5% rate)</p>
            </Link>
          </div>
        </div>
      </div>

      {/* Directory Preview */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Trusted Professionals</h2>
            <Link href="/directory" className="text-blue-600 hover:text-blue-800 font-medium">
              View all services →
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/directory/1" className="p-6 bg-white rounded-lg shadow-sm hover:shadow-lg transition-all">
              <h3 className="font-semibold text-lg">CAC Registration Services</h3>
              <p className="text-gray-600 text-sm mt-2">Professional registration assistance</p>
            </Link>
            <Link href="/directory/2" className="p-6 bg-white rounded-lg shadow-sm hover:shadow-lg transition-all">
              <h3 className="font-semibold text-lg">Tax Consultants</h3>
              <p className="text-gray-600 text-sm mt-2">FIRS-registered tax experts</p>
            </Link>
            <Link href="/directory/3" className="p-6 bg-white rounded-lg shadow-sm hover:shadow-lg transition-all">
              <h3 className="font-semibold text-lg">Business Lawyers</h3>
              <p className="text-gray-600 text-sm mt-2">Legal counsel for your business</p>
            </Link>
            <Link href="/directory/4" className="p-6 bg-white rounded-lg shadow-sm hover:shadow-lg transition-all">
              <h3 className="font-semibold text-lg">Immigration Consultants</h3>
              <p className="text-gray-600 text-sm mt-2">Passport and visa assistance</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}