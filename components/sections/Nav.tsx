'use client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import type { Locale } from '@/content/resume'
import { profile, ui } from '@/content/resume'

const SECTIONS = ['about', 'work', 'ai', 'contact'] as const
type Section = (typeof SECTIONS)[number]

export function Nav({ lang }: { lang: Locale }) {
  const [active, setActive] = useState<Section | null>(null)
  const [hovered, setHovered] = useState<Section | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [pill, setPill] = useState<{ x: number; w: number } | null>(null)
  const listRef = useRef<HTMLUListElement>(null)

  // 스크롤 리스너 없이 IntersectionObserver 로 현재 섹션 추적
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.target.id === 'top') {
            setScrolled(!e.isIntersecting)
            if (e.isIntersecting) setActive(null)
          }
          else if (e.isIntersecting) setActive(e.target.id as Section)
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    for (const id of ['top', ...SECTIONS]) {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    }
    return () => io.disconnect()
  }, [])

  // 하이라이트 알약은 호버 중인 링크, 없으면 현재 섹션을 따라 미끄러진다
  const target = hovered ?? active
  useEffect(() => {
    const el = target && listRef.current?.querySelector<HTMLElement>(`[data-id="${target}"]`)
    setPill(el ? { x: el.offsetLeft, w: el.offsetWidth } : null)
  }, [target, lang])

  const other: Locale = lang === 'ko' ? 'en' : 'ko'

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav
        data-scrolled={scrolled || undefined}
        className="nav-shell glass relative w-full max-w-[40rem] overflow-hidden rounded-[1.75rem] transition-[max-width,background-color] duration-500 ease-(--ease-out-expo) data-scrolled:max-w-[34rem]"
      >
        <div className="flex h-14 items-center gap-2 pr-2 pl-5">
          <a href="#top" className="mr-auto font-display text-[0.95rem] font-semibold tracking-tight whitespace-nowrap">
            {profile.name[lang]}
          </a>

          <ul ref={listRef} className="relative hidden items-center sm:flex" onMouseLeave={() => setHovered(null)}>
            <span
              aria-hidden
              className="absolute top-1/2 h-8 -translate-y-1/2 rounded-full bg-ink/[0.07] transition-all duration-500 ease-(--ease-out-expo)"
              style={{ left: pill?.x ?? 0, width: pill?.w ?? 0, opacity: pill ? 1 : 0 }}
            />
            {SECTIONS.map((id) => (
              <li key={id}>
                <a
                  data-id={id}
                  href={`#${id}`}
                  onMouseEnter={() => setHovered(id)}
                  aria-current={active === id ? 'true' : undefined}
                  className="relative block rounded-full px-3.5 py-1.5 text-sm text-ink-soft transition-colors hover:text-ink aria-[current]:text-ink"
                >
                  {ui.nav[id][lang]}
                </a>
              </li>
            ))}
          </ul>

          {/* KO/EN 세그먼트: 현재 언어 쪽에 잉크색 thumb */}
          <div className="relative ml-1 grid grid-cols-2 rounded-full bg-ink/[0.07] p-1 text-xs font-semibold">
            <span
              aria-hidden
              className={`absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-ink transition-transform duration-500 ease-(--ease-out-expo) ${lang === 'en' ? 'translate-x-full' : ''}`}
            />
            {(['ko', 'en'] as const).map((l) =>
              l === lang ? (
                <span key={l} className="relative z-10 px-2.5 py-1 text-paper">
                  {l.toUpperCase()}
                </span>
              ) : (
                <Link key={l} href={`/${other}`} hrefLang={other} className="relative z-10 px-2.5 py-1 text-ink-soft hover:text-ink">
                  {l.toUpperCase()}
                </Link>
              ),
            )}
          </div>

          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="relative ml-1 size-9 rounded-full bg-ink/[0.07] sm:hidden"
          >
            <span className="sr-only">{ui.menu[lang]}</span>
            <span aria-hidden className={`absolute top-1/2 left-1/2 h-px w-4 -translate-x-1/2 bg-ink transition-transform duration-300 ${open ? 'rotate-45' : '-translate-y-[3px]'}`} />
            <span aria-hidden className={`absolute top-1/2 left-1/2 h-px w-4 -translate-x-1/2 bg-ink transition-transform duration-300 ${open ? '-rotate-45' : 'translate-y-[3px]'}`} />
          </button>
        </div>

        {/* 모바일: 알약이 아래로 늘어나며 메뉴가 된다 */}
        <div id="mobile-menu" className={`grid transition-[grid-template-rows] duration-500 ease-(--ease-out-expo) sm:hidden ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
          <ul className="overflow-hidden">
            {SECTIONS.map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={() => setOpen(false)}
                  tabIndex={open ? 0 : -1}
                  className="block px-5 py-3 font-display text-2xl font-semibold tracking-tight"
                >
                  {ui.nav[id][lang]}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* 읽기 진행선: CSS scroll-driven animation, 미지원 브라우저에선 그냥 안 보인다 */}
        <span aria-hidden className="nav-progress absolute inset-x-5 bottom-0 h-px origin-left bg-accent" />
      </nav>
    </header>
  )
}
