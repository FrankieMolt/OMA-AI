/**
 * Edge-compatible Logger
 *
 * This logger works in both Node.js and Edge Runtime environments.
 * It detects the runtime and uses appropriate logging methods.
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogMeta {
  [key: string]: unknown;
}

const formatMessage = (level: LogLevel, message: string, meta?: LogMeta): string => {
  const timestamp = new Date().toISOString();
  let msg = `${timestamp} [${level.toUpperCase()}]: ${message}`;
  if (meta && Object.keys(meta).length > 0) {
    msg += ` ${JSON.stringify(meta)}`;
  }
  return msg;
};

class EdgeCompatibleLogger {
  private level: LogLevel;

  constructor() {
    this.level = (process?.env?.LOG_LEVEL as LogLevel) || 'info';
  }

  private shouldLog(level: LogLevel): boolean {
    const levels: Record<LogLevel, number> = { debug: 0, info: 1, warn: 2, error: 3 };
    return levels[level] >= levels[this.level];
  }

  debug(message: string, meta?: LogMeta): void {
    if (this.shouldLog('debug')) {
      console.warn(formatMessage('debug', message, meta));
    }
  }

  info(message: string, meta?: LogMeta): void {
    if (this.shouldLog('info')) {
      console.warn(formatMessage('info', message, meta));
    }
  }

  warn(message: string, meta?: LogMeta): void {
    if (this.shouldLog('warn')) {
      console.warn(formatMessage('warn', message, meta));
    }
  }

  error(message: string, meta?: LogMeta): void {
    if (this.shouldLog('error')) {
      console.error(formatMessage('error', message, meta));
    }
  }
}

export const logger = new EdgeCompatibleLogger();
