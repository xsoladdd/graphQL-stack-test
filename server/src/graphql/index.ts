import { buildSchema } from "type-graphql";
import { TodoResolver } from "./resolvers/Todo";

// import { EncryptedID } from "../scalars";

export default buildSchema({
  resolvers: [TodoResolver],
  // scalarsMap: [{ type: () => ID, scalar: EncryptedID }],
});
