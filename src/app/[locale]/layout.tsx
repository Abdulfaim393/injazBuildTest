import type { Metadata } from 'next'
import {Inter} from 'next/font/google'
import "./globals.css"
import { GoogleTagManager } from '@next/third-parties/google'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://injazrent.ae/'),
  title: 'Injaz | Rent A Car | Car in Dubai | Rental Car In Dubai',
  description: 'Explore Dubai with our diverse car fleet—SUVs, sedans, luxury, compacts, hatchbacks, economy, and crossovers. Top brands, affordable rates, premium service',
  applicationName: 'Injaz',
  keywords: ['Injaz', 'Rent A Car', 'Car in Dubai', 'Rental Car In Dubai', 'SUVs', 'sedans', 'luxury', 'compacts', 'hatchbacks', 'economy', 'crossover'],
  authors: [{name: 'mohammad salem', url: 'https://trackers.ae/'}],
  creator: 'mohammad salem',
  publisher:'mohammad salem',
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
    }
  },
  openGraph: {
    title: 'Injaz | Rent A Car | Car in Dubai | Rental Car In Dubai',
    description: 'Explore Dubai with our diverse car fleet—SUVs, sedans, luxury, compacts, hatchbacks, economy, and crossovers. Top brands, affordable rates, premium service',
    url: 'https://injazrent.ae/',
    siteName: 'Injaz',
    type: 'website',
    locale: 'en-US',
  },
  twitter: {
    title: 'Injaz | Rent A Car | Car in Dubai | Rental Car In Dubai',
    description: 'Explore Dubai with our diverse car fleet—SUVs, sedans, luxury, compacts, hatchbacks, economy, and crossovers. Top brands, affordable rates, premium service',
    site: 'Injaz',
    card: 'summary_large_image',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
       <GoogleTagManager gtmId="GTM-KBG7S42T" />
       <body className={inter.className}>{children}</body>
    </html>
  )
}
