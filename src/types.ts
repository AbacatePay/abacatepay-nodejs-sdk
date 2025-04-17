export type BillingStatus =
  | 'PENDING'
  | 'EXPIRED'
  | 'CANCELLED'
  | 'PAID'
  | 'REFUNDED'
  | 'ACTIVE';
export type BillingMethods = 'PIX';
export type BillingKind = 'ONE_TIME' | 'MULTIPLE_PAYMENTS';

export type IBilling = {
  /**
   * Identificador único da cobrança.
   */
  id: string;
  /**
   * URL onde o usuário pode concluir o pagamento.
   */
  url: string;
  /**
   * Valor total a ser pago em centavos.
   */
  amount: number;
  /**
   * Status atual da cobrança.
   *
   * - `PENDING`: A cobrança foi criada, mas ainda não foi paga.
   * - `EXPIRED`: A cobrança expirou e não pode mais ser paga.
   * - `CANCELLED`: A cobrança foi cancelada.
   * - `PAID`: A cobrança foi paga.
   * - `REFUNDED`: A cobrança foi paga e o valor foi devolvido ao cliente.
   * - `ACTIVE`: A cobrança está ativa (aplicável para MULTIPLE_PAYMENTS).
   */
  status: BillingStatus;
  /**
   * Indica se a cobrança foi criada em ambiente de testes.
   */
  devMode: boolean;
  /**
   * Métodos de pagamento suportados para esta cobrança.
   */
  methods: BillingMethods[];
  /**
   * Lista de produtos na cobrança.
   */
  products: { id: string; externalId: string; quantity: number }[];
  /**
   * Frequência da cobrança.
   */
  frequency: BillingKind;
  /**
   * Data e hora da próxima cobrança, ou null para cobranças únicas.
   */
  nextBilling: string | null;
  /**
   * Cliente associado à cobrança. Pode ser um objeto vazio para MULTIPLE_PAYMENTS.
   */
  customer: ICustomer | Record<string, never>;
  /**
   * Metadados da cobrança.
   */
  metadata: IBillingMetadata;
  /**
   * Data e hora de criação da cobrança.
   */
  createdAt: string;
  /**
   * Data e hora da última atualização da cobrança.
   */
  updatedAt: string;
  /**
   * Indica se cupons são permitidos para esta cobrança.
   */
  allowCoupons?: boolean;
  /**
   * Lista de cupons disponíveis para esta cobrança.
   */
  coupons?: any[];
  /**
   * Lista de cupons utilizados nesta cobrança.
   */
  couponsUsed?: any[];
};

export type IBillingMetadata = {
  /**
   * Taxa de serviço cobrada pela AbacatePay em centavos.
   */
  fee: number;
  /**
   * URL para redirecionar o cliente caso o mesmo clique na opção "Voltar".
   */
  returnUrl: string;
  /**
   * URL para redirecionar o cliente quando o pagamento for concluído.
   */
  completionUrl: string;
};

/**
 * Tipo de produto para criação de cobrança
 */
export type BillingProduct = {
  /**
   * O id do produto em seu sistema. Utilizamos esse id para criar seu produto na AbacatePay de forma automática, então certifique-se de que seu id é único.
   */
  externalId: string;
  /**
   * Nome do produto.
   */
  name: string;
  /**
   * Quantidade do produto sendo adquirida.
   */
  quantity: number;
  /**
   * Preço por unidade do produto em centavos. O mínimo é 100 (1 BRL).
   */
  price: number;
  /**
   * Descrição detalhada do produto. Opcional.
   */
  description?: string;
};

/**
 * Campos básicos comuns a todos os tipos de cobrança
 */
export type BaseBillingData = {
  /**
   * Métodos de pagamento que serão utilizados. Atualmente, apenas PIX é suportado.
   */
  methods: BillingMethods[];
  /**
   * Lista de produtos que seu cliente está pagando.
   */
  products: BillingProduct[];
  /**
   * URL para redirecionar o cliente caso o mesmo clique na opção "Voltar".
   */
  returnUrl: string;
  /**
   * URL para redirecionar o cliente quando o pagamento for concluído.
   */
  completionUrl: string;
};

/**
 * Cobrança única com customerId
 */
export type OneTimeWithCustomerId = BaseBillingData & {
  /**
   * Define o tipo de frequência da cobrança como pagamento único.
   */
  frequency: 'ONE_TIME';
  /**
   * O id de um cliente já cadastrado em sua loja.
   */
  customerId: string;
};

/**
 * Cobrança única com dados do cliente
 */
export type OneTimeWithCustomer = BaseBillingData & {
  /**
   * Define o tipo de frequência da cobrança como pagamento único.
   */
  frequency: 'ONE_TIME';
  /**
   * Os dados do seu cliente para criá-lo
   */
  customer: ICustomerMetadata;
};

/**
 * Cobrança com múltiplos pagamentos, onde o cliente é opcional
 */
