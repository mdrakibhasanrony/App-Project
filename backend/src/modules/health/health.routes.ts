import { Router } from 'express';
import { prisma } from '../../config/prisma';
import { asyncHandler } from '../../utils/asyncHandler';

export const healthRouter = Router();

healthRouter.get('/health', (_req, res) => {
  res.json({ data: { status: 'ok', time: new Date().toISOString() } });
});

healthRouter.get(
  '/health/db',
  asyncHandler(async (_req, res) => {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ data: { database: 'connected' } });
  })
);