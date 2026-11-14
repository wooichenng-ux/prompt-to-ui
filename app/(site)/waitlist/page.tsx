import { WaitlistForm } from "./WaitlistForm";

const mono = "font-[family-name:var(--font-mono)]";

const points = [
  { label: "01", title: "Describe", body: "Write what you need in plain English. No config, no boilerplate." },
  { label: "02", title: "Generate", body: "Get clean React with Tailwind classes — code you would actually commit." },
  { label: "03", title: "Ship", body: "Preview it live, copy it, paste it into your app. Done before standup." },
];

export default function WaitlistPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#0a0a0b] text-zinc-100">
      {/* Grid backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]"
      />

      <div className="relative mx-auto w-full max-w-5xl px-5 sm:px-8">
        <nav className="flex items-center justify-between py-6">
          <span className={`${mono} text-sm font-semibold tracking-tight`}>
            <span className="text-emerald-400">&gt;</span> prompt-to-ui
          </span>
          <a
            href="#join"
            className={`${mono} rounded-md border border-white/10 px-3 py-1.5 text-xs text-zinc-300 transition hover:border-emerald-400/50 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400`}
          >
            Get access
          </a>
        </nav>

        {/* Hero */}
        <section className="pb-14 pt-12 text-center sm:pt-20">
          <p className={`${mono} inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1 text-xs text-emerald-300`}>
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            Private beta — limited spots
          </p>
          <h1 className="mx-auto mt-6 max-w-3xl text-balance text-4xl font-semibold leading-[1.08] tracking-tight sm:text-6xl">
            Stop wrestling with Tailwind.{" "}
            <span className="text-emerald-400">Generate React components from text.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-balance text-base leading-relaxed text-zinc-400 sm:text-lg">
            Describe the component you need and get clean, responsive React + Tailwind code with a live
            preview — in seconds, not an afternoon of class-name tweaking.
          </p>
          <div className="mx-auto mt-8 max-w-md">
            <WaitlistForm id="hero-email" />
          </div>
        </section>

        {/* The hook: static mockup */}
        <section aria-label="How it works" className="pb-20">
          <div className="grid items-center gap-4 lg:grid-cols-[1fr_auto_1.35fr] lg:gap-6">
            <div className="rounded-xl border border-white/10 bg-zinc-900/70 shadow-2xl shadow-black/50">
              <div className={`${mono} border-b border-white/10 px-4 py-2.5 text-xs text-zinc-500`}>prompt</div>
              <div className="p-4">
                <div className="rounded-lg border border-white/10 bg-black/40 px-3.5 py-3 text-sm text-zinc-200 sm:text-base">
                  A dark mode pricing table
                  <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 animate-pulse bg-emerald-400" />
                </div>
                <div className="mt-3 flex justify-end">
                  <span className={`${mono} rounded-md bg-emerald-400 px-3 py-1.5 text-xs font-semibold text-black`}>
                    Generate ↵
                  </span>
                </div>
              </div>
            </div>

            <div aria-hidden className={`${mono} flex justify-center text-2xl text-emerald-400`}>
              <span className="lg:hidden">↓</span>
              <span className="hidden lg:inline">→</span>
            </div>

            <div className="min-w-0 rounded-xl border border-white/10 bg-zinc-900/70 shadow-2xl shadow-black/50">
              <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className={`${mono} ml-2 text-xs text-zinc-500`}>PricingTable.tsx</span>
              </div>
              <pre className={`${mono} overflow-x-auto p-4 text-[12px] leading-relaxed sm:text-[13px]`}>
                <code>
                  <K>export default function</K> <F>PricingTable</F>() {"{"}
                  {"\n  "}<K>return</K> ({"\n    "}
                  &lt;<T>section</T> <A>className</A>=<S>&quot;bg-zinc-950 py-16 text-white&quot;</S>&gt;{"\n      "}
                  &lt;<T>div</T> <A>className</A>=<S>&quot;grid gap-6 md:grid-cols-3&quot;</S>&gt;{"\n        "}
                  {"{"}plans.<F>map</F>((plan) =&gt; ({"\n          "}
                  &lt;<T>article</T> <A>className</A>=<S>&quot;rounded-2xl border border-white/10 p-8&quot;</S>&gt;{"\n            "}
                  &lt;<T>h3</T>&gt;{"{"}plan.name{"}"}&lt;/<T>h3</T>&gt;{"\n            "}
                  &lt;<T>p</T> <A>className</A>=<S>&quot;text-4xl font-bold&quot;</S>&gt;{"{"}plan.price{"}"}&lt;/<T>p</T>&gt;{"\n            "}
                  &lt;<T>button</T> <A>className</A>=<S>&quot;mt-6 w-full rounded-lg bg-emerald-400&quot;</S>&gt;{"\n              "}
                  Get started{"\n            "}
                  &lt;/<T>button</T>&gt;{"\n          "}
                  &lt;/<T>article</T>&gt;{"\n        "}
                  )){"}"}{"\n      "}
                  &lt;/<T>div</T>&gt;{"\n    "}
                  &lt;/<T>section</T>&gt;{"\n  "}
                  );{"\n"}
                  {"}"}
                </code>
              </pre>
            </div>
          </div>
        </section>

        {/* Value points */}
        <section className="grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-3">
          {points.map((point) => (
            <div key={point.label} className="bg-[#0a0a0b] p-6">
              <p className={`${mono} text-xs text-emerald-400`}>{point.label}</p>
              <h2 className="mt-2 text-lg font-semibold">{point.title}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">{point.body}</p>
            </div>
          ))}
        </section>

        {/* Call to action */}
        <section id="join" className="scroll-mt-8 py-20 text-center sm:py-28">
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Be first to try it.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-balance text-zinc-400">
            We&apos;re letting developers in gradually. Drop your email and we&apos;ll send your invite.
          </p>
          <div className="mx-auto mt-8 max-w-md">
            <WaitlistForm id="cta-email" />
          </div>
        </section>

        <footer className={`${mono} border-t border-white/10 py-6 text-center text-xs text-zinc-600`}>
          prompt-to-ui · built for people who ship
        </footer>
      </div>
    </main>
  );
}

// Tiny token helpers for the hand-highlighted mock code.
const K = ({ children }: { children: React.ReactNode }) => <span className="text-violet-400">{children}</span>;
const F = ({ children }: { children: React.ReactNode }) => <span className="text-sky-300">{children}</span>;
const T = ({ children }: { children: React.ReactNode }) => <span className="text-rose-400">{children}</span>;
const A = ({ children }: { children: React.ReactNode }) => <span className="text-amber-300">{children}</span>;
const S = ({ children }: { children: React.ReactNode }) => <span className="text-emerald-300">{children}</span>;
