import { Module } from "@nestjs/common";
import { SkillController } from "./skill.controller";
import { SkillService } from "./skill.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Skill } from "./skill.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Skill])],
    exports: [SkillService],
    controllers: [SkillController],
    providers: [SkillService],
})

export class SkillModule{}