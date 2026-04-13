import { chromium } from '@playwright/test';
import { ScrapedListing } from '@/types/scraping';
import { getRandomUserAgent, simulateHumanBehavior, STEALTH_CONTEXT_OPTIONS } from './utils';

export async function scrapeKijiji(query: string): Promise<ScrapedListing[]> {
  const encodedQuery = encodeURIComponent(query);
  const url = `https://www.kijiji.ca/b-search.html?searchTerm=${encodedQuery}`;

  let browser;
  try {
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      ...STEALTH_CONTEXT_OPTIONS,
      userAgent: getRandomUserAgent(),
    });
    const page = await context.newPage();

    console.log(`Navigating to Kijiji: ${url}...`);
    const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });

    if (!response || response.status() >= 400) {
      console.error(`Kijiji responded with status ${response?.status()}. Blocking may be in effect.`);
      return [];
    }

    try {
      await page.waitForSelector('[data-testid^="listing-card"], .search-item', { timeout: 15000 });
    } catch (e) {
      console.warn('Timeout waiting for Kijiji selectors. Layout may have changed or access blocked.');
    }

    await simulateHumanBehavior(page);

    const listings = await page.evaluate(() => {
      const items: any[] = [];
      const containers = document.querySelectorAll('[data-testid^="listing-card"], .search-item');

      containers.forEach(el => {
        const titleEl = el.querySelector('[data-testid="listing-title"], .title');
        const title = titleEl ? (titleEl as HTMLElement).innerText.trim() : '';

        const priceEl = el.querySelector('[data-testid="listing-price"], .price');
        const rawPrice = priceEl ? (priceEl as HTMLElement).innerText : '0';
        const priceMatch = rawPrice.replace(/[^\d.]/g, '');
        const price = parseFloat(priceMatch) || 0;

        const linkEl = el.querySelector('a[data-testid="listing-link"], a.title') as HTMLAnchorElement;
        const link = linkEl ? linkEl.href : '';

        const imgEl = el.querySelector('img');
        const imageUrl = imgEl ? (imgEl as HTMLImageElement).src : '';

        const locEl = el.querySelector('[data-testid="listing-location"], .location');
        const location = locEl ? (locEl as HTMLElement).innerText.trim() : 'Kijiji';

        if (title && link && price > 0) {
          items.push({
            title,
            price,
            url: link,
            imageUrl,
            location
          });
        }
      });
      return items;
    });

    return listings;

  } catch (error) {
    console.error('Kijiji Playwright Scraper Error:', error);
    return [];
  } finally {
    if (browser) await browser.close();
  }
}
