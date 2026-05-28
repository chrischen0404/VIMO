import {
  ArrowRight,
  Building2,
  CircleDollarSign,
  Dumbbell,
  Flame,
  CheckCircle2,
  Handshake,
  MapPin,
  Medal,
  Send,
  Sparkles,
  Users,
  Waves
} from 'lucide-react';

const hotWishes = [
  {
    title: '社區銀髮肌力課',
    meta: '北投關渡 · 94% 熱度',
    image: '/media/senior-strength.jpg',
    tags: ['銀髮健康', '教練媒合', 'TOP 1'],
    accent: 'from-ice-400 to-motion-500'
  },
  {
    title: '下班後羽球共學團',
    meta: '信義松山 · 82% 熱度',
    image: '/media/hero-motion.jpg',
    tags: ['新手友善', '場地需求', '晚間'],
    accent: 'from-gold-400 to-amber-500'
  },
  {
    title: '親子週末跑跳營',
    meta: '新北板橋 · 76% 熱度',
    image: '/media/hero-motion.jpg',
    tags: ['親子', '活動企劃', '周末'],
    accent: 'from-aqua-400 to-emerald-400'
  }
];

const heatSegments = [
  { label: '想參加', value: '1,284', width: '34%', color: 'bg-ice-400' },
  { label: '想學習', value: '876', width: '24%', color: 'bg-motion-500' },
  { label: '想揪團', value: '642', width: '18%', color: 'bg-gold-400' },
  { label: '想辦活動', value: '512', width: '15%', color: 'bg-aqua-400' }
];

const flowSteps = [
  ['許願', '用一句話說出想運動、想學習、想揪團或想辦活動的需求。'],
  ['聚集熱度', '同區域與同興趣的人一起推高水位，讓需求變得可被看見。'],
  ['供給媒合', '場地、教練、裁判、主辦方與品牌供給進場評估。'],
  ['活動成局', '當需求和供給到位，願望就會被推進成真實行動。']
];

const providerCards = [
  { icon: Building2, title: '場地方', text: '把空檔時段變成高轉換活動入口。' },
  { icon: Medal, title: '教練 / 裁判', text: '用技能承接已經被驗證的在地需求。' },
  { icon: CircleDollarSign, title: '周邊廠商', text: '在活動形成前就理解族群與採購意圖。' }
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
    <main className="min-h-screen overflow-hidden bg-[#f8fafc] text-ink-700">
      <Header />
      <Hero />
      <BrandIntro />
      <section id="popular" className="section-shell pt-8">
        <SectionHeading
          eyebrow="Popular wishes"
          title="熱門願望卡片"
          copy="VIMO 先讓需求被看見，再讓供給端精準靠近。每一張卡片都是一個正在升溫的運動生活提案。"
        />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {hotWishes.map((wish) => (
            <WishCard key={wish.title} wish={wish} />
          ))}
        </div>
      </section>
      <HeatPool />
      <Flow />
      <Providers />
      <LeadForms />
      <FinalCta />
    </main>
  );
}

