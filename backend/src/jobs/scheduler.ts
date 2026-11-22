import cron from 'node-cron';
import { env } from '../config/env';
import { stubLog } from '../utils/stub';

export function startJobs() {
  if (env.ENABLE_JOBS !== 'true') {
    console.log('[JOBS] disabled (ENABLE_JOBS=false)');
    return;
  }

  // Prottek 5 minute e: no-show chinhito korar kaaj
  cron.schedule('*/5 * * * *', () => stubLog('markNoShows'));

  // Prottek minute e: queue e kachakachi patient der alert
  cron.schedule('* * * * *', () => stubLog('sendApproachingAlerts'));

  // Roj sokal 8 tay (Dhaka time): appointment reminder
  cron.schedule('0 8 * * *', () => stubLog('sendReminders'), {
    timezone: 'Asia/Dhaka',
  });

  console.log('[JOBS] scheduled');
}