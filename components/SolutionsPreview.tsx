import { Solution } from '@/types'
import SolutionCard from './SolutionCard'
import Link from 'next/link'

interface SolutionsPreviewProps {
  solutions: Solution[]
}

export default function SolutionsPreview({ solutions }: SolutionsPreviewProps) {
  if (solutions.length === 0) {
    return null
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {solutions.map((solution) => (
          <SolutionCard key={solution.id} solution={solution} />
        ))}
      </div>
      
      {/* View All Link */}
      <div className="text-center mt-8">
        <Link
          href="/solutions"
          className="btn btn-outline"
        >
          View All Solutions
        </Link>
      </div>
    </div>
  )
}