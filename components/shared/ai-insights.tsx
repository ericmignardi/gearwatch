'use client';

import { useState, useEffect } from 'react';

export default function AIInsights({ listingId }: { listingId: string }) {
  const [insights, setInsights] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/ai/insights?listingId=${listingId}`)
      .then((res) => res.json())
      .then((data) => {
        setInsights(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load insights', err);
        setLoading(false);
      });
  }, [listingId]);

  if (loading)
    return (
      <div className="text-foreground/40 animate-pulse font-mono text-xs uppercase">
        ANALYZING_MARKET_DATA...
      </div>
    );
  if (!insights) return null;

  return (
    <div className="bg-machine border-border-subtle space-y-4 border p-6">
      <h3 className="text-signal font-mono text-xs tracking-[0.2em] uppercase">
        AI_MARKET_INSIGHTS
      </h3>
      <p className="text-foreground/70 text-sm">{insights.rationale}</p>
      <div className="text-signal text-xs font-bold uppercase">
        Recommendation: {insights.recommendation} ({insights.confidence}{' '}
        confidence)
      </div>
    </div>
  );
}
