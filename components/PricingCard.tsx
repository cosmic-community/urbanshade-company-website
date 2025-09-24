import { PricingPlan } from '@/types'

interface PricingCardProps {
  plan: PricingPlan
}

export default function PricingCard({ plan }: PricingCardProps) {
  const features = plan.metadata?.features_included || []
  const isPopular = plan.metadata?.popular_plan

  return (
    <div className={`bg-white rounded-lg shadow-sm border-2 hover:shadow-md transition-all duration-200 ${isPopular ? 'border-primary-600 relative' : 'border-gray-200'}`}>
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-medium">
            Most Popular
          </span>
        </div>
      )}

      <div className="p-6">
        {/* Plan Header */}
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold text-secondary-900 mb-2">
            {plan.metadata?.plan_name || plan.title}
          </h3>
          {plan.metadata?.plan_description && (
            <p className="text-secondary-600 text-sm">
              {plan.metadata.plan_description}
            </p>
          )}
        </div>

        {/* Pricing */}
        {plan.metadata?.price && (
          <div className="text-center mb-6">
            <div className="text-3xl font-bold text-secondary-900">
              {plan.metadata.price}
            </div>
            {plan.metadata?.price_period && (
              <div className="text-sm text-secondary-600">
                {plan.metadata.price_period.value}
              </div>
            )}
          </div>
        )}

        {/* Features */}
        {features.length > 0 && (
          <ul className="space-y-3 mb-6">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <svg className="w-5 h-5 text-primary-600 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-secondary-700 text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        )}

        {/* CTA Button */}
        <a
          href="/contact"
          className={`btn w-full text-center ${isPopular ? 'btn-primary' : 'btn-outline'}`}
        >
          {plan.metadata?.button_text || 'Get Started'}
        </a>
      </div>
    </div>
  )
}