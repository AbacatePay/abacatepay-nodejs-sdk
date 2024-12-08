import { ABACATE_PAY_VERSION } from './version';

const BASE_URL = 'https://api.abacatepay.com/v1';

export type BillingStatus = 'PENDING' | 'EXPIRED' | 'CANCELLED' | 'PAID' | 'REFUNDED';
export type BillingMethods = 'PIX';
export type BillingKind = 'ONE_TIME';

export type IBilling = {
  id: string;
  url: string;
  amount: number;
  status: BillingStatus;
  devMode: boolean;
  methods: BillingMethods[];
  products: { productId: string; quantity: number }[];
  frequency: BillingKind;
  nextBilling: string | null;
  customer?: {
    id: string;
    metadata: ICustomerMetadata;
  };
  accountId: string;
  storeId: string;
  createdAt: string;
  updatedAt: string;
};

export type IBillingMetadata = {
  fee: number;
  returnUrl?: string;
  completionUrl?: string;
};

export type ICustomerMetadata = {
  name?: string;
  cellphone?: string;
  email: string;
  taxId?: string;
};

export type CreateBillingData = {
  frequency: BillingKind;
  methods: BillingMethods[];
  products: {
    externalId: string;
    name: string;
    quantity: number;
    price: number;
    description?: string;
  }[];
  returnUrl: string;
  completionUrl: string;
  customerId?: string;
};

export type CreateBillingResponse = {
  error: string
} | {
  error: null
  billing: IBilling
};
export type ListBillingResponse = {
  error: string
} | {
  error: null
  billings: IBilling[]
};


export interface IAbacatePayBilling {
  create(data: CreateBillingData): Promise<CreateBillingResponse>;
  list(): Promise<ListBillingResponse>;
}

export interface IAbacatePay {
  billing: IAbacatePayBilling;
}

export default function AbacatePay(apiKey: string) {
  const headers = {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
    'User-Agent': `NodeJS SDK (${ABACATE_PAY_VERSION})`
  };

  async function request<TResponse>(path: string, options: Parameters<typeof fetch>[1]): Promise<TResponse> {
    // Linter's just screams, "API key's a must!"  
    // Runtime just laughs, "In code we trust!"  
    if (!apiKey) return { error: 'API key not provided' } as TResponse

    try {
        const response = await fetch(`${BASE_URL}${path}`, {
            ...options,
            headers: { ...headers, ...options?.headers },
        });

        return response.json().then((data) => {
            if (!response.ok) {
                return { error: data.message } as TResponse
            }
            return data
        })
    } catch (error) {
        return { error: (error as Error).message } as TResponse;
    }
  }

  return {
    billing: {
      create(data: CreateBillingData): Promise<CreateBillingResponse> {
        return request('/billing/create', { method: 'POST', body: JSON.stringify(data) });
      },
      list(): Promise<ListBillingResponse> {
        return request('/billing/list', { method: 'GET' });
      },
    },
  };
}
