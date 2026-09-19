import type { Locale } from '@/content/resume'
import { projects, ui } from '@/content/resume'
import { ProjectStory } from '@/components/screens/ProjectStory'

export function Work({ lang }: { lang: Locale }) {
  return (
    <section id="work" className="scroll-mt-24 pt-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        <h2 className="font-display text-[clamp(2rem,4.5vw,3.6rem)] leading-tight font-semibold tracking-[-0.03em]">
          {ui.workTitle[lang]}
        </h2>
        <p className="mt-4 max-w-md text-ink-soft">{ui.workNote[lang]}</p>
      </div>
      <ProjectStory projects={projects} lang={lang} />
    </section>
  )
}
