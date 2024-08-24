import { Body, Controller, Get, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./user.entity";
import { CreatUserDto } from "./dto/creat.user.dto";


@Controller('users')
export class UsersController{
    constructor(private readonly userSevice: UsersService){}

    @Get('all')
    async getAll(): Promise<User[]>{
        return this.userSevice.findAll();
    }

    @Post('createUser')
    async creatUser(@Body() creatUserdto: CreatUserDto){
        console.log(`user Dto : ${creatUserdto.name}`);
        console.log(`user Dto : ${creatUserdto.lastname}`);
        console.log(`user Dto : ${creatUserdto.isActive}`);
        this.userSevice.creatUser(creatUserdto);
    }
}