import { Activity, LogOut } from 'lucide-react';
import Link from 'next/link';
import { SignOutButton } from '@clerk/nextjs';

interface DashboardHeaderProps {
  clerkId: string;
}

export function DashboardHeader({ clerkId }: DashboardHeaderProps) {
  return (
    <header className="bg-white border-b border-border-subtle sticky top-0 z-50 flex items-center justify-between px-8 py-4 shadow-sm">
      <div className="flex items-center gap-6">
        <Link
          href="/"
          className="text-text-main text-2xl font-serif font-medium tracking-tight italic"
        >
          Gear<span className="text-brand-primary not-italic font-sans font-bold">Watch</span>
        </Link>
        <div className="bg-border-subtle hidden h-6 w-px md:block" />
        <div className="text-text-muted hidden items-center gap-2 text-[11px] font-bold uppercase tracking-widest md:flex letterpress-text">
          <Activity className="text-brand-secondary h-4 w-4" />
          Market Feed: Active
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="bg-bg-base border border-border-subtle flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-bold text-text-muted uppercase tracking-widest letterpress-text">
          <div className="bg-brand-secondary h-2 w-2 rounded-full" />
          ID: {clerkId.slice(0, 8)}
        </div>
        <SignOutButton>
          <button className="text-text-muted hover:text-brand-primary flex items-center gap-2 px-4 py-2 text-[11px] font-bold uppercase tracking-widest transition-colors">
            <LogOut size={16} />
            Logout
          </button>
        </SignOutButton>
      </div>
    </header>
  );
}
