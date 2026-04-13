import Link from "next/link";
import { ArrowLeft, Activity } from "lucide-react";
import { SignInButton, UserButton, Show } from "@clerk/nextjs";

export const ListingDetailHeader = () => (
  <header className="bg-white border-b border-google-border sticky top-0 z-50 flex items-center justify-between px-8 py-4">
    <div className="flex items-center gap-6">
      <Link
        href="/search"
        className="bg-google-light border border-google-border hover:bg-white hover:text-google-blue group flex h-10 w-10 items-center justify-center rounded-lg transition-colors"
      >
        <ArrowLeft
          size={18}
          className="transition-transform group-hover:-translate-x-1"
        />
      </Link>
      <div className="text-google-gray hidden text-xs font-bold uppercase tracking-wider md:block">
        Back to Search
      </div>
    </div>

    <div className="flex items-center gap-4">
      <div className="bg-blue-50 border border-blue-100 flex items-center gap-3 px-4 py-1.5 rounded-md text-[10px] font-bold text-google-blue uppercase tracking-widest">
        <Activity className="h-3 w-3" />
        Live Analysis Active
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
