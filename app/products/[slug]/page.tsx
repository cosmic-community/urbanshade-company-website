// app/products/[slug]/page.tsx
import { getProductBySlug, getProducts } from '@/lib/cosmic'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'

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
      title: 'Product Not Found',
      description: 'The requested product could not be found.',
    }
  }

  return {
    title: `${product.metadata?.product_name || product.title} - UrbanShade Company`,
    description: product.metadata?.short_description || 'Learn more about our renewable energy product.',
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const specifications = product.metadata?.specifications
  const features = product.metadata?.key_features

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
            <Link href="/products" className="text-secondary-500 hover:text-secondary-700">Products</Link>
          </li>
          <li>
            <span className="text-secondary-500">/</span>
          </li>
          <li>
            <span className="text-secondary-900 font-medium">{product.metadata?.product_name || product.title}</span>
          </li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          {product.metadata?.product_images && product.metadata.product_images.length > 0 ? (
            <>
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={`${product.metadata.product_images[0].imgix_url}?w=800&h=800&fit=crop&auto=format,compress`}
                  alt={product.metadata?.product_name || product.title}
                  className="w-full h-full object-cover"
                  width="400"
                  height="400"
                />
              </div>
              {product.metadata.product_images.length > 1 && (
                <div className="grid grid-cols-3 gap-4">
                  {product.metadata.product_images.slice(1, 4).map((image, index) => (
                    <div key={index} className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                      <img
                        src={`${image.imgix_url}?w=400&h=400&fit=crop&auto=format,compress`}
                        alt={`${product.metadata?.product_name || product.title} - Image ${index + 2}`}
                        className="w-full h-full object-cover"
                        width="133"
                        height="133"
                      />
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="aspect-square rounded-lg bg-secondary-100 flex items-center justify-center">
              <span className="text-secondary-500">No image available</span>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900 mb-2">
              {product.metadata?.product_name || product.title}
            </h1>
            {product.metadata?.category && (
              <span className="inline-block px-3 py-1 bg-primary-100 text-primary-800 text-sm font-medium rounded-full">
                {product.metadata.category.value}
              </span>
            )}
          </div>

          {product.metadata?.price && (
            <div className="text-2xl font-bold text-primary-600">
              {product.metadata.price}
            </div>
          )}

          {product.metadata?.short_description && (
            <p className="text-lg text-secondary-600">
              {product.metadata.short_description}
            </p>
          )}

          {product.metadata?.full_description && (
            <div 
              className="prose prose-secondary max-w-none"
              dangerouslySetInnerHTML={{ __html: product.metadata.full_description }}
            />
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/contact"
              className="btn btn-primary flex-1"
            >
              Get Quote
            </a>
            <a
              href="/contact"
              className="btn btn-outline flex-1"
            >
              Contact Sales
            </a>
          </div>

          {product.metadata?.available === false && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-yellow-800 font-medium">
                This product is currently unavailable. Contact us for more information.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Features */}
      {features && features.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-secondary-900 mb-6">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center mt-1">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-secondary-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Specifications */}
      {specifications && typeof specifications === 'object' && Object.keys(specifications).length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-secondary-900 mb-6">Specifications</h2>
          <div className="bg-secondary-50 rounded-lg p-6">
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              {Object.entries(specifications).map(([key, value]) => (
                <div key={key}>
                  <dt className="text-sm font-medium text-secondary-900 capitalize">
                    {key.replace(/_/g, ' ')}
                  </dt>
                  <dd className="text-sm text-secondary-700 mt-1">
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