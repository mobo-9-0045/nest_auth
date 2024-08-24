import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import {CreateNestDto} from './nest.dto';

@Controller('nest')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('world')
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('nest')
  getNest(): string{
    return this.appService.getHelloNest();
  }

  @Post('post')
  postNest(): string{
    return this.appService.postNest();
  }

  @Get(':id')
  getById(@Param('id') id: number): string{
    return this.appService.getById(id);
  }

  //Post with req payload
  @Post('create')
  async creatNest(@Body() creatNestDto: CreateNestDto){
    return this.appService.createNest(creatNestDto);
  }
}
