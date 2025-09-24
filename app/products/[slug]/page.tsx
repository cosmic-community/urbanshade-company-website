// app/products/[slug]/page.tsx
import { getProductBySlug, getProducts } from '@/lib/cosmic'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  
  if (!product) {
    return {
      title: 'Product Not Found'
    }
  }

  return {
    title: `${product.metadata?.product_name || product.title} - UrbanShade Company`,
    description: product.metadata?.short_description || `Learn more about ${product.title}`,
  }
}

export async function generateStaticParams() {
  const products = await getProducts()
  return products.map((product) => ({
    slug: product.slug,
  }))
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          {product.metadata?.product_images && product.metadata.product_images.length > 0 ? (
            <div className="grid gap-4">
              {/* Main Image */}
              <div className="aspect-square bg-secondary-100 rounded-lg overflow-hidden">
                <img
                  src={`${product.metadata.product_images[0].imgix_url}?w=800&h=800&fit=crop&auto=format,compress`}
                  alt={product.metadata?.product_name || product.title}
                  className="w-full h-full object-cover"
                  width="400"
                  height="400"
                />
              </div>
              
              {/* Additional Images */}
              {product.metadata.product_images.length > 1 && (
                <div className="grid grid-cols-3 gap-4">
                  {product.metadata.product_images.slice(1).map((image, index) => (
                    <div key={index} className="aspect-square bg-secondary-100 rounded-lg overflow-hidden">
                      <img
                        src={`${image?.imgix_url || ''}?w=200&h=200&fit=crop&auto=format,compress`}
                        alt={`${product.metadata?.product_name || product.title} - Image ${index + 2}`}
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
            <div className="aspect-square bg-secondary-100 rounded-lg flex items-center justify-center">
              <span className="text-4xl">🔋</span>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-secondary-900 mb-2">
              {product.metadata?.product_name || product.title}
            </h1>
            {product.metadata?.category && (
              <span className="inline-block px-3 py-1 bg-primary-100 text-primary-800 text-sm font-medium rounded-full">
                {product.metadata.category.value}
              </span>
            )}
          </div>

          {product.metadata?.price && (
            <div className="text-3xl font-bold text-primary-600">
              {product.metadata.price}
            </div>
          )}

          {product.metadata?.short_description && (
            <p className="text-lg text-secondary-600">
              {product.metadata.short_description}
            </p>
          )}

          {/* Key Features */}
          {product.metadata?.key_features && product.metadata.key_features.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-3">Key Features</h3>
              <ul className="space-y-2">
                {product.metadata.key_features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-primary-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-secondary-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Availability Status */}
          <div className="flex items-center space-x-3">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              product.metadata?.available 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {product.metadata?.available ? '✅ Available' : '❌ Out of Stock'}
            </span>
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <a
              href="/contact"
              className="btn btn-primary w-full"
            >
              Get Quote
            </a>
            <a
              href="/contact"
              className="btn btn-outline w-full"
            >
              Contact Sales
            </a>
          </div>
        </div>
      </div>

      {/* Full Description */}
      {product.metadata?.full_description && (
        <div className="mt-16 border-t pt-16">
          <h2 className="text-3xl font-bold text-secondary-900 mb-8">Product Details</h2>
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: product.metadata.full_description }}
          />
        </div>
      )}

      {/* Specifications */}
      {product.metadata?.specifications && Object.keys(product.metadata.specifications).length > 0 && (
        <div className="mt-16 border-t pt-16">
          <h2 className="text-3xl font-bold text-secondary-900 mb-8">Specifications</h2>
          <div className="bg-secondary-50 rounded-lg p-8">
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(product.metadata.specifications).map(([key, value]) => (
                <div key={key}>
                  <dt className="text-sm font-medium text-secondary-500 uppercase tracking-wider">
                    {key.replace(/_/g, ' ')}
                  </dt>
                  <dd className="mt-1 text-lg text-secondary-900">
                    {String(value)}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      )}
    </div>
  )
}