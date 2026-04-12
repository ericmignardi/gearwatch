"use client";

import { Sparkles } from "lucide-react";
import { StatCard } from "./stat-card";

interface OverviewTabProps {
  watchlistCount: number;
}

export const OverviewTab = ({ watchlistCount }: OverviewTabProps) => (
  <div className="space-y-12">
    <header>
      <h1 className="text-serif text-4xl font-black tracking-tight mb-2">
        Market Intelligence Hub
      </h1>
      <p className="text-foreground/40 font-medium text-sm">
        Real-time analysis of your watched instruments.
      </p>
    </header>

    <section className="grid grid-cols-1 gap-8 md:grid-cols-3">
      <StatCard label="Active Watches" value={watchlistCount} unit="UNITS" />
      <StatCard label="Triggered Alerts" value="02" unit="NOTIFS" />
      <StatCard label="Volatility" value="+4.2%" unit="DELTA" />
    </section>

    <div className="bg-white soft-shadow rounded-[2.5rem] p-12 relative overflow-hidden">
      <div className="bg-signal/20 absolute -top-20 -right-20 h-64 w-64 rounded-full blur-[80px]" />
      <div className="relative z-10">
        <div className="bg-rose-100 text-rose-500 w-fit px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 flex items-center gap-2">
          <Sparkles size={12} /> Optimization Engine Active
        </div>
        <h3 className="text-serif text-2xl font-black mb-4">
          Neural Scanner Log
        </h3>
        <p className="text-foreground/50 max-w-lg text-sm leading-relaxed mb-8">
          Our intelligence engine is currently scanning 1,248 listings across 6
          platforms. We&apos;ve detected a 12% price drop in Vintage Guitars
          over the last 48 hours.
        </p>
        <button className="bg-foreground text-white rounded-full px-8 py-3 text-xs font-bold hover-lift transition-all">
          Run Deep Scan
        </button>
      </div>
    </div>
  </div>
);
