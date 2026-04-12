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
