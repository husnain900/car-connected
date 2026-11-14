"use client";

import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Image from "next/image";
import {
  RotateCcw,
  Layers,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  X,
  Thermometer,
  Move,
  Compass,
} from "lucide-react";
import { Vehicle } from "@/types/vehicle";

interface Vehicle3DViewerProps {
  vehicle: Vehicle;
  onHotspotClick?: (hotspotId: string) => void;
  className?: string;
}

interface Hotspot3D {
  id: string;
  label: string;
  position: THREE.Vector3;
  subsystem: string;
  status: "nominal" | "warning" | "critical";
  reading: string;
  screenPos: { x: number; y: number; visible: boolean };
}

const CAR_COLORS = [
  { name: "Celestial Azure", hex: "#79C7FF", roughness: 0.16, metalness: 0.85 },
  { name: "Midnight Obsidian", hex: "#0D1520", roughness: 0.12, metalness: 0.95 },
  { name: "Liquid Silver", hex: "#C8D1DC", roughness: 0.1, metalness: 0.95 },
  { name: "Deep Navy Metallic", hex: "#162C47", roughness: 0.18, metalness: 0.88 },
  { name: "Stealth Slate", hex: "#293C51", roughness: 0.3, metalness: 0.65 },
];

/**
 * Generates a soft radial gradient shadow texture for realistic ambient contact
 * ground shadows that float seamlessly over transparent WebGL backgrounds.
 */
