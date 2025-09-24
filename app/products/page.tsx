import { getProducts } from '@/lib/cosmic'
import { Metadata } from 'next'
import ProductCard from '@/components/ProductCard'

export const metadata: Metadata = {
  title: 'Products - UrbanShade Company',
  description: 'Explore our range of high-quality renewable energy products including solar panels, inverters, and complete energy systems.',
}

export default async function ProductsPage() {
  const products = await getProducts()

  if (products.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-secondary-900 mb-8">Our Products</h1>
          <p className="text-lg text-secondary-600">No products available at this time.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-secondary-900 mb-4">Our Products</h1>
        <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
          Discover our complete range of renewable energy products designed to meet your specific energy needs. 
          From residential solutions to commercial installations, we have the right products for every application.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}