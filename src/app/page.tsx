import Header from "@/components/Header";
import { Hero } from "@/components/ui/animated-hero";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import TouristicCarousel from "@/components/TouristicCarousel";

export default function Home() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <Header />
        <main className="flex-1">
          <Hero />
          <TouristicCarousel />
          <Features />
        </main>
        <Footer />
      </div>
    </div>
  );
}
