"use client";

import { useState } from "react";
import { LayoutDashboard, Bell, Target, Settings } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { motion, AnimatePresence } from "motion/react";
import { OverviewTab } from "@/components/dashboard/overview-tab";
import { WatchlistTab } from "@/components/dashboard/watchlist-tab";
import { AlertsTab } from "@/components/dashboard/alerts-tab";

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
  const [activeTab, setActiveTab] = useState("Overview");

  const sidebarItems = [
    { icon: LayoutDashboard, label: "Overview" },
    { icon: Bell, label: "Alerts" },
    { icon: Target, label: "Watchlist" },
    { icon: Settings, label: "Settings" },
  ];

  return (
    <div className="bg-bg-base text-text-main min-h-screen font-sans">
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
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {activeTab === "Overview" && (
                <OverviewTab watchlistCount={user.watchlists.length} />
              )}

              {activeTab === "Watchlist" && (
                <WatchlistTab watchlists={user.watchlists} />
              )}

              {activeTab === "Alerts" && (
                <AlertsTab priceAlerts={user.priceAlerts} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Subtle Floating Detail */}
      <div className="fixed bottom-8 right-8 z-50">
        <div className="bg-white border border-border-subtle shadow-tactile rounded-xl px-6 py-4 flex items-center gap-6 text-[10px] font-bold text-text-muted">
          <div className="flex items-center gap-2 uppercase tracking-widest letterpress-text">
            <div className="w-2 h-2 bg-brand-secondary rounded-full" />
            System Active
          </div>
          <div className="w-px h-6 bg-border-subtle" />
          <span className="font-serif italic text-sm">v1.0.4</span>
        </div>
      </div>
    </div>
  );
}
