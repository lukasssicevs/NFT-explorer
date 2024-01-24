import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";

let client: ApolloClient<any>;

export const getApolloClient = () => {
  if (!client || typeof window === "undefined") {
    client = new ApolloClient({
      uri: "http://localhost:4000",
      cache: new InMemoryCache(),
    });
  }
  return client;
};
