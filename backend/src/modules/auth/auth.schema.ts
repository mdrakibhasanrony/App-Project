import { z } from 'zod';

export const registerSchema = z.object({
  phone: z.string().regex(/^01[3-9]\d{8}$/, 'Phone number thik nei (01XXXXXXXXX)'),
  password: z.string().min(8, 'Password komporse 8 character hote hobe'),
  name: z.string().min(2, 'Naam komporse 2 character hote hobe'),
});

export const loginSchema = z.object({
  phone: z.string().min(1, 'Phone din'),
  password: z.string().min(1, 'Password din'),
});