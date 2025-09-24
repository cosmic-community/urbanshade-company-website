import { createBucketClient } from '@cosmicjs/sdk'
import { Product, Solution, Installation, PricingPlan, Resource, SupportArticle, Page } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Simple error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Pages
export async function getPages(): Promise<Page[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'pages' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return (response.objects as Page[]).sort((a, b) => {
      const orderA = a.metadata?.page_order || 999;
      const orderB = b.metadata?.page_order || 999;
      return orderA - orderB;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch pages');
  }
}

export async function getPageBySlug(slug: string): Promise<Page | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'pages', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.object as Page;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error(`Failed to fetch page: ${slug}`);
  }
}

// Products
export async function getProducts(): Promise<Product[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'products' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as Product[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch products');
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'products', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.object as Product;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error(`Failed to fetch product: ${slug}`);
  }
}

// Solutions
export async function getSolutions(): Promise<Solution[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'solutions' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as Solution[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch solutions');
  }
}

export async function getSolutionBySlug(slug: string): Promise<Solution | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'solutions', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.object as Solution;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error(`Failed to fetch solution: ${slug}`);
  }
}

// Installations
export async function getInstallations(): Promise<Installation[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'installations' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as Installation[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch installations');
  }
}

export async function getInstallationBySlug(slug: string): Promise<Installation | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'installations', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.object as Installation;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error(`Failed to fetch installation: ${slug}`);
  }
}

// Pricing Plans
export async function getPricingPlans(): Promise<PricingPlan[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'pricing-plans' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return (response.objects as PricingPlan[]).sort((a, b) => {
      const orderA = a.metadata?.plan_order || 999;
      const orderB = b.metadata?.plan_order || 999;
      return orderA - orderB;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch pricing plans');
  }
}

// Resources
export async function getResources(): Promise<Resource[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'resources' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return (response.objects as Resource[]).sort((a, b) => {
      const dateA = new Date(a.metadata?.publication_date || '').getTime();
      const dateB = new Date(b.metadata?.publication_date || '').getTime();
      return dateB - dateA; // Newest first
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch resources');
  }
}

export async function getResourceBySlug(slug: string): Promise<Resource | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'resources', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.object as Resource;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error(`Failed to fetch resource: ${slug}`);
  }
}

// Support Articles
export async function getSupportArticles(): Promise<SupportArticle[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'support-articles' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as SupportArticle[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch support articles');
  }
}

export async function getSupportArticleBySlug(slug: string): Promise<SupportArticle | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'support-articles', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.object as SupportArticle;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error(`Failed to fetch support article: ${slug}`);
  }
}