import { LucideIcon } from 'lucide-react';

interface SidebarItem {
  icon: LucideIcon;
  label: string;
}

interface DashboardSidebarProps {
  items: SidebarItem[];
  activeTab: string;
  onTabChange: (label: string) => void;
}

export function DashboardSidebar({ items, activeTab, onTabChange }: DashboardSidebarProps) {
  return (
    <aside className="space-y-2 lg:col-span-3">
      {items.map((item) => (
        <button
          key={item.label}
          onClick={() => onTabChange(item.label)}
          className={`flex w-full items-center gap-4 p-4 text-left font-mono text-xs tracking-widest uppercase transition-all ${
            activeTab === item.label
              ? 'bg-signal text-obsidian font-bold'
              : 'text-foreground/40 hover:bg-machine hover:text-foreground'
          }`}
        >
          <item.icon size={16} />
          {item.label}
        </button>
      ))}
    </aside>
  );
}
