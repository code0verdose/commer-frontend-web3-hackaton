export const shortenAddress = (address: `0x${string}` | undefined): string =>
  address ? `${address.slice(0, 3)}...${address.slice(-3)}` : ''
