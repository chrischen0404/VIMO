import {
  ArrowRight,
  Building2,
  CalendarDays,
  CheckCircle2,
  CircleDollarSign,
  Dumbbell,
  Eye,
  Flame,
  Handshake,
  MapPin,
  Medal,
  Send,
  ShieldCheck,
  Sparkles,
  Users,
  Waves
} from 'lucide-react';

const roles = [
  { title: '許願者', desc: '提出想運動、想學習、想揪團、想辦活動的需求。', icon: Sparkles, color: 'from-ice-100 to-lilac-100' },
  { title: '主辦方', desc: '從熱度池找到值得啟動的活動機會。', icon: CalendarDays, color: 'from-gold-100 to-coral-100' },
  { title: '場地方', desc: '用空檔時段承接已被驗證的在地需求。', icon: Building2, color: 'from-mint-100 to-ice-100' },
  { title: '周邊廠商', desc: '在活動形成前理解族群、場景與購買意圖。', icon: CircleDollarSign, color: 'from-coral-100 to-gold-100' },
  { title: '裁判', desc: '接住賽事願望，讓比賽更容易正式成局。', icon: ShieldCheck, color: 'from-lilac-100 to-white' },
  { title: '教練', desc: '把學習需求變成可報名、可追蹤的課程。', icon: Medal, color: 'from-mint-100 to-white' },
  { title: '接願者', desc: '整合供給、設計方案，將願望推進成行動。', icon: Handshake, color: 'from-ice-100 to-mint-100' },
  { title: '看熱鬧', desc: '追蹤願望升溫、幫忙投票，觀察下一個爆點。', icon: Eye, color: 'from-lilac-100 to-coral-100' }
];

const topWishes = [
  {
    title: '希望社區有適合長輩的防跌肌力課',
    tag: '銀髮健康',
    place: '北投關渡',
    image: '/media/senior-strength.jpg',
    imageClass: 'object-cover object-[center_35%]',
    wishers: 768,
    demand: 94,
    supply: 58,
    match: 86,
    needs: ['教練 2 位', '白天場地', '照護協作']
  },
  {
    title: '新竹初學者羽球友善賽',
    tag: '比賽願望',
    place: '新竹東區',
    image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1200&q=82',
    imageClass: 'object-cover object-center',
    wishers: 912,
    demand: 91,
    supply: 42,
    match: 78,
    needs: ['裁判 4 位', '週末場館', '賽務主辦']
  },
  {
    title: '親子週末跑跳體驗日',
    tag: '親子活動',
    place: '新北板橋',
    image: '/media/home-hero.png',
    imageClass: 'object-cover object-center',
    wishers: 642,
    demand: 82,
    supply: 67,
    match: 74,
    needs: ['活動設計', '親子教練', '安全保險']
  },
  {
    title: '公司想辦一場有參與感的運動日',
    tag: '企業活動',
    place: '台北內湖',
    image: '/media/hero-motion.jpg',
    imageClass: 'object-cover object-center',
    wishers: 536,
    demand: 79,
    supply: 68,
    match: 73,
    needs: ['主辦企劃', '團隊競賽', '攝影紀錄']
  },
  {
    title: '想和毛孩一起參加戶外共跑',
    tag: '毛孩活動',
    place: '台中北屯',
    image: '/media/home-hero.png',
    imageClass: 'object-cover object-center',
    wishers: 421,
    demand: 77,
    supply: 46,
    match: 64,
    needs: ['寵物友善', '補水點', '安全動線']
  }
];

const wishes = topWishes.slice(0, 3);

const heatSegments = [
  { label: '想參加', value: '1,284', width: '34%', color: 'bg-ice-400' },
  { label: '想學習', value: '876', width: '24%', color: 'bg-mint-400' },
  { label: '想揪團', value: '642', width: '18%', color: 'bg-gold-400' },
  { label: '想辦活動', value: '512', width: '15%', color: 'bg-coral-400' }
];

const flowSteps = [
  ['許願', '用一句話說出需求，選擇地區、時段、運動項目與參與方式。'],
  ['聚集熱度', '同區域與同興趣的人一起推高水位，需求變得可被看見。'],
  ['供給媒合', '主辦方、場地方、教練、裁判與品牌供給進場評估。'],
  ['活動成局', '當需求和供給到位，接願者把活動推進到報名與執行。']
];

