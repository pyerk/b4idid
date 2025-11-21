import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'b4idid - Photography Portfolio',
}

export default function Page() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Hello World</h1>
      <p>This is a test page</p>
    </div>
  )
}
