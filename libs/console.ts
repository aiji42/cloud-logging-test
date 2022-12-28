export const consoleLogger = {
  info: (entry: any, meta?: Record<string, any>) => {
    console.log(
      JSON.stringify({
        severity: "INFO",
        message: String(entry),
        ...meta,
      })
    );
  },
  warn: (entry: any, meta?: Record<string, any>) => {
    console.log(
      JSON.stringify({
        severity: "WARN",
        message: String(entry),
        ...meta,
      })
    );
  },
  error: (entry: any, meta?: Record<string, any>) => {
    console.log(
      JSON.stringify({
        severity: "ERROR",
        message: String(entry),
        ...meta,
      })
    );
  },
};
