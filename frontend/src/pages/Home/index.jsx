import React from "react";
// import { FeaturesSection } from "../../components/home/FeaturesSection";
import { HeroSection } from "../../components/home/HeroSection";
import { SiteHeader } from "../../components/home/SiteHeader";

export default function Home() {
  return (
    <div className="flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        {/* <FeaturesSection /> */}
      </main>
    </div>
  )
}
