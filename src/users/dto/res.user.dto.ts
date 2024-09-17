import { Project } from "src/project/project.entity";

export class ResponseUserDto{
    name: string;
    lastname: string;
    username: string;
    isActive: boolean;
    projects: Project[];
}