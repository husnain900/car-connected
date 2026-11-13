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
  { name: "Cyber Lime", hex: "#D6F45A", roughness: 0.2, metalness: 0.75 },
  { name: "Obsidian Black", hex: "#11141A", roughness: 0.15, metalness: 0.9 },
  { name: "Liquid Silver", hex: "#C8D1DC", roughness: 0.1, metalness: 0.95 },
  { name: "Hyper Blue", hex: "#1E6BFF", roughness: 0.2, metalness: 0.8 },
  { name: "Stealth Grey", hex: "#3A414B", roughness: 0.35, metalness: 0.5 },
];

export default function Vehicle3DViewer({
  vehicle,
  className = "",
}: Vehicle3DViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [mode, setMode] = useState<"3d" | "2d">("3d");
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
      position: new THREE.Vector3(-1.1, 0.45, 1.4),
      subsystem: "TPMS Telemetry",
      status: tyreFL.status === "critical" ? "critical" : tyreFL.status === "warning" ? "warning" : "nominal",
      reading: `${tyreFL.psi.toFixed(1)} PSI • ${tyreFL.tempC}°C`,
    },
    {
      id: "fr_tyre",
      label: "Front Right Wheel",
      position: new THREE.Vector3(1.1, 0.45, 1.4),
      subsystem: "TPMS Telemetry",
      status: tyreFR.status === "critical" ? "critical" : tyreFR.status === "warning" ? "warning" : "nominal",
      reading: `${tyreFR.psi.toFixed(1)} PSI • ${tyreFR.tempC}°C`,
    },
    {
      id: "rl_tyre",
      label: "Rear Left Wheel",
      position: new THREE.Vector3(-1.1, 0.45, -1.4),
      subsystem: "TPMS Telemetry",
      status: tyreRL.status === "critical" ? "critical" : tyreRL.status === "warning" ? "warning" : "nominal",
      reading: `${tyreRL.psi.toFixed(1)} PSI • ${tyreRL.tempC}°C`,
    },
    {
      id: "rr_tyre",
      label: "Rear Right Wheel",
      position: new THREE.Vector3(1.1, 0.45, -1.4),
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
      position: new THREE.Vector3(-1.0, 0.9, 0.1),
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
        position: new THREE.Vector3(-1.1, 0.45, 1.4),
        subsystem: "TPMS Telemetry",
        status: tyreFL.status === "critical" ? "critical" : tyreFL.status === "warning" ? "warning" : "nominal",
        reading: `${tyreFL.psi.toFixed(1)} PSI • ${tyreFL.tempC}°C`,
      },
      {
        id: "fr_tyre",
        label: "Front Right Wheel",
        position: new THREE.Vector3(1.1, 0.45, 1.4),
        subsystem: "TPMS Telemetry",
        status: tyreFR.status === "critical" ? "critical" : tyreFR.status === "warning" ? "warning" : "nominal",
        reading: `${tyreFR.psi.toFixed(1)} PSI • ${tyreFR.tempC}°C`,
      },
      {
        id: "rl_tyre",
        label: "Rear Left Wheel",
        position: new THREE.Vector3(-1.1, 0.45, -1.4),
        subsystem: "TPMS Telemetry",
        status: tyreRL.status === "critical" ? "critical" : tyreRL.status === "warning" ? "warning" : "nominal",
        reading: `${tyreRL.psi.toFixed(1)} PSI • ${tyreRL.tempC}°C`,
      },
      {
        id: "rr_tyre",
        label: "Rear Right Wheel",
        position: new THREE.Vector3(1.1, 0.45, -1.4),
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
        position: new THREE.Vector3(-1.0, 0.9, 0.1),
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

  // Camera presets
  const applyCameraPreset = useCallback((presetName: string) => {
    setActivePreset(presetName);
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    if (!camera || !controls) return;

    controls.autoRotate = false;
    setIsRotating(false);

    switch (presetName) {
      case "Front":
        camera.position.set(0, 1.1, 4.8);
        controls.target.set(0, 0.5, 0);
        break;
      case "Rear":
        camera.position.set(0, 1.1, -4.8);
        controls.target.set(0, 0.5, 0);
        break;
      case "Side (Left)":
        camera.position.set(-4.8, 1.0, 0);
        controls.target.set(0, 0.5, 0);
        break;
      case "Side (Right)":
        camera.position.set(4.8, 1.0, 0);
        controls.target.set(0, 0.5, 0);
        break;
      case "Top View":
        camera.position.set(0, 5.8, 0.01);
        controls.target.set(0, 0, 0);
        break;
      case "3/4 Showroom":
      default:
        camera.position.set(3.8, 1.8, 3.8);
        controls.target.set(0, 0.5, 0);
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

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color("#0B1018");
    scene.fog = new THREE.FogExp2("#0B1018", 0.04);

    // Camera
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(3.8, 1.8, 3.8);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 2.5;
    controls.maxDistance = 8.0;
    controls.maxPolarAngle = Math.PI / 2 - 0.05; // Prevent flipping below floor
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.8;
    controls.target.set(0, 0.5, 0);
    controlsRef.current = controls;

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight("#B8D0EB", 0.7);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight("#FFFFFF", 2.2);
    keyLight.position.set(5, 7, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight("#D6F45A", 1.5);
    rimLight.position.set(-6, 4, -5);
    scene.add(rimLight);

    const frontFillLight = new THREE.DirectionalLight("#43D9A3", 0.8);
    frontFillLight.position.set(0, 2, 6);
    scene.add(frontFillLight);

    // Studio Floor Grid
    const gridHelper = new THREE.GridHelper(16, 24, 0xd6f45a, 0x1f2937);
    gridHelper.position.y = 0;
    scene.add(gridHelper);

    // Shadow Plane
    const shadowGeo = new THREE.PlaneGeometry(6, 4);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x05070a,
      transparent: true,
      opacity: 0.8,
    });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = 0.01;
    scene.add(shadowPlane);

    // Build Procedural Nebula Hyperion GT Model
    const carGroup = new THREE.Group();
    carBodyMeshRef.current = [];

    // Body paint material
    const bodyMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(selectedColor.hex),
      metalness: selectedColor.metalness,
      roughness: selectedColor.roughness,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });

    // Carbon fiber / trim material
    const trimMaterial = new THREE.MeshStandardMaterial({
      color: 0x14181f,
      roughness: 0.4,
      metalness: 0.6,
    });

    // Glass material
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x111e2e,
      metalness: 0.9,
      roughness: 0.05,
      transmission: 0.85,
      transparent: true,
      opacity: 0.85,
    });

    // 1. Lower chassis / underbelly
    const chassisGeo = new THREE.BoxGeometry(1.8, 0.25, 3.8);
    const chassisMesh = new THREE.Mesh(chassisGeo, trimMaterial);
    chassisMesh.position.set(0, 0.3, 0);
    chassisMesh.castShadow = true;
    chassisMesh.receiveShadow = true;
    carGroup.add(chassisMesh);

    // 2. Main aerodynamic body
    const bodyMainGeo = new THREE.BoxGeometry(1.72, 0.45, 3.6);
    const bodyMainMesh = new THREE.Mesh(bodyMainGeo, bodyMaterial);
    bodyMainMesh.position.set(0, 0.55, 0);
    bodyMainMesh.castShadow = true;
    carGroup.add(bodyMainMesh);
    carBodyMeshRef.current.push(bodyMainMesh);

    // 3. Cabin glass canopy
    const cabinGeo = new THREE.BoxGeometry(1.35, 0.38, 1.8);
    const cabinMesh = new THREE.Mesh(cabinGeo, glassMaterial);
    cabinMesh.position.set(0, 0.88, -0.15);
    cabinMesh.castShadow = true;
    carGroup.add(cabinMesh);

    // 4. Roof cap
    const roofGeo = new THREE.BoxGeometry(1.28, 0.06, 1.4);
    const roofMesh = new THREE.Mesh(roofGeo, bodyMaterial);
    roofMesh.position.set(0, 1.08, -0.2);
    roofMesh.castShadow = true;
    carGroup.add(roofMesh);
    carBodyMeshRef.current.push(roofMesh);

    // 5. Front hood scoop / nose taper
    const noseGeo = new THREE.CylinderGeometry(0.8, 0.86, 0.6, 16);
    const noseMesh = new THREE.Mesh(noseGeo, bodyMaterial);
    noseMesh.rotation.x = Math.PI / 2;
    noseMesh.position.set(0, 0.48, 1.8);
    carGroup.add(noseMesh);
    carBodyMeshRef.current.push(noseMesh);

    // 6. Front splitter (Carbon Aero)
    const splitterGeo = new THREE.BoxGeometry(1.85, 0.05, 0.4);
    const splitterMesh = new THREE.Mesh(splitterGeo, trimMaterial);
    splitterMesh.position.set(0, 0.2, 2.0);
    carGroup.add(splitterMesh);

    // 7. Rear diffuser & active aero spoiler
    const spoilerGeo = new THREE.BoxGeometry(1.7, 0.06, 0.35);
    const spoilerMesh = new THREE.Mesh(spoilerGeo, trimMaterial);
    spoilerMesh.position.set(0, 0.95, -1.9);
    carGroup.add(spoilerMesh);

    const spoilerStandL = new THREE.BoxGeometry(0.04, 0.2, 0.1);
    const standMeshL = new THREE.Mesh(spoilerStandL, trimMaterial);
    standMeshL.position.set(-0.6, 0.85, -1.85);
    carGroup.add(standMeshL);

    const standMeshR = standMeshL.clone();
    standMeshR.position.x = 0.6;
    carGroup.add(standMeshR);

    // 8. Headlights (LED Neon Lightbar)
    const headLightGeo = new THREE.BoxGeometry(0.45, 0.08, 0.08);
    const headLightMat = new THREE.MeshBasicMaterial({ color: 0xd6f45a });

    const leftHeadlight = new THREE.Mesh(headLightGeo, headLightMat);
    leftHeadlight.position.set(-0.65, 0.58, 1.88);
    carGroup.add(leftHeadlight);

    const rightHeadlight = leftHeadlight.clone();
    rightHeadlight.position.x = 0.65;
    carGroup.add(rightHeadlight);

    // 9. Taillight Bar (Full-Width Neon Red)
    const tailLightGeo = new THREE.BoxGeometry(1.65, 0.08, 0.06);
    const tailLightMat = new THREE.MeshBasicMaterial({ color: 0xff3b30 });
    const tailLight = new THREE.Mesh(tailLightGeo, tailLightMat);
    tailLight.position.set(0, 0.65, -1.88);
    carGroup.add(tailLight);

    // 10. Wheels & Rims Assembly (FL, FR, RL, RR)
    const wheelGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.26, 24);
    const tyreMat = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      roughness: 0.8,
    });
    const rimMat = new THREE.MeshStandardMaterial({
      color: 0xd1d5db,
      metalness: 0.9,
      roughness: 0.15,
    });
    const caliperMat = new THREE.MeshBasicMaterial({ color: 0xd6f45a });

    const createWheel = (x: number, z: number) => {
      const wGroup = new THREE.Group();
      // Tyre
      const tyre = new THREE.Mesh(wheelGeo, tyreMat);
      tyre.rotation.z = Math.PI / 2;
      tyre.castShadow = true;
      wGroup.add(tyre);

      // Rim Center
      const rimGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.27, 16);
      const rim = new THREE.Mesh(rimGeo, rimMat);
      rim.rotation.z = Math.PI / 2;
      wGroup.add(rim);

      // Brake Caliper
      const caliperGeo = new THREE.BoxGeometry(0.08, 0.14, 0.12);
      const caliper = new THREE.Mesh(caliperGeo, caliperMat);
      caliper.position.set(0, 0.12, 0.05);
      wGroup.add(caliper);

      wGroup.position.set(x, 0.38, z);
      return wGroup;
    };

    const wheelFL = createWheel(-0.95, 1.25);
    const wheelFR = createWheel(0.95, 1.25);
    const wheelRL = createWheel(-0.95, -1.25);
    const wheelRR = createWheel(0.95, -1.25);

    carGroup.add(wheelFL, wheelFR, wheelRL, wheelRR);

    // Underglow Neon Glow (Subtle Lime)
    const underglowLight = new THREE.PointLight("#D6F45A", 1.8, 4.5);
    underglowLight.position.set(0, 0.15, 0);
    carGroup.add(underglowLight);

    scene.add(carGroup);

    // Animation Loop
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

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[480px] sm:h-[540px] rounded-2xl nebula-card overflow-hidden border border-white/10 select-none bg-[#0B1018] ${className}`}
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Top HUD Controls Bar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-auto">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-[#151D28]/90 border border-white/10 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#D6F45A] animate-pulse" />
            <span className="text-[10px] font-mono uppercase text-[#8794A6] font-bold">
              3D DIGITAL TWIN
            </span>
            <span className="text-[10px] font-mono text-[#D6F45A] font-bold">
              {"// WEBGL ACTIVE"}
            </span>
          </div>

          {/* Fallback & Switcher */}
          {webGLSupported && (
            <button
              onClick={() => setMode(mode === "3d" ? "2d" : "3d")}
              className="px-2.5 py-1 rounded-full bg-[#151D28]/80 hover:bg-[#1B2636] border border-white/10 text-[10px] font-mono text-[#8794A6] hover:text-[#F4F7FB] transition-colors flex items-center space-x-1.5 cursor-pointer"
              title="Toggle between 3D WebGL orbit & 2D studio photography"
            >
              <Layers className="w-3 h-3 text-[#D6F45A]" />
              <span>{mode === "3d" ? "SWITCH TO 2D STUDIO" : "LAUNCH 3D TWIN"}</span>
            </button>
          )}
        </div>

        {/* Camera Views & Turntable Toggle (Only visible in 3D mode) */}
        {mode === "3d" && (
          <div className="flex items-center space-x-1.5 bg-[#151D28]/90 p-1 rounded-xl border border-white/10 backdrop-blur-md">
            {["3/4 Showroom", "Front", "Side (Left)", "Rear", "Top View"].map(
              (preset) => (
                <button
                  key={preset}
                  onClick={() => applyCameraPreset(preset)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold transition-all cursor-pointer ${
                    activePreset === preset
                      ? "bg-[#D6F45A] text-[#0B1018] shadow-sm"
                      : "text-[#8794A6] hover:text-[#F4F7FB]"
                  }`}
                >
                  {preset.toUpperCase()}
                </button>
              )
            )}

            <button
              onClick={() => {
                const nextState = !isRotating;
                setIsRotating(nextState);
                if (controlsRef.current) {
                  controlsRef.current.autoRotate = nextState;
                }
              }}
              className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                isRotating
                  ? "border-[#D6F45A] text-[#D6F45A] bg-[#D6F45A]/10"
                  : "border-white/10 text-[#8794A6] hover:text-[#F4F7FB]"
              }`}
              title="Toggle Auto-Rotation Turntable"
            >
              <RotateCcw className={`w-3.5 h-3.5 ${isRotating ? "animate-spin" : ""}`} />
            </button>
          </div>
        )}
      </div>

      {/* Main 3D Canvas or 2D Fallback */}
      {mode === "3d" ? (
        <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
          <canvas ref={canvasRef} className="w-full h-full block" />

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
                      ? "bg-red-500 shadow-[0_0_16px_rgba(239,68,68,0.9)] animate-bounce"
                      : isWarn
                      ? "bg-amber-400 shadow-[0_0_14px_rgba(251,191,36,0.8)]"
                      : isSelected
                      ? "bg-[#D6F45A] shadow-[0_0_14px_rgba(214,244,90,0.8)]"
                      : "bg-[#151D28] border-2 border-[#D6F45A]/80 hover:bg-[#D6F45A]"
                  }`}
                >
                  <span
                    className={`block w-2.5 h-2.5 rounded-full ${
                      isCrit
                        ? "bg-white"
                        : isWarn
                        ? "bg-[#0B1018]"
                        : isSelected
                        ? "bg-[#0B1018]"
                        : "bg-[#D6F45A]"
                    }`}
                  />

                  {/* Hotspot Hover Tooltip Label */}
                  <span className="absolute left-1/2 -top-7 -translate-x-1/2 hidden group-hover:block whitespace-nowrap px-2 py-0.5 rounded bg-[#0B1018] border border-white/20 text-[9px] font-mono text-[#F4F7FB] shadow-lg pointer-events-none">
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

          <div className="absolute bottom-4 left-4 text-xs font-mono text-[#8794A6]">
            Showing 4K Studio Render (High Fidelity Fallback)
          </div>
        </div>
      )}

      {/* Selected Hotspot Inspection Modal / Card */}
      {activeHotspot && (
        <div className="absolute top-16 right-4 sm:right-6 w-80 p-4 rounded-xl bg-[#151D28]/95 border border-white/15 backdrop-blur-xl shadow-2xl z-30 font-mono animate-in fade-in duration-200">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-2">
              {activeHotspot.status === "critical" ? (
                <div className="w-7 h-7 rounded-lg bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400">
                  <AlertTriangle className="w-4 h-4 animate-pulse" />
                </div>
              ) : activeHotspot.status === "warning" ? (
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                  <Thermometer className="w-4 h-4" />
                </div>
              ) : (
                <div className="w-7 h-7 rounded-lg bg-[#43D9A3]/20 border border-[#43D9A3]/40 flex items-center justify-center text-[#43D9A3]">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              )}
              <div>
                <span className="text-[9px] uppercase text-[#8794A6] block">
                  {activeHotspot.subsystem}
                </span>
                <h4 className="font-bold text-xs text-[#F4F7FB]">
                  {activeHotspot.label}
                </h4>
              </div>
            </div>

            <button
              onClick={() => setActiveHotspot(null)}
              className="p-1 rounded-lg text-[#8794A6] hover:text-[#F4F7FB] hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-3 pt-3 border-t border-white/10 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#8794A6]">LIVE TELEMETRY:</span>
              <span
                className={`font-bold font-mono-numbers ${
                  activeHotspot.status === "critical"
                    ? "text-red-400"
                    : activeHotspot.status === "warning"
                    ? "text-amber-400"
                    : "text-[#D6F45A]"
                }`}
              >
                {activeHotspot.reading}
              </span>
            </div>

            <div className="flex items-center justify-between text-[11px]">
              <span className="text-[#8794A6]">STATE HEALTH:</span>
              <span
                className={`font-bold uppercase ${
                  activeHotspot.status === "critical"
                    ? "text-red-400"
                    : activeHotspot.status === "warning"
                    ? "text-amber-400"
                    : "text-[#43D9A3]"
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
              <div className="p-2 rounded bg-red-500/10 border border-red-500/30 text-[10px] text-red-300 leading-tight">
                <strong>VIVA SCENARIO 2 TRIGGERED:</strong> Rapid puncture detected on CAN-ID 0x2A1. Recommend pit stop calibration.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bottom Controls Bar: Paint Customizer & Interaction Hints */}
      <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-auto">
        {/* Paint Swatches */}
        <div className="flex items-center space-x-2 bg-[#151D28]/90 px-3 py-1.5 rounded-xl border border-white/10 backdrop-blur-md">
          <span className="text-[9px] font-mono text-[#8794A6] uppercase font-bold flex items-center space-x-1">
            <Sparkles className="w-3 h-3 text-[#D6F45A]" />
            <span className="hidden sm:inline">BODY FINISH:</span>
          </span>

          <div className="flex items-center space-x-1.5">
            {CAR_COLORS.map((c) => (
              <button
                key={c.name}
                onClick={() => setSelectedColor(c)}
                className={`w-5 h-5 rounded-full border-2 transition-transform cursor-pointer hover:scale-110 ${
                  selectedColor.name === c.name
                    ? "border-white scale-110 shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                    : "border-white/20 opacity-70 hover:opacity-100"
                }`}
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
          </div>

          <span className="text-[10px] font-mono text-[#F4F7FB] ml-1 hidden md:inline">
            {selectedColor.name}
          </span>
        </div>

        {/* Orbit Helper Tip */}
        <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-[#151D28]/80 border border-white/10 text-[10px] font-mono text-[#8794A6]">
          <span>ORBIT: Left Click + Drag</span>
          <span>•</span>
          <span>ZOOM: Scroll / Pinch</span>
          <span>•</span>
          <span>INSPECT: Click Pins</span>
        </div>
      </div>
    </div>
  );
}
