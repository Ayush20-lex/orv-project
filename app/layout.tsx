import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  metadataBase: new URL('https://orv-project.vercel.app'),
  title: {
    default: "Star Stream — Omniscient Reader's Viewpoint",
    template: '%s | Star Stream',
  },
  description:
    'You were the only one who read to the very last line. The Main Scenario has commenced. Explore companions, the Constellation Observatory, and generate your incarnation stats in the Star Stream companion.',
  generator: 'orv-project',
  alternates: {
    canonical: 'https://orv-project.vercel.app',
  },
  openGraph: {
    title: "Star Stream — Omniscient Reader's Viewpoint",
    description: 'The Main Scenario has commenced. The constellations are watching.',
    url: 'https://orv-project.vercel.app',
    siteName: 'Star Stream',
    images: [
      {
        url: 'https://orv-project.vercel.app/images/kim-dokja-potrait2.jpg',
        width: 1200,
        height: 630,
        alt: "Omniscient Reader's Viewpoint — Star Stream",
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Star Stream — Omniscient Reader's Viewpoint",
    description: 'The Main Scenario has commenced. Determine your incarnation attributes.',
    images: ['https://orv-project.vercel.app/images/kim-dokja-potrait2.jpg'],
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon-dark-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500;700&family=Orbitron:wght@500;700;900&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased flex flex-col min-h-screen">
        <Navigation />
        <div className="flex-1">
          {children}
        </div>
        <Footer />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

