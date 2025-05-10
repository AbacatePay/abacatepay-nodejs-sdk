import { BASE_URL, DEFAULT_HEADERS } from './constants';

export function createRequest(
  apiKey: string,
): <TResponse>(
  path: string,
  options: Parameters<typeof fetch>[1],
) => Promise<TResponse> {
  const defaultHeaders = DEFAULT_HEADERS(apiKey);

  return async <TResponse>(
    path: string,
    options: Parameters<typeof fetch>[1],
  ): Promise<TResponse> => {
    try {
      const response = await fetch(`${BASE_URL}${path}`, {
        ...options,
        headers: { ...defaultHeaders, ...options?.headers },
      });

      return response.json().then((data) => {
        if (!response.ok) {
          return { error: data.message } as TResponse;
        }
        return data;
      });
    } catch (error) {
      return { error: (error as Error).message } as TResponse;
    }
  };
}
