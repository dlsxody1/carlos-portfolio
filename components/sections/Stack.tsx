import type { Locale } from '@/content/resume'
import { skills, ui } from '@/content/resume'

export function Stack({ lang }: { lang: Locale }) {
  return (
    <section id="stack" className="mx-auto grid max-w-7xl scroll-mt-24 gap-10 px-5 py-28 sm:px-10 sm:py-36 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      <h2 className="font-display text-[clamp(2rem,4.5vw,3.6rem)] leading-tight font-semibold tracking-[-0.03em]">
        {ui.stackTitle[lang]}
      </h2>
      <dl>
        {skills.map((s) => (
          <div key={s.label.en} className="grid gap-1 border-t border-line py-4 sm:grid-cols-[10rem_1fr]">
            <dt className="text-sm text-ink-soft">{s.label[lang]}</dt>
            <dd>{s.items}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
