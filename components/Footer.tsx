import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    Products: [
      { name: 'Solar Panels', href: '/products' },
      { name: 'Energy Storage', href: '/products' },
      { name: 'Monitoring Systems', href: '/products' },
    ],
    Solutions: [
      { name: 'Residential', href: '/solutions' },
      { name: 'Commercial', href: '/solutions' },
      { name: 'Industrial', href: '/solutions' },
    ],
    Support: [
      { name: 'Help Center', href: '/support' },
      { name: 'Installation Guide', href: '/support' },
      { name: 'Warranty', href: '/support' },
    ],
    Company: [
      { name: 'About Us', href: '/about-us' },
      { name: 'Contact', href: '/contact' },
      { name: 'Resources', href: '/resources' },
    ],
  }

  return (
    <footer className="bg-secondary-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Company Info */}
          <div className="space-y-8 xl:col-span-1">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-white">UrbanShade</span>
            </div>
            <p className="text-secondary-300 text-base">
              Leading provider of renewable energy solutions. Transform your business with our innovative 
              solar systems, professional installation, and comprehensive support.
            </p>
            <div className="flex space-x-6">
              <a
                href="mailto:info@urbanshade.com"
                className="text-secondary-400 hover:text-secondary-300"
              >
                <span className="sr-only">Email</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              </a>
              <a
                href="tel:+15551234567"
                className="text-secondary-400 hover:text-secondary-300"
              >
                <span className="sr-only">Phone</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
              </a>
            </div>
          </div>
          
          {/* Links */}
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              {Object.entries(footerLinks).slice(0, 2).map(([title, links]) => (
                <div key={title}>
                  <h3 className="text-sm font-semibold text-secondary-200 tracking-wider uppercase mb-4">
                    {title}
                  </h3>
                  <ul className="space-y-4">
                    {links.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-base text-secondary-300 hover:text-white transition-colors duration-200"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              {Object.entries(footerLinks).slice(2).map(([title, links]) => (
                <div key={title}>
                  <h3 className="text-sm font-semibold text-secondary-200 tracking-wider uppercase mb-4">
                    {title}
                  </h3>
                  <ul className="space-y-4">
                    {links.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-base text-secondary-300 hover:text-white transition-colors duration-200"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="mt-12 border-t border-secondary-700 pt-8">
          <div className="md:flex md:items-center md:justify-between">
            <p className="text-base text-secondary-300">
              &copy; {currentYear} UrbanShade Company. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <div className="flex space-x-6">
                <Link
                  href="/privacy"
                  className="text-sm text-secondary-400 hover:text-secondary-300"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="text-sm text-secondary-400 hover:text-secondary-300"
                >
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}