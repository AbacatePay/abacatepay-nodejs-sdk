import { BASE_URL, createDefaultHeaders } from "./constants";

export function createRequest(apiKey: string) {
	const defaultHeaders = createDefaultHeaders(apiKey);

	return async <Response>(path: string, options: RequestInit) => {
		try {
			const response = await fetch(`${BASE_URL}${path}`, {
				...options,
				headers: { ...defaultHeaders, ...options?.headers },
			});

			return response.json().then((data) => {
				if (!response.ok) {
					return { error: data.message } as Response;
				}

				return data as Response;
			});
		} catch (error) {
			return { error: (error as Error).message } as Response;
		}
	};
}
