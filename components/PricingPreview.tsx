import { PricingPlan } from '@/types'
import PricingCard from './PricingCard'
import Link from 'next/link'

interface PricingPreviewProps {
  plans: PricingPlan[]
}

export default function PricingPreview({ plans }: PricingPreviewProps) {
  if (plans.length === 0) {
    return null
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {plans.map((plan) => (
          <PricingCard key={plan.id} plan={plan} />
        ))}
      </div>
      
      {/* View All Link */}
      <div className="text-center mt-8">
        <Link
          href="/pricing"
          className="btn btn-outline"
        >
          View All Plans
        </Link>
      </div>
    </div>
  )
}