import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, Condition, Source } from "@prisma/client";
import { Pool } from "pg";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // Clear existing data
  await prisma.priceSnapshot.deleteMany();
  await prisma.priceAlert.deleteMany();
  await prisma.watchlist.deleteMany();
  await prisma.listing.deleteMany();
  await prisma.user.deleteMany();

  // Create users
  await prisma.user.create({
    data: {
      clerkId: "user_123",
      email: "test@example.com",
    },
  });

  // Create listings
  const brands = ["Fender", "Gibson", "PRS", "Martin", "Taylor", "Epiphone"];
  const sources = ["REVERB", "EBAY", "GUITAR_CENTER", "SWEETWATER", "KIJIJI", "FACEBOOK_MARKETPLACE"];
  const conditions = ["NEW", "EXCELLENT", "GOOD", "FAIR", "POOR"];

  for (let i = 0; i < 30; i++) {
    const brand = brands[Math.floor(Math.random() * brands.length)];
    const source = sources[Math.floor(Math.random() * sources.length)];
    const condition = conditions[Math.floor(Math.random() * conditions.length)];
    
    const listing = await prisma.listing.create({
      data: {
        title: `${brand} Electric Guitar`,
        brand,
        model: "Model X",
        condition: condition as Condition,
        price: Math.floor(Math.random() * 2000) + 500,
        currency: "USD",
        source: source as Source,
        url: `https://${source.toLowerCase()}.com/listing/${i}`,
        isActive: true,
      },
    });

    // Create snapshots
    for (let j = 0; j < 5; j++) {
      await prisma.priceSnapshot.create({
        data: {
          listingId: listing.id,
          price: listing.price - (j * 50),
          recordedAt: new Date(Date.now() - (j * 7 * 24 * 60 * 60 * 1000)),
        },
      });
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
