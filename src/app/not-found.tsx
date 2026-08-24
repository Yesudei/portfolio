import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg)] text-[var(--text)] px-6 text-center">
      <p className="font-mono text-xs tracking-[0.25em] text-[var(--muted)] uppercase mb-4">404</p>
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight uppercase mb-4" style={{ fontFamily: "var(--font-display)" }}>
        Page not found
      </h1>
      <p className="text-[var(--muted)] max-w-md mb-8">The page you’re looking for doesn’t exist or was moved.</p>
      <Link
        href="/"
        className="font-mono text-xs tracking-[0.15em] uppercase border border-[rgba(245,240,235,0.2)] px-8 py-4 hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
      >
        Go home →
      </Link>
    </main>
  );
}
