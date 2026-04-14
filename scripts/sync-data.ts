import 'dotenv/config';
import { scrapeKijiji } from '../libs/scrapers/kijiji';
import { ingestListings } from '../libs/ingestion';
import { Source } from '@prisma/client';

const QUERIES = [
  'Fender Guitar',
  'Gibson Guitar',
  'PRS Guitar',
  'Ibanez Guitar',
  'Martin Guitar',
  'Taylor Guitar',
  'Epiphone Guitar',
  'Squier Guitar'
];

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function syncAll() {
  console.log('--- STARTING KIJIJI-ONLY DATA INGESTION ---');
  console.log('Pipeline: Next.js + Cheerio + Prisma + Gemini');
  
  for (const query of QUERIES) {
    console.log(`\n>>> SYNCING MARKET CATEGORY: "${query}"`);
    try {
      console.log(`[${Source.KIJIJI}] Scraping...`);
      const scraped = await scrapeKijiji(query);
      
      if (scraped && scraped.length > 0) {
        console.log(`[${Source.KIJIJI}] Ingesting ${scraped.length} items via Prisma...`);
        const summary = await ingestListings(scraped, Source.KIJIJI);
        console.log(`[${Source.KIJIJI}] Summary: +${summary.created} Created, ~${summary.updated} Updated, !${summary.skipped} Skipped`);
      } else {
        console.log(`[${Source.KIJIJI}] No new listings found.`);
      }
      
      // Politeness delay to ensure long-term stability
      await sleep(3000 + Math.random() * 2000);
    } catch (error) {
      console.error(`[${Source.KIJIJI}] Pipeline Interrupted:`, error instanceof Error ? error.message : error);
    }
    // Strategic cooldown
    await sleep(5000);
  }

  console.log('\n--- DATA INGESTION CYCLE COMPLETE ---');
}

syncAll().catch(err => {
  console.error('Fatal Pipeline Error:', err);
  process.exit(1);
});
