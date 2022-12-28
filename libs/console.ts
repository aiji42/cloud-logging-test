const makeLogger = (severity: "INFO" | "WARN" | "ERROR") => {
  return (entry: any, meta?: Record<string, any>) => {
    console.log(
      JSON.stringify({
        severity,
        message: entry instanceof Error ? entry.stack : String(entry),
        ...meta,
      })
    );
  };
};

export const consoleLogger = {
  info: makeLogger("INFO"),
  warn: makeLogger("WARN"),
  error: makeLogger("ERROR"),
};
