import type { Locale } from '@/content/resume'
import { profile, projects, ui } from '@/content/resume'
import { HeroVisuals, HeroLogo } from './HeroVisuals'
import { HeroPeek } from './HeroPeek'

export function Hero({ lang }: { lang: Locale }) {
  return (
    <section id="top" className="relative isolate z-10 flex min-h-dvh flex-col overflow-x-clip">
      {/* 셰이더가 뜨기 전·모션 축소 시 보이는 정적 배경 */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_85%_20%,oklch(85%_0.09_50)_0%,transparent_55%),radial-gradient(ellipse_at_10%_90%,oklch(90%_0.04_300)_0%,transparent_50%)]"
      />
      <HeroVisuals />
      {/* 셰이더 아래 경계를 종이색으로 녹이고, 본문 대비용 왼쪽 베일을 깐다 */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-linear-to-b from-transparent to-paper" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-r from-paper/70 via-paper/25 to-transparent" />

      <div className="mx-auto grid w-full max-w-7xl flex-1 content-center gap-10 px-5 pt-28 pb-10 sm:px-10 lg:grid-cols-[1.7fr_1fr] lg:items-center">
        <div className="animate-[rise_1.1s_var(--ease-out-expo)_both]">
          <p className="mb-6 text-sm font-medium text-ink-soft">
            {profile.name[lang]}, {profile.role[lang]}
          </p>
          <h1 className="font-display text-[clamp(2.4rem,5.4vw,4.9rem)] leading-[1.05] font-semibold tracking-[-0.035em] whitespace-pre-line">
            {profile.headline[lang]}
          </h1>
          <p className="mt-7 max-w-[34rem] text-lg leading-relaxed text-ink-soft">{profile.lede[lang]}</p>
        </div>
        <HeroLogo />
      </div>

      <HeroPeek projects={projects} label={ui.peek[lang]} />
    </section>
  )
}
