/**
 * OMA-AI SEO & Social Metadata Library
 * Generates OpenGraph tags, Twitter cards, and social sharing functionality
 */

export interface OpenGraphTags {
  "og:title": string;
  "og:description": string;
  "og:image": string;
  "og:url": string;
  "og:type": string;
  "og:site_name": string;
  "twitter:card": string;
  "twitter:title": string;
  "twitter:description": string;
  "twitter:image": string;
  "article:published_time": string;
  "article:author": string;
  "article:section": string;
  "article:tag": string[];
  "fb:app_id": number;
  "twitter:site": string;
  "twitter:creator": string;
  "og:locale": string;
  product: string;
  "product:category": string;
  "product:price:amount": string;
  "product:price:currency": string;
  "product:availability": string;
  "product:condition": string;
  "product:brand": string;
  "product:retailer_item_id": string;
  "product:retailer_title": string;
  "product:retailer_category": string;
  "product:is_bundle": boolean;
  "product:is_family_friendly": boolean;
  "product:item_id": string;
  "product:item_group_id": string;
  "product:title": string;
  "product:description": string;
  "product:retailer_price": string;
  "product:retailer_currency": string;
  "product:material": string;
  "product:color": string;
  "product:size": string;
  "product:weight": string;
  "product:sku": string;
  "product:in_stock": boolean;
  "product:inventory": number;
  "product:age_range": string;
  "product:gender": string;
  "product:style": string;
  "product:pattern": string;
  "product:season": string;
  "product:occasion": string;
  "product:video_url": string;
  "product:images": string[];
  "product:related_products": string[];
  "product:is_digital": boolean;
  "product:is_physical": boolean;
  "product:is_adult": boolean;
  "product:requires_assembly": boolean;
  "product:is_hazardous": boolean;
  "product:dimensions": { [key: string]: string | number };
}

export interface SocialShareConfig {
  url: string;
  title: string;
  description: string;
  image: string;
}

export class MetadataGenerator {
  /**
   * Generate OpenGraph meta tags
   */
  static generateOpenGraphTags(
    config: SocialShareConfig,
  ): Record<string, string> {
    return {
      "og:title": config.title,
      "og:description": config.description,
      "og:image": config.image,
      "og:url": config.url,
      "og:type": "website",
      "og:site_name": "OMA-AI",
      "og:locale": "en_US",
    };
  }

  /**
   * Generate Twitter card meta tags
   */
  static generateTwitterCardTags(
    config: SocialShareConfig,
  ): Record<string, string> {
    return {
      "twitter:card": "summary_large_image",
      "twitter:title": config.title,
      "twitter:description": config.description,
      "twitter:image": config.image,
      "twitter:site": "@oma_ai",
      "twitter:creator": "@oma_ai",
    };
  }

  /**
   * Generate product-specific OpenGraph tags
   */
  static generateProductTags(product: {
    name: string;
    description: string;
    price: number;
    currency: string;
    availability: string;
    image: string;
    url: string;
    category: string;
    brand: string;
  }): Record<string, string> {
    return {
      "og:type": "product",
      "og:title": product.name,
      "og:description": product.description,
      "og:image": product.image,
      "og:url": product.url,
      "product:category": product.category,
      "product:price:amount": product.price.toString(),
      "product:price:currency": product.currency,
      "product:availability": product.availability,
      "product:brand": product.brand,
      "product:retailer_item_id": product.name
        .replace(/\s+/g, "-")
        .toLowerCase(),
      "product:retailer_title": product.name,
      "product:is_digital": "true",
      "product:in_stock":
        product.availability === "in_stock" ? "true" : "false",
    };
  }

  /**
   * Generate canonical URL
   */
  static generateCanonicalUrl(path: string): string {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://oma-ai.com";
    return `${baseUrl}${path}`;
  }

  /**
   * Generate structured data (JSON-LD)
   */
  static generateStructuredData(
    type: "website" | "organization" | "article",
    data: any,
  ): string {
    const base = {
      "@context": "https://schema.org",
      ...data,
    };

    return JSON.stringify(base);
  }
}

export default MetadataGenerator;
