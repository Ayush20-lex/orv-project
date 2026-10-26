import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Companions & Incarnations',
  description:
    "Explore the key companions, incarnations, and survivors navigating the Seoul scenarios in Omniscient Reader's Viewpoint with verified stats and novel citations.",
  alternates: {
    canonical: 'https://orv-project.vercel.app/characters',
  },
  openGraph: {
    title: "Companions & Incarnations — Star Stream",
    description: "Explore the key companions, incarnations, and survivors navigating the Seoul scenarios.",
    url: 'https://orv-project.vercel.app/characters',
    siteName: 'Star Stream',
    images: [
      {
        url: 'https://orv-project.vercel.app/images/kim-dokja-potrait2.jpg',
        width: 1200,
        height: 630,
        alt: "Companions & Incarnations — Star Stream",
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Companions & Incarnations — Star Stream",
    description: "Explore the key companions, incarnations, and survivors navigating the Seoul scenarios.",
    images: ['https://orv-project.vercel.app/images/kim-dokja-potrait2.jpg'],
  },
};

export default function CharactersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
