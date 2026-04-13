import { TrendingUp } from "lucide-react";

export const PriceTrajectory = () => (
  <section className="space-y-6">
    <div className="flex items-center justify-between">
      <h2 className="text-google-dark flex items-center gap-3 text-xs font-bold tracking-wider uppercase">
        <TrendingUp size={14} className="text-green-600" /> Price Trajectory
      </h2>
      <div className="bg-google-border mx-6 h-px grow" />
    </div>

    <div className="google-card group relative flex aspect-[21/9] flex-col items-center justify-center gap-6 overflow-hidden p-12">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:40px_40px] opacity-40" />

      {/* Visual Placeholder for Chart */}
      <div className="border-google-border relative flex h-full w-full items-end justify-between border-b border-l px-10">
        {[40, 60, 45, 70, 85, 95, 80, 100].map((h, i) => (
          <div
            key={i}
            className="bg-blue-100 hover:bg-google-blue border-google-blue w-8 border-t-2 transition-all duration-500"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>

      <div className="text-google-gray flex gap-12 text-[10px] font-bold uppercase tracking-widest">
        <span className="flex items-center gap-2">
          <div className="bg-google-blue h-2 w-2 rounded-sm" /> Market High
        </span>
        <span className="flex items-center gap-2">
          <div className="bg-blue-100 h-2 w-2 rounded-sm" /> Current Value
        </span>
      </div>
    </div>
  </section>
);
