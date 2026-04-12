import { Radio } from "lucide-react";
import { Suspense } from "react";
import { SearchHeader } from "@/components/search/header";
import { SearchSidebarInfo } from "@/components/search/sidebar-info";
import { SearchResults } from "@/components/search/results";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;

  return (
    <div className="min-h-screen bg-obsidian text-foreground font-sans selection:bg-signal/30">
      <SearchHeader query={q} />

      <main className="max-w-7xl mx-auto p-8">
        <div className="mb-12">
          <div className="font-mono text-xs uppercase tracking-[0.4em] font-bold text-signal flex items-center gap-3 mb-4">
            <Radio size={14} className="animate-pulse" />{" "}
            {/* // INTERCEPT_RESULTS */}
          </div>
          <h1 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter leading-none">
            SCAN RESULTS:{" "}
            <span className="text-foreground/40 italic font-normal underline decoration-signal decoration-2 underline-offset-8">
              &quot;{q}&quot;
            </span>
          </h1>
        </div>

        <Suspense
          fallback={
            <div className="flex flex-col items-center justify-center py-40 gap-8">
              <div className="w-64 h-1 bg-machine relative overflow-hidden border border-border-subtle">
                <div className="absolute top-0 left-0 h-full bg-signal w-1/3 animate-[shimmer_2s_infinite_linear]" />
              </div>
              <div className="font-mono text-xs uppercase tracking-[0.5em] text-signal animate-pulse">
                PENETRATING_MARKET_LAYERS...
              </div>
            </div>
          }
        >
          <SearchResults query={q} />
        </Suspense>
      </main>

      <SearchSidebarInfo />
    </div>
  );
}
