import winston from "winston";

// https://zenn.dev/ropitaru/scraps/4d49afd30b1eaa
// severity: <Log Lebel>を出力するJSONに含める、もしくはstderrを使うように設定する

export const winstonLogger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),

  // stderrで出力されているのは間違いないが、重要度がエラーにならない...
  transports: [new winston.transports.Console({ stderrLevels: ["error"] })],
});
