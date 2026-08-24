"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg)] text-[var(--text)] px-6 text-center">
      <p className="font-mono text-xs tracking-[0.25em] text-[var(--muted)] uppercase mb-4">Error</p>
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight uppercase mb-4" style={{ fontFamily: "var(--font-display)" }}>
        Something went wrong
      </h1>
      <p className="text-[var(--muted)] max-w-md mb-8">An unexpected error occurred. Try again.</p>
      <button
        onClick={() => reset()}
        className="font-mono text-xs tracking-[0.15em] uppercase border border-[rgba(245,240,235,0.2)] px-8 py-4 hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
      >
        Try again
      </button>
    </main>
  );
}
