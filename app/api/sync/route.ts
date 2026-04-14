import { NextResponse } from 'next/server';
import { scrapeKijiji } from '@/libs/scrapers/kijiji';
import { ingestListings } from '@/libs/ingestion';
import { Source } from '@prisma/client';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || 'squier guitar';

  const results: { source: Source; created?: number; updated?: number; skipped?: number; total?: number; message?: string; scraped?: number; error?: string }[] = [];

  try {
    console.log(`Syncing ${Source.KIJIJI} for query: ${query}...`);
    const scraped = await scrapeKijiji(query);
    
    if (scraped && scraped.length > 0) {
      const summary = await ingestListings(scraped, Source.KIJIJI);
      results.push({
        source: Source.KIJIJI,
        ...summary,
        scraped: scraped.length
      });
    } else {
      results.push({
        source: Source.KIJIJI,
        message: 'No listings found or blocked',
        scraped: 0
      });
    }
  } catch (error) {
    console.error(`Sync error for ${Source.KIJIJI}:`, error);
    results.push({
      source: Source.KIJIJI,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }

  return NextResponse.json({
    message: 'Kijiji sync completed',
    results
  });
}
