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
    <aside className="space-y-2">
      {items.map((item) => (
        <button
          key={item.label}
          onClick={() => onTabChange(item.label)}
          className={`flex w-full items-center gap-4 px-5 py-4 text-left text-sm font-bold rounded-xl transition-all border ${
            activeTab === item.label
              ? 'bg-brand-primary/10 text-brand-primary border-brand-primary/20 italic font-serif text-base'
              : 'text-text-muted border-transparent hover:bg-bg-subtle hover:text-text-main'
          }`}
        >
          <item.icon size={20} className={activeTab === item.label ? 'text-brand-primary' : 'text-text-muted'} />
          {item.label}
        </button>
      ))}
    </aside>
  );
}
