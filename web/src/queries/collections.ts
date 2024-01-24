import { gql } from "@apollo/client";

export const COLLECTIONS_QUERY = gql`
  query Collection($name: String!, $limit: Int!, $pageKey: String!) {
    collection(name: $name, limit: $limit, pageKey: $pageKey) {
      name
      supply
      collectibles {
        tokenId
        name
        image
      }
      pageKey
    }
  }
`;
