import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, Request} from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./user.entity";
import { CreatUserDto } from "./dto/creat.user.dto";
import { UpdateUserDto } from "./dto/update.user.dto";
import { AuthGuarde } from "src/auth/auth.guard";
import { ResponseUserDto } from "./dto/res.user.dto";
import { changePasswordDto } from "src/auth/dto/auth.changepassword.dto";

interface AuthenticatedRequest extends Request {
    user: User;
}

@Controller('users')
export class UsersController{
    constructor(private readonly userService: UsersService){}

    @Get('all')
    @UseGuards(AuthGuarde)
    async getAll(): Promise<User[]>{
        return this.userService.findAll();
    }

    @Get('user/:id')
    @UseGuards(AuthGuarde)
    async getUserById(@Param('id') id: number): Promise<ResponseUserDto | null>{
        return this.userService.findOneById(id);
    }

    @Post('createUser')
    async creatUser(@Body() creatUserdto: CreatUserDto){
        this.userService.creatUser(creatUserdto);
    }

    @Put('updateUser/:id')
    @UseGuards(AuthGuarde)
    async updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto): Promise<ResponseUserDto | null>{
        return this.userService.update(id, updateUserDto);
    }

    @Put('changePassword')
    @UseGuards(AuthGuarde)
    async changePassword(@Request() req: AuthenticatedRequest, @Body() changePasswordDto: changePasswordDto): Promise<User | null>{
        const username = req.user.username;
        return await this.userService.changePassword(username, changePasswordDto);
    }

    @Delete('deleteUser/:id')
    async deleteUser(@Param('id') id: number): Promise<User | null>{
        return this.userService.delete(id);
    }

    @Get('getProfile')
    @UseGuards(AuthGuarde)
    async getProfile(@Request() req: AuthenticatedRequest): Promise<any>{
        return req.user;
    }
}