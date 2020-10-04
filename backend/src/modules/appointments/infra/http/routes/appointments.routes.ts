import { Router } from 'express';

import AppointmentsController from '../controllers/AppointmentsController'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

const apointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

apointmentsRouter.use(ensureAuthenticated);

// apointmentsRouter.get('/', async (request, response) => {
//     const appointments = await appointmentsRepository.find();
//     return response.json(appointments);
// })

apointmentsRouter.post('/', appointmentsController.create);

export default apointmentsRouter;