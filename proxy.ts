import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

// 루트(/)만 Accept-Language 로 /ko | /en 분기
export function proxy(request: NextRequest) {
  const lang = request.headers.get('accept-language')?.toLowerCase().startsWith('ko') ? 'ko' : 'en'
  return NextResponse.redirect(new URL(`/${lang}`, request.url))
}

export const config = { matcher: '/' }
