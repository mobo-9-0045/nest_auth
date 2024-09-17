import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Skill } from "./skill.entity";
import { Repository } from "typeorm";
import { CreateSkillDto } from "./dto/create.skill.dto";
import { User } from "src/users/user.entity";
import { UpdateSkillDto } from "./dto/update.skill.dto";

@Injectable()
export class SkillService{
    constructor(@InjectRepository(Skill) private skillRepository: Repository<Skill>){}

    async getAll(): Promise<Skill[]>{
        return this.skillRepository.find();
    }

    async createSkill(createSkillDto: CreateSkillDto, user: User): Promise<Skill>{
        try{
            const skill = new Skill();
            skill.skillName = createSkillDto.skillName;
            skill.skillDescription = createSkillDto.skillDescription;
            skill.user = user;
            return await this.skillRepository.save(skill);
        }
        catch(error){
            throw new Error(`Project creation failed ${error}`);
        }
    }
    
    async updateSkill(updateSkillDto: UpdateSkillDto, user: User, id: number): Promise<Skill | null>{
        try{
            const skill = await this.skillRepository.findOne({
                where: {id},
                relations: ['user'],
            });
            if (user.id == skill?.user.id){
                this.skillRepository.merge(skill, updateSkillDto);
                return await this.skillRepository.save(skill);
            }
            return null;
        }
        catch(error){
            return null
        }
    }

    async deleteSkill(id: number, user: User): Promise<Skill | null>{
        try{
            const skill = await this.skillRepository.findOne({
                where: {id},
                relations: ['user'],
            });
            if (user.id == skill?.user.id){
                return await this.skillRepository.remove(skill);
            }
            return null;
        }
        catch(error){
            return null
        }
    }
}