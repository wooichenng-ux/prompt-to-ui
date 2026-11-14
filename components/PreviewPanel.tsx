"use client";

import { useEffect, useRef, useState } from "react";

export function PreviewPanel({ code }: { code: string }) {
  const frame = useRef<HTMLIFrameElement>(null);
  const [ready, setReady] = useState(false);

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

  return (
    <iframe
      ref={frame}
      src="/preview"
      title="Live component preview"
      sandbox="allow-scripts"
      className="h-full w-full bg-white"
    />
  );
}
