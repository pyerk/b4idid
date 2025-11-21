import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'b4idid - Photography Portfolio',
  description: 'Professional photography portfolio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
