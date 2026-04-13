"use client";

import { motion } from "motion/react";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Alex Rivera",
    role: "Studio Producer",
    content: "The price alerts are life-changing. I snagged a vintage Moog for 30% under market value within 2 hours of it being listed.",
    avatar: "AR"
  },
  {
    name: "Sarah Chen",
    role: "Professional Guitarist",
    content: "Cleanest data in the industry. The fair market value estimation is incredibly accurate and has saved me thousands already.",
    avatar: "SC"
  },
  {
    name: "Marcus Thorne",
    role: "Gear Collector",
    content: "Finally a tool that understands the market depth. The historical trends are exactly what I needed to time my purchases.",
    avatar: "MT"
  }
];

export const Testimonials = () => (
  <section className="relative z-20 py-32 px-6">
    <div className="mx-auto max-w-7xl">
      <div className="mb-24 text-center">
        <h2 className="text-text-main mb-6 text-5xl font-serif font-medium tracking-tight md:text-6xl italic">
          Loved by <br />
          <span className="text-brand-primary not-italic font-sans font-bold uppercase tracking-tighter">serious collectors.</span>
        </h2>
        <div className="h-1 w-20 bg-brand-primary/20 mx-auto rounded-full mt-8" />
      </div>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="tactile-card flex flex-col p-10 bg-white border border-border-subtle"
          >
            <div className="mb-8 flex gap-1.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-brand-primary text-brand-primary" />
              ))}
            </div>
            
            <p className="text-text-main mb-12 text-xl font-serif font-normal leading-relaxed tracking-tight italic">
              &quot;{t.content}&quot;
            </p>

            <div className="mt-auto flex items-center gap-5 border-t border-border-subtle pt-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-bg-base border border-border-subtle text-brand-primary font-bold text-sm shadow-sm">
                {t.avatar}
              </div>
              <div>
                <div className="text-base font-bold text-text-main italic font-serif tracking-tight">{t.name}</div>
                <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest letterpress-text mt-1">{t.role}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
