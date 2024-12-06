# abacatepay-nodejs-sdk
AbacatePay NodeJS SDK for you to start receiving payments in seconds

## Example
```js
import AbacatePay from 'abacatepay';

const abacate = AbacatePay('{{ key }}');

const billing = abacate.billing.create({
  frequency: "ONE_TIME",
  methods: ["PIX"],
  products: [
    {
      externalId: "PRO-PLAN",
      name: "Pro plan",
      quantity: 1,
      price: 1000
    }
  ],
  returnUrl: "https://yoursite.com/app",
  completionUrl: "https://yoursite.com/pagamento/sucesso",
  automaticTaxReceipt: true
});

console.log(billing)
/* Returns:
{
  _id: 'bill_12345667',
  url: 'https://abacatepay.com/pay/bill_12345667',
  amount: 1000,
  status: 'PENDING',
  devMode: true,
  methods: ['PIX'],
  frequency: 'ONE_TIME',
  nextBilling: null,
  createdAt: '2024-11-04T18:38:28.573',
  updatedAt: '2024-11-04T18:38:28.573',
}
*/
```
