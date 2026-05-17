# 残心 / Zanshin Phase 2 Audit
## 監査日
2026-05-17
## 監査対象
- README.md
- docs/concept.md
- docs/design-system.md
- docs/mvp-spec.md
- docs/development-phases.md
- .github/copilot-instructions.md
---
## 1. コンセプト監査
判定: OK
確認内容:
- アプリ名が「残心 / Zanshin」として統一されている
- 一言コンセプト「書いたあとにも、心がそこに残るメモ帳」がREADMEに明記されている
- 「残心」「間」「余白」が中核として説明され、機能追加よりも静かな書く体験を優先する方針がある
- 海外向け表現が“過剰な演出”ではなく、Japanese minimalism / Zen-inspired writing / Wabi-sabi など体験の言葉で整理されている
修正した内容:
- READMEの海外向け表現を「Samurai」連想から外し、静けさ・余韻の表現に寄せた
---
## 2. デザイン監査
判定: OK
確認内容:
- 和風要素は「意味」として整理され、テーマパーク的な装飾にならない方針が明記されている
- 黄金比スケール（`4 / 8 / 13 / 21 / 34 / 55 / 89`）が明記されている
- カラーパレットが定義されている
- iPhoneで窮屈にならない余白の方向性がある
修正した内容:
- iPhone-firstの具体指針（44pxタップ領域 / safe-area / キーボード前提 / 余白の最小値）を追記した
---
## 3. MVP範囲監査
判定: OK
確認内容:
- MVP必須（一覧/作成/編集/削除/自動保存/検索/お気に入り/ローカル保存/iPhone-first/日英文言）が揃っている
- MVPでやらないこと（ログイン/同期/AI/課金/複雑タグ/共同編集/途中デプロイ等）が明確に分離されている
- データ構造がシンプルで、保存方針がlocalStorage起点・将来のIndexedDB移行を前提にしている
- Capacitor化を邪魔しないよう、保存処理の分離（`lib/storage.ts`）方針がある
修正した内容:
- 「App Store申請」のフェーズ番号を `docs/development-phases.md` と整合させた（Phase 9以降）
- 自動保存の英語表現に「Write with stillness」を追加し、海外向け表現要件を満たすよう補強した
---
## 4. 開発フェーズ監査
判定: OK
確認内容:
- Phase 1は設計整理のみ、Phase 2は監査のみ、Phase 3で初めてMVP実装という流れが明確
- Cloudflare PagesへのデプロイはPhase 3のMVP完成後のみ、というルールが複数箇所で明記されている
- 将来拡張候補がMVPと混ざらず、Phase 4以降に分離されている
修正した内容:
- 開発フェーズのステータス表記を現状に合わせて更新した（Phase 1: 完了 / Phase 2: 実施中）
---
## 5. Cloud Agent指示監査
判定: OK
確認内容:
- プロジェクト目的（静かで、余白があり、iPhone-first）が明確
- Phaseごとの作業範囲（Phase 1/2はdocsのみ、Phase 3で実装開始）が明確
- Cloudflareデプロイ禁止（MVP完成前）ルールが明記されている
- 実装時の技術方針（React+TS+Vite+Tailwind、storage分離）が簡潔にある
修正した内容:
- MVPで追加しない項目（ログイン/同期/AI/課金/複雑タグ/共同編集/途中デプロイ）を「Hard No」として明文化した
---
## 6. Phase 3 実装前の最終方針
Phase 3では以下を守ること。
- Vite + React + TypeScript + TailwindでMVPを作る
- localStorage保存から開始する
- メモ一覧、作成、編集、削除、自動保存、検索、お気に入りを実装する
- iPhone-firstで設計する
- 余白と行間を大切にする
- 機能を増やしすぎない
- Cloudflare PagesへのデプロイはMVP完成後のみ行う
---
## 7. MVPでまだ作らないもの
- ログイン
- クラウド同期
- AI機能
- 課金
- Markdown完全対応
- 複雑なタグ管理
- 共同編集
- App Store申請
---
## 8. 総合判定
```txt
Phase 3に進んでよい

理由:
Phase 1の設計は「残心」「間」「余白」を中核に据えたまま、MVP範囲が明確で、実装時に迷いやすい点（iPhone-firstの具体指針、フェーズ表記の整合、MVP禁止事項）が補強されたため。
```
