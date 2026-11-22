import { Router } from 'express';
import { z } from 'zod';
import { requireAuth, requireRole } from '../../middleware/auth';
import { validateBody } from '../../middleware/validate';
import { asyncHandler } from '../../utils/asyncHandler';
import {
  getFacilityQueue,
  checkInAppointment,
  rescheduleAppointment,
} from '../../services/receptionist.service';

export const receptionistRouter = Router();

const rescheduleSchema = z.object({
  scheduledAt: z.string().datetime('scheduledAt valid ISO date-time hote hobe'),
});

// Receptionist facility er queue dekhbe
receptionistRouter.get(
  '/receptionist/queue',
  requireAuth,
  requireRole('RECEPTIONIST'),
  asyncHandler(async (req, res) => {
    // Facility filter ekhon stub, Azmir er User.facilityId add hole ekhane real value asbe
    const data = await getFacilityQueue(req.user!.facilityId);
    res.json({ data });
  })
);

// Appointment check-in: patient ashle token create hobe
receptionistRouter.post(
  '/appointments/:id/check-in',
  requireAuth,
  requireRole('RECEPTIONIST'),
  asyncHandler(async (req, res) => {
    const data = await checkInAppointment(String(req.params.id));
    res.json({ data });
  })
);

// Appointment reschedule
receptionistRouter.patch(
  '/appointments/:id/reschedule',
  requireAuth,
  requireRole('RECEPTIONIST'),
  validateBody(rescheduleSchema),
  asyncHandler(async (req, res) => {
    const data = await rescheduleAppointment(String(req.params.id), req.body.scheduledAt);
    res.json({ data });
  })
);