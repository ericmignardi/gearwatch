"use client";

import { Search } from "lucide-react";

interface Watchlist {
  id: string;
  query: string;
}

interface WatchlistTabProps {
  watchlists: Watchlist[];
}

export const WatchlistTab = ({ watchlists }: WatchlistTabProps) => (
  <section className="space-y-12">
    <h2 className="text-text-main text-4xl font-serif font-medium tracking-tight italic">
      Active Watchlists
    </h2>
    <div className="grid grid-cols-1 gap-8">
      {watchlists.map((w) => (
        <div
          key={w.id}
          className="tactile-card p-10 bg-white border border-border-subtle group relative overflow-hidden transition-all"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="bg-bg-base flex h-14 w-14 items-center justify-center rounded-xl border border-border-subtle shadow-sm transition-transform group-hover:scale-110">
                <Search className="text-brand-primary" size={24} />
              </div>
              <div>
                <div className="text-text-main text-2xl font-serif font-medium tracking-tight group-hover:text-brand-primary transition-colors italic">
                  {w.query}
                </div>
                <div className="text-text-muted font-bold text-[10px] uppercase tracking-widest mt-2 letterpress-text">
                  Scanning All Marketplaces
                </div>
              </div>
            </div>
            <button className="bg-bg-base text-text-muted border border-border-subtle hover:bg-brand-primary hover:text-white rounded-xl px-8 py-3 text-[11px] font-bold uppercase tracking-widest transition-all shadow-sm active:scale-95">
              Configure
            </button>
          </div>
        </div>
      ))}
    </div>
  </section>
);
