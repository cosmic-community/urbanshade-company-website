# UrbanShade Company Website

![App Preview](https://imgix.cosmicjs.com/680c3760-98e1-11f0-bba7-d56988718db7-photo-1560472354-b33ff0c44a43-1758675430014.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern, responsive company website built with Next.js 15 and Cosmic CMS. This professional website showcases renewable energy solutions, products, services, and company information with dynamic content management.

## Features

- 🏠 **Dynamic Pages**: Homepage, About, Contact, and custom pages
- 📦 **Product Showcase**: Professional product catalogs with specifications
- ⚙️ **Solutions Display**: Industry-specific solution pages
- 🏗️ **Project Portfolio**: Installation case studies with testimonials
- 💰 **Pricing Plans**: Feature comparison and pricing display
- 📚 **Resource Library**: Organized content with multiple formats
- 🛠️ **Support System**: Searchable help articles with categories
- 📱 **Responsive Design**: Optimized for all devices
- 🚀 **SEO Optimized**: Meta tags and structured data
- ⚡ **Performance**: Server-side rendering with Next.js 15

## Clone this Project

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68d3406c85e94ea9e6dab15a&clone_repository=68d344a185e94ea9e6dab17b)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a content model for a company website with Home, Products, Solutions, Installations, About Us, How it works, Pricing & Finance, Resources, Support & Warranty, Contact/Get a quote"

### Code Generation Prompt

> Build a Next.js website that uses my existing objects in this bucket

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Cosmic CMS** - Headless content management
- **Cosmic SDK** - Latest v1.5+ for API integration

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with your content bucket

### Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   bun install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```

4. Add your Cosmic credentials to `.env.local`:
   ```
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   ```

5. Run the development server:
   ```bash
   bun dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) to view the website

## Cosmic SDK Examples

### Fetching Products
```typescript
import { cosmic } from '@/lib/cosmic'

export async function getProducts() {
  try {
    const response = await cosmic.objects
      .find({ type: 'products' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return response.objects as Product[]
  } catch (error) {
    if (error.status === 404) return []
    throw error
  }
}
```

### Fetching Solutions
```typescript
export async function getSolutions() {
  try {
    const response = await cosmic.objects
      .find({ type: 'solutions' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return response.objects as Solution[]
  } catch (error) {
    if (error.status === 404) return []
    throw error
  }
}
```

## Cosmic CMS Integration

This website integrates with the following Cosmic object types:

- **Pages** (`pages`) - Website pages with SEO metadata
- **Products** (`products`) - Product catalog with specifications
- **Solutions** (`solutions`) - Industry-specific solutions
- **Installations** (`installations`) - Project showcases
- **Pricing Plans** (`pricing-plans`) - Service pricing
- **Resources** (`resources`) - Content library
- **Support Articles** (`support-articles`) - Help documentation

All content is dynamically fetched from your Cosmic bucket and can be managed through the Cosmic dashboard.

## Deployment Options

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Netlify
1. Connect repository in Netlify dashboard
2. Set build command: `bun run build`
3. Add environment variables
4. Deploy

### Other Platforms
This Next.js application can be deployed to any platform supporting Node.js applications.
<!-- README_END -->