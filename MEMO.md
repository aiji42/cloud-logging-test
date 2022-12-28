
https://qiita.com/suin/items/d5d5d7199b62eed63bde

> JavaScriptのConsole APIのメソッドの違いは、基本的にGCPの重大度に影響しません。ただし、console.warnとconsole.errorがErrorオブジェクトをロギングした場合に限り、重大度が「ERROR」になります。

TODO: loggerも大抵は同様だが、どこまで同じかを確かめる

## Error reporting

https://cloud.google.com/error-reporting/docs/formatting-error-messages?hl=ja

**スタック トレースまたは例外を含むログエントリ**

この条件に当てはまるのは下記のどちらか
- プレーンテキストでError.prototype.stackを出力
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

※severityが設定されているときはERRORのときのみErrorReportingされる


**ReportedErrorEvent のような形式のログエントリ**

- いくつかあるが、現実的な形式は下記の通り

ただし、この方法だと発生場所をマークすることができない。  
(例外以外のものをErrorReportingに残したい場合はこれを使うと良い)
```
{
  "@type": "type.googleapis.com/google.devtools.clouderrorreporting.v1beta1.ReportedErrorEvent",
  "message": "A simple text message"
}
```

## Console

- severity が設定されていないのでどのログレベルでもDEFAULTになる
- ErrorはtextPayloadで文字列として表示されるので、ErrorReportが生成される

```ts
console.info('error massage')             // 重要度: DEFAULT | ErrorReporting: 
console.info(new Error('error message'))  // 重要度: DEFAULT | ErrorReporting: ○
console.warn('error massage')             // 重要度: DEFAULT | ErrorReporting: 
console.warn(new Error('error message'))  // 重要度: DEFAULT | ErrorReporting: ○
console.error('error massage')            // 重要度: DEFAULT | ErrorReporting:
console.error(new Error('error message')) // 重要度: DEFAULT | ErrorReporting: ○
```

### カスタム

```ts
const makeLogger = (severity: "INFO" | "WARN" | "ERROR") => {
  return (entry: any, meta?: Record<string, any>) => {
    console.log(
      JSON.stringify({
        severity,
        message: entry instanceof Error ? entry.stack : entry,
        ...meta,
      })
    );
  };
};

const logger = {
  info: makeLogger("INFO"),
  warn: makeLogger("WARN"),
  error: makeLogger("ERROR"),
};

console.info('error massage')             // 重要度: DEFAULT | ErrorReporting: 
console.info(new Error('error message'))  // 重要度: DEFAULT | ErrorReporting:
console.warn('error massage')             // 重要度: DEFAULT | ErrorReporting: 
console.warn(new Error('error message'))  // 重要度: DEFAULT | ErrorReporting:
console.error('error massage')            // 重要度: DEFAULT | ErrorReporting:
console.error(new Error('error message')) // 重要度: DEFAULT | ErrorReporting: ○
```

## Winston

### カスタムなし
(Errorオブジェクトをそのまま投げても出力されないので、`format.errors({ stack: true })`でフォーマット必要)

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

### カスタム

- levelに応じて`severity`を付与することで重要度適切に設定される
- Errorは `{ err: { ... } }` で出力されるので ErrorReporting が生成される
    - severity が設定されているので、ERROR のときのみ生成される

```ts
const severity = winston.format((info) => {
  info["severity"] = info.level.toUpperCase();
  return info;
});

const errorReport = winston.format((info) => {
  if (info instanceof Error) {
    info.err = {
      name: info.name,
      message: info.message,
      stack: info.stack,
    };
  }
  return info;
});

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    severity(),
    errorReport(),
    winston.format.json()
  ),
  transports: [new winston.transports.Console()],
});

logger.info('error massage')             // 重要度: INFO  | ErrorReporting: 
logger.info(new Error('error message'))  // 重要度: INFO  | ErrorReporting:
logger.warn('error massage')             // 重要度: WARN  | ErrorReporting: 
logger.warn(new Error('error message'))  // 重要度: WARN  | ErrorReporting:
logger.error('error massage')            // 重要度: ERROR | ErrorReporting:
logger.error(new Error('error message')) // 重要度: ERROR | ErrorReporting: ○ 
```

## Bunyan

### カスタムなし
- severity が設定されていないのでどのログレベルでもDEFAULTになる
- Errorは `{ err: { ... } }` で出力されるので ErrorReporting が生成される

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

### カスタム

