'use client'
import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import { RICH_MOTION, useMediaQuery } from '@/lib/useMediaQuery'

const SIZE = 18

/**
 * liquid-glass-js 버튼을 링크 뒤에 깐다. 라이브러리는 html2canvas 로 페이지를 한 번 찍어 굴절시키므로
 * WebGL 캔버스 위에서는 쓰지 않고, CSS 배경만 있는 Contact 영역에서만 사용한다.
 */
export function GlassLink({ href, label, icon }: { href: string; label: string; icon: ReactNode }) {
  const rich = useMediaQuery(RICH_MOTION)
  const slot = useRef<HTMLSpanElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!rich) return
    let el: HTMLElement | undefined
    let cancelled = false
    // 섹션이 보일 때 스냅샷을 찍어야 레이아웃이 확정된 상태로 굴절된다
    const io = new IntersectionObserver(async ([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const { Button } = await import('@/lib/liquid-glass/liquid-glass')
      if (cancelled) return
      // 라이브러리는 text 길이로 알약 폭을 잰다. 아이콘 자리만큼 공백을 붙여 폭을 맞춘다
      el = new Button({ text: `${label}\u2003\u2003`, size: SIZE, type: 'pill', tintOpacity: 0.12 }).element
      slot.current!.appendChild(el)
      setReady(true)
    }, { rootMargin: '200px' })
    io.observe(slot.current!)
    return () => {
      cancelled = true
      io.disconnect()
      el?.remove()
    }
  }, [rich, label])

  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel="noreferrer"
      className={`relative inline-grid place-items-center rounded-full text-paper outline-offset-4 focus-visible:outline-2 focus-visible:outline-paper ${
        ready ? '' : 'min-h-[50px] border border-paper/30 bg-paper/10 px-5 backdrop-blur-md'
      }`}
      style={{ fontSize: SIZE }}
    >
      <span ref={slot} className="col-start-1 row-start-1" aria-hidden />
      <span className="relative col-start-1 row-start-1 flex items-center gap-2.5 font-medium whitespace-nowrap">
        {icon}
        {label}
      </span>
    </a>
  )
}
