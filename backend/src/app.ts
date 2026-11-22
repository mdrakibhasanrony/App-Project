import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { env } from './config/env';
import { healthRouter } from './modules/health/health.routes';
import { apiRouter } from './routes';
import { AppError } from './utils/AppError';
import { errorHandler } from './middleware/errorHandler';

export const app = express();

app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN }));
app.use(express.json());

app.use(healthRouter);
app.use('/api/v1', apiRouter);

// Jekono route na mile
app.use((_req, _res, next) => {
  next(new AppError(404, 'NOT_FOUND', 'Route not found'));
});

// Error handler sob shesh e thakbe
app.use(errorHandler);