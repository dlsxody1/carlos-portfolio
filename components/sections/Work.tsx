import type { Locale } from '@/content/resume'
import { otherWork, projects, ui } from '@/content/resume'
import { ProjectStory } from '@/components/screens/ProjectStory'

export function Work({ lang }: { lang: Locale }) {
  return (
    <section id="work" className="scroll-mt-24 border-t border-line pt-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        <h2 className="font-display text-[clamp(2rem,4.5vw,3.6rem)] leading-tight font-semibold tracking-[-0.03em]">
          {ui.workTitle[lang]}
        </h2>
        <p className="mt-4 max-w-xl text-ink-soft">{ui.workNote[lang]}</p>
      </div>
      <ProjectStory projects={projects} lang={lang} visitLabel={ui.visit[lang]} />

      <div className="mx-auto max-w-7xl px-5 pt-16 pb-28 sm:px-10">
        <h3 className="font-display text-2xl font-semibold tracking-tight">{ui.otherTitle[lang]}</h3>
        <div className="mt-8 grid gap-12 lg:grid-cols-2">
          {otherWork.map((w) => (
            <article key={w.name.en}>
              <p className="text-sm text-ink-soft tabular-nums">{w.period}</p>
              <h4 className="mt-1 text-xl font-semibold">{w.name[lang]}</h4>
              <p className="text-accent">{w.kind[lang]}</p>
              <p className="mt-4 leading-relaxed text-ink-soft">{w.body[lang]}</p>
              <p className="mt-4 text-sm text-ink-soft">{w.stack}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
