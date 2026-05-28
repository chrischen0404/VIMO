import { useMemo, useState } from 'react';
import {
  Activity,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Bell,
  Building2,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  CreditCard,
  Database,
  Download,
  Dumbbell,
  FileCheck2,
  HeartPulse,
  Home,
  Landmark,
  LineChart,
  MapPin,
  MessageCircle,
  ReceiptText,
  RotateCw,
  Send,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  Trophy,
  Users,
  WalletCards,
  Watch
} from 'lucide-react';

const platformStats = [
  ['本週運動願望', '128 個'],
  ['即將成局願望', '12 個'],
  ['教練／場館回應', '32 筆']
];

const wishesSeed = [
  {
    id: 'kids-basketball',
    title: '週六兒童籃球新手班',
    region: '新竹市東區',
    participants: 24,
    threshold: 30,
    provider: '已有 2 位教練可承接',
    status: '即將成局',
    revenue: '每期約 NT$18,000–36,000',
    image: '/media/home-hero.png',
    imageClass: 'object-cover object-center',
    tags: ['親子', '初學友善', '週六上午']
  },
  {
    id: 'hsp-badminton',
    title: '竹科企業羽球團建',
    region: '竹科生活圈',
    participants: 36,
    threshold: 40,
    provider: '3 位教練、1 間場館已回應',
    status: '高潛力需求',
    revenue: '單場約 NT$30,000 起',
    image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1200&q=82',
    imageClass: 'object-cover object-center',
    tags: ['企業團建', '羽球', '可包場']
  },
  {
    id: 'tennis-starter',
    title: '網球新手體驗局',
    region: '竹北',
    participants: 10,
    threshold: 10,
    provider: '可立即開局',
    status: '已達成局門檻',
    revenue: '可立即開局',
    image: '/media/hero-motion.jpg',
    imageClass: 'object-cover object-center',
    tags: ['新手', '體驗', '小班']
  },
  {
    id: 'senior-strength',
    title: '銀髮防跌肌力課',
    region: '社區據點',
    participants: 18,
    threshold: 20,
    provider: '1 位教練可承接，待媒合場地',
    status: '接近成局',
    revenue: '可發展長期課程',
    image: '/media/senior-strength.jpg',
    imageClass: 'object-cover object-[center_35%]',
    tags: ['銀髮健康', '低中強度', '長期課']
  }
];

const supplyOpportunities = [
  ['週六兒童籃球班', '新竹市東區', '24 / 30 人', '即將成局', '每期約 NT$18,000–36,000', '我要承接這個願望'],
  ['竹科企業羽球團建', '竹科生活圈', '36 / 40 人', '高潛力需求', '單場約 NT$30,000 起', '提出活動方案'],
  ['網球新手體驗局', '竹北', '10 / 10 人', '已達成局門檻', '可立即開局', '一鍵接單並發布活動'],
  ['銀髮防跌肌力課', '社區據點', '18 / 20 人', '接近成局', '可發展長期課程', '媒合場地與教練']
];

const businessCards = [
  ['SaaS 訂閱', '教練、場館與主辦方可訂閱進階看板，查看熱門需求與潛在客源。'],
  ['媒合手續費', '願望成功成局並完成報名交易後，平台收取媒合或交易服務費。'],
  ['活動工具箱', '提供報名、付款、退費、通知、名單管理與評價回饋工具，降低主辦成本。']
];

const toolbox = [
  [ClipboardList, '報名管理'],
  [WalletCards, '收款與退費'],
  [Download, '名單匯出'],
  [Bell, '活動通知'],
  [Star, '評價回饋'],
  [ShieldCheck, '保險／風險提醒']
];

const trustBadges = [
  'VIMO 標準化退費保障',
  '教練執照已實名認證',
  '場地安全資訊已確認',
  '活動強度與風險分級',
  '年齡與程度分流',
  '評價與回饋機制'
];

const dataLoop = ['使用者許願', '熱度池累積', '供給端看見需求', '教練／場館承接', '活動成局', '報名與參與', '評價回饋', '推薦更精準', '下一輪願望'];

