import React, { createContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import addressABI from "../utils/Chain.json";
import toast, { Toaster } from "react-hot-toast";

export const WalletContext = createContext();

function WalletProvider({ children }) {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  const [account, setAccount] = useState("");

  const connectWallet = async () => {
    const contractAddress = "0x37faEa3d0A818696429E1985008650Ab3c4cF7DD";
    const contractABI = addressABI.abi;

    try {
      if (!window.ethereum) {
        console.log("Install Metamask!");
        return toast.error("Please Install Metamask!");
      }
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });

      setAccount(accounts[0]);

      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      // console.log(contract);

      setState({ provider, signer, contract });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <WalletContext.Provider value={{ account, state, connectWallet }}>
      {children}
      <Toaster />
    </WalletContext.Provider>
  );
}

export default WalletProvider;
