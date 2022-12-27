import winston from "winston";

export const winstonLogger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [new winston.transports.Console()],
});

const severity = winston.format((info) => {
  let level = info.level.toUpperCase();
  if (level === "VERBOSE") {
    level = "DEBUG";
  }
  info["severity"] = level;
  return info;
});

export const winstonLoggerSeverity = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    severity(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [new winston.transports.Console()],
});

const errorReport = winston.format((info) => {
  if (info.level === "error") info.type = "Error";

  return info;
});

export const winstonLoggerErrorReport = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    severity(),
    errorReport(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [new winston.transports.Console()],
});
