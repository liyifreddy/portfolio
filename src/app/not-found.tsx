import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found — Yi Li",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#0F0F18] px-4 text-center text-white">
      <p className="text-sm font-semibold tracking-[0.3em] text-[#D2A554]">
        404
      </p>
      <h1 className="mt-4 bg-gradient-to-r from-[#D2A554] to-[#C8954D] bg-clip-text py-2 text-4xl font-bold leading-tight text-transparent md:text-6xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-gray-300">
        This page does not exist. Everything lives on the front page.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="rounded-lg bg-[#D2A554] px-5 py-2.5 font-semibold text-[#0F0F18] transition-colors hover:bg-[#E5BE73]"
        >
          Back to home
        </Link>
        <Link
          href="/#publications"
          className="rounded-lg border border-white/20 px-5 py-2.5 text-gray-300 transition-colors hover:border-[#D2A554] hover:text-[#D2A554]"
        >
          Publications
        </Link>
      </div>
    </main>
  );
}
