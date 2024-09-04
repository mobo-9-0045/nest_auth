import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SingingDto } from './dto/auth.singing.dto';
import { UsersService } from 'src/users/users.service';
import { CreatUserDto } from 'src/users/dto/creat.user.dto';
import { User } from 'src/users/user.entity';
import { JwtService } from '@nestjs/jwt';
import { decryption, encryption, generateotp} from './encryption';
import { ValidateOtpDto } from './dto/auth.validateotp.dto';


@Injectable()
export class AuthService {
    constructor (private userService: UsersService,
                private jwtService: JwtService
                )
                {}
    
    async validateUserByGoogle(user: any): Promise<any>{
        const userFromDb = await this.userService.findOneByEmail(user.email);
        if (!userFromDb){
            const newUser = await this.userService.createUserFromGoogle(user);
            return this.generateJwtToken(newUser);
        }
        return this.generateJwtToken(userFromDb);
    }

    async googleLogin(req: any): Promise<string> {
        if (!req.user) {
            return 'No user from Google';
        }
        return req.user.access_token;
    }

    async loggin(singinDto: SingingDto): Promise<string>{
        const user = await this.userService.findOneByUsername(singinDto.username);
        if (!user){
            throw new Error(`User Not found by username : ${singinDto.username}`);
        }
        const decryptedPassword: string = decryption(user.password);
        if (decryptedPassword !== singinDto.password){
            throw new UnauthorizedException();
        }
        const payload = {id: user.id, username: user.username};
        const access_tokne = await this.jwtService.signAsync(payload);
        return access_tokne;
    }

    async singUp(createUserDto: CreatUserDto): Promise<User | null>{
        const encryptedPasswor: string = encryption(createUserDto.password);
        createUserDto.password = encryptedPasswor;
        return await this.userService.creatUser(createUserDto);
    }

    generateJwtToken(user: any) {
        const payload = { username: user.username, id: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async genereateOtp(user: User): Promise<number>{
        user.otpCode = generateotp();
        await this.userService.saveUser(user);
        return user.otpCode;
    }

    async verifyOtp(user: User, validateOtpDto: ValidateOtpDto): Promise<User | null>{
        const usr = await this.userService.findOneByEmail(validateOtpDto.email);
        if (usr){
            usr.isActive = true;
            usr.otpCode = 0;
            this.userService.saveUser(usr);
        }
        return usr;
    }
}
