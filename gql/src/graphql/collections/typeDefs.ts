import { gql } from "graphql-tag";

export const collectionsTypeDefs = gql`
  type Collectible {
    tokenId: String
    name: String
    image: String
  }

  type Collection {
    name: String
    supply: String
    collectibles: [Collectible]
    pageKey: String
  }

  extend type Query {
    collection(name: String!, limit: Int!, pageKey: String!): Collection
  }
`;
