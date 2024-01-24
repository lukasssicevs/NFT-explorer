import { gql } from "graphql-tag";

export const clipboardTypeDefs = gql`
  type Item {
    id: ID
    name: String
    collection: String
    image: String
    comments: String
  }

  type Clipboard {
    name: String
    address: ID
    items: [Item]
  }

  extend type Query {
    clipboard(address: String!): Clipboard
  }

  input ItemInput {
    name: String!
    image: String
    comments: String
  }

  extend type Mutation {
    addItem(address: String!, item: ItemInput!): Clipboard
    updateItem(address: String!, id: ID!, item: ItemInput!): Clipboard
    deleteItem(address: String!, id: ID!): Clipboard
  }
`;