const revenueModels = [
  ['活動／課程／賽事交易服務費', '當願望成功成局並產生活動報名，平台可收取交易或媒合服務費。'],
  ['教練／場館 SaaS 訂閱', '供給端可訂閱進階看板，查看熱門願望、潛在客源與需求趨勢。'],
  ['進階曝光與精準推薦', '教練、場館或活動主辦方可購買更高曝光或精準推薦位置。'],
  ['運動生態圈分潤', '與保險、運動用品、旅遊、住宿、餐飲、企業福利等合作，創造場景式分潤。']
];

const abilityRows = [
  ['心肺能力', '中等'],
  ['近期運動頻率', '每週 2–3 次'],
  ['運動強度紀錄', '穩定'],
  ['建議分級', '初中階'],
  ['適合活動', '新手友善局、親子活動、低中強度課程']
];

function App() {
  const [wishes, setWishes] = useState(wishesSeed);
  const [toast, setToast] = useState('');
  const [abilityCertified, setAbilityCertified] = useState(false);
  const [selectedWish, setSelectedWish] = useState(wishesSeed[0]);

  const rankedWishes = useMemo(
    () => [...wishes].sort((a, b) => b.participants / b.threshold - a.participants / a.threshold),
    [wishes]
  );

  const showToast = (message) => {
    setToast(message);
    window.clearTimeout(window.__vimoToast);
    window.__vimoToast = window.setTimeout(() => setToast(''), 2800);
  };

  const joinWish = (wish) => {
    setSelectedWish(wish);
    setWishes((items) =>
      items.map((item) => (item.id === wish.id ? { ...item, participants: Math.min(item.participants + 1, item.threshold) } : item))
    );
    showToast(`已加入「${wish.title}」，熱度已更新。`);
  };

  const shareWish = (wish) => {
    setSelectedWish(wish);
    showToast(`分享連結已建立：我正在 VIMO 許願「${wish.title}」，還差 ${Math.max(wish.threshold - wish.participants, 0)} 人就能成局，一起加入！`);
  };

  const acceptWish = (title) => {
    showToast(`已建立「${title}」承接草案，可使用辦賽工具箱完成活動方案。`);
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] pb-24 text-ink-700 md:pb-0">
      <Header />
      <Hero rankedWishes={rankedWishes} />
      <WishPool wishes={rankedWishes} onJoin={joinWish} onShare={shareWish} />
      <SupplyDashboard onAccept={acceptWish} />
      <AbilityCertification abilityCertified={abilityCertified} setAbilityCertified={setAbilityCertified} showToast={showToast} />
      <TrustGovernance selectedWish={selectedWish} />
      <DataLoop />
      <BusinessModel />
      <LeadForms />
      <FinalCta />
      <BottomNav />
      {toast && <Toast message={toast} />}
    </main>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/88 backdrop-blur-2xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
        <a href="#home" className="flex min-w-0 items-center gap-3" aria-label="VIMO 願動首頁">
          <img className="h-14 w-24 shrink-0 object-contain" src="/icons/vimo-mark-transparent.svg" alt="" aria-hidden="true" />
          <div className="hidden leading-tight sm:block">
            <p className="text-[15px] font-semibold tracking-[0.16em] text-ink-700">VIMO</p>
            <p className="text-xs font-medium text-ink-400">願動</p>
          </div>
        </a>
        <nav className="hidden items-center gap-6 text-sm font-semibold text-ink-500 lg:flex">
          <a href="#pool">運動許願池</a>
          <a href="#dashboard">主辦方看板</a>
          <a href="#ability">能力認證</a>
          <a href="#trust">信任機制</a>
          <a href="#business">商業模式</a>
        </nav>
        <a className="btn-primary h-11 px-5 text-sm" href="#pool">開始許願</a>
      </div>
    </header>
  );
}

