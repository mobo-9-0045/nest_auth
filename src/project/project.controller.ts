import { Body, Controller, Get, UseGuards, Req, Post, Put, Param, Delete} from "@nestjs/common";
import { ProjectService } from "./project.service";
import { AuthGuarde } from "src/auth/auth.guard";
import { CreateProjectDto } from "./dto/create.project.dto";
import { Project } from "./project.entity";
import { UpdateProjectDto } from "./dto/update.project.dto";

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

    @Put('updateProject/:id')
    @UseGuards(AuthGuarde)
    async upateProject(@Body() updateProjectDto: UpdateProjectDto, @Req() req: any, @Param('id') id: number): Promise<Project | null>{
        return await this.projectService.updateProject(updateProjectDto, req.user, id);
    }

    @Delete('deleteProject/:id')
    @UseGuards(AuthGuarde)
    async deleteProject(@Param('id') id: number, @Req() req: any): Promise<Project | null>{
        return await this.projectService.deleteProject(id, req.user);
    }
}