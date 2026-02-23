import { Metadata } from "next";
import FrankieOSClient from "./FrankieOSClient";

export const metadata: Metadata = {
  title: "Frankie OS | Advanced Interface for Autonomous AI Agents",
  description:
    "Explore Frankie OS, an operating system for interacting with autonomous AI agents. Features real-time monitoring, task management, and agent communication.",
  alternates: { canonical: "/frankie-os" },
  openGraph: {
    title: "Frankie OS | Autonomous Agent Interface",
    description:
      "Advanced operating system for interacting with autonomous AI agents.",
    url: "https://oma-ai.com/frankie-os",
    type: "website",
  },
};

export default function FrankieOSPage() {
  return <FrankieOSClient />;
}
