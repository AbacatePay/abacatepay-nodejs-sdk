export type BillingStatus =
	| 'PENDING'
	| 'EXPIRED'
	| 'CANCELLED'
	| 'PAID'
	| 'REFUNDED';
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

export type CreateBillingResponse =
	| {
			error: string;
	  }
	| {
			error: null;
			billing: IBilling;
	  };
export type ListBillingResponse =
	| {
			error: string;
	  }
	| {
			error: null;
			billings: IBilling[];
	  };

export interface IAbacatePayBilling {
	create(data: CreateBillingData): Promise<CreateBillingResponse>;
	list(): Promise<ListBillingResponse>;
}

export interface IAbacatePay {
	billing: IAbacatePayBilling;
}
