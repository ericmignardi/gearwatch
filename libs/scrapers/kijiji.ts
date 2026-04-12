import * as cheerio from 'cheerio';
import { ScrapedListing } from '@/types/scraping';

interface KijijiAd {
  title?: string;
  price?: {
    amount: number;
  };
  url?: string;
  image?: string;
  images?: Array<{ url: string }>;
  location?: {
    displayName?: string;
    name?: string;
  };
}

export async function scrapeKijiji(query: string): Promise<ScrapedListing[]> {
  const slug = query.toLowerCase().replace(/\s+/g, '-');
  // Kijiji Canada-wide Guitars category (c613)
  const url = `https://www.kijiji.ca/b-guitars/canada/${slug}/k0c613l0`;

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });

    if (!response.ok) throw new Error(`Kijiji fetch failed: ${response.statusText}`);

    const html = await response.text();
    const $ = cheerio.load(html);
    
    const scriptContent = $('#__NEXT_DATA__').html();
    if (!scriptContent) throw new Error('Could not find __NEXT_DATA__ script tag');

    const data = JSON.parse(scriptContent);
    
    // Kijiji often nests ads here, but paths can vary
    const ads: KijijiAd[] = data.props?.pageProps?.initialInternalData?.ads || 
                           data.props?.pageProps?.initialData?.ads || 
                           data.props?.pageProps?.results ||
                           data.props?.pageProps?.ads ||
                           [];

    return ads.map((ad: KijijiAd) => ({
      title: ad.title || '',
      price: (ad.price?.amount || 0) / 100, // Kijiji often sends price in cents in the JSON
      url: ad.url ? (ad.url.startsWith('http') ? ad.url : `https://www.kijiji.ca${ad.url}`) : '',
      imageUrl: ad.image || ad.images?.[0]?.url,
      location: ad.location?.displayName || ad.location?.name,
    })).filter((ad: ScrapedListing) => ad.title && ad.url);

  } catch (error) {
    console.error('Kijiji Scraper Error:', error);
    return [];
  }
}
