import { ArrowUpRight, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

interface StatCardProps {
  label: string;
  value: string | number;
  unit: string;
}

export function StatCard({ label, value, unit }: StatCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="tactile-card group relative p-8 bg-white border border-border-subtle"
    >
      <div className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-xl bg-bg-base border border-border-subtle opacity-0 transition-all group-hover:opacity-100 group-hover:scale-110">
        <ArrowUpRight size={18} className="text-brand-primary" />
      </div>
      
      <div className="text-text-main text-5xl font-serif font-medium tracking-tight mb-6 italic">
        {value}
      </div>
      
      <div className="flex items-center gap-2">
        <TrendingUp size={16} className="text-brand-secondary" />
        <div className="text-text-muted font-bold text-[11px] uppercase tracking-widest letterpress-text">
          {label} <span className="text-text-muted/40 font-normal">({unit})</span>
        </div>
      </div>
    </motion.div>
  );
}
