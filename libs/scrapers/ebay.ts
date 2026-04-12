import * as cheerio from 'cheerio';
import { ScrapedListing } from '@/types/scraping';

export async function scrapeEbay(query: string): Promise<ScrapedListing[]> {
  const encodedQuery = encodeURIComponent(query);
  const url = `https://www.ebay.com/sch/i.html?_nkw=${encodedQuery}`;

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });

    if (!response.ok) throw new Error(`eBay fetch failed: ${response.statusText}`);

    const html = await response.text();
    const $ = cheerio.load(html);
    const listings: ScrapedListing[] = [];

    $('li.s-item').each((_, el) => {
      const title = $(el).find('.s-item__title').text().replace(/^New Listing/i, '').trim();
      if (!title || title.includes('Shop on eBay')) return;

      const rawPrice = $(el).find('.s-item__price').text();
      // Price might be "$1,234.56" or "$1,234.56 to $1,567.89"
      const priceMatch = rawPrice.replace(/[^\d.]/g, '');
      const price = parseFloat(priceMatch) || 0;

      const link = $(el).find('.s-item__link').attr('href');
      // Clean up link to remove tracking params if needed
      const cleanLink = link?.split('?')[0];

      const imageUrl = $(el).find('.s-item__image-img').attr('src') || 
                      $(el).find('.s-item__image-img').attr('data-src');

      const location = $(el).find('.s-item__location').text();

      if (title && cleanLink && price > 0) {
        listings.push({
          title,
          price,
          url: cleanLink,
          imageUrl,
          location
        });
      }
    });

    return listings;

  } catch (error) {
    console.error('eBay Scraper Error:', error);
    return [];
  }
}
