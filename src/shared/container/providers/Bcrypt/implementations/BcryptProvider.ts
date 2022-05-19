import { IBcryptProvider } from '../models/IBcryptProvider';
import { compare } from 'bcryptjs';

export default class BcryptProvider implements IBcryptProvider {
    public async compareHash(s: string, hash: string): Promise<boolean> {
        const verifiedPassword = await compare(s, hash);

        return verifiedPassword;
    }
}