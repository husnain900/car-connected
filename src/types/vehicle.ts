export type VehicleStatus = "SIMULATION" | "CONNECTED" | "OFFLINE";
export type AlertSeverity = "CRITICAL" | "WARNING" | "INFO";
export type DiagnosticSeverity = "CRITICAL" | "WARNING" | "INFO";

export interface TyreReading {
  id: "FL" | "FR" | "RL" | "RR";
  name: string;
  psi: number;
  targetPsi: number;
  tempC: number;
  wearPct: number;
  status: "optimal" | "warning" | "critical";
}

export interface DiagnosticCode {
  code: string;
  standard: "OBD-II" | "ISO-14229" | "SAE-J1939";
  system: string;
  description: string;
  severity: DiagnosticSeverity;
  recommendedAction: string;
  timestamp: string;
  simulated: boolean;
}

export interface Vehicle {
  id: string;
  vin: string;
  name: string;
  model: string;
  year: number;
  licensePlate: string;
  type: "ELECTRIC_HYPERCAR" | "ELECTRIC_SUV" | "PLUG_IN_HYBRID";
  status: VehicleStatus;
  dataSourceLabel: string; // e.g. "DETERMINISTIC SIMULATOR v4.2" or "OBD-II HARDWARE BRIDGE"
  batteryLevelPct: number;
  batteryHealthPct: number;
  cellVoltage: number;
  packTempC: number;
  estRangeKm: number;
  odometerKm: number;
  isLocked: boolean;
  valetActive: boolean;
  valetSpeedLimitKmH: number;
  climateTempC: number;
  ecoMode: boolean;
  currentSpeedKmH: number;
  driveMode: "SPORT" | "TRACK" | "ENDURANCE" | "ECO";
  torqueSplitFrontPct: number;
  tires: TyreReading[];
  activeFaults: DiagnosticCode[];
  lastUpdated: string;
}

export interface TripPoint {
  lat: number;
  lng: number;
  timestamp: string;
  speedKmH: number;
}

export interface Trip {
  id: string;
  vehicleId: string;
  title: string;
  startTime: string;
  endTime: string;
  originName: string;
  destName: string;
  distanceKm: number;
  durationMins: number;
  avgSpeedKmH: number;
  energyKwh: number;
  simulated: boolean;
  points: TripPoint[];
}

export interface MaintenanceRecord {
  id: string;
  vehicleId: string;
  title: string;
  category: "BRAKES" | "TYRES" | "BATTERY" | "HV_COOLANT" | "CABIN_AIR" | "CHASSIS";
  intervalKm: number;
  dueKm: number;
  dueDate: string;
  status: "OK" | "DUE_SOON" | "OVERDUE" | "COMPLETED";
  lastCompletedDate?: string;
  estimatedCostUsd: number;
}

export interface AlertNotification {
  id: string;
  vehicleId: string;
  title: string;
  message: string;
  severity: AlertSeverity;
  source: "TPMS" | "SECURITY" | "OBD_II" | "BATTERY" | "SYSTEM";
  timestamp: string;
  read: boolean;
  simulated: boolean;
}

export interface CommandAuditEntry {
  id: string;
  vehicleId: string;
  commandName: string;
  issuedBy: string;
  timestamp: string;
  status: "EXECUTED" | "CONFIRMED" | "SIMULATED";
  latencyMs: number;
  details: string;
}

export interface VisualInspectionFinding {
  id: string;
  area: string;
  defectType: "SCRATCH" | "DENT" | "TYRE_TREAD_WEAR" | "PANEL_GAP" | "CLEAN";
  severity: "LOW" | "MEDIUM" | "HIGH" | "NONE";
  confidencePct: number;
  notes: string;
}

export interface VisualInspectionReport {
  id: string;
  vehicleId: string;
  timestamp: string;
  imageUrl: string;
  capturedSource: "CAMERA_LIVE" | "FILE_UPLOAD" | "PRESET_SAMPLE";
  findings: VisualInspectionFinding[];
  scorePct: number;
  disclaimer: string;
}

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: "STUDENT_LEAD" | "FLEET_MANAGER" | "EVALUATOR";
  rollNo?: string;
  department?: string;
}

