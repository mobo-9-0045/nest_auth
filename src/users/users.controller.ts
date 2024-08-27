import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./user.entity";
import { CreatUserDto } from "./dto/creat.user.dto";
import { UpdateUserDto } from "./dto/update.user.dto";
import { AuthGuard } from "src/auth/auth.guard";


@Controller('users')
export class UsersController{
    constructor(private readonly userService: UsersService){}

    @Get('all')
    async getAll(): Promise<User[]>{
        return this.userService.findAll();
    }

    @Get('user/:id')
    @UseGuards(AuthGuard)
    async getUserById(@Param('id') id: number): Promise<User | null>{
        return this.userService.findOne(id);
    }

    @Post('createUser')
    async creatUser(@Body() creatUserdto: CreatUserDto){
        this.userService.creatUser(creatUserdto);
    }

    @Put('updateUser/:id')
    async updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto): Promise<User | null>{
        return this.userService.update(id, updateUserDto);
    }

    @Delete('deleteUser/:id')
    async deleteUser(@Param('id') id: number): Promise<User | null>{
        return this.userService.delete(id);
    }
}