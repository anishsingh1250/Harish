import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Transport ERP System',
  description: 'Comprehensive Transport ERP for managing operations, finance, and client relationships',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-gray-900 min-h-screen text-white antialiased">
        {children}
      </body>
    </html>
  )
}