function Hero({ rankedWishes }) {
  return (
    <section id="home" className="section-shell grid min-h-[760px] items-center gap-10 pt-16 lg:grid-cols-[0.95fr_1.05fr]">
      <div>
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-ink-500 shadow-soft">
          <Sparkles className="h-4 w-4 text-coral-500" />
          運動需求聚合 × 雙邊市場媒合
        </div>
        <h1 className="text-balance text-5xl font-semibold leading-[1.05] text-ink-700 sm:text-6xl">
          VIMO 願動｜讓運動願望成局
        </h1>
        <p className="mt-6 max-w-2xl text-xl leading-9 text-ink-500">
          聚集真實運動需求，媒合教練、場館與活動資源，讓每一個想運動的人，都能找到適合自己的局。
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {platformStats.map(([label, value]) => (
            <div key={label} className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-soft">
              <p className="text-sm font-semibold text-ink-400">{label}</p>
              <p className="mt-2 text-3xl font-semibold text-ink-700">{value}</p>
            </div>
          ))}
        </div>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a className="btn-primary h-14 px-7 text-base" href="#pool">
            進入運動許願池
            <ArrowRight className="h-5 w-5" />
          </a>
          <a className="btn-secondary h-14 px-7 text-base" href="#ability">
            取得能力認證
          </a>
        </div>
      </div>
      <div className="rounded-[36px] border border-slate-200 bg-white p-4 shadow-card">
        <div className="rounded-[28px] bg-gradient-to-br from-ice-50 via-white to-mint-50 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-mint-700">即時熱度池</p>
              <h2 className="mt-1 text-2xl font-semibold text-ink-700">即將成局願望</h2>
            </div>
            <BarChart3 className="h-8 w-8 text-coral-500" />
          </div>
          <div className="mt-5 space-y-3">
            {rankedWishes.slice(0, 4).map((wish, index) => (
              <div key={wish.id} className="rounded-2xl bg-white p-4 shadow-soft">
                <div className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-mint-50 text-sm font-semibold text-mint-700">{index + 1}</span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-ink-700">{wish.title}</p>
                    <p className="mt-1 text-sm text-ink-400">{wish.region} · {wish.participants} / {wish.threshold} 人</p>
                    <Progress participants={wish.participants} threshold={wish.threshold} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function WishPool({ wishes, onJoin, onShare }) {
  return (
    <section id="pool" className="section-shell">
      <SectionHeading
        eyebrow="運動許願池"
        title="熱門願望卡片"
        copy="使用者為了讓自己的願望成局，會主動邀請朋友加入；供給端則能直接看到可承接的需求。"
      />
      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        {wishes.map((wish) => (
          <WishCard key={wish.id} wish={wish} onJoin={onJoin} onShare={onShare} />
        ))}
      </div>
    </section>
  );
}

function WishCard({ wish, onJoin, onShare }) {
  const missing = Math.max(wish.threshold - wish.participants, 0);
  const percent = Math.min(Math.round((wish.participants / wish.threshold) * 100), 100);
  const hot = percent >= 80;

  return (
    <article className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-card">
      <div className="grid gap-0 md:grid-cols-[220px_1fr]">
        <img className={`h-56 w-full md:h-full ${wish.imageClass}`} src={wish.image} alt={wish.title} />
        <div className="p-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${hot ? 'bg-coral-50 text-coral-700' : 'bg-mint-50 text-mint-700'}`}>
              {hot ? '🔥 熱度上升中' : wish.status}
            </span>
            {wish.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-ink-500">{tag}</span>
            ))}
          </div>
          <h3 className="mt-4 text-2xl font-semibold text-ink-700">{wish.title}</h3>
          <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-ink-400">
            <MapPin className="h-4 w-4 text-coral-500" />
            {wish.region}
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <MiniMetric label="熱度" value={`${wish.participants} / ${wish.threshold} 人`} />
            <MiniMetric label="狀態" value={missing === 0 ? '已解鎖' : `還差 ${missing} 人`} />
            <MiniMetric label="供給端回應" value={wish.provider} />
          </div>
          <Progress participants={wish.participants} threshold={wish.threshold} hot={hot} />
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <button className="btn-accent h-12 px-5" aria-label={`我也想參加 ${wish.title}`} onClick={() => onJoin(wish)}>
              我也想參加
            </button>
            <button className="btn-secondary h-12 px-5 text-sm" aria-label={`分享邀請 ${wish.title}`} onClick={() => onShare(wish)}>
              還差 {missing} 人解鎖！分享至 LINE / IG
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

function SupplyDashboard({ onAccept }) {
  return (
    <section id="dashboard" className="section-shell">
      <SectionHeading
        eyebrow="主辦方看板"
        title="潛在客源熱度看板"
        copy="教練、場館與主辦方不需要盲目開課，而是依據已被聚合的需求判斷是否承接。"
      />
      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        {businessCards.map(([title, text]) => (
          <div key={title} className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-soft">
            <p className="text-lg font-semibold text-ink-700">{title}</p>
            <p className="mt-3 text-sm leading-6 text-ink-500">{text}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-card">
        <div className="grid grid-cols-6 gap-4 border-b border-slate-100 bg-slate-50 px-5 py-4 text-xs font-semibold text-ink-400 max-lg:hidden">
          <span>需求</span><span>地區</span><span>熱度</span><span>狀態</span><span>建議收益</span><span>動作</span>
        </div>
        {supplyOpportunities.map(([name, region, heat, status, revenue, cta]) => (
          <div key={name} className="grid gap-4 border-b border-slate-100 px-5 py-5 last:border-b-0 lg:grid-cols-6 lg:items-center">
            <div className="font-semibold text-ink-700">{name}</div>
            <div className="text-sm text-ink-500">{region}</div>
            <div className="text-sm font-semibold text-mint-700">{heat}</div>
            <div><span className="rounded-full bg-coral-50 px-3 py-1 text-xs font-semibold text-coral-700">{status}</span></div>
            <div className="text-sm text-ink-500">{revenue}</div>
            <button className="btn-accent h-11 px-4 text-sm" aria-label={`${cta} ${name}`} onClick={() => onAccept(name)}>{cta}</button>
          </div>
        ))}
      </div>
      <Toolbox />
    </section>
  );
}

function Toolbox() {
  return (
    <div className="mt-6 rounded-[30px] border border-slate-200 bg-white p-6 shadow-soft">
      <div className="flex items-center gap-3">
        <ReceiptText className="h-6 w-6 text-coral-500" />
        <h3 className="text-2xl font-semibold text-ink-700">辦賽工具箱</h3>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
        {toolbox.map(([Icon, label]) => (
          <div key={label} className="rounded-2xl bg-slate-50 p-4 text-center">
            <Icon className="mx-auto h-6 w-6 text-mint-600" />
            <p className="mt-3 text-sm font-semibold text-ink-600">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function AbilityCertification({ abilityCertified, setAbilityCertified, showToast }) {
  return (
    <section id="ability" className="section-shell">
      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-mint-600">Objective ability</p>
          <h2 className="mt-3 text-4xl font-semibold text-ink-700">客觀能力認證</h2>
          <p className="mt-4 leading-8 text-ink-500">
            透過 Apple Health、Garmin 或其他穿戴裝置資料，建立更準確的運動能力分級，避免使用者主觀高估或低估自身能力。
          </p>
          <button
            className="btn-primary mt-7 h-14 px-6"
            onClick={() => {
              setAbilityCertified(true);
              showToast('已模擬連接穿戴裝置，能力認證狀態已更新。');
            }}
          >
            <Watch className="h-5 w-5" />
            連接穿戴裝置，取得能力認證
          </button>
        </div>
        <div className="rounded-[34px] border border-slate-200 bg-white p-6 shadow-card">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-ink-400">Apple Health / Garmin</p>
              <h3 className="mt-1 text-2xl font-semibold text-ink-700">運動能力資料卡</h3>
            </div>
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${abilityCertified ? 'bg-mint-50 text-mint-700' : 'bg-gold-100 text-ink-600'}`}>
              {abilityCertified ? '已完成客觀能力認證' : '尚未認證，建議連接裝置'}
            </span>
          </div>
          <div className="mt-5 grid gap-3">
            {abilityRows.map(([label, value]) => (
              <div key={label} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                <span className="text-sm font-semibold text-ink-400">{label}</span>
                <span className="text-right text-sm font-semibold text-ink-700">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustGovernance({ selectedWish }) {
  return (
    <section id="trust" className="section-shell">
      <SectionHeading
        eyebrow="信任治理"
        title="活動詳情與報名前確認"
        copy="VIMO 不只媒合，也在報名、風險揭露、退費規則與評價回饋中建立平台治理。"
      />
      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-card">
          <p className="text-sm font-semibold text-coral-600">{selectedWish.region}</p>
          <h3 className="mt-2 text-3xl font-semibold text-ink-700">{selectedWish.title}</h3>
          <div className="mt-5 flex flex-wrap gap-2">
            {trustBadges.map((badge) => (
              <span key={badge} className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-2 text-xs font-semibold text-ink-600">
                <BadgeCheck className="h-4 w-4 text-mint-600" />
                {badge}
              </span>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <div className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-soft">
            <h4 className="flex items-center gap-2 text-xl font-semibold text-ink-700">
              <ShieldCheck className="h-5 w-5 text-coral-500" />
              報名前請確認
            </h4>
            <p className="mt-3 text-sm leading-7 text-ink-500">
              本活動已標示運動強度、適合程度與退費規則。請依自身健康狀況選擇適合活動，如有特殊疾病或身體不適，請先諮詢專業人員。
            </p>
          </div>
          <div className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-soft">
            <h4 className="flex items-center gap-2 text-xl font-semibold text-ink-700">
              <FileCheck2 className="h-5 w-5 text-mint-600" />
              退款規則
            </h4>
            <p className="mt-3 whitespace-pre-line text-sm leading-7 text-ink-500">
              活動開始 7 日前取消：可全額退費{'\n'}
              活動開始 3 日前取消：可退 50%{'\n'}
              活動開始前 72 小時內取消：依主辦方規則辦理
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function DataLoop() {
  return (
    <section className="section-shell">
      <SectionHeading
        eyebrow="資料回饋閉環"
        title="每一次願望與參與，都會讓推薦更精準"
        copy="VIMO 的價值會隨著許願、參與、評價與供給端回應不斷累積，形成運動生活平台的資料資產。"
      />
      <div className="mt-8 grid gap-3 md:grid-cols-3 lg:grid-cols-9">
        {dataLoop.map((step, index) => (
          <div key={step} className="relative rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-soft">
            <span className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-mint-50 text-xs font-semibold text-mint-700">{index + 1}</span>
            <p className="mt-3 text-sm font-semibold text-ink-600">{step}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function BusinessModel() {
  return (
    <section id="business" className="section-shell">
      <SectionHeading eyebrow="Revenue model" title="VIMO 如何創造收益" copy="需求聚合不是流量頁，而是交易、工具、供給端訂閱與生態分潤的入口。" />
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {revenueModels.map(([title, text], index) => (
          <div key={title} className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-soft">
            <span className="text-sm font-semibold text-coral-500">0{index + 1}</span>
            <h3 className="mt-4 text-xl font-semibold text-ink-700">{title}</h3>
            <p className="mt-3 text-sm leading-6 text-ink-500">{text}</p>
          </div>
        ))}
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
    <form name="vimo-wish" method="POST" action="/success.html" data-netlify="true" data-netlify-honeypot="bot-field" className="rounded-[34px] border border-slate-200 bg-white p-6 shadow-card sm:p-8">
      <input type="hidden" name="form-name" value="vimo-wish" />
      <p className="hidden"><label>不需填寫 <input name="bot-field" /></label></p>
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-coral-600">需求端</p>
      <h2 className="mt-3 text-3xl font-semibold text-ink-700">新增我的運動願望</h2>
      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        <Field label="姓名" name="name" placeholder="王小願" required />
        <Field label="Email" name="email" type="email" placeholder="you@example.com" required />
        <Field label="城市 / 區域" name="city" placeholder="新竹市東區" required />
        <Field label="運動項目" name="sport" placeholder="籃球、羽球、網球..." required />
      </div>
      <TextareaField label="你的願望" name="wish" placeholder="我希望週六上午能找到兒童籃球新手班..." required />
      <button className="btn-accent mt-6 h-14 w-full px-6 text-base sm:w-auto" type="submit">
        送出願望
        <Send className="h-5 w-5" />
      </button>
    </form>
  );
}

function ProviderForm() {
  return (
    <form name="vimo-provider" method="POST" action="/success.html" data-netlify="true" data-netlify-honeypot="bot-field" className="rounded-[34px] bg-ink-700 p-6 text-white shadow-card sm:p-8">
      <input type="hidden" name="form-name" value="vimo-provider" />
      <p className="hidden"><label>不需填寫 <input name="bot-field" /></label></p>
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-ice-200">供給端</p>
      <h2 className="mt-3 text-3xl font-semibold">申請加入主辦方看板</h2>
      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        <Field dark label="單位 / 品牌" name="company" placeholder="VIMO 運動教室" required />
        <Field dark label="聯絡人角色" name="role" placeholder="教練 / 場館經理" required />
        <Field dark label="Email" name="email" type="email" placeholder="partner@example.com" required />
        <Field dark label="服務區域" name="city" placeholder="新竹、竹北、台北..." required />
      </div>
      <TextareaField dark label="可提供資源" name="message" placeholder="場地、教練、裁判、活動企劃、保險..." required />
      <button className="mt-6 inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-white px-6 text-base font-semibold text-ink-700 shadow-glow transition duration-200 hover:-translate-y-0.5 sm:w-auto" type="submit">
        申請加入
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

function TextareaField({ label, name, placeholder, required, dark }) {
  return (
    <label className="mt-4 block">
      <span className={`text-sm font-semibold ${dark ? 'text-ice-50/80' : 'text-ink-500'}`}>{label}</span>
      <textarea className={`form-input min-h-32 resize-y ${dark ? 'form-input-dark' : ''}`} name={name} placeholder={placeholder} required={required} />
    </label>
  );
}

function MiniMetric({ label, value }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-3">
      <p className="text-xs font-semibold text-ink-400">{label}</p>
      <p className="mt-1 text-sm font-semibold text-ink-700">{value}</p>
    </div>
  );
}

function Progress({ participants, threshold, hot }) {
  const percent = Math.min((participants / threshold) * 100, 100);
  return (
    <div className="mt-4">
      <div className="mb-2 flex justify-between text-xs font-semibold text-ink-400">
        <span>熱度進度</span>
        <span>{Math.round(percent)}%</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-slate-100">
        <div className={`h-full rounded-full ${hot || percent >= 80 ? 'bg-gradient-to-r from-coral-400 to-gold-400 shadow-[0_0_18px_rgba(245,107,93,0.45)]' : 'bg-gradient-to-r from-ice-400 to-mint-400'}`} style={{ width: `${percent}%` }} />
      </div>
    </div>
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
      <div className="rounded-[38px] bg-gradient-to-br from-white via-ice-50 to-mint-50 p-8 text-center shadow-card sm:p-12">
        <Landmark className="mx-auto h-10 w-10 text-coral-500" />
        <h2 className="mt-5 text-4xl font-semibold text-ink-700">讓運動願望成為可被投資、可被承接、可被治理的平台市場</h2>
        <p className="mx-auto mt-4 max-w-2xl leading-7 text-ink-500">
          VIMO 將需求、供給、能力分級、信任機制與資料回饋整合在同一個運動科技平台原型中。
        </p>
      </div>
    </section>
  );
}

function BottomNav() {
  const items = [
    [Home, '首頁', '#home'],
    [Dumbbell, '許願池', '#pool'],
    [LineChart, '主辦方', '#dashboard'],
    [Smartphone, '我的', '#ability']
  ];

  return (
    <nav className="fixed inset-x-3 bottom-3 z-50 grid grid-cols-4 rounded-[28px] border border-slate-200 bg-white/92 p-2 shadow-card backdrop-blur-xl md:hidden">
      {items.map(([Icon, label, href]) => (
        <a key={label} href={href} className="flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-xs font-semibold text-ink-500">
          <Icon className="h-5 w-5" />
          {label}
        </a>
      ))}
    </nav>
  );
}

function Toast({ message }) {
  return (
    <div className="fixed left-1/2 top-20 z-[80] w-[min(92vw,520px)] -translate-x-1/2 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-semibold text-ink-700 shadow-card">
      {message}
    </div>
  );
}

export default App;
