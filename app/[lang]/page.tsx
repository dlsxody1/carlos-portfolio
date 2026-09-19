import { notFound } from 'next/navigation'
import { Hero } from '@/components/hero/Hero'
import { Nav } from '@/components/sections/Nav'
import { About } from '@/components/sections/About'
import { Work } from '@/components/sections/Work'
import { AiWorkflow } from '@/components/sections/AiWorkflow'
import { Stack } from '@/components/sections/Stack'
import { History } from '@/components/sections/History'
import { Contact } from '@/components/sections/Contact'
import { hasLocale } from '@/content/resume'

export default async function Page({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  return (
    <>
      <Nav lang={lang} />
      <main>
        <Hero lang={lang} />
        <About lang={lang} />
        <Work lang={lang} />
        <AiWorkflow lang={lang} />
        <Stack lang={lang} />
        <History lang={lang} />
      </main>
      <Contact lang={lang} />
    </>
  )
}
