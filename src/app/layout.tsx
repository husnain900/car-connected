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
    icon: "/assets/images/nebula-logo.png",
    shortcut: "/assets/images/nebula-logo.png",
    apple: "/assets/images/nebula-logo.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#091321",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased dark" suppressHydrationWarning>
      <head>
        <meta name="author" content="Zainab Amanat - Roll No: M245008" />
        <meta name="developer" content="Zainab Amanat (Roll No: M245008)" />
      </head>
      <body className="min-h-full flex flex-col bg-[#091321] text-[#F5F8FC] selection:bg-[#79C7FF]/20 selection:text-[#79C7FF]">
        <SimulationProvider>
          <AppNavigation />
          <div className="flex-1 flex flex-col">{children}</div>
          <AppFooter />
        </SimulationProvider>
      </body>
    </html>
  );
}
