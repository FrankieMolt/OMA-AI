"use client";

import { useState } from "react";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      // In production, call Supabase to add to newsletter
      // await supabase.from('newsletter').insert({ email });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setStatus("success");
      setMessage("Thanks for subscribing! 🎉");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="glass-card p-8 rounded-xl">
      <h3 className="text-xl font-bold mb-2">Stay Updated</h3>
      <p className="text-zinc-400 text-sm mb-4">
        Get the latest API additions, features, and updates delivered to your
        inbox.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="input-field"
          disabled={status === "loading" || status === "success"}
        />
        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className={`w-full py-3 rounded-xl font-semibold transition-all ${
            status === "success"
              ? "bg-green-500/20 text-green-400 border border-green-500/30"
              : status === "error"
                ? "bg-red-500/20 text-red-400 border border-red-500/30"
                : "btn-primary"
          }`}
        >
          {status === "loading" ? (
            <span className="flex items-center justify-center gap-2">
              <span className="loading-spinner w-5 h-5"></span>
              Subscribing...
            </span>
          ) : status === "success" ? (
            "✓ Subscribed"
          ) : status === "error" ? (
            "Try Again"
          ) : (
            "Subscribe"
          )}
        </button>
      </form>
      {message && (
        <p
          className={`text-sm mt-2 ${status === "success" ? "text-green-400" : "text-red-400"}`}
        >
          {message}
        </p>
      )}
      <p className="text-xs text-zinc-600 mt-4">
        🔒 We respect your privacy. Unsubscribe at any time.
      </p>
    </div>
  );
}
