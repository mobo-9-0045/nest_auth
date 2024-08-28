import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SingingDto } from './dto/auth.singing.dto';
import { UsersService } from 'src/users/users.service';
import { CreatUserDto } from 'src/users/dto/creat.user.dto';
import { User } from 'src/users/user.entity';
import { JwtService } from '@nestjs/jwt';
import { decryption, encryption } from './encryption';
import { changePasswordDto } from './dto/auth.changepassword.dto';


@Injectable()
export class AuthService {
    constructor (private userService: UsersService,
                private jwtService: JwtService
                ){}

    async loggin(singinDto: SingingDto): Promise<string>{
        const user = await this.userService.findOneByUsername(singinDto.username);
        if (!user){
            throw new Error(`User Not found by username : ${singinDto.username}`);
        }
        const decryptedPassword: string = decryption(user.password);
        if (decryptedPassword !== singinDto.password){
            throw new UnauthorizedException();
        }
        const payload = {sub: user.id, username: user.username};
        const access_tokne = await this.jwtService.signAsync(payload);
        return access_tokne;
    }

    async singUp(createUserDto: CreatUserDto): Promise<User | null>{
        const encryptedPasswor: string = encryption(createUserDto.password);
        createUserDto.password = encryptedPasswor;
        return await this.userService.creatUser(createUserDto);
    }
}
