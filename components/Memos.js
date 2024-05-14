import { showAddress } from "@/utils/Features";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function Memos({ state }) {
  const [memos, setMemos] = useState([]);
  const { contract } = state;
  useEffect(() => {
    const memosMessage = async () => {
      const mess = await contract.getMemos();
      setMemos(mess);
    };
    contract && memosMessage();
  }, [contract]);

  const handleCopy = async (copy) => {
    try {
      navigator.clipboard.writeText(copy);
      toast.success("Copy");
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };
  return (
    <>
      <div className="mt-4 text-center">
        {memos.map((memo, id) => (
          <div className="p-2 bg-[#27ae60] text-white flex gap-4" key={id + 1}>
            <div className="w-1/2 bg-[#2ecc71] p-2 rounded-md">{memo.name}</div>
            <div className="w-1/2 bg-[#2ecc71] p-2 rounded-md">
              {memo.message}
            </div>
            <div className="w-1/2 bg-[#2ecc71] p-2 rounded-md">
              {new Date(memo.timestamp * 1000).toLocaleString()}
            </div>
            <div
              className="w-1/2 bg-[#2ecc71] p-2 rounded-md cursor-pointer"
              onClick={() => handleCopy(memo.from)}
            >
              {showAddress(memo.from)}
            </div>
          </div>
        ))}
      </div>
      <Toaster />
    </>
  );
}

export default Memos;
