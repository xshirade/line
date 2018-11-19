# LINE BOT サーバ
LINE BOTのためのAPIサーバ．Heroku用．

## app.js
サーバ本体のコードです．エンドポイントの/healthは，無料のヘルスチェックサービスの[Uptime Robot](https://uptimerobot.com/)から定期的にアクセスされます．無料枠のHeroku（Free Dyno Hours）がスリープしないようにするためです．

## lib/line.js
LINEのMessage APIにアクセスするためのクライアントです．channelAccessTokenとchannelSecretは，Messaging API - クイックスタートを参考に取得できます．

## lib/cron.js
node-cronを用いて，Herokuサーバから定期的にイベントページへアクセスさせます（毎日8, 12, 18, 22時にアクセスし確認するように設定）．イベントのキャンセル枠は，（雑ですが）タイトルに”空”という文字が含まれるかどうかをみることで確認します．キャンセルがある場合は，ユーザ（USER_ID）にイベントタイトルと申し込みページのURLをプッシュします．勉強目的で開発したため宛先を固定していますが，もう少し手を加えてユーザごとに監視するイベントやタイミングなどをデータベースで管理するということもできるかなと思っています．自分のUSER_IDは，LINE Developersのチャネル基本設定の最後にあります．