import { AbacatePayError } from './exceptions';
import { createRequest } from './requests';
import type {
  CreateBillingData,
  CreateBillingLinkData,
  CreateBillingResponse,
  CreateCouponData,
  CreateCouponResponse,
  CreateCustomerData,
  CreateCustomerResponse,
  CreatePixQrCodeData,
  CreatePixQrCodeResponse,
  ListBillingResponse,
  ListCustomerResponse,
} from './types';

export default function AbacatePay(apiKey: string) {
  if (!apiKey) throw new AbacatePayError('API key is required!');
  const request = createRequest(apiKey);

  return {
    /**
     * Gerencie suas cobranças.
     */
    billing: {
      /**
       * Permite que você crie um link de cobrança pro seu cliente pagar você.
       *
       * @param data Dados da cobrança
       * @returns Dados da cobrança criada ou erro
       * @see https://docs.abacatepay.com/pages/payment/create
       * @example
       * ```ts
       * const billingData = {
       *   completionUrl: "https://example.com/completion",
       *   returnUrl: "https://example.com/return",
       *   frequency: "ONE_TIME",
       *   methods: ["PIX"],
       *   products: [
       *     {
       *       name: "Product Name",
       *       price: 1000,
       *       quantity: 1,
       *       externalId: "product-id",
       *       description: "Product Description",
       *     },
       *   ],
       *   customer: {
       *     name: "João da Silva",
       *     cellphone: "11999999999",
       *     email: "joaodasilva@email.com",
       *     taxId: "12345678900",
       *   },
       * };
       *
       * const abacatePay = Abacate("apiKey");
       *
       * const response = await abacatePay.billing.create(billingData);
       * /* ... * /
       */
      create(data: CreateBillingData): Promise<CreateBillingResponse> {
        return request('/billing/create', {
          method: 'POST',
          body: JSON.stringify(data),
        });
      },

      /**
       * Permite que você crie um link de cobrança sem precisar de um cliente (o cliente informa os dados dele na hora de pagar).
       *
       * @param data Dados da cobrança
       * @returns Dados da cobrança criada ou erro
       */
      createLink(data: CreateBillingLinkData): Promise<CreateBillingResponse> {
        return request('/billing/create', {
          method: 'POST',
          body: JSON.stringify({
            ...data,
            frequency: 'MULTIPLE_PAYMENTS',
          }),
        });
      },

      /**
       * Permite que você recupere uma lista de todas as cobranças criadas.
       *
       * @returns Lista de cobranças criadas ou erro
       * @see https://docs.abacatepay.com/pages/payment/list
       * @example
       * ```ts
       * const abacatePay = Abacate('apiKey');
       *
       * const response = await abacatePay.billing.list();
       * /* ... * /
       */
      list(): Promise<ListBillingResponse> {
        return request('/billing/list', { method: 'GET' });
      },
    },
    /**
     * Gerencie seus clientes, aqueles que pagam você.
     */
    customer: {
      /**
       * Permite que você crie um novo cliente para a sua loja.
       *
       * @param data Dados do cliente
       * @returns Dados do cliente criado ou erro
       * @see https://docs.abacatepay.com/pages/client/create
       * @example
       * ```ts
       * const customerData = {
       *  name: 'João da Silva',
       *  cellphone: '11999999999',
       *  email: 'joaodasilva@email.com',
       *  taxId: '12345678900',
       * };
       *
       * const abacatePay = Abacate('apiKey');
       *
       * const response = await abacatePay.customer.create(customerData);
       * /* ... * /
       * ```
       */
      create(data: CreateCustomerData): Promise<CreateCustomerResponse> {
        return request('/customer/create', {
          method: 'POST',
          body: JSON.stringify(data),
        });
      },
      /**
       * Permite que você recupere uma lista de todos os seus clientes.
       *
       * @returns Lista de clientes ou erro
       * @see https://docs.abacatepay.com/pages/client/list
       * @example
       * ```ts
       * const abacatePay = Abacate('apiKey');
       *
       * const response = await abacatePay.customer.list();
       * /* ... * /
       */
      list(): Promise<ListCustomerResponse> {
        return request('/customer/list', { method: 'GET' });
      },
    },
    /**
     * Gerencie seus cupons de desconto.
     */
    coupon: {
      /**
       * Permite que você crie um novo cupom de desconto.
       *
       * @param data Dados do cupom
       * @returns Dados do cupom criado ou erro
       */
      create(data: CreateCouponData): Promise<CreateCouponResponse> {
        return request('/coupon/create', {
          method: 'POST',
          body: JSON.stringify(data),
        });
      },
    },
    pixQrCode: {
      /**
       * Permite que você crie um código copia-e-cola e um QRCode Pix para seu cliente fazer o pagamento.
       *
       * @param data Dados do QRCode Pix
       * @returns Dados do QRCode Pix criado ou erro
       * @see https://docs.abacatepay.com/pages/pix-qrcode/create
       * @example
       * ```ts
       * const pixQrCodeData = {
       *  amount: 1000,
       *  description: 'pagamento via AbacatePay',
       *  expiresIn: 3600,
       * };
       *
       * const abacatePay = Abacate('apiKey');
       *
       * const response = await abacatePay.pixQrCode.create(pixQrCodeData);
       * /* ... * /
       * ```
       */
      create(data: CreatePixQrCodeData): Promise<CreatePixQrCodeResponse> {
        return request('/pixQrCode/create', {
          method: 'POST',
          body: JSON.stringify(data),
        });
      },
      /**
       * Checar status do pagamento do QRCode Pix.
       *
       * @param data Dados do QRCode Pix
       * @returns Dados do QRCode Pix ou erro
       * @see https://docs.abacatepay.com/pages/pix-qrcode/check
       * @example
       * ```ts
       * const abacatePay = Abacate('apiKey');
       *
       * const response = await abacatePay.pixQrCode.check('pix_charabc123456789');
       * /* ... * /
       * ```
       */
      check(data: CreatePixQrCodeData): Promise<CreatePixQrCodeResponse> {
        return request('/pixQrCode/check', {
          method: 'POST',
          body: JSON.stringify(data),
        });
      },
      /**
       * Checar status do pagamento do QRCode Pix.
       *
       * @param data Simula o pagamento de um QRCode Pix criado no modo de desenvolvimento.
       * @returns Dados do QRCode Pix ou erro
       * @see https://docs.abacatepay.com/pages/pix-qrcode/simulate-payment
       * @example
       * ```ts
       * const abacatePay = Abacate('apiKey');
       *
       * const response = await abacatePay.pixQrCode.simulatePayment('pix_char_abc123456789');
       * /* ... * /
       * ```
       */
      simulatePayment(
        data: CreatePixQrCodeData,
      ): Promise<CreatePixQrCodeResponse> {
        return request('/pixQrCode/simulate-payment', {
          method: 'POST',
          body: JSON.stringify(data),
        });
      },
    },
  };
}

export { AbacatePayError };
