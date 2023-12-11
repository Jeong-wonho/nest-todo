import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Todo } from './entities/todo.entity';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Resolver()
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Query(() => [Todo])
  async todos(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @Mutation(() => Todo)
  async createTodo(
    @Args('createTodoInput') createTodoInput: CreateTodoDto,
  ): Promise<Todo> {
    return this.todoService.create(createTodoInput);
  }

  @Mutation(() => Todo)
  async updateTodo(
    @Args('UpdateTodoInput') updateTodoInput: UpdateTodoDto,
  ): Promise<Todo> {
    return this.todoService.update(updateTodoInput);
  }

  @Mutation(() => Boolean)
  async deleteTodo(@Args('id') id: number): Promise<boolean> {
    return this.todoService.delete(id);
  }
}
