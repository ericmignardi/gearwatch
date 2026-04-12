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
  <section className="space-y-8">
    <h2 className="text-serif text-3xl font-black tracking-tight">
      Active Watchlists
    </h2>
    <div className="grid grid-cols-1 gap-6">
      {watchlists.map((w) => (
        <div
          key={w.id}
          className="bg-white soft-shadow hover-lift group relative overflow-hidden rounded-[2rem] p-8 transition-all"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-mint flex h-12 w-12 items-center justify-center rounded-2xl">
                <Search className="text-foreground/40" size={20} />
              </div>
              <div>
                <div className="text-serif text-xl font-black tracking-tight group-hover:text-rose-400 transition-colors">
                  {w.query}
                </div>
                <div className="text-foreground/30 font-bold text-[10px] uppercase tracking-widest mt-1">
                  Scanning All Marketplaces
                </div>
              </div>
            </div>
            <button className="bg-machine text-foreground/40 hover:bg-rose-100 hover:text-rose-500 rounded-full px-6 py-2 text-[10px] font-black uppercase tracking-widest transition-all">
              Configure
            </button>
          </div>
        </div>
      ))}
    </div>
  </section>
);
