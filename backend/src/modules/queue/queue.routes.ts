import { Router } from 'express';
import { requireAuth, requireRole } from '../../middleware/auth';
import { validateBody } from '../../middleware/validate';
import { asyncHandler } from '../../utils/asyncHandler';
import { walkInSchema } from './queue.schema';
import {
  getMyQueue,
  createWalkIn,
  skipToken,
  recallToken,
  restoreToken,
  markEmergency,
} from '../../services/queue.service';

export const queueRouter = Router();

// Patient nijer queue status dekhbe
queueRouter.get(
  '/queue/me',
  requireAuth,
  requireRole('PATIENT'),
  asyncHandler(async (req, res) => {
    const data = await getMyQueue(req.user!.sub);
    res.json({ data });
  })
);

// Receptionist walk-in patient add korbe
queueRouter.post(
  '/walk-ins',
  requireAuth,
  requireRole('RECEPTIONIST'),
  validateBody(walkInSchema),
  asyncHandler(async (req, res) => {
    const data = await createWalkIn(req.user!.sub, req.body);
    res.status(201).json({ data });
  })
);

// Token action: skip, recall, restore, emergency
queueRouter.post(
  '/queue/:tokenId/skip',
  requireAuth,
  requireRole('RECEPTIONIST', 'DOCTOR'),
  asyncHandler(async (req, res) => {
    const data = await skipToken(String(req.params.tokenId));
    res.json({ data });
  })
);

queueRouter.post(
  '/queue/:tokenId/recall',
  requireAuth,
  requireRole('RECEPTIONIST', 'DOCTOR'),
  asyncHandler(async (req, res) => {
    const data = await recallToken(String(req.params.tokenId));
    res.json({ data });
  })
);

queueRouter.post(
  '/queue/:tokenId/restore',
  requireAuth,
  requireRole('RECEPTIONIST', 'DOCTOR'),
  asyncHandler(async (req, res) => {
    const data = await restoreToken(String(req.params.tokenId));
    res.json({ data });
  })
);

queueRouter.post(
  '/queue/:tokenId/emergency',
  requireAuth,
  requireRole('RECEPTIONIST', 'DOCTOR'),
  asyncHandler(async (req, res) => {
    const data = await markEmergency(String(req.params.tokenId));
    res.json({ data });
  })
);