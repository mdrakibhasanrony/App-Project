import { getIO } from './instance';

export const Events = {
  queueMe(userId: string, payload: unknown) {
    getIO().to(`user:${userId}`).emit('queue:me', payload);
  },
  queueUpdated(doctorId: string, payload: unknown) {
    getIO().to(`doctor:${doctorId}`).emit('queue:updated', payload);
  },
  doctorStatus(doctorId: string, payload: unknown) {
    getIO().to(`doctor:${doctorId}`).emit('doctor:status', payload);
  },
  approaching(userId: string, payload: unknown) {
    getIO().to(`user:${userId}`).emit('queue:approaching', payload);
  },
};