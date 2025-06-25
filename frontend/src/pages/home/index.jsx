import React from "react";
import { HeroSection } from "../../components/home/HeroSection";

export default function Home() {
  return (
    <div className="flex flex-col">
      <main className="flex-1">
        <HeroSection />
      </main>
    </div>
  )
}
