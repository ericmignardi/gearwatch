"use client";

import { Sparkles } from "lucide-react";
import { StatCard } from "./stat-card";

interface OverviewTabProps {
  watchlistCount: number;
}

export const OverviewTab = ({ watchlistCount }: OverviewTabProps) => (
  <div className="space-y-12">
    <header>
      <h1 className="text-text-main text-5xl font-serif font-medium tracking-tight mb-2 italic">
        Market Dashboard
      </h1>
      <p className="text-text-muted font-normal text-lg">
        Comprehensive analysis and tracking of your gear portfolio.
      </p>
    </header>

    <section className="grid grid-cols-1 gap-8 md:grid-cols-3">
      <StatCard label="Active Watches" value={watchlistCount} unit="Items" />
      <StatCard label="Price Alerts" value="02" unit="Active" />
      <StatCard label="Market Trend" value="+4.2%" unit="Last 30d" />
    </section>

    <div className="tactile-card p-12 bg-white relative overflow-hidden border border-border-subtle">
      <div className="relative z-10">
        <div className="bg-brand-primary/10 text-brand-primary w-fit px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest mb-8 flex items-center gap-2 letterpress-text">
          <Sparkles size={14} /> Optimization Engine Active
        </div>
        <h3 className="text-text-main text-3xl font-serif font-medium mb-4 italic">
          Neural Market Scanner
        </h3>
        <p className="text-text-muted max-w-lg text-lg leading-relaxed mb-10 font-normal">
          Our intelligence engine is currently scanning 1,248 listings across 6
          platforms. We&apos;ve detected significant price movements in vintage instruments.
        </p>
        <button className="bg-brand-primary text-white rounded-xl px-10 py-4 text-sm font-bold shadow-sm hover:bg-brand-primary/90 transition-all active:scale-95">
          Run Analysis
        </button>
      </div>
    </div>
  </div>
);