function createRadialShadowTexture(): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const grad = ctx.createRadialGradient(256, 256, 30, 256, 256, 250);
  grad.addColorStop(0, "rgba(2, 6, 12, 0.75)");
  grad.addColorStop(0.35, "rgba(2, 6, 12, 0.45)");
  grad.addColorStop(0.7, "rgba(2, 6, 12, 0.12)");
  grad.addColorStop(1, "rgba(2, 6, 12, 0)");

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export default function Vehicle3DViewer({
  vehicle,
  className = "",
}: Vehicle3DViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [mode, setMode] = useState<"3d" | "2d">("3d");
  const [dragMode, setDragMode] = useState<"orbit" | "pan">("orbit");
  const [selectedColor, setSelectedColor] = useState(CAR_COLORS[0]);
  const [activePreset, setActivePreset] = useState<string>("3/4 Showroom");
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot3D | null>(null);
  const [hotspotPositions, setHotspotPositions] = useState<Hotspot3D[]>([]);
  const [webGLSupported, setWebGLSupported] = useState<boolean>(true);

  // Three.js instances refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const carBodyMeshRef = useRef<THREE.Mesh[]>([]);
  const animationFrameId = useRef<number | null>(null);

  const tyreFL = useMemo(() => vehicle.tires[0] || { psi: 35.0, tempC: 26, status: "optimal" }, [vehicle.tires]);
  const tyreFR = useMemo(() => vehicle.tires[1] || { psi: 35.0, tempC: 26, status: "optimal" }, [vehicle.tires]);
  const tyreRL = useMemo(() => vehicle.tires[2] || { psi: 35.0, tempC: 26, status: "optimal" }, [vehicle.tires]);
  const tyreRR = useMemo(() => vehicle.tires[3] || { psi: 35.0, tempC: 26, status: "optimal" }, [vehicle.tires]);

  // Status mapping based on vehicle state
  const isRrTyreCrit = tyreRR.status === "critical" || tyreRR.psi < 28;
  const isBatteryWarn = vehicle.packTempC > 45;

  // Define 3D Hotspot world anchor positions
  const rawHotspotsRef = useRef<Omit<Hotspot3D, "screenPos">[]>([
    {
      id: "fl_tyre",
      label: "Front Left Wheel",
      position: new THREE.Vector3(-1.08, 0.42, 1.35),
      subsystem: "TPMS Telemetry",
      status: tyreFL.status === "critical" ? "critical" : tyreFL.status === "warning" ? "warning" : "nominal",
      reading: `${tyreFL.psi.toFixed(1)} PSI • ${tyreFL.tempC}°C`,
    },
    {
      id: "fr_tyre",
      label: "Front Right Wheel",
      position: new THREE.Vector3(1.08, 0.42, 1.35),
      subsystem: "TPMS Telemetry",
      status: tyreFR.status === "critical" ? "critical" : tyreFR.status === "warning" ? "warning" : "nominal",
      reading: `${tyreFR.psi.toFixed(1)} PSI • ${tyreFR.tempC}°C`,
    },
    {
      id: "rl_tyre",
      label: "Rear Left Wheel",
      position: new THREE.Vector3(-1.1, 0.42, -1.35),
      subsystem: "TPMS Telemetry",
      status: tyreRL.status === "critical" ? "critical" : tyreRL.status === "warning" ? "warning" : "nominal",
      reading: `${tyreRL.psi.toFixed(1)} PSI • ${tyreRL.tempC}°C`,
    },
    {
      id: "rr_tyre",
      label: "Rear Right Wheel",
      position: new THREE.Vector3(1.1, 0.42, -1.35),
      subsystem: "TPMS Telemetry",
      status: isRrTyreCrit ? "critical" : "nominal",
      reading: `${tyreRR.psi.toFixed(1)} PSI • ${tyreRR.tempC}°C`,
    },
    {
      id: "battery_pack",
      label: "800V HV Battery Pack",
      position: new THREE.Vector3(0, 0.3, 0),
      subsystem: "Energy Storage",
      status: isBatteryWarn ? "warning" : "nominal",
      reading: `${vehicle.batteryLevelPct}% SoC • ${vehicle.packTempC}°C • ${vehicle.batteryHealthPct}% SOH`,
    },
    {
      id: "security_locks",
      label: "Smart Solenoid Locks",
      position: new THREE.Vector3(-0.95, 0.78, 0.1),
      subsystem: "Body Security",
      status: "nominal",
      reading: vehicle.isLocked ? "ARMED // LOCKED" : "UNLOCKED // OPEN",
    },
  ]);

  // Update hotspot telemetry when vehicle changes
  useEffect(() => {
    rawHotspotsRef.current = [
      {
        id: "fl_tyre",
        label: "Front Left Wheel",
        position: new THREE.Vector3(-1.08, 0.42, 1.35),
        subsystem: "TPMS Telemetry",
        status: tyreFL.status === "critical" ? "critical" : tyreFL.status === "warning" ? "warning" : "nominal",
        reading: `${tyreFL.psi.toFixed(1)} PSI • ${tyreFL.tempC}°C`,
      },
      {
        id: "fr_tyre",
        label: "Front Right Wheel",
        position: new THREE.Vector3(1.08, 0.42, 1.35),
        subsystem: "TPMS Telemetry",
        status: tyreFR.status === "critical" ? "critical" : tyreFR.status === "warning" ? "warning" : "nominal",
        reading: `${tyreFR.psi.toFixed(1)} PSI • ${tyreFR.tempC}°C`,
      },
      {
        id: "rl_tyre",
        label: "Rear Left Wheel",
        position: new THREE.Vector3(-1.1, 0.42, -1.35),
        subsystem: "TPMS Telemetry",
        status: tyreRL.status === "critical" ? "critical" : tyreRL.status === "warning" ? "warning" : "nominal",
        reading: `${tyreRL.psi.toFixed(1)} PSI • ${tyreRL.tempC}°C`,
      },
      {
        id: "rr_tyre",
        label: "Rear Right Wheel",
        position: new THREE.Vector3(1.1, 0.42, -1.35),
        subsystem: "TPMS Telemetry",
        status: isRrTyreCrit ? "critical" : "nominal",
        reading: `${tyreRR.psi.toFixed(1)} PSI • ${tyreRR.tempC}°C`,
      },
      {
        id: "battery_pack",
        label: "800V HV Battery Pack",
        position: new THREE.Vector3(0, 0.3, 0),
        subsystem: "Energy Storage",
        status: isBatteryWarn ? "warning" : "nominal",
        reading: `${vehicle.batteryLevelPct}% SoC • ${vehicle.packTempC}°C • ${vehicle.batteryHealthPct}% SOH`,
      },
      {
        id: "security_locks",
        label: "Smart Solenoid Locks",
        position: new THREE.Vector3(-0.95, 0.78, 0.1),
        subsystem: "Body Security",
        status: "nominal",
        reading: vehicle.isLocked ? "ARMED // LOCKED" : "UNLOCKED // OPEN",
      },
    ];
  }, [vehicle, isRrTyreCrit, isBatteryWarn, tyreFL, tyreFR, tyreRL, tyreRR]);

  // Color change update
  useEffect(() => {
    if (carBodyMeshRef.current.length > 0) {
      carBodyMeshRef.current.forEach((mesh) => {
        if (mesh.material instanceof THREE.MeshPhysicalMaterial) {
          mesh.material.color.set(selectedColor.hex);
          mesh.material.roughness = selectedColor.roughness;
          mesh.material.metalness = selectedColor.metalness;
        }
      });
    }
  }, [selectedColor]);

  // Drag / Pan / Orbit Mode Toggle handler
  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) return;

    if (dragMode === "pan") {
      controls.mouseButtons = {
        LEFT: THREE.MOUSE.PAN,
        MIDDLE: THREE.MOUSE.DOLLY,
        RIGHT: THREE.MOUSE.ROTATE,
      };
      controls.touches = {
        ONE: THREE.TOUCH.PAN,
        TWO: THREE.TOUCH.DOLLY_PAN,
      };
    } else {
      controls.mouseButtons = {
        LEFT: THREE.MOUSE.ROTATE,
        MIDDLE: THREE.MOUSE.DOLLY,
        RIGHT: THREE.MOUSE.PAN,
      };
      controls.touches = {
        ONE: THREE.TOUCH.ROTATE,
        TWO: THREE.TOUCH.DOLLY_PAN,
      };
    }
    controls.update();
  }, [dragMode]);

  // Camera presets
  const applyCameraPreset = useCallback((presetName: string) => {
    setActivePreset(presetName);
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    if (!camera || !controls) return;

    controls.autoRotate = false;
    setIsRotating(false);

    const container = containerRef.current;
    const isMobile = container ? container.clientWidth < 640 : false;

    switch (presetName) {
      case "Front":
        camera.position.set(0, 1.2, isMobile ? 5.6 : 4.8);
        controls.target.set(0, 0.45, 0);
        break;
      case "Rear":
        camera.position.set(0, 1.2, isMobile ? -5.6 : -4.8);
        controls.target.set(0, 0.45, 0);
        break;
      case "Side (Left)":
        camera.position.set(isMobile ? -6.2 : -4.8, 1.1, 0);
        controls.target.set(0, 0.45, 0);
        break;
      case "Side (Right)":
        camera.position.set(isMobile ? 6.2 : 4.8, 1.1, 0);
        controls.target.set(0, 0.45, 0);
        break;
      case "Top View":
        camera.position.set(0, isMobile ? 7.2 : 5.8, 0.01);
        controls.target.set(0, 0, 0);
        break;
      case "3/4 Showroom":
      default:
        if (isMobile) {
          camera.position.set(4.8, 2.2, 4.8);
        } else {
          camera.position.set(3.8, 1.8, 3.8);
        }
        controls.target.set(0, 0.45, 0);
        break;
    }
    controls.update();
  }, []);

  // Initialize WebGL Scene
  useEffect(() => {
    if (mode !== "3d") return;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Check WebGL availability
    try {
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) {
        requestAnimationFrame(() => {
          setWebGLSupported(false);
          setMode("2d");
        });
        return;
      }
    } catch {
      requestAnimationFrame(() => {
        setWebGLSupported(false);
        setMode("2d");
      });
      return;
    }

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;
    const isMobile = width < 640;

    // 1. Transparent Scene (No solid background or fog to ensure 100% clean transparency)
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera with adaptive mobile FOV and distance
    const fov = isMobile ? 45 : 42;
    const camera = new THREE.PerspectiveCamera(fov, width / height, 0.1, 100);
    if (isMobile) {
      camera.position.set(4.8, 2.2, 4.8);
    } else {
      camera.position.set(3.8, 1.8, 3.8);
    }
    cameraRef.current = camera;

    // 3. Renderer with full Alpha Transparency
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // 100% Transparent
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    // 4. OrbitControls with Full Drag & Pan Support
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = isMobile ? 2.8 : 2.0;
    controls.maxDistance = 10.0;
    controls.maxPolarAngle = Math.PI / 2 - 0.02; // Prevent camera from going under floor
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.8;
    controls.enableZoom = true;
    controls.enableRotate = true;
    controls.enablePan = true;
    controls.screenSpacePanning = true;
    controls.panSpeed = 0.85;

    // Mouse and Touch configuration
    controls.mouseButtons = {
      LEFT: THREE.MOUSE.ROTATE,
      MIDDLE: THREE.MOUSE.DOLLY,
      RIGHT: THREE.MOUSE.PAN,
    };
    controls.touches = {
      ONE: THREE.TOUCH.ROTATE,
      TWO: THREE.TOUCH.DOLLY_PAN,
    };
    controls.target.set(0, 0.45, 0);
    controlsRef.current = controls;

    // 5. Studio Lighting Setup for High-Fidelity Metallic Reflections
    const ambientLight = new THREE.AmbientLight("#B8D0EB", 0.85);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight("#FFFFFF", 2.4);
    keyLight.position.set(5, 7, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight("#79C7FF", 1.8);
    rimLight.position.set(-6, 4, -5);
    scene.add(rimLight);

    const frontFillLight = new THREE.DirectionalLight("#35C99A", 0.5);
    frontFillLight.position.set(0, 2, 6);
    scene.add(frontFillLight);

    const topSoftLight = new THREE.PointLight("#E2E8F0", 1.2, 12);
    topSoftLight.position.set(0, 5, 0);
    scene.add(topSoftLight);

    // 6. Subtle Floor Grid (Transparent holographic guide lines)
    const gridHelper = new THREE.GridHelper(16, 24, 0x79c7ff, 0x1e314b);
    gridHelper.position.y = 0;
    if (gridHelper.material instanceof THREE.Material) {
      gridHelper.material.transparent = true;
      gridHelper.material.opacity = 0.45;
    }
    scene.add(gridHelper);

    // 7. Soft Radial Ground Shadow (Natural ambient contact shadow without dark rectangular borders)
    const shadowGeo = new THREE.PlaneGeometry(5.6, 3.6);
    const shadowTex = createRadialShadowTexture();
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex || undefined,
      transparent: true,
      opacity: 0.82,
      depthWrite: false,
    });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = 0.01;
    scene.add(shadowPlane);

    // 8. Build High-Fidelity Procedural Nebula Hyperion GT 3D Model
    const carGroup = new THREE.Group();
    carBodyMeshRef.current = [];

    // Realistic Multi-Coat Automotive Metallic Paint Material
    const bodyMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(selectedColor.hex),
      metalness: selectedColor.metalness,
      roughness: selectedColor.roughness,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      reflectivity: 0.9,
    });

    // Carbon Fiber / Matte Aerodynamic Trim Material
    const carbonMaterial = new THREE.MeshStandardMaterial({
      color: 0x11161d,
      roughness: 0.4,
      metalness: 0.65,
    });

    // High-Gloss Translucent Automotive Cockpit Glass
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x0c1929,
      metalness: 0.2,
      roughness: 0.05,
      transmission: 0.72,
      transparent: true,
      opacity: 0.85,
      ior: 1.5,
    });

    // Polished Chrome Metallic Wheel Alloy Material
    const rimChromeMaterial = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.95,
      roughness: 0.12,
    });

    // Ventilated Steel Brake Rotor Material
    const brakeDiscMaterial = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      metalness: 0.88,
      roughness: 0.28,
    });

    // Azure Blue Performance Brake Caliper Material
    const caliperMaterial = new THREE.MeshStandardMaterial({
      color: 0x79c7ff,
      metalness: 0.4,
      roughness: 0.2,
    });

    // Rear Taillight Emissive Material
    const taillightMat = new THREE.MeshStandardMaterial({
      color: 0xff1e38,
      emissive: new THREE.Color("#f16d78"),
      emissiveIntensity: 3.2,
      roughness: 0.15,
    });

    // Front Headlight Projector Emissive Material
    const headlightMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: new THREE.Color("#79c7ff"),
      emissiveIntensity: 2.8,
      roughness: 0.1,
    });

    // Mirror Glass Material
    const mirrorGlassMat = new THREE.MeshStandardMaterial({
      color: 0xdbeafe,
      metalness: 0.98,
      roughness: 0.04,
    });

    // Cockpit Interior Material
    const interiorMaterial = new THREE.MeshStandardMaterial({
      color: 0x090f19,
      roughness: 0.85,
    });

    // A. Lower Chassis Undertray & Flat Battery Floor
    const chassisGeo = new THREE.BoxGeometry(1.76, 0.18, 3.85);
    const chassisMesh = new THREE.Mesh(chassisGeo, carbonMaterial);
    chassisMesh.position.set(0, 0.26, 0);
    chassisMesh.castShadow = true;
    chassisMesh.receiveShadow = true;
    carGroup.add(chassisMesh);

    // B. Aerodynamic Carbon Front Splitter with Lateral Winglets
    const splitterGeo = new THREE.BoxGeometry(1.88, 0.04, 0.45);
    const splitterMesh = new THREE.Mesh(splitterGeo, carbonMaterial);
    splitterMesh.position.set(0, 0.17, 2.05);
    splitterMesh.castShadow = true;
    carGroup.add(splitterMesh);

    // Splitter Left & Right Winglets
    const wingletGeo = new THREE.BoxGeometry(0.04, 0.12, 0.25);
    const wingletL = new THREE.Mesh(wingletGeo, carbonMaterial);
    wingletL.position.set(-0.94, 0.22, 2.05);
    carGroup.add(wingletL);
    const wingletR = wingletL.clone();
    wingletR.position.x = 0.94;
    carGroup.add(wingletR);

    // C. Sculpted Aerodynamic Central Monocoque Fuselage
    const bodyMainGeo = new THREE.BoxGeometry(1.72, 0.38, 3.65);
    const bodyMainMesh = new THREE.Mesh(bodyMainGeo, bodyMaterial);
    bodyMainMesh.position.set(0, 0.52, 0);
    bodyMainMesh.castShadow = true;
    carGroup.add(bodyMainMesh);
    carBodyMeshRef.current.push(bodyMainMesh);

    // D. Front Sloped Hood Taper (Curved Aerodynamic Nose)
    const hoodTaperGeo = new THREE.CylinderGeometry(0.78, 0.86, 0.72, 20);
    const hoodTaperMesh = new THREE.Mesh(hoodTaperGeo, bodyMaterial);
    hoodTaperMesh.rotation.x = Math.PI / 2;
    hoodTaperMesh.position.set(0, 0.49, 1.82);
    hoodTaperMesh.castShadow = true;
    carGroup.add(hoodTaperMesh);
    carBodyMeshRef.current.push(hoodTaperMesh);

    // E. Dual Hood Air Extractor Vents
    const hoodVentGeo = new THREE.BoxGeometry(0.22, 0.04, 0.42);
    const hoodVentL = new THREE.Mesh(hoodVentGeo, carbonMaterial);
    hoodVentL.position.set(-0.36, 0.64, 1.35);
    hoodVentL.rotation.x = 0.1;
    carGroup.add(hoodVentL);
    const hoodVentR = hoodVentL.clone();
    hoodVentR.position.x = 0.36;
    carGroup.add(hoodVentR);

    // F. Wide Muscular Rear Haunches (Aggressive Supercar Stance)
    const rearHaunchGeo = new THREE.BoxGeometry(0.26, 0.44, 1.15);
    const rearHaunchL = new THREE.Mesh(rearHaunchGeo, bodyMaterial);
    rearHaunchL.position.set(-0.92, 0.54, -1.25);
    rearHaunchL.castShadow = true;
    carGroup.add(rearHaunchL);
    carBodyMeshRef.current.push(rearHaunchL);

    const rearHaunchR = rearHaunchL.clone();
    rearHaunchR.position.x = 0.92;
    carGroup.add(rearHaunchR);
    carBodyMeshRef.current.push(rearHaunchR);

    // G. Side Air Intake Channels (Cooling ducts for rear electric motors)
    const sideScoopGeo = new THREE.BoxGeometry(0.12, 0.28, 0.7);
    const sideScoopL = new THREE.Mesh(sideScoopGeo, carbonMaterial);
    sideScoopL.position.set(-0.87, 0.46, -0.35);
    carGroup.add(sideScoopL);
    const sideScoopR = sideScoopL.clone();
    sideScoopR.position.x = 0.87;
    carGroup.add(sideScoopR);

    // H. Aerodynamic Cockpit Glass Greenhouse
    const windshieldGeo = new THREE.BoxGeometry(1.36, 0.08, 0.95);
    const windshield = new THREE.Mesh(windshieldGeo, glassMaterial);
    windshield.position.set(0, 0.84, 0.62);
    windshield.rotation.x = -0.48; // Slanted rake angle
    windshield.castShadow = true;
    carGroup.add(windshield);

    const sideGlassGeo = new THREE.BoxGeometry(1.34, 0.34, 1.15);
    const sideGlass = new THREE.Mesh(sideGlassGeo, glassMaterial);
    sideGlass.position.set(0, 0.84, -0.15);
    carGroup.add(sideGlass);

    const rearGlassGeo = new THREE.BoxGeometry(1.24, 0.08, 1.05);
    const rearGlass = new THREE.Mesh(rearGlassGeo, glassMaterial);
    rearGlass.position.set(0, 0.83, -0.95);
    rearGlass.rotation.x = 0.42; // Slanted fastback rake
    carGroup.add(rearGlass);

    // I. Lightweight Roof Panel
    const roofPanelGeo = new THREE.BoxGeometry(1.24, 0.06, 1.25);
    const roofPanelMesh = new THREE.Mesh(roofPanelGeo, bodyMaterial);
    roofPanelMesh.position.set(0, 1.03, -0.2);
    roofPanelMesh.castShadow = true;
    carGroup.add(roofPanelMesh);
    carBodyMeshRef.current.push(roofPanelMesh);

    // J. Cockpit Interior Details (Visible through tinted canopy)
    const dashboardGeo = new THREE.BoxGeometry(1.2, 0.16, 0.35);
    const dashboard = new THREE.Mesh(dashboardGeo, interiorMaterial);
    dashboard.position.set(0, 0.72, 0.65);
    carGroup.add(dashboard);

    // Digital Instrument HUD
    const hudDisplayGeo = new THREE.BoxGeometry(0.38, 0.08, 0.02);
    const hudDisplayMat = new THREE.MeshBasicMaterial({ color: 0x79c7ff });
    const hudDisplay = new THREE.Mesh(hudDisplayGeo, hudDisplayMat);
    hudDisplay.position.set(-0.32, 0.82, 0.62);
    carGroup.add(hudDisplay);

    // Twin Sport Racing Seats with Headrests
    const seatGeo = new THREE.BoxGeometry(0.38, 0.5, 0.45);
    const seatL = new THREE.Mesh(seatGeo, interiorMaterial);
    seatL.position.set(-0.35, 0.68, -0.1);
    carGroup.add(seatL);
    const seatR = seatL.clone();
    seatR.position.x = 0.35;
    carGroup.add(seatR);

    // Headrests
    const headrestGeo = new THREE.BoxGeometry(0.24, 0.18, 0.18);
    const headrestL = new THREE.Mesh(headrestGeo, interiorMaterial);
    headrestL.position.set(-0.35, 0.95, -0.15);
    carGroup.add(headrestL);
    const headrestR = headrestL.clone();
    headrestR.position.x = 0.35;
    carGroup.add(headrestR);

    // K. Aerodynamic Side Mirrors (Left & Right)
    const mirrorStemGeo = new THREE.BoxGeometry(0.12, 0.04, 0.05);
    const mirrorHousingGeo = new THREE.BoxGeometry(0.22, 0.1, 0.14);
    const mirrorGlassGeo = new THREE.BoxGeometry(0.02, 0.08, 0.12);

    const createMirror = (isLeft: boolean) => {
      const mGroup = new THREE.Group();
      const xSign = isLeft ? -1 : 1;

      const stem = new THREE.Mesh(mirrorStemGeo, carbonMaterial);
      stem.position.set(xSign * 0.06, 0, 0);
      mGroup.add(stem);

      const housing = new THREE.Mesh(mirrorHousingGeo, bodyMaterial);
      housing.position.set(xSign * 0.18, 0.02, 0);
      mGroup.add(housing);
      carBodyMeshRef.current.push(housing);

      const glass = new THREE.Mesh(mirrorGlassGeo, mirrorGlassMat);
      glass.position.set(xSign * 0.18, 0.02, -0.06);
      mGroup.add(glass);

      mGroup.position.set(xSign * 0.88, 0.82, 0.52);
      return mGroup;
    };

    carGroup.add(createMirror(true));
    carGroup.add(createMirror(false));

    // L. Rear Aerodynamic Diffuser with 4 Vertical Air Vanes
    const diffuserBaseGeo = new THREE.BoxGeometry(1.78, 0.12, 0.45);
    const diffuserBase = new THREE.Mesh(diffuserBaseGeo, carbonMaterial);
    diffuserBase.position.set(0, 0.22, -1.95);
    carGroup.add(diffuserBase);

    for (let i = -2; i <= 2; i++) {
      if (i === 0) continue;
      const vaneGeo = new THREE.BoxGeometry(0.03, 0.16, 0.38);
      const vane = new THREE.Mesh(vaneGeo, carbonMaterial);
      vane.position.set(i * 0.32, 0.2, -1.95);
      carGroup.add(vane);
    }

    // M. Active GT Carbon Aerodynamic Wing
    const wingBladeGeo = new THREE.BoxGeometry(1.72, 0.05, 0.38);
    const wingBlade = new THREE.Mesh(wingBladeGeo, carbonMaterial);
    wingBlade.position.set(0, 1.02, -1.86);
    wingBlade.castShadow = true;
    carGroup.add(wingBlade);

    // Wing Struts / Pylons
    const strutGeo = new THREE.BoxGeometry(0.04, 0.26, 0.12);
    const strutL = new THREE.Mesh(strutGeo, carbonMaterial);
    strutL.position.set(-0.55, 0.88, -1.82);
    carGroup.add(strutL);
    const strutR = strutL.clone();
    strutR.position.x = 0.55;
    carGroup.add(strutR);

    // Wing Endplates
    const endplateGeo = new THREE.BoxGeometry(0.03, 0.18, 0.42);
    const endplateL = new THREE.Mesh(endplateGeo, carbonMaterial);
    endplateL.position.set(-0.86, 1.04, -1.86);
    carGroup.add(endplateL);
    const endplateR = endplateL.clone();
    endplateR.position.x = 0.86;
    carGroup.add(endplateR);

    // N. Advanced Emissive High-Tech Lighting Systems
    // 1. Dual LED Projector Headlights
    const headlightGeo = new THREE.BoxGeometry(0.38, 0.08, 0.08);
    const leftHeadlight = new THREE.Mesh(headlightGeo, headlightMat);
    leftHeadlight.position.set(-0.64, 0.54, 1.96);
    leftHeadlight.rotation.y = -0.15;
    carGroup.add(leftHeadlight);

    const rightHeadlight = leftHeadlight.clone();
    rightHeadlight.position.x = 0.64;
    rightHeadlight.rotation.y = 0.15;
    carGroup.add(rightHeadlight);

    // 2. Horizon DRL Lightbar across front nose
    const drlLightbarGeo = new THREE.BoxGeometry(0.9, 0.02, 0.04);
    const drlLightbar = new THREE.Mesh(drlLightbarGeo, headlightMat);
    drlLightbar.position.set(0, 0.56, 2.06);
    carGroup.add(drlLightbar);

    // 3. Full-Width 3D OLED Red Taillight Blade
    const taillightGeo = new THREE.BoxGeometry(1.68, 0.06, 0.06);
    const tailLight = new THREE.Mesh(taillightGeo, taillightMat);
    tailLight.position.set(0, 0.64, -1.94);
    carGroup.add(tailLight);

    // 4. Center High-Mount Stop Light
    const chmslGeo = new THREE.BoxGeometry(0.32, 0.03, 0.03);
    const chmsl = new THREE.Mesh(chmslGeo, taillightMat);
    chmsl.position.set(0, 1.01, -0.9);
    carGroup.add(chmsl);

    // O. High-Performance Wheels with Split 5-Spoke Chrome Rims & Calipers
    const wheelGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.28, 32);
    const tyreMat = new THREE.MeshStandardMaterial({
      color: 0x16181d,
      roughness: 0.85,
      metalness: 0.08,
    });

    const createWheelAssembly = (x: number, z: number, isLeft: boolean) => {
      const wGroup = new THREE.Group();

      // Outer Rubber Tyre with Performance Sidewall
      const tyre = new THREE.Mesh(wheelGeo, tyreMat);
      tyre.rotation.z = Math.PI / 2;
      tyre.castShadow = true;
      wGroup.add(tyre);

      // Deep Metallic Rim Barrel
      const rimBarrelGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.29, 24);
      const rimBarrel = new THREE.Mesh(rimBarrelGeo, rimChromeMaterial);
      rimBarrel.rotation.z = Math.PI / 2;
      wGroup.add(rimBarrel);

      // Split 5-Spoke (10 Spokes) Rim Face
      const spokeGroup = new THREE.Group();
      const spokeGeo = new THREE.BoxGeometry(0.04, 0.26, 0.03);
      for (let i = 0; i < 5; i++) {
        const angle = (i * Math.PI * 2) / 5;
        // Twin pair
        const spoke1 = new THREE.Mesh(spokeGeo, rimChromeMaterial);
        spoke1.position.set(0, Math.sin(angle - 0.12) * 0.14, Math.cos(angle - 0.12) * 0.14);
        spoke1.rotation.x = angle;
        spokeGroup.add(spoke1);

        const spoke2 = new THREE.Mesh(spokeGeo, rimChromeMaterial);
        spoke2.position.set(0, Math.sin(angle + 0.12) * 0.14, Math.cos(angle + 0.12) * 0.14);
        spoke2.rotation.x = angle;
        spokeGroup.add(spoke2);
      }
      spokeGroup.position.x = isLeft ? -0.12 : 0.12;
      wGroup.add(spokeGroup);

      // Center-Lock Hex Hub Nut
      const hubGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.31, 6);
      const hubMat = new THREE.MeshStandardMaterial({ color: 0x79c7ff, metalness: 0.8, roughness: 0.2 });
      const hub = new THREE.Mesh(hubGeo, hubMat);
      hub.rotation.z = Math.PI / 2;
      wGroup.add(hub);

      // Drilled Steel Brake Rotor (Disc)
      const rotorGeo = new THREE.CylinderGeometry(0.25, 0.25, 0.02, 24);
      const rotor = new THREE.Mesh(rotorGeo, brakeDiscMaterial);
      rotor.rotation.z = Math.PI / 2;
      rotor.position.x = isLeft ? -0.04 : 0.04;
      wGroup.add(rotor);

      // Azure Blue Multi-Piston Performance Brake Caliper
      const caliperGeo = new THREE.BoxGeometry(0.07, 0.16, 0.12);
      const caliper = new THREE.Mesh(caliperGeo, caliperMaterial);
      caliper.position.set(isLeft ? -0.04 : 0.04, 0.14, 0.06);
      wGroup.add(caliper);

      wGroup.position.set(x, 0.38, z);
      return wGroup;
    };

    const wheelFL = createWheelAssembly(-0.96, 1.25, true);
    const wheelFR = createWheelAssembly(0.96, 1.25, false);
    const wheelRL = createWheelAssembly(-0.98, -1.25, true);
    const wheelRR = createWheelAssembly(0.98, -1.25, false);

    carGroup.add(wheelFL, wheelFR, wheelRL, wheelRR);

    // P. Soft Ice-Blue High-Voltage Underglow Light
    const underglowLight = new THREE.PointLight("#79C7FF", 1.6, 4.8);
    underglowLight.position.set(0, 0.12, 0);
    carGroup.add(underglowLight);

    scene.add(carGroup);

    // Animation Render Loop
    const tempVec = new THREE.Vector3();
    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);

      controls.update();

      // Project 3D Hotspot positions to 2D screen coordinates
      const halfWidth = width / 2;
      const halfHeight = height / 2;

      const projected = rawHotspotsRef.current.map((hs) => {
        tempVec.copy(hs.position);
        tempVec.project(camera);

        // Check if point is behind camera
        const isBehind = tempVec.z > 1;

        return {
          ...hs,
          screenPos: {
            x: tempVec.x * halfWidth + halfWidth,
            y: -(tempVec.y * halfHeight) + halfHeight,
            visible: !isBehind,
          },
        };
      });

      setHotspotPositions(projected);
      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      const isMobileNow = newWidth < 640;
      camera.fov = isMobileNow ? 45 : 42;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      renderer.dispose();
      scene.clear();
    };
  }, [mode, selectedColor.hex, selectedColor.metalness, selectedColor.roughness]);

  // Reset View to default 3/4 Showroom and center target
  const resetView = () => {
    applyCameraPreset("3/4 Showroom");
    if (controlsRef.current) {
      controlsRef.current.target.set(0, 0.45, 0);
      controlsRef.current.update();
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[360px] xs:h-[400px] sm:h-[480px] md:h-[540px] rounded-2xl overflow-hidden border border-[#293C51]/80 select-none bg-gradient-to-b from-[#152437]/50 via-[#091321]/30 to-[#091321]/60 backdrop-blur-xl shadow-2xl ${className}`}
    >
      {/* Subtle Holographic Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(121,199,255,0.04)_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />

      {/* Top HUD Controls Bar */}
      <div className="absolute top-2.5 sm:top-4 left-2.5 sm:left-4 right-2.5 sm:right-4 z-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pointer-events-auto">
        <div className="flex items-center space-x-2 max-w-full overflow-x-auto scrollbar-none">
          <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-[#152437]/90 border border-[#293C51] backdrop-blur-md shrink-0">
            <span className="w-2 h-2 rounded-full bg-[#79C7FF] animate-pulse" />
            <span className="text-[9px] sm:text-[10px] font-mono uppercase text-[#A5B5C8] font-bold">
              3D DIGITAL TWIN
            </span>
            <span className="text-[9px] sm:text-[10px] font-mono text-[#79C7FF] font-bold hidden xs:inline">
              {"// REALTIME"}
            </span>
          </div>

          {/* Interactive Mode Toggle: Orbit vs Move/Drag */}
          {mode === "3d" && (
            <div className="flex items-center space-x-1 bg-[#152437]/90 p-1 rounded-xl border border-[#293C51] backdrop-blur-md shrink-0">
              <button
                onClick={() => setDragMode("orbit")}
                className={`px-2 py-1 rounded-lg text-[9px] sm:text-[10px] font-mono font-bold transition-all cursor-pointer flex items-center space-x-1 min-h-[30px] ${
                  dragMode === "orbit"
                    ? "bg-[#79C7FF] text-[#091321] font-semibold"
                    : "text-[#A5B5C8] hover:text-[#F5F8FC]"
                }`}
                title="Orbit Mode (1-Finger / Left-Click Drag rotates 360°)"
              >
                <Compass className="w-3 h-3" />
                <span>ORBIT</span>
              </button>

              <button
                onClick={() => setDragMode("pan")}
                className={`px-2 py-1 rounded-lg text-[9px] sm:text-[10px] font-mono font-bold transition-all cursor-pointer flex items-center space-x-1 min-h-[30px] ${
                  dragMode === "pan"
                    ? "bg-[#79C7FF] text-[#091321] font-semibold shadow-sm"
                    : "text-[#A5B5C8] hover:text-[#F5F8FC]"
                }`}
                title="Move/Drag Mode (1-Finger / Left-Click Drag moves the car freely)"
              >
                <Move className="w-3 h-3" />
                <span>MOVE & DRAG</span>
              </button>
            </div>
          )}

          {/* 2D / 3D Switcher */}
          {webGLSupported && (
            <button
              onClick={() => setMode(mode === "3d" ? "2d" : "3d")}
              className="px-2.5 py-1 rounded-full bg-[#152437]/80 hover:bg-[#1E314B] border border-[#293C51] text-[9px] sm:text-[10px] font-mono text-[#A5B5C8] hover:text-[#F5F8FC] transition-colors flex items-center space-x-1.5 cursor-pointer shrink-0 min-h-[32px]"
              title="Toggle between 3D WebGL orbit & 2D studio photography"
            >
              <Layers className="w-3 h-3 text-[#79C7FF]" />
              <span>{mode === "3d" ? "2D STUDIO" : "3D TWIN"}</span>
            </button>
          )}
        </div>

        {/* Camera Views & Reset Controls (Only visible in 3D mode) */}
        {mode === "3d" && (
          <div className="flex items-center space-x-1 bg-[#152437]/90 p-1 rounded-xl border border-[#293C51] backdrop-blur-md max-w-full overflow-x-auto scrollbar-none">
            {[
              { id: "3/4 Showroom", label: "3/4", fullLabel: "3/4 Showroom" },
              { id: "Front", label: "Front", fullLabel: "Front" },
              { id: "Side (Left)", label: "Side", fullLabel: "Side" },
              { id: "Rear", label: "Rear", fullLabel: "Rear" },
              { id: "Top View", label: "Top", fullLabel: "Top" },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => applyCameraPreset(p.id)}
                className={`px-2 py-1 rounded-lg text-[9px] sm:text-[10px] font-mono font-bold transition-all cursor-pointer whitespace-nowrap min-h-[30px] ${
                  activePreset === p.id
                    ? "bg-[#79C7FF] text-[#091321] shadow-sm font-semibold"
                    : "text-[#A5B5C8] hover:text-[#F5F8FC]"
                }`}
                title={p.fullLabel}
              >
                <span className="sm:hidden">{p.label}</span>
                <span className="hidden sm:inline">{p.fullLabel.toUpperCase()}</span>
              </button>
            ))}

            <button
              onClick={() => {
                const nextState = !isRotating;
                setIsRotating(nextState);
                if (controlsRef.current) {
                  controlsRef.current.autoRotate = nextState;
                }
              }}
              className={`p-1.5 rounded-lg border transition-all cursor-pointer shrink-0 min-h-[30px] min-w-[30px] flex items-center justify-center ${
                isRotating
                  ? "border-[#79C7FF] text-[#79C7FF] bg-[#79C7FF]/10"
                  : "border-[#293C51] text-[#A5B5C8] hover:text-[#F5F8FC]"
              }`}
              title="Toggle Auto-Rotation Turntable"
            >
              <RotateCcw className={`w-3.5 h-3.5 ${isRotating ? "animate-spin" : ""}`} />
            </button>

            {/* Reset View & Pan Position Button */}
            <button
              onClick={resetView}
              className="px-2 py-1 rounded-lg border border-[#293C51] hover:border-[#79C7FF]/40 text-[9px] sm:text-[10px] font-mono font-bold text-[#A5B5C8] hover:text-[#79C7FF] transition-all cursor-pointer whitespace-nowrap min-h-[30px]"
              title="Reset View and Camera to default"
            >
              RESET
            </button>
          </div>
        )}
      </div>

      {/* Main 3D Canvas or 2D Fallback */}
      {mode === "3d" ? (
        <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
          <canvas ref={canvasRef} className="w-full h-full block bg-transparent" />

          {/* Interactive Projected Hotspots Overlay */}
          {hotspotPositions.map((hs) => {
            if (!hs.screenPos.visible) return null;
            const isCrit = hs.status === "critical";
            const isWarn = hs.status === "warning";
            const isSelected = activeHotspot?.id === hs.id;

            return (
              <div
                key={hs.id}
                style={{
                  left: `${hs.screenPos.x}px`,
                  top: `${hs.screenPos.y}px`,
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto"
              >
                <button
                  onClick={() => setActiveHotspot(isSelected ? null : hs)}
                  aria-label={`Inspect ${hs.label}`}
                  className={`relative group p-1 rounded-full transition-transform hover:scale-125 focus:outline-none cursor-pointer ${
                    isCrit
                      ? "bg-[#F16D78] shadow-[0_0_16px_rgba(241,109,120,0.8)] animate-bounce"
                      : isWarn
                      ? "bg-[#F2B65B] shadow-[0_0_14px_rgba(242,182,91,0.8)]"
                      : isSelected
                      ? "bg-[#79C7FF] shadow-[0_0_14px_rgba(121,199,255,0.8)]"
                      : "bg-[#152437] border-2 border-[#79C7FF]/80 hover:bg-[#79C7FF]"
                  }`}
                >
                  <span
                    className={`block w-2.5 h-2.5 rounded-full ${
                      isCrit
                        ? "bg-white"
                        : isWarn
                        ? "bg-[#091321]"
                        : isSelected
                        ? "bg-[#091321]"
                        : "bg-[#79C7FF]"
                    }`}
                  />

                  {/* Hotspot Hover Tooltip Label */}
                  <span className="absolute left-1/2 -top-7 -translate-x-1/2 hidden group-hover:block whitespace-nowrap px-2 py-0.5 rounded bg-[#091321] border border-[#293C51] text-[9px] font-mono text-[#F5F8FC] shadow-lg pointer-events-none">
                    {hs.label}
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        /* 2D Studio Photography Fallback View */
        <div className="relative w-full h-full flex items-center justify-center p-6">
          <div className="relative w-[90%] sm:w-[82%] h-[78%] flex items-center justify-center">
            <Image
              src="/assets/images/hyperion-gt-angle.jpg"
              alt="Nebula Hyperion GT Studio Photography"
              fill
              className="object-contain filter contrast-110 drop-shadow-[0_20px_40px_rgba(0,0,0,0.85)]"
              priority
            />
          </div>

          <div className="absolute bottom-4 left-4 text-xs font-mono text-[#A5B5C8]">
            Showing 4K Studio Render (High Fidelity Fallback)
          </div>
        </div>
      )}

      {/* Selected Hotspot Inspection Modal / Card */}
      {activeHotspot && (
        <div className="absolute bottom-16 sm:top-16 left-3 right-3 sm:left-auto sm:right-6 sm:w-80 max-w-[calc(100vw-1.5rem)] p-3.5 sm:p-4 rounded-xl bg-[#152437]/95 border border-[#293C51] backdrop-blur-xl shadow-2xl z-30 font-mono animate-in fade-in duration-200">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-2">
              {activeHotspot.status === "critical" ? (
                <div className="w-7 h-7 rounded-lg bg-[#F16D78]/20 border border-[#F16D78]/40 flex items-center justify-center text-[#F16D78]">
                  <AlertTriangle className="w-4 h-4 animate-pulse" />
                </div>
              ) : activeHotspot.status === "warning" ? (
                <div className="w-7 h-7 rounded-lg bg-[#F2B65B]/20 border border-[#F2B65B]/40 flex items-center justify-center text-[#F2B65B]">
                  <Thermometer className="w-4 h-4" />
                </div>
              ) : (
                <div className="w-7 h-7 rounded-lg bg-[#35C99A]/20 border border-[#35C99A]/40 flex items-center justify-center text-[#35C99A]">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              )}
              <div>
                <span className="text-[9px] uppercase text-[#A5B5C8] block">
                  {activeHotspot.subsystem}
                </span>
                <h4 className="font-bold text-xs text-[#F5F8FC]">
                  {activeHotspot.label}
                </h4>
              </div>
            </div>

            <button
              onClick={() => setActiveHotspot(null)}
              className="p-1 rounded-lg text-[#A5B5C8] hover:text-[#F5F8FC] hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-3 pt-3 border-t border-[#293C51] space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#A5B5C8]">LIVE TELEMETRY:</span>
              <span
                className={`font-bold font-mono-numbers ${
                  activeHotspot.status === "critical"
                    ? "text-[#F16D78]"
                    : activeHotspot.status === "warning"
                    ? "text-[#F2B65B]"
                    : "text-[#79C7FF]"
                }`}
              >
                {activeHotspot.reading}
              </span>
            </div>

            <div className="flex items-center justify-between text-[11px]">
              <span className="text-[#A5B5C8]">STATE HEALTH:</span>
              <span
                className={`font-bold uppercase ${
                  activeHotspot.status === "critical"
                    ? "text-[#F16D78]"
                    : activeHotspot.status === "warning"
                    ? "text-[#F2B65B]"
                    : "text-[#35C99A]"
                }`}
              >
                {activeHotspot.status === "critical"
                  ? "FAULT DETECTED"
                  : activeHotspot.status === "warning"
                  ? "ELEVATED LEVEL"
                  : "CALIBRATED & OPTIMAL"}
              </span>
            </div>

            {activeHotspot.id === "rr_tyre" && isRrTyreCrit && (
              <div className="p-2 rounded bg-[#F16D78]/10 border border-[#F16D78]/30 text-[10px] text-[#F16D78] leading-tight">
                <strong>VIVA SCENARIO 2 TRIGGERED:</strong> Rapid puncture detected on CAN-ID 0x2A1. Recommend pit stop calibration.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bottom Controls Bar: Paint Customizer & Interaction Guidance */}
      <div className="absolute bottom-2.5 sm:bottom-4 left-2.5 sm:left-4 right-2.5 sm:right-4 z-20 flex items-center justify-between gap-2 pointer-events-auto">
        {/* Paint Swatches */}
        <div className="flex items-center space-x-1.5 sm:space-x-2 bg-[#152437]/90 px-2.5 sm:px-3 py-1.5 rounded-xl border border-[#293C51] backdrop-blur-md max-w-full overflow-x-auto scrollbar-none">
          <span className="text-[9px] font-mono text-[#A5B5C8] uppercase font-bold flex items-center space-x-1 shrink-0">
            <Sparkles className="w-3 h-3 text-[#79C7FF]" />
            <span className="hidden xs:inline">FINISH:</span>
          </span>

          <div className="flex items-center space-x-1.5">
            {CAR_COLORS.map((c) => (
              <button
                key={c.name}
                onClick={() => setSelectedColor(c)}
                className={`w-5 h-5 rounded-full border-2 transition-transform cursor-pointer hover:scale-110 shrink-0 ${
                  selectedColor.name === c.name
                    ? "border-white scale-110 shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                    : "border-white/20 opacity-70 hover:opacity-100"
                }`}
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
          </div>

          <span className="text-[10px] font-mono text-[#F5F8FC] ml-1 hidden md:inline">
            {selectedColor.name}
          </span>
        </div>

        {/* Dynamic Interaction Guidance HUD */}
        <div className="hidden lg:flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-[#152437]/85 border border-[#293C51] text-[10px] font-mono text-[#A5B5C8] backdrop-blur-md">
          <span>{dragMode === "pan" ? "DRAG: Move Car" : "DRAG: Rotate 360°"}</span>
          <span>•</span>
          <span>RIGHT-CLICK / 2-FINGER: Move</span>
          <span>•</span>
          <span>ZOOM: Scroll / Pinch</span>
        </div>
      </div>
    </div>
  );
}
