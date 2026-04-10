'use client';

import { Clock } from 'lucide-react';

export default function MonitorButton({ query }: { query: string }) {
  const addToMonitor = async () => {
    try {
      const response = await fetch('/api/watchlist', {
        method: 'POST',
        body: JSON.stringify({ query, filters: {} }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        alert('Added to watchlist');
      } else {
        const data = await response.json();
        console.error('API Error:', data);
        alert(`Failed to add to watchlist: ${data.error || 'Unknown error'}`);
      }
    } catch (e) {
      console.error(e);
      alert('Error adding to watchlist');
    }
  };

  return (
    <button
      onClick={addToMonitor}
      className="bg-machine border-border-subtle text-foreground hover:border-signal flex w-full items-center justify-center gap-2 border p-4 font-mono text-[10px] tracking-widest uppercase transition-all"
    >
      MONITOR <Clock size={16} />
    </button>
  );
}
