import { LandingHeader } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { SocialProof } from "@/components/landing/social-proof";
import { Features } from "@/components/landing/features";
import { Testimonials } from "@/components/landing/testimonials";
import { Pricing } from "@/components/landing/pricing";
import { FinalCTA } from "@/components/landing/cta";
import { LandingFooter } from "@/components/landing/footer";
export default function Home() {
  return (
    <div className="relative min-h-screen bg-bg-base text-text-main antialiased">
      <LandingHeader />

      <main className="relative z-10">
        <Hero />
        <SocialProof />
        
        <div className="flex flex-col gap-32 py-32">
          <Features />
          <Testimonials />
          <Pricing />
          <FinalCTA />
        </div>
      </main>

      <LandingFooter />
    </div>
  );
}
