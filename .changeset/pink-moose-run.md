---
"abacatepay-nodejs-sdk": minor
---

- check now uses a GET request to /pixQrCode/check?id=... instead of a POST with a full data payload.
- simulatePayment now sends a POST to /pixQrCode/simulate-payment?id=... with a minimal body: { metadata: {} }.
- Introduced a new type PixIdParams to standardize usage when only the id is needed.
- Unit tests were updated to reflect the new method signatures and expected request formats.
- simulatePayment now accepts an optional metadata parameter, based on review feedback.
