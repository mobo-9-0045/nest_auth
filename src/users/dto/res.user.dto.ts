import { Project } from "src/project/project.entity";
import { Skill } from "src/skills/skill.entity";

export class ResponseUserDto{
    name: string;
    lastname: string;
    username: string;
    isActive: boolean;
    projects: Project[];
    skills: Skill[];
}