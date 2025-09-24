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
      title: 'Product Not Found',
      description: 'The requested product could not be found.'
    }
  }

  return {
    title: `${product.metadata?.product_name || product.title} - UrbanShade Company`,
    description: product.metadata?.short_description || 'High-quality renewable energy products and solutions.',
  }
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  // Format specifications for display
  const formatSpecifications = (specs: Record<string, any>) => {
    return Object.entries(specs).map(([key, value]) => ({
      label: key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      value: String(value)
    }))
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          {product.metadata?.product_images && product.metadata.product_images.length > 0 ? (
            <div className="aspect-square bg-secondary-100 rounded-lg overflow-hidden">
              <img
                src={`${product.metadata.product_images[0].imgix_url}?w=800&h=800&fit=crop&auto=format,compress`}
                alt={product.metadata?.product_name || product.title}
                className="w-full h-full object-cover"
                width="400"
                height="400"
              />
            </div>
          ) : (
            <div className="aspect-square bg-secondary-100 rounded-lg flex items-center justify-center">
              <span className="text-secondary-400 text-4xl">📋</span>
            </div>
          )}
          
          {/* Additional Images */}
          {product.metadata?.product_images && product.metadata.product_images.length > 1 && (
            <div className="grid grid-cols-3 gap-4">
              {product.metadata.product_images.slice(1, 4).map((image, index) => (
                <div key={index} className="aspect-square bg-secondary-100 rounded-lg overflow-hidden">
                  <img
                    src={`${image.imgix_url}?w=400&h=400&fit=crop&auto=format,compress`}
                    alt={`${product.metadata?.product_name || product.title} ${index + 2}`}
                    className="w-full h-full object-cover"
                    width="133"
                    height="133"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <h1 className="text-3xl font-bold text-secondary-900">
                {product.metadata?.product_name || product.title}
              </h1>
              {product.metadata?.available && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  ✓ Available
                </span>
              )}
            </div>
            
            {product.metadata?.category && (
              <span className="inline-block px-3 py-1 bg-primary-100 text-primary-800 text-sm font-medium rounded">
                {product.metadata.category.value}
              </span>
            )}
          </div>

          {/* Price */}
          {product.metadata?.price && (
            <div className="text-2xl font-bold text-primary-600">
              {product.metadata.price}
            </div>
          )}

          {/* Short Description */}
          {product.metadata?.short_description && (
            <p className="text-lg text-secondary-600">
              {product.metadata.short_description}
            </p>
          )}

          {/* Key Features */}
          {product.metadata?.key_features && product.metadata.key_features.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-secondary-900 mb-3">Key Features</h2>
              <ul className="space-y-2">
                {product.metadata.key_features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-secondary-700">
                    <span className="text-primary-500 mt-1">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Specifications */}
          {product.metadata?.specifications && (
            <div>
              <h2 className="text-xl font-semibold text-secondary-900 mb-3">Specifications</h2>
              <div className="bg-secondary-50 rounded-lg p-4">
                <dl className="grid grid-cols-1 gap-2">
                  {formatSpecifications(product.metadata.specifications).map((spec, index) => (
                    <div key={index} className="flex justify-between py-1">
                      <dt className="text-secondary-600 font-medium">{spec.label}:</dt>
                      <dd className="text-secondary-900">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          )}

          {/* Actions */}
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
              Learn More
            </a>
          </div>
        </div>
      </div>

      {/* Full Description */}
      {product.metadata?.full_description && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-secondary-900 mb-6">Product Details</h2>
          <div 
            className="prose prose-lg max-w-none text-secondary-700"
            dangerouslySetInnerHTML={{ __html: product.metadata.full_description }}
          />
        </div>
      )}
    </div>
  )
}