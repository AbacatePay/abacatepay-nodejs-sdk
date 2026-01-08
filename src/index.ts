import { Routes } from "@abacatepay/types";
import type {
	APIWithdraw,
	RESTGetCheckQRCodePixStatusData,
	RESTGetListBillingsData,
	RESTGetListCouponsData,
	RESTGetListCustomersData,
	RESTGetListWithdrawsData,
	RESTGetStoreDetailsData,
	RESTPostCreateCouponBody,
	RESTPostCreateCouponData,
	RESTPostCreateCustomerBody,
	RESTPostCreateCustomerData,
	RESTPostCreateNewChargeBody,
	RESTPostCreateNewChargeData,
	RESTPostCreateNewWithdrawBody,
	RESTPostCreateNewWithdrawData,
	RESTPostCreateQRCodePixBody,
	RESTPostCreateQRCodePixData,
	RESTPostSimulatePaymentData,
} from "@abacatepay/types/v1";
import { AbacatePayError } from "./exceptions";
import { createRequest } from "./requests";

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
			create(data: RESTPostCreateNewChargeBody) {
				return request<RESTPostCreateNewChargeData>(Routes.billing.create, {
					method: "POST",
					body: JSON.stringify(data),
				});
			},

			/**
			 * Permite que você crie um link de cobrança sem precisar de um cliente (o cliente informa os dados dele na hora de pagar).
			 *
			 * @param data Dados da cobrança
			 * @returns Dados da cobrança criada ou erro
			 */
			createLink(
				data: Pick<
					RESTPostCreateNewChargeBody,
					| "customer"
					| "customerId"
					| "methods"
					| "products"
					| "completionUrl"
					| "returnUrl"
				>,
			) {
				return request<RESTPostCreateNewChargeData>(Routes.billing.create, {
					method: "POST",
					body: JSON.stringify({
						...data,
						frequency: "MULTIPLE_PAYMENTS",
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
			list() {
				return request<RESTGetListBillingsData>(Routes.billing.list, {
					method: "GET",
				});
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
			create(data: RESTPostCreateCustomerBody) {
				return request<RESTPostCreateCustomerData>(Routes.customer.create, {
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
			list() {
				return request<RESTGetListCustomersData>(Routes.customer.list, {
					method: "GET",
				});
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
			 * @see https://docs.abacatepay.com/pages/cupom/create
			 * @example
			 * ```ts
			 * const couponData = {
			 *   code: 'DESCONTO10',
			 *   discountKind: 'PERCENTAGE',
			 *   discount: 10,
			 *   maxRedeems: 100,
			 *   notes: 'Desconto de 10% para novos clientes'
			 * };
			 *
			 * const abacatePay = Abacate('apiKey');
			 *
			 * const response = await abacatePay.coupon.create(couponData);
			 * /* ... * /
			 * ```
			 */
			create(data: RESTPostCreateCouponBody) {
				return request<RESTPostCreateCouponData>(Routes.coupon.create, {
					method: "POST",
					body: JSON.stringify(data),
				});
			},
			/**
			 * Permite que você recupere uma lista de todos os cupons criados.
			 *
			 * @returns Lista de cupons criados ou erro
			 * @see https://docs.abacatepay.com/pages/cupom/list
			 * @example
			 * ```ts
			 * const abacatePay = Abacate('apiKey');
			 *
			 * const response = await abacatePay.coupon.list();
			 * /* ... * /
			 * ```
			 */
			list() {
				return request<RESTGetListCouponsData>(Routes.coupon.list, {
					method: "GET",
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
			create(data: RESTPostCreateQRCodePixBody) {
				return request<RESTPostCreateQRCodePixData>(Routes.pix.createQRCode, {
					method: "POST",
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
			check(id: string) {
				return request<RESTGetCheckQRCodePixStatusData>(
					Routes.pix.checkStatus({ id }),
					{
						method: "GET",
					},
				);
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
			simulatePayment(id: string, metadata: Record<string, unknown> = {}) {
				return request<RESTPostSimulatePaymentData>(
					Routes.pix.simulatePayment({ id }),
					{
						method: "POST",
						body: JSON.stringify({ metadata }),
					},
				);
			},
		},
		/**
		 * Gerencie seus saques.
		 */
		withdrawal: {
			/**
			 * Permite que você crie um novo saque.
			 *
			 * @param data Dados do saque
			 * @returns Dados do saque criado ou erro
			 * @see https://docs.abacatepay.com/pages/saque/create
			 * @example
			 * ```ts
			 * const withdrawalData = {
			 *   amount: 10000, // R$ 100,00 em centavos
			 *   bankAccount: {
			 *     bankCode: '001',
			 *     agency: '1234',
			 *     account: '12345678',
			 *     accountType: 'CHECKING',
			 *     holderName: 'João da Silva',
			 *     holderDocument: '12345678900'
			 *   }
			 * };
			 *
			 * const abacatePay = Abacate('apiKey');
			 *
			 * const response = await abacatePay.withdrawal.create(withdrawalData);
			 * /* ... * /
			 * ```
			 */
			create(data: RESTPostCreateNewWithdrawBody) {
				return request<RESTPostCreateNewWithdrawData>(Routes.withdraw.create, {
					method: "POST",
					body: JSON.stringify(data),
				});
			},
			/**
			 * Permite que você busque um saque específico pelo ID.
			 *
			 * @param id ID do saque
			 * @returns Dados do saque ou erro
			 * @see https://docs.abacatepay.com/pages/saque/get
			 * @example
			 * ```ts
			 * const abacatePay = Abacate('apiKey');
			 *
			 * const response = await abacatePay.withdrawal.get('withdrawal_123456');
			 * /* ... * /
			 * ```
			 */
			get(externalId: string) {
				return request<APIWithdraw>(Routes.withdraw.get({ externalId }), {
					method: "GET",
				});
			},
			/**
			 * Permite que você recupere uma lista de todos os saques criados.
			 *
			 * @returns Lista de saques criados ou erro
			 * @see https://docs.abacatepay.com/pages/saque/list
			 * @example
			 * ```ts
			 * const abacatePay = Abacate('apiKey');
			 *
			 * const response = await abacatePay.withdrawal.list();
			 * /* ... * /
			 * ```
			 */
			list() {
				return request<RESTGetListWithdrawsData>(Routes.withdraw.list, {
					method: "GET",
				});
			},
		},
		/**
		 * Gerencie informações da sua loja.
		 */
		store: {
			/**
			 * Permite que você obtenha os detalhes da sua loja.
			 *
			 * @returns Dados da loja ou erro
			 * @see https://docs.abacatepay.com/pages/loja/get
			 * @example
			 * ```ts
			 * const abacatePay = Abacate('apiKey');
			 *
			 * const response = await abacatePay.store.get();
			 * /* ... * /
			 * ```
			 */
			get() {
				return request<RESTGetStoreDetailsData>(Routes.store.get, {
					method: "GET",
				});
			},
		},
	};
}

export { AbacatePayError };
