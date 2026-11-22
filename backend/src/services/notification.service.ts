import { sms } from './sms';
import { sendPush } from './push.service';

interface NotifyInput {
  phone: string;
  deviceToken?: string;
  title: string;
  message: string;
  sendSms?: boolean;
}

export async function notifyPatient(input: NotifyInput) {
  const tasks: Promise<void>[] = [];

  if (input.deviceToken) {
    tasks.push(sendPush(input.deviceToken, input.title, input.message));
  }
  if (input.sendSms) {
    tasks.push(sms.send(input.phone, input.message));
  }

  // Ek ta fail korleo baki ta chalbe
  const results = await Promise.allSettled(tasks);
  for (const r of results) {
    if (r.status === 'rejected') {
      console.error('[NOTIFY] failed:', r.reason);
    }
  }

  // TODO: Azmir er Notification table ashle ekhane log save korbo
}