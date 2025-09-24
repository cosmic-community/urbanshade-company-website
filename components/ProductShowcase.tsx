import { Product } from '@/types'
import ProductCard from './ProductCard'
import Link from 'next/link'

interface ProductShowcaseProps {
  products: Product[]
}

export default function ProductShowcase({ products }: ProductShowcaseProps) {
  if (products.length === 0) {
    return null
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {/* View All Link */}
      <div className="text-center mt-8">
        <Link
          href="/products"
          className="btn btn-outline"
        >
          View All Products
        </Link>
      </div>
    </div>
  )
}