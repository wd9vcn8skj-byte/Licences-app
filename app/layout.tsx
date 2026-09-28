import type { Metadata } from 'next'
import { Fraunces, Inter } from 'next/font/google'
import './globals.css'

const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces', weight: ['600'] })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', weight: ['500', '600'] })

export const metadata: Metadata = {
  title: "Licences — Arrêtez de payer des logiciels que personne n'utilise",
  description:
    "Listez vos abonnements logiciels, voyez leur coût réel et repérez les comptes inutilisés et les doublons. 49 €/mois, sans engagement.",
  openGraph: {
    title: "Vous payez des logiciels que personne n'utilise",
    description: "Licences liste vos abonnements et vous montre où vous payez pour rien.",
    type: 'website',
    locale: 'fr_FR',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body
        className={`${fraunces.variable} ${inter.variable}`}
        style={{ background: '#F7F4EE', color: '#1A1F26', fontFamily: 'var(--font-inter), system-ui, sans-serif' }}
      >
        {children}
      </body>
    </html>
  )
}
