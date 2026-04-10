'use client';

import { TrendingUp, ExternalLink, Calendar, Heart, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'motion/react';

interface ListingCardProps {
  item: {
    id: string;
    title: string;
    price: number;
    source: string;
  };
}

export function ListingCard({ item }: ListingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      className="puffy-panel group relative flex flex-col overflow-hidden"
    >
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-2 px-3 py-1 bg-mint/50 rounded-full">
          <Sparkles size={10} className="text-foreground/40" />
          <span className="font-bold text-[10px] uppercase tracking-widest text-foreground/40">
            {item.source}
          </span>
        </div>
        <button className="text-foreground/20 hover:text-rose-300 transition-colors">
          <Heart size={18} />
        </button>
      </div>

      <div className="space-y-6">
        <h3 className="text-serif text-2xl font-black leading-tight tracking-tight group-hover:text-rose-400 transition-colors line-clamp-2">
          {item.title}
        </h3>

        <div className="flex items-end justify-between border-t border-rose-50 pt-6">
          <div className="space-y-1">
            <div className="text-foreground/30 font-bold text-[10px] uppercase tracking-widest flex items-center gap-2">
              <TrendingUp size={12} className="text-rose-300" />
              Optimal Price
            </div>
            <div className="text-serif text-3xl font-black italic tracking-tight text-foreground">
              ${item.price.toLocaleString()}
            </div>
          </div>
          
          <Link
            href={`/gear/${item.id}`}
            className="bg-machine text-foreground/40 hover:bg-rose-400 hover:text-white flex h-12 w-12 items-center justify-center rounded-2xl transition-all soft-shadow"
          >
            <ExternalLink size={18} />
          </Link>
        </div>
      </div>

      {/* Subtle hover background accent */}
      <div className="bg-signal absolute -right-20 -bottom-20 h-40 w-40 rounded-full blur-3xl transition-opacity opacity-0 group-hover:opacity-20 pointer-events-none" />
    </motion.div>
  );
}
