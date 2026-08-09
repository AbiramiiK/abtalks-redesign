import { Topbar } from "@/components/layout/topbar";
import { Footer } from "@/components/layout/footer";
import { DemoWidget } from "@/components/layout/demo-widget";
import { Reveal } from "@/components/ui/reveal";
import { Hero } from "@/components/landing/hero";
import { Pillars } from "@/components/landing/pillars";
import { HowItWorks } from "@/components/landing/how-it-works";
import { ProofSection } from "@/components/landing/proof-section";
import { ExampleDay } from "@/components/landing/example-day";
import { Achievements } from "@/components/landing/achievements";
import { StreakSection } from "@/components/landing/streak-section";
import { VisibleCard } from "@/components/landing/visible";
import { FinalCta } from "@/components/landing/final-cta";

export default function LandingPage() {
  return (
    <main>
      <Topbar />
      <Hero />
      <Reveal>
        <Pillars />
      </Reveal>
      <Reveal>
        <HowItWorks />
      </Reveal>
      <Reveal>
        <ProofSection />
      </Reveal>
      <Reveal>
        <ExampleDay />
      </Reveal>
      <Reveal>
        <StreakSection />
      </Reveal>
      <Achievements />
      <Reveal>
        <VisibleCard />
      </Reveal>
      <Reveal>
        <FinalCta />
      </Reveal>
      <Footer />
      <DemoWidget mode="light" />
    </main>
  );
}