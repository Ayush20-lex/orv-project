import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Memory Archive & Quotes',
  description:
    "Verified quotes, narrative transmissions, and reader interpretations from Omniscient Reader's Viewpoint with novel chapter citations.",
  alternates: {
    canonical: 'https://orv-project.vercel.app/quotes',
  },
  openGraph: {
    title: "Memory Archive & Quotes — Star Stream",
    description: "Verified quotes, narrative transmissions, and reader interpretations from Omniscient Reader's Viewpoint.",
    url: 'https://orv-project.vercel.app/quotes',
    siteName: 'Star Stream',
    images: [
      {
        url: 'https://orv-project.vercel.app/images/kim-dokja-potrait2.jpg',
        width: 1200,
        height: 630,
        alt: "Memory Archive & Quotes — Star Stream",
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Memory Archive & Quotes — Star Stream",
    description: "Verified quotes, narrative transmissions, and reader interpretations from Omniscient Reader's Viewpoint.",
    images: ['https://orv-project.vercel.app/images/kim-dokja-potrait2.jpg'],
  },
};

export default function QuotesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
