import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { CollectionsSource } from "./dataSources/Collections.js";
import { ClipboardsSource } from "./dataSources/Clipboards.js";
import { schema } from "./schema.js";

export interface Context {
  dataSources: {
    collectionsSource: CollectionsSource;
    clipboardsSource: ClipboardsSource;
  };
}

const server = new ApolloServer<Context>({
  schema,
  introspection: true,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    return {
      dataSources: {
        collectionsSource: new CollectionsSource(),
        clipboardsSource: new ClipboardsSource(),
      },
    };
  },
});

console.log(`🚀  Server ready at: ${url}`);
