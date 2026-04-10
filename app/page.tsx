'use client';

import { Search, Radio, Activity, Zap, Shield } from 'lucide-react';
import { SignInButton } from '@clerk/nextjs';
import Link from 'next/link';
import Form from 'next/form';
import { motion } from 'motion/react';

const DecorativeGrid = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-20">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] bg-[size:64px_64px]" />
  </div>
);

export default function Home() {
  return (
    <div className="bg-obsidian text-foreground selection:bg-signal/30 relative min-h-screen font-sans">
      <DecorativeGrid />

      <header className="border-border-subtle bg-obsidian/50 relative z-10 flex items-center justify-between border-b p-8 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <div className="bg-signal flex h-8 w-8 items-center justify-center rounded-sm">
            <Radio className="text-obsidian h-5 w-5" />
          </div>
          <Link
            href="/"
            className="text-3xl font-black tracking-tighter uppercase italic"
          >
            GEAR<span className="text-signal">WATCH</span>
          </Link>
        </motion.div>

        <nav className="flex items-center gap-8 font-mono text-xs font-bold tracking-widest uppercase">
          <Link
            href="/dashboard"
            className="hover:text-signal flex items-center gap-2 transition-colors"
          >
            <span className="text-[10px] opacity-40">01//</span> Dashboard
          </Link>
          <div className="bg-border-subtle h-4 w-px" />
          <SignInButton mode="modal">
            <button className="bg-signal text-obsidian border-signal border-2 px-8 py-3 text-sm font-black tracking-widest uppercase shadow-[0_0_20px_rgba(255,92,0,0.5)] transition-all hover:bg-white">
              SECURE_LOGIN
            </button>
          </SignInButton>
        </nav>
      </header>

      <main className="relative z-10 mx-auto max-w-7xl px-8 pt-32 pb-20">
        <section className="relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="text-signal mb-4 flex items-center gap-2 font-mono text-sm font-bold tracking-[0.3em] uppercase">
              <Activity className="h-4 w-4 animate-pulse" />
              Real-time Market Pulse
            </div>

            <h1 className="mb-12 text-7xl leading-[0.85] font-black tracking-tighter uppercase italic md:text-9xl">
              ANALYZE.
              <br />
              <span className="text-signal drop-shadow-[0_0_30px_rgba(255,92,0,0.3)]">
                OPTIMIZE.
              </span>
              <br />
              ACQUIRE.
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="max-w-3xl"
          >
            <p className="text-foreground/60 mb-12 max-w-2xl text-xl leading-relaxed font-medium">
              The high-performance terminal for serious collectors. Track market
              volatility, predict fair value, and intercept listings before the
              algorithm catches up.
            </p>

            <Form
              action="/search"
              className="group bg-machine border-border-subtle focus-within:border-signal relative flex items-center border transition-all duration-500"
            >
              <div className="bg-signal absolute top-0 -left-[1px] h-full w-[2px] origin-top scale-y-0 transition-transform duration-500 group-focus-within:scale-y-100" />

              <div className="text-foreground/30 pl-6">
                <Search size={24} />
              </div>

              <input
                name="q"
                type="text"
                placeholder="EXECUTE SEARCH: BRAND, MODEL, SKU..."
                className="placeholder:text-foreground/20 w-full bg-transparent p-6 font-mono text-sm tracking-widest uppercase outline-none"
              />

              <button
                type="submit"
                className="bg-signal text-obsidian h-full px-10 py-6 font-black tracking-widest uppercase transition-colors hover:bg-white"
              >
                EXECUTE
              </button>
            </Form>

            <div className="text-foreground/40 mt-6 flex gap-6 font-mono text-[10px] tracking-widest uppercase">
              <div className="flex items-center gap-2">
                <div className="bg-signal h-1 w-1 rounded-full" />
                Index: 1,248 Active Listings
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-signal h-1 w-1 rounded-full" />
                Latency: 12ms
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-signal h-1 w-1 rounded-full" />
                Status: Operational
              </div>
            </div>
          </motion.div>
        </section>

        <section className="gap-1px bg-border-subtle border-border-subtle mt-40 grid grid-cols-1 border md:grid-cols-3">
          {[
            {
              icon: Zap,
              label: 'Neural Engine',
              desc: 'Proprietary Gemini-driven market sentiment analysis.',
            },
            {
              icon: Activity,
              label: 'Price Delta',
              desc: 'Minute-by-minute tracking of marketplace fluctuations.',
            },
            {
              icon: Shield,
              label: 'Intercept',
              desc: 'Automated alerts for items below fair market value.',
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-obsidian hover:bg-machine group cursor-crosshair p-10 transition-colors"
            >
              <feature.icon className="text-signal mb-8 h-8 w-8 transition-transform group-hover:scale-110" />
              <h3 className="text-signal mb-4 font-mono text-xs font-bold tracking-[0.3em] uppercase">
                [{i.toString().padStart(2, '0')}] {feature.label}
              </h3>
              <p className="text-foreground/50 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </section>
      </main>

      <footer className="border-border-subtle bg-machine/50 relative z-10 mt-20 border-t p-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 md:flex-row">
          <div className="text-foreground/30 font-mono text-[10px] tracking-[0.4em] uppercase">
            &copy; 2026 GearWatch Terminal // System V1.0.4
          </div>
          <div className="flex gap-8">
            {['Status', 'Privacy', 'Legal', 'Source'].map((link) => (
              <a
                key={link}
                href="#"
                className="text-foreground/30 hover:text-signal font-mono text-[10px] tracking-widest uppercase transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
