import Link from "next/link";

export const LandingFooter = () => (
  <footer className="relative z-10 border-t border-border-subtle bg-bg-base/40 pt-32 pb-20 px-6 backdrop-blur-xl">
    <div className="mx-auto max-w-7xl">
      <div className="grid grid-cols-1 gap-16 md:grid-cols-4 lg:grid-cols-5">
        <div className="md:col-span-2">
          <Link
            href="/"
            className="text-text-main text-2xl font-serif font-medium tracking-tight italic mb-8 block group"
          >
            Gear<span className="text-brand-primary not-italic font-sans font-bold">Watch</span>
          </Link>

          <p className="text-text-muted max-w-xs text-lg font-medium leading-relaxed tracking-tight opacity-70">
            The professional standard for gear marketplace tracking and analysis.
          </p>
        </div>

        <div>
          <h4 className="text-text-main mb-8 text-[11px] font-black uppercase tracking-[0.2em]">Product</h4>
          <ul className="flex flex-col gap-5 text-sm font-bold text-text-muted">
            <li><Link href="#" className="hover:text-brand-primary transition-colors">Market Search</Link></li>
            <li><Link href="#" className="hover:text-brand-primary transition-colors">Price Alerts</Link></li>
            <li><Link href="#" className="hover:text-brand-primary transition-colors">AI Insights</Link></li>
            <li><Link href="#" className="hover:text-brand-primary transition-colors">Portfolio</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-text-main mb-8 text-[11px] font-black uppercase tracking-[0.2em]">Company</h4>
          <ul className="flex flex-col gap-5 text-sm font-bold text-text-muted">
            <li><Link href="#" className="hover:text-brand-primary transition-colors">About</Link></li>
            <li><Link href="#" className="hover:text-brand-primary transition-colors">Changelog</Link></li>
            <li><Link href="#" className="hover:text-brand-primary transition-colors">Support</Link></li>
            <li><Link href="#" className="hover:text-brand-primary transition-colors">Status</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-text-main mb-8 text-[11px] font-black uppercase tracking-[0.2em]">Social</h4>
          <ul className="flex flex-col gap-5 text-sm font-bold text-text-muted">
            <li><Link href="#" className="hover:text-brand-primary transition-colors">Twitter</Link></li>
            <li><Link href="#" className="hover:text-brand-primary transition-colors">GitHub</Link></li>
            <li><Link href="#" className="hover:text-brand-primary transition-colors">Discord</Link></li>
          </ul>
        </div>
      </div>

      <div className="mt-32 flex flex-col items-center justify-between gap-8 border-t border-black/[0.03] pt-12 md:flex-row">
        <div className="flex items-center gap-6 text-[10px] font-black text-text-muted/30 uppercase tracking-[0.3em]">
          <span>© 2026 GearWatch Inc.</span>
          <div className="h-1 w-1 rounded-full bg-black/10" />
          <span>v1.2.0</span>
        </div>
        
        <div className="flex gap-10 text-[10px] font-black text-text-muted/30 uppercase tracking-[0.2em]">
          <Link href="#" className="hover:text-text-main transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-text-main transition-colors">Terms of Service</Link>
          <Link href="#" className="hover:text-text-main transition-colors">Cookie Policy</Link>
        </div>
      </div>
    </div>
  </footer>
);
