export const shortenAddress = (address: `0x${string}`): string =>
  `${address.slice(0, 3)}...${address.slice(-3)}`
