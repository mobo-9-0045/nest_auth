import * as Crypto from 'crypto-js';
import * as crypto from 'crypto';

const secKey = "super ec key";
export const encryption = (password: string): string =>{
    const encryptedPasswor: string = Crypto.AES.encrypt(password, secKey).toString();
    return encryptedPasswor;
}

export const decryption = (encryptedPassword: string): string =>{
    const bytes = Crypto.AES.decrypt(encryptedPassword, secKey);
    const decryptedPassword = bytes.toString(Crypto.enc.Utf8);
    return decryptedPassword;
}

export const generateotp = () =>{
    const otp = crypto.randomInt(100000, 999999);
    return otp;
}