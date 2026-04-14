import Link from "next/link";
import { Search, Activity } from "lucide-react";
import { SignInButton, UserButton, Show } from "@clerk/nextjs";

interface SearchHeaderProps {
  query: string;
}

export const SearchHeader = ({ query }: SearchHeaderProps) => (
  <header className="bg-white border-b border-border-subtle px-8 py-4 flex justify-between items-center sticky top-0 z-50">
    <div className="flex items-center gap-6">
      <Link
        href="/"
        className="text-text-main text-2xl font-serif font-medium tracking-tight italic"
      >
        Gear<span className="text-brand-primary not-italic font-sans font-black">Watch</span>
      </Link>
      <div className="h-6 w-px bg-border-subtle hidden md:block" />
      
      <form action="/search" method="GET" className="hidden md:flex items-center gap-3 bg-bg-subtle border border-border-subtle rounded-lg px-4 py-2 w-96 focus-within:border-brand-primary/40 focus-within:ring-1 focus-within:ring-brand-primary/20 transition-all">
        <Search className="w-4 h-4 text-text-muted" />
        <input
          type="text"
          name="q"
          defaultValue={query}
          placeholder="Search for gear, brands, or models..."
          className="text-sm text-text-main bg-transparent outline-none w-full placeholder:text-text-muted/60 font-medium"
        />
      </form>
    </div>

    <div className="flex items-center gap-6 text-[11px] uppercase tracking-[0.2em] font-bold">
      <Link href="/dashboard" className="text-text-muted hover:text-text-main transition-colors">
        Dashboard
      </Link>
      <div className="h-4 w-px bg-border-subtle" />
      <div className="flex items-center gap-2 text-text-muted">
        <Activity className="w-3.5 h-3.5 text-brand-secondary" /> Live Feed
      </div>

      <Show when="signed-out">
        <SignInButton mode="modal">
          <button className="bg-brand-primary hover:bg-brand-primary/90 text-white rounded-xl px-6 py-2 text-sm font-bold transition-all shadow-lg active:scale-95 border-b-2 border-black/10">
            Sign In
          </button>
        </SignInButton>
      </Show>
      
      <Show when="signed-in">
        <UserButton />
      </Show>
    </div>
  </header>
);
