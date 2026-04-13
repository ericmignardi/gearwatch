"use client";

import { motion } from "motion/react";
import { Sparkles, TrendingUp, ShieldCheck, Zap, BarChart3, Fingerprint } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    label: "Neural Insights",
    desc: "High-fidelity market sentiment analysis powered by Gemini 1.5 Pro.",
    className: "md:col-span-2 md:row-span-2",
    color: "text-brand-primary",
  },
  {
    icon: TrendingUp,
    label: "Trajectory",
    desc: "Predictive price modeling.",
    className: "md:col-span-1 md:row-span-1",
    color: "text-brand-secondary",
  },
  {
    icon: ShieldCheck,
    label: "Verification",
    desc: "Authenticity and value checks.",
    className: "md:col-span-1 md:row-span-1",
    color: "text-brand-secondary",
  },
  {
    icon: Zap,
    label: "Instant Sync",
    desc: "Sub-second listing updates from major platforms.",
    className: "md:col-span-1 md:row-span-2",
    color: "text-brand-primary",
  },
  {
    icon: BarChart3,
    label: "Market Depth",
    desc: "Exhaustive historical sales data and trend analysis.",
    className: "md:col-span-2 md:row-span-1",
    color: "text-brand-primary",
  },
];

export const Features = () => (
  <section className="relative mt-20 px-6 pb-40">
    <div className="mx-auto max-w-6xl">
      <div className="mb-24 text-center">
        <h2 className="text-text-main mb-6 text-5xl font-serif font-medium tracking-tight md:text-6xl">
          Engineered for <br />
          <span className="italic text-brand-primary">market dominance.</span>
        </h2>
        <div className="h-1 w-16 bg-brand-primary/20 mx-auto rounded-full" />
      </div>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:grid-rows-3">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className={`tactile-card group relative overflow-hidden p-10 bg-white transition-all duration-700 ${feature.className}`}
          >
            <div className="relative z-10">
              <div className="mb-10 flex h-16 w-16 items-center justify-center rounded-xl border border-border-subtle bg-bg-base shadow-sm transition-transform duration-700 group-hover:scale-105 group-hover:bg-white group-hover:border-brand-primary/20">
                <feature.icon className={`h-8 w-8 ${feature.color}`} strokeWidth={1.5} />
              </div>
              <h3 className="text-text-main mb-4 text-3xl font-serif font-medium tracking-tight italic">
                {feature.label}
              </h3>
              <p className="text-text-muted text-lg font-normal leading-relaxed tracking-tight">
                {feature.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
