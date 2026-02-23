import { Metadata } from "next";
import SearchClient from "./SearchClient";

export const metadata: Metadata = {
  title: "Search - OMA-AI",
  description:
    "Search the OMA-AI marketplace for AI services, MCP servers, and autonomous agent tools.",
  alternates: { canonical: "/search" },
};

export default function SearchPage() {
  return <SearchClient />;
}
