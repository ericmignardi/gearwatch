"use client";

import { motion } from "motion/react";

const partners = [
  "Reverb", "eBay", "Sweetwater", "Guitar Center", "Kijiji", "Thomann"
];

export const SocialProof = () => (
  <section className="relative z-20 py-24 border-y border-border-subtle/50 bg-bg-subtle/30">
    <div className="mx-auto max-w-7xl px-6">
      <div className="flex flex-col items-center gap-12">
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-[11px] font-bold uppercase tracking-[0.3em] text-text-muted/60 letterpress-text"
        >
          Tracking over 2.4M items across the global market
        </motion.p>
        
        <div className="flex flex-wrap items-center justify-center gap-x-20 gap-y-10 opacity-30 grayscale transition-all hover:opacity-50">
          {partners.map((partner, i) => (
            <motion.div
              key={partner}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="text-3xl font-serif font-medium tracking-tight text-text-main italic"
            >
              {partner}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
