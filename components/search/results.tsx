import { prisma } from "@/libs/prisma";
import { ListingCard } from "@/components/listings/listing-card";

interface SearchResultsProps {
  query: string;
}

export const SearchResults = async ({ query }: SearchResultsProps) => {
  const listings = await prisma.listing.findMany({
    where: {
      title: { contains: query, mode: "insensitive" },
    },
    take: 12,
    orderBy: { listedAt: "desc" },
  });

  if (listings.length === 0) {
    return (
      <div className="p-20 border-2 border-dashed border-border-subtle text-center">
        <div className="font-mono text-xs uppercase tracking-widest text-foreground/20 italic mb-4">
          {/* // ZERO_MATCHES_INTERCEPTED */}
        </div>
        <p className="text-foreground/40 max-w-sm mx-auto">
          The algorithm could not find any active listings matching your query
          parameters. Adjust filters and re-scan.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {listings.map((item) => (
        <ListingCard key={item.id} item={item} />
      ))}
    </div>
  );
};
