import * as cheerio from 'cheerio';
import { ScrapedListing } from '@/types/scraping';

interface ReverbListing {
  title?: string;
  price?: {
    amount?: string;
  };
  listing_url?: string;
  slug?: string;
  photos?: Array<{ full?: string }>;
  image_url?: string;
  location?: {
    display_name?: string;
  };
}

export async function scrapeReverb(query: string): Promise<ScrapedListing[]> {
  const encodedQuery = encodeURIComponent(query);
  const url = `https://reverb.com/marketplace?query=${encodedQuery}`;

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    });

    if (!response.ok) throw new Error(`Reverb fetch failed: ${response.statusText}`);

    const html = await response.text();
    const $ = cheerio.load(html);
    
    const scriptContent = $('#__NEXT_DATA__').html();
    if (!scriptContent) throw new Error('Could not find __NEXT_DATA__ script tag on Reverb');

    const data = JSON.parse(scriptContent);
    const listings: ReverbListing[] = data.props?.pageProps?.initialData?.listings || 
                    data.props?.pageProps?.listings || 
                    [];

    return listings.map((l: ReverbListing) => ({
      title: l.title || '',
      price: parseFloat(l.price?.amount || '0'),
      url: l.listing_url || (l.slug ? `https://reverb.com/item/${l.slug}` : ''),
      imageUrl: l.photos?.[0]?.full || l.image_url,
      location: l.location?.display_name,
    })).filter((l: ScrapedListing) => l.title && l.url);

  } catch (error) {
    console.error('Reverb Scraper Error:', error);
    return [];
  }
}
