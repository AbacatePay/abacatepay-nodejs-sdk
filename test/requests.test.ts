// requests.test.ts

import { beforeEach, describe, expect, it, mock } from "bun:test";
import { BASE_URL, DEFAULT_HEADERS } from "../src/constants";
import { createRequest } from "../src/requests";

// Mock global fetch
// @ts-expect-error
global.fetch = mock();

describe("createRequest", () => {
	const apiKey = "test-api-key";
	const path = "/test-path";
	const mockResponse = { data: "test-data" };

	beforeEach(() => {
		mock.restore();
	});

	it("should call fetch with correct URL and headers", async () => {
		(fetch as unknown as ReturnType<typeof mock>).mockResolvedValue({
			ok: true,
			json: async () => mockResponse,
		} as Response);

		const request = createRequest(apiKey);
		const options = { method: "GET" };

		await request(path, options);

		expect(fetch).toHaveBeenCalledWith(`${BASE_URL}${path}`, {
			...options,
			headers: DEFAULT_HEADERS(apiKey),
		});
	});

	it("should merge custom headers with default headers", async () => {
		(fetch as unknown as ReturnType<typeof mock>).mockResolvedValue({
			ok: true,
			json: async () => mockResponse,
		} as Response);

		const request = createRequest(apiKey);
		const customHeaders = { "Custom-Header": "custom-value" };
		const options = {
			method: "GET",
			headers: customHeaders,
		};

		await request(path, options);

		expect(fetch).toHaveBeenCalledWith(`${BASE_URL}${path}`, {
			...options,
			headers: { ...DEFAULT_HEADERS(apiKey), ...customHeaders },
		});
	});

	it("should return JSON data when response is ok", async () => {
		(fetch as unknown as ReturnType<typeof mock>).mockResolvedValue({
			ok: true,
			json: async () => mockResponse,
		} as Response);

		const request = createRequest(apiKey);
		const result = await request(path, { method: "GET" });

		expect(result).toEqual(mockResponse);
	});

	it("should return error object when response is not ok", async () => {
		const errorMessage = "Error message";

		(fetch as unknown as ReturnType<typeof mock>).mockResolvedValue({
			ok: false,
			json: async () => ({ message: errorMessage }),
		} as Response);

		const request = createRequest(apiKey);
		const result = await request(path, { method: "GET" });

		expect(result).toEqual({ error: errorMessage });
	});

	it("should handle fetch errors", async () => {
		const errorMessage = "Network error";

		(fetch as unknown as ReturnType<typeof mock>).mockRejectedValue(
			new Error(errorMessage),
		);

		const request = createRequest(apiKey);
		const result = await request(path, { method: "GET" });

		expect(result).toEqual({ error: errorMessage });
	});
});
