import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Hanami — Dev Playbook',
  description: 'A personal, living knowledge base for software engineering',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-season="pond" className="hb-paper">
      <body>
        <div className="hanami-surface">
          {children}
        </div>
      </body>
    </html>
  )
}
