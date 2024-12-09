import { AbacatePayError } from './exceptions';
import { createRequest } from './requests';
import type {
	CreateBillingData,
	CreateBillingResponse,
	ListBillingResponse,
} from './types';


export default function AbacatePay(apiKey: string) {
	if (!apiKey) throw new AbacatePayError('API key is required!');
	const request = createRequest(apiKey);

	return {
		billing: {
			create(data: CreateBillingData): Promise<CreateBillingResponse> {
				return request('/billing/create', {
					method: 'POST',
					body: JSON.stringify(data),
				});
			},
			list(): Promise<ListBillingResponse> {
				return request('/billing/list', { method: 'GET' });
			},
		},
	};
}

export { AbacatePayError };
