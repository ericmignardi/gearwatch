export const SearchSidebarInfo = () => (
  <div className="fixed right-8 top-1/2 -translate-y-1/2 hidden 2xl:flex flex-col gap-12 border-l border-border-subtle pl-8">
    {[
      { label: "Latency", val: "14ms" },
      { label: "Uptime", val: "99.9%" },
      { label: "Node", val: "US-EAST" },
      { label: "Load", val: "0.42" },
    ].map((item) => (
      <div key={item.label}>
        <div className="font-sans text-[8px] uppercase tracking-[0.3em] text-text-muted mb-1 font-bold">
          {item.label}
        </div>
        <div className="font-sans text-[10px] uppercase text-brand-primary font-black tracking-widest">
          {item.val}
        </div>
      </div>
    ))}
  </div>
);
