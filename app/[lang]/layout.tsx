import type { Metadata } from 'next'
import { Bricolage_Grotesque } from 'next/font/google'
import { notFound } from 'next/navigation'
import 'pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css'
import '../globals.css'
import { hasLocale, locales, profile } from '@/content/resume'

const bricolage = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-bricolage' })

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: LayoutProps<'/[lang]'>): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  return {
    title: 'carlos-portfolio',
    description: profile.lede[lang],
    alternates: { languages: { ko: '/ko', en: '/en' } },
  }
}

export default async function RootLayout({ children, params }: LayoutProps<'/[lang]'>) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  return (
    <html lang={lang} className={bricolage.variable}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
