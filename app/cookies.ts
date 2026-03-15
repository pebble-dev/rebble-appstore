export function parseCookies(cookieHeader: string | null): Record<string, string> {
  if (!cookieHeader) return {};
  const cookies: Record<string, string> = {};
  for (const part of cookieHeader.split(';')) {
    const [key, ...rest] = part.trim().split('=');
    if (key) cookies[key.trim()] = rest.join('=').trim();
  }
  return cookies;
}

export function getSettings(request: Request) {
  const cookies = parseCookies(request.headers.get('Cookie'));
  return {
    hardware: cookies['as_hardware'] ?? '',
    platform: cookies['as_platform'] ?? '',
    language: cookies['as_language'] ?? '',
  };
}

export function buildApiQuery(settings: { hardware: string; platform: string }) {
  const params = new URLSearchParams();
  if (settings.hardware) params.set('hardware', settings.hardware);
  if (settings.platform) params.set('platform', settings.platform);
  return params.toString();
}
