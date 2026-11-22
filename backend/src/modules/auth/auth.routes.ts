import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { requireAuth } from '../../middleware/auth';
import { validateBody } from '../../middleware/validate';
import { asyncHandler } from '../../utils/asyncHandler';
import { registerSchema, loginSchema } from './auth.schema';
import { registerPatient, login, getMe } from './auth.service';

export const authRouter = Router();

// Brute-force thekaté bachar jonno: 5 minute e max 10 bar login chesta
const loginLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: {
      code: 'RATE_LIMITED',
      message: 'Onek bar chesta hoyeche, kichu khon pore abar chesta koro',
    },
  },
});

// Patient registration
authRouter.post(
  '/register',
  validateBody(registerSchema),
  asyncHandler(async (req, res) => {
    const data = await registerPatient(req.body);
    res.status(201).json({ data });
  })
);

// Login: token ar user info pabe
authRouter.post(
  '/login',
  loginLimiter,
  validateBody(loginSchema),
  asyncHandler(async (req, res) => {
    const data = await login(req.body.phone, req.body.password);
    res.json({ data });
  })
);

// Nijer info dekha (token lagbe)
authRouter.get(
  '/me',
  requireAuth,
  asyncHandler(async (req, res) => {
    const data = await getMe(req.user!.sub);
    res.json({ data });
  })
);