import { HttpCode, Injectable } from '@nestjs/common';
import { CreateNestDto } from './nest.dto';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getHelloNest(): string{
    return 'Hello Nestjs!';
  }

  postNest(): string{
    return 'Post Nestjs';
  }

  getById(id: number){
    return `Get by id ${id}`;
  }

  createNest(createNest: CreateNestDto): string{
    return `${createNest.name} ${createNest.age} ${createNest.breed} created successfully`;
  }
}
