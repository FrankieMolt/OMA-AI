/**
 * Logging Utility
 *
 * Centralized logging for production
 * Replaces console.* statements for better error tracking
 */

const isDevelopment = process.env.NODE_ENV === 'development';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function logError(context: string, error: any): void {
  if (isDevelopment) {
    console.error(`[${context}]`, error);
  } else {
    // In production, send to error tracking service
    // TODO: Integrate Sentry or similar
    // Error tracking can be added here
  }
}

export function logInfo(context: string, message: string): void {
  if (isDevelopment) {
    console.info(`[${context}]`, message);
  }
}

export function logWarn(context: string, message: string): void {
  if (isDevelopment) {
    console.warn(`[${context}]`, message);
  }
}
