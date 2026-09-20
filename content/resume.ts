import {
  chartMemo,
  draftHook,
  lintHook,
  paymentState,
  promoModal,
  rowSubscription,
  scoring,
  scrollAttribute,
  seoPrerender,
  venueIndex,
} from './snippets'

export const locales = ['ko', 'en'] as const
export type Locale = (typeof locales)[number]
export const hasLocale = (v: string): v is Locale => (locales as readonly string[]).includes(v)

type L = Record<Locale, string>

/** 접어 둔 코드 한 토막. label 은 파일 경로가 아니라 "이 코드가 보여주는 것" */
export type Snippet = {
  label: L
  lang: 'ts' | 'tsx' | 'json' | 'bash'
  code: string
}

export type Project = {
  slug: string
  name: string
  kind: L
  company: string | L
  period: string
  /** public/shots 아래 캡쳐. 교체 시 비율(width/height)도 맞출 것 */
  shot: string
  aspect: number
  /** 공개된 서비스만 */
  url?: string
  points: { title: L; body: L }[]
  /** 프로젝트 하나당 코드 예시 2개. 접어 둔 드롭다운 안에서 슬라이드로 넘긴다 */
  snippets?: Snippet[]
  stack: string[]
}

export const profile = {
  name: { ko: '김인태', en: 'In Tae Kim' } satisfies L,
  role: { ko: '웹 개발자', en: 'Web engineer' } satisfies L,
  headline: {
    ko: '화면에서 서버까지,\nAI와 함께 만듭니다.',
    en: 'Screens to servers,\nbuilt with AI.',
  } satisfies L,
  lede: {
    ko: 'React와 TypeScript를 중심으로 API와 배포까지 다루고, AI가 쓴 코드도 팀의 규칙을 지키도록 개발 환경을 설계합니다.',
    en: 'I work across React, TypeScript, APIs and deployment, and I design the tooling that keeps AI-written code inside the team’s rules.',
  } satisfies L,
  email: 'dlsxody1@naver.com',
  github: 'https://github.com/dlsxody1',
  velog: 'https://velog.io/@carloskim',
}

export const about = {
  title: { ko: '일하는 방식', en: 'How I work' } satisfies L,
  intro: [
    {
      ko: '2년 3개월 동안 동물병원 임상 SaaS, 사내 전자결재 시스템, 기업 홈페이지를 만들었습니다. 화면은 React와 TypeScript로 만들지만, 문제가 서버나 배포에 있으면 그쪽도 직접 봅니다. FastAPI로 리포트 파이프라인을 붙였고, Spring Boot로 CRUD API와 테이블을 설계했고, GitHub Actions로 S3와 Azure Blob 배포를 자동화했습니다.',
      en: 'For 2 years and 3 months I have built a veterinary clinical SaaS, an internal e-approval system and a corporate website. I build the screens in React and TypeScript, but when the problem lives in the server or the deploy, I go there too. I have wired a report pipeline in FastAPI, designed CRUD APIs and tables in Spring Boot, and automated deploys to S3 and Azure Blob with GitHub Actions.',
    },
    {
      ko: '요즘은 Claude Code와 MCP를 개발 과정 전반에 씁니다. 대신 AI가 빠르게 만든 코드가 팀의 구조를 무너뜨리지 않도록, 규칙을 문서로만 두지 않고 도구로 강제하는 데 더 많은 시간을 들입니다.',
      en: 'These days I use Claude Code and MCP across the whole workflow. The part I spend more time on is making sure fast AI output does not erode the codebase: rules are enforced by tools, not just written down.',
    },
  ] satisfies L[],
  principles: [
    {
      title: { ko: '쓰는 사람의 속도에 맞춥니다', en: 'Match the pace of the person using it' },
      body: {
        ko: 'VitalVET 입원 차트는 수의사가 진료 중에 셀을 계속 고쳐 쓰는 화면입니다. 이런 화면에서는 입력 반응성이 곧 사용성이라, 기능 목록보다 한 번의 입력이 얼마나 빨리 반영되는지를 먼저 봅니다.',
        en: 'The VitalVET inpatient chart is edited cell by cell while a vet is treating an animal. There, input latency is the usability, so I look at how fast one edit lands before I look at the feature list.',
      },
    },
    {
      title: { ko: '운영에서 덜 깨지게 만듭니다', en: 'Build for the day after release' },
      body: {
        ko: '기능을 만드는 것만큼 배포 뒤에 생기는 성능·유지보수 문제를 줄이는 데 관심이 많습니다. 한 번 고친 성능 문제는 테스트로 다시 생기지 않게 막고, 배포 뒤 사용자가 옛 버전에 남지 않도록 배포 과정까지 챙깁니다.',
        en: 'I care as much about what breaks after release as about shipping the feature. A performance fix gets a test so it stays fixed, and the deploy is set up so nobody is left on an old version.',
      },
    },
    {
      title: { ko: '규칙은 문서보다 도구로', en: 'Rules live in tools, not docs' },
      body: {
        ko: '사람이든 AI든 문서를 매번 읽지는 않습니다. 반드시 지켜야 하는 규칙은 린트와 훅으로 만들어 어긴 순간 바로 알 수 있게 합니다.',
        en: 'Neither people nor AI re-read the docs every time. Rules that must hold become lint rules and hooks, so a violation surfaces the moment it happens.',
      },
    },
    {
      title: { ko: '문제가 있는 곳까지 갑니다', en: 'Go where the problem is' },
      body: {
        ko: 'SPA의 검색 노출은 빌드 뒤 라우트별 메타 HTML을 만들어 보완했고, PDF 한글 폰트 문제는 폰트를 레포에 넣고 Base64로 인라인해 풀었습니다. 원인이 프론트엔드 밖에 있어도 직접 확인합니다.',
        en: 'SPA search visibility got per-route meta HTML generated at build time; broken Korean fonts in PDFs were fixed by bundling the fonts and inlining them as Base64. If the cause sits outside the frontend, I still go and look.',
      },
    },
  ],
}

