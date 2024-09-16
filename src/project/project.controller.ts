import { Body, Controller, Get, UseGuards, Req, Post} from "@nestjs/common";
import { ProjectService } from "./project.service";
import { AuthGuarde } from "src/auth/auth.guard";
import { CreateProjectDto } from "./dto/create.project.dto";
import { Project } from "./project.entity";

@Controller('projects')
export class ProjectController{
    constructor(private readonly projectService: ProjectService){}
    @Get('all')
    @UseGuards(AuthGuarde)
    async getAll(): Promise<Project[]>{
        return this.projectService.getAll();
    }

    @Post('createProject')
    @UseGuards(AuthGuarde)
    async createPoject(@Body() createProjectDto: CreateProjectDto, @Req() req: any): Promise<Project>{
        return this.projectService.createProject(createProjectDto, req.user);
    }
}