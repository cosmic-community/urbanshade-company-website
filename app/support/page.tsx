import { getSupportArticles } from '@/lib/cosmic'
import { Metadata } from 'next'
import SupportArticleCard from '@/components/SupportArticleCard'

export const metadata: Metadata = {
  title: 'Support & Warranty - UrbanShade Company',
  description: 'Find help and support for your renewable energy system. Browse our comprehensive knowledge base and warranty information.',
}

export default async function SupportPage() {
  const supportArticles = await getSupportArticles()

  if (supportArticles.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-secondary-900 mb-8">Support & Warranty</h1>
          <p className="text-lg text-secondary-600">No support articles available at this time.</p>
        </div>
      </div>
    )
  }

  // Group articles by category with proper type safety
  const articlesByCategory = supportArticles.reduce((acc, article) => {
    const category = article.metadata?.category?.value || 'General';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(article);
    return acc;
  }, {} as Record<string, typeof supportArticles>);

  const categoryOrder = ['Installation', 'Maintenance', 'Troubleshooting', 'Warranty', 'FAQ'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-secondary-900 mb-4">Support & Warranty</h1>
        <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
          Find answers to common questions and get the support you need for your renewable energy system. 
          Our comprehensive knowledge base covers everything from installation to maintenance and troubleshooting.
        </p>
      </div>

      {/* Contact Support Section */}
      <div className="bg-primary-50 rounded-2xl p-8 mb-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-secondary-900 mb-4">Need Additional Help?</h2>
          <p className="text-secondary-600 mb-6 max-w-2xl mx-auto">
            Can't find what you're looking for? Our support team is here to help with any questions or issues you may have.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="btn btn-primary"
            >
              Contact Support
            </a>
            <a
              href="tel:+15551234567"
              className="btn btn-outline"
            >
              Call (555) 123-4567
            </a>
          </div>
        </div>
      </div>

      {/* Support Articles by Category */}
      <div className="space-y-12">
        {categoryOrder
          .filter(categoryKey => {
            const articles = articlesByCategory[categoryKey];
            return articles && articles.length > 0;
          })
          .map((categoryKey) => {
            const articles = articlesByCategory[categoryKey];
            
            // Additional safety check even after filter
            if (!articles || articles.length === 0) {
              return null;
            }
            
            return (
              <div key={categoryKey}>
                <h2 className="text-2xl font-bold text-secondary-900 mb-6">{categoryKey}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {articles.map((article) => (
                    <SupportArticleCard key={article.id} article={article} />
                  ))}
                </div>
              </div>
            )
          })}
        
        {/* Articles without specific categories */}
        {Object.keys(articlesByCategory)
          .filter(category => !categoryOrder.includes(category))
          .filter(category => {
            const articles = articlesByCategory[category];
            return articles && articles.length > 0;
          })
          .map((category) => {
            const articles = articlesByCategory[category];
            
            // Additional safety check even after filter
            if (!articles || articles.length === 0) {
              return null;
            }
            
            return (
              <div key={category}>
                <h2 className="text-2xl font-bold text-secondary-900 mb-6">{category}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {articles.map((article) => (
                    <SupportArticleCard key={article.id} article={article} />
                  ))}
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}