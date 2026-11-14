"use client";

import { useEffect, useRef, useState } from "react";

export type PreviewMode = "desktop" | "mobile";

const DESKTOP_WIDTH = 1280;
const MOBILE_WIDTH = 390;

export function PreviewPanel({ code, mode }: { code: string; mode: PreviewMode }) {
  const frame = useRef<HTMLIFrameElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    function onMessage(event: MessageEvent) {
      if (event.source === frame.current?.contentWindow && event.data?.type === "preview:ready") {
        setReady(true);
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  useEffect(() => {
    if (!ready) return;
    // The sandboxed frame has an opaque origin, so "*" is the only usable target.
    frame.current?.contentWindow?.postMessage({ type: "preview:code", code }, "*");
  }, [ready, code]);

  useEffect(() => {
    const element = container.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => {
      setSize({ width: entry.contentRect.width, height: entry.contentRect.height });
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // Render the frame at a real device width, then scale it down to fit the panel,
  // so responsive breakpoints in the generated component behave as they would on that device.
  const frameWidth = mode === "desktop" ? DESKTOP_WIDTH : Math.min(MOBILE_WIDTH, size.width || MOBILE_WIDTH);
  const scale = size.width ? Math.min(1, size.width / frameWidth) : 1;

  return (
    <div ref={container} className="flex h-full w-full justify-center overflow-hidden bg-zinc-900">
      <iframe
        ref={frame}
        src="/preview"
        title="Live component preview"
        sandbox="allow-scripts"
        className="shrink-0 origin-top bg-white"
        style={{
          width: frameWidth,
          height: size.height ? size.height / scale : "100%",
          transform: `scale(${scale})`,
          marginInline: (frameWidth * (scale - 1)) / 2,
        }}
      />
    </div>
  );
}
