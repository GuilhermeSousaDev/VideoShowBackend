export interface IBcryptProvider {
    compareHash(s: string, hash: string): Promise<boolean>;
}