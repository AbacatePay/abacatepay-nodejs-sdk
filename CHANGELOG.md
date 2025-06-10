# abacatepay-nodejs-sdk

## 1.5.0

### Minor Changes

- 6b7b771: - check now uses a GET request to /pixQrCode/check?id=... instead of a POST with a full data payload.
  - simulatePayment now sends a POST to /pixQrCode/simulate-payment?id=... with a minimal body: { metadata: {} }.
  - Introduced a new type PixIdParams to standardize usage when only the id is needed.
  - Unit tests were updated to reflect the new method signatures and expected request formats.
  - simulatePayment now accepts an optional metadata parameter, based on review feedback.

### Patch Changes

- 6b7b771: URL repository on NPM

## 1.4.0

### Minor Changes

- Fix pixQrCode API integration
  -check now uses a GET request to /pixQrCode/check?id=... instead of a POST with a full data payload.
  -simulatePayment now sends a POST to /pixQrCode/simulate-payment?id=... with a minimal body: { metadata: {} }.
  -Introduced a new type PixIdParams to standardize usage when only the id is needed.
  -Unit tests were updated to reflect the new method signatures and expected request formats.
  -simulatePayment now accepts an optional metadata parameter, based on review feedback.

## 1.3.1

### Patch Changes

- Fix pixQrcode types

## 1.3.0

### Minor Changes

- Add Pix QRCode

## 1.2.1

### Patch Changes

- Sync NPM version with git tags

## 1.2.0

### Minor Changes

- 8afe53c: Add functionality to create discount coupons.

### Patch Changes

- - Update API contracts
  - Add Coupon module
  - Add Billing creation in `MULTIPLE_PAYMENTS` mode

## 1.1.1

### Patch Changes

- c0b777f: Add JSDoc comments for improved documentation

## 1.1.0

### Minor Changes

- Fix API contracts
- List and create customers

## 1.0.1

### Patch Changes

- This adds better typescript support, prevents of importing package.json and better build pipeline overall
