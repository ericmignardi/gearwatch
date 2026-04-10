'use client';

import { useState, useEffect } from 'react';
import { Sparkles, BrainCircuit, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

interface InsightData {
  recommendation: string;
  confidence: string;
  rationale: string;
  fairMarketPrice: number;
  trend: string;
}

export default function AIInsights({ listingId }: { listingId: string }) {
  const [insights, setInsights] = useState<InsightData | null>(null);
  const [loading, setLoading] = useState(true);
  const [prevListingId, setPrevListingId] = useState(listingId);

  // Derive state from props during render to avoid cascading updates in useEffect
  if (listingId !== prevListingId) {
    setPrevListingId(listingId);
    setInsights(null);
    setLoading(true);
  }

  useEffect(() => {
    let isMounted = true;

    fetch(`/api/ai/insights?listingId=${listingId}`)
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) {
          setInsights(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('Failed to load insights', err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [listingId]);

  if (loading)
    return (
      <div className="bg-lavender/30 border-lavender/50 flex flex-col items-center justify-center gap-4 rounded-[2rem] border-2 border-dashed p-10">
        <Sparkles className="text-rose-300 animate-float h-6 w-6" />
        <div className="text-foreground/30 font-bold text-[10px] uppercase tracking-[0.4em]">
          Synthesizing Intelligence...
        </div>
      </div>
    );
    
  if (!insights) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white border-white soft-shadow space-y-6 rounded-[2rem] p-8"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-lavender flex h-10 w-10 items-center justify-center rounded-2xl">
            <BrainCircuit className="text-rose-400 h-5 w-5" />
          </div>
          <h3 className="text-serif text-lg font-black tracking-tight">
            AI Market Synopsis
          </h3>
        </div>
        <div className="bg-mint/50 text-foreground/40 rounded-full px-3 py-1 text-[9px] font-black uppercase tracking-widest">
          {insights.confidence} Confidence
        </div>
      </div>

      <p className="text-foreground/60 text-sm leading-relaxed font-medium">
        {insights.rationale}
      </p>

      <div className="bg-machine flex flex-wrap gap-4 rounded-3xl p-6">
        <div className="flex-1">
          <div className="text-foreground/20 mb-1 font-bold text-[9px] uppercase tracking-widest">
            Verdict
          </div>
          <div className="text-rose-400 text-sm font-black uppercase italic">
            {insights.recommendation}
          </div>
        </div>
        <div className="flex-1">
          <div className="text-foreground/20 mb-1 font-bold text-[9px] uppercase tracking-widest">
            Fair Value
          </div>
          <div className="text-serif text-sm font-black">
            ${insights.fairMarketPrice?.toLocaleString() || 'N/A'}
          </div>
        </div>
        <div className="flex-1">
          <div className="text-foreground/20 mb-1 font-bold text-[9px] uppercase tracking-widest">
            Trajectory
          </div>
          <div className="flex items-center gap-1 text-sm font-black uppercase italic text-foreground/60">
            <TrendingUp size={14} className="text-mint" />
            {insights.trend}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
