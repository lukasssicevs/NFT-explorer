import gql from "graphql-tag";

export const CLIPBOARD_QUERY = gql`
  query Query($address: String!) {
    clipboard(address: $address) {
      name
      address
      items {
        id
        name
        image
        comments
      }
    }
  }
`;

export const ADD_CLIPBOARD_ITEM_QUERY = gql`
  mutation Mutation($address: String!, $item: ItemInput!) {
    addItem(address: $address, item: $item) {
      name
      address
      items {
        id
        name
        image
        comments
      }
    }
  }
`;

export const UPDATE_CLIPBOARD_ITEM_QUERY = gql`
  mutation Mutation($address: String!, $id: ID!, $item: ItemInput!) {
    updateItem(address: $address, id: $id, item: $item) {
      name
      address
      items {
        id
        name
        image
        comments
      }
    }
  }
`;

export const DELETE_CLIPBOARD_ITEM_QUERY = gql`
  mutation Mutation($address: String!, $id: ID!) {
    deleteItem(address: $address, id: $id) {
      name
      address
      items {
        id
        name
        image
        comments
      }
    }
  }
`;
