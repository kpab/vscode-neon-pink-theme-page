# SEO Setup Guide for Neon Pink Dark Landing Page

このガイドでは、GitHub PagesでのSEO対策の設定方法を説明します。

## 📋 実施済みのSEO対策

### 1. Jekyll設定 (`_config.yml`)

GitHub Pagesで自動的にSEO対策を行うための設定ファイルを作成しました。

```yaml
plugins:
  - jekyll-sitemap  # サイトマップ自動生成
  - jekyll-seo-tag  # SEOタグ自動生成
```

### 2. HTMLメタタグ (`index.html`)

以下のSEO対策を実施済みです：

- ✅ **Canonical URL** - ページの正規URLを指定
- ✅ **hreflang タグ** - 多言語対応（英語・日本語）
- ✅ **構造化データ (JSON-LD)** - Google Rich Results対応
- ✅ **OGP タグ** - SNSシェア時の表示最適化
- ✅ **Twitter Card** - Twitter投稿時の表示最適化

### 3. クローラー設定 (`robots.txt`)

```txt
User-agent: *
Allow: /

Sitemap: https://kpab.github.io/vscode-neon-pink-theme-page/sitemap.xml
```

### 4. サイトマップ (`sitemap.xml`)

手動で作成したサイトマップが含まれています。Jekyll設定後は自動生成されます。

---

## 🚀 Google Search Console セットアップ（推奨）

### ステップ1: Google Search Consoleに登録

1. [Google Search Console](https://search.google.com/search-console) にアクセス
2. 「プロパティを追加」をクリック
3. **URLプレフィックス** を選択
4. サイトURL `https://kpab.github.io/vscode-neon-pink-theme-page/` を入力
5. 「続行」をクリック

### ステップ2: 所有権の確認

以下のいずれかの方法で所有権を確認します：

#### 方法A: HTMLファイルによる確認（推奨）

1. Google Search Consoleで表示される確認用HTMLファイル（例: `googleXXXXXXXXXXXXXXXX.html`）をダウンロード
2. プロジェクトのルートディレクトリに配置
3. GitHubにコミット＆プッシュ
4. Google Search Consoleで「確認」をクリック

```bash
# 確認用HTMLファイルをプロジェクトに追加
git add googleXXXXXXXXXXXXXXXX.html
git commit -m "Add Google Search Console verification file"
git push
```

#### 方法B: HTMLタグによる確認

1. Google Search Consoleで表示されるメタタグをコピー
2. `index.html` の `<head>` セクションに追加

```html
<!-- Google Search Console verification -->
<meta name="google-site-verification" content="your-verification-code" />
```

### ステップ3: サイトマップの送信

1. Google Search Console にログイン
2. 左メニューから「サイトマップ」を選択
3. サイトマップURLを入力: `sitemap.xml`
4. 「送信」をクリック

**確認方法:**
ブラウザで以下のURLにアクセスして、サイトマップが正しく表示されるか確認してください。

```
https://kpab.github.io/vscode-neon-pink-theme-page/sitemap.xml
```

---

## 🔍 構造化データのテスト

Google Rich Results対応を確認するため、以下のツールでテストできます：

1. [Google リッチリザルトテスト](https://search.google.com/test/rich-results)にアクセス
2. ページURL `https://kpab.github.io/vscode-neon-pink-theme-page/` を入力
3. 「URLをテスト」をクリック
4. エラーがないか確認

---

## 📊 Google Analytics（オプション）

### セットアップ手順

1. [Google Analytics](https://analytics.google.com/) にアクセス
2. 新しいプロパティを作成
3. 測定IDを取得（例: `G-XXXXXXXXXX`）
4. `index.html` の `</body>` タグ直前に以下を追加：

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## ✅ SEOチェックリスト

### 必須項目
- [x] `_config.yml` の作成
- [x] Canonical URLの設定
- [x] 構造化データ (JSON-LD) の追加
- [x] hreflang タグの設定
- [x] OGP タグの設定
- [x] Twitter Card の設定
- [x] `robots.txt` の作成
- [x] `sitemap.xml` の作成
- [ ] Google Search Console 登録
- [ ] サイトマップ送信

### 推奨項目
- [ ] Google Analytics 設定
- [ ] Bing Webmaster Tools 登録
- [ ] パフォーマンス最適化（PageSpeed Insights）
- [ ] モバイルフレンドリーテスト

---

## 📚 参考リンク

- [GitHub Pages と Jekyll について](https://docs.github.com/ja/pages/setting-up-a-github-pages-site-with-jekyll/about-github-pages-and-jekyll)
- [Google Search Console](https://search.google.com/search-console)
- [Google リッチリザルトテスト](https://search.google.com/test/rich-results)
- [Schema.org - SoftwareApplication](https://schema.org/SoftwareApplication)
- [Google Analytics](https://analytics.google.com/)

---

## 🎯 期待される効果

1. **検索順位の向上** - 構造化データとメタタグによる最適化
2. **Rich Results 表示** - Google検索結果に評価・機能リストを表示
3. **SNS シェア最適化** - OGP/Twitter Cardによる魅力的な表示
4. **多言語対応** - hreflangタグによる適切な言語ページの表示
5. **クロール効率化** - サイトマップによる全ページのインデックス促進

---

**最終更新:** 2025-11-16
