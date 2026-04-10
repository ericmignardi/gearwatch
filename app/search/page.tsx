import { prisma } from "@/libs/prisma";
import Link from "next/link";
import { Search, Radio, Activity, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import { Suspense } from "react";

import { ListingCard } from "@/components/listings/listing-card";

// Server Component for fetching data directly
async function SearchResults({ query }: { query: string }) {
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
          The algorithm could not find any active listings matching your query parameters. Adjust filters and re-scan.
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
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;

  return (
    <div className="min-h-screen bg-obsidian text-foreground font-sans selection:bg-signal/30">
      <header className="border-b border-border-subtle p-6 flex justify-between items-center sticky top-0 bg-obsidian/80 backdrop-blur-md z-50">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-xl font-black uppercase tracking-tighter italic">
            GEAR<span className="text-signal">WATCH</span>
          </Link>
          <div className="h-6 w-px bg-border-subtle hidden md:block" />
          <div className="hidden md:flex items-center gap-2 font-mono text-[10px] text-foreground/40 uppercase tracking-widest">
            <Search className="w-3 h-3 text-signal" />
            Active Scan: {q || "ALL_INDEX"}
          </div>
        </div>
        
        <div className="flex items-center gap-8 font-mono text-[10px] uppercase tracking-widest font-bold">
           <Link href="/dashboard" className="hover:text-signal transition-colors">Dashboard</Link>
           <div className="h-4 w-px bg-border-subtle" />
           <div className="flex items-center gap-2">
             <Activity className="w-3 h-3 text-signal" /> Live_Feed
           </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-8">
        <div className="mb-12">
          <div className="font-mono text-xs uppercase tracking-[0.4em] font-bold text-signal flex items-center gap-3 mb-4">
            <Radio size={14} className="animate-pulse" /> {/* // INTERCEPT_RESULTS */}
          </div>
          <h1 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter leading-none">
            SCAN RESULTS: <span className="text-foreground/40 italic font-normal underline decoration-signal decoration-2 underline-offset-8">&quot;{q}&quot;</span>
          </h1>
        </div>

        <Suspense fallback={
          <div className="flex flex-col items-center justify-center py-40 gap-8">
             <div className="w-64 h-1 bg-machine relative overflow-hidden border border-border-subtle">
                <div className="absolute top-0 left-0 h-full bg-signal w-1/3 animate-[shimmer_2s_infinite_linear]" />
             </div>
             <div className="font-mono text-xs uppercase tracking-[0.5em] text-signal animate-pulse">
                PENETRATING_MARKET_LAYERS...
             </div>
          </div>
        }>
          <SearchResults query={q} />
        </Suspense>
      </main>

      {/* Decorative Sidebar Info */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 hidden 2xl:flex flex-col gap-12 border-l border-border-subtle pl-8">
         {[
           { label: 'Latency', val: '14ms' },
           { label: 'Uptime', val: '99.9%' },
           { label: 'Node', val: 'US-EAST' },
           { label: 'Load', val: '0.42' },
         ].map(item => (
           <div key={item.label}>
             <div className="font-mono text-[8px] uppercase tracking-[0.3em] text-foreground/20 mb-1">{item.label}</div>
             <div className="font-mono text-xs uppercase text-signal font-black">{item.val}</div>
           </div>
         ))}
      </div>
    </div>
  );
}
