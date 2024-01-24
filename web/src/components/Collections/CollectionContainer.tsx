"use client";

import { useState } from "react";
import { useQuery } from "@apollo/client";
import { IoArrowDown as LoadMoreButton } from "react-icons/io5";

import { getApolloClient } from "@/gqlClient";
import { COLLECTIONS_QUERY } from "@/src/queries";
import CollectionItemList from "./CollectionItemList";
import AddToClipboardModal from "./AddToClipboardModal";
import { AVAILABLE_COLLECTIONS, PAGE_SIZE } from "./config";
import { AddToClipboardModalState } from "./types";

const CollectionContainer = () => {
  const [selectedCollection, setSelectedCollection] = useState(
    AVAILABLE_COLLECTIONS.CryptoPunks
  );
  const [addToClipboardModal, setAddToClipboardModal] =
    useState<AddToClipboardModalState>({
      open: false,
      item: null,
    });

  const client = getApolloClient();
  const { data, loading, error, fetchMore } = useQuery(COLLECTIONS_QUERY, {
    client,
    variables: {
      name: selectedCollection,
      limit: PAGE_SIZE,
      pageKey: "",
    },
  });

  const loadMoreItems = () => {
    const { pageKey } = data.collection;

    fetchMore({
      variables: {
        pageKey,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        fetchMoreResult.collection.collectibles = [
          ...prev.collection.collectibles,
          ...fetchMoreResult.collection.collectibles,
        ];

        return fetchMoreResult;
      },
    });
  };

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="w-full">
      <CollectionItemList
        collectibles={data.collection.collectibles}
        selectedCollection={selectedCollection}
        setSelectedCollection={setSelectedCollection}
        setAddToClipboardModal={setAddToClipboardModal}
      />
      {addToClipboardModal.open && (
        <AddToClipboardModal
          addToClipboardModal={addToClipboardModal}
          setAddToClipboardModal={setAddToClipboardModal}
        />
      )}
      <LoadMoreButton
        className="text-5xl m-auto mt-12 block text-gray-800 hover:text-gray-600 cursor-pointer"
        onClick={loadMoreItems}
      />
    </div>
  );
};

export default CollectionContainer;
