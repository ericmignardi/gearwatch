import * as cheerio from 'cheerio';
import { ScrapedListing } from '@/types/scraping';
import { getRandomUserAgent } from './utils';

/**
 * Lightweight Cheerio-based scraper for Kijiji.
 */
export async function scrapeKijiji(query: string): Promise<ScrapedListing[]> {
  const encodedQuery = encodeURIComponent(query);
  // categoryId 613 is Musical Instruments > Guitars
  const url = `https://www.kijiji.ca/b-search.html?searchTerm=${encodedQuery}&categoryId=613`;

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': getRandomUserAgent(),
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      }
    });

    if (!response.ok) {
      console.error(`Kijiji responded with status ${response.status}`);
      return [];
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    const listings: ScrapedListing[] = [];

    $('[data-testid^="listing-card"]').each((_, el) => {
      const title = $(el).find('[data-testid="listing-title"]').text().trim();
      const priceText = $(el).find('[data-testid="listing-price"]').text().trim();
      const relativeUrl = $(el).find('a[data-testid="listing-link"]').attr('href');
      const imageUrl = $(el).find('img').attr('src');
      const location = $(el).find('[data-testid="listing-location"]').text().trim();

      let price = 0;
      if (priceText.toLowerCase().includes('free')) {
        price = 0;
      } else {
        price = parseFloat(priceText.replace(/[^\d.]/g, '')) || 0;
      }

      const fullUrl = relativeUrl ? (relativeUrl.startsWith('http') ? relativeUrl : `https://www.kijiji.ca${relativeUrl}`) : '';

      if (title && fullUrl && price > 0) {
        listings.push({
          title,
          price,
          url: fullUrl,
          imageUrl: imageUrl || '',
          location: location || 'Kijiji'
        });
      }
    });

    return listings;
  } catch (error) {
    console.error('Kijiji Scraper Error:', error);
    return [];
  }
}
