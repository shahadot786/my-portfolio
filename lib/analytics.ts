import { API_BASE_URL } from '@/config/api';

export const trackEvent = (type: 'view' | 'click', path: string, url?: string) => {
  if (typeof window === 'undefined') return;

  // Don't track admin actions
  if (window.location.pathname.startsWith('/admin')) return;

  fetch(`${API_BASE_URL}/analytics`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      path,
      type,
      url,
      language: navigator.language,
      screen: `${window.screen.width}x${window.screen.height}`
    })
  }).catch(err => console.error('Tracking error:', err));
};
