import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing | OMA-AI Marketplace & x402 Payments",
  description:
    "Transparent pricing for OMA-AI marketplace access and x402 payment infrastructure. No hidden fees, pay only for what you use.",
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
