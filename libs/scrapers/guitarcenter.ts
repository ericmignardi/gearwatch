import { chromium } from '@playwright/test';
import { ScrapedListing } from '@/types/scraping';
import { getRandomUserAgent, simulateHumanBehavior, STEALTH_CONTEXT_OPTIONS } from './utils';

export async function scrapeGuitarCenter(query: string): Promise<ScrapedListing[]> {
  const encodedQuery = encodeURIComponent(query);
  const url = `https://www.guitarcenter.com/search?Ntt=${encodedQuery}`;

  let browser;
  try {
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      ...STEALTH_CONTEXT_OPTIONS,
      userAgent: getRandomUserAgent(),
    });
    const page = await context.newPage();

    console.log(`Navigating to Guitar Center: ${url}...`);
    const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });

    if (!response || response.status() >= 400) {
      console.error(`Guitar Center responded with status ${response?.status()}. Blocking may be in effect.`);
      return [];
    }

    try {
      await page.waitForSelector('.product-container, .product-card, .product-grid-item', { timeout: 15000 });
    } catch (e) {
      console.warn('Timeout waiting for Guitar Center selectors. Layout may have changed or access blocked.');
    }

    await simulateHumanBehavior(page);

    const listings = await page.evaluate(() => {
      const items: any[] = [];
      const productCards = document.querySelectorAll('.product-container, .product-card, .product-grid-item');

      productCards.forEach(el => {
        const titleEl = el.querySelector('.product-name a, .product-title a, a.product-name');
        const title = titleEl ? (titleEl as HTMLElement).innerText.trim() : '';

        const priceEl = el.querySelector('.product-price, .price-format');
        const rawPrice = priceEl ? (priceEl as HTMLElement).innerText : '0';
        const priceMatch = rawPrice.replace(/[^\d.]/g, '');
        const price = parseFloat(priceMatch) || 0;

        const link = titleEl ? (titleEl as HTMLAnchorElement).href : '';

        const imgEl = el.querySelector('.product-image img, .product-img img');
        const imageUrl = imgEl ? (imgEl as HTMLImageElement).src : '';

        if (title && link && price > 0) {
          items.push({
            title,
            price,
            url: link,
            imageUrl,
            location: 'Guitar Center'
          });
        }
      });
      return items;
    });

    return listings;

  } catch (error) {
    console.error('Guitar Center Playwright Scraper Error:', error);
    return [];
  } finally {
    if (browser) await browser.close();
  }
}