const providerOpportunities = [
  { title: '銀髮肌力課', role: '教練 / 場地方', progress: 86, note: '需求已達啟動門檻，缺白天場地與專業教練。' },
  { title: '初學者羽球賽', role: '主辦方 / 裁判', progress: 78, note: '參與者熱度高，供給缺口集中在賽務與裁判。' },
  { title: '親子跑跳體驗', role: '活動方 / 保險', progress: 74, note: '家庭需求穩定，適合打包周邊與安全服務。' }
];

const trackEvent = (eventName, payload = {}) => {
  if (typeof window === 'undefined') return;
  window.dataLayer?.push({ event: eventName, ...payload });
  window.gtag?.('event', eventName, payload);
  window.plausible?.(eventName, { props: payload });
};

function App() {
  if (window.location.pathname === '/success') {
    return <SuccessPage />;
  }

  return (
    <main className="min-h-screen overflow-hidden bg-macaron-base text-ink-700">
      <Header />
      <Hero />
      <RoleGateway />
      <TopFiveWishes />
      <WishPool />
      <HeatPool />
      <Flow />
      <ProviderBoard />
      <LeadForms />
      <FinalCta />
    </main>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/80 bg-white/75 backdrop-blur-2xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="#top" className="flex min-w-0 items-center gap-3" aria-label="VIMO 願動首頁">
          <img className="h-11 w-11 shrink-0 rounded-2xl object-cover shadow-glow" src="/icons/vimo-icon.svg" alt="" aria-hidden="true" />
          <div className="leading-tight">
            <p className="text-[15px] font-semibold tracking-[0.16em] text-ink-700">VIMO</p>
            <p className="text-xs font-medium text-ink-400">願動</p>
          </div>
        </a>
        <nav className="hidden items-center gap-7 text-sm font-medium text-ink-500 md:flex">
          <a href="#roles">角色入口</a>
          <a href="#wish-pool">願望池</a>
          <a href="#provider-board">接願看板</a>
        </nav>
        <a className="btn-primary h-10 px-4 text-sm" href="#wish-form" onClick={() => trackEvent('cta_click', { location: 'header', target: 'wish_form' })}>
          開始許願
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="section-shell relative grid min-h-[760px] items-center gap-10 pt-16 lg:grid-cols-[0.98fr_1.02fr] lg:pt-12">
      <div className="pointer-events-none absolute left-[-16%] top-20 h-80 w-80 rounded-full bg-lilac-200/55 blur-3xl" />
      <div className="pointer-events-none absolute bottom-8 right-[-14%] h-[28rem] w-[28rem] rounded-full bg-mint-200/60 blur-3xl" />
      <div className="relative z-10 max-w-2xl">
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/75 px-4 py-2 text-sm font-semibold text-ink-500 shadow-soft backdrop-blur-xl">
          <Sparkles className="h-4 w-4 text-coral-500" />
          Vow Into Motion
        </div>
        <h1 className="text-balance text-5xl font-semibold leading-[1.02] tracking-normal text-ink-700 sm:text-6xl lg:text-7xl">
          VIMO 願動
        </h1>
        <p className="mt-5 text-balance text-3xl font-semibold leading-tight text-ink-600 sm:text-4xl">
          Turn Your Wish Into Motion.
        </p>
        <p className="mt-6 max-w-xl text-lg leading-8 text-ink-500">
          從一個人的運動願望，到一群人的行動。VIMO 讓許願者、主辦方、場地方、教練、裁判與周邊供給在同一個熱度池裡完成媒合。
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a className="btn-primary h-14 px-7 text-base" href="#wish-form" onClick={() => trackEvent('cta_click', { location: 'hero', target: 'wish_form' })}>
            開始許願
            <ArrowRight className="h-5 w-5" />
          </a>
          <a className="btn-secondary h-14 px-7 text-base" href="#roles">
            先選角色
          </a>
        </div>
      </div>
      <AppPreview />
    </section>
  );
}

