// app/products/[slug]/page.tsx
import { getProductBySlug, getProducts } from '@/lib/cosmic'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const products = await getProducts()
  return products.map((product) => ({
    slug: product.slug,
  }))
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
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
    description: product.metadata?.short_description || 'Learn more about our renewable energy products.',
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  // Safe access to product specifications with proper null checks
  const specifications = product.metadata?.specifications || {}
  const keyFeatures = product.metadata?.key_features || []
  const productImages = product.metadata?.product_images || []

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          {productImages.length > 0 ? (
            <div className="aspect-square bg-secondary-100 rounded-lg overflow-hidden">
              <img
                src={`${productImages[0].imgix_url}?w=800&h=800&fit=crop&auto=format,compress`}
                alt={product.metadata?.product_name || product.title}
                className="w-full h-full object-cover"
                width="400"
                height="400"
              />
            </div>
          ) : (
            <div className="aspect-square bg-secondary-100 rounded-lg flex items-center justify-center">
              <span className="text-4xl">⚡</span>
            </div>
          )}
          
          {/* Additional Images */}
          {productImages.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {productImages.slice(1, 5).map((image, index) => (
                <div key={index} className="aspect-square bg-secondary-100 rounded overflow-hidden">
                  <img
                    src={`${image.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
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

        {/* Product Details */}
        <div className="space-y-6">
          {/* Category Badge */}
          {product.metadata?.category && (
            <div>
              <span className="inline-block px-3 py-1 bg-primary-100 text-primary-800 text-sm font-medium rounded">
                {product.metadata.category.value}
              </span>
            </div>
          )}

          {/* Product Title and Price */}
          <div>
            <h1 className="text-3xl font-bold text-secondary-900 mb-2">
              {product.metadata?.product_name || product.title}
            </h1>
            {product.metadata?.price && (
              <p className="text-2xl font-semibold text-primary-600">
                {product.metadata.price}
              </p>
            )}
          </div>

          {/* Availability */}
          {product.metadata?.available !== undefined && (
            <div className="flex items-center">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                product.metadata.available 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {product.metadata.available ? '✅ Available' : '❌ Out of Stock'}
              </span>
            </div>
          )}

          {/* Short Description */}
          {product.metadata?.short_description && (
            <p className="text-lg text-secondary-600">
              {product.metadata.short_description}
            </p>
          )}

          {/* Key Features */}
          {keyFeatures.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-secondary-900 mb-3">Key Features</h2>
              <ul className="space-y-2">
                {keyFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-primary-600 mr-2">✓</span>
                    <span className="text-secondary-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Call to Action */}
          <div className="flex gap-4">
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
              Contact Us
            </a>
          </div>
        </div>
      </div>

      {/* Full Description */}
      {product.metadata?.full_description && (
        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-secondary-900 mb-6">Product Details</h2>
          <div 
            className="prose prose-lg max-w-none text-secondary-700"
            dangerouslySetInnerHTML={{ __html: product.metadata.full_description }}
          />
        </div>
      )}

      {/* Specifications */}
      {Object.keys(specifications).length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-secondary-900 mb-6">Specifications</h2>
          <div className="bg-secondary-50 rounded-lg p-6">
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(specifications).map(([key, value]) => (
                <div key={key} className="border-b border-secondary-200 pb-2">
                  <dt className="font-medium text-secondary-900 capitalize">
                    {key.replace(/_/g, ' ')}
                  </dt>
                  <dd className="text-secondary-600 mt-1">
                    {typeof value === 'string' ? value : String(value)}
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