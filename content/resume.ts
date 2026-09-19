export const locales = ['ko', 'en'] as const
export type Locale = (typeof locales)[number]
export const hasLocale = (v: string): v is Locale => (locales as readonly string[]).includes(v)

type L = Record<Locale, string>

export type Project = {
  slug: string
  name: string
  kind: L
  company: string
  period: string
  /** public/shots 아래 캡쳐. 교체 시 비율(width/height)도 맞출 것 */
  shot: string
  aspect: number
  points: { title: L; body: L }[]
  stack: string[]
}

export const profile = {
  name: { ko: '김인태', en: 'Intae Kim' } satisfies L,
  role: { ko: '프론트엔드 개발자', en: 'Frontend Engineer' } satisfies L,
  headline: {
    ko: '운영에서 덜 깨지는\n화면을 만듭니다.',
    en: 'I build B2B screens\nthat hold up in production.',
  } satisfies L,
  summary: {
    ko: '2년 3개월 동안 동물병원 임상 SaaS, 사내 전자결재 시스템, 기업 홈페이지를 개발했습니다. React와 TypeScript를 주로 쓰고, 필요할 땐 백엔드 API와 배포 환경까지 직접 다룹니다.',
    en: 'For 2+ years I have built a veterinary clinical SaaS, an internal e-approval system, and a corporate website. Mostly React and TypeScript — and backend APIs or deployment when the problem needs it.',
  } satisfies L,
  email: 'dlsxody1@naver.com',
  github: 'https://github.com/dlsxody1',
  velog: 'https://velog.io/@carloskim',
}

