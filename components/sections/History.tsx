import type { Locale } from '@/content/resume'
import { timeline, ui } from '@/content/resume'

export function History({ lang }: { lang: Locale }) {
  return (
    <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-28 sm:px-10 sm:pb-36 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      <h2 className="font-display text-[clamp(2rem,4.5vw,3.6rem)] leading-tight font-semibold tracking-[-0.03em]">
        {ui.historyTitle[lang]}
      </h2>
      <ol className="relative border-l border-line pl-8">
        {timeline.map((t) => (
          <li key={t.period} className="relative pb-8 last:pb-0">
            <span aria-hidden className="absolute top-2 -left-[calc(2rem+4px)] size-[7px] rounded-full bg-ink" />
            <p className="text-sm text-ink-soft tabular-nums">{t.period}</p>
            <p className="mt-1 font-semibold">{t.org[lang]}</p>
            <p className="mt-0.5 text-sm text-ink-soft">{t.detail[lang]}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
