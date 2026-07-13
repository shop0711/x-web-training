import "./styles.css";

const posts = [
  {
    type: "pinned",
    name: "X WEB研修",
    handle: "@training_x",
    time: "固定",
    title: "X運用をタイムラインで学ぶ",
    body: "この資料はスマホ閲覧を前提に、Xのタイムラインを追う感覚で研修内容を読める構成にします。",
    tags: ["スマホ前提", "タイムライン型", "実務研修"],
    metrics: { replies: "01", reposts: "00", likes: "準備中" }
  },
  {
    type: "module",
    name: "Chapter 01",
    handle: "@account_design",
    time: "1/7",
    title: "アカウント設計",
    body: "プロフィール、表示名、肩書き、発信テーマなど、運用の土台になる要素を整理します。",
    thread: ["目的", "ターゲット", "プロフィール", "発信テーマ"],
    metrics: { replies: "04", reposts: "演習", likes: "基本" }
  },
  {
    type: "module",
    name: "Chapter 02",
    handle: "@post_planning",
    time: "2/7",
    title: "投稿設計",
    body: "通常投稿、引用、リプライ、スレッドをどう使い分けるかを、目的別に整理します。",
    thread: ["投稿の型", "フック", "本文", "CTA"],
    metrics: { replies: "04", reposts: "型", likes: "実践" }
  },
  {
    type: "module",
    name: "Chapter 03",
    handle: "@timeline_reading",
    time: "3/7",
    title: "タイムライン理解",
    body: "ユーザーがどの順番で情報を見て、どこで止まり、どこで離脱するかを前提に設計します。",
    thread: ["視認性", "文量", "画像", "反応導線"],
    metrics: { replies: "04", reposts: "分析", likes: "改善" }
  },
  {
    type: "exercise",
    name: "Workshop",
    handle: "@practice",
    time: "演習",
    title: "その場で投稿案を作る",
    body: "研修内容に合わせて、実際の投稿案、プロフィール改善案、改善チェックリストを差し込みます。",
    tags: ["ワーク", "添削", "チェックリスト"],
    metrics: { replies: "03", reposts: "提出", likes: "確認" }
  }
];

const navItems = ["Home", "Search", "Post", "Notes"];

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

function renderPost(post, index) {
  return `
    <article class="post post-${post.type}">
      <div class="avatar">${index === 0 ? "X" : String(index).padStart(2, "0")}</div>
      <div class="post-main">
        <header class="post-header">
          <div>
            <strong>${post.name}</strong>
            <span>${post.handle}</span>
          </div>
          <time>${post.time}</time>
        </header>
        <h2>${post.title}</h2>
        <p>${post.body}</p>
        ${renderThread(post.thread)}
        ${renderTags(post.tags)}
        <footer class="metrics" aria-label="投稿指標">
          <span>💬 ${post.metrics.replies}</span>
          <span>↻ ${post.metrics.reposts}</span>
          <span>♡ ${post.metrics.likes}</span>
        </footer>
      </div>
    </article>
  `;
}

document.querySelector("#app").innerHTML = `
  <section class="phone-shell" aria-label="X WEB研修資料">
    <header class="app-header">
      <button class="icon-button" aria-label="前へ">‹</button>
      <div>
        <p>X WEB研修</p>
        <h1>Timeline Guide</h1>
      </div>
      <button class="icon-button" aria-label="メニュー">•••</button>
    </header>

    <section class="profile-hero">
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

    <nav class="tabs" aria-label="資料タブ">
      <a href="#timeline" aria-current="page">Posts</a>
      <a href="#timeline">Threads</a>
      <a href="#timeline">Practice</a>
    </nav>

    <section id="timeline" class="timeline">
      ${posts.map((post, index) => renderPost(post, index)).join("")}
    </section>

    <nav class="bottom-nav" aria-label="主要ナビゲーション">
      ${navItems.map((item) => `<a href="#timeline">${item}</a>`).join("")}
    </nav>
  </section>
`;
