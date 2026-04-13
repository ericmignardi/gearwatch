import { chromium } from '@playwright/test';
import { ScrapedListing } from '@/types/scraping';
import { getRandomUserAgent, simulateHumanBehavior, STEALTH_CONTEXT_OPTIONS } from './utils';

export async function scrapeSweetwater(query: string): Promise<ScrapedListing[]> {
  const encodedQuery = encodeURIComponent(query);
  const url = `https://www.sweetwater.com/store/search.php?s=${encodedQuery}`;

  let browser;
  try {
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      ...STEALTH_CONTEXT_OPTIONS,
      userAgent: getRandomUserAgent(),
    });
    const page = await context.newPage();

    console.log(`Navigating to Sweetwater: ${url}...`);
    const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });

    if (!response || response.status() >= 400) {
      console.error(`Sweetwater responded with status ${response?.status()}. Blocking may be in effect.`);
      return [];
    }

    try {
      await page.waitForSelector('.product-card, [class*="product-card"]', { timeout: 15000 });
    } catch (e) {
      console.warn('Timeout waiting for Sweetwater selectors. Page may have changed or bot detection triggered.');
    }

    await simulateHumanBehavior(page);

    const listings = await page.evaluate(() => {
      const items: any[] = [];
      const productCards = document.querySelectorAll('.product-card, [class*="product-card"]');

      productCards.forEach(el => {
        const titleEl = el.querySelector('.product-card__name a, [class*="product-card__name"] a, a[href*="/store/detail/"]');
        const title = titleEl ? (titleEl as HTMLElement).innerText.trim() : '';

        const priceEl = el.querySelector('.product-card__price, [class*="product-card__price"], .price');
        const rawPrice = priceEl ? (priceEl as HTMLElement).innerText : '0';
        const priceMatch = rawPrice.replace(/[^\d.]/g, '');
        const price = parseFloat(priceMatch) || 0;

        const link = titleEl ? (titleEl as HTMLAnchorElement).href : '';

        const imgEl = el.querySelector('.product-card__image img, img[src*="sweetwater.com/images/items/"]');
        const imageUrl = imgEl ? (imgEl as HTMLImageElement).src : '';

        if (title && link && price > 0) {
          items.push({
            title,
            price,
            url: link,
            imageUrl,
            location: 'Sweetwater'
          });
        }
      });
      return items;
    });

    return listings;

  } catch (error) {
    console.error('Sweetwater Playwright Scraper Error:', error);
    return [];
  } finally {
    if (browser) await browser.close();
  }
}
