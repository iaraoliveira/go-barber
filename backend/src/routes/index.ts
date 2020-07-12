import { Router } from 'express';
import apointmentsRouter from './appointments.routes';

const routes = Router();

routes.use('/appointments', apointmentsRouter);

export default routes;
