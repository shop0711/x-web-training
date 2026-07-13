# X Web Training Materials

X向けWEB研修資料の独立プロジェクトです。

## 方針

- Instagram側の資料・ファイルには触れない
- 研修内容は `content/training-outline.md` に集約してから画面へ反映する
- 画像や参考素材は `assets/` 配下へ追加する
- 公開・提出用の成果物は必要になった時点で `outputs/` に書き出す

## 構成

```text
x-web-training/
  index.html
  package.json
  src/
    app.js
    styles.css
  content/
    training-outline.md
  assets/
    images/
    references/
```

## 起動

```powershell
npm install
npm run dev
```

研修内容が届いたら、`content/training-outline.md` をもとに `src/app.js` のセクションデータへ展開します。
