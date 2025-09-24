import { getResources } from '@/lib/cosmic'
import { Metadata } from 'next'
import ResourceCard from '@/components/ResourceCard'

export const metadata: Metadata = {
  title: 'Resources - UrbanShade Company',
  description: 'Access our comprehensive library of renewable energy resources including guides, whitepapers, videos, and case studies.',
}

export default async function ResourcesPage() {
  const resources = await getResources()

  if (resources.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-secondary-900 mb-8">Resources</h1>
          <p className="text-lg text-secondary-600">No resources available at this time.</p>
        </div>
      </div>
    )
  }

  // Separate featured and regular resources
  const featuredResources = resources.filter(resource => resource.metadata?.featured_resource)
  const regularResources = resources.filter(resource => !resource.metadata?.featured_resource)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-secondary-900 mb-4">Resources</h1>
        <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
          Access our comprehensive library of renewable energy resources. From detailed guides to industry insights, 
          find everything you need to make informed decisions about your energy future.
        </p>
      </div>

      {/* Featured Resources */}
      {featuredResources.length > 0 && (
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-secondary-900 mb-8">Featured Resources</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} featured />
            ))}
          </div>
        </div>
      )}

      {/* All Resources */}
      {resources.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-secondary-900 mb-8">
            {featuredResources.length > 0 ? 'All Resources' : 'Browse Resources'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}