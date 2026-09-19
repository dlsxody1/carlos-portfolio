import type { Locale } from '@/content/resume'
import { skillGroups, ui } from '@/content/resume'

export function Stack({ lang }: { lang: Locale }) {
  return (
    <section id="stack" className="mx-auto max-w-7xl px-5 py-28 sm:px-10 sm:py-36">
      <h2 className="font-display text-[clamp(2rem,4.5vw,3.6rem)] leading-tight font-semibold tracking-[-0.03em]">
        {ui.stackTitle[lang]}
      </h2>
      <div className="mt-14 grid gap-12 md:grid-cols-3">
        {skillGroups.map((g) => (
          <div key={g.label.en}>
            <h3 className="border-b border-ink pb-3 text-lg font-semibold">{g.label[lang]}</h3>
            <dl className="mt-5 space-y-5">
              {g.rows.map((r) => (
                <div key={r.label.en}>
                  <dt className="text-sm text-ink-soft">{r.label[lang]}</dt>
                  <dd className="mt-1 leading-relaxed">{r.items}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </section>
  )
}