export const projects: Project[] = [
  {
    slug: 'vitalvet',
    name: 'VitalVET',
    kind: { ko: '동물병원 임상 SaaS, 프론트엔드 전담', en: 'Veterinary clinical SaaS, frontend owner' },
    company: 'MetaDx',
    period: '2026.02 -',
    shot: '/shots/vitalvet.webp',
    aspect: 1280 / 681,
    points: [
      {
        title: { ko: '입원 차트 재렌더 범위 축소', en: 'Narrowed inpatient-chart re-renders' },
        body: {
          ko: '입원 차트는 셀 하나를 고치면 표 전체가 다시 그려졌습니다. 행·셀 컴포넌트 4개에 React.memo를 적용하고, 콜백은 ref로 안정화하고, 셀 데이터를 행 단위로 나눠 넘겨 수정된 행만 다시 그려지게 했습니다.',
          en: 'Editing one cell re-rendered the whole chart. React.memo on four row and cell components, ref-stabilised callbacks and per-row data slices mean only the edited row re-renders now.',
        },
      },
      {
        title: { ko: '흩어진 결제 폼 상태 통합', en: 'Unified scattered payment-form state' },
        body: {
          ko: 'Jotai atom 7개에 흩어져 있던 결제 폼 입력값을 react-hook-form 하나로 모으고 결제 요청은 훅으로 분리했습니다. 결제 진입·시작·실패·완료 이벤트를 추적하고, 결제 상태 전이와 검증 유틸에 단위 테스트 34개를 붙였습니다.',
          en: 'Payment inputs spread across 7 Jotai atoms now live in one react-hook-form, with the payment request in its own hook. Entry, start, failure and completion events are tracked, and 34 unit tests cover state transitions and validation utils.',
        },
      },
      {
        title: { ko: '4개 언어와 운영 모니터링', en: '4 languages, production monitoring' },
        body: {
          ko: 'i18next로 한국어·영어·일본어·태국어를 지원합니다. Sentry로 오류를 추적하고, GitHub Actions 배포를 S3+CloudFront로 구성했다가 Azure Blob으로 옮겼습니다.',
          en: 'Korean, English, Japanese and Thai via i18next; Sentry error tracking; GitHub Actions deploys, first to S3 + CloudFront and later moved to Azure Blob.',
        },
      },
    ],
    snippets: [chartMemo, paymentState],
    stack: ['React', 'TypeScript', 'TanStack Router/Query', 'Jotai', 'react-hook-form', 'Storybook', 'Vitest', 'Sentry'],
  },
  {
    slug: 'homepage',
    name: 'MetaDx Homepage',
    kind: { ko: '기업 홈페이지 설계부터 운영까지', en: 'Corporate site, built and run end to end' },
    company: 'MetaDx',
    period: '2025.08 -',
    shot: '/shots/homepage.webp',
    aspect: 1440 / 900,
    url: 'https://metadxlab.com',
    points: [
      {
        title: { ko: '혼자 만들고 운영하는 사이트', en: 'Built and run solo' },
        body: {
          ko: '레포의 커밋 171건을 모두 직접 작성했습니다. 퍼블리싱부터 어드민 연동, 다국어, 배포까지 맡고 있습니다.',
          en: 'All 171 commits in the repo are mine: the UI, the admin integration, localisation and the deploy pipeline.',
        },
      },
      {
        title: { ko: 'LCP 이미지 먼저, 나머지는 나중에', en: 'LCP image first, the rest later' },
        body: {
          ko: 'LCP 대상인 히어로 이미지에 fetchPriority="high"를 주고 나머지는 loading="lazy"로 미뤘습니다. sharp로 PNG와 JPG를 WebP로 일괄 변환하는 스크립트를 만들어 이미지 용량을 줄였습니다.',
          en: 'fetchPriority="high" on the LCP hero image, loading="lazy" on the rest, and a sharp script that batch-converts PNG and JPG to WebP.',
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
        title: { ko: 'SPA의 SEO 보완', en: 'Filling the SEO gap of an SPA' },
        body: {
          ko: '빌드 뒤 라우트별 메타데이터(title, OG, canonical, JSON-LD)와 요약 콘텐츠를 담은 정적 HTML을 생성해 함께 배포합니다. 배포는 S3/CloudFront에서 Azure Blob으로 옮겼습니다.',
          en: 'After each build, per-route static HTML with metadata (title, OG, canonical, JSON-LD) and a content summary ships alongside the SPA. Hosting moved from S3/CloudFront to Azure Blob.',
        },
      },
    ],
    snippets: [scrollAttribute, seoPrerender],
    stack: ['React 19', 'TanStack Router/Query', 'Tailwind CSS v4', 'Vite', 'sharp', 'GitHub Actions', 'Azure Blob'],
  },
  {
    slug: 'campaign',
    name: 'VitalVET Campaign',
    kind: { ko: 'AI와 함께 디자인한 캠페인 랜딩', en: 'Campaign landing designed with AI' },
    company: 'MetaDx',
    period: '2026.09',
    shot: '/shots/campaign.webp',
    aspect: 1440 / 900,
    url: 'https://metadxlab.com/vitalvet-campaign',
    points: [
      {
        title: { ko: '기획서 5장에서 바로 페이지로', en: 'From a 5-slide brief to a live page' },
        body: {
          ko: '디자이너 없이 기획서 PPT 5장을 받아 Claude Code와 디자인 스킬로 레이아웃·카피·인터랙션을 잡고 바로 구현했습니다. 참고한 서비스의 인터랙션을 분석해 우리 맥락에 맞게 옮겼습니다.',
          en: 'With no designer, I took a 5-slide brief and used Claude Code with design skills to shape layout, copy and interaction, then built it directly, adapting interactions from reference products.',
        },
      },
      {
        title: { ko: '홈 진입 프로모 모달', en: 'Promo modal on the home page' },
        body: {
          ko: '홈에 캠페인 안내 모달을 띄우고 "오늘 하루 보지 않기"를 넣었습니다. 캠페인 종료일이 지나면 모달은 자동으로 숨겨집니다.',
          en: 'A campaign modal on the home page with "don’t show today" and automatic retirement after the campaign ends.',
        },
      },
      {
        title: { ko: '검색에 걸리는 캠페인', en: 'Indexable from day one' },
        body: {
          ko: 'SEO 메타와 브레드크럼을 넣어 정적 HTML과 사이트맵에 바로 포함되게 했습니다.',
          en: 'SEO metadata and breadcrumbs so the page ships as static HTML and lands in the sitemap.',
        },
      },
    ],
    snippets: [promoModal],
    stack: ['React 19', 'TanStack Router', 'Tailwind CSS v4', 'Claude Code'],
  },
  {
    slug: 'office',
    name: 'MetaDx Office',
    kind: { ko: '사내 전자결재와 경비 관리, 15개월 1인 개발', en: 'Internal e-approval & expenses, solo for 15 months' },
    company: 'MetaDx',
    period: '2025.05 - 2026.08',
    shot: '/shots/office.webp',
    aspect: 1230 / 1240,
    points: [
      {
        title: { ko: '편집한 행만 다시 그리기', en: 'Only the edited row re-renders' },
        body: {
          ko: '지출품의서 표는 행이 많아 한 칸만 고쳐도 표 전체가 다시 그려졌습니다. 각 행이 jotai selectAtom으로 자기 데이터만 구독하게 바꾸고, 1번 행을 고칠 때 2번 행이 다시 그려지지 않는지 테스트 7개로 확인합니다.',
          en: 'Editing one cell of the expense table re-rendered the whole table. Each row now subscribes to its own slice via jotai selectAtom, and 7 tests assert that editing row 1 never re-renders row 2.',
        },
      },
      {
        title: { ko: '쓰던 결재 문서 자동 저장', en: 'Drafts that survive a closed tab' },
        body: {
          ko: '문서 종류와 문서 번호를 키로 IndexedDB에 임시저장하고 다시 들어오면 복구합니다. 제출에 성공하면 임시본을 지웁니다. 문서 6종이 같은 저장·복구 훅을 씁니다.',
          en: 'Drafts are saved to IndexedDB keyed by document type and number, restored on return, and cleared on successful submit. All 6 document types share one save/restore hook.',
        },
      },
      {
        title: { ko: '영수증과 첨부 파일', en: 'Receipts and attachments' },
        body: {
          ko: '아이폰 영수증(HEIC)은 확장자 대신 파일 앞부분 바이트로 판별하고, 변환 라이브러리는 필요할 때만 불러와 JPEG로 바꿉니다. PDF 미리보기와 PDF 내보내기 라이브러리도 버튼을 누를 때 불러와 첫 로딩에서 뺐습니다.',
          en: 'iPhone receipts (HEIC) are detected by magic bytes rather than extension and converted to JPEG with a library loaded only on demand. PDF preview and export libraries also load on click, keeping them out of the initial bundle.',
        },
      },
      {
        title: { ko: '옛 버전에 갇히지 않는 배포', en: 'Deploys that never strand users' },
        body: {
          ko: 'PWA라 배포 후에도 옛 화면이 남는 문제가 있었습니다. GitHub Actions로 Azure Blob에 배포할 때 index.html, 서비스워커, manifest만 캐시 없이 다시 올리고, 새 서비스워커는 바로 교체되게 했습니다.',
          en: 'As a PWA, old builds lingered after deploys. The GitHub Actions upload to Azure Blob re-sends index.html, the service worker and the manifest with no-cache, and the new worker takes over immediately.',
        },
      },
    ],
    snippets: [rowSubscription, draftHook],
    stack: ['React 19', 'TypeScript', 'TanStack Router/Query', 'Jotai', 'Vite', 'Vitest', 'PWA', 'Azure Blob'],
  },
  {
    slug: 'motungi',
    name: '모퉁이 motungi',
    kind: { ko: '퇴근 후 동네 여가 추천 서비스', en: 'After-work local picks for Seoul' },
    company: { ko: '개인 프로젝트', en: 'Side project' },
    period: '2026.07 -',
    shot: '/shots/motungi.webp',
    aspect: 1440 / 900,
    url: 'https://motungi-web.vercel.app',
    points: [
      {
        title: { ko: '추천 점수를 실측으로 바로잡기', en: 'Fixing the scorer with real numbers' },
        body: {
          ko: '후보를 마감 임박순으로 자른 뒤 채점하다 보니, 망원동 10km 후보 236건 중 30건만 점수를 받고 있었습니다. 후보 창을 넓혀 점수순으로 자르게 바꾸고, 사전 필터 때문에 상수가 된 관심사 가중치는 나머지 축에 비례 배분했습니다.',
          en: 'Candidates were cut by deadline before scoring, so only 30 of 236 within 10km of Mangwon were ever scored. The window now cuts by score, and the interest weight that the pre-filter had flattened is redistributed across the other axes.',
        },
      },
      {
        title: { ko: '공공데이터 5종 매일 적재', en: 'Five public data sources, every morning' },
        body: {
          ko: 'Supabase Edge Function과 pg_cron으로 매일 06시에 공공데이터 5종을 적재합니다. 좌표가 없는 KOPIS 공연은 공연마다 API를 부르는 대신 공연장 이름으로 색인해 63곳을 모두 매칭했고, 카탈로그가 520건에서 902건으로 늘었습니다.',
          en: 'A Supabase Edge Function on pg_cron loads five public sources at 06:00 daily. KOPIS shows have no coordinates, so instead of one API call per show, venues are indexed by name: all 63 matched and the catalog grew from 520 to 902 items.',
        },
      },
      {
        title: { ko: '측정하고 나서 고치기', en: 'Measure, then fix' },
        body: {
          ko: 'Pretendard를 자체 호스팅해 FCP를 88ms에서 56ms로 줄이고, 반경 조회를 서버로 옮겨 왕복 2회를 1회로 줄였습니다. 저장 토글처럼 자주 쓰는 인터랙션은 렌더 횟수를 테스트로 재서 10회를 6회로 낮췄습니다.',
          en: 'Self-hosting Pretendard took FCP from 88ms to 56ms, and moving the radius query server-side cut two round trips to one. Render counts are measured in tests: the save toggle went from 10 renders to 6.',
        },
      },
    ],
    snippets: [scoring, venueIndex],
    stack: ['Next.js 15', 'React 19', 'Expo', 'Supabase', 'pg_cron', 'pnpm', 'Turborepo', 'Vitest'],
  },
]

/** 캡쳐가 없는 작업은 3D 스토리 대신 짧은 목록으로 */
export const otherWork: { name: L; kind: L; period: string; body: L; stack: string }[] = [
  {
    name: { ko: 'CancerVET', en: 'CancerVET' },
    kind: { ko: '진단 리포트 PDF 생성 파이프라인', en: 'Diagnostic report PDF pipeline' },
    period: '2025.08 - 2025.09',
    body: {
      ko: '검사 결과 리포트 UI를 HTML/CSS로 만들고, 기존 Playwright 기반 PDF 변환 코드에 RDS 데이터 조회, 데이터 바인딩, S3 업로드를 붙여 리포트 생성 흐름을 완성했습니다. 로컬과 Linux 컨테이너에서 한글 폰트가 어긋나던 문제는 Pretendard와 NotoSansKR을 레포에 넣고 Base64로 인라인했습니다.',
      en: 'Built the report UI in HTML/CSS and completed the flow around an existing Playwright PDF converter: RDS lookup, data binding and S3 upload. Korean fonts that drifted between local and Linux containers were fixed by bundling Pretendard and NotoSansKR and inlining them as Base64.',
    },
    stack: 'Python, FastAPI, Playwright, AWS S3, RDS(MySQL)',
  },
  {
    name: { ko: '문서관리 시스템', en: 'Document management system' },
    kind: { ko: '퀀텀에이아이, 보험금 청구 서류 자동화', en: 'Quantum AI, insurance-claim paperwork' },
    period: '2022.11 - 2023.03',
    body: {
      ko: 'Spring Boot의 Controller-Service-Repository 구조로 문서 등록·조회·수정 API를 만들고 문서·사용자·청구 이력 테이블을 설계했습니다. 문서에서 추출·요약한 텍스트를 청구 입력값으로 연결해 MariaDB에 적재했습니다.',
      en: 'Built document CRUD APIs in Spring Boot (controller, service, repository) and designed the document, user and claim-history tables. Text extracted and summarised from documents was mapped into claim fields and stored in MariaDB.',
    },
    stack: 'Spring Boot, JSP, jQuery, MariaDB',
  },
]

export type AiCase = {
  id: string
  title: L
  problem: L
  approach: L
  tradeoff: L
  rules?: { ko: string; en: string }[]
  snippet?: Snippet
}

export const aiWorkflow = {
  title: { ko: 'AI가 쓴 코드도\n규칙을 지키게', en: 'Making AI-written code\nfollow the rules' } satisfies L,
  lede: {
    ko: 'VitalVET과 개인 프로젝트에서 Claude Code로 만드는 코드의 비중이 커지면서 생긴 문제와, 그걸 푼 방식입니다.',
    en: 'What went wrong as more of VitalVET and my side project was written with Claude Code, and how I fixed it.',
  } satisfies L,
  cases: [
    {
      id: 'hook',
      title: { ko: '파일을 고치는 순간 검사하는 린트 훅', en: 'A lint hook that runs on every edit' },
      problem: {
        ko: 'AI가 만든 코드가 늘면서 FSD 경계가 조금씩 무너졌습니다. entities에서 mutation을 부르거나, 다른 슬라이스의 내부 파일을 직접 import하거나, 공용 Dialog 대신 모달을 새로 만드는 식입니다. 리뷰에서 같은 지적을 반복했고 CLAUDE.md에 적어 둬도 긴 작업 중에는 다시 어겼습니다.',
        en: 'As AI output grew, FSD boundaries slowly eroded: mutations in entities, deep imports into another slice, hand-rolled modals instead of the shared Dialog. Reviews repeated the same comments, and writing the rules in CLAUDE.md did not survive long sessions.',
      },
      approach: {
        ko: 'Claude Code가 Edit나 Write로 파일을 저장할 때마다 실행되는 PostToolUse 훅(fsd-lint.mjs)을 만들었습니다. 위반을 찾으면 exit 2로 에이전트에게 파일 경로, 줄 번호, 고치는 방법을 돌려보내고, 에이전트는 다음 단계로 넘어가기 전에 그 자리에서 고칩니다.',
        en: 'I added a PostToolUse hook (fsd-lint.mjs) that runs every time Claude Code saves a file with Edit or Write. On a violation it exits with code 2 and hands the agent the file, line and the fix, so the agent corrects it before moving on.',
      },
      tradeoff: {
        ko: '기존 코드의 위반까지 전부 막으면 작업이 멈춥니다. 그래서 훅은 방금 수정한 파일만 검사하고 새로 들어온 위반만 고치라고 안내합니다. 남은 위반은 그 파일을 다시 만질 때 조금씩 고쳐 나갑니다.',
        en: 'Blocking every legacy violation would halt all work. The hook checks only the file just edited and asks the agent to fix only newly introduced violations; old ones are paid down whenever that file is touched again.',
      },
      rules: [
        { ko: 'entities에서 useMutation 금지. features/{slice}/model로 이동', en: 'No useMutation in entities; move it to features/{slice}/model' },
        { ko: 'API 주소 환경변수 직접 사용 금지. shared/api 클라이언트 경유', en: 'No raw API env var; go through the shared/api client' },
        { ko: '종·성별 한글 리터럴 금지. 4개 언어 대응을 위해 API 코드 그대로', en: 'No hard-coded Korean species/sex labels; keep API codes for 4 locales' },
        { ko: 'fixed inset-0 커스텀 모달 금지. shared/ui의 Dialog 사용', en: 'No custom fixed inset-0 modals; use the shared Dialog' },
        { ko: '다른 슬라이스 깊은 경로 import 금지. Public API 경유', en: 'No deep imports into another slice; use its public API' },
      ],
      snippet: lintHook,
    },
    {
      id: 'agents',
      title: { ko: '한 프롬프트 대신 역할별 에이전트', en: 'Role-based agents instead of one prompt' },
      problem: {
        ko: '구현, 스타일링, UX 검토를 한 프롬프트에 맡기면 결과가 섞이고, 디자인 토큰이나 보호자 동의 플로우 같은 기준을 매번 다시 설명해야 했습니다.',
        en: 'Handing implementation, styling and UX review to one prompt blurred the results, and I had to re-explain standards like design tokens or the owner-consent flow every time.',
      },
      approach: {
        ko: '역할을 서브에이전트로 나눴습니다. styling-expert는 Tailwind 컨벤션과 반응형을 맡고, ux-reviewer는 진료 중인 수의사의 흐름을 기준으로 UI를 검토하면서 반복되는 기준을 프로젝트 메모리에 쌓습니다. 성능 측정은 "추정 금지, 측정값만"을 원칙으로 한 전용 프롬프트로 분리했습니다. 커밋·PR 규칙, React 성능과 훅 규칙 같은 반복 작업은 슬래시 커맨드 9종으로, 디자인 작업은 스킬 13종으로 묶었습니다.',
        en: 'Roles became sub-agents. styling-expert owns Tailwind conventions and responsiveness; ux-reviewer reviews UI from the point of view of a vet mid-treatment and keeps recurring standards in project memory. Performance work got its own prompt with one rule: measured numbers only. Repeated chores (commit and PR rules, React performance and hook rules) became 9 slash commands, and design work became 13 skills.',
      },
      tradeoff: {
        ko: '에이전트가 많아지면 무엇을 불러야 할지가 새 비용이 됩니다. 그래서 각 에이전트 설명에 언제 쓰는지 예시를 넣어 상황에 맞으면 자동으로 호출되게 했습니다.',
        en: 'More agents means a new cost: knowing which one to call. Each agent description carries "when to use" examples so it gets invoked automatically.',
      },
    },
    {
      id: 'context',
      title: { ko: '팀 사이 컨텍스트를 레포로', en: 'Team context in a repo, not in chat' },
      problem: {
        ko: '인프라·백엔드·ML 팀이 각자 Claude Code를 쓰는데, 한쪽 결과를 다른 쪽에 사람이 복사해 옮기고 있었습니다. 옮기는 과정에서 맥락이 빠지고 같은 설명을 여러 번 했습니다.',
        en: 'Infra, backend and ML each ran their own Claude Code, and people were copy-pasting results between them. Context got lost in transit and the same explanations were repeated.',
      },
      approach: {
        ko: '공유 레포에 요청, 공용 컨텍스트(엔드포인트, 도메인 라우팅 등), 의사결정 로그를 두고 각 프로젝트의 CLAUDE.md가 이 레포를 참조하게 했습니다. 요청은 정해진 형식의 이슈로 만들고 합의된 계약은 공용 컨텍스트에 반영한 뒤 이슈를 닫습니다. 지금은 사내 5개 프로젝트가 같은 작업 정보를 봅니다.',
        en: 'A shared repo holds requests, shared context (endpoints, domain routing and so on) and a decision log, and every project’s CLAUDE.md points to it. Requests are filed as issues in a fixed format; once a contract is agreed it moves into shared context and the issue closes. Five internal projects now read from the same context.',
      },
      tradeoff: {
        ko: '문서가 쌓이면 오래된 정보가 섞입니다. 처리된 요청은 보관 폴더로 옮겨 동결하고, 에이전트는 최신 컨텍스트만 읽게 했습니다.',
        en: 'Accumulated docs go stale. Handled requests are archived and frozen so agents read only current context.',
      },
    },
    {
      id: 'nightly',
      title: { ko: '밤마다 일하는 개발 에이전트', en: 'A development agent that works nights' },
      problem: {
        ko: '개인 프로젝트 모퉁이는 퇴근 뒤에만 손댈 수 있어서, 작은 이슈들이 백로그에 계속 쌓였습니다.',
        en: 'My side project motungi only got evening hours, so small issues kept piling up in the backlog.',
      },
      approach: {
        ko: '매일 밤 클라우드에서 도는 에이전트가 백로그에서 이슈를 1~3개 골라 구현하고, typecheck와 test를 통과해야만 dev 브랜치에 올립니다. main 승격은 사람이 검수한 뒤에만 합니다. 할 일이 2개 미만이면 에이전트가 코드를 감사해 새 이슈를 등록합니다. 이렇게 에이전트가 만든 커밋이 123개입니다.',
        en: 'Every night a cloud agent picks 1 to 3 backlog issues, implements them and pushes to dev only if typecheck and tests pass. Promotion to main happens only after human review. When fewer than two tasks remain, the agent audits the code and files new ones. 123 commits so far are its own.',
      },
      tradeoff: {
        ko: '처음엔 밤마다 새 브랜치를 파서 머지 충돌이 쌓였고, 트리거 설정과 레포 문서가 서로 어긋나 9일 동안 헛돈 적도 있습니다. 브랜치는 트렁크 방식으로 바꾸고, 규칙의 기준을 레포 문서 하나로 맞췄습니다.',
        en: 'Early on, a new branch every night piled up merge conflicts, and a mismatch between the trigger config and the repo docs made it spin for nine days. It now works trunk-style, and the repo docs are the single source of its rules.',
      },
    },
  ] satisfies AiCase[],
  labels: {
    problem: { ko: '문제', en: 'Problem' },
    approach: { ko: '방법', en: 'Approach' },
    tradeoff: { ko: '트레이드오프', en: 'Trade-off' },
    rules: { ko: '훅이 검사하는 규칙 일부', en: 'Some of the rules the hook checks' },
  },
}

export const skillGroups: { label: L; rows: { label: L; items: string }[] }[] = [
  {
    label: { ko: '화면', en: 'Frontend' },
    rows: [
      { label: { ko: '언어·프레임워크', en: 'Core' }, items: 'TypeScript, React 19, Next.js, React Native(Expo), Tailwind CSS' },
      { label: { ko: '상태와 폼', en: 'State & forms' }, items: 'TanStack Query/Router, Jotai, react-hook-form, zod' },
      { label: { ko: '아키텍처', en: 'Architecture' }, items: 'Feature-Sliced Design, Claude Code hooks' },
    ],
  },
  {
    label: { ko: '품질과 AI', en: 'Quality & AI' },
    rows: [
      { label: { ko: '테스트', en: 'Testing' }, items: 'Vitest, Testing Library, Storybook, tsc, ESLint, husky' },
      { label: { ko: 'AI 개발 환경', en: 'AI tooling' }, items: 'Claude Code, MCP, CLAUDE.md, lint hooks, sub-agents' },
    ],
  },
  {
    label: { ko: '서버와 운영', en: 'Server & ops' },
    rows: [
      { label: { ko: '백엔드', en: 'Backend' }, items: 'Supabase(Postgres, Edge Functions), Python, FastAPI, Spring Boot, MariaDB' },
      { label: { ko: '인프라', en: 'Infra' }, items: 'GitHub Actions, AWS S3·CloudFront, Azure Blob, PWA, Sentry, i18next' },
    ],
  },
]

export const timeline: { period: string; org: L; detail: L }[] = [
  {
    period: '2024.10 -',
    org: { ko: '메타디엑스', en: 'MetaDx Inc.' },
    detail: { ko: '웹 개발, 정규직', en: 'Web engineer, full-time' },
  },
  {
    period: '2024.11 - 2025.02',
    org: { ko: '항해 플러스 프론트엔드 5기', en: 'Hanghae Plus Frontend, 5th cohort' },
    detail: { ko: '프론트엔드 심화 과정 수료', en: 'Advanced frontend program' },
  },
  {
    period: '2022.11 - 2023.03',
    org: { ko: '퀀텀에이아이', en: 'Quantum AI' },
    detail: { ko: '프론트엔드·백엔드 개발, 정규직', en: 'Frontend and backend, full-time' },
  },
  {
    period: '2022.05 - 2022.08',
    org: { ko: '위코드 34기', en: 'wecode, 34th cohort' },
    detail: { ko: '프론트엔드 부트캠프 수료', en: 'Frontend bootcamp' },
  },
  {
    period: '2014.03 - 2020.08',
    org: { ko: '숭실대학교 평생교육원', en: 'Soongsil University (Continuing Ed.)' },
    detail: {
      ko: '정보통신공학 학사. 정보처리기사, 네트워크관리사 2급',
      en: 'B.S. Information & Communication Eng. Engineer Information Processing',
    },
  },
]

export const ui = {
  nav: {
    about: { ko: '소개', en: 'About' },
    work: { ko: '작업', en: 'Work' },
    ai: { ko: 'AI', en: 'AI' },
    contact: { ko: '연락', en: 'Contact' },
  },
  study: { ko: '공부', en: 'Study' },
  showCode: { ko: '어떻게 풀었는지', en: 'How I solved it' },
  prevCode: { ko: '이전 코드', en: 'Previous snippet' },
  nextCode: { ko: '다음 코드', en: 'Next snippet' },
  peek: { ko: '작업 보기', en: 'See the work' },
  workTitle: { ko: '만든 서비스', en: 'What I’ve built' },
  workNote: {
    ko: '홈페이지, 캠페인, 모퉁이는 지금 운영 중인 사이트에서 바로 볼 수 있습니다. VitalVET과 Office는 병원과 사내에서 쓰는 서비스라 캡처로 대신합니다.',
    en: 'The website, the campaign and motungi are live, so you can open them. VitalVET and Office run inside clinics and the company, so they are shown as captures.',
  },
  visit: { ko: '사이트 보기', en: 'Open site' },
  otherTitle: { ko: '화면 밖의 작업', en: 'Work behind the screen' },
  stackTitle: { ko: '다루는 도구', en: 'Tools' },
  historyTitle: { ko: '이력', en: 'History' },
  contactTitle: { ko: '좋은 팀과의 대화는\n언제나 환영합니다.', en: 'Always open to\na good conversation.' },
  menu: { ko: '메뉴', en: 'Menu' },
} satisfies Record<string, L | Record<string, L>>