export type MultiplePayments = BaseBillingData & {
  /**
   * Define o tipo de frequência da cobrança como múltiplos pagamentos.
   * Para este tipo de cobrança, as informações do cliente são opcionais.
   */
  frequency: 'MULTIPLE_PAYMENTS';
  /**
   * O id de um cliente já cadastrado em sua loja. Opcional para MULTIPLE_PAYMENTS.
   */
  customerId?: string;
  /**
   * Os dados do seu cliente para criá-lo. Opcional para MULTIPLE_PAYMENTS.
   */
  customer?: ICustomerMetadata;
};

/**
 * Tipo unificado para criação de cobrança
 */
export type CreateBillingData = OneTimeWithCustomerId | OneTimeWithCustomer | MultiplePayments;

export type CreateBillingLinkData = Pick<
  CreateBillingData,
  'completionUrl' | 'methods' | 'products' | 'returnUrl'
> & {
  customer?: ICustomerMetadata;
  cutomerId?: string;
};

export type CreateBillingResponse =
  | {
      error: string;
      data: null;
    }
  | {
      error: null;
      data: IBilling;
    };
export type ListBillingResponse =
  | {
      error: string;
      data: null;
    }
  | {
      error: null;
      data: IBilling[];
    };

export type ICustomerMetadata = {
  /**
   * Nome completo do seu cliente
   */
  name?: string;
  /**
   * Celular do cliente
   */
  cellphone?: string;
  /**
   * E-mail do cliente
   */
  email: string;
  /**
   * CPF ou CNPJ do cliente.
   */
  taxId?: string;
};

export type ICustomer = {
  /**
   * Identificador único do cliente
   */
  id: string;
  /**
   * Dados do cliente
   */
  metadata: ICustomerMetadata;
};

export type CreateCustomerData = ICustomerMetadata;

export type CreateCustomerResponse =
  | {
      error: string;
      data: null;
    }
  | {
      error: null;
      data: ICustomer;
    };
export type ListCustomerResponse =
  | {
      error: string;
      data: null;
    }
  | {
      error: null;
      data: ICustomer[];
    };

export interface IAbacatePayBilling {
  create(data: CreateBillingData): Promise<CreateBillingResponse>;
  list(): Promise<ListBillingResponse>;
}

export interface IAbacatePayCustomerBilling {
  create(data: CreateCustomerData): Promise<CreateCustomerResponse>;
  list(): Promise<ListCustomerResponse>;
}

export interface IAbacatePay {
  billing: IAbacatePayBilling;
  customer: IAbacatePayCustomerBilling;
}

export type CouponStatus = 'ACTIVE' | 'DELETED' | 'DISABLED';
export type DiscountKind = 'PERCENTAGE' | 'FIXED';

export type ICoupon = {
  /**
   * Identificador único do cupom.
   */
  id: string;
  /**
   * Tipo de desconto aplicado, porcentagem ou fixo.
   */
  discountKind: DiscountKind;
  /**
   * Quantidade de desconto a ser aplicado.
   */
  discount: number;
  /**
   * Quantidade de vezes em que o cupom pode ser resgatado. -1 significa ilimitado.
   */
  maxRedeems: number;
  /**
   * Quantidade de vezes que o cupom já foi resgatado.
   */
  redeemsCount: number;
  /**
   * Status do cupom.
   */
  status: CouponStatus;
  /**
   * Indica se o cupom foi criado em ambiente de testes.
   */
  devMode: boolean;
  /**
   * Descrição do cupom.
   */
  notes?: string;
  /**
   * Metadados do cupom.
   */
  metadata: Record<string, unknown>;
  /**
   * Data e hora de criação do cupom.
   */
  createdAt: string;
  /**
   * Data e hora da última atualização do cupom.
   */
  updatedAt: string;
};

export type CreateCouponData = {
  /**
   * Identificador único do cupom.
   */
  code: string;
  /**
   * Tipo de desconto aplicado.
   */
  discountKind: DiscountKind;
  /**
   * Quantidade de desconto a ser aplicado.
   */
  discount: number;
  /**
   * Quantidade máxima de resgates do cupom. -1 significa ilimitado.
   */
  maxRedeems?: number;
  /**
   * Descrição do cupom.
   */
  notes?: string;
  /**
   * Metadados opcionais do cupom.
   */
  metadata?: Record<string, unknown>;
};

export type CreateCouponResponse =
  | {
      error: string;
    }
  | {
      error: null;
      data: ICoupon;
    };

export type ListCouponResponse =
  | {
      error: string;
    }
  | {
      error: null;
      data: ICoupon[];
    };

export interface IAbacatePayCoupon {
  create(data: CreateCouponData): Promise<CreateCouponResponse>;
  list(): Promise<ListCouponResponse>;
}

export interface IAbacatePay {
  billing: IAbacatePayBilling;
  customer: IAbacatePayCustomerBilling;
  coupon: IAbacatePayCoupon;
}
