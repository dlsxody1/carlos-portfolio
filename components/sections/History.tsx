import type { Locale } from '@/content/resume'
import { timeline, ui } from '@/content/resume'

export function History({ lang }: { lang: Locale }) {
  return (
    <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-28 sm:px-10 sm:pb-36 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      <h2 className="font-display text-[clamp(2rem,4.5vw,3.6rem)] leading-tight font-semibold tracking-[-0.03em]">
        {ui.historyTitle[lang]}
      </h2>
      <ol>
        {timeline.map((t) => (
          <li key={t.period} className="grid gap-1 border-t border-line py-4 sm:grid-cols-[10rem_1fr]">
            <span className="text-sm text-ink-soft tabular-nums">{t.period}</span>
            <div>
              <p className="font-semibold">{t.org[lang]}</p>
              <p className="mt-0.5 text-sm text-ink-soft">{t.detail[lang]}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
