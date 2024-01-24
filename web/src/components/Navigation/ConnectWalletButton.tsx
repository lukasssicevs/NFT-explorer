"use client";

import { useEffect } from "react";
import { useSDK, MetaMaskProvider } from "@metamask/sdk-react";

import { useAppContext } from "@/src/context";
import { formatAddress } from "@/src/utils/formatter";

const ConnectWalletButton = () => {
  const { sdk, connected, connecting, account } = useSDK();
  const { setState } = useAppContext();

  const connect = async () => {
    try {
      const account = (await sdk?.connect()) as Array<string>;
      if (!account) return;
      setState({ userAddress: account[0] });
    } catch (err) {
      console.warn(`No accounts found`, err);
    }
  };

  const disconnect = () => {
    if (sdk) {
      sdk.terminate();
      setState({ userAddress: "" });
    }
  };

  useEffect(() => {
    if (account) {
      setState({ userAddress: account });
    } else {
      setState({ userAddress: "" });
    }
  }, [account, setState]);

  return (
    <div className="flex gap-4 px-6 py-8 md:py-0 justify-center">
      <div className="relative">
        {connected ? (
          <div className="flex justify-between items-center gap-6">
            <button className="font-bold text-gray-700">
              {formatAddress(account)}
            </button>
            <button
              onClick={disconnect}
              className="w-44 rounded-md shadow-lg right-0 z-10 top-10 bg-gray-800 block w-full px-4 py-2 text-red-300 font-bold hover:bg-gray-700 text-center"
            >
              Disconnect
            </button>
          </div>
        ) : (
          <button
            disabled={connecting}
            onClick={connect}
            className="w-48 rounded-md shadow-lg right-0 z-10 top-10 bg-gray-800 block px-4 py-2 text-green-300 font-bold hover:bg-gray-700 text-center"
          >
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
};

export default ConnectWalletButton;
