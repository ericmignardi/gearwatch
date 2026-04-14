import { prisma } from './prisma';
import { ScrapedListing } from '@/types/scraping';
import { parseGearTitle } from './ai-parser';
import { Source, Condition } from '@prisma/client';

export async function ingestListings(scrapedData: ScrapedListing[], source: Source) {
  const results = {
    created: 0,
    updated: 0,
    skipped: 0,
    total: scrapedData.length
  };

  for (const item of scrapedData) {
    try {
      // Find existing listing by URL
      const existing = await prisma.listing.findFirst({
        where: { url: item.url },
        include: { priceHistory: { orderBy: { recordedAt: 'desc' }, take: 1 } },
      });

      if (existing) {
        if (existing.price !== item.price) {
          await prisma.$transaction([
            prisma.listing.update({
              where: { id: existing.id },
              data: { 
                price: item.price,
                scrapedAt: new Date(),
                isActive: true 
              },
            }),
            prisma.priceSnapshot.create({
              data: {
                listingId: existing.id,
                price: item.price,
              },
            }),
          ]);
          results.updated++;
        } else {
          await prisma.listing.update({
            where: { id: existing.id },
            data: { scrapedAt: new Date(), isActive: true },
          });
          results.skipped++;
        }
      } else {
        // Small delay to prevent hitting AI rate limits too hard (especially on free tier)
        await new Promise(resolve => setTimeout(resolve, 500));

        // Use AI to parse the title for brand and model
        const parsedData = await parseGearTitle(item.title);

        // Skip if not recognized as gear
        if (!parsedData) {
          results.skipped++;
          continue;
        }

        const { brand, model, condition } = parsedData;

        await prisma.listing.create({
          data: {
            title: item.title,
            brand: brand || 'Unknown', 
            model: model || 'Unknown', 
            condition: (condition as Condition) || Condition.GOOD, 
            price: item.price,
            source: source,
            url: item.url,
            imageUrl: item.imageUrl,
            priceHistory: {
              create: {
                price: item.price,
              },
            },
          },
        });
        results.created++;
      }
    } catch (error) {
      console.error(`Error ingesting item ${item.url}:`, error);
    }
  }

  return results;
}
