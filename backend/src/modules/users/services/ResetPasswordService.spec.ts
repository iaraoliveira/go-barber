import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import ResetPasswordService from './ResetPasswordService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPassword: ResetPasswordService;

describe('ResetPassword', () => {

    beforeEach(()=>{
        fakeUsersRepository = new FakeUsersRepository();
        fakeUserTokensRepository = new FakeUserTokensRepository();
        fakeHashProvider = new FakeHashProvider();
        resetPassword = new ResetPasswordService(
            fakeUsersRepository, 
            fakeUserTokensRepository, 
            fakeHashProvider
        );
    })

    it('should be able to reset the password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@test.com',
            password: '123456',
        });
        
        const { token } = await fakeUserTokensRepository.generate(user.id);

        const generateHash = jest.spyOn(fakeHashProvider, 'generateHash')

        await resetPassword.execute({
            password: '321321',
            token
        })

        const updatedUser = await fakeUsersRepository.findById(user.id);

        expect(generateHash).toHaveBeenCalledWith('321321');
        expect(updatedUser?.password).toBe('321321');
        
    })
    
    it('should not be able to reset the password with a non-existent token', async () => {
        expect(
            resetPassword.execute({
                token: 'non-existent-token',
                password: '123456'
            })
        ).rejects.toBeInstanceOf(AppError)
    })

    it('should not be able to reset the password with a non-existent user', async () => {

        const { token } = await fakeUserTokensRepository.generate('non-existent-user');

        expect(
            resetPassword.execute({
                token,
                password: '123456'
            })
        ).rejects.toBeInstanceOf(AppError)
    })

    it('should not be able to reset the password if more than 2 hours has passed', async () => {

        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@test.com',
            password: '123456',
        });
        
        const { token } = await fakeUserTokensRepository.generate(user.id);

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            const customDate = new Date();
            return customDate.setHours(customDate.getHours() + 3);
        })

        await expect(
            resetPassword.execute({
                token,
                password: '123456'
            })
        ).rejects.toBeInstanceOf(AppError);
        
    })
  
})