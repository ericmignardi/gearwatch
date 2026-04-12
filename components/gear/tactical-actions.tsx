import { ShieldCheck, Scale, ExternalLink } from "lucide-react";
import MonitorButton from "@/components/shared/monitor-button";
import AIInsights from "@/components/shared/ai-insights";

interface TacticalActionsProps {
  listingId: string;
  listingUrl: string;
  listingTitle: string;
}

export const TacticalActions = ({
  listingId,
  listingUrl,
  listingTitle,
}: TacticalActionsProps) => (
  <div className="bg-machine border-border-subtle space-y-8 border p-8">
    <div>
      <div className="text-foreground/30 mb-4 flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase">
        <ShieldCheck size={12} className="text-signal" /> Verification_Status
      </div>
      <div className="bg-obsidian border-border-subtle flex items-center gap-4 border p-4">
        <div className="bg-signal/10 flex h-10 w-10 items-center justify-center rounded-sm">
          <Scale className="text-signal" size={18} />
        </div>
        <div>
          <div className="text-signal text-sm font-black tracking-tight uppercase italic">
            Optimal Buy
          </div>
          <div className="text-foreground/40 font-mono text-[9px] uppercase">
            Confidence Score: 0.94
          </div>
        </div>
      </div>
    </div>

    <div className="border-border-subtle space-y-4 border-t pt-4">
      <a
        href={listingUrl}
        target="_blank"
        className="bg-signal text-obsidian group flex w-full items-center justify-center gap-2 p-4 text-xs font-black tracking-[0.1em] uppercase shadow-[0_0_30px_rgba(255,92,0,0.2)] transition-all hover:bg-white hover:shadow-[0_0_50px_rgba(255,92,0,0.4)]"
      >
        ACQUIRE{" "}
        <ExternalLink
          size={16}
          className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
        />
      </a>
      <MonitorButton query={listingTitle} />
    </div>

    <div className="space-y-4 pt-8">
      <AIInsights listingId={listingId} />
      <div className="text-foreground/20 mb-4 font-mono text-[8px] tracking-[0.4em] uppercase">
        {/* // INTEL_SYNOPSIS */}
      </div>
      <p className="text-foreground/50 text-xs leading-relaxed italic">
        &quot;The current price point is 12% below the 30-day moving average.
        Highly recommended for immediate capture. Liquidity for this model is
        historically high in current market conditions.&quot;
      </p>
    </div>
  </div>
);
