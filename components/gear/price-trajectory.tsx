import { TrendingUp } from "lucide-react";

export const PriceTrajectory = () => (
  <section className="space-y-6">
    <div className="flex items-center justify-between">
      <h2 className="text-signal flex items-center gap-3 font-mono text-xs font-bold tracking-[0.4em] uppercase">
        <TrendingUp size={14} /> {/* // PRICE_TRAJECTORY */}
      </h2>
      <div className="bg-border-subtle mx-6 h-px grow" />
    </div>

    <div className="bg-machine border-border-subtle group relative flex aspect-[21/9] flex-col items-center justify-center gap-6 overflow-hidden border p-12">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />

      {/* Visual Placeholder for Chart */}
      <div className="border-border-subtle relative flex h-full w-full items-end justify-between border-b border-l px-10">
        {[40, 60, 45, 70, 85, 95, 80, 100].map((h, i) => (
          <div
            key={i}
            className="bg-signal/20 hover:bg-signal border-signal w-8 border-t-2 transition-all duration-500"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>

      <div className="text-foreground/30 flex gap-12 font-mono text-[10px] tracking-[0.3em] uppercase">
        <span className="flex items-center gap-2">
          <div className="bg-signal h-2 w-2" /> Market High
        </span>
        <span className="flex items-center gap-2">
          <div className="bg-signal/20 h-2 w-2" /> Current Value
        </span>
      </div>
    </div>
  </section>
);
