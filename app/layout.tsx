import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import Navigation from '@/components/navigation'

export const metadata: Metadata = {
  title: 'Star Stream — Omniscient Reader\'s Viewpoint',
  description: 'You were the only one who read to the very last line. The Main Scenario has commenced. Enter the Star Stream and generate your incarnation stats.',
  generator: 'orv-project',
  openGraph: {
    title: 'Star Stream',
    description: 'The Main Scenario has commenced. The constellations are watching.',
    url: 'https://star-stream.vercel.app', // Or whatever deployment URL it gets
    siteName: 'Star Stream',
    images: [
      {
        url: '/images/kim-dokja-potrait2.jpg',
        width: 1200,
        height: 630,
        alt: 'Omniscient Reader\'s Viewpoint',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Star Stream — ORV',
    description: 'The Main Scenario has commenced. Determine your attributes.',
    images: ['/images/kim-dokja-potrait2.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
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
      <body className="antialiased">
        <Navigation />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
