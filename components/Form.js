import React, { useEffect, useState } from "react";

function Form() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  useEffect(() => {
    const template = async () => {
      const contractAddress = "";
      const contractABI = "";
      // metamask

      const { ethereum } = window;

      const account = await ethereum.request({
        method: "eth_requestAccounts",
      });

      const provider = new ethers.BrowserProvider(ethereum);

      const signer = await provider.getSigner();
    };

    template();
  }, []);
  return <div>Form</div>;
}

export default Form;
