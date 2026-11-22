import { Server } from 'socket.io';
import type { Server as HttpServer } from 'http';
import { env } from '../config/env';
import { verifyAccessToken } from '../utils/jwt';
import { AuthUser } from '../types/auth';
import { setIO } from './instance';

export function initSocket(httpServer: HttpServer) {
  const io = new Server(httpServer, {
    cors: { origin: env.CORS_ORIGIN },
  });

  // Connect korar agey token check
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token as string | undefined;
    if (!token) {
      return next(new Error('UNAUTHORIZED'));
    }
    try {
      socket.data.user = verifyAccessToken(token);
      next();
    } catch {
      next(new Error('TOKEN_INVALID'));
    }
  });

  io.on('connection', (socket) => {
    const user = socket.data.user as AuthUser;

    // Prottek user nijer private room e thakbe
    socket.join(`user:${user.sub}`);
    socket.emit('connected', { userId: user.sub, role: user.role });

    // Staff kono doctor er live queue dekhte chaile
    socket.on('doctor:subscribe', (doctorId: string) => {
      if (user.role === 'PATIENT') return;
      // TODO: Azmir er Doctor table ashle facility check korbo
      socket.join(`doctor:${doctorId}`);
    });
  });

  setIO(io);
  return io;
}