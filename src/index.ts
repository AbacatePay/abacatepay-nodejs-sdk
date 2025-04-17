import { AbacatePayError } from "./exceptions";
import { createRequest } from "./requests";
import type {
  CreateBillingData,
  CreateBillingResponse,
  CreateCustomerData,
  CreateCustomerResponse,
  ListBillingResponse,
  ListCustomerResponse,
} from "./types";

export default function AbacatePay(apiKey: string) {
  if (!apiKey) throw new AbacatePayError("API key is required!");
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
        return request("/billing/create", {
          method: "POST",
          body: JSON.stringify(data),
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
        return request("/billing/list", { method: "GET" });
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
        return request("/customer/create", {
          method: "POST",
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
        return request("/customer/list", { method: "GET" });
      },
    },
  };
}

export { AbacatePayError };
