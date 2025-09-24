// app/[slug]/page.tsx
import { getPageBySlug, getPages } from '@/lib/cosmic'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface DynamicPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const pages = await getPages()
  return pages
    .filter(page => page.slug !== 'home') // Exclude home page as it's handled by app/page.tsx
    .map((page) => ({
      slug: page.slug,
    }))
}

export async function generateMetadata({ params }: DynamicPageProps): Promise<Metadata> {
  const { slug } = await params
  const page = await getPageBySlug(slug)

  if (!page) {
    return {
      title: 'Page Not Found',
      description: 'The requested page could not be found.',
    }
  }

  return {
    title: page.metadata?.meta_title || `${page.metadata?.page_title || page.title} - UrbanShade Company`,
    description: page.metadata?.meta_description || 'Learn more about UrbanShade Company and our renewable energy solutions.',
  }
}

export default async function DynamicPage({ params }: DynamicPageProps) {
  const { slug } = await params
  const page = await getPageBySlug(slug)

  if (!page) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Featured Image */}
      {page.metadata?.featured_image && (
        <div className="mb-8">
          <img
            src={`${page.metadata.featured_image.imgix_url}?w=1200&h=400&fit=crop&auto=format,compress`}
            alt={page.metadata?.page_title || page.title}
            className="w-full h-64 sm:h-80 object-cover rounded-lg"
            width="600"
            height="200"
          />
        </div>
      )}

      {/* Page Content */}
      <article className="prose prose-lg prose-secondary max-w-none">
        {page.metadata?.content ? (
          <div dangerouslySetInnerHTML={{ __html: page.metadata.content }} />
        ) : (
          <div>
            <h1>{page.metadata?.page_title || page.title}</h1>
            <p>This page is currently being updated. Please check back soon for more content.</p>
          </div>
        )}
      </article>

      {/* Contact CTA for relevant pages */}
      {(slug === 'about-us' || slug === 'contact') && (
        <div className="mt-12 bg-primary-50 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-secondary-900 mb-4">Ready to Get Started?</h2>
          <p className="text-secondary-600 mb-6 max-w-2xl mx-auto">
            Contact us today for a free consultation and discover how our renewable energy solutions can benefit your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="btn btn-primary"
            >
              Get Free Quote
            </a>
            <a
              href="tel:+15551234567"
              className="btn btn-outline"
            >
              Call (555) 123-4567
            </a>
          </div>
        </div>
      )}
    </div>
  )
}