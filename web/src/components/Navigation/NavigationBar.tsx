"use client";

import { useState } from "react";
import { MetaMaskProvider } from "@metamask/sdk-react";

import PageLinks from "./PageLinks";
import ConnectWalletButton from "./ConnectWalletButton";
import { IoMenuOutline as MobileMenuButton } from "react-icons/io5";

export const NavBar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const host =
    typeof window !== "undefined" ? window.location.host : "defaultHost";

  const sdkOptions = {
    logging: { developerMode: false },
    checkInstallationImmediately: false,
    dappMetadata: {
      name: "NFT Explorer",
      url: host,
    },
  };

  return (
    <>
      <nav className="flex justify-end md:justify-between items-center rounded-xl fixed top-0 border-solid border-2 border-pink-400 inset-x-0 m-4 px-4 bg-black h-[120px] z-20">
        <div
          className={`${
            showMenu ? "fixed" : "hidden"
          } md:flex md:flex-row md:w-full md:items-center md:static top-[140px] border-solid border-2 border-pink-500 inset-x-0 m-4 bg-black rounded-xl md:border-none`}
        >
          <PageLinks setShowMenu={setShowMenu} />
          <MetaMaskProvider debug={false} sdkOptions={sdkOptions}>
            <ConnectWalletButton />
          </MetaMaskProvider>
        </div>
        <MobileMenuButton
          className="block md:hidden"
          size={48}
          color="pink"
          onClick={() => setShowMenu(!showMenu)}
          cursor={"pointer"}
        />
      </nav>
      <div
        className={`${
          showMenu ? "block" : "hidden"
        } fixed top-0 w-full h-full z-10`}
        onClick={() => setShowMenu(false)}
      ></div>
    </>
  );
};

export default NavBar;
