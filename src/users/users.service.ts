import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { CreatUserDto } from "./dto/creat.user.dto";

@Injectable()
export class UsersService{
    constructor(@InjectRepository(User) private userRepository: Repository<User>){}

    findAll(): Promise<User[]>{
        return this.userRepository.find();
    }

    findOne(id: number): Promise<User | null>{
        return this.userRepository.findOneBy({id})
    }

    async remove(id: number): Promise<void>{
        await this.userRepository.delete(id);
    }

    creatUser(creatUserDto: CreatUserDto): Promise<User>{
        const user = this.userRepository.create(creatUserDto);
        return this.userRepository.save(user);
    }
}