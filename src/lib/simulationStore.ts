"use client";

import { useSyncExternalStore } from "react";
import {
  Vehicle,
  AlertNotification,
  MaintenanceRecord,
  CommandAuditEntry,
  Trip,
  DiagnosticCode,
  VisualInspectionReport,
  UserSession,
} from "@/types/vehicle";

const STORAGE_KEY = "nebula_drive_v4_state";

const INITIAL_VEHICLES: Vehicle[] = [
  {
    id: "veh-hyperion-01",
    vin: "NEB-4X88-2026-HYP01",
    name: "Nebula Hyperion GT",
    model: "Hyperion Dual-Rotor EV (Simulated Prototype)",
    year: 2026,
    licensePlate: "M24-5008",
    type: "ELECTRIC_HYPERCAR",
    status: "SIMULATION",
    dataSourceLabel: "DETERMINISTIC SIMULATION ENGINE // VIVA MODE",
    batteryLevelPct: 88,
    batteryHealthPct: 98.4,
    cellVoltage: 784.2,
    packTempC: 33.8,
    estRangeKm: 584,
    odometerKm: 14289.4,
    isLocked: true,
    valetActive: false,
    valetSpeedLimitKmH: 50,
    climateTempC: 21.0,
    ecoMode: true,
    currentSpeedKmH: 0,
    driveMode: "SPORT",
    torqueSplitFrontPct: 42,
    tires: [
      { id: "FL", name: "Front Left", psi: 35.2, targetPsi: 35.0, tempC: 26, wearPct: 16, status: "optimal" },
      { id: "FR", name: "Front Right", psi: 34.8, targetPsi: 35.0, tempC: 27, wearPct: 15, status: "optimal" },
      { id: "RL", name: "Rear Left", psi: 35.0, targetPsi: 35.0, tempC: 26, wearPct: 11, status: "optimal" },
      { id: "RR", name: "Rear Right", psi: 34.9, targetPsi: 35.0, tempC: 28, wearPct: 12, status: "optimal" },
    ],
    activeFaults: [],
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "veh-stellar-02",
    vin: "NEB-8Z21-2026-STL02",
    name: "Nebula Stellar SUV",
    model: "Stellar Performance Quad-Motor (Fleet Demo)",
    year: 2026,
    licensePlate: "STL-2026",
    type: "ELECTRIC_SUV",
    status: "SIMULATION",
    dataSourceLabel: "DETERMINISTIC SIMULATION ENGINE // FLEET DEMO",
    batteryLevelPct: 74,
    batteryHealthPct: 96.2,
    cellVoltage: 760.5,
    packTempC: 31.2,
    estRangeKm: 462,
    odometerKm: 6418.0,
    isLocked: true,
    valetActive: false,
    valetSpeedLimitKmH: 45,
    climateTempC: 22.0,
    ecoMode: false,
    currentSpeedKmH: 0,
    driveMode: "ENDURANCE",
    torqueSplitFrontPct: 50,
    tires: [
      { id: "FL", name: "Front Left", psi: 36.0, targetPsi: 36.0, tempC: 24, wearPct: 8, status: "optimal" },
      { id: "FR", name: "Front Right", psi: 36.1, targetPsi: 36.0, tempC: 24, wearPct: 8, status: "optimal" },
      { id: "RL", name: "Rear Left", psi: 35.8, targetPsi: 36.0, tempC: 25, wearPct: 6, status: "optimal" },
      { id: "RR", name: "Rear Right", psi: 35.9, targetPsi: 36.0, tempC: 25, wearPct: 6, status: "optimal" },
    ],
    activeFaults: [],
    lastUpdated: new Date().toISOString(),
  },
];

