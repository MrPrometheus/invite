import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Амир & Дилия | Приглашение',
    metadataBase: new URL("http://localhost:3000"),
      openGraph: {
        title: 'Амир & Дилия | Приглашение',
        images: [
          {
            url: '/fonpng.png',
            width: 545,
            height: 294,
          },
        ],
        type: 'website',
    }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={inter.className} style={{textAlign: "center"}}>
          {children}
      </body>
    </html>
  )
}
