"use client";

interface PriceAlert {
  id: string;
  query: string;
  targetPrice: number;
}

interface AlertsTabProps {
  priceAlerts: PriceAlert[];
}

export const AlertsTab = ({ priceAlerts }: AlertsTabProps) => (
  <section className="space-y-8">
    <h2 className="text-serif text-3xl font-black tracking-tight">
      Price Alerts
    </h2>
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {priceAlerts.map((a) => (
        <div
          key={a.id}
          className="bg-white soft-shadow hover-lift rounded-[2rem] p-8 border-2 border-transparent hover:border-rose-100 transition-all"
        >
          <div className="bg-rose-100 text-rose-500 w-fit px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest mb-6">
            Active Monitoring
          </div>
          <h4 className="text-serif text-xl font-black mb-4">{a.query}</h4>
          <div className="flex items-end justify-between">
            <div>
              <div className="text-foreground/30 font-bold text-[9px] uppercase tracking-widest mb-1">
                Target Threshold
              </div>
              <div className="text-serif text-2xl font-black text-rose-400">
                ${a.targetPrice}
              </div>
            </div>
            <div className="text-foreground/20 font-bold text-[10px] uppercase tracking-widest mb-1">
              Current: $1,450
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);
