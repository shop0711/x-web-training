import "./styles.css";

const chapters = [
  {
    id: "intro",
    type: "pinned",
    name: "X WEB研修",
    handle: "@training_x",
    time: "固定",
    title: "X運用をタイムラインで学ぶ",
    body: "スマホ閲覧を前提に、Xのタイムラインを追う感覚で研修内容を読める構成にします。",
    tags: ["スマホ前提", "タイムライン型", "実務研修"],
    summary: "全体像",
    metrics: { replies: "01", reposts: "導入", likes: "準備中" }
  },
  {
    id: "account",
    type: "module",
    name: "Chapter 01",
    handle: "@account_design",
    time: "1/7",
    title: "アカウント設計",
    body: "プロフィール、表示名、肩書き、発信テーマなど、運用の土台になる要素を整理します。",
    thread: ["目的", "ターゲット", "プロフィール", "発信テーマ"],
    summary: "運用の土台",
    metrics: { replies: "04", reposts: "演習", likes: "基本" }
  },
  {
    id: "post",
    type: "module",
    name: "Chapter 02",
    handle: "@post_planning",
    time: "2/7",
    title: "投稿設計",
    body: "通常投稿、引用、リプライ、スレッドをどう使い分けるかを、目的別に整理します。",
    thread: ["投稿の型", "フック", "本文", "CTA"],
    summary: "投稿の作り方",
    metrics: { replies: "04", reposts: "型", likes: "実践" }
  },
  {
    id: "timeline",
    type: "module",
    name: "Chapter 03",
    handle: "@timeline_reading",
    time: "3/7",
    title: "タイムライン理解",
    body: "ユーザーがどの順番で情報を見て、どこで止まり、どこで離脱するかを前提に設計します。",
    thread: ["視認性", "文量", "画像", "反応導線"],
    summary: "見られ方の設計",
    metrics: { replies: "04", reposts: "分析", likes: "改善" }
  },
  {
    id: "practice",
    type: "exercise",
    name: "Workshop",
    handle: "@practice",
    time: "演習",
    title: "その場で投稿案を作る",
    body: "研修内容に合わせて、実際の投稿案、プロフィール改善案、改善チェックリストを差し込みます。",
    tags: ["ワーク", "添削", "チェックリスト"],
    summary: "実践ワーク",
    metrics: { replies: "03", reposts: "提出", likes: "確認" }
  }
];

const viewModes = [
  { id: "timeline", label: "タイムライン", title: "Timeline Guide" },
  { id: "index", label: "目次", title: "Contents" },
  { id: "focus", label: "集中", title: "Focus View" }
];

let currentMode = "timeline";

function renderThread(items = []) {
  if (!items.length) return "";

  return `
    <ol class="thread-list">
      ${items.map((item) => `<li>${item}</li>`).join("")}
    </ol>
  `;
}

function renderTags(tags = []) {
  if (!tags.length) return "";

  return `
    <div class="tag-row">
      ${tags.map((tag) => `<span>#${tag}</span>`).join("")}
    </div>
  `;
}

function renderPost(chapter, index) {
  return `
    <article class="post post-${chapter.type}" id="${chapter.id}" data-post>
      <a class="avatar-link" href="#${chapter.id}" aria-label="${chapter.title}へ移動">
        <span class="avatar">${index === 0 ? "X" : String(index).padStart(2, "0")}</span>
      </a>
      <div class="post-main">
        <header class="post-header">
          <div>
            <strong>${chapter.name}</strong>
            <span>${chapter.handle}</span>
          </div>
          <time>${chapter.time}</time>
        </header>
        <h2>${chapter.title}</h2>
        <p>${chapter.body}</p>
        ${renderThread(chapter.thread)}
        ${renderTags(chapter.tags)}
        <footer class="metrics" aria-label="投稿指標">
          <span>Reply ${chapter.metrics.replies}</span>
          <span>Repost ${chapter.metrics.reposts}</span>
          <span>Like ${chapter.metrics.likes}</span>
        </footer>
      </div>
    </article>
  `;
}

function renderContents() {
  return `
    <section class="contents-panel" id="contents" aria-label="目次">
      <div class="section-heading">
        <p>Jump Menu</p>
        <h2>見たい章へ移動</h2>
      </div>
      <div class="contents-list">
        ${chapters
          .map(
            (chapter, index) => `
              <a class="contents-item" href="#${chapter.id}" data-jump="${chapter.id}">
                <span>${String(index + 1).padStart(2, "0")}</span>
                <strong>${chapter.title}</strong>
                <small>${chapter.summary}</small>
              </a>
            `
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderApp() {
  const mode = viewModes.find((item) => item.id === currentMode) ?? viewModes[0];

  document.querySelector("#app").innerHTML = `
    <section class="phone-shell mode-${currentMode}" aria-label="X WEB研修資料">
      <header class="app-header">
        <a class="icon-button" href="#top" aria-label="先頭へ">↑</a>
        <div>
          <p>X WEB研修</p>
          <h1>${mode.title}</h1>
        </div>
        <a class="icon-button" href="#contents" aria-label="目次へ">☰</a>
      </header>

      <section class="profile-hero" id="top">
        <div class="cover"></div>
        <div class="profile-row">
          <div class="profile-avatar">X</div>
          <div>
            <h2>X WEB研修資料</h2>
            <p>@x_training_materials</p>
          </div>
        </div>
        <p class="profile-copy">
          内容が届いたら、各投稿カードを章・講義・演習に置き換えていきます。
        </p>
      </section>

      <section class="mode-switcher" aria-label="表示モード">
        ${viewModes
          .map(
            (item) => `
              <button type="button" data-mode="${item.id}" aria-pressed="${item.id === currentMode}">
                ${item.label}
              </button>
            `
          )
          .join("")}
      </section>

      ${renderContents()}

      <nav class="tabs" aria-label="資料タブ">
        <a href="#intro" aria-current="page">Posts</a>
        <a href="#contents">Index</a>
        <a href="#practice">Practice</a>
      </nav>

      <section class="timeline" aria-label="タイムライン">
        ${chapters.map((chapter, index) => renderPost(chapter, index)).join("")}
      </section>

      <nav class="bottom-nav" aria-label="主要ナビゲーション">
        <a href="#top">Top</a>
        <a href="#contents">Index</a>
        <a href="#post">Post</a>
        <a href="#practice">Work</a>
      </nav>
    </section>
  `;

  document.querySelectorAll("[data-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      currentMode = button.dataset.mode;
      renderApp();
    });
  });
}

renderApp();
