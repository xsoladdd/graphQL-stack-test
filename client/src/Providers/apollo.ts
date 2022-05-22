import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
  // uri: "https://48p1r2roz4.sse.codesandbox.io",
  uri: "http://localhost:5500/graphql",
  cache: new InMemoryCache(),
});
