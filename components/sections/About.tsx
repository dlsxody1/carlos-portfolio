import type { Locale } from '@/content/resume'
import { about } from '@/content/resume'

export function About({ lang }: { lang: Locale }) {
  return (
    <section id="about" className="mx-auto max-w-7xl scroll-mt-24 px-5 pt-32 pb-28 sm:px-10 lg:pt-[calc(30rem-min(30svh,17rem))]">
      <h2 className="font-display text-[clamp(2rem,4.5vw,3.6rem)] leading-tight font-semibold tracking-[-0.03em]">
        {about.title[lang]}
      </h2>
      <div className="mt-10 max-w-3xl space-y-6 text-[clamp(1.1rem,1.6vw,1.35rem)] leading-[1.75]">
        {about.intro.map((p) => (
          <p key={p.en}>{p[lang]}</p>
        ))}
      </div>

      <ol className="mt-20 grid gap-x-16 gap-y-12 md:grid-cols-2">
        {about.principles.map((pr, i) => (
          <li key={pr.title.en} className={i % 2 ? 'md:mt-16' : ''}>
            <h3 className="text-xl font-semibold">{pr.title[lang]}</h3>
            <p className="mt-3 leading-relaxed text-ink-soft">{pr.body[lang]}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
