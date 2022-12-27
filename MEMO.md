
https://qiita.com/suin/items/d5d5d7199b62eed63bde

> JavaScriptのConsole APIのメソッドの違いは、基本的にGCPの重大度に影響しません。ただし、console.warnとconsole.errorがErrorオブジェクトをロギングした場合に限り、重大度が「ERROR」になります。

TODO: loggerも大抵は同様だが、どこまで同じかを確かめる

## Error reporting

https://cloud.google.com/error-reporting/docs/formatting-error-messages?hl=ja

- スタック トレースまたは例外を含むログエントリ
- ReportedErrorEvent のような形式のログエントリ

```
{
  "eventTime": string,
  "serviceContext": {
    object (ServiceContext)
  },
  "message": string,
  "context": {
    object (ErrorContext)
  }
}
```