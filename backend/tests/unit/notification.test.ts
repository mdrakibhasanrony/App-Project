import { notifyPatient } from '../../src/services/notification.service';

describe('notifyPatient', () => {
  it('push ar SMS duitai console e pathay', async () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});

    await notifyPatient({
      phone: '01712345678',
      deviceToken: 'device-1',
      title: 'Test',
      message: 'Hello',
      sendSms: true,
    });

    const output = spy.mock.calls.map((c) => c.join(' ')).join('\n');
    expect(output).toContain('[PUSH → device-1]');
    expect(output).toContain('[SMS → 01712345678] Hello');

    spy.mockRestore();
  });
});