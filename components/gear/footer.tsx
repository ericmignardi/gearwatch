import { Radio } from "lucide-react";

export const GearFooter = () => (
  <div className="border-border-subtle mt-40 flex flex-col items-center justify-center border-t p-20 opacity-10 grayscale transition-all duration-1000 hover:opacity-100">
    <Radio className="text-signal mb-8 h-20 w-20 animate-pulse" />
    <div className="text-8xl font-black tracking-tighter uppercase italic select-none">
      GEARWATCH
    </div>
  </div>
);
