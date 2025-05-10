// exceptions.test.ts
import { AbacatePayError } from '../src/exceptions';
import { ABACATE_PAY_DOCS } from '../src/constants';

describe('AbacatePayError', () => {
  it('should create error with correct name', () => {
    const error = new AbacatePayError('Test error');
    expect(error.name).toBe('AbacatePayError');
  });

  it('should format message with documentation link', () => {
    const errorMessage = 'Test error';
    const error = new AbacatePayError(errorMessage);
    expect(error.message).toBe(
      `Abacate Pay Error: ${errorMessage}\n\nPlease, refer to the documentation at: ${ABACATE_PAY_DOCS}`
    );
  });

  it('should be serializable to JSON', () => {
    const errorMessage = 'Test error';
    const error = new AbacatePayError(errorMessage);
    const jsonError = error.toJSON();

    expect(jsonError).toEqual({
      name: 'AbacatePayError',
      message: `Abacate Pay Error: ${errorMessage}\n\nPlease, refer to the documentation at: ${ABACATE_PAY_DOCS}`,
    });
  });
});