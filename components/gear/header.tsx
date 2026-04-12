import Link from "next/link";
import { ArrowLeft, Activity } from "lucide-react";

export const ListingDetailHeader = () => (
  <header className="border-border-subtle bg-obsidian/50 sticky top-0 z-50 flex items-center justify-between border-b p-6 backdrop-blur-md">
    <div className="flex items-center gap-6">
      <Link
        href="/search"
        className="bg-machine border-border-subtle hover:bg-signal hover:text-obsidian group flex h-10 w-10 items-center justify-center border transition-colors"
      >
        <ArrowLeft
          size={18}
          className="transition-transform group-hover:-translate-x-1"
        />
      </Link>
      <div className="text-foreground/40 hidden font-mono text-[10px] tracking-[0.3em] uppercase md:block">
        {/* // BACK_TO_FEED */}
      </div>
    </div>

    <div className="flex items-center gap-4">
      <div className="bg-machine border-border-subtle flex items-center gap-3 border px-4 py-1 font-mono text-[10px] uppercase">
        <Activity className="text-signal h-3 w-3" />
        LIVE_ANALYSIS_ACTIVE
      </div>
    </div>
  </header>
);
