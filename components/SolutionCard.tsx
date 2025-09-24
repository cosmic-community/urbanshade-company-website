import { Solution } from '@/types'
import Link from 'next/link'

interface SolutionCardProps {
  solution: Solution
}

export default function SolutionCard({ solution }: SolutionCardProps) {
  const benefits = solution.metadata?.key_benefits?.slice(0, 3) || []

  return (
    <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-200">
      {/* Solution Image */}
      <div className="aspect-video bg-secondary-100 rounded-t-lg overflow-hidden">
        {solution.metadata?.solution_image ? (
          <img
            src={`${solution.metadata.solution_image.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`}
            alt={solution.metadata?.solution_title || solution.title}
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

      {/* Solution Info */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-secondary-900 line-clamp-2">
            {solution.metadata?.solution_title || solution.title}
          </h3>
          {solution.metadata?.target_industry && (
            <span className="inline-block px-2 py-1 bg-primary-100 text-primary-800 text-xs font-medium rounded">
              {solution.metadata.target_industry.value}
            </span>
          )}
        </div>

        {solution.metadata?.overview && (
          <p className="text-secondary-600 text-sm mb-4 line-clamp-3">
            {solution.metadata.overview}
          </p>
        )}

        {/* Benefits */}
        {benefits.length > 0 && (
          <ul className="space-y-1 mb-4">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-center text-sm text-secondary-600">
                <svg className="w-4 h-4 text-primary-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="line-clamp-1">{benefit}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-2">
          <Link
            href={`/solutions/${solution.slug}`}
            className="btn btn-primary flex-1 text-center"
          >
            Learn More
          </Link>
          <a
            href="/contact"
            className="btn btn-outline flex-1 text-center"
          >
            {solution.metadata?.cta_text || 'Get Started'}
          </a>
        </div>
      </div>
    </div>
  )
}