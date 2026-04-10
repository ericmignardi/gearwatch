'use client';

import { useState } from 'react';
import {
  LayoutDashboard,
  Bell,
  Target,
  Sparkles,
  Search,
  Settings,
} from 'lucide-react';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar';
import { StatCard } from '@/components/dashboard/stat-card';
import { motion, AnimatePresence } from 'motion/react';

interface Watchlist {
  id: string;
  query: string;
}

interface PriceAlert {
  id: string;
  query: string;
  targetPrice: number;
}

interface DashboardUser {
  clerkId: string;
  watchlists: Watchlist[];
  priceAlerts: PriceAlert[];
}

export default function DashboardClient({ user }: { user: DashboardUser }) {
  const [activeTab, setActiveTab] = useState('Overview');

  const sidebarItems = [
    { icon: LayoutDashboard, label: 'Overview' },
    { icon: Bell, label: 'Alerts' },
    { icon: Target, label: 'Watchlist' },
    { icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="bg-obsidian text-foreground selection:bg-rose-100 min-h-screen font-sans">
      <DashboardHeader clerkId={user.clerkId} />

      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-12 p-8 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <DashboardSidebar
            items={sidebarItems}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>

        {/* Main Content Area */}
        <div className="space-y-12 lg:col-span-9">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {activeTab === 'Overview' && (
                <div className="space-y-12">
                  <header>
                    <h1 className="text-serif text-4xl font-black tracking-tight mb-2">
                      Market Intelligence Hub
                    </h1>
                    <p className="text-foreground/40 font-medium text-sm">
                      Real-time analysis of your watched instruments.
                    </p>
                  </header>

                  <section className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    <StatCard
                      label="Active Watches"
                      value={user.watchlists.length}
                      unit="UNITS"
                    />
                    <StatCard label="Triggered Alerts" value="02" unit="NOTIFS" />
                    <StatCard label="Volatility" value="+4.2%" unit="DELTA" />
                  </section>

                  <div className="bg-white soft-shadow rounded-[2.5rem] p-12 relative overflow-hidden">
                    <div className="bg-signal/20 absolute -top-20 -right-20 h-64 w-64 rounded-full blur-[80px]" />
                    <div className="relative z-10">
                      <div className="bg-rose-100 text-rose-500 w-fit px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 flex items-center gap-2">
                        <Sparkles size={12} /> Optimization Engine Active
                      </div>
                      <h3 className="text-serif text-2xl font-black mb-4">Neural Scanner Log</h3>
                      <p className="text-foreground/50 max-w-lg text-sm leading-relaxed mb-8">
                        Our intelligence engine is currently scanning 1,248 listings 
                        across 6 platforms. We&apos;ve detected a 12% price drop in 
                        Vintage Guitars over the last 48 hours.
                      </p>
                      <button className="bg-foreground text-white rounded-full px-8 py-3 text-xs font-bold hover-lift transition-all">
                        Run Deep Scan
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'Watchlist' && (
                <section className="space-y-8">
                  <h2 className="text-serif text-3xl font-black tracking-tight">
                    Active Watchlists
                  </h2>
                  <div className="grid grid-cols-1 gap-6">
                    {user.watchlists.map((w: Watchlist) => (
                      <div
                        key={w.id}
                        className="bg-white soft-shadow hover-lift group relative overflow-hidden rounded-[2rem] p-8 transition-all"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="bg-mint flex h-12 w-12 items-center justify-center rounded-2xl">
                              <Search className="text-foreground/40" size={20} />
                            </div>
                            <div>
                              <div className="text-serif text-xl font-black tracking-tight group-hover:text-rose-400 transition-colors">
                                {w.query}
                              </div>
                              <div className="text-foreground/30 font-bold text-[10px] uppercase tracking-widest mt-1">
                                Scanning All Marketplaces
                              </div>
                            </div>
                          </div>
                          <button className="bg-machine text-foreground/40 hover:bg-rose-100 hover:text-rose-500 rounded-full px-6 py-2 text-[10px] font-black uppercase tracking-widest transition-all">
                            Configure
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {activeTab === 'Alerts' && (
                <section className="space-y-8">
                  <h2 className="text-serif text-3xl font-black tracking-tight">
                    Price Alerts
                  </h2>
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    {user.priceAlerts.map((a: PriceAlert) => (
                      <div
                        key={a.id}
                        className="bg-white soft-shadow hover-lift rounded-[2rem] p-8 border-2 border-transparent hover:border-rose-100 transition-all"
                      >
                        <div className="bg-rose-100 text-rose-500 w-fit px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest mb-6">
                          Active Monitoring
                        </div>
                        <h4 className="text-serif text-xl font-black mb-4">
                          {a.query}
                        </h4>
                        <div className="flex items-end justify-between">
                          <div>
                            <div className="text-foreground/30 font-bold text-[9px] uppercase tracking-widest mb-1">Target Threshold</div>
                            <div className="text-serif text-2xl font-black text-rose-400">${a.targetPrice}</div>
                          </div>
                          <div className="text-foreground/20 font-bold text-[10px] uppercase tracking-widest mb-1">
                            Current: $1,450
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Subtle Floating Detail */}
      <div className="fixed bottom-8 right-8 z-50">
        <div className="bg-white/80 soft-shadow backdrop-blur-md rounded-full px-6 py-3 flex items-center gap-4 text-xs font-bold text-foreground/40">
           <div className="flex items-center gap-2">
             <div className="w-2 h-2 bg-mint rounded-full animate-pulse" />
             Core Engine v1.0.4
           </div>
           <div className="w-px h-4 bg-border-subtle" />
           Latency: 12ms
        </div>
      </div>
    </div>
  );
}
