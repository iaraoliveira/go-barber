import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';

import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

describe('SendForgotPasswordEmail', () => {
    it('should be able to recover the password using email', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeMailProvider = new FakeMailProvider();

        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

        const sendForgotPasswordEmail = new SendForgotPasswordEmailService(fakeUsersRepository);

        await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@test.com',
            password: '123456',
        });

        const response = await sendForgotPasswordEmail.execute({
            email: 'johndoe@test.com',
        });

        expect(sendMail).toHaveBeenCalled();
    })
})