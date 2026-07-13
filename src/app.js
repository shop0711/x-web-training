import "./styles.css";

const sections = [
  {
    label: "準備中",
    title: "X WEB研修資料",
    body: "研修内容を受け取り次第、このプロジェクト内で独立して作成します。",
    points: [
      "Instagram側の資料には干渉しません",
      "章立て、実例、演習、チェックリストを追加できます",
      "Web表示に最適化した研修資料として仕上げます"
    ]
  }
];

const app = document.querySelector("#app");

app.innerHTML = `
  <section class="shell">
    <header class="topbar">
      <div>
        <p class="eyebrow">Training Materials</p>
        <h1>X WEB研修資料</h1>
      </div>
      <span class="status">Draft</span>
    </header>
    <div class="stage">
      ${sections
        .map(
          (section) => `
            <article class="panel">
              <p class="label">${section.label}</p>
              <h2>${section.title}</h2>
              <p>${section.body}</p>
              <ul>
                ${section.points.map((point) => `<li>${point}</li>`).join("")}
              </ul>
            </article>
          `
        )
        .join("")}
    </div>
  </section>
`;
