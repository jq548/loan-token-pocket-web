export const getStatusLabel = (status: number) => {
  switch (status) {
    case 0:
      return 'Saved';
    case 1:
      return 'Confirmed';
    case 2:
      return 'Released USDT';
    case 3:
      return 'Loan in progress';
    case 4:
      return 'Redeemed';
    case 5:
      return 'Cleared';
    case 6:
      return 'Releasing';
    case 7: case 8: case 9:
      return 'Clearing';
    case 10:
      return 'Redeeming'
    default:
  }
};

export const getShowAddress = (addr: string) => {
  return addr.substring(0, 7) + '****' + addr.substring(addr.length - 4, addr.length);
};
