import { getInstallations } from '@/lib/cosmic'
import { Metadata } from 'next'
import InstallationCard from '@/components/InstallationCard'

export const metadata: Metadata = {
  title: 'Installations - UrbanShade Company',
  description: 'Explore our successful renewable energy installations across residential, commercial, and industrial projects.',
}

export default async function InstallationsPage() {
  const installations = await getInstallations()

  if (installations.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-secondary-900 mb-8">Our Installations</h1>
          <p className="text-lg text-secondary-600">No installations available at this time.</p>
        </div>
      </div>
    )
  }

  // Separate featured and regular installations
  const featuredInstallations = installations.filter(installation => installation.metadata?.featured_project)
  const regularInstallations = installations.filter(installation => !installation.metadata?.featured_project)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-secondary-900 mb-4">Our Installations</h1>
        <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
          Discover our successful renewable energy installations. From residential homes to large commercial facilities, 
          we've helped countless clients reduce their energy costs and environmental impact.
        </p>
      </div>

      {/* Featured Installations */}
      {featuredInstallations.length > 0 && (
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-secondary-900 mb-8">Featured Projects</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredInstallations.map((installation) => (
              <InstallationCard key={installation.id} installation={installation} featured />
            ))}
          </div>
        </div>
      )}

      {/* All Installations */}
      {installations.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-secondary-900 mb-8">
            {featuredInstallations.length > 0 ? 'All Projects' : 'Our Projects'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {installations.map((installation) => (
              <InstallationCard key={installation.id} installation={installation} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}