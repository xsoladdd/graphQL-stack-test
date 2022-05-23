import { ApolloError } from "apollo-server-express";
import { GraphQLScalarType } from "graphql";
import { encrypt, decrypt } from "../../utils";
import { ast } from "../../types";

const url = "https://imagesotrage.com/";

export const FileUrl = new GraphQLScalarType({
  name: "FileUrl",
  description: "Return the full path of images",
  serialize(value: string): string {
    // check the type of received value
    return url + value; // value sent to the client
  },
  parseValue(value: string): string {
    // check the type of received value
    const urlPath = url + value;
    if (!urlPath) {
      throw new ApolloError("Invalid ID", "INVALID_ENCRYPTED_ID_FORMAT");
    }
    return urlPath; // value from the client input variables
  },
  parseLiteral(ast): string {
    // check the type of received value
    const { value } = ast as ast;
    const decryptedString = url + value;
    if (!decryptedString) {
      throw new ApolloError("Invalid ID", "INVALID_ENCRYPTED_ID_FORMAT");
    }
    return decryptedString; // value from the client query
  },
});
