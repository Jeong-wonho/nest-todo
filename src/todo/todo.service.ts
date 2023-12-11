import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly toodRepository: Repository<Todo>,
  ) {}

  async findAll(): Promise<Todo[]> {
    return this.toodRepository.find();
  }

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const todo = this.toodRepository.create(createTodoDto);
    return this.toodRepository.save(todo);
  }

  async update(updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const { id, ...rest } = updateTodoDto;
    await this.toodRepository.update(id, rest);
    return this.toodRepository.findOneBy({ id });
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.toodRepository.delete(id);
    console.log('delete_result', result);
    return result.affected > 0;
  }
}
