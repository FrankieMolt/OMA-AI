import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact OMA-AI | Support & Partnership Inquiries",
  description:
    "Get in touch with the OMA-AI team for support, partnership inquiries, or questions about our agent marketplace and x402 payment infrastructure.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
