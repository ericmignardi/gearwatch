import { DecorativeOrbs } from "@/components/landing/decorative-orbs";
import { LandingHeader } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { LandingFooter } from "@/components/landing/footer";

export default function Home() {
  return (
    <div className="bg-obsidian text-foreground selection:bg-rose-100 relative min-h-screen font-sans">
      <DecorativeOrbs />
      <LandingHeader />

      <main className="relative z-10 mx-auto max-w-6xl px-8 pt-24 pb-20">
        <Hero />
        <Features />
      </main>

      <LandingFooter />
    </div>
  );
}
