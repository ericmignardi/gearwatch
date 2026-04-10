import { ArrowUpRight } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  unit: string;
}

export function StatCard({ label, value, unit }: StatCardProps) {
  return (
    <div className="bg-machine border-border-subtle group hover:border-signal relative border p-6 transition-colors">
      <div className="absolute top-0 right-0 p-4 opacity-10 transition-opacity group-hover:opacity-100">
        <ArrowUpRight size={24} className="text-signal" />
      </div>
      <div className="mb-1 text-4xl leading-none font-black uppercase italic">
        {value}
      </div>
      <div className="text-signal font-mono text-[10px] font-bold tracking-widest uppercase">
        {label} [{unit}]
      </div>
    </div>
  );
}
