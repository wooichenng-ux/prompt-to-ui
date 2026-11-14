"use client";

import { FormEvent, useState } from "react";
import { submitBetaSignup } from "@/lib/beta-signup";

const mono = "font-[family-name:var(--font-mono)]";

export function WaitlistForm({ id }: { id: string }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [failed, setFailed] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    // Painted door: always log so signups can be verified locally.
    console.log("[waitlist] signup:", email.trim());
    // Also goes to Formspree when NEXT_PUBLIC_FORMSPREE_ENDPOINT is set.
    try {
      await submitBetaSignup(email.trim(), "waitlist-page");
      setSubmitted(true);
    } catch {
      setFailed(true);
    }
  }

  if (submitted) {
    return (
      <div
        role="status"
        className="flex items-center justify-center gap-3 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3.5 text-emerald-200"
      >
        <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 shrink-0" aria-hidden>
          <path
            fillRule="evenodd"
            d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 1 1 1.4-1.4l3.8 3.8 6.8-6.8a1 1 0 0 1 1.4 0Z"
            clipRule="evenodd"
          />
        </svg>
        <span className="font-medium">Thanks! You&apos;re on the list.</span>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col flex-wrap gap-2 sm:flex-row">
      <label htmlFor={id} className="sr-only">
        Email address
      </label>
      <input
        id={id}
        type="email"
        required
        autoComplete="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="you@company.com"
        className={`${mono} min-w-0 flex-1 rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 transition focus:border-emerald-400/60 focus:outline-none focus:ring-2 focus:ring-emerald-400/20`}
      />
      <button
        type="submit"
        className="whitespace-nowrap rounded-xl bg-emerald-400 px-5 py-3 text-sm font-semibold text-black transition hover:bg-emerald-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200 active:scale-[0.98]"
      >
        Join the Private Beta
      </button>
      {failed && (
        <p role="alert" className="w-full text-sm text-red-300">
          That didn&apos;t go through. Please try again.
        </p>
      )}
    </form>
  );
}
