export const APP_ALERT_EVENT = 'ra:alert';

export const emitAppAlert = ({ type = 'error', message = 'Something went wrong' }) => {
  window.dispatchEvent(
    new CustomEvent(APP_ALERT_EVENT, {
      detail: {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        type,
        message,
      },
    })
  );
};
