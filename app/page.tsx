import { getPageBySlug, getProducts, getSolutions, getInstallations, getPricingPlans } from '@/lib/cosmic'
import { Page } from '@/types'
import Hero from '@/components/Hero'
import ProductShowcase from '@/components/ProductShowcase'
import SolutionsPreview from '@/components/SolutionsPreview'
import InstallationsPreview from '@/components/InstallationsPreview'
import PricingPreview from '@/components/PricingPreview'

export default async function HomePage() {
  // Fetch home page content and related data
  const [homePage, products, solutions, installations, pricingPlans] = await Promise.all([
    getPageBySlug('home'),
    getProducts(),
    getSolutions(),
    getInstallations(),
    getPricingPlans()
  ])

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <Hero page={homePage} />
      
      {/* Products Preview */}
      {products.length > 0 && (
        <section className="py-16 bg-secondary-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-secondary-900 mb-4">
                Our Products
              </h2>
              <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
                Discover our range of high-quality renewable energy products designed for residential and commercial applications.
              </p>
            </div>
            <ProductShowcase products={products.slice(0, 3)} />
          </div>
        </section>
      )}

      {/* Solutions Preview */}
      {solutions.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-secondary-900 mb-4">
                Our Solutions
              </h2>
              <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
                Industry-specific energy solutions tailored to meet your unique business needs.
              </p>
            </div>
            <SolutionsPreview solutions={solutions} />
          </div>
        </section>
      )}

      {/* Installations Preview */}
      {installations.length > 0 && (
        <section className="py-16 bg-secondary-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-secondary-900 mb-4">
                Featured Projects
              </h2>
              <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
                See our successful installations and learn how we've helped businesses reduce their energy costs.
              </p>
            </div>
            <InstallationsPreview installations={installations.filter(i => i.metadata?.featured_project)} />
          </div>
        </section>
      )}

      {/* Pricing Preview */}
      {pricingPlans.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-secondary-900 mb-4">
                Pricing Plans
              </h2>
              <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
                Choose the perfect package for your energy needs with transparent pricing and comprehensive features.
              </p>
            </div>
            <PricingPreview plans={pricingPlans} />
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 gradient-bg">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Energy Future?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Get a free consultation and discover how much you can save with our renewable energy solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="btn btn-primary bg-white text-primary-600 hover:bg-gray-50"
            >
              Get Free Quote
            </a>
            <a
              href="/solutions"
              className="btn btn-outline border-white text-white hover:bg-white hover:text-primary-600"
            >
              View Solutions
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}