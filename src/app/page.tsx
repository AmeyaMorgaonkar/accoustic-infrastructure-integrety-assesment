"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { CapabilitiesSection } from "@/components/CapabilitiesSection";
import { TelemetryWorkbench } from "@/components/TelemetryWorkbench";
import { Footer } from "@/components/Footer";
import { SpecificationModal } from "@/components/SpecificationModal";
import { SerialTerminalModal } from "@/components/SerialTerminalModal";

export default function Home() {
  const [isSerialOpen, setIsSerialOpen] = useState(false);
  const [isSpecsOpen, setIsSpecsOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(true);

  // Default hardcoded state values per specification
  const naturalFrequency = 48.20;
  const baselineFrequency = 50.00;

  return (
    <div className="min-h-screen bg-[#0B0C0E] text-[#E2E8F0] selection:bg-[#FF5C00]/30 selection:text-white flex flex-col font-sans">
      {/* 1. Sticky Navigation Bar */}
      <Navbar
        onOpenSerial={() => setIsSerialOpen(true)}
        isConnected={isConnected}
      />

      <main className="flex-1">
        {/* 2. Hero Section */}
        <HeroSection
          onOpenSerial={() => setIsSerialOpen(true)}
          onOpenSpecs={() => setIsSpecsOpen(true)}
          naturalFrequency={naturalFrequency}
          baselineFrequency={baselineFrequency}
        />

        {/* 3. Core Capabilities Section (Feature Cards Grid) */}
        <CapabilitiesSection />

        {/* 4. Results & Hardware Telemetry Workbench */}
        <TelemetryWorkbench
          onOpenSerial={() => setIsSerialOpen(true)}
        />
      </main>

      {/* 5. Minimalist Engineering Footer */}
      <Footer />

      {/* Specification Reference Modal */}
      <SpecificationModal
        isOpen={isSpecsOpen}
        onClose={() => setIsSpecsOpen(false)}
      />

      {/* Web Serial Diagnostic Terminal Modal */}
      <SerialTerminalModal
        isOpen={isSerialOpen}
        onClose={() => setIsSerialOpen(false)}
        onConnectionChange={(conn) => setIsConnected(conn)}
      />
    </div>
  );
}
