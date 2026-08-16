export const trackMetaEvent = (
  eventName: string,
  parameters?: Record<string, unknown>,
) => {
  if (typeof window === 'undefined') return;

  if (!window.fbq) return;

  window.fbq('track', eventName, parameters);
};