const INITIAL_TRIPS: Trip[] = [
  {
    id: "trip-01",
    vehicleId: "veh-hyperion-01",
    title: "University Research Campus to Tech Park",
    startTime: "2026-11-13T09:15:00Z",
    endTime: "2026-11-13T09:48:00Z",
    originName: "University Research Lab // Block C",
    destName: "Metropolis Tech Innovation Hub",
    distanceKm: 34.6,
    durationMins: 33,
    avgSpeedKmH: 62.9,
    energyKwh: 6.8,
    simulated: true,
    points: [
      { lat: 37.7749, lng: -122.4194, timestamp: "09:15:00", speedKmH: 0 },
      { lat: 37.7812, lng: -122.4102, timestamp: "09:20:00", speedKmH: 48 },
      { lat: 37.7901, lng: -122.3985, timestamp: "09:28:00", speedKmH: 72 },
      { lat: 37.8015, lng: -122.3872, timestamp: "09:37:00", speedKmH: 65 },
      { lat: 37.8124, lng: -122.3780, timestamp: "09:48:00", speedKmH: 0 },
    ],
  },
  {
    id: "trip-02",
    vehicleId: "veh-hyperion-01",
    title: "High-Efficiency Aerodynamic Proving Ground",
    startTime: "2026-11-12T14:00:00Z",
    endTime: "2026-11-12T14:45:00Z",
    originName: "Proving Ground Gate 2",
    destName: "Telemetry Teleport Station 4",
    distanceKm: 58.2,
    durationMins: 45,
    avgSpeedKmH: 77.6,
    energyKwh: 11.2,
    simulated: true,
    points: [
      { lat: 37.7500, lng: -122.4500, timestamp: "14:00:00", speedKmH: 0 },
      { lat: 37.7650, lng: -122.4300, timestamp: "14:15:00", speedKmH: 85 },
      { lat: 37.7850, lng: -122.4100, timestamp: "14:30:00", speedKmH: 90 },
      { lat: 37.8100, lng: -122.3900, timestamp: "14:45:00", speedKmH: 0 },
    ],
  },
];

const INITIAL_MAINTENANCE: MaintenanceRecord[] = [
  {
    id: "maint-01",
    vehicleId: "veh-hyperion-01",
    title: "Carbon-Ceramic Brake Pad Inspection",
    category: "BRAKES",
    intervalKm: 20000,
    dueKm: 20000,
    dueDate: "2026-12-15",
    status: "OK",
    lastCompletedDate: "2026-05-10",
    estimatedCostUsd: 140,
  },
  {
    id: "maint-02",
    vehicleId: "veh-hyperion-01",
    title: "High-Voltage Dielectric Coolant Flushing",
    category: "HV_COOLANT",
    intervalKm: 30000,
    dueKm: 30000,
    dueDate: "2027-02-01",
    status: "OK",
    estimatedCostUsd: 220,
  },
  {
    id: "maint-03",
    vehicleId: "veh-hyperion-01",
    title: "HEPA Bioweapon Defense Cabin Filter Replacement",
    category: "CABIN_AIR",
    intervalKm: 15000,
    dueKm: 15000,
    dueDate: "2026-11-30",
    status: "DUE_SOON",
    estimatedCostUsd: 65,
  },
  {
    id: "maint-04",
    vehicleId: "veh-hyperion-01",
    title: "4-Corner High-Speed Wheel Laser Realignment",
    category: "TYRES",
    intervalKm: 10000,
    dueKm: 10000,
    dueDate: "2026-10-15",
    status: "COMPLETED",
    lastCompletedDate: "2026-10-14",
    estimatedCostUsd: 95,
  },
];

const INITIAL_ALERTS: AlertNotification[] = [
  {
    id: "alert-01",
    vehicleId: "veh-hyperion-01",
    title: "System Diagnostics Initialized",
    message: "Nebula Drive deterministic telemetry simulator active. All ECU health checks nominal.",
    severity: "INFO",
    source: "SYSTEM",
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    read: true,
    simulated: true,
  },
  {
    id: "alert-02",
    vehicleId: "veh-hyperion-01",
    title: "Cabin Pre-Conditioning Ready",
    message: "Target cabin temperature set to 21.0°C. Climate system ready.",
    severity: "INFO",
    source: "SYSTEM",
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    read: false,
    simulated: true,
  },
];

const INITIAL_AUDIT: CommandAuditEntry[] = [
  {
    id: "audit-01",
    vehicleId: "veh-hyperion-01",
    commandName: "REMOTE_LOCK",
    issuedBy: "Zainab Amanat (M245008)",
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    status: "SIMULATED",
    latencyMs: 140,
    details: "Perimeter lock confirmed via simulated telemetry command channel.",
  },
  {
    id: "audit-02",
    vehicleId: "veh-hyperion-01",
    commandName: "CLIMATE_SYNC",
    issuedBy: "Zainab Amanat (M245008)",
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    status: "SIMULATED",
    latencyMs: 120,
    details: "Set thermostat target to 21.0°C in ECO mode.",
  },
];

const INITIAL_USER: UserSession = {
  id: "user-zainab",
  name: "Zainab Amanat",
  email: "zainab.amanat@university.edu",
  role: "STUDENT_LEAD",
  rollNo: "M245008",
  department: "Computer & Software Engineering",
};

