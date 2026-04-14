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
    <div className="min-h-screen bg-bg-base text-text-main font-sans selection:bg-brand-primary/10">
      <SearchHeader query={q} />

      <main className="max-w-7xl mx-auto p-8 pt-16">
        <div className="mb-12">
          <div className="font-sans text-[11px] uppercase tracking-[0.4em] font-bold text-brand-primary flex items-center gap-3 mb-4">
            <Radio size={14} className="animate-pulse" />{" "}
            LIVE MARKET SCAN
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-medium tracking-tight leading-none text-text-main">
            Results for:{" "}
            <span className="text-brand-primary italic">
              &quot;{q}&quot;
            </span>
          </h1>
        </div>

        <Suspense
          fallback={
            <div className="flex flex-col items-center justify-center py-40 gap-8">
              <div className="w-64 h-1 bg-bg-subtle relative overflow-hidden border border-border-subtle rounded-full">
                <div className="absolute top-0 left-0 h-full bg-brand-primary w-1/3 animate-[shimmer_2s_infinite_linear]" />
              </div>
              <div className="font-sans text-[11px] uppercase tracking-[0.5em] text-text-muted animate-pulse">
                Analyzing Market Layers...
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
