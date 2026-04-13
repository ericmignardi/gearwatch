import Link from "next/link";
import { Search, Activity } from "lucide-react";
import { SignInButton, UserButton, Show } from "@clerk/nextjs";

interface SearchHeaderProps {
  query: string;
}

export const SearchHeader = ({ query }: SearchHeaderProps) => (
  <header className="bg-white border-b border-google-border px-8 py-4 flex justify-between items-center sticky top-0 z-50">
    <div className="flex items-center gap-6">
      <Link
        href="/"
        className="text-google-dark text-xl font-bold tracking-tight"
      >
        Gear<span className="text-google-blue">Watch</span>
      </Link>
      <div className="h-6 w-px bg-google-border hidden md:block" />
      <div className="hidden md:flex items-center gap-2 text-xs text-google-gray font-medium uppercase tracking-wider">
        <Search className="w-3.5 h-3.5 text-google-blue" />
        Search: {query || "ALL_GEAR"}
      </div>
    </div>

    <div className="flex items-center gap-6 text-xs uppercase tracking-wider font-bold">
      <Link href="/dashboard" className="text-google-gray hover:text-google-dark transition-colors">
        Dashboard
      </Link>
      <div className="h-4 w-px bg-google-border" />
      <div className="flex items-center gap-2 text-google-gray">
        <Activity className="w-3.5 h-3.5 text-green-600" /> Live Feed
      </div>

      <Show when="signed-out">
        <SignInButton mode="modal">
          <button className="bg-google-blue hover:bg-[#1557B0] text-white rounded-md px-6 py-2 text-sm font-medium transition-all">
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
