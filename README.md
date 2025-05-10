<p align="center">
  <img src="https://github.com/AbacatePay/abacatepay-nodejs-sdk/blob/temp/assets/branco.png?raw=true#gh-light-mode-only" alt="AbacatePay SDK">
  <img src="https://github.com/AbacatePay/abacatepay-nodejs-sdk/blob/temp/assets/preto.png?raw=true#gh-dark-mode-only" alt="AbacatePay SDK">
</p>
<p align="center">
  <a href="https://www.npmjs.com/package/abacatepay-nodejs-sdk">
    <img alt="npm version" src="https://img.shields.io/npm/v/abacatepay-nodejs-sdk/1.3.1">
  </a>
  <a href="https://github.com/AbacatePay/abacatepay-nodejs-sdk/actions">
    <img alt="Build Status" src="https://img.shields.io/badge/build-passing-brightgreen">
  </a>
  <a href="https://codecov.io/gh/AbacatePay/abacatepay-nodejs-sdk">
    <img alt="Test Coverage" src="https://img.shields.io/badge/coverage-80%25-yellow">
  </a>
</p>

&nbsp;

## AbacatePay Nodejs SDK

SDK oficial da AbacatePay - Aceite pagamentos em segundos com uma integração simples.

## Instalação

```bash
npm install abacatepay-nodejs-sdk
```

## Uso Rápido

```js
import AbacatePay from 'abacatepay-nodejs-sdk';

// Initialize the SDK with your API key
const abacate = AbacatePay('your_api_key');
```

### Criando um Pagamento

```js
// Create a one-time payment
const billing = await abacate.billing.create({
  frequency: "ONE_TIME",
  methods: ["PIX"],
  products: [
    {
      externalId: "PRO-PLAN",
      name: "Pro plan",
      quantity: 1,
      price: 1000 // Amount in cents
    }
  ],
  returnUrl: "https://yoursite.com/app",
  completionUrl: "https://yoursite.com/pagamento/sucesso",
  customer: {
    email: 'customer@example.com'
  }
});
```

### Resposta

```js
{
  _id: 'bill_12345667',
  url: 'https://abacatepay.com/pay/bill_12345667', // Payment URL for your customer
  amount: 1000,
  status: 'PENDING',
  devMode: true,
  methods: ['PIX'],
  frequency: 'ONE_TIME',
  nextBilling: null,
  customer: {
    id: 'cust_12345',
    metadata: {
      email: 'customer@example.com'
    }
  },
  createdAt: '2024-11-04T18:38:28.573',
  updatedAt: '2024-11-04T18:38:28.573',
}
```

## Métodos de Pagamento

Métodos de pagamento atualmente suportados:
- PIX (Sistema de pagamento instantâneo brasileiro)

## Contribuindo

Este é um projeto open source. Antes de contribuir, por favor leia o nosso [Guia de Contribuição](https://rafaelcostappz.github.io/abct/#/languages/nodejs/CONTRIBUTING).

## Segurança

Caso identifique alguma vulnerabilidade, consulte a nossa [Política de Segurança](https://rafaelcostappz.github.io/abct/#/policies/SECURITY_POLICY) para saber como reportar de forma responsável.

## Licença

Este projeto é licenciado sob os termos da [Licença MIT](LICENSE).
