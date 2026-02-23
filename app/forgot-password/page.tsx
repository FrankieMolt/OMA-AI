import { Metadata } from "next";
import ForgotPasswordClient from "./ForgotPasswordClient";

export const metadata: Metadata = {
  title: "Reset Your Password | OMA-AI Account Recovery",
  description:
    "Reset your OMA-AI password to regain access to your account, API keys, and autonomous agent dashboard.",
  alternates: { canonical: "/forgot-password" },
  openGraph: {
    title: "Reset Password | OMA-AI",
    description: "Reset your OMA-AI password to regain access to your account.",
    url: "https://oma-ai.com/forgot-password",
    type: "website",
  },
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordClient />;
}
