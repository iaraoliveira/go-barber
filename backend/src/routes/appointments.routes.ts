import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const apointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

apointmentsRouter.get('/', (request, response) => {
    const appointments = appointmentsRepository.all();
    return response.json(appointments);
})

apointmentsRouter.post('/', (request, response) => {
    try {
        const { provider, date } = request.body;
        const parsedDate = parseISO(date);
        const createAppointment = new CreateAppointmentService(appointmentsRepository);
        const appointment = createAppointment.execute({ 
            provider, 
            date: parsedDate 
        });
        
        return response.json(appointment);
    } catch ( error ) {
        return response.status(400).json({ error: error.message });
    } 
    
})

export default apointmentsRouter;