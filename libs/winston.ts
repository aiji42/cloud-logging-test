import winston from "winston";

// https://zenn.dev/ropitaru/scraps/4d49afd30b1eaa
// severity: <Log Lebel>を出力するJSONに含める、もしくはstderrを使うように設定する

// stderrを使うのが楽だが、warnを扱うのであればseverityの方がよい。

export const winstonLogger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [new winston.transports.Console({ stderrLevels: ["error"] })],
});