function BrandIntro() {
  return (
    <section id="brand" className="section-shell pt-4">
      <div className="grid gap-5 rounded-[34px] border border-white/80 bg-white/75 p-6 shadow-soft backdrop-blur-2xl md:grid-cols-[0.9fr_1.1fr] md:p-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-ice-600">Brand definition</p>
          <h2 className="mt-3 text-3xl font-semibold text-ink-700">VIMO = Vow Into Motion</h2>
        </div>
        <p className="text-base leading-8 text-ink-500">
          VIMO 願動是一個運動生活平台，幫助使用者把「想運動、想學習、想揪團、想辦活動」的願望聚集起來，透過熱度累積與供給媒合，讓活動真正成局。
        </p>
      </div>
    </section>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/70 bg-white/70 backdrop-blur-2xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="#top" className="flex items-center gap-3" aria-label="VIMO 願動首頁">
          <img className="h-10 w-10 rounded-2xl shadow-glow" src="/icons/vimo-icon.svg" alt="" />
          <div className="leading-tight">
            <p className="text-[15px] font-semibold tracking-[0.16em] text-ink-700">VIMO</p>
            <p className="text-xs font-medium text-ink-400">願動</p>
          </div>
        </a>
        <nav className="hidden items-center gap-7 text-sm font-medium text-ink-500 md:flex">
          <a href="#popular">熱門願望</a>
          <a href="#heat">熱度池</a>
          <a href="#providers">供給加入</a>
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
    <section id="top" className="section-shell relative grid min-h-[760px] items-center gap-10 pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:pt-12">
      <div className="pointer-events-none absolute left-[-18%] top-24 h-80 w-80 rounded-full bg-ice-200/50 blur-3xl" />
      <div className="pointer-events-none absolute bottom-20 right-[-16%] h-96 w-96 rounded-full bg-aqua-200/60 blur-3xl" />
      <div className="relative z-10 max-w-2xl">
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/70 px-4 py-2 text-sm font-semibold text-ink-500 shadow-soft backdrop-blur-xl">
          <Sparkles className="h-4 w-4 text-gold-500" />
          Vow Into Motion
        </div>
        <h1 className="text-balance text-5xl font-semibold leading-[1.02] tracking-normal text-ink-700 sm:text-6xl lg:text-7xl">
          VIMO 願動
        </h1>
        <p className="mt-5 text-balance text-3xl font-semibold leading-tight text-ink-600 sm:text-4xl">
          Turn Your Wish Into Motion.
        </p>
        <p className="mt-6 max-w-xl text-lg leading-8 text-ink-500">
          把想運動、想學習、想揪團、想辦活動的願望聚集起來，透過熱度累積與供給媒合，讓活動真正成局。
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a className="btn-primary h-14 px-7 text-base" href="#wish-form" onClick={() => trackEvent('cta_click', { location: 'hero', target: 'wish_form' })}>
            開始許願
            <ArrowRight className="h-5 w-5" />
          </a>
          <a className="btn-secondary h-14 px-7 text-base" href="#provider-form" onClick={() => trackEvent('cta_click', { location: 'hero', target: 'provider_form' })}>
            供給端加入
          </a>
        </div>
      </div>
      <div className="relative z-10">
        <div className="hero-device">
          <div className="hero-screen">
            <div className="absolute inset-0 bg-[url('/media/hero-motion.jpg')] bg-cover bg-center opacity-[0.42]" />
            <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-white/75 to-ice-100/60" />
            <div className="relative flex h-full flex-col justify-between p-6">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-ink-500 shadow-soft">Live Heat</span>
                <Waves className="h-6 w-6 text-ice-500" />
              </div>
              <div>
                <div className="mb-4 flex items-end justify-between">
                  <div>
                    <p className="text-sm font-semibold text-ink-400">社區銀髮肌力課</p>
                    <p className="text-5xl font-semibold text-ink-700">94%</p>
                  </div>
                  <div className="rounded-2xl bg-white/80 px-4 py-3 text-right shadow-soft">
                    <p className="text-xs font-semibold text-ink-400">距離成局</p>
                    <p className="text-xl font-semibold text-motion-600">6%</p>
                  </div>
                </div>
                <div className="h-4 overflow-hidden rounded-full bg-white/80 shadow-inner">
                  <div className="h-full w-[94%] rounded-full bg-gradient-to-r from-ice-400 via-motion-500 to-gold-400" />
                </div>
                <div className="mt-5 grid grid-cols-3 gap-3">
                  {['許願者 768', '教練 12', '場地 4'].map((item) => (
                    <div key={item} className="rounded-2xl bg-white/75 px-3 py-3 text-center text-xs font-semibold text-ink-500 shadow-soft">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeading({ eyebrow, title, copy }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-ice-600">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-normal text-ink-700 sm:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-7 text-ink-500">{copy}</p>
    </div>
  );
}

function WishCard({ wish }) {
  return (
    <article className="group overflow-hidden rounded-[28px] border border-white/80 bg-white/80 shadow-soft backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:shadow-card">
      <div className="relative h-56 overflow-hidden">
        <img className="h-full w-full object-cover transition duration-500 group-hover:scale-105" src={wish.image} alt={wish.title} />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-700/50 via-transparent to-white/10" />
        <div className={`absolute left-4 top-4 h-2 w-20 rounded-full bg-gradient-to-r ${wish.accent}`} />
      </div>
      <div className="p-5">
        <div className="mb-4 flex flex-wrap gap-2">
          {wish.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-mist-100 px-3 py-1 text-xs font-semibold text-ink-500">
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-xl font-semibold text-ink-700">{wish.title}</h3>
        <p className="mt-2 flex items-center gap-2 text-sm font-medium text-ink-400">
          <MapPin className="h-4 w-4 text-ice-500" />
          {wish.meta}
        </p>
      </div>
    </article>
  );
}

function HeatPool() {
  return (
    <section id="heat" className="section-shell">
      <div className="rounded-[36px] border border-white/80 bg-white/80 p-6 shadow-card backdrop-blur-2xl sm:p-8 lg:p-10">
        <div className="grid gap-9 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-ice-50 px-4 py-2 text-sm font-semibold text-ice-700">
              <Flame className="h-4 w-4" />
              願望熱度池
            </p>
            <h2 className="mt-5 text-3xl font-semibold text-ink-700 sm:text-4xl">讓分散的期待，變成可以被承接的市場訊號。</h2>
            <p className="mt-4 leading-7 text-ink-500">
              VIMO 用熱度、地區、時段與供給缺口，幫主辦方和供給端看懂什麼活動真的值得啟動。
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
        eyebrow="How it moves"
        title="許願 → 聚集熱度 → 供給媒合 → 活動成局"
        copy="VIMO 不只是展示需求，而是把需求一路推進到可以行動、可以成交、可以營運的狀態。"
      />
      <div className="mt-10 grid gap-4 md:grid-cols-4">
        {flowSteps.map(([title, text], index) => (
          <div key={title} className="rounded-[26px] border border-white/80 bg-white/80 p-5 shadow-soft">
            <div className="mb-7 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-ice-100 to-aqua-100 text-sm font-semibold text-ink-600">
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

function Providers() {
  return (
    <section id="providers" className="section-shell">
      <div className="grid gap-8 rounded-[36px] bg-ink-700 p-6 text-white shadow-card sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:p-10">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-ice-200">Supply network</p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">供給端加入入口</h2>
          <p className="mt-4 leading-7 text-ice-50/80">
            如果你能提供場地、課程、裁判、教練、器材、保險或活動執行，VIMO 會讓你在需求成形前就進入正確的市場。
          </p>
          <a className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-ink-700 shadow-glow" href="#provider-form" onClick={() => trackEvent('cta_click', { location: 'providers', target: 'provider_form' })}>
            申請成為供給夥伴
            <Handshake className="h-5 w-5 text-motion-500" />
          </a>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {providerCards.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-[24px] border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
              <Icon className="h-7 w-7 text-gold-300" />
              <h3 className="mt-5 text-lg font-semibold">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-ice-50/75">{text}</p>
            </div>
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
      className="rounded-[34px] border border-white/80 bg-white/80 p-6 shadow-card backdrop-blur-2xl sm:p-8"
      onSubmit={() => trackEvent('lead_submit', { form: 'wish' })}
    >
      <input type="hidden" name="form-name" value="vimo-wish" />
      <p className="hidden">
        <label>
          不需填寫 <input name="bot-field" />
        </label>
      </p>
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-ice-600">For wishers</p>
      <h2 className="mt-3 text-3xl font-semibold text-ink-700">開始許願</h2>
      <p className="mt-3 text-sm leading-6 text-ink-500">留下你的運動願望，VIMO 會用它來測試真實需求、熱度與媒合機會。</p>
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
      className="rounded-[34px] bg-ink-700 p-6 text-white shadow-card sm:p-8"
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
        <Handshake className="h-5 w-5 text-motion-500" />
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

function FinalCta() {
  return (
    <section className="section-shell pb-16">
      <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-white via-ice-50 to-aqua-50 p-8 text-center shadow-card sm:p-12">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-white shadow-glow">
          <Dumbbell className="h-8 w-8 text-motion-500" />
        </div>
        <h2 className="text-4xl font-semibold tracking-normal text-ink-700">讓願望開始流動</h2>
        <p className="mx-auto mt-4 max-w-2xl leading-7 text-ink-500">
          從一個人的念頭，到一群人的行動。VIMO 願動，把每個還沒發生的運動生活可能性，推進成下一場活動。
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
    <main className="flex min-h-screen items-center justify-center bg-[#f8fafc] px-5 text-ink-700">
      <section className="max-w-xl rounded-[38px] border border-white/80 bg-white/80 p-8 text-center shadow-card backdrop-blur-2xl sm:p-12">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[28px] bg-gradient-to-br from-ice-100 to-aqua-100 shadow-glow">
          <CheckCircle2 className="h-10 w-10 text-motion-500" />
        </div>
        <p className="mt-8 text-sm font-semibold uppercase tracking-[0.22em] text-ice-600">Received</p>
        <h1 className="mt-3 text-4xl font-semibold text-ink-700">已收到你的回覆</h1>
        <p className="mt-4 leading-7 text-ink-500">
          謝謝你加入 VIMO 願動的早期測試名單。這份資料會幫助我們判斷哪些願望最值得被推進成下一場活動。
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
