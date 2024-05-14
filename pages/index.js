import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { Inter } from "next/font/google";

import { Buy, Memos } from "../components/index";
import { WalletContext } from "@/context/WalletProvider";
import { showAddress } from "@/utils/Features";
import toast, { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { state, account, connectWallet } = useContext(WalletContext);

  const handleCopy = async () => {
    try {
      navigator.clipboard.writeText(account);
      toast.success("Copy");
    } catch (err) {
      console.error("Failed to copy text: ", error);
    }
  };

  return (
    <div className="container mx-auto pt-2">
      <div className="flex justify-center items-center">
        {account ? (
          <div
            className="font-sans font-bold cursor-pointer"
            onClick={handleCopy}
          >
            {showAddress(account)}
          </div>
        ) : (
          <button
            className="border border=[#ecf0f1] hover:bg-[#ecf0f1] hover:text-black rounded-sm p-2 uppercase font-sans font-medium"
            onClick={() => connectWallet()}
          >
            connect Wallet
          </button>
        )}
      </div>
      {account ? (
        <>
          <Buy state={state} />
          <Memos state={state} />
        </>
      ) : (
        ""
      )}
      <Toaster />
    </div>
  );
}
