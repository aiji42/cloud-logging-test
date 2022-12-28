const messagify = (entry: any) => {
  if (entry instanceof Error) {
    return entry.stack;
  }
  return String(entry);
};

export const consoleLogger = {
  info: (entry: any, meta?: Record<string, any>) => {
    console.log(
      JSON.stringify({
        severity: "INFO",
        message: messagify(entry),
        ...meta,
      })
    );
  },
  warn: (entry: any, meta?: Record<string, any>) => {
    console.log(
      JSON.stringify({
        severity: "WARN",
        message: messagify(entry),
        ...meta,
      })
    );
  },
  error: (entry: any, meta?: Record<string, any>) => {
    console.log(
      JSON.stringify({
        severity: "ERROR",
        message: messagify(entry),
        ...meta,
      })
    );
  },
};
