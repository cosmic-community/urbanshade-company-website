// app/solutions/[slug]/page.tsx
import { getSolutionBySlug, getSolutions } from '@/lib/cosmic'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ProductCard from '@/components/ProductCard'

interface SolutionPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const solutions = await getSolutions()
  return solutions.map((solution) => ({
    slug: solution.slug,
  }))
}

export async function generateMetadata({ params }: SolutionPageProps): Promise<Metadata> {
  const { slug } = await params
  const solution = await getSolutionBySlug(slug)

  if (!solution) {
    return {
      title: 'Solution Not Found',
      description: 'The requested solution could not be found.',
    }
  }

  return {
    title: `${solution.metadata?.solution_title || solution.title} - UrbanShade Company`,
    description: solution.metadata?.overview || 'Learn more about our renewable energy solution.',
  }
}

export default async function SolutionPage({ params }: SolutionPageProps) {
  const { slug } = await params
  const solution = await getSolutionBySlug(slug)

  if (!solution) {
    notFound()
  }

  const benefits = solution.metadata?.key_benefits
  const relatedProducts = solution.metadata?.related_products

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Breadcrumb */}
      <nav className="flex mb-8" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-4">
          <li>
            <Link href="/" className="text-secondary-500 hover:text-secondary-700">Home</Link>
          </li>
          <li>
            <span className="text-secondary-500">/</span>
          </li>
          <li>
            <Link href="/solutions" className="text-secondary-500 hover:text-secondary-700">Solutions</Link>
          </li>
          <li>
            <span className="text-secondary-500">/</span>
          </li>
          <li>
            <span className="text-secondary-900 font-medium">{solution.metadata?.solution_title || solution.title}</span>
          </li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Solution Image */}
        <div>
          {solution.metadata?.solution_image ? (
            <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
              <img
                src={`${solution.metadata.solution_image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
                alt={solution.metadata?.solution_title || solution.title}
                className="w-full h-full object-cover"
                width="400"
                height="300"
              />
            </div>
          ) : (
            <div className="aspect-video rounded-lg bg-secondary-100 flex items-center justify-center">
              <span className="text-secondary-500">No image available</span>
            </div>
          )}
        </div>

        {/* Solution Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900 mb-2">
              {solution.metadata?.solution_title || solution.title}
            </h1>
            {solution.metadata?.target_industry && (
              <span className="inline-block px-3 py-1 bg-primary-100 text-primary-800 text-sm font-medium rounded-full">
                {solution.metadata.target_industry.value}
              </span>
            )}
          </div>

          {solution.metadata?.overview && (
            <p className="text-lg text-secondary-600">
              {solution.metadata.overview}
            </p>
          )}

          {solution.metadata?.detailed_description && (
            <div 
              className="prose prose-secondary max-w-none"
              dangerouslySetInnerHTML={{ __html: solution.metadata.detailed_description }}
            />
          )}

          <div className="pt-4">
            <a
              href="/contact"
              className="btn btn-primary"
            >
              {solution.metadata?.cta_text || 'Get Started'}
            </a>
          </div>
        </div>
      </div>

      {/* Key Benefits */}
      {benefits && benefits.length > 0 && (
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-secondary-900 mb-8">Key Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-secondary-700 leading-relaxed">{benefit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Related Products */}
      {relatedProducts && relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-secondary-900 mb-8">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}