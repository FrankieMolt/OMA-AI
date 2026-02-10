/**
 * OMA-AI Social Sharing Library
 * Integrates with Twitter, Facebook, WhatsApp, LinkedIn, Pinterest, and Email
 */

export interface ShareConfig {
  url: string;
  title: string;
  description?: string;
  hashtags?: string[];
}

// Twitter Share
export async function shareTwitter(url: string, text: string): Promise<void> {
  try {
    const response = await fetch('/api/social/twitter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url, text }),
    });

    if (!response.ok) {
      throw new Error('Twitter share failed');
    }

    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
  } catch (error) {
    console.error('Twitter share error:', error);
  }
}

// Facebook Share
export async function shareFacebook(url: string, title: string, description: string): Promise<void> {
  try {
    const response = await fetch('/api/social/facebook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url, title, description }),
    });

    if (!response.ok) {
      throw new Error('Facebook share failed');
    }

    window.open(`https://www.facebook.com/sharer/sharer/sharer.php?u=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`, '_blank');
  } catch (error) {
    console.error('Facebook share error:', error);
  }
}

// WhatsApp Share
export async function shareWhatsApp(text: string): Promise<void> {
  const encodedText = encodeURIComponent(text);
  window.open(`https://wa.me/?text=${encodedText}`, '_blank');
}

// LinkedIn Share
export async function shareLinkedIn(url: string, title: string, description: string): Promise<void> {
  try {
    const response = await fetch('/api/social/linkedin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url, title, description }),
    });

    if (!response.ok) {
      throw new Error('LinkedIn share failed');
    }

    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(description.substring(0, 200))}`, '_blank');
  } catch (error) {
    console.error('LinkedIn share error:', error);
  }
}

// Pinterest Share
export async function sharePinterest(url: string, description: string, image: string): Promise<void> {
  try {
    const response = await fetch('/api/social/pinterest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url, description, image }),
    });

    if (!response.ok) {
      throw new Error('Pinterest share failed');
    }

    window.open(`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(description)}&media=${encodeURIComponent(image)}`, '_blank');
  } catch (error) {
    console.error('Pinterest share error:', error);
  }
}

// Email Share
export async function shareEmail(url: string, title: string, body: string): Promise<void> {
  try {
    const response = await fetch('/api/social/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url, title, subject: title, body }),
    });

    if (!response.ok) {
      throw new Error('Email share failed');
    }

    window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`;
  } catch (error) {
    console.error('Email share error:', error);
  }
}

// Generate Social Metadata
export function generateSocialMetadata(url: string, title: string, description: string, type: 'article' | 'website' | 'product') {
  return {
    'og:title': title,
    'og:description': description || title,
    'og:image': `https://images.unsplash.com/photo-16009064198192?auto=format&fit=crop&w=800&q=${encodeURIComponent(title)}`, // Generic image
    'og:url': url,
    'og:type': type === 'product' ? 'product' : 'website',
    'og:site_name': 'SpendThrone - The Kingdom of Weird Stuff',
    'twitter:card': type === 'product' ? 'product' : 'summary_large_image',
    'twitter:site': '@SpendThrone',
    'twitter:creator': '@SpendThrone',
    'twitter:title': title,
    'twitter:description': description || title,
    'twitter:image': `https://images.unsplash.com/photo-16009064198192?auto=format&fit=crop&w=800&q=${encodeURIComponent(title)}`,
    'fb:app_id': '24193605028', // Example ID
    'article:published_time': new Date().toISOString(),
    'article:section': 'Business & Finance',
    'article:tag': ['viral', 'wtf', 'cool', 'tech'],
    'product': title,
    'product:price:amount': '0.01', // Default $0.01
    'product:price:currency': 'USD',
  };
}
