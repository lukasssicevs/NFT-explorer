"use client";

import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { v4 as uuid } from "uuid";

import { getApolloClient } from "@/gqlClient";
import { CLIPBOARD_QUERY } from "@/src/queries";
import { useAppContext } from "@/src/context";
import ClipboardItem from "./ClipboardItem";
import { ClipboardItem as ClipboardItemType } from "./types";

const ClipboardContainer = () => {
  const {
    state: { userAddress },
  } = useAppContext();

  const client = getApolloClient();
  const { data, loading, error, refetch } = useQuery(CLIPBOARD_QUERY, {
    client,
    variables: { address: userAddress },
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (loading) {
    return (
      <div className="text-center text-2xl w-full block mt-[260px]">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-2xl w-full block mt-[260px]">
        Error: {error.message}
      </div>
    );
  }

  if (data?.clipboard?.items.length === 0) {
    return (
      <div className="text-center text-2xl w-full block mt-[260px]">
        No items in clipboard!
      </div>
    );
  }

  return userAddress ? (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mt-12 w-full font-bold text-gray-400 mb-36">
      {data?.clipboard?.items.map((item: ClipboardItemType) => (
        <ClipboardItem key={uuid()} item={item} refetch={refetch} />
      ))}
    </div>
  ) : (
    <div className="text-center text-2xl w-full mt-[260px]">
      Connect your wallet to use clipboard!
    </div>
  );
};

export default ClipboardContainer;