export interface AppStoreState {
  vehicles: Vehicle[];
  activeVehicleId: string;
  isSimulating: boolean;
  simulationSpeedMs: number;
  trips: Trip[];
  maintenance: MaintenanceRecord[];
  alerts: AlertNotification[];
  auditLogs: CommandAuditEntry[];
  inspections: VisualInspectionReport[];
  user: UserSession | null;
  settings: {
    unitSystem: "METRIC" | "IMPERIAL";
    demoModeNoticeDismissed: boolean;
    soundFeedback: boolean;
    theme: "dark" | "light";
  };
}

const DEFAULT_STATE: AppStoreState = {
  vehicles: INITIAL_VEHICLES,
  activeVehicleId: "veh-hyperion-01",
  isSimulating: true,
  simulationSpeedMs: 2500,
  trips: INITIAL_TRIPS,
  maintenance: INITIAL_MAINTENANCE,
  alerts: INITIAL_ALERTS,
  auditLogs: INITIAL_AUDIT,
  inspections: [],
  user: INITIAL_USER,
  settings: {
    unitSystem: "METRIC",
    demoModeNoticeDismissed: false,
    soundFeedback: true,
    theme: "dark",
  },
};

// In-memory state with subscribers pattern for React 19 useSyncExternalStore
let currentState: AppStoreState = DEFAULT_STATE;
const listeners = new Set<() => void>();

function emitChange() {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(currentState));
    } catch {
      // Ignore quota errors
    }
  }
  for (const listener of listeners) {
    listener();
  }
}

// Load initial state from localStorage if available in browser
if (typeof window !== "undefined") {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (
        parsed &&
        Array.isArray(parsed.vehicles) &&
        parsed.vehicles.length > 0 &&
        parsed.vehicles[0].tires &&
        Array.isArray(parsed.vehicles[0].tires)
      ) {
        currentState = { ...DEFAULT_STATE, ...parsed };
      } else {
        localStorage.removeItem(STORAGE_KEY);
        currentState = DEFAULT_STATE;
      }
    }
  } catch {
    currentState = DEFAULT_STATE;
  }
}

