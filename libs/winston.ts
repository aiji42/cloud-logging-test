import winston from "winston";

const severity = winston.format((info) => {
  let level = info.level.toUpperCase();
  if (level === "VERBOSE") {
    level = "DEBUG";
  }
  info["severity"] = level;
  return info;
});

export const winstonLogger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    severity(),
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [new winston.transports.Console()],
});
