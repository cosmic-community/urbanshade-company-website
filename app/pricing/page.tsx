import { getPricingPlans } from '@/lib/cosmic'
import { Metadata } from 'next'
import PricingCard from '@/components/PricingCard'

export const metadata: Metadata = {
  title: 'Pricing & Finance - UrbanShade Company',
  description: 'Explore our transparent pricing plans for renewable energy solutions. Find the perfect package for your needs with flexible financing options.',
}

export default async function PricingPage() {
  const pricingPlans = await getPricingPlans()

  if (pricingPlans.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-secondary-900 mb-8">Pricing & Finance</h1>
          <p className="text-lg text-secondary-600">No pricing plans available at this time.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-secondary-900 mb-4">Pricing & Finance</h1>
        <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
          Choose the perfect renewable energy package for your needs. All plans include professional installation, 
          comprehensive warranty coverage, and ongoing support to ensure optimal performance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {pricingPlans.map((plan) => (
          <PricingCard key={plan.id} plan={plan} />
        ))}
      </div>

      {/* Additional Information */}
      <div className="mt-16 bg-secondary-50 rounded-2xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-secondary-900 mb-4">Financing Options Available</h2>
          <p className="text-secondary-600 max-w-2xl mx-auto">
            We understand that investing in renewable energy is a significant decision. That's why we offer flexible 
            financing options to make your transition to clean energy as affordable as possible.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h3 className="font-semibold text-secondary-900 mb-2">Low APR Financing</h3>
            <p className="text-secondary-600 text-sm">Competitive rates starting from 2.99% APR with terms up to 20 years.</p>
          </div>
          <div>
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-secondary-900 mb-2">Zero Down Options</h3>
            <p className="text-secondary-600 text-sm">Start saving immediately with no upfront costs on qualified installations.</p>
          </div>
          <div>
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-semibold text-secondary-900 mb-2">Tax Credits & Rebates</h3>
            <p className="text-secondary-600 text-sm">Take advantage of federal and local incentives to reduce your total cost.</p>
          </div>
        </div>
      </div>
    </div>
  )
}