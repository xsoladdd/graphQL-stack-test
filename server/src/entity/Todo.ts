import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { EncryptedID } from "../graphql/scalars";

@Entity()
@ObjectType()
export default class Todo {
  @Field(() => EncryptedID)
  @PrimaryGeneratedColumn("increment")
  id?: number;

  @Field(() => String)
  @Column({})
  texts: string;

  @Field(() => Boolean)
  @Column({ default: true })
  status?: boolean;
}
