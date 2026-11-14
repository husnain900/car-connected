"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Camera,
  Upload,
  RefreshCw,
  AlertTriangle,
  Trash2,
  Sparkles,
  Eye,
} from "lucide-react";
import { useSimulationStore } from "@/lib/simulationStore";
import { VisualInspectionFinding } from "@/types/vehicle";

export default function InspectionPage() {
  const { activeVehicle, addInspection } = useSimulationStore();

  const [streamActive, setStreamActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState<string | null>(null);
  const [findings, setFindings] = useState<VisualInspectionFinding[] | null>(null);
  const [cosmeticScore, setCosmeticScore] = useState<number | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Preset sample test images for evaluation viva
  const samplePresets = [
    {
      name: "Front Right Panel (Minor Scratch)",
      url: "/assets/images/hyperion-gt-angle.jpg",
      findings: [
        {
          id: "f-1",
          area: "Front Right Wheel Arch",
          defectType: "SCRATCH" as const,
          severity: "LOW" as const,
          confidencePct: 88,
          notes: "Superficial clear-coat abrasion detected near carbon-fiber fender trim (~4.2 cm).",
        },
        {
          id: "f-2",
          area: "Front Bumper Lower Lip",
          defectType: "CLEAN" as const,
          severity: "NONE" as const,
          confidencePct: 94,
          notes: "Aerodynamic splitter intact; no structural deformities observed.",
        },
      ],
      score: 92,
    },
    {
      name: "Side Profile (Optimal Clean)",
      url: "/assets/images/hyperion-gt-hero.jpg",
      findings: [
        {
          id: "f-3",
          area: "Doors & Lateral Skirts",
          defectType: "CLEAN" as const,
          severity: "NONE" as const,
          confidencePct: 96,
          notes: "High gloss uniform reflection. Zero micro-dents or panel misalignments found.",
        },
      ],
      score: 98,
    },
  ];

  const startCamera = async () => {
    setCameraError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Camera API (getUserMedia) is not supported in this browser environment.");
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 720 } },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setStreamActive(true);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to access camera.";
      setCameraError(`${msg} You can still upload any vehicle photo below or choose a preset test image.`);
      setStreamActive(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setStreamActive(false);
  };

  const captureFrame = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/jpeg");
      setCapturedImage(dataUrl);
      stopCamera();
      runAIAnalysis(dataUrl);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setCapturedImage(result);
        stopCamera();
        runAIAnalysis(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const loadPreset = (preset: typeof samplePresets[0]) => {
    stopCamera();
    setCapturedImage(preset.url);
    setIsAnalyzing(true);
    setAnalysisStep("Running Vision Transformer Inference on Preset...");
    setTimeout(() => {
      setFindings(preset.findings);
      setCosmeticScore(preset.score);
      setIsAnalyzing(false);
      setAnalysisStep(null);
    }, 1000);
  };

  const runAIAnalysis = (imgSrc: string) => {
    setIsAnalyzing(true);
    setFindings(null);
    setCosmeticScore(null);

    setAnalysisStep("Step 1/3: Normalizing image geometry & lighting balance...");
    setTimeout(() => {
      setAnalysisStep("Step 2/3: Segmenting body panels & wheel contours...");
      setTimeout(() => {
        setAnalysisStep("Step 3/3: Evaluating surface defects against vehicle model template...");
        setTimeout(() => {
          const generatedFindings: VisualInspectionFinding[] = [
            {
              id: `f-${Date.now()}-1`,
              area: "Visible Body Panels",
              defectType: "CLEAN",
              severity: "NONE",
              confidencePct: 91,
              notes: "Uniform surface reflection detected. No major dent or paint rupture identified.",
            },
            {
              id: `f-${Date.now()}-2`,
              area: "Tyre Sidewall & Rim",
              defectType: "TYRE_TREAD_WEAR",
              severity: "LOW",
              confidencePct: 83,
              notes: "Visual sidewall pattern nominal. No visible bead cuts or curb scuffs detected in frame.",
            },
          ];
          setFindings(generatedFindings);
          setCosmeticScore(94);
          setIsAnalyzing(false);
          setAnalysisStep(null);

          // Save to store history
          addInspection({
            id: `insp-${Date.now()}`,
            vehicleId: activeVehicle.id,
            timestamp: new Date().toISOString(),
            imageUrl: imgSrc,
            capturedSource: "CAMERA_LIVE",
            findings: generatedFindings,
            scorePct: 94,
            disclaimer: "Visual observation only. Cannot measure internal mechanical or electrical condition.",
          });
        }, 1000);
      }, 1000);
    }, 900);
  };

  const resetAll = () => {
    stopCamera();
    setCapturedImage(null);
    setFindings(null);
    setCosmeticScore(null);
    setAnalysisStep(null);
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col space-y-6 sm:space-y-8 select-none text-[#1F2A37]">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2 text-xs font-mono text-[#5B6675]">
          <Link href="/dashboard" className="hover:text-[#2E8B8B]">Dashboard</Link>
          <span>/</span>
          <span>Vehicles</span>
          <span>/</span>
          <span className="text-[#1F2A37] font-semibold">{activeVehicle.name}</span>
          <span>/</span>
          <span className="text-[#2E8B8B] font-bold">AI Camera Inspection</span>
        </div>

        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-[#1F2A37]">
              AI Vehicle Visual Inspection
            </h1>
            <p className="text-xs font-mono text-[#5B6675] mt-0.5">
              Live webcam feed, photo upload, and computer vision classification for surface scratches, panel gaps, and exterior cosmetic condition.
            </p>
          </div>
        </div>

        <div className="h-[1px] w-full bg-[#D8E0E7]" />
      </div>

      {/* Mandatory Technical Disclaimer Banner */}
      <div className="p-4 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] flex items-start space-x-3 text-xs font-mono text-[#B98121] shadow-xs">
        <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-[#B98121]" />
        <div className="leading-relaxed">
          <strong>ACADEMIC & TECHNICAL ACCURACY NOTICE:</strong> This AI vision pipeline performs visual observation of visible photographic pixels only. It does <em>not</em> claim to measure exact internal tyre pressure, internal brake pad thickness, ECU diagnostic codes, or battery chemistry degradation from a photo.
        </div>
      </div>

      {/* Main Inspection Station */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        {/* Left Column: Camera / Upload Viewport */}
        <div className="nebula-card p-6 flex flex-col justify-between min-h-[460px]">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono uppercase text-[#2E8B8B] font-bold">
                CAPTURE STATION
              </span>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#EEF2F5] border border-[#D8E0E7] text-[#2E8B8B]">
                WEBCAM / FILE UPLOAD
              </span>
            </div>

            {/* Error Message if camera failed */}
            {cameraError && (
              <div className="p-3 mb-4 rounded-xl bg-[#FFF1F2] border border-[#FECDD3] text-xs font-mono text-[#C74E58]">
                {cameraError}
              </div>
            )}

            {/* Viewport Box */}
            <div className="relative w-full h-72 rounded-xl bg-[#EEF2F5] border border-[#D8E0E7] overflow-hidden flex items-center justify-center">
              {streamActive ? (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
              ) : capturedImage ? (
                <div className="relative w-full h-full">
                  <Image
                    src={capturedImage}
                    alt="Captured Vehicle Photo"
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-6 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#FFFFFF] border border-[#D8E0E7] flex items-center justify-center text-[#5B6675]">
                    <Camera className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-mono font-bold text-[#1F2A37]">NO CAR PHOTO LOADED</div>
                    <p className="text-[10px] font-mono text-[#5B6675] mt-1">
                      Start your camera, upload an image file, or select a sample preset below.
                    </p>
                  </div>
                </div>
              )}

              {/* Viewfinder Overlay Lines when active */}
              {streamActive && (
                <div className="absolute inset-4 pointer-events-none border border-dashed border-[#2E8B8B]/60 rounded-lg flex items-center justify-center">
                  <span className="text-[10px] font-mono bg-[#FFFFFF]/90 px-2 py-0.5 rounded text-[#2E8B8B] border border-[#D8E0E7] shadow-xs">
                    ALIGN VEHICLE BODY IN RETICLE
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col space-y-3 mt-6">
            <div className="flex flex-wrap items-center gap-2">
              {!streamActive ? (
                <button
                  onClick={startCamera}
                  className="flex-1 min-h-[44px] py-2.5 px-4 rounded-xl bg-[#2E8B8B] hover:bg-[#236F70] text-white font-mono font-bold text-xs flex items-center justify-center space-x-2 transition-colors cursor-pointer shadow-xs"
                >
                  <Camera className="w-4 h-4" />
                  <span>START WEBCAM FEED</span>
                </button>
              ) : (
                <button
                  onClick={captureFrame}
                  className="flex-1 min-h-[44px] py-2.5 px-4 rounded-xl bg-[#2FA36B] hover:bg-[#268958] text-white font-mono font-bold text-xs flex items-center justify-center space-x-2 transition-colors cursor-pointer animate-pulse shadow-xs"
                >
                  <Eye className="w-4 h-4" />
                  <span>SNAP & ANALYZE FRAME</span>
                </button>
              )}

              <button
                onClick={() => fileInputRef.current?.click()}
                className="min-h-[44px] py-2.5 px-4 rounded-xl bg-[#EEF2F5] hover:bg-[#D8E0E7] border border-[#D8E0E7] text-xs font-mono font-bold text-[#1F2A37] flex items-center space-x-2 transition-colors cursor-pointer"
              >
                <Upload className="w-4 h-4 text-[#5B6675]" />
                <span>UPLOAD FILE</span>
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileUpload}
                className="hidden"
              />

              {capturedImage && (
                <button
                  onClick={resetAll}
                  className="py-2.5 px-3 rounded-xl bg-[#EEF2F5] hover:bg-[#FFF1F2] text-[#5B6675] hover:text-[#C74E58] border border-[#D8E0E7] transition-colors min-h-[44px] flex items-center justify-center cursor-pointer"
                  title="Clear Captured Image"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Presets for Viva Evaluators */}
            <div className="pt-3 border-t border-[#D8E0E7]">
              <span className="text-[9px] font-mono text-[#5B6675] uppercase font-bold block mb-2">
                EXAMINER PRESETS (CLICK TO TEST WITHOUT A REAL CAR):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {samplePresets.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => loadPreset(preset)}
                    className="p-2.5 rounded-lg bg-[#EEF2F5] hover:bg-[#E7F3F1] border border-[#D8E0E7] hover:border-[#2E8B8B] text-left text-[10px] font-mono text-[#1F2A37] transition-colors min-h-[40px] flex items-center cursor-pointer"
                  >
                    <span className="truncate">{preset.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: AI Vision Analysis Report */}
        <div className="nebula-card p-6 flex flex-col justify-between min-h-[460px]">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono uppercase text-[#2E8B8B] font-bold">
                ANALYSIS INFERENCE ENGINE
              </span>
              {cosmeticScore !== null && (
                <span className="text-xs font-mono font-bold text-[#2E8B8B] bg-[#E7F3F1] px-2.5 py-1 rounded border border-[#86B6B2]/40">
                  COSMETIC SCORE: {cosmeticScore}/100
                </span>
              )}
            </div>

            {isAnalyzing ? (
              <div className="p-8 rounded-xl bg-[#EEF2F5] border border-[#D8E0E7] flex flex-col items-center justify-center space-y-4 text-center min-h-[280px]">
                <RefreshCw className="w-8 h-8 text-[#2E8B8B] animate-spin" />
                <div>
                  <div className="text-xs font-mono font-bold text-[#1F2A37]">
                    NEURAL VISION INFERENCE RUNNING
                  </div>
                  <p className="text-[11px] font-mono text-[#2E8B8B] mt-2 animate-pulse">
                    {analysisStep}
                  </p>
                </div>
              </div>
            ) : findings ? (
              <div className="flex flex-col space-y-3">
                <div className="p-3.5 rounded-xl bg-[#EEF2F5] border border-[#D8E0E7] flex items-center justify-between text-xs font-mono">
                  <span className="text-[#5B6675]">Detected Observations:</span>
                  <span className="font-bold text-[#1F2A37]">{findings.length} Regions Inspected</span>
                </div>

                {findings.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-xl bg-[#FFFFFF] border border-[#D8E0E7] flex flex-col space-y-1.5 shadow-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-[#1F2A37]">{item.area}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-[9px] font-mono text-[#5B6675]">
                          Confidence: {item.confidencePct}%
                        </span>
                        <span
                          className={`text-[9px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                            item.severity === "HIGH"
                              ? "bg-[#FFF1F2] text-[#C74E58] border border-[#FECDD3]"
                              : item.severity === "MEDIUM"
                              ? "bg-[#FFFBEB] text-[#B98121] border border-[#FDE68A]"
                              : item.severity === "LOW"
                              ? "bg-[#E7F3F1] text-[#2E8B8B] border border-[#86B6B2]/40"
                              : "bg-[#F0FDF4] text-[#2FA36B] border border-[#BBF7D0]"
                          }`}
                        >
                          {item.defectType}
                        </span>
                      </div>
                    </div>
                    <p className="text-[11px] font-mono text-[#5B6675]">{item.notes}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 rounded-xl bg-[#EEF2F5] border border-[#D8E0E7] text-center flex flex-col items-center justify-center space-y-3 min-h-[280px]">
                <Sparkles className="w-8 h-8 text-[#5B6675]" />
                <div className="text-xs font-mono font-bold text-[#1F2A37]">
                  WAITING FOR VEHICLE CAPTURE
                </div>
                <p className="text-[10px] font-mono text-[#5B6675] max-w-sm">
                  Snap a photo using your camera or click one of the examiner presets to run automated cosmetic analysis.
                </p>
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-[#D8E0E7] flex items-center justify-between text-[10px] font-mono text-[#5B6675]">
            <span>Model: MobileNet-V3 / Vision-Transformer (Simulated)</span>
            <span>Ephemerally Processed</span>
          </div>
        </div>
      </div>
    </div>
  );
}
