import { BrowserContext, Page } from '@playwright/test';

const USER_AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:122.0) Gecko/20100101 Firefox/122.0',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2.1 Safari/605.1.15'
];

export function getRandomUserAgent() {
  return USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];
}

export async function humanLikeDelay(page: Page, min = 1500, max = 3000) {
  const delay = min + Math.random() * (max - min);
  await page.waitForTimeout(delay);
}

export async function simulateHumanBehavior(page: Page) {
  // Random small scroll
  await page.evaluate(() => {
    window.scrollBy(0, Math.random() * 300);
  });
  await humanLikeDelay(page, 500, 1200);
}

export const STEALTH_CONTEXT_OPTIONS = {
  viewport: { width: 1280, height: 720 },
  deviceScaleFactor: 1,
  hasTouch: false,
  isMobile: false,
};
