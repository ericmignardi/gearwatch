'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { SignInButton, UserButton, Show } from '@clerk/nextjs';
import { LayoutDashboard } from 'lucide-react';

export const LandingHeader = () => (
  <header className="fixed top-8 right-0 left-0 z-50 flex justify-center px-6">
    <motion.div
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="flex h-20 w-full max-w-6xl items-center justify-between px-10 bg-white/80 backdrop-blur-md border border-border-subtle rounded-2xl shadow-tactile"
    >
      <Link
        href="/"
        className="text-text-main text-3xl font-serif font-medium tracking-tight italic"
      >
        Gear<span className="text-brand-primary not-italic font-sans font-black">Watch</span>
      </Link>

      <nav className="flex items-center gap-8">
        <Show when="signed-out">
          <div className="flex items-center gap-10 text-[11px] font-bold tracking-[0.2em] uppercase text-text-muted letterpress-text mr-4">
            <Link href="#features" className="hover:text-brand-primary transition-colors">Features</Link>
            <Link href="#pricing" className="hover:text-brand-primary transition-colors">Pricing</Link>
          </div>
          <SignInButton mode="modal">
            <button className="bg-brand-primary rounded-xl px-8 py-3 text-white font-bold text-xs uppercase tracking-widest shadow-lg shadow-brand-primary/20 transition-all hover:bg-brand-primary/90 hover:-translate-y-0.5 active:scale-95 border-b-4 border-black/10">
              Sign In
            </button>
          </SignInButton>
        </Show>

        <Show when="signed-in">
          <div className="flex items-center gap-4">
            <Link 
              href="/dashboard" 
              className="group relative flex items-center gap-3 bg-bg-base border border-border-subtle pl-4 pr-6 py-2.5 rounded-xl transition-all hover:border-brand-primary/30 hover:shadow-md active:scale-[0.98]"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white border border-border-subtle text-text-muted transition-colors group-hover:text-brand-primary group-hover:border-brand-primary/20 shadow-sm">
                <LayoutDashboard size={16} strokeWidth={2.5} />
              </div>
              <div className="flex flex-col items-start leading-none">
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-text-muted group-hover:text-brand-primary transition-colors mb-0.5">Console</span>
                <span className="text-sm font-serif italic font-medium text-text-main">Dashboard</span>
              </div>
            </Link>
            <div className="h-8 w-px bg-border-subtle mx-2" />
            <UserButton appearance={{ elements: { userButtonAvatarBox: "h-10 w-10 border border-border-subtle shadow-sm" } }} />
          </div>
        </Show>
      </nav>
    </motion.div>
  </header>
);
