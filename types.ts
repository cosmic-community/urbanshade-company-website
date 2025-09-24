// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Website Pages
export interface Page extends CosmicObject {
  type: 'pages';
  metadata: {
    page_title?: string;
    content?: string;
    meta_title?: string;
    meta_description?: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    page_order?: number;
  };
}

// Products
export interface Product extends CosmicObject {
  type: 'products';
  metadata: {
    product_name?: string;
    short_description?: string;
    full_description?: string;
    price?: string;
    category?: {
      key: string;
      value: string;
    };
    product_images?: Array<{
      url: string;
      imgix_url: string;
    }>;
    key_features?: string[];
    specifications?: Record<string, any>;
    available?: boolean;
  };
}

// Solutions
export interface Solution extends CosmicObject {
  type: 'solutions';
  metadata: {
    solution_title?: string;
    overview?: string;
    detailed_description?: string;
    target_industry?: {
      key: string;
      value: string;
    };
    key_benefits?: string[];
    solution_image?: {
      url: string;
      imgix_url: string;
    };
    related_products?: Product[];
    cta_text?: string;
  };
}

// Installations
export interface Installation extends CosmicObject {
  type: 'installations';
  metadata: {
    project_title?: string;
    client_name?: string;
    location?: string;
    project_description?: string;
    project_type?: {
      key: string;
      value: string;
    };
    project_images?: Array<{
      url: string;
      imgix_url: string;
    }>;
    completion_date?: string;
    project_duration?: string;
    challenge_solved?: string;
    client_testimonial?: string;
    featured_project?: boolean;
  };
}

// Pricing Plans
export interface PricingPlan extends CosmicObject {
  type: 'pricing-plans';
  metadata: {
    plan_name?: string;
    plan_description?: string;
    price?: string;
    price_period?: {
      key: string;
      value: string;
    };
    features_included?: string[];
    popular_plan?: boolean;
    button_text?: string;
    plan_order?: number;
  };
}

// Resources
export interface Resource extends CosmicObject {
  type: 'resources';
  metadata: {
    resource_title?: string;
    resource_type?: {
      key: string;
      value: string;
    };
    description?: string;
    content?: string;
    resource_file?: {
      url: string;
      imgix_url: string;
    };
    external_link?: string;
    thumbnail_image?: {
      url: string;
      imgix_url: string;
    };
    publication_date?: string;
    author?: string;
    featured_resource?: boolean;
  };
}

// Support Articles
export interface SupportArticle extends CosmicObject {
  type: 'support-articles';
  metadata: {
    article_title?: string;
    category?: {
      key: string;
      value: string;
    };
    article_content?: string;
    search_tags?: string;
    priority_level?: {
      key: string;
      value: string;
    };
    related_articles?: SupportArticle[];
    helpful?: boolean;
  };
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

// Type literals for select-dropdown values
export type ProductCategory = 'residential' | 'commercial' | 'industrial';
export type ProjectType = 'residential' | 'commercial' | 'industrial';
export type TargetIndustry = 'healthcare' | 'education' | 'retail' | 'manufacturing' | 'hospitality';
export type ResourceType = 'guide' | 'whitepaper' | 'video' | 'webinar' | 'case-study' | 'blog-post';
export type SupportCategory = 'installation' | 'troubleshooting' | 'maintenance' | 'warranty' | 'faq';
export type PriorityLevel = 'low' | 'medium' | 'high' | 'urgent';
export type PricePeriod = 'monthly' | 'yearly' | 'one-time' | 'custom';

// Type guards
export function isPage(obj: CosmicObject): obj is Page {
  return obj.type === 'pages';
}

export function isProduct(obj: CosmicObject): obj is Product {
  return obj.type === 'products';
}

export function isSolution(obj: CosmicObject): obj is Solution {
  return obj.type === 'solutions';
}

export function isInstallation(obj: CosmicObject): obj is Installation {
  return obj.type === 'installations';
}

export function isPricingPlan(obj: CosmicObject): obj is PricingPlan {
  return obj.type === 'pricing-plans';
}

export function isResource(obj: CosmicObject): obj is Resource {
  return obj.type === 'resources';
}

export function isSupportArticle(obj: CosmicObject): obj is SupportArticle {
  return obj.type === 'support-articles';
}