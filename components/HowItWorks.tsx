"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Rocket,
  DollarSign,
  Zap,
  ArrowRight,
  Code2,
  Globe,
  TrendingUp,
  CheckCircle2,
  Lock,
  Wallet,
  GitBranch,
} from "lucide-react";

export default function HowItWorksSection() {
  const steps = [
    {
      icon: Rocket,
      title: "Build API",
      description:
        "Create your API or MCP server with our SDK. Add pricing, documentation, and deploy to any platform.",
      details: [
        "Open API specification",
        "Flexible pricing models",
        "Instant deployment",
        "Auto-generated docs",
      ],
      color: "purple",
    },
    {
      icon: Globe,
      title: "Deploy & Price",
      description:
        "List your API in our marketplace. Set per-call pricing, manage access keys, and monitor performance.",
      details: [
        "One-click publishing",
        "Real-time analytics",
        "Flexible access control",
        "Usage-based billing",
      ],
      color: "blue",
    },
    {
      icon: DollarSign,
      title: "Earn Per Call",
      description:
        "Receive automatic crypto payments via x402 on every API call. Get paid instantly, transparently, and reliably.",
      details: [
        "Instant settlement",
        "Transparent payouts",
        "Multi-chain support",
        "No chargebacks",
      ],
      color: "green",
    },
  ];

  const benefits = [
    {
      icon: CheckCircle2,
      title: "Quick Integration",
      description:
        "Get started in minutes with our SDK and extensive documentation",
    },
    {
      icon: Lock,
      title: "Secure Payments",
      description: "x402 protocol ensures secure, trustless transactions",
    },
    {
      icon: Wallet,
      title: "Instant Payouts",
      description:
        "Receive payments automatically on every successful API call",
    },
    {
      icon: TrendingUp,
      title: "Grow Revenue",
      description: "Scale your API business with built-in marketplace exposure",
    },
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-zinc-950 via-zinc-950 to-zinc-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 text-purple-400 rounded-full text-sm font-medium mb-6">
            <Rocket size={16} />
            Simple 3-Step Process
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
            Turn your API into a revenue stream in three simple steps
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 -right-4 w-8 border-t-2 border-dashed border-zinc-700" />
              )}

              {/* Step Card */}
              <div className="glass-card p-8 rounded-2xl h-full">
                {/* Step Number */}
                <div className="absolute -top-4 left-8">
                  <div
                    className={`w-8 h-8 rounded-lg bg-gradient-to-br ${
                      step.color === "purple"
                        ? "from-purple-500 to-purple-600"
                        : step.color === "blue"
                          ? "from-blue-500 to-blue-600"
                          : "from-green-500 to-green-600"
                    } flex items-center justify-center text-white font-bold shadow-lg`}
                  >
                    {index + 1}
                  </div>
                </div>

                {/* Icon */}
                <div
                  className={`w-16 h-16 rounded-xl bg-${
                    step.color === "purple"
                      ? "purple"
                      : step.color === "blue"
                        ? "blue"
                        : "green"
                  }-500/20 flex items-center justify-center mb-6 mt-4`}
                >
                  <step.icon
                    size={32}
                    className={`text-${
                      step.color === "purple"
                        ? "purple"
                        : step.color === "blue"
                          ? "blue"
                          : "green"
                    }-400`}
                  />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-zinc-400 mb-6">{step.description}</p>

                {/* Details */}
                <ul className="space-y-2">
                  {step.details.map((detail, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-sm text-zinc-500"
                    >
                      <CheckCircle2 size={14} className="text-green-500" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-white text-center mb-8">
            Why Choose OMA-AI?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-all"
              >
                <benefit.icon className="text-purple-400 mb-4" size={28} />
                <h4 className="text-lg font-semibold text-white mb-2">
                  {benefit.title}
                </h4>
                <p className="text-sm text-zinc-400">{benefit.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-12 rounded-2xl text-center"
        >
          <div className="max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Start Earning?
            </h3>
            <p className="text-zinc-400 mb-8">
              Join thousands of developers monetizing their APIs on OMA-AI
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/developers"
                className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-medium"
              >
                <Code2 size={18} />
                Get Started
              </a>
              <a
                href="/docs"
                className="btn-secondary inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-medium"
              >
                <GitBranch size={18} />
                Read Docs
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Compact version for smaller spaces
export function HowItWorksCompact() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {[
        { icon: Rocket, label: "Build" },
        { icon: Globe, label: "Deploy" },
        { icon: DollarSign, label: "Earn" },
      ].map((item, i) => (
        <div key={i} className="text-center p-4">
          <item.icon className="text-purple-400 mx-auto mb-2" size={24} />
          <div className="text-sm font-medium text-white">{item.label}</div>
        </div>
      ))}
    </div>
  );
}