export const projects: Project[] = [
  {
    slug: 'vitalvet',
    name: 'VitalVET',
    kind: { ko: '동물병원 임상 SaaS', en: 'Veterinary clinical SaaS' },
    company: 'MetaDx',
    period: '2026.01 – 2026.07',
    shot: '/shots/vitalvet.svg',
    aspect: 16 / 10,
    points: [
      {
        title: { ko: '입원 차트 재렌더 범위 축소', en: 'Narrowed inpatient-chart re-renders' },
        body: {
          ko: '셀 하나를 고치면 표 전체가 다시 그려지던 입원 차트를 React.memo와 콜백 안정화로 수정된 행 하나만 렌더되게 바꿨습니다.',
          en: 'Editing one cell used to re-render the whole chart. With React.memo and stable callbacks, only the edited row renders now.',
        },
      },
      {
        title: { ko: '흩어진 결제 폼 상태 통합', en: 'Unified scattered payment-form state' },
        body: {
          ko: 'react-hook-form과 zod로 상태·검증 로직을 한곳에 모으고, 결제 이벤트 추적과 단위 테스트를 같은 자리에 배치했습니다.',
          en: 'Moved state and validation into one place with react-hook-form and zod, with event tracking and unit tests alongside.',
        },
      },
      {
        title: { ko: '4개 언어 · 운영 모니터링', en: '4 languages · production monitoring' },
        body: {
          ko: 'i18next로 한국어·영어·일본어·태국어를 지원하고, Sentry 오류 추적과 GitHub Actions 기반 S3 배포를 자동화했습니다.',
          en: 'Korean, English, Japanese and Thai via i18next; Sentry error tracking and automated S3 deploys on GitHub Actions.',
        },
      },
    ],
    stack: ['React', 'TypeScript', 'TanStack Router/Query', 'Jotai', 'react-hook-form', 'zod', 'Sentry'],
  },
  {
    slug: 'homepage',
    name: 'MetaDx Homepage',
    kind: { ko: '기업 홈페이지 · Core Web Vitals', en: 'Corporate site · Core Web Vitals' },
    company: 'MetaDx',
    period: '2025.08 – 2026.05',
    shot: '/shots/homepage.svg',
    aspect: 16 / 10,
    points: [
      {
        title: { ko: '이미지 로딩 시간 약 30% 감소', en: '~30% faster image loading' },
        body: {
          ko: '대표 이미지에 fetchPriority="high", 나머지는 lazy loading, 대용량 PNG는 sharp로 WebP 변환했습니다.',
          en: 'fetchPriority="high" on the hero image, lazy loading elsewhere, and heavy PNGs converted to WebP with sharp.',
        },
      },
      {
        title: { ko: '스크롤 중 React 렌더 0회', en: 'Zero React renders while scrolling' },
        body: {
          ko: '스크롤마다 헤더 상태를 갱신하던 구조를 useRef와 data attribute 방식으로 바꿔 불필요한 리렌더를 없앴습니다.',
          en: 'Replaced per-scroll header state with useRef and data attributes, removing needless re-renders.',
        },
      },
      {
        title: { ko: 'SPA 검색 노출', en: 'Getting an SPA indexed' },
        body: {
          ko: '메타데이터·hreflang을 적용하고 prerender로 생성한 HTML을 S3에 자동 업로드해 다국어 페이지를 노출시켰습니다.',
          en: 'Added metadata and hreflang, then prerendered HTML and auto-uploaded it to S3 so each language gets indexed.',
        },
      },
    ],
    stack: ['React 19', 'TanStack Router', 'Tailwind CSS v4', 'sharp', 'prerender', 'AWS S3'],
  },
  {
    slug: 'office',
    name: 'MetaDx Office',
    kind: { ko: '사내 전자결재 · 경비 관리', en: 'Internal e-approval & expenses' },
    company: 'MetaDx',
    period: '2025.05 – 2026.07',
    shot: '/shots/office.svg',
    aspect: 16 / 10,
    points: [
      {
        title: { ko: '결재 로직 단위 테스트 25개', en: '25 unit tests on approval logic' },
        body: {
          ko: '결재 상태머신, 401 인터셉터, 인증 가드, 결재선 금액 규칙처럼 오류 시 결재 전체에 영향을 주는 로직을 테스트로 묶었습니다.',
          en: 'Covered the logic that breaks every approval when wrong: the state machine, 401 interceptor, auth guard and approval-line amount rules.',
        },
      },
      {
        title: { ko: '배포 전 검증 파이프라인', en: 'Pre-deploy checks in CI' },
        body: {
          ko: 'tsc·린트·빌드를 CI에 넣고, steiger로 FSD 레이어 간 의존 규칙을 검사합니다.',
          en: 'tsc, lint and build run in CI, and steiger enforces FSD layer dependency rules.',
        },
      },
    ],
    stack: ['React 19', 'TypeScript', 'TanStack Router/Query', 'react-hook-form', 'zod', 'Vitest', 'steiger'],
  },
  {
    slug: 'cancervet',
    name: 'CancerVET',
    kind: { ko: '진단 리포트 자동 생성', en: 'Automated diagnostic reports' },
    company: 'MetaDx',
    period: '2025.01 – 2025.05',
    shot: '/shots/cancervet.svg',
    aspect: 1 / 1.3,
    points: [
      {
        title: { ko: 'HTML → PDF 파이프라인', en: 'HTML → PDF pipeline' },
        body: {
          ko: '검사 결과 리포트 UI를 HTML/CSS로 만들고 Playwright로 PDF를 생성하는 파이프라인을 개발했습니다.',
          en: 'Built the report UI in HTML/CSS and a Playwright pipeline that renders it to PDF.',
        },
      },
      {
        title: { ko: '컨테이너 한글 폰트 불일치 해결', en: 'Fixed Korean fonts in containers' },
        body: {
          ko: '로컬과 Linux 컨테이너의 폰트 차이로 PDF가 어긋나던 문제를 Pretendard·NotoSansKR 웹폰트 포함으로 해결했습니다.',
          en: 'PDFs drifted between local and Linux containers; bundling Pretendard and NotoSansKR as web fonts fixed it.',
        },
      },
    ],
    stack: ['Python', 'FastAPI', 'Playwright', 'HTML/CSS', 'AWS Lambda', 'S3'],
  },
]

export const aiWorkflow = {
  title: { ko: 'AI가 쓴 코드도\n규칙을 지키게', en: 'Making AI-written code\nfollow the rules' } satisfies L,
  items: [
    {
      figure: '7',
      title: { ko: '커밋 전에 막는 구조 위반', en: 'structure violations blocked before commit' },
      body: {
        ko: 'AI 코드 생성이 늘며 FSD 경계가 무너지는 문제를, 구조·규칙 문서화와 파일 수정 시 동작하는 커스텀 린트 훅으로 해결했습니다.',
        en: 'As AI generated more code, FSD boundaries eroded. Documented rules plus custom lint hooks that run on every file edit fixed it.',
      },
    },
    {
      figure: '9 · 13',
      title: { ko: '슬래시 커맨드 · 스킬', en: 'slash commands · skills' },
      body: {
        ko: '한 프롬프트에 모든 걸 맡기던 방식을 성능 측정·스타일링·UX 리뷰 서브에이전트로 나눴습니다.',
        en: 'Split one do-everything prompt into sub-agents for performance, styling and UX review.',
      },
    },
    {
      figure: '5',
      title: { ko: '같은 작업 정보를 보는 사내 프로젝트', en: 'internal projects sharing one context' },
      body: {
        ko: '인프라·백엔드·ML 팀과 매번 수동으로 옮기던 정보를 공유 레포의 컨텍스트·의사결정 로그로 옮겼습니다.',
        en: 'Moved hand-copied context between infra, backend and ML teams into a shared repo of context and decision logs.',
      },
    },
  ],
}

