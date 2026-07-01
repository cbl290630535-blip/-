import { AnimatePresence, motion, useInView } from 'framer-motion';
import { ExternalLink, Headphones, Layers3, Music2, X } from 'lucide-react';
import { useRef, useState } from 'react';

const bilibiliEntries = [
  {
    title: '勇敢的心：世界大战',
    note: '游戏原声',
    source: 'Bilibili',
    url: 'https://www.bilibili.com/video/BV1ax411b7R3/',
  },
  {
    title: '终焉之莉莉',
    note: '原声音轨合集入口',
    source: 'Bilibili',
    url: 'https://www.bilibili.com/video/BV1xW4y1p71r/',
  },
  {
    title: '战场相关留白处理',
    note: '情绪留白 / 战场氛围',
    source: 'Bilibili',
    url: 'https://www.bilibili.com/video/BV1194y157Da/',
  },
  {
    title: '紫罗兰永恒花园',
    note: '原声入口',
    source: 'Bilibili',
    url: 'https://www.bilibili.com/video/BV1yASBBBE9E/',
  },
  {
    title: '极乐迪斯科',
    note: '原声入口',
    source: 'Bilibili',
    url: 'https://www.bilibili.com/video/BV1w7411k7V2/',
  },
  {
    title: '后室',
    note: '入口',
    source: 'Bilibili',
    url: 'https://www.bilibili.com/video/BV1C77L6ZEgd?spm_id_from=333.788.videopod.episodes&vd_source=a04fdcda3711d7c9712f64416916716a&p=26',
  },
  {
    title: 'AD:PIANO IX -Alt-',
    note: 'P10 · ARForest - When You Were Here',
    source: 'Bilibili',
    url: 'https://www.bilibili.com/video/BV1x14y1G7XM?spm_id_from=333.788.videopod.episodes&vd_source=a04fdcda3711d7c9712f64416916716a&p=10',
  },
];

const neteaseGroups = [
  {
    label: '梦境流程',
    description: '梦境感 / 梅塔相关流程',
    entries: [
      {
        title: 'Dream Sequence',
        note: 'song',
        url: 'https://music.163.com/song?id=2605226144&userid=263908694',
      },
    ],
  },
  {
    label: '逃跑流程',
    description: '音色设计 / 逃跑流程',
    entries: [
      {
        title: 'Escape Texture',
        note: 'song',
        url: 'https://music.163.com/song?id=2611226700&userid=263908694',
      },
    ],
  },
  {
    label: '战争版本',
    description: '1999 / 极乐迪斯科战争题材',
    entries: [
      {
        title: '1999 战争相关版本 OST',
        note: 'album',
        url: 'https://music.163.com/album?id=277533540&userid=263908694',
      },
      {
        title: '1999 战争相关版本歌曲',
        note: 'song',
        url: 'https://music.163.com/song?id=2723776139&userid=263908694',
      },
      {
        title: '极乐迪斯科战争题材 OST',
        note: 'album',
        url: 'https://music.163.com/album?id=156507488&userid=263908694',
      },
    ],
  },
  {
    label: '仪式感',
    description: '唱诗班 / 圣咏质感',
    entries: [
      {
        title: 'Choral Ceremony',
        note: 'song',
        url: 'https://music.163.com/song?id=2118755650&userid=263908694',
      },
    ],
  },
];

const emotionTagGroups = [
  {
    label: '核心情绪',
    labelEn: 'Core Mood',
    tags: [
      { zh: '忧伤', en: 'Melancholic' },
      { zh: '梦境感', en: 'Dreamlike' },
      { zh: '脆弱', en: 'Fragile' },
      { zh: '温柔', en: 'Tender' },
      { zh: '怀旧', en: 'Nostalgic' },
      { zh: '肃穆', en: 'Solemn' },
    ],
  },
  {
    label: '叙事流程',
    labelEn: 'Narrative Flow',
    tags: [
      { zh: '逃离', en: 'Escape' },
      { zh: '追逐', en: 'Pursuit' },
      { zh: '余波', en: 'Aftermath' },
      { zh: '告别', en: 'Farewell' },
      { zh: '苏醒', en: 'Awakening' },
      { zh: '记忆', en: 'Memory' },
    ],
  },
  {
    label: '战争质感',
    labelEn: 'War Texture',
    tags: [
      { zh: '战争', en: 'War' },
      { zh: '废墟', en: 'Ruins' },
      { zh: '抵抗', en: 'Resistance' },
      { zh: '荒凉', en: 'Desolate' },
      { zh: '人文感', en: 'Humanist' },
      { zh: '政治性', en: 'Political' },
    ],
  },
  {
    label: '圣咏气质',
    labelEn: 'Sacred Sound',
    tags: [
      { zh: '唱诗班', en: 'Choir' },
      { zh: '吟唱', en: 'Chant' },
      { zh: '仪式感', en: 'Ritual' },
      { zh: '圣歌', en: 'Hymnal' },
      { zh: '典礼感', en: 'Ceremonial' },
      { zh: '超越感', en: 'Transcendent' },
    ],
  },
  {
    label: '音色设计',
    labelEn: 'Sound Design',
    tags: [
      { zh: '氛围', en: 'Ambient' },
      { zh: '管弦', en: 'Orchestral' },
      { zh: '八音盒', en: 'Music Box' },
      { zh: '模拟噪声', en: 'Analog Noise' },
      { zh: '脉冲', en: 'Pulse' },
      { zh: '混响', en: 'Reverb' },
    ],
  },
];

