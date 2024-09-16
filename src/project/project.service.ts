import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Project } from "./project.entity";
import { Repository } from "typeorm";
import { CreateProjectDto } from "./dto/create.project.dto";
import { User } from "src/users/user.entity";

@Injectable()
export class ProjectService{
    constructor(@InjectRepository(Project) private projectRepository: Repository<Project>){}

    async getAll(): Promise<Project[]>{
        return this.projectRepository.find();
    }

    async createProject(createProjectDto: CreateProjectDto, user: User): Promise<Project>{
        try{
            const project = new Project();
            project.projectName = createProjectDto.pojectName;
            project.projectDescription = createProjectDto.projectDesciption;
            project.user = user;
            return this.projectRepository.save(project);
        }
        catch(error){
            throw new Error(`Project creation failed ${error}`);
        }
    }
}