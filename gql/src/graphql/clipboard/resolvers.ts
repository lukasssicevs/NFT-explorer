import { Resolvers } from "../../../generated/graphql.js";

export const clipboardResolvers: Resolvers = {
  Query: {
    clipboard: async (parent, args, { dataSources }) => {
      const userClipboard = await dataSources.clipboardsSource.getClipboard(
        args.address
      );

      return userClipboard;
    },
  },
  Mutation: {
    addItem: async (parent, args, { dataSources }) => {
      const userClipboard = await dataSources.clipboardsSource.addItem(
        args.address,
        args.item
      );

      return userClipboard;
    },
    updateItem: async (parent, args, { dataSources }) => {
      const userClipboard = await dataSources.clipboardsSource.updateItem(
        args.address,
        args.id,
        args.item
      );

      return userClipboard;
    },
    deleteItem: async (parent, args, { dataSources }) => {
      await dataSources.clipboardsSource.deleteItem(args.address, args.id);

      const userClipboard = await dataSources.clipboardsSource.getClipboard(
        args.address
      );

      return userClipboard;
    },
  },
};
