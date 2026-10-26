import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Constellation Observatory',
  description:
    "Interactive celestial atlas of the Constellations and their canonical relationships across the Star Stream in Omniscient Reader's Viewpoint.",
  alternates: {
    canonical: 'https://orv-project.vercel.app/constellations',
  },
  openGraph: {
    title: "Constellation Observatory — Star Stream",
    description: "Interactive celestial atlas of the Constellations and their canonical relationships across the Star Stream.",
    url: 'https://orv-project.vercel.app/constellations',
    siteName: 'Star Stream',
    images: [
      {
        url: 'https://orv-project.vercel.app/images/kim-dokja-potrait2.jpg',
        width: 1200,
        height: 630,
        alt: "Constellation Observatory — Star Stream",
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Constellation Observatory — Star Stream",
    description: "Interactive celestial atlas of the Constellations and their canonical relationships across the Star Stream.",
    images: ['https://orv-project.vercel.app/images/kim-dokja-potrait2.jpg'],
  },
};

export default function ConstellationsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
