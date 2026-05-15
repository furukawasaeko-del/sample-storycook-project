# sample-storybook-project

Figma → Storybook → Chromatic の連携を試すためのサンプルReactプロジェクトです。
Vite + React + TypeScript + Storybook 8 + Chromatic + `@storybook/addon-designs` がセットアップ済みです。

## 含まれるもの

- `src/components/Button` — variant / size / 全幅 / disabled
- `src/components/Card` — title / footer / body
- `src/components/Input` — ラベル / helperText / error / disabled
- `src/components/Badge` — info / success / warning / neutral
- 各 `*.stories.tsx` に Figmaフレーム URL を貼る場所を用意（`REPLACE_ME` を差し替え）

---

## 0. 前提

- Node.js 18 以上
- パッケージマネージャ: npm を想定（pnpm / yarn でも可）
- Git リポジトリ（Chromaticを使う場合は必須）

```sh
node -v   # v18 以上であること
```

---

## 1. プロジェクトを動かす

```sh
cd sample-storybook-project
npm install
npm run storybook     # http://localhost:6006 が立ち上がる
```

これだけで Storybook のUIから Button/Card/Input/Badge を確認できます。
通常のWebアプリ表示は `npm run dev` で `http://localhost:5173` に出ます。

---

## 2. Storybook アカウントの考え方

実は **Storybook自体に「アカウント」はありません**。Storybook はOSSのライブラリで、`node_modules` に入って `npm run storybook` でローカル起動するだけのものです。
ホスティングするには次のどれかを使います。

| 方法 | アカウント | 用途 |
| --- | --- | --- |
| Chromatic | 必要（GitHub/Google等でサインアップ） | 推奨。VRT + Storybookホスティング + UIレビュー が一気通貫 |
| Vercel / Netlify | 必要 | 静的ホスティングのみ。VRTは別途必要 |
| 自社サーバ / S3+CloudFront | — | 静的ホスティングのみ |

Figma連携 + VRT が目的なら **Chromatic 一本で十分** です。以下はChromaticの手順。

---

## 3. Chromatic のセットアップ

### 3-1. サインアップ

1. <https://www.chromatic.com/> にアクセス
2. 「Get started」→ GitHub / GitLab / Bitbucket / Google のいずれかでサインアップ
3. リポジトリ連携画面で、このサンプルプロジェクトを置いた GitHubリポジトリを選ぶ
4. プロジェクト作成後、**Project Token**（`chpt_xxxxxxxx` のような文字列）が発行される

無料枠で月5,000スナップショットまで使えるので、検証であれば十分です。

### 3-2. ローカルから初回アップロード

`chromatic` パッケージは既に `devDependencies` に入っているので、すぐ実行できます。

```sh
# 環境変数で渡す（推奨）
CHROMATIC_PROJECT_TOKEN=<上で発行されたトークン> npm run chromatic
```

または `--project-token` フラグで直接渡してもOK。

```sh
npx chromatic --project-token=<トークン>
```

初回実行で行われること:

- `storybook build` で `storybook-static/` を生成
- それをChromaticに丸ごとアップロード
- 各Storyのスクリーンショットを撮影 → 初回はすべて「new」として保存
- 完了後、**Storybook の公開URL** がコンソールに出る（社内共有はこのURL）

### 3-3. 2回目以降（VRT）

コードを変更してもう一度 `npm run chromatic` を流すと、

1. 新しいSorybookをアップロード
2. 前回ビルドの同名Storyとピクセル比較
3. 差分が出たStoryだけ「Review」画面でハイライトされる
4. デザイナー/レビュアーが Accept / Deny する → ベースラインが更新される

CIに組み込まないうちは、PRを出す前にローカルから手動で流せばOKです。
将来的にCI化したくなったら、GitHub Actions に1ジョブ足すだけで動きます（後述）。

---

## 4. Figma連携（`@storybook/addon-designs`）

このサンプルでは各 `*.stories.tsx` に以下のような記述が入っています。

```ts
parameters: {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/REPLACE_ME/Design-System?node-id=1%3A2',
  },
},
```

ここに **自分のFigmaのフレーム/コンポーネントURL** を貼ると、Storybook の下部に「Design」タブが出て、左にStoryのレンダリング・右にFigma埋め込みが横並びで表示されます。

### URLの取り方

1. Figmaでフレームまたはコンポーネントを選択
2. 右クリック → **Copy link to selection**
3. コピーされたURL（`?node-id=...` が付いた形）をそのまま貼り付け

### ファイルの公開設定

- Figmaファイルが「Anyone with the link」以上の権限になっていれば、Storybook閲覧者は誰でも埋め込みが見えます。
- プライベートのままでも、自分のブラウザにFigmaログインがあれば埋め込みは見えます（他人には見えません）。

---

## 5. （任意）GitHub Actions で自動化

`main` への push と PR で Chromatic を自動実行したい場合は、リポジトリのSecretsに `CHROMATIC_PROJECT_TOKEN` を登録した上で、以下を `.github/workflows/chromatic.yml` として置きます（このサンプルには未同梱）。

```yaml
name: Chromatic
on: push
jobs:
  chromatic:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - uses: chromaui/action@latest
        with:
          projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
          exitZeroOnChanges: true
```

PRに「UI Review」というGitHubチェックが付き、Chromatic側で承認されるまで status を保留にできます。

---

## 6. 全体の流れ（おさらい）

1. デザイナーが **Figma** でコンポーネントを更新
2. 開発者が `src/components/...` に React + Story を実装し、Story に Figma URL を貼る
3. ローカルで `npm run storybook` → Figma と並べて見比べる
4. 変更を push → `npm run chromatic`（またはCI）→ Chromatic が前回と差分比較
5. デザイナー/PMが Chromatic の「Review」画面で Accept すれば、それが新しいベースライン

---

## トラブルシュート

- **Figmaの埋め込みが真っ白**: ファイルの共有設定が「Only people invited」になっていないか確認。
- **`chromatic` 実行時にトークンエラー**: `CHROMATIC_PROJECT_TOKEN` の値、または `--project-token` を再確認。
- **VRT差分が大量に出る**: フォント未読み込みやアニメーションの初期状態が原因のことが多い。`parameters: { chromatic: { delay: 300 } }` でディレイを入れる、`pauseAnimationAtEnd: true` でアニメーション停止、などで対処できる。
# sample-storycook-project
