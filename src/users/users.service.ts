import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository, UpdateResult } from "typeorm";
import { CreatUserDto } from "./dto/creat.user.dto";
import { UpdateUserDto } from "./dto/update.user.dto";
import { ResponseUserDto } from "./dto/res.user.dto";
import { changePasswordDto } from "src/auth/dto/auth.changepassword.dto";
import { decryption, encryption } from "src/auth/encryption";

@Injectable()
export class UsersService{
    constructor(@InjectRepository(User) private userRepository: Repository<User>){}

    findAll(): Promise<User[]>{
        return this.userRepository.find();
    }

    findOne(id: number): Promise<User | null>{
        return this.userRepository.findOneBy({id});
    }

    async findOneById(id: number): Promise<ResponseUserDto | null>{
        const user = await this.userRepository.findOneBy({id});
        if (user){
            const userDto: ResponseUserDto = {
                name: user.name,
                username: user.username,
                lastname: user.lastname,
                isActive: user.isActive,
            }
            return userDto;
        }
        return null
    }

    findOneByUsername(username: string): Promise<User| null>{
        return this.userRepository.findOne({where: {username}});
    }

    async remove(id: number): Promise<void>{
        const user = await this.findOne(id);
        if (!user){
            throw new Error(`User with Id ${id} not found`);
        }
        await this.userRepository.remove(user);
        // await this.userRepository.delete(id);
    }

    creatUser(creatUserDto: CreatUserDto): Promise<User>{
        const user = this.userRepository.create(creatUserDto);
        return this.userRepository.save(user);
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<ResponseUserDto | null>{
        const user = await this.findOne(id);
        if (!user){
            throw new Error(`User with ID ${id} not found`);
        }
        this.userRepository.merge(user, updateUserDto);
        this.userRepository.save(user);
        const userDto: ResponseUserDto = {
            name: user.name,
            username: user.username,
            lastname: user.lastname,
            isActive: user.isActive,
        }
        return userDto;
    }

    async changePassword(changePasswordDto: changePasswordDto): Promise<User | null>{
        const user = await this.findOneByUsername(changePasswordDto.username);
        if (!user){
            throw new Error(`User with username ${changePasswordDto.username} not found`);
        }

        const oldpassword = decryption(user.password);
        if (oldpassword == changePasswordDto.oldpassword){
            changePasswordDto.password = encryption(changePasswordDto.password);
            this.userRepository.merge(user, changePasswordDto);
            return this.userRepository.save(user);
        }
        return null;
    }

    async delete(id: number): Promise<User | null>{
        const user = await this.findOne(id);
        if (!user){
            throw new Error(`User with ID ${id} not found`);
        }
        return this.userRepository.remove(user);
    }
}