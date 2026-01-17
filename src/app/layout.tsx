import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Mud In Trap | Country Meets Trap',
  description: 'Welcome to the Swamp. Behind the scenes of the music. Country Rap Therapy.',
  keywords: 'country rap,trap music,mud in trap,country meets trap,hip hop,D RoC,Timmy',
  openGraph: {
    title: 'Mud In Trap | Country Meets Trap',
    description: 'Welcome to the Swamp. Behind the scenes of the music.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Mud In Trap | Country Meets Trap',
    description: 'Welcome to the Swamp. Behind the scenes of the music.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