function AppPreview() {
  return (
    <div className="relative z-10">
      <div className="hero-device">
        <div className="hero-screen">
          <div className="absolute inset-0 bg-gradient-to-br from-white via-ice-50 to-mint-50" />
          <div className="relative flex h-full flex-col gap-4 p-5">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-white/85 px-3 py-1 text-xs font-semibold text-ink-500 shadow-soft">VIMO 願望池</span>
              <Waves className="h-6 w-6 text-mint-500" />
            </div>
            <div className="rounded-[28px] bg-white p-4 shadow-soft">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-coral-500">本週排行榜</p>
                  <h2 className="mt-1 text-xl font-semibold text-ink-700">Top 5 願望</h2>
                </div>
                <span className="rounded-full bg-mint-50 px-3 py-1 text-xs font-semibold text-mint-700">即時熱度</span>
              </div>
              <div className="space-y-3">
                {topWishes.slice(0, 5).map((wish, index) => (
                  <div key={wish.title} className="flex items-center gap-3 rounded-2xl bg-mist-50 p-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-xs font-semibold text-ink-600 shadow-soft">{index + 1}</span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-ink-700">{wish.title}</p>
                      <p className="text-xs text-ink-400">{wish.tag} · {wish.match}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {['新願望 128', '可成局 17', '供給提案 42', '接願中 9'].map((item) => (
                <div key={item} className="rounded-2xl bg-white/80 p-3 text-center text-xs font-semibold text-ink-500 shadow-soft">
                  {item}
                </div>
              ))}
            </div>
            <button className="mt-auto h-12 rounded-full bg-ink-700 text-sm font-semibold text-white shadow-glow">我要接願</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function RoleGateway() {
  return (
    <section id="roles" className="section-shell pt-8">
      <SectionHeading
        eyebrow="角色入口"
        title="八種角色，不同入口，同一個願望池"
        copy="選擇你現在的身份，快速進入對應任務：許願、接願、提供資源，或觀察正在升溫的活動機會。"
      />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {roles.map(({ title, desc, icon: Icon, color }) => (
          <article key={title} className={`rounded-[28px] border border-white/80 bg-gradient-to-br ${color} p-5 shadow-soft`}>
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/85 shadow-soft">
              <Icon className="h-6 w-6 text-ink-600" />
            </div>
            <h3 className="text-xl font-semibold text-ink-700">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-ink-500">{desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function TopFiveWishes() {
  return (
    <section id="top-wishes" className="section-shell">
      <SectionHeading
        eyebrow="Top 5 wishes"
        title="本週 Top 5 願望"
        copy="願望依需求熱度、供給補位與媒合進度排序。越靠前，越接近被主辦方或接願者啟動。"
      />
      <div className="mt-8 grid gap-4">
        {topWishes.map((wish, index) => (
          <article key={wish.title} className="grid gap-4 rounded-[28px] border border-white/80 bg-white/82 p-4 shadow-soft backdrop-blur-xl md:grid-cols-[88px_1fr_auto] md:items-center">
            <div className="flex items-center gap-4 md:block md:text-center">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-ice-100 to-mint-100 text-lg font-semibold text-ink-700 shadow-soft">
                {index + 1}
              </span>
              <img className={`h-20 w-28 rounded-2xl md:mt-3 md:h-16 md:w-full ${wish.imageClass}`} src={wish.image} alt={wish.title} />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-coral-500">{wish.tag} · {wish.place}</p>
              <h3 className="mt-1 text-xl font-semibold text-ink-700">{wish.title}</h3>
              <p className="mt-2 text-sm text-ink-400">許願者 {wish.wishers} · 需求 {wish.demand}% · 供給 {wish.supply}%</p>
            </div>
            <div className="md:w-52">
              <HeatMeter value={wish.match} compact />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function WishPool() {
  return (
    <section id="wish-pool" className="section-shell">
      <SectionHeading
        eyebrow="願望池"
        title="正在升溫的活動機會"
        copy="每張卡片都呈現需求熱度、供給缺口與媒合進度。你可以追蹤願望，也可以成為推動它成局的一方。"
      />
      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        {wishes.map((wish) => (
          <WishCard key={wish.title} wish={wish} />
        ))}
      </div>
    </section>
  );
}

function WishCard({ wish }) {
  return (
    <article className="overflow-hidden rounded-[30px] border border-white/85 bg-white/82 shadow-card backdrop-blur-xl">
      <div className="relative h-56 overflow-hidden">
        <img className={`h-full w-full ${wish.imageClass}`} src={wish.image} alt={wish.title} />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-700/48 via-transparent to-white/5" />
        <span className="absolute left-4 top-4 rounded-full bg-white/86 px-3 py-1 text-xs font-semibold text-ink-600 shadow-soft">{wish.tag}</span>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-semibold text-ink-700">{wish.title}</h3>
        <p className="mt-2 flex items-center gap-2 text-sm font-medium text-ink-400">
          <MapPin className="h-4 w-4 text-coral-500" />
          {wish.place} · 許願者 {wish.wishers}
        </p>
        <HeatMeter value={wish.match} />
        <div className="mt-5 grid grid-cols-3 gap-2">
          <MiniStat label="需求" value={`${wish.demand}%`} tone="ice" />
          <MiniStat label="供給" value={`${wish.supply}%`} tone="mint" />
          <MiniStat label="媒合" value={`${wish.match}%`} tone="coral" />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {wish.needs.map((need) => (
            <span key={need} className="rounded-full bg-mist-100 px-3 py-1 text-xs font-semibold text-ink-500">
              {need}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

function HeatMeter({ value, compact = false }) {
  return (
    <div className="mt-4">
      <div className="mb-2 flex items-center justify-between text-xs font-semibold text-ink-400">
        <span>成局進度</span>
        <span className="text-ink-700">{value}%</span>
      </div>
      <div className="h-4 overflow-hidden rounded-full bg-mist-100 shadow-inner">
        <div className="h-full rounded-full bg-gradient-to-r from-ice-400 via-mint-400 to-gold-400" style={{ width: `${value}%` }} />
      </div>
      {!compact && (
        <div className="mt-2 flex justify-between text-[11px] font-semibold text-ink-300">
          <span>0</span>
          <span>40 累積</span>
          <span>70 接近</span>
          <span>85 可啟動</span>
          <span>100</span>
        </div>
      )}
    </div>
  );
}

function MiniStat({ label, value, tone }) {
  const toneClass = {
    ice: 'bg-ice-50 text-ice-700',
    mint: 'bg-mint-50 text-mint-700',
    coral: 'bg-coral-50 text-coral-700'
  }[tone];

  return (
    <div className={`rounded-2xl p-3 text-center ${toneClass}`}>
      <p className="text-xs font-semibold">{label}</p>
      <p className="mt-1 text-lg font-semibold">{value}</p>
    </div>
  );
}

function HeatPool() {
  return (
    <section id="heat" className="section-shell">
      <div className="rounded-[36px] border border-white/80 bg-white/80 p-6 shadow-card backdrop-blur-2xl sm:p-8 lg:p-10">
        <div className="grid gap-9 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-coral-50 px-4 py-2 text-sm font-semibold text-coral-700">
              <Flame className="h-4 w-4" />
              願望熱度池
            </p>
            <h2 className="mt-5 text-3xl font-semibold text-ink-700 sm:text-4xl">把分散的期待，整理成可被承接的市場訊號。</h2>
            <p className="mt-4 leading-7 text-ink-500">
              系統會持續整理需求、地點、時段、供給缺口和成局門檻，讓熱門願望有機會被真正承接。
            </p>
          </div>
          <div className="rounded-[28px] bg-mist-50 p-5 shadow-inner">
            <div className="mb-5 flex items-end justify-between">
              <div>
                <p className="text-sm font-semibold text-ink-400">本週累積願望</p>
                <p className="text-5xl font-semibold text-ink-700">3,314</p>
              </div>
              <p className="rounded-full bg-gold-100 px-4 py-2 text-sm font-semibold text-ink-600">+28%</p>
            </div>
            <div className="flex h-6 overflow-hidden rounded-full bg-white">
              {heatSegments.map((segment) => (
                <div key={segment.label} className={`${segment.color} h-full`} style={{ width: segment.width }} />
              ))}
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-4">
              {heatSegments.map((segment) => (
                <div key={segment.label} className="rounded-2xl bg-white p-3">
                  <p className="text-xs font-semibold text-ink-400">{segment.label}</p>
                  <p className="mt-1 text-lg font-semibold text-ink-700">{segment.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Flow() {
  return (
    <section className="section-shell">
      <SectionHeading
        eyebrow="成局流程"
        title="許願 → 聚集熱度 → 供給媒合 → 活動成局"
        copy="每一次許願都會進入熱度池。當需求和供給逐步到位，活動就能從想法進入報名與執行。"
      />
      <div className="mt-10 grid gap-4 md:grid-cols-4">
        {flowSteps.map(([title, text], index) => (
          <div key={title} className="rounded-[26px] border border-white/80 bg-white/80 p-5 shadow-soft">
            <div className="mb-7 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-lilac-100 to-mint-100 text-sm font-semibold text-ink-600">
              {String(index + 1).padStart(2, '0')}
            </div>
            <h3 className="text-xl font-semibold text-ink-700">{title}</h3>
            <p className="mt-3 text-sm leading-6 text-ink-500">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProviderBoard() {
  return (
    <section id="provider-board" className="section-shell">
      <div className="grid gap-8 rounded-[36px] bg-ink-700 p-6 text-white shadow-card sm:p-8 lg:grid-cols-[0.85fr_1.15fr] lg:p-10">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-ice-200">接願看板</p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">主辦端與接願者看到的，不是空泛需求，而是可評估機會。</h2>
          <p className="mt-4 leading-7 text-ice-50/80">
            場地方、教練、裁判、周邊廠商都能看到缺口在哪裡，決定要不要投入資源。
          </p>
          <a className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-ink-700 shadow-glow" href="#provider-form" onClick={() => trackEvent('cta_click', { location: 'provider_board', target: 'provider_form' })}>
            申請成為供給夥伴
            <Handshake className="h-5 w-5 text-mint-500" />
          </a>
        </div>
        <div className="grid gap-4">
          {providerOpportunities.map((item) => (
            <article key={item.title} className="rounded-[24px] border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-gold-300">{item.role}</p>
                  <h3 className="mt-1 text-xl font-semibold">{item.title}</h3>
                </div>
                <span className="rounded-full bg-white/14 px-3 py-1 text-sm font-semibold">{item.progress}%</span>
              </div>
              <p className="mt-3 text-sm leading-6 text-ice-50/75">{item.note}</p>
              <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/12">
                <div className="h-full rounded-full bg-gradient-to-r from-ice-300 via-mint-400 to-gold-300" style={{ width: `${item.progress}%` }} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function LeadForms() {
  return (
    <section className="section-shell" id="forms">
      <div className="grid gap-6 lg:grid-cols-2">
        <WishForm />
        <ProviderForm />
      </div>
    </section>
  );
}

function WishForm() {
  return (
    <form
      id="wish-form"
      name="vimo-wish"
      method="POST"
      action="/success.html"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      className="rounded-[34px] border border-white/80 bg-white/82 p-6 shadow-card backdrop-blur-2xl sm:p-8"
      onSubmit={() => trackEvent('lead_submit', { form: 'wish' })}
    >
      <input type="hidden" name="form-name" value="vimo-wish" />
      <p className="hidden">
        <label>
          不需填寫 <input name="bot-field" />
        </label>
      </p>
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-coral-600">For wishers</p>
      <h2 className="mt-3 text-3xl font-semibold text-ink-700">開始許願</h2>
      <p className="mt-3 text-sm leading-6 text-ink-500">留下你的運動願望，讓附近有相同需求的人一起累積熱度。</p>
      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        <Field label="姓名" name="name" placeholder="王小願" required />
        <Field label="Email" name="email" type="email" placeholder="you@example.com" required />
        <Field label="城市 / 區域" name="city" placeholder="台北市信義區" required />
        <SelectField label="願望類型" name="wishType" required options={['想運動', '想學習', '想揪團', '想辦活動']} />
        <Field label="運動項目" name="sport" placeholder="羽球、肌力、瑜珈、跑步..." required />
        <SelectField label="聯絡偏好" name="contactPreference" options={['Email', 'LINE', '電話', '先不用聯絡']} />
      </div>
      <TextareaField label="你的願望" name="wish" placeholder="我希望下班後能在附近找到新手友善的羽球共學團..." required />
      <button className="btn-primary mt-6 h-14 w-full px-6 text-base sm:w-auto" type="submit">
        送出願望
        <Send className="h-5 w-5" />
      </button>
    </form>
  );
}

function ProviderForm() {
  return (
    <form
      id="provider-form"
      name="vimo-provider"
      method="POST"
      action="/success.html"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      className="rounded-[34px] bg-gradient-to-br from-ink-700 to-ink-600 p-6 text-white shadow-card sm:p-8"
      onSubmit={() => trackEvent('lead_submit', { form: 'provider' })}
    >
      <input type="hidden" name="form-name" value="vimo-provider" />
      <p className="hidden">
        <label>
          不需填寫 <input name="bot-field" />
        </label>
      </p>
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-ice-200">For suppliers</p>
      <h2 className="mt-3 text-3xl font-semibold">供給端加入</h2>
      <p className="mt-3 text-sm leading-6 text-ice-50/80">適合場地方、教練、裁判、主辦方、器材品牌與活動服務商，先從早期合作名單開始。</p>
      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        <Field dark label="單位 / 品牌" name="company" placeholder="VIMO 運動教室" required />
        <Field dark label="聯絡人角色" name="role" placeholder="創辦人 / 教練 / 場館經理" required />
        <SelectField dark label="供給類型" name="serviceType" required options={['場地', '教練', '裁判', '活動主辦', '周邊廠商', '其他']} />
        <Field dark label="Email" name="email" type="email" placeholder="partner@example.com" required />
        <Field dark label="服務區域" name="city" placeholder="台北、新北、桃園..." required />
      </div>
      <TextareaField dark label="可以提供什麼資源？" name="message" placeholder="例如：平日晚間場地、銀髮肌力教練、賽事裁判、活動保險..." required />
      <button className="mt-6 inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-white px-6 text-base font-semibold text-ink-700 shadow-glow transition duration-200 hover:-translate-y-0.5 sm:w-auto" type="submit">
        申請加入
        <Handshake className="h-5 w-5 text-mint-500" />
      </button>
    </form>
  );
}

function Field({ label, name, type = 'text', placeholder, required, dark }) {
  return (
    <label className="block">
      <span className={`text-sm font-semibold ${dark ? 'text-ice-50/80' : 'text-ink-500'}`}>{label}</span>
      <input className={`form-input ${dark ? 'form-input-dark' : ''}`} name={name} type={type} placeholder={placeholder} required={required} />
    </label>
  );
}

function SelectField({ label, name, options, required, dark }) {
  return (
    <label className="block">
      <span className={`text-sm font-semibold ${dark ? 'text-ice-50/80' : 'text-ink-500'}`}>{label}</span>
      <select className={`form-input ${dark ? 'form-input-dark' : ''}`} name={name} required={required} defaultValue="">
        <option value="" disabled>
          請選擇
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function TextareaField({ label, name, placeholder, required, dark }) {
  return (
    <label className="mt-4 block">
      <span className={`text-sm font-semibold ${dark ? 'text-ice-50/80' : 'text-ink-500'}`}>{label}</span>
      <textarea className={`form-input min-h-32 resize-y ${dark ? 'form-input-dark' : ''}`} name={name} placeholder={placeholder} required={required} />
    </label>
  );
}

function SectionHeading({ eyebrow, title, copy }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-mint-600">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-normal text-ink-700 sm:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-7 text-ink-500">{copy}</p>
    </div>
  );
}

function FinalCta() {
  return (
    <section className="section-shell pb-16">
      <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-white via-lilac-50 to-mint-50 p-8 text-center shadow-card sm:p-12">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-white shadow-glow">
          <Dumbbell className="h-8 w-8 text-coral-500" />
        </div>
        <h2 className="text-4xl font-semibold tracking-normal text-ink-700">讓願望開始流動</h2>
        <p className="mx-auto mt-4 max-w-2xl leading-7 text-ink-500">
          從一個人的念頭，到一群人的行動。現在就把你的願望放進池裡，讓它開始被看見、被支持、被承接。
        </p>
        <a className="btn-primary mx-auto mt-8 h-14 w-fit px-8 text-base" href="#wish-form" onClick={() => trackEvent('cta_click', { location: 'final', target: 'wish_form' })}>
          開始許願
          <Users className="h-5 w-5" />
        </a>
      </div>
    </section>
  );
}

function SuccessPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-macaron-base px-5 text-ink-700">
      <section className="max-w-xl rounded-[38px] border border-white/80 bg-white/80 p-8 text-center shadow-card backdrop-blur-2xl sm:p-12">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[28px] bg-gradient-to-br from-ice-100 to-mint-100 shadow-glow">
          <CheckCircle2 className="h-10 w-10 text-mint-500" />
        </div>
        <p className="mt-8 text-sm font-semibold uppercase tracking-[0.22em] text-mint-600">Received</p>
        <h1 className="mt-3 text-4xl font-semibold text-ink-700">已收到你的回覆</h1>
        <p className="mt-4 leading-7 text-ink-500">
          謝謝你加入 VIMO 願動。這份願望會進入熱度池，成為推動下一場活動成局的起點。
        </p>
        <a className="btn-primary mx-auto mt-8 h-14 w-fit px-7 text-base" href="/">
          回到首頁
          <ArrowRight className="h-5 w-5" />
        </a>
      </section>
    </main>
  );
}

export default App;
