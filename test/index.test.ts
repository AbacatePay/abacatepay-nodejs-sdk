// index.test.ts
import AbacatePay, { AbacatePayError } from "../src/index";
import { createRequest } from "../src/requests";

// Mocking the createRequest module
jest.mock("../src/requests", () => ({
  createRequest: jest.fn(),
}));

describe("AbacatePay", () => {
  const apiKey = "test-api-key";
  const mockRequest = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (createRequest as jest.Mock).mockReturnValue(mockRequest);
  });

  it("should throw AbacatePayError if apiKey is not provided", () => {
    expect(() => AbacatePay("")).toThrow(AbacatePayError);
    expect(() => AbacatePay("")).toThrow("API key is required!");
  });

  it("should initialize correctly with valid API key", () => {
    const sdk = AbacatePay(apiKey);

    expect(createRequest).toHaveBeenCalledWith(apiKey);
    expect(sdk).toHaveProperty("billing");
    expect(sdk).toHaveProperty("customer");
    expect(sdk).toHaveProperty("coupon");
    expect(sdk).toHaveProperty("pixQrCode");
    expect(sdk).toHaveProperty("withdrawal");
    expect(sdk).toHaveProperty("store");
  });

  describe("billing", () => {
    it("should have create method that calls request with correct parameters", async () => {
      const sdk = AbacatePay(apiKey);
      const billingData = {
        frequency: "ONE_TIME" as const,
        methods: ["PIX" as const],
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
        customer: {
          email: "test@example.com",
        },
      };

      mockRequest.mockResolvedValue({ data: "billing-created" });

      const result = await sdk.billing.create(billingData);

      expect(mockRequest).toHaveBeenCalledWith("/billing/create", {
        method: "POST",
        body: JSON.stringify(billingData),
      });
      expect(result).toEqual({ data: "billing-created" });
    });

    it("should have createLink method that calls request with correct parameters", async () => {
      const sdk = AbacatePay(apiKey);
      const billingLinkData = {
        methods: ["PIX" as const],
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
      };

      mockRequest.mockResolvedValue({ data: "billing-link-created" });

      const result = await sdk.billing.createLink(billingLinkData);

      expect(mockRequest).toHaveBeenCalledWith("/billing/create", {
        method: "POST",
        body: JSON.stringify({
          ...billingLinkData,
          frequency: "MULTIPLE_PAYMENTS",
        }),
      });
      expect(result).toEqual({ data: "billing-link-created" });
    });

    it("should have list method that calls request with correct parameters", async () => {
      const sdk = AbacatePay(apiKey);
      mockRequest.mockResolvedValue({ data: ["billing1", "billing2"] });

      const result = await sdk.billing.list();

      expect(mockRequest).toHaveBeenCalledWith("/billing/list", {
        method: "GET",
      });
      expect(result).toEqual({ data: ["billing1", "billing2"] });
    });
  });

  describe("customer", () => {
    it("should have create method that calls request with correct parameters", async () => {
      const sdk = AbacatePay(apiKey);
      const customerData = {
        name: "Test Customer",
        email: "test@example.com",
        cellphone: "1234567890",
        taxId: "12345678900",
      };

      mockRequest.mockResolvedValue({ data: "customer-created" });

      const result = await sdk.customer.create(customerData);

      expect(mockRequest).toHaveBeenCalledWith("/customer/create", {
        method: "POST",
        body: JSON.stringify(customerData),
      });
      expect(result).toEqual({ data: "customer-created" });
    });

    it("should have list method that calls request with correct parameters", async () => {
      const sdk = AbacatePay(apiKey);
      mockRequest.mockResolvedValue({ data: ["customer1", "customer2"] });

      const result = await sdk.customer.list();

      expect(mockRequest).toHaveBeenCalledWith("/customer/list", {
        method: "GET",
      });
      expect(result).toEqual({ data: ["customer1", "customer2"] });
    });
  });

  describe("coupon", () => {
    it("should have create method that calls request with correct parameters", async () => {
      const sdk = AbacatePay(apiKey);
      const couponData = {
        code: "TEST10",
        discountKind: "PERCENTAGE" as const,
        discount: 10,
      };

      mockRequest.mockResolvedValue({ data: "coupon-created" });

      const result = await sdk.coupon.create(couponData);

      expect(mockRequest).toHaveBeenCalledWith("/coupon/create", {
        method: "POST",
        body: JSON.stringify(couponData),
      });
      expect(result).toEqual({ data: "coupon-created" });
    });

    it("should have list method that calls request with correct parameters", async () => {
      const sdk = AbacatePay(apiKey);
      mockRequest.mockResolvedValue({ data: ["coupon1", "coupon2"] });

      const result = await sdk.coupon.list();

      expect(mockRequest).toHaveBeenCalledWith("/coupon/list", {
        method: "GET",
      });
      expect(result).toEqual({ data: ["coupon1", "coupon2"] });
    });
  });

  describe("pixQrCode", () => {
    it("should have create method that calls request with correct parameters", async () => {
      const sdk = AbacatePay(apiKey);
      const pixQrCodeData = {
        amount: 1000,
        expiresIn: 3600,
        description: "Test payment",
      };

      mockRequest.mockResolvedValue({ data: "pix-qrcode-created" });

      const result = await sdk.pixQrCode.create(pixQrCodeData);

      expect(mockRequest).toHaveBeenCalledWith("/pixQrCode/create", {
        method: "POST",
        body: JSON.stringify(pixQrCodeData),
      });
      expect(result).toEqual({ data: "pix-qrcode-created" });
    });

    it("should have check method that calls request with correct parameters", async () => {
      const sdk = AbacatePay(apiKey);
      const pixQrCodeData = { id: "pix_char_abc123" };

      mockRequest.mockResolvedValue({ data: "pix-qrcode-status" });

      const result = await sdk.pixQrCode.check(pixQrCodeData);

      expect(mockRequest).toHaveBeenCalledWith(
        "/pixQrCode/check?id=pix_char_abc123",
        {
          method: "GET",
        },
      );
      expect(result).toEqual({ data: "pix-qrcode-status" });
    });

    it("should have simulatePayment method that calls request with correct parameters", async () => {
      const sdk = AbacatePay(apiKey);
      const pixQrCodeData = { id: "pix_char_abc123" };
      const metadata = { source: "test" };

      mockRequest.mockResolvedValue({ data: "pix-qrcode-payment-simulated" });

      const result = await sdk.pixQrCode.simulatePayment(
        pixQrCodeData,
        metadata,
      );

      expect(mockRequest).toHaveBeenCalledWith(
        "/pixQrCode/simulate-payment?id=pix_char_abc123",
        {
          method: "POST",
          body: JSON.stringify({ metadata }),
        },
      );
      expect(result).toEqual({ data: "pix-qrcode-payment-simulated" });
    });
  });

  describe("withdrawal", () => {
    it("should have create method that calls request with correct parameters", async () => {
      const sdk = AbacatePay(apiKey);
      const withdrawalData = {
        amount: 10000,
        bankAccount: {
          bankCode: "001",
          agency: "1234",
          account: "12345678",
          accountType: "CHECKING" as const,
          holderName: "João da Silva",
          holderDocument: "12345678900",
        },
      };

      mockRequest.mockResolvedValue({ data: "withdrawal-created" });

      const result = await sdk.withdrawal.create(withdrawalData);

      expect(mockRequest).toHaveBeenCalledWith("/withdrawal/create", {
        method: "POST",
        body: JSON.stringify(withdrawalData),
      });
      expect(result).toEqual({ data: "withdrawal-created" });
    });

    it("should have get method that calls request with correct parameters", async () => {
      const sdk = AbacatePay(apiKey);
      const withdrawalId = "withdrawal_123456";

      mockRequest.mockResolvedValue({ data: "withdrawal-details" });

      const result = await sdk.withdrawal.get(withdrawalId);

      expect(mockRequest).toHaveBeenCalledWith(
        `/withdrawal/get?id=${withdrawalId}`,
        {
          method: "GET",
        },
      );
      expect(result).toEqual({ data: "withdrawal-details" });
    });

    it("should have list method that calls request with correct parameters", async () => {
      const sdk = AbacatePay(apiKey);
      mockRequest.mockResolvedValue({ data: ["withdrawal1", "withdrawal2"] });

      const result = await sdk.withdrawal.list();

      expect(mockRequest).toHaveBeenCalledWith("/withdrawal/list", {
        method: "GET",
      });
      expect(result).toEqual({ data: ["withdrawal1", "withdrawal2"] });
    });
  });

  describe("store", () => {
    it("should have get method that calls request with correct parameters", async () => {
      const sdk = AbacatePay(apiKey);
      mockRequest.mockResolvedValue({ data: "store-details" });

      const result = await sdk.store.get();

      expect(mockRequest).toHaveBeenCalledWith("/store/get", {
        method: "GET",
      });
      expect(result).toEqual({ data: "store-details" });
    });
  });
});
