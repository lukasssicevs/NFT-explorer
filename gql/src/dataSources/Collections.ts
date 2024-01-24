import { Alchemy, Network } from "alchemy-sdk";
import { COLLECTIONS } from "../config/contracts.js";

const settings = {
  apiKey: "yJOtv_UEzu0UWDTkzBpgZy75BSgFvvx5",
  network: Network.ETH_MAINNET,
};

export class CollectionsSource {
  private alchemy: Alchemy;

  constructor() {
    this.alchemy = new Alchemy(settings);
  }

  async getCollectionNFTs(name: string, limit: number, pageKey: string) {
    const address = COLLECTIONS[name];
    const response = await this.alchemy.nft.getNftsForContract(address, {
      pageSize: limit,
      pageKey,
    });

    return response;
  }
}
