"use client";

import { motion } from "motion/react";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { SignInButton } from "@clerk/nextjs";

export const LandingHeader = () => (
  <header className="relative z-10 flex items-center justify-between p-8">
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center gap-3"
    >
      <div className="bg-signal shadow-soft flex h-10 w-10 items-center justify-center rounded-2xl">
        <Sparkles className="text-white h-5 w-5" />
      </div>
      <Link href="/" className="text-serif text-2xl font-black tracking-tight">
        Gear<span className="text-rose-400">Watch</span>
      </Link>
    </motion.div>

    <nav className="flex items-center gap-8 font-medium text-sm">
      <Link
        href="/dashboard"
        className="text-foreground/60 hover:text-foreground transition-colors"
      >
        Dashboard
      </Link>
      <SignInButton mode="modal">
        <button className="bg-white text-foreground soft-shadow hover-lift rounded-full px-8 py-3 text-sm font-bold transition-all">
          Sign In
        </button>
      </SignInButton>
    </nav>
  </header>
);
