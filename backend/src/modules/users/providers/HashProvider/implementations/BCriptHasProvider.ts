import IHashProvider from '../models/IHashProvider';
import { hash, compare } from 'bcryptjs';

export default class BCriptHashProvider implements IHashProvider {
    public async generateHash(payload: string): Promise<string>{
        return hash(payload, 8);
    }

    public async compareHash(payload: string, hashed: string): Promise<boolean>{
        return compare(payload, hashed);
    }
}