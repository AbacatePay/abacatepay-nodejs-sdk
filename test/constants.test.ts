// constants.test.ts
import { BASE_URL, ABACATE_PAY_DOCS, DEFAULT_HEADERS } from '../src/constants';
import { ABACATE_PAY_VERSION } from '../src/version';

describe('Constants', () => {
  describe('BASE_URL', () => {
    it('should have correct API base URL', () => {
      expect(BASE_URL).toBe('https://api.abacatepay.com/v1');
    });
  });

  describe('ABACATE_PAY_DOCS', () => {
    it('should have correct documentation URL', () => {
      expect(ABACATE_PAY_DOCS).toBe('https://abacatepay.readme.io/reference');
    });
  });

  describe('DEFAULT_HEADERS', () => {
    it('should return headers with Authorization, Content-Type and User-Agent', () => {
      const apiKey = 'test-api-key';
      const headers = DEFAULT_HEADERS(apiKey);

      expect(headers).toEqual({
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'User-Agent': `NodeJS SDK (${ABACATE_PAY_VERSION})`,
      });
    });
  });
});