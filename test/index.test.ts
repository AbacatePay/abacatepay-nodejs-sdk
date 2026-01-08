// index.test.ts
import { beforeEach, describe, expect, it, mock } from "bun:test";

const mockRequest = mock();

mock.module("../src/requests", () => ({
	createRequest: mock(() => mockRequest),
}));

import { Routes } from "@abacatepay/types";
import {
	CouponDiscountKind,
	PaymentFrequency,
	PaymentMethod,
	type RESTPostCreateCouponBody,
	type RESTPostCreateNewChargeBody,
	type RESTPostCreateNewWithdrawBody,
} from "@abacatepay/types/v1";
import AbacatePay, { AbacatePayError } from "../src/index";
import { createRequest } from "../src/requests";

describe("AbacatePay", () => {
	const apiKey = "test-api-key";

	beforeEach(() => {
		mock.restore();
		mockRequest.mockReset();
	});

	it("should throw AbacatePayError if apiKey is not provided", () => {
		expect(() => AbacatePay("")).toThrow(AbacatePayError);
		expect(() => AbacatePay("")).toThrow("API key is required!");
	});

	it("should initialize correctly with valid API key", () => {
		const sdk = AbacatePay(apiKey);

		expect(createRequest).toHaveBeenCalledWith(apiKey);

		expect(sdk).toHaveProperty("store");
		expect(sdk).toHaveProperty("coupon");
		expect(sdk).toHaveProperty("billing");
		expect(sdk).toHaveProperty("customer");
		expect(sdk).toHaveProperty("pixQrCode");
		expect(sdk).toHaveProperty("withdrawal");
	});

	describe("billing", () => {
		it("create", async () => {
			mockRequest.mockResolvedValue({ data: "billing-created" });

			const sdk = AbacatePay(apiKey);
			const billingData = {
				frequency: PaymentFrequency.OneTime,
				methods: [PaymentMethod.Pix],
				products: [
					{
						externalId: "product-1",
						name: "Test Product",
						quantity: 1,
						price: 1000,
					},
				],
				returnUrl: "https://return.url",
				completionUrl: "https://completion.url",
				customerId: "customer_xyz",
			} satisfies RESTPostCreateNewChargeBody;

			const result = await sdk.billing.create(billingData);

			expect(mockRequest).toHaveBeenCalledWith(Routes.billing.create, {
				method: "POST",
				body: JSON.stringify(billingData),
			});
			// @ts-expect-error
			expect(result).toEqual({ data: "billing-created" });
		});

		it("createLink", async () => {
			mockRequest.mockResolvedValue({ data: "billing-link-created" });

			const sdk = AbacatePay(apiKey);
			const billingLinkData = {
				methods: [PaymentMethod.Pix],
				products: [
					{
						externalId: "product-1",
						name: "Test Product",
						quantity: 1,
						price: 1000,
					},
				],
				returnUrl: "https://return.url",
				completionUrl: "https://completion.url",
			} satisfies Parameters<typeof sdk.billing.createLink>[0];

			const result = await sdk.billing.createLink(billingLinkData);

			expect(mockRequest).toHaveBeenCalledWith(Routes.billing.create, {
				method: "POST",
				body: JSON.stringify({
					...billingLinkData,
					frequency: "MULTIPLE_PAYMENTS",
				}),
			});
			// @ts-expect-error
			expect(result).toEqual({ data: "billing-link-created" });
		});

		it("list", async () => {
			mockRequest.mockResolvedValue({ data: ["billing1", "billing2"] });

			const sdk = AbacatePay(apiKey);
			const result = await sdk.billing.list();

			expect(mockRequest).toHaveBeenCalledWith(Routes.billing.list, {
				method: "GET",
			});
			// @ts-expect-error
			expect(result).toEqual({ data: ["billing1", "billing2"] });
		});
	});

	describe("customer", () => {
		it("create", async () => {
			mockRequest.mockResolvedValue({ data: "customer-created" });

			const sdk = AbacatePay(apiKey);
			const customerData = {
				name: "Test Customer",
				email: "test@example.com",
				cellphone: "1234567890",
				taxId: "12345678900",
			};

			const result = await sdk.customer.create(customerData);

			expect(mockRequest).toHaveBeenCalledWith(Routes.customer.create, {
				method: "POST",
				body: JSON.stringify(customerData),
			});

			// @ts-expect-error
			expect(result).toEqual({ data: "customer-created" });
		});

		it("list", async () => {
			mockRequest.mockResolvedValue({ data: ["customer1", "customer2"] });

			const sdk = AbacatePay(apiKey);
			const result = await sdk.customer.list();

			expect(mockRequest).toHaveBeenCalledWith(Routes.customer.list, {
				method: "GET",
			});
			// @ts-expect-error
			expect(result).toEqual({ data: ["customer1", "customer2"] });
		});
	});

	describe("coupon", () => {
		it("create", async () => {
			mockRequest.mockResolvedValue({ data: "coupon-created" });

			const sdk = AbacatePay(apiKey);
			const couponData = {
				data: {
					discount: 10,
					code: "TEST10",
					discountKind: CouponDiscountKind.Percentage,
				},
			} satisfies RESTPostCreateCouponBody;

			const result = await sdk.coupon.create(couponData);

			expect(mockRequest).toHaveBeenCalledWith(Routes.coupon.create, {
				method: "POST",
				body: JSON.stringify(couponData),
			});

			// @ts-expect-error
			expect(result).toEqual({ data: "coupon-created" });
		});

		it("list", async () => {
			mockRequest.mockResolvedValue({ data: ["coupon1", "coupon2"] });

			const sdk = AbacatePay(apiKey);
			const result = await sdk.coupon.list();

			expect(mockRequest).toHaveBeenCalledWith(Routes.coupon.list, {
				method: "GET",
			});
			// @ts-expect-error
			expect(result).toEqual({ data: ["coupon1", "coupon2"] });
		});
	});

	describe("pixQrCode", () => {
		it("create", async () => {
			mockRequest.mockResolvedValue({ data: "pix-qrcode-created" });

			const sdk = AbacatePay(apiKey);
			const pixQrCodeData = {
				amount: 1000,
				expiresIn: 3600,
				description: "Test payment",
			};

			const result = await sdk.pixQrCode.create(pixQrCodeData);

			expect(mockRequest).toHaveBeenCalledWith(Routes.pix.createQRCode, {
				method: "POST",
				body: JSON.stringify(pixQrCodeData),
			});

			// @ts-expect-error
			expect(result).toEqual({ data: "pix-qrcode-created" });
		});

		it("check", async () => {
			mockRequest.mockResolvedValue({ data: "pix-qrcode-status" });

			const id = "pix_char_abc123";
			const sdk = AbacatePay(apiKey);

			const result = await sdk.pixQrCode.check(id);

			expect(mockRequest).toHaveBeenCalledWith(Routes.pix.checkStatus({ id }), {
				method: "GET",
			});

			// @ts-expect-error
			expect(result).toEqual({ data: "pix-qrcode-status" });
		});

		it("simulatePayment", async () => {
			mockRequest.mockResolvedValue({
				data: {
					id: "pix-qrcode-payment-simulated",
				},
			});

			const sdk = AbacatePay(apiKey);

			const id = "pix_char_abc123";

			const metadata = { source: "test" };

			const result = await sdk.pixQrCode.simulatePayment(id, metadata);

			expect(mockRequest).toHaveBeenCalledWith(
				Routes.pix.simulatePayment({ id }),
				{
					method: "POST",
					body: JSON.stringify({ metadata }),
				},
			);

			expect(result.data?.id).toEqual("pix-qrcode-payment-simulated");
		});
	});

	describe("withdrawal", () => {
		it("create", async () => {
			mockRequest.mockResolvedValue({ data: "withdrawal-created" });

			const sdk = AbacatePay(apiKey);
			const withdrawalData = {
				externalId: "custom_id_abc",
				method: "PIX",
				amount: 10000,
				pix: {
					type: "CPF",
					key: "012.345.678-90",
				},
			} satisfies RESTPostCreateNewWithdrawBody;

			const result = await sdk.withdrawal.create(withdrawalData);

			expect(mockRequest).toHaveBeenCalledWith(Routes.withdraw.create, {
				method: "POST",
				body: JSON.stringify(withdrawalData),
			});

			// @ts-expect-error
			expect(result).toEqual({ data: "withdrawal-created" });
		});

		it("get", async () => {
			mockRequest.mockResolvedValue({ data: "withdrawal-details" });

			const sdk = AbacatePay(apiKey);
			const withdrawalId = "withdrawal_123456";
			const result = await sdk.withdrawal.get(withdrawalId);

			expect(mockRequest).toHaveBeenCalledWith(
				Routes.withdraw.get({ externalId: withdrawalId }),
				{ method: "GET" },
			);

			// @ts-expect-error
			expect(result).toEqual({ data: "withdrawal-details" });
		});

		it("list", async () => {
			mockRequest.mockResolvedValue({
				data: ["withdrawal1", "withdrawal2"],
			});

			const sdk = AbacatePay(apiKey);

			const result = await sdk.withdrawal.list();

			expect(mockRequest).toHaveBeenCalledWith(Routes.withdraw.list, {
				method: "GET",
			});

			// @ts-expect-error
			expect(result).toEqual({
				data: ["withdrawal1", "withdrawal2"],
			});
		});
	});

	describe("store", () => {
		it("get", async () => {
			mockRequest.mockResolvedValue({ data: "store-details" });

			const sdk = AbacatePay(apiKey);
			const result = await sdk.store.get();

			expect(mockRequest).toHaveBeenCalledWith(Routes.store.get, {
				method: "GET",
			});
			// @ts-expect-error
			expect(result).toEqual({ data: "store-details" });
		});
	});
});
