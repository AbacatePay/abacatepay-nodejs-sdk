import { API_BASE_URL, API_VERSION } from "@abacatepay/types";
import { ABACATE_PAY_VERSION } from "./version";

export const BASE_URL = `${API_BASE_URL}v${API_VERSION}` as const;

export const ABACATE_PAY_DOCS = "https://docs.abacatepay.com";

export function createDefaultHeaders(apiKey: string) {
	return {
		Authorization: `Bearer ${apiKey}`,
		"Content-Type": "application/json",
		"User-Agent": `NodeJS SDK (${ABACATE_PAY_VERSION})`,
	};
}
