import { SupportArticle } from '@/types'

interface SupportArticleCardProps {
  article: SupportArticle
}

export default function SupportArticleCard({ article }: SupportArticleCardProps) {
  const getPriorityColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'urgent':
        return 'bg-red-100 text-red-800'
      case 'high':
        return 'bg-orange-100 text-orange-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'low':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-200">
      <div className="p-6">
        {/* Article Header */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-secondary-900 line-clamp-2">
            {article.metadata?.article_title || article.title}
          </h3>
          {article.metadata?.priority_level && (
            <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${getPriorityColor(article.metadata.priority_level.key)}`}>
              {article.metadata.priority_level.value}
            </span>
          )}
        </div>

        {/* Category */}
        {article.metadata?.category && (
          <div className="mb-3">
            <span className="inline-block px-2.5 py-0.5 bg-primary-100 text-primary-800 text-sm font-medium rounded">
              {article.metadata.category.value}
            </span>
          </div>
        )}

        {/* Article Preview */}
        {article.metadata?.article_content && (
          <div className="text-secondary-600 text-sm mb-4 line-clamp-3">
            {article.metadata.article_content.replace(/<[^>]*>/g, '').substring(0, 150)}...
          </div>
        )}

        {/* Tags */}
        {article.metadata?.search_tags && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {article.metadata.search_tags.split(',').slice(0, 3).map((tag, index) => (
                <span key={index} className="inline-block px-2 py-1 bg-secondary-100 text-secondary-700 text-xs rounded">
                  {tag.trim()}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Helpful indicator */}
        {article.metadata?.helpful && (
          <div className="mb-4">
            <span className="inline-flex items-center text-sm text-green-700">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Helpful Article
            </span>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <a
            href={`/support/${article.slug}`}
            className="btn btn-primary flex-1 text-center"
          >
            Read Article
          </a>
          <a
            href="/contact"
            className="btn btn-outline flex-1 text-center"
          >
            Need Help?
          </a>
        </div>
      </div>
    </div>
  )
}