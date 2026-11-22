import { Router } from 'express';
import { requireAuth, requireRole } from '../../middleware/auth';
import { validateBody } from '../../middleware/validate';
import { asyncHandler } from '../../utils/asyncHandler';
import { bookingSchema } from './appointment.schema';
import {
  bookAppointment,
  cancelAppointment,
  getMyAppointments,
} from '../../services/appointment.service';

export const appointmentRouter = Router();

// Patient nijer appointment list dekhbe
appointmentRouter.get(
  '/me',
  requireAuth,
  requireRole('PATIENT'),
  asyncHandler(async (req, res) => {
    const data = await getMyAppointments(req.user!.sub);
    res.json({ data });
  })
);

// Patient appointment book korbe
appointmentRouter.post(
  '/',
  requireAuth,
  requireRole('PATIENT'),
  validateBody(bookingSchema),
  asyncHandler(async (req, res) => {
    const data = await bookAppointment(req.user!.sub, req.body);
    res.status(201).json({ data });
  })
);

// Appointment cancel
appointmentRouter.patch(
  '/:id/cancel',
  requireAuth,
  requireRole('PATIENT', 'RECEPTIONIST'),
  asyncHandler(async (req, res) => {
    const data = await cancelAppointment(String(req.params.id));
    res.json({ data });
  })
);