"use client";

import { motion } from "motion/react";
import { Check } from "lucide-react";
import { SignInButton } from "@clerk/nextjs";

const tiers = [
  {
    name: "Standard",
    price: "$0",
    desc: "Perfect for hobbyists tracking a few items.",
    features: ["Track up to 5 items", "Daily market snapshots", "Standard email alerts", "Basic AI analysis"],
    button: "Get Started",
    pro: false
  },
  {
    name: "Professional",
    price: "$19",
    desc: "For serious collectors and gear flippers.",
    features: ["Unlimited tracking", "Real-time sync", "Instant push alerts", "Priority Gemini analysis", "Historical price exports"],
    button: "Go Pro",
    pro: true
  }
];

export const Pricing = () => (
  <section className="relative z-20 py-32 px-6">
    <div className="mx-auto max-w-5xl">
      <div className="mb-24 text-center">
        <h2 className="text-text-main mb-6 text-5xl font-serif font-medium tracking-tight md:text-6xl italic">
          Scale your <br />
          <span className="text-brand-primary not-italic font-sans font-bold uppercase tracking-tighter">gear acquisition.</span>
        </h2>
        <div className="h-1 w-20 bg-brand-primary/20 mx-auto rounded-full mt-8" />
      </div>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 items-stretch">
        {tiers.map((tier, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className={`tactile-card relative flex flex-col p-12 bg-white ${tier.pro ? 'border-brand-primary/30 ring-4 ring-brand-primary/5' : ''}`}
          >
            {tier.pro && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-primary text-white text-[10px] font-bold uppercase tracking-[0.2em] px-6 py-2 rounded-lg shadow-lg">
                Recommended
              </div>
            )}
            
            <div className="mb-12">
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-text-muted mb-6 letterpress-text">{tier.name}</div>
              <div className="flex items-baseline gap-2">
                <span className="text-7xl font-serif font-medium text-text-main italic">{tier.price}</span>
                <span className="text-text-muted font-bold text-lg">/mo</span>
              </div>
              <p className="mt-8 text-text-muted text-lg font-normal leading-relaxed tracking-tight">{tier.desc}</p>
            </div>

            <div className="mb-16 flex flex-col gap-6 flex-grow">
              {tier.features.map((f, j) => (
                <div key={j} className="flex items-center gap-4">
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-brand-secondary/10 border border-brand-secondary/20">
                    <Check className="h-3.5 w-3.5 text-brand-secondary" strokeWidth={3} />
                  </div>
                  <span className="text-base font-normal text-text-main/80">{f}</span>
                </div>
              ))}
            </div>

            <SignInButton mode="modal">
              <button className={`w-full py-5 text-[12px] font-bold tracking-[0.2em] uppercase transition-all rounded-xl shadow-sm ${tier.pro ? 'bg-brand-primary text-white hover:bg-brand-primary/90' : 'bg-bg-base text-text-main border border-border-subtle hover:bg-bg-subtle'}`}>
                {tier.button}
              </button>
            </SignInButton>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
