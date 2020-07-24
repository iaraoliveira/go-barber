import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const apointmentsRouter = Router();

apointmentsRouter.get('/', async (request, response) => {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointments = await appointmentsRepository.find();
    return response.json(appointments);
})

apointmentsRouter.post('/', async (request, response) => {
    try {
        const { provider, date } = request.body;

        const parsedDate = parseISO(date);

        const createAppointment = new CreateAppointmentService();
        const appointment = await createAppointment.execute({ 
            provider, 
            date: parsedDate 
        });
        
        return response.json(appointment);
    } catch ( error ) {
        return response.status(400).json({ error: error.message });
    } 
    
})

export default apointmentsRouter;