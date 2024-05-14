import React from "react";

export const showAddress = (address) => {
  return `${address?.substring(0, 4)}...${address?.substring(
    address.length - 4,
    address.length - 1
  )}`;
};
