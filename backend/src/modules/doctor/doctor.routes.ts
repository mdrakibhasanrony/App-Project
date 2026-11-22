import { Router } from 'express';
import { z } from 'zod';
import { requireAuth, requireRole } from '../../middleware/auth';
import { validateBody } from '../../middleware/validate';
import { asyncHandler } from '../../utils/asyncHandler';
import {
  getDoctorQueue,
  callNextPatient,
  startConsultation,
  endConsultation,
  setDoctorStatus,
  addDelay,
} from '../../services/doctor.service';

export const doctorRouter = Router();

// TODO(Azmir): status value gulo final kora hobe
const statusSchema = z.object({
  status: z.enum(['AVAILABLE', 'BREAK', 'OFFLINE']),
});

const delaySchema = z.object({
  minutes: z.number().int().min(1).max(120),
});

// Doctor nijer queue dekhbe
doctorRouter.get(
  '/doctors/me/queue',
  requireAuth,
  requireRole('DOCTOR'),
  asyncHandler(async (req, res) => {
    const data = await getDoctorQueue(req.user!.sub);
    res.json({ data });
  })
);

// Doctor porer patient ke call korbe
doctorRouter.post(
  '/doctors/me/next',
  requireAuth,
  requireRole('DOCTOR'),
  asyncHandler(async (req, res) => {
    const data = await callNextPatient(req.user!.sub);
    res.json({ data });
  })
);

// Consultation shuru
doctorRouter.post(
  '/consultations/:tokenId/start',
  requireAuth,
  requireRole('DOCTOR'),
  asyncHandler(async (req, res) => {
    const data = await startConsultation(String(req.params.tokenId));
    res.json({ data });
  })
);

// Consultation shesh
doctorRouter.post(
  '/consultations/:tokenId/end',
  requireAuth,
  requireRole('DOCTOR'),
  asyncHandler(async (req, res) => {
    const data = await endConsultation(String(req.params.tokenId));
    res.json({ data });
  })
);

// Doctor er status change
doctorRouter.put(
  '/doctors/me/status',
  requireAuth,
  requireRole('DOCTOR'),
  validateBody(statusSchema),
  asyncHandler(async (req, res) => {
    const data = await setDoctorStatus(req.user!.sub, req.body.status);
    res.json({ data });
  })
);

// Delay add (minute hisebe)
doctorRouter.post(
  '/doctors/me/delay',
  requireAuth,
  requireRole('DOCTOR'),
  validateBody(delaySchema),
  asyncHandler(async (req, res) => {
    const data = await addDelay(req.user!.sub, req.body.minutes);
    res.json({ data });
  })
);
