import React, { useContext } from "react";
import { ethers } from "ethers";
import toast, { Toaster } from "react-hot-toast";
import { WalletContext } from "@/context/WalletProvider";

function Buy({ state }) {
  const { account } = useContext(WalletContext);

  const buyChain = async (e) => {
    e.preventDefault();
    if (account) {
      const { contract } = state;
      const name = document.querySelector("#name").value;
      const message = document.querySelector("#message").value;
      const amount = document.querySelector("#amount").value;
      const convertAmount = {
        value: ethers.utils.parseEther(amount.toString()),
      };
      const transaction = await contract.buyChain(name, message, convertAmount);
      await transaction.wait();
      console.log("Transaction is Successfully");
      toast.success("Transaction is Successfully");
      window.location.reload();
    } else {
      toast.error("Please connect wallet");
    }
  };

  //   save data
  const handleClick = () => {
    const name = document.querySelector("#name").value;
    const message = document.querySelector("#message").value;
    if (name && message) {
      const data = {
        name: name,
        message: message,
      };
      postData(data);
    }
    return;
  };

  const postData = async (data) => {
    const formData = new FormData();
    formData.append("entry.2005620554", data.name);
    formData.append("entry.839337160", data.message);

    fetch(
      "https://docs.google.com/forms/u/1/d/e/1FAIpQLScYZR51Q6P5c1F-mpe0aV9cSsJzxh8_et8Hhmd1dog8a8JtSA/formResponse",
      {
        method: "POST",
        body: formData,
        mode: "no-cors",
      }
    );
  };
  return (
    <>
      <div className="flex justify-center mt-10">
        <div className="w-[350px] bg-[#ffff] p-4">
          <form className="flex flex-col gap-5" onSubmit={buyChain}>
            <div className="p-2 border border-[#2c3e50] rounded-sm">
              <input
                className="text-sm w-full text-black border-0 outline-none"
                id="name"
                name="name"
                type="text"
                placeholder="Please type name"
                required
              />
            </div>

            <div className="p-2 border border-[#2c3e50] rounded-sm">
              <input
                className="text-sm w-full text-black border-0 outline-none"
                id="message"
                name="message"
                type="text"
                placeholder="Please type message"
                required
              />
            </div>

            <div className="p-2 border border-[#2c3e50] rounded-sm">
              <input
                className="text-sm w-full text-black border-0 outline-none"
                id="amount"
                name="amount"
                type="text"
                placeholder="Minimum is 0.01..."
                required
              />
            </div>
            <button
              onClick={handleClick}
              className="outline-0 border border-[#2c3e50] text-black hover:bg-[#000] hover:text-white rounded-sm p-2 uppercase font-sans font-medium"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default Buy;
