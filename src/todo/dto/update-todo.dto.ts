import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateTodoDto } from './create-todo.dto';

@InputType()
export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  @Field(() => Int)
  id: number;
}
