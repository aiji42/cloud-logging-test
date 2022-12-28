export const consoleLogger = {
  info: (entry: any, meta?: Record<string, any>) => {
    console.log({
      severity: "INFO",
      message: String(entry),
      ...meta,
    });
  },
  warn: (entry: any, meta?: Record<string, any>) => {
    console.log({
      severity: "WARN",
      message: String(entry),
      ...meta,
    });
  },
  error: (entry: any, meta?: Record<string, any>) => {
    console.log({
      severity: "ERROR",
      message: String(entry),
      ...meta,
    });
  },
};
