"use client";

import { motion } from "motion/react";
import { Sparkles, TrendingUp, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    label: "Neural Insights",
    desc: "Gentle market sentiment analysis powered by Gemini 1.5.",
    color: "bg-mint/30",
  },
  {
    icon: TrendingUp,
    label: "Price Trajectory",
    desc: "Follow market trends with clean, simplified visualizations.",
    color: "bg-signal/30",
  },
  {
    icon: ShieldCheck,
    label: "Fair Value",
    desc: "Automated verification to ensure you never overpay.",
    color: "bg-lavender/30",
  },
];

export const Features = () => (
  <section className="mt-40 grid grid-cols-1 gap-8 md:grid-cols-3">
    {features.map((feature, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.1 }}
        viewport={{ once: true }}
        className="puffy-panel hover-lift cursor-pointer"
      >
        <div
          className={`${feature.color} mb-6 flex h-14 w-14 items-center justify-center rounded-2xl`}
        >
          <feature.icon className="h-7 w-7 text-foreground/70" />
        </div>
        <h3 className="text-serif mb-3 text-xl font-bold tracking-tight">
          {feature.label}
        </h3>
        <p className="text-foreground/50 text-sm leading-relaxed font-medium">
          {feature.desc}
        </p>
      </motion.div>
    ))}
  </section>
);
