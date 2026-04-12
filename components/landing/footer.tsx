import Link from "next/link";

export const LandingFooter = () => (
  <footer className="mt-40 border-t border-rose-100 p-12 text-center">
    <div className="flex flex-col items-center gap-6">
      <div className="text-serif text-2xl font-black opacity-20">GearWatch</div>
      <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-foreground/20">
        <Link href="#" className="hover:text-rose-400 transition-colors">
          Insights
        </Link>
        <Link href="#" className="hover:text-rose-400 transition-colors">
          Privacy
        </Link>
        <Link href="#" className="hover:text-rose-400 transition-colors">
          Connect
        </Link>
      </div>
      <div className="text-[10px] font-bold text-foreground/10 uppercase tracking-[0.3em]">
        Crafted for enthusiasts // v1.2.0
      </div>
    </div>
  </footer>
);
