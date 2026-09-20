import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr'
import { Nav } from '@/components/sections/Nav'
import { Drop } from '@/components/code/Drop'
import { hasLocale, profile, ui } from '@/content/resume'
import { study } from '@/content/study'

export default async function StudyPage({ params }: PageProps<'/[lang]/study'>) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const { labels } = study

  return (
    <>
      <Nav
        lang={lang}
        name={profile.name[lang]}
        labels={{ about: ui.nav.about[lang], work: ui.nav.work[lang], ai: ui.nav.ai[lang], contact: ui.nav.contact[lang] }}
        studyLabel={ui.study[lang]}
        menuLabel={ui.menu[lang]}
      />

      <main className="mx-auto max-w-3xl px-5 pt-40 pb-28 sm:px-10">
        <h1 className="font-display text-[clamp(2rem,4.5vw,3.6rem)] leading-tight font-semibold tracking-[-0.03em]">
          {study.title[lang]}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-ink-soft">{study.lede[lang]}</p>
        <p className="mt-6 text-sm text-ink-soft">{study.meta[lang]}</p>

        <div className="mt-20 space-y-16">
          {study.books.map((b) => (
            <article key={b.slug} className="border-t border-line pt-8">
              <p className="text-sm text-ink-soft tabular-nums">
                {b.period} · {study.noteCount(b.notes)[lang]}
              </p>
              <h2 className="mt-1.5 font-display text-2xl leading-snug font-semibold tracking-tight">{b.title[lang]}</h2>
              <p className="mt-4 leading-[1.8] text-ink-soft">{b.changed[lang]}</p>

              <div className="mt-6">
                <Drop label={labels.open[lang]}>
                  <ul className="space-y-2 border-l border-line pl-5 text-[0.95rem] text-ink-soft">
                    {b.chapters.map((c) => (
                      <li key={c.en}>{c[lang]}</li>
                    ))}
                  </ul>
                </Drop>
              </div>
            </article>
          ))}
        </div>

        <Link
          href={`/${lang}#work`}
          className="mt-24 inline-flex items-center gap-1.5 text-sm text-ink-soft transition-colors hover:text-ink"
        >
          <ArrowLeft size={14} weight="bold" aria-hidden />
          {labels.back[lang]}
        </Link>
      </main>
    </>
  )
}
