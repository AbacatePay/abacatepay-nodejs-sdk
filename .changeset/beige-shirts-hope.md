---
"abacatepay-nodejs-sdk": minor
---

Enhanced billing functionality with the following changes:

- Added `MULTIPLE_PAYMENTS` option to `BillingKind` type
- Made customer information optional when `frequency` is `MULTIPLE_PAYMENTS`
- Added `ACTIVE` status to `BillingStatus` type
- Updated `IBilling` type to include additional fields: `allowCoupons`, `coupons`, and `couponsUsed`
- Modified `customer` field in `IBilling` to support empty objects for `MULTIPLE_PAYMENTS`
