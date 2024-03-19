import { Address, toChecksumAddress } from "@ethereumjs/util";
import { EthAccountType, EthMethod, Keyring, KeyringAccount, KeyringEvent, KeyringRequest, SubmitRequestResponse, emitSnapKeyringEvent } from "@metamask/keyring-api";
import { Json } from "@metamask/snaps-sdk";
import { v4 as uuid } from 'uuid';

export class SampleKeyring implements Keyring {
  createAccount(options: Record<string, Json> = {}): Promise<KeyringAccount> {

    const privateKeyBuffer = Buffer.from(crypto.getRandomValues(new Uint8Array(32)));
    const privateKey = privateKeyBuffer.toString('hex');
    const address = toChecksumAddress(Address.fromPrivateKey(privateKeyBuffer).toString());

    const account: KeyringAccount = {
      id: uuid(),
      options,
      address,
      methods: [
        EthMethod.PersonalSign,
        EthMethod.Sign,
        EthMethod.SignTransaction,
        EthMethod.SignTypedDataV1,
        EthMethod.SignTypedDataV3,
        EthMethod.SignTypedDataV4,
      ],
      type: EthAccountType.Eoa
    };
    this.#emitEvent(KeyringEvent.AccountCreated, { account });
    return account as any;
  }
  updateAccount(account: KeyringAccount): Promise<void> {
    throw new Error("Method not implemented.");
  }
  exportAccount?(id: string): Promise<Record<string, Json>> {
    throw new Error("Method not implemented.");
  }
  deleteAccount(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  filterAccountChains(id: string, chains: string[]): Promise<string[]> {
    throw new Error("Method not implemented.");
  }
  listAccounts(): Promise<KeyringAccount[]> {
    throw new Error("Method not implemented.");
  }
  getAccount(id: string): Promise<KeyringAccount | undefined> {
    throw new Error("Method not implemented.");
  }

  listRequests?(): Promise<KeyringRequest[]> {
    throw new Error("Method not implemented.");
  }
  getRequest?(id: string): Promise<KeyringRequest | undefined> {
    throw new Error("Method not implemented.");
  }
  submitRequest(request: KeyringRequest): Promise<SubmitRequestResponse> {
    throw new Error("Method not implemented.");
  }
  approveRequest?(id: string, data?: Record<string, Json> | undefined): Promise<void> {
    throw new Error("Method not implemented.");
  }
  rejectRequest?(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async #emitEvent(
    event: KeyringEvent,
    data: Record<string, Json>,
  ): Promise<void> {
    await emitSnapKeyringEvent(snap, event, data);
  }

}