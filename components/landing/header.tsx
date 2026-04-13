'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { SignInButton, UserButton, Show } from '@clerk/nextjs';

export const LandingHeader = () => (
  <header className="fixed top-8 right-0 left-0 z-50 flex justify-center px-6">
    <motion.div
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="flex h-20 w-full max-w-6xl items-center justify-between px-10 bg-white border border-border-subtle rounded-2xl shadow-tactile"
    >
      <Link
        href="/"
        className="text-text-main text-3xl font-serif font-medium tracking-tight italic"
      >
        Gear<span className="text-brand-primary not-italic font-sans font-black">Watch</span>
      </Link>

      <nav className="text-text-muted flex items-center gap-10 text-[13px] font-bold tracking-widest uppercase letterpress-text">
        <Show when="signed-out">
          <SignInButton mode="modal">
            <button className="bg-brand-primary rounded-xl px-8 py-3 text-white shadow-lg transition-all hover:bg-brand-primary/90 active:scale-95 border-b-4 border-black/10">
              Sign In
            </button>
          </SignInButton>
        </Show>

        <Show when="signed-in">
          <Link href={'/dashboard'} className="hover:text-brand-primary transition-colors italic font-serif text-lg lowercase tracking-tight">
            Dashboard
          </Link>
          <UserButton />
        </Show>
      </nav>
    </motion.div>
  </header>
);
