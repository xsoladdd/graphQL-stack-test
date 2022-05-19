import { ApolloError } from "apollo-server-express";
import { GraphQLScalarType } from "graphql";
import { encrypt, decrypt } from "../../utils";
import { ast } from "../../types";

export const EncryptedID = new GraphQLScalarType({
  name: "EncryptedID",
  description: "Crypto protocol for IDS",
  serialize(value: string | number): string {
    // check the type of received value
    return encrypt(typeof value === "string" ? value : value.toString()); // value sent to the client
  },
  parseValue(value: string | number): string {
    // check the type of received value
    const decryptedString = decrypt(
      typeof value === "string" ? value : value.toString()
    );
    if (!decryptedString) {
      throw new ApolloError("Invalid ID", "INVALID_ENCRYPTED_ID_FORMAT");
    }
    return decryptedString; // value from the client input variables
  },
  parseLiteral(ast): string {
    // check the type of received value
    const { value } = ast as ast;
    const decryptedString = decrypt(value);
    if (!decryptedString) {
      throw new ApolloError("Invalid ID", "INVALID_ENCRYPTED_ID_FORMAT");
    }
    return decryptedString; // value from the client query
  },
});
