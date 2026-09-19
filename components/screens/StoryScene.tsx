'use client'
import dynamic from 'next/dynamic'
import type { Shot } from './ScreensScene'
import { RICH_MOTION, useMediaQuery } from '@/lib/useMediaQuery'

const ScreensScene = dynamic(() => import('./ScreensScene'), { ssr: false })

/** three.js 번들은 3D 를 실제로 그리는 환경에서만 받는다 */
export function StoryScene({ shots }: { shots: Shot[] }) {
  return useMediaQuery(RICH_MOTION) ? <ScreensScene shots={shots} /> : null
}
