import 'dotenv/config';
import { scrapeKijiji } from '../libs/scrapers/kijiji';
import { scrapeReverb } from '../libs/scrapers/reverb';
import { scrapeEbay } from '../libs/scrapers/ebay';
import { scrapeGuitarCenter } from '../libs/scrapers/guitarcenter';
import { scrapeSweetwater } from '../libs/scrapers/sweetwater';
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
  console.log('Starting global sync of real gear data...');
  
  const sources = [
    { name: Source.KIJIJI, scraper: scrapeKijiji },
    { name: Source.REVERB, scraper: scrapeReverb },
    { name: Source.EBAY, scraper: scrapeEbay },
    { name: Source.GUITAR_CENTER, scraper: scrapeGuitarCenter },
    { name: Source.SWEETWATER, scraper: scrapeSweetwater },
  ];

  for (const query of QUERIES) {
    console.log(`\n--- Syncing for query: "${query}" ---`);
    for (const src of sources) {
      try {
        console.log(`Scraping ${src.name}...`);
        const scraped = await src.scraper(query);
        
        if (scraped && scraped.length > 0) {
          console.log(`Ingesting ${scraped.length} listings from ${src.name}...`);
          const summary = await ingestListings(scraped, src.name);
          console.log(`Results for ${src.name}: Created: ${summary.created}, Updated: ${summary.updated}, Skipped: ${summary.skipped}`);
        } else {
          console.log(`No listings found for ${src.name}`);
        }
        
        // Add a 10-15s delay between DIFFERENT sources to stay under the radar
        const jitter = Math.random() * 5000;
        console.log(`Waiting ${Math.round((10000 + jitter)/1000)}s before next source...`);
        await sleep(10000 + jitter);
      } catch (error) {
        console.error(`Error syncing ${src.name} for "${query}":`, error);
      }
    }
    // Add a longer 30-45s delay between DIFFERENT search queries
    const queryJitter = Math.random() * 15000;
    console.log(`\nQuery "${query}" completed. Cooling down for ${Math.round((30000 + queryJitter)/1000)}s...`);
    await sleep(30000 + queryJitter);
  }

  console.log('\nGlobal sync completed!');
}

syncAll().catch(err => {
  console.error('Fatal sync error:', err);
  process.exit(1);
});
