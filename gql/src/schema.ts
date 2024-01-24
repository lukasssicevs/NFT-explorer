import { makeExecutableSchema } from "@graphql-tools/schema";

import { baseTypeDefs } from "./graphql/base/typeDefs.js";
import { collectionsTypeDefs } from "./graphql/collections/typeDefs.js";
import { collectionsResolvers } from "./graphql/collections/resolvers.js";
import { clipboardTypeDefs } from "./graphql/clipboard/typeDefs.js";
import { clipboardResolvers } from "./graphql/clipboard/resolvers.js";
import { mergeDeep } from "apollo-utilities";

export const schema = makeExecutableSchema({
  typeDefs: [baseTypeDefs, collectionsTypeDefs, clipboardTypeDefs],
  resolvers: mergeDeep(collectionsResolvers, clipboardResolvers),
});