フォーマットの変更ができないので、severityの設定ができない  
(フィードを追加することはできるが、現在のlevelからseverityを動的に出し分けるということができない)

## pino

### カスタムなし
- severity が設定されていないのでどのログレベルでもDEFAULTになる
- Errorは `{ err: { ... } }` で出力されるので ErrorReporting が生成される

```ts
const logger = pino({
  level: "info",
});

logger.info('error massage')             // 重要度: DEFAULT | ErrorReporting: 
logger.info(new Error('error message'))  // 重要度: DEFAULT | ErrorReporting: ○
logger.warn('error massage')             // 重要度: DEFAULT | ErrorReporting: 
logger.warn(new Error('error message'))  // 重要度: DEFAULT | ErrorReporting: ○
logger.error('error massage')            // 重要度: DEFAULT | ErrorReporting:
logger.error(new Error('error message')) // 重要度: DEFAULT | ErrorReporting: ○ 
```

### カスタム

- levelに応じて`severity`を付与することで重要度適切に設定される
- Errorは `{ err: { ... } }` で出力されるので ErrorReporting が生成される
  - severity が設定されているので、ERROR のときのみ生成される

```ts
const labels = pino().levels.labels;

export const logger = pino({
  level: "info",
  mixin: (_, level) => {
    return { severity: labels[level].toUpperCase() };
  },
});

logger.info('error massage')             // 重要度: INFO  | ErrorReporting: 
logger.info(new Error('error message'))  // 重要度: INFO  | ErrorReporting:
logger.warn('error massage')             // 重要度: WARN  | ErrorReporting: 
logger.warn(new Error('error message'))  // 重要度: WARN  | ErrorReporting:
logger.error('error massage')            // 重要度: ERROR | ErrorReporting:
logger.error(new Error('error message')) // 重要度: ERROR | ErrorReporting: ○ 
```

## loglevel

### カスタムなし
- ログレベルによらずErrorを出力した場合にはエラーになる。それ以外はデフォルト
- Errorはテキストに変換されるため ErrorReporting が生成される

```ts
loglevel.setLevel('info')
const logger = loglevel;

logger.info('error massage')             // 重要度: DEFAULT | ErrorReporting: 
logger.info(new Error('error message'))  // 重要度: ERROR   | ErrorReporting: ○
logger.warn('error massage')             // 重要度: DEFAULT | ErrorReporting: 
logger.warn(new Error('error message'))  // 重要度: ERROR   | ErrorReporting: ○
logger.error('error massage')            // 重要度: DEFAULT | ErrorReporting:
logger.error(new Error('error message')) // 重要度: ERROR   | ErrorReporting: ○ 
```
### カスタム

出力データを構造化できないのでこれ以上のカスタマイズは不可能


## 番外編

プレーンテキストもログレベルがerrorのときは、ErrorReportingを生成する

この形式でログが出力されるようにする。
```
{
  "@type": "type.googleapis.com/google.devtools.clouderrorreporting.v1beta1.ReportedErrorEvent",
  "message": "A simple text message"
}
```

console.log以外で一番簡単にカスタムできたのは、winston

```ts
const severity = winston.format((info) => {
  info["severity"] = info.level.toUpperCase();
  return info;
});

const errorReport = winston.format((info) => {
  if (info instanceof Error) {
    info.err = {
      name: info.name,
      message: info.message,
      stack: info.stack,
    };
  } else if (info.level === "error") {
    info["@type"] =
            "type.googleapis.com/google.devtools.clouderrorreporting.v1beta1.ReportedErrorEvent";
  }
  return info;
});

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    severity(),
    errorReport(),
    winston.format.json()
  ),
  transports: [new winston.transports.Console()],
});

logger.info('error massage')             // 重要度: INFO  | ErrorReporting: 
logger.info(new Error('error message'))  // 重要度: INFO  | ErrorReporting:
logger.warn('error massage')             // 重要度: WARN  | ErrorReporting: 
logger.warn(new Error('error message'))  // 重要度: WARN  | ErrorReporting:
logger.error('error massage')            // 重要度: ERROR | ErrorReporting: ○ 
logger.error(new Error('error message')) // 重要度: ERROR | ErrorReporting: ○ 
```

pinoは、デフォルトのメッセージキーが`msg`となっており、`messageKey: 'message'`としてやる必要があるが、  
そうなると、今度は例外を処理する場合に、`err`と`message`が競合してしまうために、
```
{
  "err": {
    ...
  },
  "message": "...",

}
```