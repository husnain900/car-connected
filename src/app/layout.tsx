import type { Metadata, Viewport } from "next";
import "./globals.css";
import SimulationProvider from "@/components/SimulationProvider";
import AppNavigation from "@/components/AppNavigation";
import AppFooter from "@/components/AppFooter";

export const metadata: Metadata = {
  title: "NEBULA DRIVE // Connected Vehicle Telemetry & Diagnostics Platform",
  description:
    "Next-generation connected vehicle digital twin, predictive TPMS, OBD-II diagnostics, AI camera inspection, and trip analytics. Final-year engineering project by Zainab Amanat (M245008).",
  authors: [{ name: "Zainab Amanat", url: "Roll No: M245008" }],
  creator: "Zainab Amanat (M245008)",
  applicationName: "Nebula Drive Vehicle OS",
  keywords: [
    "Nebula Drive",
    "Connected Vehicle",
    "Vehicle Telemetry",
    "Digital Twin",
    "TPMS Diagnostics",
    "AI Car Inspection",
    "Zainab Amanat",
    "M245008",
  ],
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#F6F8FA",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased bg-[#F6F8FA] text-[#1F2A37]" suppressHydrationWarning>
      <head>
        <meta name="author" content="Zainab Amanat - Roll No: M245008" />
        <meta name="developer" content="Zainab Amanat (Roll No: M245008)" />
      </head>
      <body className="min-h-full flex flex-col bg-[#F6F8FA] text-[#1F2A37] selection:bg-[#E7F3F1] selection:text-[#2E8B8B] overflow-x-hidden pb-20 md:pb-0 font-sans">
        <SimulationProvider>
          <AppNavigation />
          <div className="flex-1 flex flex-col w-full max-w-full overflow-x-hidden">{children}</div>
          <AppFooter />
        </SimulationProvider>
      </body>
    </html>
  );
}
