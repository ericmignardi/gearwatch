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
  <section className="space-y-12">
    <h2 className="text-text-main text-4xl font-serif font-medium tracking-tight italic">
      Price Alerts
    </h2>
    <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
      {priceAlerts.map((a) => (
        <div
          key={a.id}
          className="tactile-card p-10 bg-white border border-border-subtle"
        >
          <div className="bg-brand-primary/10 text-brand-primary w-fit px-4 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest mb-8 letterpress-text">
            Active Monitoring
          </div>
          <h4 className="text-text-main text-2xl font-serif font-medium mb-6 italic">{a.query}</h4>
          <div className="flex items-end justify-between border-t border-border-subtle pt-6">
            <div>
              <div className="text-text-muted/40 font-bold text-[10px] uppercase tracking-widest mb-2 letterpress-text">
                Target Threshold
              </div>
              <div className="text-text-main text-3xl font-serif font-medium text-brand-primary">
                ${a.targetPrice}
              </div>
            </div>
            <div className="text-text-muted/40 font-bold text-[11px] uppercase tracking-widest italic font-serif">
              Current: $1,450
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);
