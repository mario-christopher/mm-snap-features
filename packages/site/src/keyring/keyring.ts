import { KeyringSnapRpcClient } from "@metamask/keyring-api";
import { defaultSnapOrigin as snapId } from "../config/snap";

export const keyringClient = new KeyringSnapRpcClient(snapId, window.ethereum);