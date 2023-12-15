import { Injectable } from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async findAll(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    console.log(createTodoDto);
    const todo = this.todoRepository.create(createTodoDto);
    return this.todoRepository.save(todo);
  }

  async update(updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const { id, ...rest } = updateTodoDto;
    await this.todoRepository.update(id, rest);
    return this.todoRepository.findOneBy({ id });
  }

  async delete(id: number): Promise<boolean> {
    console.log('controller delete, id');
    const result = await this.todoRepository.softDelete(id);
    console.log('delete_result', result);
    return result.affected > 0;
  }
}
