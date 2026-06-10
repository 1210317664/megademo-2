# AMIGA MegaDemo Player

TypeScript + WebGL1 + ES Modules で構築した、AMIGA 風のメガデモ体験を楽しめるサンプルプロジェクトです。

## 概要
このリポジトリは、WebGL1 を使って固定解像度のデモ映像を再生し、複数のデモシーンをランダムまたは手動で切り替えられるプレイヤーです。  
AMIGA の雰囲気を感じさせる、カラフルなシェーダー風の演出と、軽快な UI を備えています。

## 主な機能
- WebGL1 ベースの固定解像度描画
- Plasma / Starfield / Copper Bars / Wave / Bob の 5 種類のデモ
- 自動切替と手動切替の両方に対応
- UI 表示切替、ミュート、テストモード切替をキーボードで操作
- Vite + TypeScript + ES Modules による開発体験

## 必要環境
- Node.js 18 以降
- npm 9 以降
- ブラウザ（Chrome / Edge / Firefox など）

## はじめ方
1. 依存関係をインストールします。
   ```sh
   npm install
   ```
2. 開発サーバーを起動します。
   ```sh
   npm run dev
   ```
3. ブラウザで次の URL を開きます。
   ```text
   http://localhost:5173
   ```

## 操作方法
- Tab / F1: UI の表示・非表示を切り替え
- D: 次のデモへ切り替え
- Space: テストモードに切り替え（自動切替を止める）
- M: ミュート（現在は音量を無音化）

## デモ一覧

### 1. Plasma
![Plasma Screenshot](https://via.placeholder.com/640x360.png?text=Plasma+Demo)
- 波状の色の屈折を使った、AMIGA らしいプラズマ表現です。

### 2. Starfield
![Starfield Screenshot](https://via.placeholder.com/640x360.png?text=Starfield+Demo)
- 星空の飛び方を擬似的に再現した、スピード感ある背景デモです。

### 3. Copper Bars
![Copper Bars Screenshot](https://via.placeholder.com/640x360.png?text=Copper+Bars+Demo)
- 銅色のバーがゆらめく、シンプルかつ強い視覚効果のある演出です。

### 4. Wave
![Wave Screenshot](https://via.placeholder.com/640x360.png?text=Wave+Demo)
- 波形をベースにしたカラーアニメーションで、なめらかなグラデーションを表現します。

### 5. Bob
![Bob Screenshot](https://via.placeholder.com/640x360.png?text=Bob+Demo)
- 円形の発光ボブを中心に配置し、軽快でポップな AMIGA 風のビジュアルを演出します。

## プロジェクト構成
```text
src/
  main.ts              # エントリーポイント
  core/                # プレイヤー本体、オーディオ、共通インターフェース
  demos/               # 各デモ実装
  transitions/         # トランジション系の補助実装
```

## ビルド
本番用ビルドを作成するには次を実行します。
```sh
npm run build
```

## 補足
- このプロジェクトは学習やデモ制作のためのサンプルです。
- 実際のスクリーンショットは今後、各デモの画像素材に差し替えて本番用に更新できます。
- 音声機能は初期実装段階で、今後の拡張に合わせて強化していく予定です。
