import Image from "next/image";
import { v4 as uuid } from "uuid";

import { IoStar as AddToClipBoardButton } from "react-icons/io5";
import { AVAILABLE_COLLECTIONS } from "./config";
import { AddToClipboardModalState } from "./types";

type CollectionItemListProps = {
  collectibles: {
    name: string;
    image?: string;
  }[];
  selectedCollection: string;
  setSelectedCollection: (collection: string) => void;
  setAddToClipboardModal: (state: AddToClipboardModalState) => void;
};

const CollectionItemList = ({
  collectibles,
  selectedCollection,
  setSelectedCollection,
  setAddToClipboardModal,
}: CollectionItemListProps) => {
  return (
    <>
      <select
        className="w-[200px] m-auto block bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-t-md border-none text-pink-300"
        value={selectedCollection}
        onChange={(e) => setSelectedCollection(e.target.value)}
      >
        {Object.values(AVAILABLE_COLLECTIONS).map((collection) => (
          <option key={uuid()} value={collection}>
            {collection}
          </option>
        ))}
      </select>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
        {collectibles?.map((item: { name: string; image?: string }) => (
          <div
            key={uuid()}
            className="h-[280px] flex flex-col items-center justify-center p-4 font-bold bg-gray-900 hover:bg-gray-800 rounded-md hover:scale-105 transform transition-all cursor-pointer"
          >
            <h2>{item.name}</h2>
            <AddToClipBoardButton
              className="absolute top-0 right-0 m-2 hover:scale-110 transform transition-all text-gray-700 hover:text-pink-600"
              onClick={() =>
                setAddToClipboardModal({
                  open: true,
                  item: {
                    name: item.name,
                    image: item.image,
                  },
                })
              }
            />

            {item.image ? (
              <Image
                src={item.image ?? ""}
                alt={item.name}
                width={160}
                height={160}
                className="object-contain pt-8"
              />
            ) : (
              <div className="w-full h-full flex justify-center items-center mt-8">
                NO PHOTO
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default CollectionItemList;
