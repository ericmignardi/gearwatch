"use client";

import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { SignInButton } from "@clerk/nextjs";

export const FinalCTA = () => (
  <section className="relative z-20 py-48 px-6 text-center">
    <div className="mx-auto max-w-5xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className="tactile-card relative overflow-hidden p-24 bg-white border border-border-subtle shadow-2xl"
      >
        <div className="relative z-10 flex flex-col items-center gap-14">
          <div className="bg-brand-primary/10 flex h-20 w-20 items-center justify-center rounded-2xl border border-brand-primary/20 shadow-sm">
            <Sparkles className="h-10 w-10 text-brand-primary" />
          </div>
          
          <h2 className="text-text-main text-6xl font-serif font-medium tracking-tight md:text-8xl italic">
            Ready to <br />
            <span className="text-brand-primary not-italic font-sans font-bold uppercase tracking-tighter">dominate the market?</span>
          </h2>

          <p className="text-text-muted mx-auto max-w-xl text-2xl font-normal leading-relaxed tracking-tight">
            Join thousands of collectors and professionals who never miss a deal again. 
            Set up your first alert in under 60 seconds.
          </p>

          <SignInButton mode="modal">
            <button className="bg-brand-primary text-white group flex h-20 items-center gap-4 overflow-hidden rounded-2xl px-16 text-[14px] font-bold tracking-[0.2em] uppercase transition-all hover:bg-brand-primary/90 active:scale-[0.98] shadow-lg border border-brand-primary/20">
              <span className="relative z-10">Get Started Now</span>
              <ArrowRight size={24} strokeWidth={3} className="relative z-10 transition-transform group-hover:translate-x-2" />
            </button>
          </SignInButton>
        </div>

        {/* Decorative Parchment Textures */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-bg-base/20 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-brand-primary/5 blur-3xl rounded-full" />
      </motion.div>
    </div>
  </section>
);
