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
      <div className="p-20 border border-dashed border-google-border text-center bg-white rounded-xl">
        <p className="text-google-gray max-w-sm mx-auto font-medium">
          We couldn&apos;t find any active listings matching your search. 
          Try adjusting your keywords or filters.
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
