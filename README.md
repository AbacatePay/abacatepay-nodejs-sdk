<p align="center">
  <img src="https://github.com/AbacatePay/abacatepay-nodejs-sdk/blob/main/assets/branco.png?raw=true#gh-light-mode-only" alt="AbacatePay SDK"  style="max-width: 100%;">
  <img src="https://github.com/AbacatePay/abacatepay-nodejs-sdk/blob/main/assets/preto.png?raw=true#gh-dark-mode-only" alt="AbacatePay SDK" style="max-width: 100%;">
</p>
&nbsp;
<p align="center" style=style="margin-top">
  <img alt="npm version" src="https://img.shields.io/npm/v/abacatepay-nodejs-sdk/1.3.1">
  <img alt="Build Status" src="https://img.shields.io/badge/build-passing-brightgreen">
  <img alt="Test Coverage" src="https://img.shields.io/badge/coverage-80%25-yellow">
</p>

# ⚠️ This SDK Has Been Deprecated

The package abacatepay-nodejs-sdk is officially deprecated and is no longer maintained.

It will not receive updates, bug fixes, security patches, or new features.

## 🚀 Use the New Official SDK

Please migrate to the actively maintained package:

```bash
npm install @abacatepay/sdk
```

The new [@abacatepay/sdk](https://github.com/AbacatePay/ecosystem/tree/main/packages/sdk) is:

- Fully supported and maintained
- TypeScript-first
- API-aligned with the latest AbacatePay platform updates
- Designed for better performance and developer experience
- Supports v1 and v2

## 🔄 Migration Recommended

We strongly recommend migrating as soon as possible to avoid future compatibility issues.

Basic example:

```ts
import { AbacatePay } from '@abacatepay/sdk';

const abacate = AbacatePay({ secret: 'YOUR_API_KEY' });
```

For full documentation and updated examples, refer to the official repository of [@abacatepay/sdk](https://github.com/AbacatePay/ecosystem/tree/main/packages/sdk).

## AbacatePay Node.js SDK

Official AbacatePay SDK - Accept payments in seconds with a simple integration.

## Installation

```bash
npm install abacatepay-nodejs-sdk
```

## Quick Usage

```js
import AbacatePay from "abacatepay-nodejs-sdk";

// Initialize the SDK with your API key
const abacate = AbacatePay("your_api_key");
```

### Creating a Payment

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
      price: 1000, // Amount in cents
    },
  ],
  returnUrl: "https://yoursite.com/app",
  completionUrl: "https://yoursite.com/payment/success",
  customer: {
    name: "Customer Name",
    email: "customer@example.com",
    cellphone: "+5511999999999",
    taxId: "09240529020",
  },
});
```

### Response

```js
{
  id: 'bill_12345667',
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

## Payment Methods

Currently supported payment methods:

- PIX (Brazilian instant payment system)

## License

This project is licensed under the terms of the MIT License.
