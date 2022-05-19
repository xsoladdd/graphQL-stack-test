import Todo from "../../entity/Todo";
import {
  Arg,
  Field,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { getRepository } from "typeorm";
import { EncryptedID } from "../scalars/EncryptedID";

@ObjectType()
class ReturnStructure {
  @Field(() => String)
  message: string;
  @Field(() => Int)
  status: number;
}

@InputType()
class InputIDString {
  @Field(() => EncryptedID)
  id: number;
}

@Resolver()
export class TodoResolver {
  @Query()
  ping(): string {
    return "hey";
  }

  @Query(() => [Todo])
  async getTodos(): Promise<Array<Todo> | ReturnStructure> {
    const todoRepo = getRepository(Todo);
    const allData = await todoRepo.find().catch((err) => {
      return {
        message: err.message,
        status: 0,
      };
    });
    console.log(allData);
    return allData;
  }

  @Query(() => Todo)
  async getTodo(
    @Arg("input", { nullable: false }) { id }: InputIDString
  ): Promise<Todo | ReturnStructure> {
    const todoRepo = getRepository(Todo);
    console.log(id);
    const todoData = await todoRepo
      .findOneOrFail({
        where: {
          id,
        },
      })
      .catch((err) => {
        return {
          message: err.message,
          status: 0,
        };
      });
    console.log(todoData);
    return todoData;
  }

  @Mutation(() => Todo)
  async addTodo(
    @Arg("input", { nullable: false }) input: string
  ): Promise<Todo | ReturnStructure> {
    const todoRepo = getRepository(Todo);
    const todo: Todo = {
      texts: input,
    };

    const insertedData = await todoRepo.save(todo).catch((err) => {
      return {
        message: err.message,
        status: 0,
      };
    });
    console.log(insertedData);

    return insertedData;
  }
}
