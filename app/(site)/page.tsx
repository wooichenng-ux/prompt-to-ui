"use client";

import { FormEvent, KeyboardEvent, useRef, useState } from "react";
import { CodePanel } from "@/components/CodePanel";
import { PreviewPanel } from "@/components/PreviewPanel";
import { CodeSkeleton, PreviewSkeleton } from "@/components/Skeletons";
import { MAX_PROMPT_LENGTH } from "@/lib/prompt";

const examples = [
  "A dark mode pricing table",
  "A login form with social sign-in",
  "A testimonial card carousel",
  "An analytics stat dashboard header",
];

type Status = "idle" | "loading" | "done" | "error";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [tab, setTab] = useState<"code" | "preview">("preview");
  const abort = useRef<AbortController | null>(null);

  async function generate(text: string) {
    const value = text.trim();
    if (!value) return;
    abort.current?.abort();
    const controller = new AbortController();
    abort.current = controller;
    setStatus("loading");
    setError("");
    setNotice("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: value }),
        signal: controller.signal,
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "Something went wrong.");
      setCode(data.code);
      if (data.truncated) setNotice("The response hit the length limit, so the code may be incomplete.");
      setStatus("done");
    } catch (err) {
      if (controller.signal.aborted) return;
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    generate(prompt);
  }

  function onKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) generate(prompt);
  }

  const loading = status === "loading";
  const showWorkspace = loading || Boolean(code);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-zinc-950 text-zinc-100">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[900px] max-w-full -translate-x-1/2 rounded-full bg-violet-600/20 blur-[120px]"
      />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col px-4 pb-10 sm:px-6 lg:px-8">
        <header
          className={`mx-auto w-full max-w-2xl text-center transition-all duration-500 ${
            showWorkspace ? "pt-8" : "pt-[16vh]"
          }`}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-zinc-300">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
            Powered by Claude
          </span>
          <h1
            className={`mt-4 text-balance font-semibold tracking-tight transition-all duration-500 ${
              showWorkspace ? "text-2xl sm:text-3xl" : "text-4xl sm:text-6xl"
            }`}
          >
            Describe it.{" "}
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              See it built.
            </span>
          </h1>
          {!showWorkspace && (
            <p className="mt-4 text-balance text-base text-zinc-400 sm:text-lg">
              Turn a sentence into a live React component styled with Tailwind CSS.
            </p>
          )}

          <form
            onSubmit={onSubmit}
            className="mt-6 rounded-2xl border border-white/10 bg-zinc-900/80 p-2 text-left shadow-2xl shadow-violet-950/40 backdrop-blur transition focus-within:border-violet-400/60"
          >
            <label htmlFor="prompt" className="sr-only">
              Describe a UI component
            </label>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              onKeyDown={onKeyDown}
              maxLength={MAX_PROMPT_LENGTH}
              rows={showWorkspace ? 2 : 3}
              placeholder="A dark mode pricing table with three tiers…"
              className="block w-full resize-none bg-transparent px-3 py-2 text-base text-zinc-100 placeholder:text-zinc-500 focus:outline-none"
            />
            <div className="flex items-center justify-between gap-3 px-1 pb-1">
              <span className="hidden pl-2 text-xs text-zinc-500 sm:block">⌘/Ctrl + Enter to generate</span>
              <button
                type="submit"
                disabled={loading || !prompt.trim()}
                className="ml-auto inline-flex items-center gap-2 rounded-xl bg-violet-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading && (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                )}
                {loading ? "Generating…" : "Generate"}
              </button>
            </div>
          </form>

          {!showWorkspace && (
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {examples.map((example) => (
                <button
                  key={example}
                  type="button"
                  onClick={() => {
                    setPrompt(example);
                    generate(example);
                  }}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-zinc-300 transition hover:border-violet-400/50 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
                >
                  {example}
                </button>
              ))}
            </div>
          )}

          {error && (
            <p role="alert" className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-left text-sm text-red-200">
              {error}
            </p>
          )}
          {notice && (
            <p className="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-left text-sm text-amber-200">
              {notice}
            </p>
          )}
        </header>

        {showWorkspace && (
          <section className="mt-8">
            {/* Tabs replace the split view on small screens */}
            <div className="mb-3 flex gap-1 rounded-xl border border-white/10 bg-white/[0.03] p-1 lg:hidden" role="tablist">
              {(["preview", "code"] as const).map((name) => (
                <button
                  key={name}
                  role="tab"
                  aria-selected={tab === name}
                  onClick={() => setTab(name)}
                  className={`flex-1 rounded-lg px-3 py-1.5 text-sm font-medium capitalize transition ${
                    tab === name ? "bg-white/10 text-white" : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>

            <div className="grid h-[70vh] min-h-[420px] gap-4 lg:grid-cols-2">
              <Panel title="Code" hidden={tab !== "code"}>
                {loading ? <CodeSkeleton /> : <CodePanel code={code} />}
              </Panel>
              <Panel title="Preview" hidden={tab !== "preview"}>
                {loading ? <PreviewSkeleton /> : <PreviewPanel code={code} />}
              </Panel>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

function Panel({ title, hidden, children }: { title: string; hidden: boolean; children: React.ReactNode }) {
  return (
    <div
      className={`min-w-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#011627] lg:flex ${
        hidden ? "hidden" : "flex"
      }`}
    >
      <div className="flex items-center gap-2 border-b border-white/10 bg-black/20 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
        <span className="ml-2 text-xs font-medium uppercase tracking-wider text-zinc-400">{title}</span>
      </div>
      <div className="min-h-0 flex-1">{children}</div>
    </div>
  );
}
