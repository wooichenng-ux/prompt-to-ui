"use client";

import { useEffect, useState } from "react";

const shimmer =
  "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.6s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent";

const lineWidths = [40, 65, 55, 80, 70, 45, 75, 60, 85, 50, 68, 35, 72, 58];

export function CodeSkeleton() {
  return (
    <div className="space-y-3 p-5" aria-hidden>
      {lineWidths.map((width, i) => (
        <div
          key={i}
          className={`h-3 rounded bg-white/[0.06] ${shimmer}`}
          style={{ width: `${width}%`, marginLeft: i % 4 === 0 ? 0 : 20 }}
        />
      ))}
    </div>
  );
}

const steps = [
  "Reading your description…",
  "Sketching the layout…",
  "Writing React components…",
  "Applying Tailwind styles…",
  "Polishing the details…",
];

export function PreviewSkeleton() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setStep((s) => Math.min(s + 1, steps.length - 1)), 3500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 p-8" role="status">
      <div className="relative h-12 w-12">
        <div className="absolute inset-0 rounded-full border-2 border-white/10" />
        <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-violet-400" />
      </div>
      <p key={step} className="animate-pulse text-sm text-zinc-400">
        {steps[step]}
      </p>
      <div className="w-full max-w-sm space-y-3" aria-hidden>
        <div className={`h-24 rounded-xl bg-white/[0.05] ${shimmer}`} />
        <div className="flex gap-3">
          <div className={`h-10 flex-1 rounded-lg bg-white/[0.05] ${shimmer}`} />
          <div className={`h-10 flex-1 rounded-lg bg-white/[0.05] ${shimmer}`} />
        </div>
      </div>
    </div>
  );
}
