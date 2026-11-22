import { z } from 'zod';

export const bookingSchema = z.object({
  doctorId: z.string().uuid('Doctor ID thik na'),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date YYYY-MM-DD format e hote hobe'),
  scheduledAt: z.string().datetime('Time thik format e nai'),
});