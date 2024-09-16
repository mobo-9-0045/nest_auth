import { Module } from "@nestjs/common";
import { ProjectController } from "./project.controller";
import { ProjectService } from "./project.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Project } from "./project.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Project])],
    exports: [ProjectService],
    controllers: [ProjectController],
    providers: [ProjectService],
})

export class ProjectModule{}