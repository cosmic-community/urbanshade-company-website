// app/products/[slug]/page.tsx
import { getProductBySlug } from '@/lib/cosmic'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    return {
      title: 'Product Not Found - UrbanShade Company',
      description: 'The requested product could not be found.',
    }
  }

  return {
    title: `${product.metadata?.product_name || product.title} - UrbanShade Company`,
    description: product.metadata?.short_description || `Learn more about ${product.title}`,
  }
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  // Safe access to metadata with proper null checks
  const metadata = product.metadata || {}
  const productName = metadata.product_name || product.title
  const shortDescription = metadata.short_description || ''
  const fullDescription = metadata.full_description || ''
  const price = metadata.price || 'Contact for pricing'
  const category = metadata.category?.value || 'Product'
  const productImages = metadata.product_images || []
  const keyFeatures = metadata.key_features || []
  const specifications = metadata.specifications || {}
  const isAvailable = metadata.available !== false

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          {productImages.length > 0 ? (
            <div className="space-y-4">
              <div className="bg-secondary-100 rounded-lg overflow-hidden aspect-square">
                <img
                  src={`${productImages[0].imgix_url}?w=800&h=800&fit=crop&auto=format,compress`}
                  alt={productName}
                  className="w-full h-full object-cover"
                  width="400"
                  height="400"
                />
              </div>
              {productImages.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {productImages.slice(1, 5).map((image, index) => (
                    <div key={index} className="bg-secondary-100 rounded-lg overflow-hidden aspect-square">
                      <img
                        src={`${image.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
                        alt={`${productName} - Image ${index + 2}`}
                        className="w-full h-full object-cover"
                        width="100"
                        height="100"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="bg-secondary-100 rounded-lg aspect-square flex items-center justify-center">
              <span className="text-4xl text-secondary-400">📦</span>
            </div>
          )}
        </div>

        {/* Product Information */}
        <div className="space-y-6">
          {/* Category Badge */}
          <div>
            <span className="inline-block px-3 py-1 bg-primary-100 text-primary-800 text-sm font-medium rounded-full">
              {category}
            </span>
          </div>

          {/* Product Name and Price */}
          <div>
            <h1 className="text-3xl font-bold text-secondary-900 mb-2">{productName}</h1>
            <p className="text-2xl font-bold text-primary-600">{price}</p>
          </div>

          {/* Availability Status */}
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${isAvailable ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className={`text-sm font-medium ${isAvailable ? 'text-green-700' : 'text-red-700'}`}>
              {isAvailable ? 'Available' : 'Currently Unavailable'}
            </span>
          </div>

          {/* Short Description */}
          {shortDescription && (
            <p className="text-lg text-secondary-600">{shortDescription}</p>
          )}

          {/* Key Features */}
          {keyFeatures.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-secondary-900 mb-3">Key Features</h3>
              <ul className="space-y-2">
                {keyFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-primary-600 mt-1">✓</span>
                    <span className="text-secondary-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Call to Action */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/contact"
              className="btn btn-primary flex-1 text-center"
            >
              Get Quote
            </a>
            <a
              href="/contact"
              className="btn btn-outline flex-1 text-center"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>

      {/* Full Description */}
      {fullDescription && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-secondary-900 mb-6">Product Details</h2>
          <div 
            className="prose max-w-none text-secondary-600"
            dangerouslySetInnerHTML={{ __html: fullDescription }}
          />
        </div>
      )}

      {/* Specifications */}
      {Object.keys(specifications).length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-secondary-900 mb-6">Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(specifications).map(([key, value]) => (
              <div key={key} className="border-b border-secondary-200 pb-2">
                <dt className="text-sm font-medium text-secondary-900 capitalize">
                  {key.replace(/_/g, ' ')}
                </dt>
                <dd className="text-secondary-600">{String(value)}</dd>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Contact Section */}
      <div className="mt-16 bg-primary-50 rounded-2xl p-8 text-center">
        <h3 className="text-2xl font-bold text-secondary-900 mb-4">Ready to Get Started?</h3>
        <p className="text-secondary-600 mb-6 max-w-2xl mx-auto">
          Contact our team to learn more about this product and get a personalized quote for your project.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/contact"
            className="btn btn-primary"
          >
            Request Quote
          </a>
          <a
            href="tel:+15551234567"
            className="btn btn-outline"
          >
            Call (555) 123-4567
          </a>
        </div>
      </div>
    </div>
  )
}