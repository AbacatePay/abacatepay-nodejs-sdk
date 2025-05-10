// index.test.ts
import AbacatePay, { AbacatePayError } from '../src/index';
import { createRequest } from '../src/requests';

// Mocking the createRequest module
jest.mock('../src/requests', () => ({
  createRequest: jest.fn(),
}));

describe('AbacatePay', () => {
  const apiKey = 'test-api-key';
  const mockRequest = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (createRequest as jest.Mock).mockReturnValue(mockRequest);
  });

  it('should throw AbacatePayError if apiKey is not provided', () => {
    expect(() => AbacatePay('')).toThrow(AbacatePayError);
    expect(() => AbacatePay('')).toThrow('API key is required!');
  });

  it('should initialize correctly with valid API key', () => {
    const sdk = AbacatePay(apiKey);
    
    expect(createRequest).toHaveBeenCalledWith(apiKey);
    expect(sdk).toHaveProperty('billing');
    expect(sdk).toHaveProperty('customer');
    expect(sdk).toHaveProperty('coupon');
    expect(sdk).toHaveProperty('pixQrCode');
  });

  describe('billing', () => {
    it('should have create method that calls request with correct parameters', async () => {
      const sdk = AbacatePay(apiKey);
      const billingData = {
        frequency: 'ONE_TIME' as const,
        methods: ['PIX' as const],
        products: [
          {
            externalId: 'product-1',
            name: 'Test Product',
            quantity: 1,
            price: 1000,
          },
        ],
        returnUrl: 'https://return.url',
        completionUrl: 'https://completion.url',
        customer: {
          email: 'test@example.com',
        },
      };

      mockRequest.mockResolvedValue({ data: 'billing-created' });

      const result = await sdk.billing.create(billingData);

      expect(mockRequest).toHaveBeenCalledWith('/billing/create', {
        method: 'POST',
        body: JSON.stringify(billingData),
      });
      expect(result).toEqual({ data: 'billing-created' });
    });

    it('should have createLink method that calls request with correct parameters', async () => {
      const sdk = AbacatePay(apiKey);
      const billingLinkData = {
        methods: ['PIX' as const],
        products: [
          {
            externalId: 'product-1',
            name: 'Test Product',
            quantity: 1,
            price: 1000,
          },
        ],
        returnUrl: 'https://return.url',
        completionUrl: 'https://completion.url',
      };

      mockRequest.mockResolvedValue({ data: 'billing-link-created' });

      const result = await sdk.billing.createLink(billingLinkData);

      expect(mockRequest).toHaveBeenCalledWith('/billing/create', {
        method: 'POST',
        body: JSON.stringify({
          ...billingLinkData,
          frequency: 'MULTIPLE_PAYMENTS',
        }),
      });
      expect(result).toEqual({ data: 'billing-link-created' });
    });

    it('should have list method that calls request with correct parameters', async () => {
      const sdk = AbacatePay(apiKey);
      mockRequest.mockResolvedValue({ data: ['billing1', 'billing2'] });

      const result = await sdk.billing.list();

      expect(mockRequest).toHaveBeenCalledWith('/billing/list', {
        method: 'GET',
      });
      expect(result).toEqual({ data: ['billing1', 'billing2'] });
    });
  });

  describe('customer', () => {
    it('should have create method that calls request with correct parameters', async () => {
      const sdk = AbacatePay(apiKey);
      const customerData = {
        name: 'Test Customer',
        email: 'test@example.com',
        cellphone: '1234567890',
        taxId: '12345678900',
      };

      mockRequest.mockResolvedValue({ data: 'customer-created' });

      const result = await sdk.customer.create(customerData);

      expect(mockRequest).toHaveBeenCalledWith('/customer/create', {
        method: 'POST',
        body: JSON.stringify(customerData),
      });
      expect(result).toEqual({ data: 'customer-created' });
    });

    it('should have list method that calls request with correct parameters', async () => {
      const sdk = AbacatePay(apiKey);
      mockRequest.mockResolvedValue({ data: ['customer1', 'customer2'] });

      const result = await sdk.customer.list();

      expect(mockRequest).toHaveBeenCalledWith('/customer/list', {
        method: 'GET',
      });
      expect(result).toEqual({ data: ['customer1', 'customer2'] });
    });
  });

  describe('coupon', () => {
    it('should have create method that calls request with correct parameters', async () => {
      const sdk = AbacatePay(apiKey);
      const couponData = {
        code: 'TEST10',
        discountKind: 'PERCENTAGE' as const,
        discount: 10,
      };

      mockRequest.mockResolvedValue({ data: 'coupon-created' });

      const result = await sdk.coupon.create(couponData);

      expect(mockRequest).toHaveBeenCalledWith('/coupon/create', {
        method: 'POST',
        body: JSON.stringify(couponData),
      });
      expect(result).toEqual({ data: 'coupon-created' });
    });
  });

  describe('pixQrCode', () => {
    it('should have create method that calls request with correct parameters', async () => {
      const sdk = AbacatePay(apiKey);
      const pixQrCodeData = {
        amount: 1000,
        expiresIn: 3600,
        description: 'Test payment',
      };

      mockRequest.mockResolvedValue({ data: 'pix-qrcode-created' });

      const result = await sdk.pixQrCode.create(pixQrCodeData);

      expect(mockRequest).toHaveBeenCalledWith('/pixQrCode/create', {
        method: 'POST',
        body: JSON.stringify(pixQrCodeData),
      });
      expect(result).toEqual({ data: 'pix-qrcode-created' });
    });

    it('should have check method that calls request with correct parameters', async () => {
      const sdk = AbacatePay(apiKey);
      const pixQrCodeData = {
        amount: 1000,
        expiresIn: 3600,
        description: 'Test payment',
      };

      mockRequest.mockResolvedValue({ data: 'pix-qrcode-status' });

      const result = await sdk.pixQrCode.check(pixQrCodeData);

      expect(mockRequest).toHaveBeenCalledWith('/pixQrCode/check', {
        method: 'POST',
        body: JSON.stringify(pixQrCodeData),
      });
      expect(result).toEqual({ data: 'pix-qrcode-status' });
    });

    it('should have simulatePayment method that calls request with correct parameters', async () => {
      const sdk = AbacatePay(apiKey);
      const pixQrCodeData = {
        amount: 1000,
        expiresIn: 3600,
        description: 'Test payment',
      };

      mockRequest.mockResolvedValue({ data: 'pix-qrcode-payment-simulated' });

      const result = await sdk.pixQrCode.simulatePayment(pixQrCodeData);

      expect(mockRequest).toHaveBeenCalledWith('/pixQrCode/simulate-payment', {
        method: 'POST',
        body: JSON.stringify(pixQrCodeData),
      });
      expect(result).toEqual({ data: 'pix-qrcode-payment-simulated' });
    });
  });
});
