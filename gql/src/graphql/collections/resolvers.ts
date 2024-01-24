import { Resolvers } from "../../../generated/graphql.js";

export const collectionsResolvers: Resolvers = {
  Query: {
    collection: async (parent, args, { dataSources }) => {
      const collection = await dataSources.collectionsSource.getCollectionNFTs(
        args.name,
        args.limit,
        args.pageKey
      );

      const collectibles = collection.nfts.map((nft) => {
        return {
          id: nft.tokenId,
          name: nft.name,
          image: nft.image.thumbnailUrl || nft.image.cachedUrl,
        };
      });

      return {
        name: args.name,
        supply: collection.nfts[0].contract.totalSupply,
        collectibles,
        pageKey: collection.pageKey,
      };
    },
  },
};
