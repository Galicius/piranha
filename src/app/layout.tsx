import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { Toaster } from '@/components/ui/sonner'
import Layout from '@/components/Layout'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Piranha Cocktail Bureau',
  description: 'Dobrodošli v Piranha Cocktail Bureau - kjer se srečajo tradicija in inovacija v svetu koktajlov.',
  keywords: 'cocktails, bar, piranha, maribor, slovenia, drinks, signature cocktails',
  authors: [{ name: 'Piranha Cocktail Bureau' }],
  openGraph: {
    title: 'Piranha Cocktail Bureau',
    description: 'Dobrodošli v Piranha Cocktail Bureau - kjer se srečajo tradicija in inovacija v svetu koktajlov.',
    url: 'https://piranha.si',
    siteName: 'Piranha Cocktail Bureau',
    locale: 'sl_SI',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Piranha Cocktail Bureau',
    description: 'Dobrodošli v Piranha Cocktail Bureau - kjer se srečajo tradicija in inovacija v svetu koktajlov.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sl" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <div className="min-h-screen bg-background font-sans">
            <Layout>
              {children}
            </Layout>
          </div>
          <Toaster richColors position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  )
}