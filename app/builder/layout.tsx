import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Incarnation Builder',
  description:
    "Determine your incarnation attributes, calculate stats, and discover your constellation sponsorship archetype in the Star Stream companion.",
  alternates: {
    canonical: 'https://orv-project.vercel.app/builder',
  },
  openGraph: {
    title: "Incarnation Builder — Star Stream",
    description: "Determine your incarnation attributes, calculate stats, and discover your constellation sponsorship archetype.",
    url: 'https://orv-project.vercel.app/builder',
    siteName: 'Star Stream',
    images: [
      {
        url: 'https://orv-project.vercel.app/images/kim-dokja-potrait2.jpg',
        width: 1200,
        height: 630,
        alt: "Incarnation Builder — Star Stream",
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Incarnation Builder — Star Stream",
    description: "Determine your incarnation attributes, calculate stats, and discover your constellation sponsorship archetype.",
    images: ['https://orv-project.vercel.app/images/kim-dokja-potrait2.jpg'],
  },
};

export default function BuilderLayout({ children }: { children: React.ReactNode }) {
  return children;
}
