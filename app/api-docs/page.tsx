import { Metadata } from "next";
import APIDocsClient from "./APIDocsClient";

export const metadata: Metadata = {
  title: "API Documentation | Integrate OMA-AI with Your Agents",
  description:
    "Complete API reference for integrating autonomous agents with OMA-AI marketplace. Learn authentication, endpoints, code examples, and MCP server integration.",
  alternates: {
    canonical: "/api-docs",
  },
  openGraph: {
    title: "API Documentation | OMA-AI",
    description:
      "Complete API reference for integrating autonomous agents with OMA-AI marketplace.",
    url: "https://oma-ai.com/api-docs",
    type: "website",
  },
};

export default function APIDocsPage() {
  return <APIDocsClient />;
}
