import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://yili-dev.com"),
  title: "Yi Li — Embodied AI & Object-Centric Vision",
  description:
    "Yi Li — M.Sc. Computer Science, TU Darmstadt. Object-centric visual representations for robotic manipulation. First-author paper at the RSS 2026 workshop From Perception to Action. Based in Darmstadt, Germany.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Yi Li",
    title: "Yi Li — Embodied AI & Object-Centric Vision",
    description:
      "Object-centric visual representations for robotic manipulation. M.Sc. TU Darmstadt (IAS Lab × LIRIS). RSS 2026 workshop paper.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Yi Li — Embodied AI & Object-Centric Vision",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yi Li — Embodied AI & Object-Centric Vision",
    description:
      "Object-centric visual representations for robotic manipulation.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Yi Li",
  url: "https://yili-dev.com",
  jobTitle: "Deep Learning Engineer",
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "Technische Universität Darmstadt",
    },
    {
      "@type": "CollegeOrUniversity",
      name: "Chongqing University of Post and Telecommunications",
    },
  ],
  // TODO: GitHub profile 目前是空的，等有内容了再加回 "https://github.com/liyifreddy"
  sameAs: ["https://www.linkedin.com/in/yi-li-dev/"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
