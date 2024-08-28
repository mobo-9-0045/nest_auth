import { Body, Controller, Get, Post, Put, Request, UseGuards,} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SingingDto } from './dto/auth.singing.dto';
import { CreatUserDto } from 'src/users/dto/creat.user.dto';
import { User } from 'src/users/user.entity';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('login')
    async login(@Body() singingDto: SingingDto): Promise<string>{
        return await this.authService.loggin(singingDto);
    }

    @Post('singUp')
    async singUp(@Body() createUserDto: CreatUserDto): Promise<User | null>{
        return await this.authService.singUp(createUserDto);
    }
}
