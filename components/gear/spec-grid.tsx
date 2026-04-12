interface ListingSpecGridProps {
  price: number;
  condition: string;
  source: string;
  id: string;
}

export const ListingSpecGrid = ({
  price,
  condition,
  source,
  id,
}: ListingSpecGridProps) => {
  const specs = [
    {
      label: "Market Price",
      val: `$${price.toLocaleString()}`,
      color: "text-foreground",
    },
    {
      label: "Condition",
      val: condition,
      color: "text-signal",
    },
    {
      label: "Source",
      val: source,
      color: "text-foreground",
    },
    {
      label: "Listing ID",
      val: id.slice(0, 8),
      color: "text-foreground/40",
    },
  ];

  return (
    <div className="bg-machine border-border-subtle relative grid grid-cols-2 gap-6 overflow-hidden border p-8 md:grid-cols-4">
      <div className="from-signal/0 via-signal/50 to-signal/0 absolute top-0 left-0 h-1 w-full bg-gradient-to-r opacity-20" />
      {specs.map((spec) => (
        <div key={spec.label}>
          <div className="text-foreground/30 mb-1 font-mono text-[9px] tracking-widest uppercase">
            {spec.label}
          </div>
          <div
            className={`text-xl font-black tracking-tight uppercase italic ${spec.color}`}
          >
            {spec.val}
          </div>
        </div>
      ))}
    </div>
  );
};
