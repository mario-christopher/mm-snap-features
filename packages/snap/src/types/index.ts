export type KeyringState = {
  // wallets: Record<string, Wallet>;
  // pendingRequests: Record<string, KeyringRequest>;
  // useSyncApprovals: boolean;
};

export interface FFAccount {
  ffNumber?: string;
  firstName?: string;
  lastName?: string;
}

export interface Booking extends FFAccount {
  startDate?: string;
  returnDate?: string;
  fromAirportCode?: string;
  toAirportCode?: string;
  flexDays?: number;
  voucher?: string;
}

export interface SnapState {
  keyring?: KeyringState;
  flightBooking?: Booking;
  account?: FFAccount;
}
