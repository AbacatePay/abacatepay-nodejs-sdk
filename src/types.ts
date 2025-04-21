export type BillingStatus =
  | 'PENDING'
  | 'EXPIRED'
  | 'CANCELLED'
  | 'PAID'
  | 'REFUNDED';
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
   * Cliente associado à cobrança.
   */
  customer: ICustomer;
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

export type CreateBillingData =
  | {
      /**
       * Define o tipo de frequência da cobrança. Atualmente, somente cobranças únicas são suportadas.
       */
      frequency: BillingKind;
      /**
       * Métodos de pagamento que serão utilizados. Atualmente, apenas PIX é suportado.
       */
      methods: BillingMethods[];
      /**
       * Lista de produtos que seu cliente está pagando.
       */
      products: {
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
      }[];
      /**
       * URL para redirecionar o cliente caso o mesmo clique na opção "Voltar".
       */
      returnUrl: string;
      /**
       * URL para redirecionar o cliente quando o pagamento for concluído.
       */
      completionUrl: string;
      /**
       * O id de um cliente já cadastrado em sua loja.
       */
      customerId: string;
    }
  | {
      /**
       * Define o tipo de frequência da cobrança. Atualmente, somente cobranças únicas são suportadas.
       */
      frequency: BillingKind;
      /**
       * Métodos de pagamento que serão utilizados. Atualmente, apenas PIX é suportado.
       */
      methods: BillingMethods[];
      /**
       * Lista de produtos que seu cliente está pagando.
       */
      products: {
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
      }[];
      /**
       * URL para redirecionar o cliente caso o mesmo clique na opção "Voltar".
       */
      returnUrl: string;
      /**
       * URL para redirecionar o cliente quando o pagamento for concluído.
       */
      completionUrl: string;
      /**
       * Os dados do seu cliente para criá-lo
       */
      customer: ICustomerMetadata;
    };

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

export type PixQrCodeStatus =
  | 'PENDING'
  | 'EXPIRED'
  | 'CANCELLED'
  | 'PAID'
  | 'REFUNDED';

export type IPixQrCode = {
  /**
   * Id único da cobrança
   */
  id: string;
  /**
   * Valor da cobrança em centavos (ex: 4000 = R$ 40,00)
   */
  amount: number;
  /**
   * Status da cobrança. Pode ser `PENDING`, `EXPIRED`, `CANCELLED`, `PAID`, `REFUNDED`.
   */
  status: PixQrCodeStatus;
  /**
   * Indica se a cobrança está em ambiente de testes (`true`) ou produção (`false`).
   */
  devMode: boolean;
  /**
   * Método de pagamento.
   */
  method: 'PIX';
  /**
   * Valor da cobrança em centavos (ex: 4000 = R$ 40,00)
   */
  brCode: string;
  /**
   * Código PIX (copia-e-cola) para pagamento.
   */
  brCodeBase64: string;
  /**
   * Taxa da plataforma em centavos. Exemplo: `80` significa R$ 0,80.
   */
  platformFee: 80;
  /**
   * Descrição da cobrança.
   */
  description: string;
  /**
   * Data e hora da criação da cobrança.
   */
  createdAt: string;
  /**
   * Última atualização da cobrança.
   */
  updatedAt: string;
  /**
   * Data e hora de expiração do QRCode.
   */
  expiresAt: string;
};

export type CreatePixQrCodeData = {
  /**
   * Valor da cobrança em centavos (ex: 4000 = R$ 40,00)
   */
  amount: number;
  /**
   * Quantidade de segundos para o QrCode expirar
   */
  expiresIn: number;
  /**
   * Descrição da cobrança
   */
  description: string;
  /**
   * Dados do cliente caso deseje especificar
   */
  customer?: CreateCustomerData;
};

export type CreatePixQrCodeResponse =
  | {
      error: string;
    }
  | {
      error: null;
      data: IPixQrCode;
    };

export interface IAbacatePay {
  billing: IAbacatePayBilling;
  customer: IAbacatePayCustomerBilling;
  coupon: IAbacatePayCoupon;
  pixQrCode: IPixQrCode;
}
