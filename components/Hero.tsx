import { Page } from '@/types'

interface HeroProps {
  page?: Page | null
}

export default function Hero({ page }: HeroProps) {
  const title = page?.metadata?.page_title || 'Welcome to UrbanShade Company'
  const backgroundImage = page?.metadata?.featured_image?.imgix_url

  return (
    <section className="relative bg-secondary-900 overflow-hidden">
      {/* Background Image */}
      {backgroundImage && (
        <div className="absolute inset-0">
          <img
            src={`${backgroundImage}?w=2400&h=800&fit=crop&auto=format,compress`}
            alt=""
            className="w-full h-full object-cover opacity-20"
            width="1200"
            height="400"
          />
        </div>
      )}
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-secondary-900/90 to-primary-900/90" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {title}
          </h1>
          
          <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
            Transform your business with our innovative renewable energy solutions. 
            Professional installation, competitive pricing, and comprehensive support.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/contact"
              className="btn btn-primary bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 text-lg"
            >
              Get Free Quote
            </a>
            <a
              href="/products"
              className="btn btn-outline border-white text-white hover:bg-white hover:text-secondary-900 px-8 py-4 text-lg"
            >
              View Products
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-16 pt-8 border-t border-blue-300/30">
            <div>
              <div className="text-3xl font-bold text-white">500+</div>
              <div className="text-blue-200 text-sm">Installations Completed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">25+</div>
              <div className="text-blue-200 text-sm">Years Experience</div>
            </div>
            <div className="col-span-2 md:col-span-1">
              <div className="text-3xl font-bold text-white">40%</div>
              <div className="text-blue-200 text-sm">Average Energy Savings</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}