export const simulationStore = {
  getState(): AppStoreState {
    return currentState;
  },

  subscribe(listener: () => void): () => void {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

  setActiveVehicle(vehicleId: string) {
    currentState = { ...currentState, activeVehicleId: vehicleId };
    emitChange();
  },

  toggleSimulation() {
    currentState = { ...currentState, isSimulating: !currentState.isSimulating };
    emitChange();
  },

  setUser(user: UserSession | null) {
    currentState = { ...currentState, user };
    emitChange();
  },

  updateSettings(settings: Partial<AppStoreState["settings"]>) {
    currentState = {
      ...currentState,
      settings: { ...currentState.settings, ...settings },
    };
    emitChange();
  },

  // Remote Control action execution with audit log
  executeCommand(commandName: string, notes = "") {
    const vehicle = currentState.vehicles.find((v) => v.id === currentState.activeVehicleId);
    if (!vehicle) return;

    const userLabel = currentState.user?.name || "Student Driver";
    const auditEntry: CommandAuditEntry = {
      id: `audit-${Date.now()}`,
      vehicleId: vehicle.id,
      commandName,
      issuedBy: userLabel,
      timestamp: new Date().toISOString(),
      status: "SIMULATED",
      latencyMs: Math.floor(Math.random() * 120 + 80),
      details: notes || `Command '${commandName}' processed via simulated vehicle controller.`,
    };

    const updatedVehicle = { ...vehicle, lastUpdated: new Date().toISOString() };

    if (commandName === "LOCK_VEHICLE") updatedVehicle.isLocked = true;
    if (commandName === "UNLOCK_VEHICLE") updatedVehicle.isLocked = false;
    if (commandName === "TOGGLE_VALET") updatedVehicle.valetActive = !vehicle.valetActive;
    if (commandName === "TOGGLE_ECO") updatedVehicle.ecoMode = !vehicle.ecoMode;

    currentState = {
      ...currentState,
      vehicles: currentState.vehicles.map((v) => (v.id === vehicle.id ? updatedVehicle : v)),
      auditLogs: [auditEntry, ...currentState.auditLogs.slice(0, 49)],
    };
    emitChange();
  },

  setClimateTemp(newTempC: number) {
    const vehicle = currentState.vehicles.find((v) => v.id === currentState.activeVehicleId);
    if (!vehicle) return;

    const updated = {
      ...vehicle,
      climateTempC: newTempC,
      lastUpdated: new Date().toISOString(),
    };

    currentState = {
      ...currentState,
      vehicles: currentState.vehicles.map((v) => (v.id === vehicle.id ? updated : v)),
    };
    emitChange();
  },

  setDriveProfile(profile: "SPORT" | "TRACK" | "ENDURANCE" | "ECO") {
    const vehicle = currentState.vehicles.find((v) => v.id === currentState.activeVehicleId);
    if (!vehicle) return;

    let split = 42;
    if (profile === "TRACK") split = 25;
    if (profile === "ENDURANCE") split = 50;
    if (profile === "ECO") split = 60;

    const updated: Vehicle = {
      ...vehicle,
      driveMode: profile,
      torqueSplitFrontPct: split,
      lastUpdated: new Date().toISOString(),
    };

    currentState = {
      ...currentState,
      vehicles: currentState.vehicles.map((v) => (v.id === vehicle.id ? updated : v)),
    };
    emitChange();
  },

  // Fault Injection Scenarios for Viva & Academic Demonstrations
  injectScenario(scenario: "TPMS_PUNCTURE_RR" | "BATTERY_THERMAL_ALERT" | "BRAKE_PAD_WEAR") {
    const vehicle = currentState.vehicles.find((v) => v.id === currentState.activeVehicleId);
    if (!vehicle) return;

    const newFaults: DiagnosticCode[] = [...vehicle.activeFaults];
    let newTires = [...vehicle.tires];
    const newAlerts = [...currentState.alerts];
    let packTemp = vehicle.packTempC;

    if (scenario === "TPMS_PUNCTURE_RR") {
      newTires = newTires.map((t) =>
        t.id === "RR" ? { ...t, psi: 22.4, status: "critical" as const } : t
      );
      const fault: DiagnosticCode = {
        code: "C0077-62",
        standard: "OBD-II",
        system: "TPMS / CHASSIS",
        description: "Severe Pressure Loss Detected in Rear Right Tyre (22.4 PSI).",
        severity: "CRITICAL",
        recommendedAction: "Inspect tyre for nail/puncture immediately. Limit speed to 40 km/h.",
        timestamp: new Date().toISOString(),
        simulated: true,
      };
      if (!newFaults.some((f) => f.code === fault.code)) newFaults.unshift(fault);

      const alert: AlertNotification = {
        id: `alert-fault-${Date.now()}`,
        vehicleId: vehicle.id,
        title: "CRITICAL: Rapid Tyre Deflation [RR]",
        message: "Rear right tyre pressure dropped to 22.4 PSI. Immediate inspection required.",
        severity: "CRITICAL",
        source: "TPMS",
        timestamp: new Date().toISOString(),
        read: false,
        simulated: true,
      };
      newAlerts.unshift(alert);
    } else if (scenario === "BATTERY_THERMAL_ALERT") {
      packTemp = 48.6;
      const fault: DiagnosticCode = {
        code: "P0A7F-00",
        standard: "OBD-II",
        system: "ENERGY / POWERTRAIN",
        description: "High-Voltage Pack Temperature Threshold Exceeded (48.6°C).",
        severity: "WARNING",
        recommendedAction: "Activate thermal pre-conditioning loop. Power draw throttled 20%.",
        timestamp: new Date().toISOString(),
        simulated: true,
      };
      if (!newFaults.some((f) => f.code === fault.code)) newFaults.unshift(fault);

      const alert: AlertNotification = {
        id: `alert-fault-${Date.now()}`,
        vehicleId: vehicle.id,
        title: "WARNING: High-Voltage Thermal Elevation",
        message: "Pack temperature reached 48.6°C. Throttling peak acceleration to protect cells.",
        severity: "WARNING",
        source: "BATTERY",
        timestamp: new Date().toISOString(),
        read: false,
        simulated: true,
      };
      newAlerts.unshift(alert);
    } else if (scenario === "BRAKE_PAD_WEAR") {
      const fault: DiagnosticCode = {
        code: "C1120-14",
        standard: "ISO-14229",
        system: "BRAKING / ABS",
        description: "Front Axle Carbon Friction Material Approaching Minimum Thickness Limit.",
        severity: "WARNING",
        recommendedAction: "Schedule workshop replacement within 1,200 km.",
        timestamp: new Date().toISOString(),
        simulated: true,
      };
      if (!newFaults.some((f) => f.code === fault.code)) newFaults.unshift(fault);

      const alert: AlertNotification = {
        id: `alert-fault-${Date.now()}`,
        vehicleId: vehicle.id,
        title: "Service Advisory: Brake Pad Friction Wear",
        message: "Front brake wear indicator tripped. Schedule maintenance service.",
        severity: "WARNING",
        source: "OBD_II",
        timestamp: new Date().toISOString(),
        read: false,
        simulated: true,
      };
      newAlerts.unshift(alert);
    }

    const updated: Vehicle = {
      ...vehicle,
      tires: newTires,
      activeFaults: newFaults,
      packTempC: packTemp,
      lastUpdated: new Date().toISOString(),
    };

    currentState = {
      ...currentState,
      vehicles: currentState.vehicles.map((v) => (v.id === vehicle.id ? updated : v)),
      alerts: newAlerts,
    };
    emitChange();
  },

  clearAllFaults() {
    const vehicle = currentState.vehicles.find((v) => v.id === currentState.activeVehicleId);
    if (!vehicle) return;

    const restoredTires = vehicle.tires.map((t) => ({
      ...t,
      psi: t.targetPsi,
      status: "optimal" as const,
    }));

    const updated: Vehicle = {
      ...vehicle,
      tires: restoredTires,
      activeFaults: [],
      packTempC: 33.8,
      lastUpdated: new Date().toISOString(),
    };

    const auditEntry: CommandAuditEntry = {
      id: `audit-${Date.now()}`,
      vehicleId: vehicle.id,
      commandName: "DIAGNOSTIC_RESET",
      issuedBy: currentState.user?.name || "Student Driver",
      timestamp: new Date().toISOString(),
      status: "SIMULATED",
      latencyMs: 95,
      details: "Cleared all DTC fault codes & re-balanced tire pressure matrix.",
    };

    currentState = {
      ...currentState,
      vehicles: currentState.vehicles.map((v) => (v.id === vehicle.id ? updated : v)),
      auditLogs: [auditEntry, ...currentState.auditLogs.slice(0, 49)],
    };
    emitChange();
  },

  markAlertRead(alertId: string) {
    currentState = {
      ...currentState,
      alerts: currentState.alerts.map((a) => (a.id === alertId ? { ...a, read: true } : a)),
    };
    emitChange();
  },

  markAllAlertsRead() {
    currentState = {
      ...currentState,
      alerts: currentState.alerts.map((a) => ({ ...a, read: true })),
    };
    emitChange();
  },

  completeMaintenance(recordId: string) {
    currentState = {
      ...currentState,
      maintenance: currentState.maintenance.map((m) =>
        m.id === recordId
          ? {
              ...m,
              status: "COMPLETED",
              lastCompletedDate: new Date().toISOString().slice(0, 10),
            }
          : m
      ),
    };
    emitChange();
  },

  addInspection(report: VisualInspectionReport) {
    currentState = {
      ...currentState,
      inspections: [report, ...currentState.inspections],
    };
    emitChange();
  },
};

// React hook for convenient reactive access
export function useSimulationStore() {
  const store = useSyncExternalStore(
    simulationStore.subscribe,
    simulationStore.getState,
    () => DEFAULT_STATE
  );

  const foundVehicle =
    (store.vehicles && store.vehicles.find((v) => v.id === store.activeVehicleId)) ||
    (store.vehicles && store.vehicles[0]) ||
    DEFAULT_STATE.vehicles[0];

  // Defensive normalization to prevent any crash from missing properties
  const activeVehicle: Vehicle = {
    ...DEFAULT_STATE.vehicles[0],
    ...foundVehicle,
    tires:
      foundVehicle.tires && foundVehicle.tires.length > 0
        ? foundVehicle.tires
        : DEFAULT_STATE.vehicles[0].tires,
    activeFaults: foundVehicle.activeFaults || [],
  };

  const unreadAlertsCount = (store.alerts || []).filter((a) => !a.read).length;

  return {
    ...store,
    activeVehicle,
    unreadAlertsCount,
    setActiveVehicle: simulationStore.setActiveVehicle,
    toggleSimulation: simulationStore.toggleSimulation,
    executeCommand: simulationStore.executeCommand,
    setClimateTemp: simulationStore.setClimateTemp,
    setDriveProfile: simulationStore.setDriveProfile,
    injectScenario: simulationStore.injectScenario,
    clearAllFaults: simulationStore.clearAllFaults,
    markAlertRead: simulationStore.markAlertRead,
    markAllAlertsRead: simulationStore.markAllAlertsRead,
    completeMaintenance: simulationStore.completeMaintenance,
    addInspection: simulationStore.addInspection,
    setUser: simulationStore.setUser,
    updateSettings: simulationStore.updateSettings,
  };
}
