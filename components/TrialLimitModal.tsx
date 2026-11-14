"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { submitBetaSignup } from "@/lib/beta-signup";

type State = "idle" | "submitting" | "success" | "error";

export function TrialLimitModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    input.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKeyDown);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setState("submitting");
    try {
      await submitBetaSignup(email.trim(), "trial-limit-modal");
      setState("success");
    } catch {
      setState("error");
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-4 backdrop-blur-sm sm:items-center"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="trial-limit-title"
        className="relative w-full max-w-md rounded-2xl border border-white/10 bg-zinc-900 p-6 shadow-2xl shadow-violet-950/50 sm:p-8"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 rounded-lg p-2 text-zinc-500 transition hover:bg-white/5 hover:text-zinc-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
        >
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
            <path d="M5 5l10 10M15 5L5 15" />
          </svg>
        </button>

        {state === "success" ? (
          <div className="py-4 text-center" role="status">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-400/10 text-emerald-400">
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6" aria-hidden>
                <path
                  fillRule="evenodd"
                  d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 1 1 1.4-1.4l3.8 3.8 6.8-6.8a1 1 0 0 1 1.4 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h2 id="trial-limit-title" className="mt-4 text-xl font-semibold text-white">
              Thanks! We&apos;ll be in touch.
            </h2>
            <button
              onClick={onClose}
              className="mt-6 rounded-xl border border-white/10 px-4 py-2 text-sm font-medium text-zinc-300 transition hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <p className="font-mono text-xs uppercase tracking-widest text-violet-400">Free trial used</p>
            <h2 id="trial-limit-title" className="mt-2 pr-8 text-2xl font-bold tracking-tight text-white">
              You&apos;ve reached your free limit
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              Enter your email to join the private beta and get unlimited component generations.
            </p>
            <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-2 sm:flex-row">
              <label htmlFor="trial-email" className="sr-only">
                Email address
              </label>
              <input
                ref={input}
                id="trial-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@company.com"
                className="min-w-0 flex-1 rounded-xl border border-white/10 bg-black/40 px-4 py-3 font-mono text-sm text-zinc-100 placeholder:text-zinc-600 transition focus:border-violet-400/60 focus:outline-none focus:ring-2 focus:ring-violet-400/20"
              />
              <button
                type="submit"
                disabled={state === "submitting"}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {state === "submitting" && (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                )}
                Join Beta
              </button>
            </form>
            {state === "error" && (
              <p role="alert" className="mt-3 text-sm text-red-300">
                That didn&apos;t go through. Please try again.
              </p>
            )}
            <button
              onClick={onClose}
              className="mt-4 text-xs text-zinc-500 underline-offset-4 transition hover:text-zinc-300 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
}