export const skills: { label: L; items: string }[] = [
  { label: { ko: '프론트엔드', en: 'Frontend' }, items: 'TypeScript, React 19, Next.js, Tailwind CSS, shadcn/ui' },
  { label: { ko: '아키텍처', en: 'Architecture' }, items: 'Feature-Sliced Design, steiger' },
  { label: { ko: '상태와 폼', en: 'State & forms' }, items: 'TanStack Query/Router, Jotai, react-hook-form, zod' },
  { label: { ko: 'AI 개발 환경', en: 'AI tooling' }, items: 'Claude Code, MCP, CLAUDE.md, custom lint hooks, sub-agents' },
  { label: { ko: '테스트와 품질', en: 'Testing' }, items: 'Vitest, Testing Library, tsc, ESLint' },
  { label: { ko: '인프라와 운영', en: 'Infra & ops' }, items: 'GitHub Actions, AWS S3/Lambda, Sentry, i18next' },
  { label: { ko: '백엔드', en: 'Backend' }, items: 'Python, FastAPI, Spring Boot, JSP, MariaDB' },
]

export const timeline: { period: string; org: L; detail: L }[] = [
  {
    period: '2024.10 –',
    org: { ko: '메타디엑스', en: 'MetaDx Inc.' },
    detail: { ko: '프론트엔드 개발 · 정규직', en: 'Frontend engineer, full-time' },
  },
  {
    period: '2024.11 – 2025.02',
    org: { ko: '항해 플러스 프론트엔드 5기', en: 'Hanghae Plus Frontend, 5th cohort' },
    detail: { ko: '프론트엔드 심화 과정 수료', en: 'Advanced frontend program' },
  },
  {
    period: '2022.11 – 2023.03',
    org: { ko: '퀀텀에이아이', en: 'Quantum AI' },
    detail: {
      ko: '보험금 청구 서류 문서관리 시스템 · Spring Boot, JSP, MariaDB',
      en: 'Insurance-claim document system · Spring Boot, JSP, MariaDB',
    },
  },
  {
    period: '2022.05 – 2022.08',
    org: { ko: '위코드 34기', en: 'wecode, 34th cohort' },
    detail: { ko: '프론트엔드 부트캠프 수료', en: 'Frontend bootcamp' },
  },
  {
    period: '2014.03 – 2020.08',
    org: { ko: '숭실대학교 평생교육원', en: 'Soongsil University (Continuing Ed.)' },
    detail: {
      ko: '정보통신공학 학사 · 정보처리기사, 네트워크관리사 2급',
      en: 'B.S. Information & Communication Eng. · Engineer Information Processing',
    },
  },
]

export const ui = {
  nav: {
    work: { ko: '작업', en: 'Work' },
    ai: { ko: 'AI 워크플로', en: 'AI workflow' },
    stack: { ko: '스택', en: 'Stack' },
    contact: { ko: '연락', en: 'Contact' },
  },
  workTitle: { ko: '실제로 쓰이는 화면들', en: 'Screens people actually use' },
  workNote: {
    ko: '사내·고객사 B2B 서비스라 공개 URL 대신 더미 데이터 캡쳐로 보여드립니다.',
    en: 'These are private B2B products, so they are shown as captures with dummy data.',
  },
  stackTitle: { ko: '다루는 도구', en: 'Tools' },
  historyTitle: { ko: '이력', en: 'History' },
  contactTitle: { ko: '좋은 팀과의 대화는\n언제나 환영합니다.', en: 'Always open to\na good conversation.' },
  heroCta: { ko: '작업 보기', en: 'See the work' },
} satisfies Record<string, L | Record<string, L>>
