import { z } from 'zod';

export const walkInSchema = z.object({
  doctorId: z.string().uuid('doctorId valid UUID hote hobe'),
  patientName: z.string().min(2, 'Patient er naam komporse 2 character hote hobe'),
  phone: z.string().regex(/^01[3-9]\d{8}$/, 'Phone number thik nei'),
});

export const tokenActionSchema = z.object({
  reason: z.string().max(200).optional(),
});