import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nebula Connected // Vehicle Performance Dashboard — Zainab Amanat (M245008)",
  description:
    "Next-generation enterprise vehicle telemetry and remote operations system. Designed & Engineered by Zainab Amanat (Roll No: M245008).",
  authors: [{ name: "Zainab Amanat", url: "Roll No: M245008" }],
  creator: "Zainab Amanat (M245008)",
  applicationName: "Nebula Connected Vehicle OS",
  keywords: [
    "Vehicle Telemetry",
    "Connected Car",
    "Automotive Dashboard",
    "Nebula OS",
    "Zainab Amanat",
    "M245008",
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#000000",
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
      <body className="min-h-full flex flex-col bg-bg-base text-text-base selection:bg-neon-cyan/20 selection:text-neon-cyan">
        {children}
      </body>
    </html>
  );
}
