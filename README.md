# SSO-using-IdentityServer4
ステップバイステップでIdentityServer4を導入してシングルサインオンを実現する

## 構成

| 種類 | ポート |
| ---- | ---- |
| 認可サーバー | 5001 |
| APIサーバー | 6001 |
| ウェブクライアント | 7001 |

### API（https://localhost:6001）

| URI | 返り値 | 状態 |
| ---- | ---- | ---- |
| GET /api/message/greetings | "Hello World!" | 保護されていない |
| GET /api/message/protected | "Secret Message!" | 保護されている |

## デモ

[Demo](https://user-images.githubusercontent.com/23710529/114289432-d39bee80-9ab2-11eb-829a-50bcad1cfcee.mp4)
