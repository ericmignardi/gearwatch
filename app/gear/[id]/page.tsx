import { prisma } from "@/libs/prisma";
import { notFound } from "next/navigation";
import { Zap } from "lucide-react";
import { ListingDetailHeader } from "@/components/gear/header";
import { ListingSpecGrid } from "@/components/gear/spec-grid";
import { PriceTrajectory } from "@/components/gear/price-trajectory";
import { TacticalActions } from "@/components/gear/tactical-actions";
import { SystemLog } from "@/components/gear/system-log";
import { GearFooter } from "@/components/gear/footer";

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const listing = await prisma.listing.findUnique({
    where: { id },
    include: { priceHistory: true },
  });

  if (!listing) notFound();

  return (
    <div className="bg-google-light text-google-dark min-h-screen font-sans">
      <ListingDetailHeader />

      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-12 p-8 pt-20 lg:grid-cols-12">
        {/* Left Column: Intelligence Data */}
        <div className="space-y-12 lg:col-span-8">
          <section>
            <div className="text-google-blue mb-4 flex items-center gap-3 text-xs font-bold uppercase tracking-wider">
              <Zap size={14} className="text-amber-500" />
              Listing Analysis
            </div>
            <h1 className="mb-8 text-5xl font-bold tracking-tight text-google-dark md:text-7xl">
              {listing.title}
            </h1>

            <ListingSpecGrid
              price={listing.price}
              condition={listing.condition}
              source={listing.source}
              id={listing.id}
            />
          </section>

          <PriceTrajectory />
        </div>

        {/* Right Column: Tactical Actions */}
        <div className="space-y-8 lg:col-span-4">
          <TacticalActions
            listingId={listing.id}
            listingUrl={listing.url}
            listingTitle={listing.title}
          />

          <SystemLog />
        </div>
      </main>

      <GearFooter />
    </div>
  );
}
