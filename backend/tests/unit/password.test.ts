import { hashPassword, verifyPassword } from '../../src/utils/password';

describe('password', () => {
  it('hash kore, sothik password mile', async () => {
    const hash = await hashPassword('secret123');
    expect(hash).not.toBe('secret123');
    expect(await verifyPassword('secret123', hash)).toBe(true);
  });

  it('bhul password mile na', async () => {
    const hash = await hashPassword('secret123');
    expect(await verifyPassword('wrong-pass', hash)).toBe(false);
  });
});