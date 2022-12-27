
https://qiita.com/suin/items/d5d5d7199b62eed63bde

> JavaScriptのConsole APIのメソッドの違いは、基本的にGCPの重大度に影響しません。ただし、console.warnとconsole.errorがErrorオブジェクトをロギングした場合に限り、重大度が「ERROR」になります。

TODO: loggerも大抵は同様だが、どこまで同じかを確かめる

## Error reporting

https://cloud.google.com/error-reporting/docs/formatting-error-messages?hl=ja

**スタック トレースまたは例外を含むログエントリ**

※severityが設定されているときはERRORのときのみErrorReportingされる

この条件に当てはまるのは下記のどちらか
- プレーンテキストでErrorを出力
- 下記形式のオブジェクトデータ

```
{
  "err": {
    "message": string,
    "name": string,
    "stack": string
  }
}
```

**ReportedErrorEvent のような形式のログエントリ**

- いくつかあるが、現実的な形式は下記の通り?

```
{
  "@type": "type.googleapis.com/google.devtools.clouderrorreporting.v1beta1.ReportedErrorEvent",
  "message": "A simple text message"
}
```

## Winston

### カスタムなし
(Errorオブジェクトをそのまま投げても出力されないので、`format.errors({ stack: true })`でフォーマットする)

- severity が設定されていないのでどのログレベルでもDEFAULTになる
- `format.errors({ stack: true })`はmessageとstackを出力するだけなので、ErrorReportは生成されない

```ts
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [new winston.transports.Console()],
});

logger.info('error massage')             // 重要度: DEFAULT | ErrorReporting: 
logger.info(new Error('error message'))  // 重要度: DEFAULT | ErrorReporting:
logger.warn('error massage')             // 重要度: DEFAULT | ErrorReporting: 
logger.warn(new Error('error message'))  // 重要度: DEFAULT | ErrorReporting:
logger.error('error massage')            // 重要度: DEFAULT | ErrorReporting:
logger.error(new Error('error message')) // 重要度: DEFAULT | ErrorReporting: 
```

## Bunyan

### カスタムなし
- severity が設定されていないのでどのログレベルでもDEFAULTになる
- Errorは `{ err: { ... } }` で出力されるので ErrorReporting に通知される

```ts
const logger = bunyan.createLogger({
  name: "cloud-logging-test",
  level: "info",
});

logger.info('error massage')             // 重要度: DEFAULT | ErrorReporting: 
logger.info(new Error('error message'))  // 重要度: DEFAULT | ErrorReporting: ○
logger.warn('error massage')             // 重要度: DEFAULT | ErrorReporting: 
logger.warn(new Error('error message'))  // 重要度: DEFAULT | ErrorReporting: ○
logger.error('error massage')            // 重要度: DEFAULT | ErrorReporting:
logger.error(new Error('error message')) // 重要度: DEFAULT | ErrorReporting: ○ 
```