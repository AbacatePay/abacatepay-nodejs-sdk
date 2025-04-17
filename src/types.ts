export type BillingStatus =
  | 'PENDING'
  | 'EXPIRED'
  | 'CANCELLED'
  | 'PAID'
  | 'REFUNDED';
export type BillingMethods = 'PIX';
export type BillingKind = 'ONE_TIME';

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
