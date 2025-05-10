// version.test.ts
import { ABACATE_PAY_VERSION } from '../src/version';

describe('Version', () => {
  it('should export a valid version string', () => {
    expect(ABACATE_PAY_VERSION).toBeDefined();
    expect(typeof ABACATE_PAY_VERSION).toBe('string');
    // Verifica se a versão segue o formato de versionamento semântico (x.y.z)
    expect(ABACATE_PAY_VERSION).toMatch(/^\d+\.\d+\.\d+$/);
  });
});