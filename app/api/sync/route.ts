import { NextResponse } from 'next/server';
import { scrapeKijiji } from '@/libs/scrapers/kijiji';
import { scrapeReverb } from '@/libs/scrapers/reverb';
import { scrapeEbay } from '@/libs/scrapers/ebay';
import { scrapeGuitarCenter } from '@/libs/scrapers/guitarcenter';
import { scrapeSweetwater } from '@/libs/scrapers/sweetwater';
import { ingestListings } from '@/libs/ingestion';
import { Source } from '@prisma/client';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || 'squier guitar';
  const sourceParam = searchParams.get('source');

  const sources = [
    { name: Source.KIJIJI, scraper: scrapeKijiji },
    { name: Source.REVERB, scraper: scrapeReverb },
    { name: Source.EBAY, scraper: scrapeEbay },
    { name: Source.GUITAR_CENTER, scraper: scrapeGuitarCenter },
    { name: Source.SWEETWATER, scraper: scrapeSweetwater },
  ];

  const results: { source: Source; created?: number; updated?: number; skipped?: number; total?: number; message?: string; scraped?: number; error?: string }[] = [];

  for (const src of sources) {
    if (sourceParam && sourceParam.toUpperCase() !== src.name) continue;

    try {
      console.log(`Syncing ${src.name} for query: ${query}...`);
      const scraped = await src.scraper(query);
      
      if (scraped && scraped.length > 0) {
        const summary = await ingestListings(scraped, src.name);
        results.push({
          source: src.name,
          ...summary,
          scraped: scraped.length
        });
      } else {
        results.push({
          source: src.name,
          message: 'No listings found or blocked',
          scraped: 0
        });
      }
    } catch (error) {
      console.error(`Sync error for ${src.name}:`, error);
      results.push({
        source: src.name,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  return NextResponse.json({
    message: 'Global sync completed',
    results
  });
}
