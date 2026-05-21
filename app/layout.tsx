import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Hanami — Dev Playbook',
  description: 'A personal, living knowledge base for software engineering',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-season="pond" className="hb-paper">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Caveat:wght@400;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="hanami-surface">
          {children}
        </div>
      </body>
    </html>
  )
}
