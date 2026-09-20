'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { Locale } from '@/content/resume'

const SECTIONS = ['about', 'work', 'ai', 'contact'] as const
type Section = (typeof SECTIONS)[number]

/** 클라이언트 번들에 이력서 전체가 실리지 않도록, 필요한 문자열만 서버에서 받는다 */
export function Nav({
  lang,
  name,
  labels,
  studyLabel,
  menuLabel,
}: {
  lang: Locale
  name: string
  labels: Record<Section, string>
  studyLabel: string
  menuLabel: string
}) {
  const [active, setActive] = useState<Section | null>(null)
  const [hovered, setHovered] = useState<Section | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [pill, setPill] = useState<{ x: number; w: number } | null>(null)
  const listRef = useRef<HTMLUListElement>(null)

  // 섹션 링크는 항상 홈의 해시를 가리킨다. 홈에서는 같은 문서라 smooth scroll 이 그대로 먹고,
  // 다른 라우트(/ko/study)에서는 홈으로 돌아가며 그 섹션에 선다
  const other: Locale = lang === 'ko' ? 'en' : 'ko'
  const pathname = usePathname()
  const home = `/${lang}`
  const otherHref = pathname.replace(/^\/(ko|en)/, `/${other}`)
  // 축소 여부는 Hero(#top) 센티널이 정한다. Hero 가 없는 라우트는 처음부터 축소형
  const shrunk = scrolled || pathname !== home

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
  // DOM 측정이라 페인트 전에 (useLayoutEffect) — 알약이 한 프레임 늦게 따라오지 않게
  useLayoutEffect(() => {
    const el = target && listRef.current?.querySelector<HTMLElement>(`[data-id="${target}"]`)
    setPill(el ? { x: el.offsetLeft, w: el.offsetWidth } : null)
  }, [target, lang])

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav
        data-scrolled={shrunk || undefined}
        data-open={open || undefined}
        className="glass relative w-full max-w-[40rem] overflow-hidden rounded-[1.75rem] transition-[max-width] duration-500 ease-(--ease-out-expo) data-scrolled:max-w-[34rem]"
      >
        <div className="flex h-14 items-center gap-2 pr-2 pl-5">
          <a href={`${home}#top`} className="mr-auto font-display text-[0.95rem] font-semibold tracking-tight whitespace-nowrap">
            {name}
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
                  href={`${home}#${id}`}
                  onMouseEnter={() => setHovered(id)}
                  aria-current={active === id ? 'true' : undefined}
                  className="relative block rounded-full px-3.5 py-1.5 text-sm text-ink-soft transition-colors hover:text-ink aria-[current]:text-ink"
                >
                  {labels[id]}
                </a>
              </li>
            ))}
            {/* 별도 라우트라 알약 추적(data-id) 대상이 아니다 */}
            <li>
              <Link
                href={`${home}/study`}
                className="relative block rounded-full px-3.5 py-1.5 text-sm text-ink-soft transition-colors hover:text-ink"
              >
                {studyLabel}
              </Link>
            </li>
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
                <Link key={l} href={otherHref} hrefLang={other} className="relative z-10 px-2.5 py-1 text-ink-soft hover:text-ink">
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
            <span className="sr-only">{menuLabel}</span>
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
                  href={`${home}#${id}`}
                  onClick={() => setOpen(false)}
                  tabIndex={open ? 0 : -1}
                  className="block px-5 py-3 font-display text-2xl font-semibold tracking-tight"
                >
                  {labels[id]}
                </a>
              </li>
            ))}
            <li>
              <Link
                href={`${home}/study`}
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
                className="block px-5 py-3 font-display text-2xl font-semibold tracking-tight"
              >
                {studyLabel}
              </Link>
            </li>
          </ul>
        </div>

        {/* 읽기 진행선: CSS scroll-driven animation, 미지원 브라우저에선 그냥 안 보인다 */}
        <span aria-hidden className="nav-progress absolute inset-x-5 bottom-0 h-px origin-left bg-accent" />
      </nav>
    </header>
  )
}
