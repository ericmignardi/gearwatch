'use client';

import { useState } from 'react';
import {
  LayoutDashboard,
  Bell,
  Target,
} from 'lucide-react';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar';
import { StatCard } from '@/components/dashboard/stat-card';

export default function DashboardClient({ user }: { user: any }) {
  const [activeTab, setActiveTab] = useState('Overview');

  const sidebarItems = [
    { icon: LayoutDashboard, label: 'Overview' },
    { icon: Bell, label: 'Alerts' },
    { icon: Target, label: 'Watchlist' },
  ];

  return (
    <div className="bg-obsidian text-foreground selection:bg-signal/30 min-h-screen font-sans">
      <DashboardHeader clerkId={user.clerkId} />

      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-8 p-8 lg:grid-cols-12">
        <DashboardSidebar
          items={sidebarItems}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Main Content Area */}
        <div className="space-y-12 lg:col-span-9">
          {activeTab === 'Overview' && (
            <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <StatCard
                label="Active Watches"
                value={user.watchlists.length}
                unit="UNITS"
              />
              <StatCard label="Triggered Alerts" value="02" unit="NOTIFS" />
              <StatCard label="Market Volatility" value="+4.2%" unit="DELTA" />
            </section>
          )}

          {activeTab === 'Watchlist' && (
            <section>
              <h2 className="text-signal font-mono text-xs font-bold tracking-[0.4em] uppercase">
                ACTIVE_WATCHLIST
              </h2>
              <div className="mt-6 space-y-4">
                {user.watchlists.map((w: any) => (
                  <div
                    key={w.id}
                    className="bg-machine border-signal/30 border-l-2 p-6"
                  >
                    {w.query}
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeTab === 'Alerts' && (
            <section>
              <h2 className="text-signal font-mono text-xs font-bold tracking-[0.4em] uppercase">
                PRICE_ALERTS
              </h2>
              <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                {user.priceAlerts.map((a: any) => (
                  <div
                    key={a.id}
                    className="bg-machine border-border-subtle border p-6"
                  >
                    {a.query} - ${a.targetPrice}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <div className="bg-border-subtle pointer-events-none fixed bottom-0 left-0 h-1 w-full overflow-hidden opacity-20">
        <div className="bg-signal/50 animate-shimmer h-full w-full" />
      </div>
    </div>
  );
}
