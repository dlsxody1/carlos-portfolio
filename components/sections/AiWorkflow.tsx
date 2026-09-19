import type { Locale } from '@/content/resume'
import { aiWorkflow } from '@/content/resume'

export function AiWorkflow({ lang }: { lang: Locale }) {
  return (
    <section id="ai" className="scroll-mt-24 bg-paper-deep py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        <h2 className="max-w-3xl font-display text-[clamp(2rem,4.5vw,3.6rem)] leading-tight font-semibold tracking-[-0.03em] whitespace-pre-line">
          {aiWorkflow.title[lang]}
        </h2>
        <ol className="mt-16">
          {aiWorkflow.items.map((it) => (
            <li
              key={it.figure}
              className="grid gap-3 border-t border-line py-8 md:grid-cols-[12rem_minmax(0,1fr)_minmax(0,1.3fr)] md:gap-10"
            >
              <span className="font-display text-5xl font-semibold tracking-tight text-accent">{it.figure}</span>
              <h3 className="text-xl font-semibold md:pt-2">{it.title[lang]}</h3>
              <p className="leading-relaxed text-ink-soft md:pt-2">{it.body[lang]}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
