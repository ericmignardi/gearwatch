import { NextResponse } from 'next/server';
import { scrapeSweetwater } from '@/libs/scrapers/sweetwater';
import { ingestListings } from '@/libs/ingestion';
import { Source } from '@prisma/client';

export async function GET() {
  try {
    const scraped = await scrapeSweetwater('squier guitar');
    
    if (!scraped || scraped.length === 0) {
      return NextResponse.json({ 
        message: 'No listings found. Sweetwater might be blocking the request or selectors have changed.',
        scraped: 0 
      }, { status: 404 });
    }

    const summary = await ingestListings(scraped, Source.SWEETWATER);

    return NextResponse.json({
      message: 'Sync completed',
      ...summary
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Sync API Error:', error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
