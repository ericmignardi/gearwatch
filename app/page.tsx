'use client';

import { Search, Sparkles, TrendingUp, ShieldCheck } from 'lucide-react';
import { SignInButton } from '@clerk/nextjs';
import Link from 'next/link';
import Form from 'next/form';
import { motion } from 'motion/react';

const DecorativeOrbs = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30">
    <div className="bg-signal absolute -top-40 -left-40 h-96 w-96 rounded-full blur-[120px]" />
    <div className="bg-mint absolute top-1/2 -right-40 h-80 w-80 rounded-full blur-[100px]" />
    <div className="bg-lavender absolute -bottom-40 left-1/2 h-96 w-96 rounded-full blur-[120px]" />
  </div>
);

export default function Home() {
  return (
    <div className="bg-obsidian text-foreground selection:bg-rose-100 relative min-h-screen font-sans">
      <DecorativeOrbs />

      <header className="relative z-10 flex items-center justify-between p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-3"
        >
          <div className="bg-signal shadow-soft flex h-10 w-10 items-center justify-center rounded-2xl">
            <Sparkles className="text-white h-5 w-5" />
          </div>
          <Link
            href="/"
            className="text-serif text-2xl font-black tracking-tight"
          >
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

      <main className="relative z-10 mx-auto max-w-6xl px-8 pt-24 pb-20">
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
              Experience a softer way to track your favorite gear. We blend 
              advanced intelligence with a refined interface to help you find 
              the perfect instruments at the perfect price.
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

        <section className="mt-40 grid grid-cols-1 gap-8 md:grid-cols-3">
          {[
            {
              icon: Sparkles,
              label: 'Neural Insights',
              desc: 'Gentle market sentiment analysis powered by Gemini 1.5.',
              color: 'bg-mint/30',
            },
            {
              icon: TrendingUp,
              label: 'Price Trajectory',
              desc: 'Follow market trends with clean, simplified visualizations.',
              color: 'bg-signal/30',
            },
            {
              icon: ShieldCheck,
              label: 'Fair Value',
              desc: 'Automated verification to ensure you never overpay.',
              color: 'bg-lavender/30',
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="puffy-panel hover-lift cursor-pointer"
            >
              <div className={`${feature.color} mb-6 flex h-14 w-14 items-center justify-center rounded-2xl`}>
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
      </main>

      <footer className="mt-40 border-t border-rose-100 p-12 text-center">
        <div className="flex flex-col items-center gap-6">
          <div className="text-serif text-2xl font-black opacity-20">
            GearWatch
          </div>
          <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-foreground/20">
            <Link href="#" className="hover:text-rose-400 transition-colors">Insights</Link>
            <Link href="#" className="hover:text-rose-400 transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-rose-400 transition-colors">Connect</Link>
          </div>
          <div className="text-[10px] font-bold text-foreground/10 uppercase tracking-[0.3em]">
            Crafted for enthusiasts // v1.2.0
          </div>
        </div>
      </footer>
    </div>
  );
}
