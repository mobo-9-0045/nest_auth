import { Body, Controller, Get, Post, Req, Res, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SingingDto } from './dto/auth.singing.dto';
import { CreatUserDto } from 'src/users/dto/creat.user.dto';
import { User } from 'src/users/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { Http2ServerRequest } from 'http2';

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

    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req: Http2ServerRequest) {
        console.log('google auth');
    }

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Req() req: any, @Res() res: any) {
        console.log('id : ', req.user);
        const token = await this.authService.googleLogin(req);
        res.redirect(`http://localhost:3001/callback?token=${token}`);
    }
}
