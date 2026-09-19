import type { Locale } from '@/content/resume'
import { profile, ui } from '@/content/resume'
import { EnvelopeSimple } from '@phosphor-icons/react/dist/ssr'
import { siGithub, siVelog } from 'simple-icons'
import { BrandIcon } from '@/components/glass/BrandIcon'
import { GlassLink } from '@/components/glass/GlassLink'
import { ContactParticles } from './particles/ContactParticles'

export function Contact({ lang }: { lang: Locale }) {
  return (
    <footer
      id="contact"
      className="relative overflow-hidden text-paper"
      // liquid-glass 가 html2canvas 스냅샷을 굴절시키는데, 스냅샷이 oklch 그라디언트를 못 그려서 여기만 rgb
      style={{
        background:
          'radial-gradient(ellipse 70% 55% at 50% 100%, #b4532c 0%, transparent 70%), radial-gradient(ellipse at 50% 0%, #2e2940 0%, transparent 60%), #161b27',
      }}
    >
      {/* 해돋이 구도: 입자 구의 위쪽 절반만 바닥에서 떠오른다. 글래스 버튼과는 겹치지 않는 아래쪽에 둔다
          (liquid-glass 스냅샷은 캔버스를 굴절시키지 못함) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-[62%] rich:block">
        <ContactParticles />
      </div>
      <div className="relative mx-auto flex min-h-[46rem] max-w-7xl flex-col items-center px-5 pt-32 pb-10 text-center sm:px-10 sm:pt-40">
        <h2 className="font-display text-[clamp(2.4rem,6vw,5rem)] leading-[1.05] font-semibold tracking-[-0.035em] text-balance whitespace-pre-line">
          {ui.contactTitle[lang]}
        </h2>
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <GlassLink href={`mailto:${profile.email}`} label={profile.email} icon={<EnvelopeSimple size={20} weight="bold" aria-hidden />} />
          <GlassLink href={profile.github} label="GitHub" icon={<BrandIcon icon={siGithub} className="size-5" />} />
          <GlassLink href={profile.velog} label="velog" icon={<BrandIcon icon={siVelog} className="size-5" />} />
        </div>
        <p className="mt-auto pt-40 text-sm text-paper/60">© 2026 {profile.name[lang]}</p>
      </div>
    </footer>
  )
}
