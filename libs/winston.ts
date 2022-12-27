import winston from "winston";

// https://zenn.dev/ropitaru/scraps/4d49afd30b1eaa
// severity: <Log Lebel>を出力するJSONに含める

export const winstonLogger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.errors({ stack: true }),
    winston.format.json(),
    winston.format((info) => {
      let level = info.level.toUpperCase();
      if (level === "VERBOSE") {
        level = "DEBUG";
      }
      info["severity"] = level;
      return info;
    })()
  ),
  transports: [new winston.transports.Console()],
});
