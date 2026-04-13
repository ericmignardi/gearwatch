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
      <div className="bg-google-light border-google-border flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed p-10">
        <Sparkles className="text-google-blue animate-pulse h-6 w-6" />
        <div className="text-google-gray font-bold text-[10px] uppercase tracking-[0.4em]">
          Synthesizing Intelligence...
        </div>
      </div>
    );
    
  if (!insights) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="google-card space-y-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-google-light flex h-10 w-10 items-center justify-center rounded-lg">
            <BrainCircuit className="text-google-blue h-5 w-5" />
          </div>
          <h3 className="text-google-dark text-lg font-bold tracking-tight">
            AI Market Synopsis
          </h3>
        </div>
        <div className="bg-blue-50 text-google-blue rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
          {insights.confidence} Confidence
        </div>
      </div>

      <p className="text-google-gray text-sm leading-relaxed font-medium">
        {insights.rationale}
      </p>

      <div className="bg-google-light grid grid-cols-1 sm:grid-cols-3 gap-4 rounded-xl p-6">
        <div>
          <div className="text-google-gray mb-1 font-bold text-[9px] uppercase tracking-widest">
            Verdict
          </div>
          <div className="text-google-blue text-sm font-bold uppercase">
            {insights.recommendation}
          </div>
        </div>
        <div>
          <div className="text-google-gray mb-1 font-bold text-[9px] uppercase tracking-widest">
            Fair Value
          </div>
          <div className="text-google-dark text-sm font-bold">
            ${insights.fairMarketPrice?.toLocaleString() || 'N/A'}
          </div>
        </div>
        <div>
          <div className="text-google-gray mb-1 font-bold text-[9px] uppercase tracking-widest">
            Trajectory
          </div>
          <div className="flex items-center gap-1 text-sm font-bold uppercase text-google-dark">
            <TrendingUp size={14} className="text-green-600" />
            {insights.trend}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
