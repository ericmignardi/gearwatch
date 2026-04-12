export const SystemLog = () => (
  <div className="border-border-subtle space-y-6 border p-8 font-mono">
    <div className="text-signal text-[10px] font-bold tracking-[0.3em] uppercase">
      System_Log
    </div>
    <div className="space-y-3">
      {[
        { t: "12:04:22", m: "PRICE_CHECK_COMPLETED" },
        { t: "12:04:23", m: "VOLATILITY_CALCULATED: 0.04" },
        { t: "12:04:25", m: "AI_SENTIMENT: BULLISH" },
      ].map((log, i) => (
        <div
          key={i}
          className="flex gap-4 text-[9px] leading-none tracking-widest uppercase"
        >
          <span className="text-foreground/20">[{log.t}]</span>
          <span className="text-foreground/60">{log.m}</span>
        </div>
      ))}
    </div>
  </div>
);
