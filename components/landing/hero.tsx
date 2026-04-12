"use client";

import { motion } from "motion/react";
import { Search, TrendingUp } from "lucide-react";
import Form from "next/form";

export const Hero = () => (
  <section className="text-center">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="bg-white/50 border-white/80 soft-shadow mx-auto mb-8 flex w-fit items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold tracking-wide text-rose-400 backdrop-blur-sm">
        <TrendingUp className="h-3.5 w-3.5" />
        Intelligent Gear Analysis
      </div>

      <h1 className="text-serif mb-8 text-6xl leading-[1.1] font-black tracking-tight md:text-8xl">
        Market insight, <br />
        <span className="text-rose-300 italic">curated with love.</span>
      </h1>

      <p className="text-foreground/50 mx-auto mb-12 max-w-xl text-lg font-medium leading-relaxed">
        Experience a softer way to track your favorite gear. We blend advanced
        intelligence with a refined interface to help you find the perfect
        instruments at the perfect price.
      </p>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 1 }}
      className="mx-auto max-w-2xl"
    >
      <Form
        action="/search"
        className="bg-white soft-shadow focus-within:ring-rose-200 group flex items-center rounded-[2.5rem] p-2 transition-all duration-500 focus-within:ring-4"
      >
        <div className="text-foreground/20 pl-6">
          <Search size={22} />
        </div>

        <input
          name="q"
          type="text"
          placeholder="Find your next instrument..."
          className="placeholder:text-foreground/20 w-full bg-transparent p-4 font-medium text-lg outline-none"
        />

        <button
          type="submit"
          className="bg-signal hover:bg-rose-200 text-rose-900 h-14 rounded-full px-10 font-bold transition-all"
        >
          Scan Market
        </button>
      </Form>

      <div className="text-foreground/30 mt-8 flex justify-center gap-8 text-[11px] font-bold uppercase tracking-widest">
        <div className="flex items-center gap-2">
          <div className="bg-mint h-2 w-2 rounded-full" />
          1,248 Active
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-rose-200 h-2 w-2 rounded-full" />
          Real-time
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-lavender h-2 w-2 rounded-full" />
          Verified
        </div>
      </div>
    </motion.div>
  </section>
);
