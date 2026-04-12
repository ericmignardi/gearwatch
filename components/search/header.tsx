import Link from "next/link";
import { Search, Activity } from "lucide-react";

interface SearchHeaderProps {
  query: string;
}

export const SearchHeader = ({ query }: SearchHeaderProps) => (
  <header className="border-b border-border-subtle p-6 flex justify-between items-center sticky top-0 bg-obsidian/80 backdrop-blur-md z-50">
    <div className="flex items-center gap-6">
      <Link
        href="/"
        className="text-xl font-black uppercase tracking-tighter italic"
      >
        GEAR<span className="text-signal">WATCH</span>
      </Link>
      <div className="h-6 w-px bg-border-subtle hidden md:block" />
      <div className="hidden md:flex items-center gap-2 font-mono text-[10px] text-foreground/40 uppercase tracking-widest">
        <Search className="w-3 h-3 text-signal" />
        Active Scan: {query || "ALL_INDEX"}
      </div>
    </div>

    <div className="flex items-center gap-8 font-mono text-[10px] uppercase tracking-widest font-bold">
      <Link href="/dashboard" className="hover:text-signal transition-colors">
        Dashboard
      </Link>
      <div className="h-4 w-px bg-border-subtle" />
      <div className="flex items-center gap-2">
        <Activity className="w-3 h-3 text-signal" /> Live_Feed
      </div>
    </div>
  </header>
);
