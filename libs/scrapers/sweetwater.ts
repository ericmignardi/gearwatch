import * as cheerio from 'cheerio';
import { ScrapedListing } from '@/types/scraping';

interface SweetwaterProduct {
  name?: string;
  price?: string;
  url?: string;
  image?: {
    src?: string;
  };
}

interface SweetwaterInitialState {
  search?: {
    results?: {
      products?: SweetwaterProduct[];
    };
  };
}

export async function scrapeSweetwater(query: string): Promise<ScrapedListing[]> {
  const encodedQuery = encodeURIComponent(query);
  const url = `https://www.sweetwater.com/store/search.php?s=${encodedQuery}`;

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });

    if (!response.ok) throw new Error(`Sweetwater fetch failed: ${response.statusText}`);

    const html = await response.text();
    const $ = cheerio.load(html);
    
    let initialState: SweetwaterInitialState | null = null;
    $('script').each((_, el) => {
      const content = $(el).html();
      if (content?.includes('window.__INITIAL_STATE__')) {
        const match = content.match(/window\.__INITIAL_STATE__\s*=\s*({[\s\S]*?});/);
        if (match && match[1]) {
          try {
            initialState = JSON.parse(match[1]);
          } catch {
            console.error('Failed to parse Sweetwater __INITIAL_STATE__ JSON');
          }
        }
      }
    });

    if (!initialState) throw new Error('Could not find window.__INITIAL_STATE__ on Sweetwater');

    const products = (initialState as SweetwaterInitialState).search?.results?.products || [];

    return products.map((p: SweetwaterProduct) => ({
      title: p.name || '',
      price: parseFloat(p.price || '0'),
      url: p.url ? `https://www.sweetwater.com${p.url}` : '',
      imageUrl: p.image?.src,
      location: 'Sweetwater',
    })).filter((l: ScrapedListing) => l.title && l.url);

  } catch (error) {
    console.error('Sweetwater Scraper Error:', error);
    return [];
  }
}
