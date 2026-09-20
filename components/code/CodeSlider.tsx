'use client'
import { useRef, useState, type ReactNode } from 'react'

/**
 * 슬라이드 물리는 브라우저의 scroll-snap 이 한다 (모바일 스와이프가 공짜).
 * JS 는 데스크탑용 이전·다음 버튼과 현재 위치 표시만 맡는다.
 * 코드 블록 자체는 서버에서 하이라이팅해 children 으로 내려온다.
 */
export function CodeSlider({ slides, prevLabel, nextLabel }: { slides: ReactNode[]; prevLabel: string; nextLabel: string }) {
  const track = useRef<HTMLUListElement>(null)
  const [at, setAt] = useState(0)
  const last = slides.length - 1

  const go = (to: number) => {
    const el = track.current
    if (!el) return
    el.scrollTo({ left: el.clientWidth * to, behavior: 'smooth' })
  }

  return (
    <div>
      <ul
        ref={track}
        // 스와이프로 넘겼을 때도 현재 위치를 따라간다
        onScroll={(e) => {
          const el = e.currentTarget
          setAt(Math.round(el.scrollLeft / el.clientWidth))
        }}
        className="slides flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain"
      >
        {slides.map((slide, i) => (
          <li key={i} className="w-full shrink-0 snap-start">
            {slide}
          </li>
        ))}
      </ul>

      {last > 0 && (
        <div className="mt-3 flex items-center gap-1">
          <Arrow dir="prev" label={prevLabel} disabled={at === 0} onClick={() => go(at - 1)} />
          <Arrow dir="next" label={nextLabel} disabled={at === last} onClick={() => go(at + 1)} />
          <span className="ml-2 text-sm text-ink-soft tabular-nums">
            {at + 1} / {slides.length}
          </span>
        </div>
      )}
    </div>
  )
}

function Arrow({ dir, label, disabled, onClick }: { dir: 'prev' | 'next'; label: string; disabled: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="grid size-8 place-items-center rounded-full border border-line text-ink-soft transition-colors hover:border-ink hover:text-ink disabled:pointer-events-none disabled:opacity-30"
    >
      <span className="sr-only">{label}</span>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
        <path
          d={dir === 'prev' ? 'M7.5 2 3.5 6l4 4' : 'M4.5 2l4 4-4 4'}
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}
