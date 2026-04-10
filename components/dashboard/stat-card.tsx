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
      whileHover={{ y: -5 }}
      className="bg-white soft-shadow group relative rounded-[2rem] p-8 transition-all"
    >
      <div className="bg-mint absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-xl opacity-0 transition-opacity group-hover:opacity-100">
        <ArrowUpRight size={16} className="text-foreground/40" />
      </div>
      
      <div className="text-serif text-4xl font-black tracking-tight text-foreground mb-4">
        {value}
      </div>
      
      <div className="flex items-center gap-2">
        <TrendingUp size={12} className="text-rose-300" />
        <div className="text-foreground/30 font-bold text-[10px] uppercase tracking-widest">
          {label} <span className="opacity-40 italic">({unit})</span>
        </div>
      </div>
    </motion.div>
  );
}
