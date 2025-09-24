import { getSolutions } from '@/lib/cosmic'
import { Metadata } from 'next'
import SolutionCard from '@/components/SolutionCard'

export const metadata: Metadata = {
  title: 'Solutions - UrbanShade Company',
  description: 'Explore our industry-specific renewable energy solutions designed for healthcare, education, retail, manufacturing, and hospitality sectors.',
}

export default async function SolutionsPage() {
  const solutions = await getSolutions()

  if (solutions.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-secondary-900 mb-8">Our Solutions</h1>
          <p className="text-lg text-secondary-600">No solutions available at this time.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-secondary-900 mb-4">Our Solutions</h1>
        <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
          We provide industry-specific renewable energy solutions tailored to meet the unique needs of different sectors. 
          From healthcare facilities to manufacturing plants, we have the expertise to deliver the right solution for your business.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {solutions.map((solution) => (
          <SolutionCard key={solution.id} solution={solution} />
        ))}
      </div>
    </div>
  )
}