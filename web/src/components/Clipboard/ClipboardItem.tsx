"use client";

import Image from "next/image";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { IoTrashOutline as DeleteItemButton } from "react-icons/io5";
import { IoCheckmarkOutline as SaveItemButton } from "react-icons/io5";

import { useAppContext } from "@/src/context";
import { getApolloClient } from "@/gqlClient";
import { ClipboardItem as ClipboardItemType } from "./types";
import {
  DELETE_CLIPBOARD_ITEM_QUERY,
  UPDATE_CLIPBOARD_ITEM_QUERY,
} from "@/src/queries";

const ClipboardItem = ({
  item,
  refetch,
}: {
  item: ClipboardItemType;
  refetch: () => void;
}) => {
  const [itemComments, setItemComments] = useState(item.comments);

  const itemCommentsUpdated = itemComments !== item.comments;

  const {
    state: { userAddress },
  } = useAppContext();

  const client = getApolloClient();
  const [updateClipboardItem] = useMutation(UPDATE_CLIPBOARD_ITEM_QUERY, {
    client,
  });
  const [deleteClipboardItem] = useMutation(DELETE_CLIPBOARD_ITEM_QUERY, {
    client,
  });

  const handleUpdateClipboardItem = () => {
    updateClipboardItem({
      variables: {
        address: userAddress,
        id: item.id,
        item: {
          name: item.name,
          image: item.image,
          comments: itemComments,
        },
      },
    });
  };

  const handleDeleteClipboardItem = async () => {
    await deleteClipboardItem({
      variables: {
        address: userAddress,
        id: item.id,
      },
    });

    refetch();
  };

  return (
    <div className="flex flex-col p-4 md:p-8 items-center justify-center bg-gray-900 hover:bg-gray-800 rounded-md transform transition-all cursor-pointer">
      <div className="flex flex-col items-center pt-6 w-full">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            width={100}
            height={100}
            className="w-[100px] h-[100px] object-contain"
          />
        ) : (
          <div className="h-[100px] w-[100px] flex items-center justify-center">
            NO PHOTO
          </div>
        )}
        <div className="flex flex-col items-center md:items-start md:ml-8 md:gap-2 w-full justify-center text-lg text-gray-500 mt-8">
          {item.name}
        </div>
      </div>
      <textarea
        className="w-full bg-gray-900 text-white font-bold py-2 px-4 rounded-md mt-8 mb-6 placeholder-gray-700 h-[80px] text-gray-400"
        value={itemComments}
        placeholder="add comments/remarks here..."
        onChange={(e) => setItemComments(e.target.value)}
      />
      <div className="flex gap-8">
        <DeleteItemButton
          className="hover:scale-110 transform transition-all text-gray-600 hover:text-pink-600"
          size={22}
          onClick={handleDeleteClipboardItem}
        />
        <SaveItemButton
          className={`${
            itemCommentsUpdated
              ? "text-green-400 cursor-pointer hover:transform hover:scale-110"
              : "cursor-not-allowed"
          }  transform transition-all text-gray-600`}
          size={22}
          onClick={handleUpdateClipboardItem}
        />
      </div>
    </div>
  );
};

export default ClipboardItem;
