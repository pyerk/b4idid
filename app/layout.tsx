export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>b4idid - Photography Portfolio</title>
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
