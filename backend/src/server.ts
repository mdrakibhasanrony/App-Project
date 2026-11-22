import { createServer } from 'http';
import { app } from './app';
import { env } from './config/env';
import { initSocket } from './realtime/socket';
import { startJobs } from './jobs/scheduler';

const server = createServer(app);

initSocket(server);
startJobs();

server.listen(env.PORT, () => {
  console.log(`MediQ backend running on http://localhost:${env.PORT}`);
});