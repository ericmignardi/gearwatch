import { chromium } from '@playwright/test';
import { ScrapedListing } from '@/types/scraping';
import { getRandomUserAgent, simulateHumanBehavior, STEALTH_CONTEXT_OPTIONS } from './utils';

/**
 * NOTE: Scraping eBay violates their User Agreement and is subject to strict blocking.
 * eBay provides official APIs (https://developer.ebay.com/api-docs/buy/browse/overview.html)
 * for marketplace data retrieval. This scraper is a fallback/example.
 */
export async function scrapeEbay(query: string): Promise<ScrapedListing[]> {
  const encodedQuery = encodeURIComponent(query);
  const url = `https://www.ebay.com/sch/i.html?_nkw=${encodedQuery}&_ipg=60`;

  let browser;
  try {
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      ...STEALTH_CONTEXT_OPTIONS,
      userAgent: getRandomUserAgent(),
    });
    const page = await context.newPage();

    console.log(`Navigating to eBay: ${url}...`);
    const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });

    if (!response || response.status() >= 400) {
      console.error(`eBay responded with status ${response?.status()}. Blocking may be in effect.`);
      return [];
    }

    try {
      await page.waitForSelector('.s-item__wrapper, .s-item', { timeout: 15000 });
    } catch (e) {
      console.warn('Timeout waiting for eBay selectors. Bot detection may have been triggered.');
    }

    await simulateHumanBehavior(page);

    const listings = await page.evaluate(() => {
      const items: any[] = [];
      const listItems = document.querySelectorAll('.s-item__wrapper, .s-item');

      listItems.forEach(el => {
        const titleEl = el.querySelector('.s-item__title');
        let title = titleEl ? (titleEl as HTMLElement).innerText.trim() : '';
        if (title.toLowerCase().startsWith('new listing')) {
          title = title.substring(11).trim();
        }

        if (!title || title.includes('Shop on eBay') || title.length < 5) return;

        const priceEl = el.querySelector('.s-item__price');
        const rawPrice = priceEl ? (priceEl as HTMLElement).innerText : '0';
        const priceMatch = rawPrice.split('to')[0].replace(/[^\d.]/g, '');
        const price = parseFloat(priceMatch) || 0;

        const linkEl = el.querySelector('.s-item__link');
        const link = linkEl ? (linkEl as HTMLAnchorElement).href.split('?')[0] : '';

        const imgEl = el.querySelector('.s-item__image-img');
        const imageUrl = imgEl ? (imgEl as HTMLImageElement).src || (imgEl as any).getAttribute('data-src') : '';

        const locEl = el.querySelector('.s-item__location, .s-item__itemLocation');
        const location = locEl ? (locEl as HTMLElement).innerText.trim() : 'eBay';

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
    console.error('eBay Playwright Scraper Error:', error);
    return [];
  } finally {
    if (browser) await browser.close();
  }
}
