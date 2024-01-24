"use client";

import Image from "next/image";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { IoClose as CloseModalButton } from "react-icons/io5";

import { getApolloClient } from "@/gqlClient";
import { useAppContext } from "@/src/context";
import { ADD_CLIPBOARD_ITEM_QUERY } from "@/src/queries";
import { AddToClipboardModalState } from "./types";

type AddToClipboardModalProps = {
  addToClipboardModal: AddToClipboardModalState;
  setAddToClipboardModal: (state: AddToClipboardModalState) => void;
};

const AddToClipboardModal = ({
  addToClipboardModal,
  setAddToClipboardModal,
}: AddToClipboardModalProps) => {
  const [comments, setComments] = useState("");
  const {
    state: { userAddress },
  } = useAppContext();

  const client = getApolloClient();
  const [addClipboardItem] = useMutation(ADD_CLIPBOARD_ITEM_QUERY, {
    client,
  });

  const addItemToClipboard = () => {
    addClipboardItem({
      variables: {
        address: userAddress,
        item: {
          ...addToClipboardModal.item,
          comments,
        },
      },
    });
    setAddToClipboardModal({ open: false, item: null });
  };

  return (
    <>
      <div
        className="fixed w-full h-full left-0 top-0"
        onClick={() => setAddToClipboardModal({ open: false, item: null })}
      ></div>
      <div className="fixed w-5/6 md:w-3/4 lg:w-2/3 xl:w-1/2 p-4 md:p-8 bg-black border-pink-400 border font-bold top-[500px] md:top-[600px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-1 rounded-lg">
        <CloseModalButton
          className="absolute top-0 right-0 m-6 hover:scale-110 transform transition-all text-pink-400 hover:text-pink-600"
          onClick={() => setAddToClipboardModal({ open: false, item: null })}
          size={32}
          cursor={"pointer"}
        />
        {userAddress ? (
          <>
            <div className="flex flex-col items-center sm:flex-row pt-6 md:p-6 ">
              {addToClipboardModal?.item?.image ? (
                <Image
                  src={addToClipboardModal.item.image}
                  alt={addToClipboardModal.item.name}
                  width={200}
                  height={200}
                  className="w-[200px] h-[200px] lg:h-[300px] lg:w-[300px] object-contain"
                />
              ) : (
                <div className="h-[200px] w-[200px] lg:h-[300px] lg:w-[300px] flex items-center justify-center">
                  NO PHOTO
                </div>
              )}
              <div className="flex flex-col items-center sm:items-start w-full justify-center md:pl-12 text-lg text-gray-500 mt-4 sm:m-8 sm:m-0">
                {addToClipboardModal.item?.name}
              </div>
            </div>
            <textarea
              className="w-full bg-gray-900 hover:bg-gray-800 text-gray-500 hover:text-gray-400 font-bold py-2 px-4 rounded-md mt-8 placeholder-gray-700 h-[120px]"
              onChange={(e) => setComments(e.target.value)}
              placeholder="add comments/remarks here..."
            />
            <button
              className="w-full bg-pink-700 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-md border-none text-center mt-2 md:mt-4"
              onClick={addItemToClipboard}
            >
              ADD TO CLIPBOARD
            </button>
          </>
        ) : (
          <p className="text-center p-16">
            Connect wallet to add items to clipboard!
          </p>
        )}
      </div>
    </>
  );
};

export default AddToClipboardModal;
