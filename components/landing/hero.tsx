"use client";

import { motion } from "motion/react";
import { Search, ArrowRight, Activity } from "lucide-react";
import { SignInButton } from "@clerk/nextjs";

export const Hero = () => {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-32 pb-20 px-6">
      <div className="relative z-20 text-center max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 inline-flex items-center gap-2 rounded-lg border border-border-subtle bg-white px-5 py-2 text-[11px] font-bold tracking-[0.2em] text-brand-primary uppercase shadow-sm letterpress-text"
        >
          <Activity className="h-3 w-3" />
          Professional Market Tracking
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-text-main mb-10 text-7xl font-serif font-medium tracking-tight md:text-9xl leading-[0.95]"
        >
          Buy better. <br />
          <span className="text-brand-primary italic">Sell smarter.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-text-muted mx-auto mb-16 max-w-xl text-xl font-normal leading-relaxed tracking-tight"
        >
          The highest-fidelity marketplace insights for serious gear hunters. 
          Analyze price trends, set AI alerts, and snag the best deals instantly.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-2xl group cursor-pointer"
        >
          <SignInButton mode="modal">
            <div className="flex flex-col md:flex-row items-center p-1 bg-white border border-border-subtle rounded-2xl shadow-tactile transition-all duration-700 hover:shadow-2xl hover:border-brand-primary/20">
              <div className="flex w-full items-center">
                <div className="text-text-muted/40 pl-6 transition-colors group-hover:text-brand-primary">
                  <Search size={20} strokeWidth={2.5} />
                </div>

                <div className="w-full px-5 py-6 text-xl font-normal text-text-muted/40 text-left select-none italic font-serif">
                  Search for gear, brands, or models...
                </div>
              </div>

              <div className="w-full md:w-auto bg-brand-primary text-white relative flex h-16 items-center justify-center gap-3 overflow-hidden rounded-xl px-10 font-bold transition-all group-hover:bg-brand-primary/90 active:scale-[0.98] m-1">
                <span className="relative z-10 whitespace-nowrap">Join to Search</span>
                <ArrowRight size={20} strokeWidth={3} className="relative z-10" />
              </div>
            </div>
          </SignInButton>
        </motion.div>
      </div>
    </section>
  );
};
