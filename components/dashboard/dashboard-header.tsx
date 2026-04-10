import { Activity, LogOut } from 'lucide-react';
import Link from 'next/link';
import { SignOutButton } from '@clerk/nextjs';

interface DashboardHeaderProps {
  clerkId: string;
}

export function DashboardHeader({ clerkId }: DashboardHeaderProps) {
  return (
    <header className="border-border-subtle bg-obsidian/80 sticky top-0 z-50 flex items-center justify-between border-b p-6 backdrop-blur-md">
      <div className="flex items-center gap-6">
        <Link
          href="/"
          className="text-xl font-black tracking-tighter uppercase italic"
        >
          GEAR<span className="text-signal">WATCH</span>
        </Link>
        <div className="bg-border-subtle hidden h-6 w-px md:block" />
        <div className="text-foreground/40 hidden items-center gap-2 font-mono text-[10px] tracking-widest uppercase md:flex">
          <Activity className="text-signal h-3 w-3" />
          System: Stable // Stream: Live
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="bg-machine border-border-subtle flex items-center gap-2 border px-3 py-1 font-mono text-[10px] uppercase">
          <div className="bg-signal h-1.5 w-1.5 animate-pulse rounded-full" />
          {clerkId.slice(0, 8)}...
        </div>
        <SignOutButton>
          <button className="bg-signal text-obsidian border-signal flex items-center gap-2 border-2 px-3 py-1 font-mono text-[10px] font-bold uppercase transition-colors hover:bg-white">
            <LogOut size={12} />
            LOGOUT
          </button>
        </SignOutButton>
      </div>
    </header>
  );
}
