import { chromium } from '@playwright/test';
import { ScrapedListing } from '@/types/scraping';
import { getRandomUserAgent, humanLikeDelay, simulateHumanBehavior, STEALTH_CONTEXT_OPTIONS } from './utils';

/**
 * NOTE: Scraping Reverb violates their Terms of Service and is easily blocked. 
 * Reverb provides a robust official REST API (https://www.reverb.com/software-developers).
 * This scraper is provided as a fallback/example only.
 */
export async function scrapeReverb(query: string): Promise<ScrapedListing[]> {
  const encodedQuery = encodeURIComponent(query);
  const url = `https://reverb.com/marketplace?query=${encodedQuery}`;

  let browser;
  try {
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      ...STEALTH_CONTEXT_OPTIONS,
      userAgent: getRandomUserAgent(),
    });
    
    const page = await context.newPage();
    
    console.log(`Navigating to Reverb: ${url}...`);
    // Use domcontentloaded instead of networkidle to avoid hanging on background scripts
    const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });

    if (!response || response.status() >= 400) {
      console.error(`Reverb responded with status ${response?.status()}. Blocking may be in effect.`);
      return [];
    }

    // Wait for the specific listing container to appear
    try {
      await page.waitForSelector('.rc-listing-card, #__NEXT_DATA__', { timeout: 15000 });
    } catch (e) {
      console.warn('Timeout waiting for Reverb selectors. Page may have changed or bot detection triggered.');
    }

    await simulateHumanBehavior(page);

    // Try to get data from __NEXT_DATA__ first
    let listingsData = await page.evaluate(() => {
      const script = document.getElementById('__NEXT_DATA__');
      if (script) {
        try {
          const json = JSON.parse(script.innerHTML);
          return json.props?.pageProps?.initialData?.listings || 
                 json.props?.pageProps?.listings || 
                 null;
        } catch (e) {
          return null;
        }
      }
      return null;
    });

    // Fallback to DOM scraping
    if (!listingsData || listingsData.length === 0) {
      console.log('JSON blob missing or empty, falling back to DOM scraping for Reverb...');
      listingsData = await page.evaluate(() => {
        const cards = document.querySelectorAll('.rc-listing-card');
        return Array.from(cards).map(card => {
          const titleEl = card.querySelector('.rc-listing-card__title');
          const priceEl = card.querySelector('.rc-listing-card__price');
          const linkEl = card.querySelector('.rc-listing-card__link') as HTMLAnchorElement;
          const imgEl = card.querySelector('.rc-listing-card__image') as HTMLImageElement;
          
          return {
            title: titleEl?.textContent?.trim(),
            price: { amount: priceEl?.textContent?.replace(/[^\d.]/g, '') },
            listing_url: linkEl?.href,
            image_url: imgEl?.src || imgEl?.dataset?.src
          };
        });
      });
    }

    if (!listingsData || listingsData.length === 0) {
      console.warn('No listings found on Reverb after both JSON and DOM attempts');
      return [];
    }

    return listingsData.map((l: any) => ({
      title: l.title || '',
      price: parseFloat(typeof l.price === 'object' ? l.price?.amount : l.price) || 0,
      url: l.listing_url || (l.slug ? `https://reverb.com/item/${l.slug}` : ''),
      imageUrl: l.photos?.[0]?.full || l.image_url,
      location: l.location?.display_name || 'Reverb',
    })).filter((l: ScrapedListing) => l.title && l.url && l.price > 0);

  } catch (error) {
    console.error('Reverb Playwright Scraper Error:', error);
    return [];
  } finally {
    if (browser) await browser.close();
  }
}
