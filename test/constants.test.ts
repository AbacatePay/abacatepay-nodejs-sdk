// constants.test.ts

import { describe, expect, it } from "bun:test";
import { API_BASE_URL, API_VERSION } from "@abacatepay/types";
import {
	ABACATE_PAY_DOCS,
	BASE_URL,
	createDefaultHeaders,
} from "../src/constants";
import { ABACATE_PAY_VERSION } from "../src/version";

describe("Constants", () => {
	describe("BASE_URL", () => {
		it("should have correct API base URL", () => {
			expect(BASE_URL).toBe(`${API_BASE_URL}v${API_VERSION}`);
		});
	});

	describe("ABACATE_PAY_DOCS", () => {
		it("should have correct documentation URL", () => {
			expect(ABACATE_PAY_DOCS).toBe("https://docs.abacatepay.com");
		});
	});

	describe("createDefaultHeaders", () => {
		it("should return headers with Authorization, Content-Type and User-Agent", () => {
			const apiKey = "test-api-key";
			const headers = createDefaultHeaders(apiKey);

			expect(headers).toEqual({
				Authorization: `Bearer ${apiKey}`,
				"Content-Type": "application/json",
				"User-Agent": `NodeJS SDK (${ABACATE_PAY_VERSION})`,
			});
		});
	});
});
