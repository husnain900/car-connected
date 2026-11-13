"use client";

import React, { useEffect } from "react";
import { simulationStore, useSimulationStore } from "@/lib/simulationStore";

export default function SimulationProvider({ children }: { children: React.ReactNode }) {
  const { isSimulating } = useSimulationStore();

  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      const state = simulationStore.getState();
      const current = state.vehicles.find((v) => v.id === state.activeVehicleId);
      if (!current) return;

      simulationStore.updateSettings({}); // triggers ticker update safely
    }, 3000);

    return () => clearInterval(interval);
  }, [isSimulating]);

  return <>{children}</>;
}
