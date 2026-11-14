"use client";

import Script from "next/script";
import * as React from "react";
import { LiveError, LivePreview, LiveProvider } from "react-live";

const scope = {
  React,
  useState: React.useState,
  useEffect: React.useEffect,
  useMemo: React.useMemo,
  useRef: React.useRef,
  useCallback: React.useCallback,
  useReducer: React.useReducer,
};

/**
 * Loaded inside a sandboxed iframe (no same-origin access), so generated code
 * cannot touch the host app's DOM, cookies or storage. Code arrives by postMessage.
 */
export default function PreviewFrame() {
  const [code, setCode] = React.useState("");

  React.useEffect(() => {
    function onMessage(event: MessageEvent) {
      if (event.source !== window.parent) return;
      if (event.data?.type === "preview:code" && typeof event.data.code === "string") {
        setCode(event.data.code);
      }
    }
    window.addEventListener("message", onMessage);
    window.parent.postMessage({ type: "preview:ready" }, "*");
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <>
      {/* Generated class names are unknown at build time, so Tailwind's browser build
          (self-hosted from public/, copied there on npm install) compiles them at runtime. */}
      <Script src="/tailwind-browser.js" strategy="afterInteractive" />
      {code && (
        <LiveProvider code={code} scope={scope} noInline>
          <div style={{ minHeight: "100vh" }}>
            <LivePreview />
          </div>
          <LiveError style={{ position: "fixed", insetInline: 0, bottom: 0, margin: 0, maxHeight: "50vh", overflow: "auto", whiteSpace: "pre-wrap", background: "#450a0a", color: "#fecaca", padding: 16, font: "12px ui-monospace, monospace" }} />
        </LiveProvider>
      )}
    </>
  );
}
