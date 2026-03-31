const baseURL = import.meta.env.VITE_API_BASE_URL;

  const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS', 'TRACE']);
  let csrfTokenCache: string | null = null;

  const getCsrfToken = async () => {
    if (csrfTokenCache) return csrfTokenCache;

    const res = await fetch(`${baseURL}/auth/csrf`, {
      method: 'GET',
      credentials: 'include',
    });

    if (!res.ok) throw new Error('No se pudo obtener CSRF token');
    const data = await res.json();
    csrfTokenCache = data.token;
    return csrfTokenCache;
  };

  export const fetchClient = async (endpoint: string, options: RequestInit = {}) => {
    const url = `${baseURL}${endpoint}`;
    const method = (options.method ?? 'GET').toUpperCase();

    const headers = new Headers(options.headers);
    if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
      headers.set('Content-Type', 'application/json');
    }

    if (!SAFE_METHODS.has(method)) {
      const token = await getCsrfToken();
      headers.set('X-XSRF-TOKEN', token);
    }

    const response = await fetch(url, {
      ...options,
      method,
      headers,
      credentials: 'include',
    });

    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;
      try {
        const errorData = await response.json();
        if (errorData.message) errorMessage = errorData.message;
      } catch {}
      throw new Error(errorMessage);
    }

    if (response.status === 204) return null;

    try {
      return await response.json();
    } catch {
      return null;
    }
  };