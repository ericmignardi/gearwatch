import Link from 'next/link';
import { ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface ListingCardProps {
  item: {
    id: string;
    title: string;
    price: number;
    source: string;
  };
}

export function ListingCard({ item }: ListingCardProps) {
  return (
    <div className="group relative bg-machine border border-border-subtle hover:border-signal transition-all duration-300">
      {/* Scanline Effect */}
      <div className="absolute top-0 left-0 w-full h-px bg-signal/20 group-hover:bg-signal/40 group-hover:translate-y-48 transition-all duration-[2s] pointer-events-none" />
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div className="font-mono text-[9px] text-foreground/30 uppercase tracking-[0.2em]">
            Packet ID: {item.id.slice(0, 8)}
          </div>
          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-obsidian border border-border-subtle rounded-full">
            <div className="w-1 h-1 bg-signal rounded-full animate-pulse" />
            <span className="font-mono text-[8px] text-foreground/50 uppercase tracking-widest">{item.source}</span>
          </div>
        </div>

        <h3 className="text-lg font-bold uppercase tracking-tight leading-tight mb-4 group-hover:text-signal transition-colors line-clamp-2">
          {item.title}
        </h3>

        <div className="flex items-end justify-between">
          <div>
            <div className="font-mono text-[9px] text-foreground/30 uppercase mb-1">Market Value</div>
            <div className="text-3xl font-black italic text-foreground tracking-tighter group-hover:text-glow transition-all">
              ${item.price.toLocaleString()}
            </div>
          </div>
          <Link 
            href={`/gear/${item.id}`}
            className="w-10 h-10 bg-border-subtle flex items-center justify-center group-hover:bg-signal group-hover:text-obsidian transition-colors"
          >
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      <div className="border-t border-border-subtle p-4 flex justify-between bg-obsidian/40 font-mono text-[9px] uppercase tracking-widest text-foreground/40">
        <div className="flex items-center gap-2">
          <ShieldCheck size={10} className="text-signal" /> Validated
        </div>
        <div className="flex items-center gap-2">
          <Zap size={10} className="text-signal" /> 98% Confidence
        </div>
      </div>
    </div>
  );
}
