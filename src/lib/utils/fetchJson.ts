/**
 * Centralized HTTP helper with consistent error handling
 */

export async function fetchJson<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `HTTP ${response.status}`;
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.message || errorMessage;
      } catch {
        if (errorText) errorMessage = errorText.slice(0, 200);
      }
      throw new Error(errorMessage);
    }

    return await response.json() as T;
  } catch (error) {
    console.error('[fetchJson] Error fetching', url, error);
    throw error;
  }
}

export async function postJson<T>(
  url: string,
  data: unknown,
  options?: RequestInit
): Promise<T> {
  return fetchJson<T>(url, {
    method: 'POST',
    body: JSON.stringify(data),
    ...options,
  });
}

const fetchJsonExports = {
  fetchJson,
  postJson,
};

export default fetchJsonExports;
