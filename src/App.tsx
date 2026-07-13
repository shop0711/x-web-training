import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  Columns3,
  Download,
  Lightbulb,
  List,
  Menu,
  Moon,
  MousePointer2,
  Smartphone,
  Sun,
  X,
} from "lucide-react";
import { chapters, slides, type ChapterId, type Slide } from "./slides";
import { Visual } from "./Visuals";

type ViewMode = "scroll" | "present" | "mobile";

function IconButton({ label, children, onClick, className = "" }: { label: string; children: React.ReactNode; onClick: () => void; className?: string }) {
  return <button type="button" className={`icon-btn ${className}`} aria-label={label} title={label} onClick={onClick}>{children}</button>;
}

function SlidePage({ slide, active }: { slide: Slide; active: boolean }) {
  const isCover = slide.kind === "opening" || slide.kind === "chapter";

  return (
    <section
      id={slide.id}
      className={`training-slide ${isCover ? "cover-slide" : "content-slide"} ${slide.kind ?? ""} ${active ? "is-active" : ""}`}
      data-slide
      aria-labelledby={`${slide.id}-title`}
    >
      <div className="slide-inner">
        <header className="slide-heading">
          <div className="slide-kicker"><span>{slide.eyebrow}</span><span>{slide.number} / 21</span></div>
          <h2 id={`${slide.id}-title`}>{slide.title}</h2>
          <p className="conclusion">{slide.conclusion}</p>
        </header>

        <div className="visual-stage"><Visual type={slide.visual} /></div>

        <div className="learning-flow" aria-label="理解の流れ">
          <article className="learning-card reason"><div className="card-icon"><CircleHelp /></div><div><span>WHY / 理由</span><p>{slide.reason}</p></div></article>
          <article className="learning-card example"><div className="card-icon"><Lightbulb /></div><div><span>EXAMPLE / 具体例</span><p>{slide.example}</p></div></article>
          <article className="learning-card action"><div className="card-icon"><CheckCircle2 /></div><div><span>DO / 実践</span><p>{slide.action}</p></div></article>
        </div>

        {slide.note && <p className="term-note"><BookOpen />{slide.note}</p>}
      </div>
    </section>
  );
}

