'use client';

import { TrendingUp, ExternalLink, Heart, Sparkles } from 'lucide-react';
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
      whileHover={{ y: -4 }}
      className="tactile-card group relative flex flex-col overflow-hidden p-6 bg-white border border-border-subtle"
    >
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-2 px-3 py-1 bg-bg-base border border-border-subtle rounded-md">
          <Sparkles size={12} className="text-brand-primary" />
          <span className="font-bold text-[10px] uppercase tracking-widest text-text-muted letterpress-text">
            {item.source}
          </span>
        </div>
        <button className="text-text-muted/40 hover:text-brand-primary transition-colors">
          <Heart size={20} />
        </button>
      </div>

      <div className="space-y-4 flex-grow">
        <h3 className="text-text-main text-2xl font-serif font-medium leading-tight tracking-tight group-hover:text-brand-primary transition-colors line-clamp-2 italic">
          {item.title}
        </h3>
      </div>

      <div className="mt-8 flex items-end justify-between border-t border-border-subtle pt-6">
        <div className="space-y-1">
          <div className="text-text-muted font-bold text-[11px] uppercase tracking-widest flex items-center gap-2 letterpress-text">
            <TrendingUp size={14} className="text-brand-secondary" />
            Market Value
          </div>
          <div className="text-text-main text-3xl font-serif font-medium tracking-tight">
            ${item.price.toLocaleString()}
          </div>
        </div>
        
        <Link
          href={`/gear/${item.id}`}
          className="bg-bg-base text-text-muted hover:bg-brand-primary hover:text-white flex h-12 w-12 items-center justify-center rounded-xl transition-all border border-border-subtle hover:border-brand-primary"
        >
          <ExternalLink size={20} />
        </Link>
      </div>
    </motion.div>
  );
}
