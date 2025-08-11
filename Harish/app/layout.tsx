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
      <body className="bg-dark min-h-screen">
        {children}
      </body>
    </html>
  )
}