function Contents({ currentIndex, onSelect }: { currentIndex: number; onSelect: (index: number) => void }) {
  return (
    <div className="contents-groups">
      {chapters.map((chapter) => {
        const items = slides.map((slide, index) => ({ slide, index })).filter(({ slide }) => slide.chapter === chapter.id);
        return (
          <section className="contents-group" key={chapter.id}>
            <div className="contents-chapter"><span>{chapter.label}</span><strong>{chapter.title}</strong></div>
            <div>
              {items.map(({ slide, index }) => (
                <button type="button" key={slide.id} className={index === currentIndex ? "active" : ""} onClick={() => onSelect(index)}>
                  <span>{slide.number}</span><span>{slide.shortTitle}</span><ChevronRight />
                </button>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [tocOpen, setTocOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("scroll");
  const [dark, setDark] = useState(() => localStorage.getItem("x-training-theme") === "dark");
  const currentSlide = slides[currentIndex];
  const progress = ((currentIndex + 1) / slides.length) * 100;

  const goTo = useCallback((index: number, closeToc = true) => {
    const target = Math.max(0, Math.min(slides.length - 1, index));
    document.getElementById(slides[target].id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setCurrentIndex(target);
    if (closeToc) setTocOpen(false);
    history.replaceState(null, "", `#${slides[target].id}`);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    localStorage.setItem("x-training-theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    document.documentElement.dataset.view = viewMode;
    const frame = requestAnimationFrame(() => {
      document.getElementById(currentSlide.id)?.scrollIntoView({ behavior: "auto", block: "start" });
    });
    return () => cancelAnimationFrame(frame);
  }, [viewMode]);

  useEffect(() => {
    const hashIndex = slides.findIndex((slide) => `#${slide.id}` === window.location.hash);
    if (hashIndex > 0) requestAnimationFrame(() => goTo(hashIndex, false));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = slides.findIndex((slide) => slide.id === visible.target.id);
        if (index >= 0) setCurrentIndex(index);
      },
      { threshold: [0.35, 0.55, 0.75] },
    );
    document.querySelectorAll("[data-slide]").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [goTo]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (tocOpen && event.key === "Escape") { setTocOpen(false); return; }
      if (tocOpen) return;
      if (["ArrowRight", "PageDown"].includes(event.key)) { event.preventDefault(); goTo(currentIndex + 1); }
      if (["ArrowLeft", "PageUp"].includes(event.key)) { event.preventDefault(); goTo(currentIndex - 1); }
      if (event.key === "Home") { event.preventDefault(); goTo(0); }
      if (event.key === "End") { event.preventDefault(); goTo(slides.length - 1); }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [currentIndex, goTo, tocOpen]);

  const chapterProgress = useMemo(() => {
    const chapterSlides = slides.filter((slide) => slide.chapter === currentSlide.chapter);
    const within = chapterSlides.findIndex((slide) => slide.id === currentSlide.id) + 1;
    return { current: within, total: chapterSlides.length };
  }, [currentSlide]);

  return (
    <div className="app-shell">
      <a className="skip-link" href={`#${currentSlide.id}`}>本文へ移動</a>
      <div className="top-progress" aria-hidden="true"><span style={{ width: `${progress}%` }} /></div>

      <aside className="desktop-nav" aria-label="研修目次">
        <div className="brand-lockup"><div className="brand-mark">X</div><div><strong>X運用研修</strong><span>STORE PLAYBOOK</span></div></div>
        <div className="desktop-nav-scroll"><Contents currentIndex={currentIndex} onSelect={goTo} /></div>
        <div className="nav-footer"><span>{String(currentIndex + 1).padStart(2, "0")}</span><div><strong>{currentSlide.shortTitle}</strong><small>{Math.round(progress)}% 完了</small></div></div>
      </aside>

      <div className="training-viewport">
        <header className="mobile-header">
          <button type="button" className="mobile-brand" onClick={() => goTo(0)}><span>X</span><strong>X運用研修</strong></button>
          <div className="mobile-count">{String(currentIndex + 1).padStart(2, "0")} / {slides.length}</div>
          <IconButton label="目次を開く" onClick={() => setTocOpen(true)}><Menu /></IconButton>
        </header>

        <main className="slides-canvas">
          {slides.map((slide, index) => <SlidePage key={slide.id} slide={slide} active={index === currentIndex} />)}
        </main>

        <nav className="mobile-pager" aria-label="ページ送り">
          <IconButton label="前のページ" onClick={() => goTo(currentIndex - 1)} className={currentIndex === 0 ? "disabled" : ""}><ArrowLeft /></IconButton>
          <button type="button" className="mobile-page-title" onClick={() => setTocOpen(true)}><span>{currentSlide.eyebrow}</span><strong>{currentSlide.shortTitle}</strong></button>
          <IconButton label="次のページ" onClick={() => goTo(currentIndex + 1)} className={currentIndex === slides.length - 1 ? "disabled" : ""}><ArrowRight /></IconButton>
        </nav>
      </div>

      <aside className="control-rail" aria-label="表示とページ操作">
        <div className="rail-section">
          <span className="rail-label">VIEW</span>
          <div className="segmented-control">
            <button type="button" className={viewMode === "scroll" ? "active" : ""} onClick={() => setViewMode("scroll")} title="スクロール表示"><Columns3 /><span>Scroll</span></button>
            <button type="button" className={viewMode === "present" ? "active" : ""} onClick={() => setViewMode("present")} title="プレゼン表示"><MousePointer2 /><span>Present</span></button>
            <button type="button" className={viewMode === "mobile" ? "active" : ""} onClick={() => setViewMode("mobile")} title="スマホ表示"><Smartphone /><span>Mobile</span></button>
          </div>
        </div>
        <div className="rail-section chapter-status">
          <span className="rail-label">NOW</span>
          <span>{chapters.find((chapter) => chapter.id === currentSlide.chapter)?.label}</span>
          <strong>{currentSlide.shortTitle}</strong>
          <div className="dot-progress">{Array.from({ length: chapterProgress.total }, (_, index) => <i key={index} className={index < chapterProgress.current ? "filled" : ""} />)}</div>
        </div>
        <div className="rail-actions">
          <IconButton label={dark ? "ライトモード" : "ダークモード"} onClick={() => setDark((value) => !value)}>{dark ? <Sun /> : <Moon />}</IconButton>
          <IconButton label="目次を開く" onClick={() => setTocOpen(true)}><List /></IconButton>
          <a className="icon-btn" href="/downloads/X-training-editable.pptx" download aria-label="編集用PowerPointをダウンロード" title="編集用PowerPointをダウンロード"><Download /></a>
        </div>
        <div className="rail-pager">
          <IconButton label="前のページ" onClick={() => goTo(currentIndex - 1)} className={currentIndex === 0 ? "disabled" : ""}><ArrowLeft /></IconButton>
          <span><strong>{String(currentIndex + 1).padStart(2, "0")}</strong> / {slides.length}</span>
          <IconButton label="次のページ" onClick={() => goTo(currentIndex + 1)} className={currentIndex === slides.length - 1 ? "disabled" : ""}><ArrowRight /></IconButton>
        </div>
      </aside>

      {tocOpen && (
        <div className="toc-overlay" role="dialog" aria-modal="true" aria-label="目次">
          <button type="button" className="toc-backdrop" aria-label="目次を閉じる" onClick={() => setTocOpen(false)} />
          <div className="toc-panel">
            <header><div><span>CONTENTS</span><h2>研修目次</h2></div><div className="toc-header-actions"><a className="icon-btn" href="/downloads/X-training-editable.pptx" download aria-label="編集用PowerPointをダウンロード" title="編集用PowerPointをダウンロード"><Download /></a><IconButton label="目次を閉じる" onClick={() => setTocOpen(false)}><X /></IconButton></div></header>
            <Contents currentIndex={currentIndex} onSelect={goTo} />
          </div>
        </div>
      )}
    </div>
  );
}
