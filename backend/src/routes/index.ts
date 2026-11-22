import { Router } from 'express';
import { authRouter } from '../modules/auth/auth.routes';
import { appointmentRouter } from '../modules/appointments/appointment.routes';
import { queueRouter } from '../modules/queue/queue.routes';
import { doctorRouter } from '../modules/doctor/doctor.routes';
import { receptionistRouter } from '../modules/receptionist/receptionist.routes';

export const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/appointments', appointmentRouter);

// Queue, doctor ar receptionist route gulo full path diye define kora, tai root e mount
apiRouter.use('/', queueRouter);
apiRouter.use('/', doctorRouter);
apiRouter.use('/', receptionistRouter);