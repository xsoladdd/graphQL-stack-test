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
import { FileUrl } from "../scalars/FileUrl";

@ObjectType()
class ReturnStructure {
  @Field(() => String)
  message: string;
  @Field(() => Int)
  status: number;
}

@ObjectType()
class TodoWithFilepath extends Todo {
  @Field(() => FileUrl)
  file: string;
}

@InputType()
class InputIDString {
  @Field(() => EncryptedID)
  id: number;
}

@ObjectType()
class NameType {
  @Field(() => String)
  firstname?: String;

  @Field(() => String)
  lastname?: String;
}

@ObjectType()
class WrappedName extends NameType {
  @Field(() => NameType)
  name?: NameType;
}

@Resolver()
export class TodoResolver {
  @Query()
  ping(): string {
    return "hey";
  }

  @Query(() => WrappedName)
  getName(): WrappedName {
    const data = { firstname: "aazam", lastname: "mohd" };
    const data2 = { name: { firstname: "aazam", lastname: "mohd" } };

    return {
      ...data,
      ...data2,
    };
  }

  @Query(() => [TodoWithFilepath])
  async getFileURLx(): Promise<Array<TodoWithFilepath> | ReturnStructure> {
    const todoRepo = getRepository(Todo);
    const allData = await todoRepo.find();
    // .catch((err) => {
    //   return {
    //     message: err.message,
    //     status: 0,
    //   };
    // });

    const data = allData?.map((data) => {
      return { ...data, file: "me.jpg" };
    });

    return data;
  }

  @Query(() => [TodoWithFilepath])
  async getFileURL(): Promise<Array<TodoWithFilepath> | ReturnStructure> {
    const todoRepo = getRepository(Todo);
    const allData = await todoRepo.find();
    // .catch((err) => {
    //   return {
    //     message: err.message,
    //     status: 0,
    //   };
    // });

    const data = allData?.map((data) => {
      return { ...data, file: "me.jpg" };
    });

    return data;
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
