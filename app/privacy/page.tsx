import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | OMA-AI",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#050510] text-white font-exo2">
      <div className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-orbitron text-4xl font-bold mb-8">
            Privacy Policy
          </h1>
          <div className="prose prose-invert">
            <p className="text-gray-300 mb-6">Last updated: February 2026</p>

            <h2 className="text-xl font-bold text-white mt-8 mb-4">
              Data Collection
            </h2>
            <p className="text-gray-400">
              OMA-AI collects minimal data necessary to provide API services. We
              do not sell or share your data with third parties.
            </p>

            <h2 className="text-xl font-bold text-white mt-8 mb-4">
              Payment Information
            </h2>
            <p className="text-gray-400">
              All payments are processed via blockchain (Base network). We do
              not store payment credentials.
            </p>

            <h2 className="text-xl font-bold text-white mt-8 mb-4">
              API Usage
            </h2>
            <p className="text-gray-400">
              We track API usage for billing and service improvement. Call
              statistics are anonymized.
            </p>

            <h2 className="text-xl font-bold text-white mt-8 mb-4">Contact</h2>
            <p className="text-gray-400">
              For privacy inquiries: frankie@agentmail.to
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
