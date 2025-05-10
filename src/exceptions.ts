import { ABACATE_PAY_DOCS } from './constants';

/**
 * Default class for Abacate Pay exceptions and errors.
 *
 * It can be serialized to JSON through the `toJSON` method.
 */
export class AbacatePayError extends Error {
  constructor(message: string) {
    super(
      `Abacate Pay Error: ${message}\n\nPlease, refer to the documentation at: ${ABACATE_PAY_DOCS}`,
    );
    this.name = 'AbacatePayError';
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
    };
  }
}
