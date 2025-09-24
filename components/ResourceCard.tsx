import { Resource } from '@/types'

interface ResourceCardProps {
  resource: Resource
  featured?: boolean
}

export default function ResourceCard({ resource, featured = false }: ResourceCardProps) {
  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'guide':
        return '📚'
      case 'whitepaper':
        return '📄'
      case 'video':
        return '🎥'
      case 'webinar':
        return '🎬'
      case 'case-study':
        return '📊'
      case 'blog-post':
        return '✍️'
      default:
        return '📄'
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  return (
    <div className={`bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-200 ${featured ? 'lg:col-span-1' : ''}`}>
      {/* Resource Image */}
      <div className={`bg-secondary-100 rounded-t-lg overflow-hidden ${featured ? 'aspect-video' : 'aspect-square'}`}>
        {resource.metadata?.thumbnail_image ? (
          <img
            src={`${resource.metadata.thumbnail_image.imgix_url}?w=600&h=${featured ? '400' : '600'}&fit=crop&auto=format,compress`}
            alt={resource.metadata?.resource_title || resource.title}
            className="w-full h-full object-cover"
            width="300"
            height={featured ? "200" : "300"}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <span className="text-4xl">
              {resource.metadata?.resource_type ? getResourceIcon(resource.metadata.resource_type.key) : '📄'}
            </span>
          </div>
        )}
      </div>

      {/* Resource Info */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className={`font-semibold text-secondary-900 line-clamp-2 ${featured ? 'text-xl' : 'text-lg'}`}>
            {resource.metadata?.resource_title || resource.title}
          </h3>
          {resource.metadata?.resource_type && (
            <span className="inline-block px-2 py-1 bg-primary-100 text-primary-800 text-xs font-medium rounded">
              {resource.metadata.resource_type.value}
            </span>
          )}
        </div>

        {resource.metadata?.description && (
          <p className={`text-secondary-600 mb-4 ${featured ? 'text-base' : 'text-sm'} line-clamp-3`}>
            {resource.metadata.description}
          </p>
        )}

        {/* Resource Details */}
        <div className="flex items-center justify-between text-sm text-secondary-500 mb-4">
          {resource.metadata?.author && (
            <span>By {resource.metadata.author}</span>
          )}
          {resource.metadata?.publication_date && (
            <span>{formatDate(resource.metadata.publication_date)}</span>
          )}
        </div>

        {/* Featured Badge */}
        {resource.metadata?.featured_resource && (
          <div className="mb-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              ⭐ Featured Resource
            </span>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          {resource.metadata?.resource_file && (
            <a
              href={resource.metadata.resource_file.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary flex-1 text-center"
            >
              Download
            </a>
          )}
          {resource.metadata?.external_link && (
            <a
              href={resource.metadata.external_link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline flex-1 text-center"
            >
              View Resource
            </a>
          )}
          {!resource.metadata?.resource_file && !resource.metadata?.external_link && (
            <a
              href={`/resources/${resource.slug}`}
              className="btn btn-primary flex-1 text-center"
            >
              Read More
            </a>
          )}
        </div>
      </div>
    </div>
  )
}