import type { Metadata, Viewport } from "next";
import { Inter, Orbitron, Exo_2 } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});
const exo2 = Exo_2({
  subsets: ["latin"],
  variable: "--font-exo2",
  display: "swap",
});

export const metadata: Metadata = {
  title: "OMA-AI | Open Market Access for AI Agents",
  description:
    "The premier API marketplace for AI agents with x402 micropayments",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${orbitron.variable} ${exo2.variable} antialiased bg-[#050510] text-white`}
      >
        {children}
      </body>
    </html>
  );
}
