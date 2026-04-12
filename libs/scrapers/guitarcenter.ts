import * as cheerio from 'cheerio';
import { ScrapedListing } from '@/types/scraping';

interface GuitarCenterProduct {
  productName?: string;
  productUrl?: string;
  price?: {
    salePrice?: string;
    regularPrice?: string;
  };
  image?: {
    url?: string;
  };
}

interface GuitarCenterPageData {
  searchResults?: {
    products?: GuitarCenterProduct[];
  };
}

export async function scrapeGuitarCenter(query: string): Promise<ScrapedListing[]> {
  const encodedQuery = encodeURIComponent(query);
  const url = `https://www.guitarcenter.com/search?Ntt=${encodedQuery}`;

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });

    if (!response.ok) throw new Error(`Guitar Center fetch failed: ${response.statusText}`);

    const html = await response.text();
    const $ = cheerio.load(html);
    
    // Find the script that contains window.pageData
    let pageData: GuitarCenterPageData | null = null;
    $('script').each((_, el) => {
      const content = $(el).html();
      if (content?.includes('window.pageData')) {
        const match = content.match(/window\.pageData\s*=\s*({[\s\S]*?});/);
        if (match && match[1]) {
          try {
            pageData = JSON.parse(match[1]);
          } catch {
            console.error('Failed to parse Guitar Center pageData JSON');
          }
        }
      }
    });

    if (!pageData) throw new Error('Could not find window.pageData on Guitar Center');

    const products = (pageData as GuitarCenterPageData).searchResults?.products || [];

    return products.map((p: GuitarCenterProduct) => ({
      title: p.productName || '',
      price: parseFloat(p.price?.salePrice || p.price?.regularPrice || '0'),
      url: p.productUrl ? `https://www.guitarcenter.com${p.productUrl}` : '',
      imageUrl: p.image?.url,
      location: 'Guitar Center',
    })).filter((l: ScrapedListing) => l.title && l.url);

  } catch (error) {
    console.error('Guitar Center Scraper Error:', error);
    return [];
  }
}
