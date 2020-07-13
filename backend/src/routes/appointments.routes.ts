import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

const apointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

apointmentsRouter.get('/', (request, response) => {
    const appointments = appointmentsRepository.all();
    return response.json(appointments);
})

apointmentsRouter.post('/', (request, response) => {
    const { provider, date } = request.body;

    const parsedDate = startOfHour(parseISO(date));

    const findAppointmentInSameDate = appointmentsRepository.findByDate(parsedDate);
    
    if (findAppointmentInSameDate) {
        return response
        .status(400)
        .json({ message: 'This appointment is already booked' });
    }

    const appointment = appointmentsRepository.create({ 
        provider, 
        date: parsedDate 
    });

    return response.json(appointment);
})

export default apointmentsRouter;