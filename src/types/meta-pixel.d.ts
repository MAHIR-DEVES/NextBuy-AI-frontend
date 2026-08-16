export {};

declare global {
  interface Window {
    fbq: (
      event: string,
      eventName: string,
      parameters?: Record<string, unknown>,
    ) => void;
  }
}
