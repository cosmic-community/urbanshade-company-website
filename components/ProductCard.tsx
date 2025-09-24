import { Product } from '@/types'
import Link from 'next/link'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const mainImage = product.metadata?.product_images?.[0]
  const features = product.metadata?.key_features?.slice(0, 3) || []

  return (
    <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-200">
      {/* Product Image */}
      <div className="aspect-video bg-secondary-100 rounded-t-lg overflow-hidden">
        {mainImage ? (
          <img
            src={`${mainImage.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`}
            alt={product.metadata?.product_name || product.title}
            className="w-full h-full object-cover"
            width="300"
            height="200"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <span className="text-secondary-500">No image available</span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-secondary-900 line-clamp-2">
            {product.metadata?.product_name || product.title}
          </h3>
          {product.metadata?.category && (
            <span className="inline-block px-2 py-1 bg-primary-100 text-primary-800 text-xs font-medium rounded">
              {product.metadata.category.value}
            </span>
          )}
        </div>

        {product.metadata?.price && (
          <div className="text-xl font-bold text-primary-600 mb-3">
            {product.metadata.price}
          </div>
        )}

        {product.metadata?.short_description && (
          <p className="text-secondary-600 text-sm mb-4 line-clamp-3">
            {product.metadata.short_description}
          </p>
        )}

        {/* Features */}
        {features.length > 0 && (
          <ul className="space-y-1 mb-4">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center text-sm text-secondary-600">
                <svg className="w-4 h-4 text-primary-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="line-clamp-1">{feature}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-2">
          <Link
            href={`/products/${product.slug}`}
            className="btn btn-primary flex-1 text-center"
          >
            Learn More
          </Link>
          <a
            href="/contact"
            className="btn btn-outline flex-1 text-center"
          >
            Get Quote
          </a>
        </div>

        {product.metadata?.available === false && (
          <div className="mt-3 text-center">
            <span className="text-xs text-yellow-600 bg-yellow-100 px-2 py-1 rounded">
              Currently Unavailable
            </span>
          </div>
        )}
      </div>
    </div>
  )
}