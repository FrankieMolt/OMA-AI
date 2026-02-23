"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Lock, Mail, User, Shield, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    agree: false,
  });
  const [loading, setLoading] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate signup
    setTimeout(() => {
      window.location.href = "/marketplace";
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-memoria-bg-ultra-dark flex items-center justify-center p-6 selection:bg-memoria-text-hero selection:text-memoria-bg-ultra-dark">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-3 no-underline group mb-8"
          >
            <div className="w-10 h-10 bg-memoria-bg-surface border border-memoria-border-default rounded-sm flex items-center justify-center group-hover:border-memoria-text-hero transition-colors">
              <Shield size={20} className="text-memoria-text-hero" />
            </div>
            <span className="text-2xl font-light text-memoria-text-hero tracking-tighter font-display">
              OMA SYSTEMS
            </span>
          </Link>
          <h1 className="text-3xl font-light text-memoria-text-hero tracking-tight mb-2 font-display">
            Create Account
          </h1>
          <p className="text-memoria-text-whisper text-sm">
            Join the decentralized autonomous workforce.
          </p>
        </div>

        <Card className="bg-memoria-bg-card border-memoria-border-muted rounded-sm">
          <CardContent className="p-8">
            <form
              onSubmit={handleSignup}
              className="space-y-5"
              aria-label="Signup form"
            >
              <div className="space-y-2">
                <label
                  htmlFor="signup-name"
                  className="text-[10px] uppercase tracking-widest text-memoria-text-meta font-medium ml-1"
                >
                  Full Name
                </label>
                <div className="relative">
                  <User
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-memoria-text-meta"
                    size={16}
                  />
                  <input
                    type="text"
                    id="signup-name"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-3 bg-memoria-bg-ultra-dark border border-memoria-border-default rounded-sm text-memoria-text-hero text-sm focus:outline-none focus:border-memoria-text-hero transition-all placeholder-memoria-text-whisper"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="signup-email"
                  className="text-[10px] uppercase tracking-widest text-memoria-text-meta font-medium ml-1"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-memoria-text-meta"
                    size={16}
                  />
                  <input
                    type="email"
                    id="signup-email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-3 bg-memoria-bg-ultra-dark border border-memoria-border-default rounded-sm text-memoria-text-hero text-sm focus:outline-none focus:border-memoria-text-hero transition-all placeholder-memoria-text-whisper"
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="signup-password"
                  className="text-[10px] uppercase tracking-widest text-memoria-text-meta font-medium ml-1"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-memoria-text-meta"
                    size={16}
                  />
                  <input
                    type="password"
                    id="signup-password"
                    required
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-3 bg-memoria-bg-ultra-dark border border-memoria-border-default rounded-sm text-memoria-text-hero text-sm focus:outline-none focus:border-memoria-text-hero transition-all placeholder-memoria-text-whisper"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="flex items-start gap-3 px-1 py-2">
                <input
                  type="checkbox"
                  required
                  id="agree"
                  className="mt-1 accent-white"
                  checked={formData.agree}
                  onChange={(e) =>
                    setFormData({ ...formData, agree: e.target.checked })
                  }
                />
                <label
                  htmlFor="agree"
                  className="text-[10px] text-memoria-text-whisper leading-relaxed"
                >
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="text-memoria-text-hero hover:underline"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-memoria-text-hero hover:underline"
                  >
                    Privacy Policy
                  </Link>
                  .
                </label>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-memoria-text-hero text-memoria-bg-ultra-dark hover:bg-memoria-text-secondary h-12 rounded-sm text-xs font-bold uppercase tracking-widest"
              >
                {loading ? "Initializing Agent..." : "Create Account"}
              </Button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-memoria-border-muted"></span>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-widest">
                <span className="bg-memoria-bg-card px-2 text-memoria-text-meta">
                  Join via
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full border-memoria-border-muted text-memoria-text-secondary hover:bg-memoria-bg-surface hover:text-memoria-text-hero h-12 rounded-sm text-xs font-bold uppercase tracking-widest"
            >
              <Github size={16} className="mr-2" /> GitHub
            </Button>
          </CardContent>
        </Card>

        <div className="mt-8 text-center max-w-xs mx-auto">
          <p className="text-[11px] uppercase tracking-widest text-memoria-text-meta mb-4">
            Already registered?{" "}
            <Link
              href="/login"
              className="text-memoria-text-hero hover:underline transition-all"
            >
              Sign In
            </Link>
          </p>
          <p className="text-xs text-memoria-text-whisper leading-relaxed">
            Deploy agents that can earn revenue, pay for services, and
            participate in the open economy.
          </p>
        </div>
      </div>
    </div>
  );
}
