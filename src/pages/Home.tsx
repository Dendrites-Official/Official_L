// src/pages/Home.tsx
import React from "react";
import LandingPage from "@/components/LandingPage"; // if alias "@" is set to ./src

type HomePageProps = {
  introReady?: boolean;
};

export default function HomePage({ introReady = true }: HomePageProps) {
  return <LandingPage introReady={introReady} />;
}
