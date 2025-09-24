import { Installation } from '@/types'

interface InstallationCardProps {
  installation: Installation
  featured?: boolean
}

export default function InstallationCard({ installation, featured = false }: InstallationCardProps) {
  const mainImage = installation.metadata?.project_images?.[0]

  return (
    <div className={`bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-200 ${featured ? 'lg:col-span-1' : ''}`}>
      {/* Project Image */}
      <div className={`bg-secondary-100 rounded-t-lg overflow-hidden ${featured ? 'aspect-video' : 'aspect-square'}`}>
        {mainImage ? (
          <img
            src={`${mainImage.imgix_url}?w=800&h=${featured ? '600' : '800'}&fit=crop&auto=format,compress`}
            alt={installation.metadata?.project_title || installation.title}
            className="w-full h-full object-cover"
            width={featured ? "400" : "300"}
            height={featured ? "300" : "300"}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <span className="text-secondary-500">No image available</span>
          </div>
        )}
      </div>

      {/* Project Info */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className={`font-semibold text-secondary-900 line-clamp-2 ${featured ? 'text-xl' : 'text-lg'}`}>
            {installation.metadata?.project_title || installation.title}
          </h3>
          {installation.metadata?.project_type && (
            <span className="inline-block px-2 py-1 bg-primary-100 text-primary-800 text-xs font-medium rounded">
              {installation.metadata.project_type.value}
            </span>
          )}
        </div>

        {installation.metadata?.location && (
          <p className="text-sm text-secondary-500 mb-3">
            📍 {installation.metadata.location}
          </p>
        )}

        {installation.metadata?.client_name && (
          <p className="text-sm text-secondary-600 mb-3">
            <strong>Client:</strong> {installation.metadata.client_name}
          </p>
        )}

        {installation.metadata?.project_description && (
          <div 
            className={`text-secondary-600 mb-4 ${featured ? 'text-base' : 'text-sm'} line-clamp-3`}
            dangerouslySetInnerHTML={{ 
              __html: installation.metadata.project_description.replace(/<[^>]*>/g, '').substring(0, 200) + '...' 
            }}
          />
        )}

        {/* Project Details */}
        <div className="grid grid-cols-2 gap-4 text-sm text-secondary-600 mb-4">
          {installation.metadata?.completion_date && (
            <div>
              <span className="font-medium">Completed:</span> {new Date(installation.metadata.completion_date).toLocaleDateString()}
            </div>
          )}
          {installation.metadata?.project_duration && (
            <div>
              <span className="font-medium">Duration:</span> {installation.metadata.project_duration}
            </div>
          )}
        </div>

        {/* Client Testimonial */}
        {installation.metadata?.client_testimonial && featured && (
          <blockquote className="border-l-4 border-primary-600 pl-4 italic text-secondary-700 mb-4">
            "{installation.metadata.client_testimonial}"
          </blockquote>
        )}

        {/* Featured Badge */}
        {installation.metadata?.featured_project && (
          <div className="mb-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              ⭐ Featured Project
            </span>
          </div>
        )}

        <div className="flex gap-2">
          <a
            href="/contact"
            className="btn btn-primary flex-1 text-center"
          >
            Similar Project?
          </a>
          <a
            href="/installations"
            className="btn btn-outline flex-1 text-center"
          >
            View Portfolio
          </a>
        </div>
      </div>
    </div>
  )
}