function StaggeredFade({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <span ref={ref} aria-label={text} className="block">
      {text.split('').map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          aria-hidden="true"
          className="inline-block"
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          variants={{
            hidden: { opacity: 0, y: 0 },
            show: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.42, delay: i * 0.07, ease: 'easeOut' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}

function Navigation() {
  return (
    <nav className="relative z-20 flex items-center px-5 pt-5 sm:px-8 sm:pt-7">
      <a
        href="#"
        className="text-xs font-light uppercase tracking-[0.25em] text-white transition-colors duration-300 hover:text-white md:text-sm md:tracking-[0.3em]"
      >
        OST Reference
      </a>
    </nav>
  );
}

function PrimaryArchive({ onReferencesOpen }: { onReferencesOpen: () => void }) {
  return (
    <section
      id="archive"
      aria-label="Bilibili OST archive"
      className="absolute inset-x-4 bottom-4 z-20 sm:inset-x-6 lg:inset-x-10"
    >
      <motion.div
        className="archive-glass mx-auto max-w-7xl rounded-[1.45rem] px-3 py-3 sm:px-4 sm:py-4"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 2.28, ease: 'easeOut' }}
      >
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="flex min-w-0 items-center gap-3 px-1 lg:w-56 lg:shrink-0">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/10 text-white/85">
              <Headphones size={18} />
            </span>
            <div className="min-w-0">
              <p className="text-[0.62rem] font-light uppercase tracking-[0.26em] text-white/55">
                Main Links
              </p>
              <p className="truncate text-sm font-light tracking-[0.04em] text-white/90">
                Bilibili 主要入口
              </p>
            </div>
          </div>

          <div className="flex min-w-0 flex-1 gap-2 overflow-x-auto pb-1 sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-3 2xl:grid-cols-7">
            {bilibiliEntries.map((entry, index) => (
              <motion.a
                key={entry.url}
                href={entry.url}
                target="_blank"
                rel="noreferrer"
                className="group flex min-h-[4.2rem] min-w-[13rem] items-center justify-between gap-3 rounded-2xl bg-white/[0.035] px-3.5 py-3 text-white/[0.86] transition-colors hover:bg-white/[0.08] hover:text-white sm:min-w-0"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.34,
                  delay: 2.38 + index * 0.06,
                  ease: 'easeOut',
                }}
              >
                <span className="min-w-0">
                  <span className="block truncate text-sm font-light tracking-[0.02em]">
                    {entry.title}
                  </span>
                  <span className="mt-1 block truncate text-xs font-light text-white/45">
                    {entry.note} · {entry.source}
                  </span>
                </span>
                <ExternalLink
                  size={15}
                  className="shrink-0 text-white/35 transition-colors group-hover:text-white/75"
                />
              </motion.a>
            ))}
          </div>

          <button
            type="button"
            onClick={onReferencesOpen}
            className="flex h-12 items-center justify-center gap-2 rounded-full bg-white/[0.07] px-5 text-[0.62rem] font-light uppercase tracking-[0.2em] text-white/75 transition-colors hover:bg-white/[0.12] hover:text-white lg:h-[4.2rem] lg:w-36 lg:shrink-0 lg:flex-col lg:gap-1 lg:rounded-2xl"
          >
            <Layers3 size={16} />
            网易云
          </button>
        </div>
      </motion.div>
    </section>
  );
}

