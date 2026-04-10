import { prisma } from './prisma';
import { ScrapedListing } from './scrapers/kijiji';
import { parseGearTitle } from './ai-parser';

export async function ingestListings(scrapedData: ScrapedListing[], source: any) {
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
        // Use AI to parse the title for brand and model
        const { brand, model } = await parseGearTitle(item.title);

        await prisma.listing.create({
          data: {
            title: item.title,
            brand: brand || 'Unknown', 
            model: model || 'Unknown', 
            condition: 'GOOD' as any, 
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
