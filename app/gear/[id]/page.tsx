import { prisma } from '@/libs/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import MonitorButton from '@/components/shared/monitor-button';
import AIInsights from '@/components/shared/ai-insights';
import {
  ArrowLeft,
  ExternalLink,
  TrendingUp,
  ShieldCheck,
  Zap,
  Activity,
  Scale,
  Radio,
} from 'lucide-react';

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const listing = await prisma.listing.findUnique({
    where: { id },
    include: { priceHistory: true },
  });

  if (!listing) notFound();

  return (
    <div className="bg-obsidian text-foreground selection:bg-signal/30 min-h-screen font-sans">
      {/* Detail Header */}
      <header className="border-border-subtle bg-obsidian/50 sticky top-0 z-50 flex items-center justify-between border-b p-6 backdrop-blur-md">
        <div className="flex items-center gap-6">
          <Link
            href="/search"
            className="bg-machine border-border-subtle hover:bg-signal hover:text-obsidian group flex h-10 w-10 items-center justify-center border transition-colors"
          >
            <ArrowLeft
              size={18}
              className="transition-transform group-hover:-translate-x-1"
            />
          </Link>
          <div className="text-foreground/40 hidden font-mono text-[10px] tracking-[0.3em] uppercase md:block">
            {/* // BACK_TO_FEED */}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-machine border-border-subtle flex items-center gap-3 border px-4 py-1 font-mono text-[10px] uppercase">
            <Activity className="text-signal h-3 w-3" />
            LIVE_ANALYSIS_ACTIVE
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-12 p-8 pt-20 lg:grid-cols-12">
        {/* Left Column: Intelligence Data */}
        <div className="space-y-12 lg:col-span-8">
          <section>
            <div className="text-signal mb-6 flex items-center gap-3 font-mono text-xs font-bold tracking-[0.5em] uppercase">
              <Zap size={14} className="animate-pulse" />{' '}
              {/* // PRIMARY_INTERCEPT */}
            </div>
            <h1 className="mb-8 text-6xl leading-[0.85] font-black tracking-tighter uppercase italic md:text-8xl">
              {listing.title}
            </h1>

            <div className="bg-machine border-border-subtle relative grid grid-cols-2 gap-6 overflow-hidden border p-8 md:grid-cols-4">
              <div className="from-signal/0 via-signal/50 to-signal/0 absolute top-0 left-0 h-1 w-full bg-gradient-to-r opacity-20" />
              {[
                {
                  label: 'Market Price',
                  val: `$${listing.price.toLocaleString()}`,
                  color: 'text-foreground',
                },
                {
                  label: 'Condition',
                  val: listing.condition,
                  color: 'text-signal',
                },
                {
                  label: 'Source',
                  val: listing.source,
                  color: 'text-foreground',
                },
                {
                  label: 'Listing ID',
                  val: listing.id.slice(0, 8),
                  color: 'text-foreground/40',
                },
              ].map((spec) => (
                <div key={spec.label}>
                  <div className="text-foreground/30 mb-1 font-mono text-[9px] tracking-widest uppercase">
                    {spec.label}
                  </div>
                  <div
                    className={`text-xl font-black tracking-tight uppercase italic ${spec.color}`}
                  >
                    {spec.val}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-signal flex items-center gap-3 font-mono text-xs font-bold tracking-[0.4em] uppercase">
                <TrendingUp size={14} /> {/* // PRICE_TRAJECTORY */}
              </h2>
              <div className="bg-border-subtle mx-6 h-px grow" />
            </div>

            <div className="bg-machine border-border-subtle group relative flex aspect-[21/9] flex-col items-center justify-center gap-6 overflow-hidden border p-12">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />

              {/* Visual Placeholder for Chart */}
              <div className="border-border-subtle relative flex h-full w-full items-end justify-between border-b border-l px-10">
                {[40, 60, 45, 70, 85, 95, 80, 100].map((h, i) => (
                  <div
                    key={i}
                    className="bg-signal/20 hover:bg-signal border-signal w-8 border-t-2 transition-all duration-500"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>

              <div className="text-foreground/30 flex gap-12 font-mono text-[10px] tracking-[0.3em] uppercase">
                <span className="flex items-center gap-2">
                  <div className="bg-signal h-2 w-2" /> Market High
                </span>
                <span className="flex items-center gap-2">
                  <div className="bg-signal/20 h-2 w-2" /> Current Value
                </span>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Tactical Actions */}
        <div className="space-y-8 lg:col-span-4">
          <div className="bg-machine border-border-subtle space-y-8 border p-8">
            <div>
              <div className="text-foreground/30 mb-4 flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase">
                <ShieldCheck size={12} className="text-signal" />{' '}
                Verification_Status
              </div>
              <div className="bg-obsidian border-border-subtle flex items-center gap-4 border p-4">
                <div className="bg-signal/10 flex h-10 w-10 items-center justify-center rounded-sm">
                  <Scale className="text-signal" size={18} />
                </div>
                <div>
                  <div className="text-signal text-sm font-black tracking-tight uppercase italic">
                    Optimal Buy
                  </div>
                  <div className="text-foreground/40 font-mono text-[9px] uppercase">
                    Confidence Score: 0.94
                  </div>
                </div>
              </div>
            </div>

            <div className="border-border-subtle space-y-4 border-t pt-4">
              <a
                href={listing.url}
                target="_blank"
                className="bg-signal text-obsidian group flex w-full items-center justify-center gap-2 p-4 text-xs font-black tracking-[0.1em] uppercase shadow-[0_0_30px_rgba(255,92,0,0.2)] transition-all hover:bg-white hover:shadow-[0_0_50px_rgba(255,92,0,0.4)]"
              >
                ACQUIRE{' '}
                <ExternalLink
                  size={16}
                  className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </a>
              <MonitorButton query={listing.title} />
            </div>

            <div className="space-y-4 pt-8">
              <AIInsights listingId={listing.id} />
              <div className="text-foreground/20 mb-4 font-mono text-[8px] tracking-[0.4em] uppercase">
                {/* // INTEL_SYNOPSIS */}
              </div>
              <p className="text-foreground/50 text-xs leading-relaxed italic">
                &quot;The current price point is 12% below the 30-day moving
                average. Highly recommended for immediate capture. Liquidity for
                this model is historically high in current market
                conditions.&quot;
              </p>
            </div>
          </div>

          {/* Market Context Sidebar Info */}
          <div className="border-border-subtle space-y-6 border p-8 font-mono">
            <div className="text-signal text-[10px] font-bold tracking-[0.3em] uppercase">
              System_Log
            </div>
            <div className="space-y-3">
              {[
                { t: '12:04:22', m: 'PRICE_CHECK_COMPLETED' },
                { t: '12:04:23', m: 'VOLATILITY_CALCULATED: 0.04' },
                { t: '12:04:25', m: 'AI_SENTIMENT: BULLISH' },
              ].map((log, i) => (
                <div
                  key={i}
                  className="flex gap-4 text-[9px] leading-none tracking-widest uppercase"
                >
                  <span className="text-foreground/20">[{log.t}]</span>
                  <span className="text-foreground/60">{log.m}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Decorative footer element */}
      <div className="border-border-subtle mt-40 flex flex-col items-center justify-center border-t p-20 opacity-10 grayscale transition-all duration-1000 hover:opacity-100">
        <Radio className="text-signal mb-8 h-20 w-20 animate-pulse" />
        <div className="text-8xl font-black tracking-tighter uppercase italic select-none">
          GEARWATCH
        </div>
      </div>
    </div>
  );
}
