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
  info["severity"] = info.level.toUpperCase();
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
  if (info instanceof Error) {
    info.err = {
      name: info.name,
      message: info.message,
      stack: info.stack,
    };
  }
  // if (info.level === "error") {
  //   info["@type"] =
  //     "type.googleapis.com/google.devtools.clouderrorreporting.v1beta1.ReportedErrorEvent";
  // }
  return info;
});

export const winstonLoggerErrorReport = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    severity(),
    errorReport(),
    winston.format.json()
  ),
  transports: [new winston.transports.Console()],
});
