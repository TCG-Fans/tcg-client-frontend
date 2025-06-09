export const shorten = (addr: string) =>
    addr.slice(0, 6) + '...' + addr.slice(addr.length - 4);
