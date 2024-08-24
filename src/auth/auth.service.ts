import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    
    async loggin(): Promise<string>{
        return "Looged";
    }
}
