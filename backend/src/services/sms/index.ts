import { env } from '../../config/env';

export interface SmsProvider {
  send(to: string, message: string): Promise<void>;
}

// Development: console e dekhabe
class ConsoleSms implements SmsProvider {
  async send(to: string, message: string) {
    console.log(`[SMS → ${to}] ${message}`);
  }
}

// Production: SMS_API_URL thakle oikhane pathabe
class HttpSms implements SmsProvider {
  constructor(private url: string, private apiKey: string) {}

  async send(to: string, message: string) {
    const res = await fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({ to, message }),
    });
    if (!res.ok) {
      throw new Error(`SMS failed with status ${res.status}`);
    }
  }
}

export const sms: SmsProvider =
  env.SMS_API_URL && env.SMS_API_KEY
    ? new HttpSms(env.SMS_API_URL, env.SMS_API_KEY)
    : new ConsoleSms();