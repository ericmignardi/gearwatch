import 'dotenv/config';
import { scrapeKijiji } from '../libs/scrapers/kijiji';
import { ingestListings } from '../libs/ingestion';
import { Source } from '@prisma/client';

async function testPipeline() {
  console.log('--- KIJIJI PIPELINE VERIFICATION TEST ---');
  const query = 'Fender Stratocaster';
  
  try {
    console.log(`Step 1: Testing Cheerio Scraper (Kijiji) for "${query}"...`);
    const scraped = await scrapeKijiji(query);
    
    if (!scraped || scraped.length === 0) {
      throw new Error('Scraper returned 0 results. Check selectors or connectivity.');
    }
    console.log(`SUCCESS: Found ${scraped.length} items.`);

    console.log('\nStep 2: Testing AI Parsing & Prisma Ingestion (Limit 3 items for speed)...');
    const testBatch = scraped.slice(0, 3);
    const summary = await ingestListings(testBatch, Source.KIJIJI);
    
    console.log('\n--- TEST RESULTS ---');
    console.log(`Created: ${summary.created}`);
    console.log(`Updated: ${summary.updated}`);
    console.log(`Skipped: ${summary.skipped}`);
    
    if (summary.created > 0 || summary.updated > 0) {
      console.log('\n✅ PIPELINE VERIFIED: Data is flowing from Kijiji -> Gemini -> Postgres.');
    } else {
      console.log('\n⚠️ PIPELINE PARTIAL: No data was written. Check if items were already in DB.');
    }

  } catch (error) {
    console.error('\n❌ PIPELINE FAILED:', error instanceof Error ? error.message : error);
  }
}

testPipeline();
