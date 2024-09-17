import { Body, Controller, Get, UseGuards, Req, Post, Put, Param, Delete} from "@nestjs/common";
import { SkillService } from "./skill.service";
import { AuthGuarde } from "src/auth/auth.guard";
import { CreateSkillDto } from "./dto/create.skill.dto";
import { Skill } from "./skill.entity";
import { UpdateSkillDto } from "./dto/update.skill.dto";

@Controller('skills')
export class SkillController{
    constructor(private readonly skillService: SkillService){}

    @Get('all')
    @UseGuards(AuthGuarde)
    async getAll(): Promise<Skill[]>{
        return this.skillService.getAll();
    }

    @Post('createSkill')
    @UseGuards(AuthGuarde)
    async createSkill(@Body() createSkillDto: CreateSkillDto, @Req() req: any): Promise<Skill>{
        return await this.skillService.createSkill(createSkillDto, req.user);
    }

    @Put('updateSkill/:id')
    @UseGuards(AuthGuarde)
    async upateSkill(@Body() updateProjectDto: UpdateSkillDto, @Req() req: any, @Param('id') id: number): Promise<Skill | null>{
        return await this.skillService.updateSkill(updateProjectDto, req.user, id);
    }

    @Delete('deleteSkill/:id')
    @UseGuards(AuthGuarde)
    async deleteSkill(@Param('id') id: number, @Req() req: any): Promise<Skill | null>{
        return await this.skillService.deleteSkill(id, req.user);
    }
}