function ReferenceWindow({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-40 flex items-end justify-center bg-black/35 px-4 pb-4 pt-20 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="NetEase reference window"
            className="archive-glass relative max-h-[78vh] w-full max-w-3xl overflow-y-auto rounded-[1.6rem] p-5 sm:p-6"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.34, ease: 'easeOut' }}
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-[0.62rem] font-light uppercase tracking-[0.28em] text-white/50">
                  Reference Window
                </p>
                <h2 className="font-garamond mt-2 text-3xl font-normal leading-none text-white sm:text-4xl">
                  网易云参考集合
                </h2>
              </div>
              <button
                type="button"
                aria-label="Close NetEase references"
                onClick={onClose}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/[0.08] text-white/75 transition-colors hover:bg-white/[0.12] hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {neteaseGroups.map((group, groupIndex) => (
                <motion.div
                  key={group.label}
                  className="rounded-2xl bg-white/[0.04] p-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.28,
                    delay: 0.08 + groupIndex * 0.06,
                    ease: 'easeOut',
                  }}
                >
                  <div className="mb-3 flex items-center gap-2 text-white/90">
                    <Music2 size={16} />
                    <h3 className="text-sm font-light tracking-[0.08em]">
                      {group.label}
                    </h3>
                  </div>
                  <p className="mb-4 text-xs font-light leading-relaxed text-white/45">
                    {group.description}
                  </p>
                  <div className="grid gap-2">
                    {group.entries.map((entry) => (
                      <a
                        key={entry.url}
                        href={entry.url}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-center justify-between gap-3 rounded-xl bg-black/15 px-3 py-2.5 text-white/75 transition-colors hover:bg-white/[0.07] hover:text-white"
                      >
                        <span className="min-w-0">
                          <span className="block truncate text-xs font-light tracking-[0.03em]">
                            {entry.title}
                          </span>
                          <span className="mt-1 block text-[0.62rem] uppercase tracking-[0.18em] text-white/35">
                            NetEase {entry.note}
                          </span>
                        </span>
                        <ExternalLink
                          size={14}
                          className="shrink-0 text-white/35 transition-colors group-hover:text-white/75"
                        />
                      </a>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function MoodTagWindow({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-40 flex items-end justify-center bg-black/35 px-4 pb-4 pt-20 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Version 3.8 emotion tags"
            className="archive-glass relative max-h-[78vh] w-full max-w-4xl overflow-y-auto rounded-[1.6rem] p-5 sm:p-6"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.34, ease: 'easeOut' }}
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-[0.62rem] font-light uppercase tracking-[0.28em] text-white/50">
                  Main Entry · Version v3.8
                </p>
                <h2 className="font-garamond mt-2 text-3xl font-normal leading-none text-white sm:text-5xl">
                  情绪标签 / Emotion Tags
                </h2>
              </div>
              <button
                type="button"
                aria-label="Close emotion tags"
                onClick={onClose}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/[0.08] text-white/75 transition-colors hover:bg-white/[0.12] hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {emotionTagGroups.map((group, groupIndex) => (
                <motion.section
                  key={group.label}
                  className="rounded-2xl bg-white/[0.04] p-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.28,
                    delay: 0.08 + groupIndex * 0.06,
                    ease: 'easeOut',
                  }}
                >
                  <p className="mb-3 text-[0.62rem] font-light uppercase tracking-[0.22em] text-white/45">
                    {group.label} / {group.labelEn}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {group.tags.map((tag) => (
                      <span
                        key={`${tag.zh}-${tag.en}`}
                        className="rounded-2xl bg-white/[0.07] px-3 py-2 text-left font-light text-white/[0.82]"
                      >
                        <span className="block text-xs tracking-[0.08em]">
                          {tag.zh}
                        </span>
                        <span className="mt-0.5 block text-[0.62rem] uppercase tracking-[0.14em] text-white/45">
                          {tag.en}
                        </span>
                      </span>
                    ))}
                  </div>
                </motion.section>
              ))}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default function App() {
  const [isReferenceOpen, setIsReferenceOpen] = useState(false);
  const [isMoodOpen, setIsMoodOpen] = useState(false);

  return (
    <main className="relative h-screen min-h-screen overflow-hidden bg-[#010101] font-body text-white">
      <video
        className="absolute inset-0 h-full w-full object-cover object-center"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260619_191346_9d19d66e-86a4-47f7-8dc6-712c1788c3b2.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),rgba(1,1,1,0.1)_38%,rgba(1,1,1,0.72)_100%)]" />
      <div className="absolute inset-0 bg-black/20" />

      <Navigation />

      <section className="relative z-10 flex min-h-[calc(100vh-9.5rem)] flex-col items-center justify-center px-5 pb-28 pt-12 text-center sm:px-8 sm:pb-32 sm:pt-16 md:pt-24 lg:pb-36">
        <h1 className="font-garamond mb-3 text-5xl font-normal leading-[1.08] tracking-tight text-white sm:text-7xl md:text-8xl lg:text-9xl">
          <StaggeredFade text="OST Reference" />
        </h1>

        <motion.p
          className="mb-6 text-[0.68rem] font-light uppercase tracking-[0.32em] text-white/55 sm:mb-8 sm:text-xs"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.05, ease: 'easeOut' }}
        >
          version v3.8
        </motion.p>

        <motion.p
          className="mb-8 max-w-xs text-sm font-light leading-relaxed text-white/70 sm:mb-10 sm:max-w-md sm:text-base md:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6, ease: 'easeOut' }}
        >
          游戏、动画与叙事音乐的听感入口，
          <br className="hidden sm:block" />
          按主链接与辅助参考分层整理。
        </motion.p>

        <motion.button
          type="button"
          onClick={() => setIsMoodOpen(true)}
          className="liquid-glass rounded-full px-7 py-3.5 text-xs font-light uppercase tracking-[0.18em] text-white/90 transition-colors sm:px-10 sm:py-4 sm:tracking-[0.2em]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.0, ease: 'easeOut' }}
        >
          Emotion Tags · 情绪标签
        </motion.button>
      </section>

      <PrimaryArchive onReferencesOpen={() => setIsReferenceOpen(true)} />
      <ReferenceWindow
        isOpen={isReferenceOpen}
        onClose={() => setIsReferenceOpen(false)}
      />
      <MoodTagWindow isOpen={isMoodOpen} onClose={() => setIsMoodOpen(false)} />
    </main>
  );
}
