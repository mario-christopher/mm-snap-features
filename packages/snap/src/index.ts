import { handleKeyringRequest } from '@metamask/keyring-api';
import { SeverityLevel, type OnHomePageHandler, type OnInstallHandler, type OnKeyringRequestHandler, type OnRpcRequestHandler, type OnSignatureHandler, type OnUserInputHandler, type UserInputEventType } from '@metamask/snaps-sdk';
import { SampleKeyring } from './keyring/keyring';
import { apiGetFFInfo, initBooking } from './utils';
import { getHomePageUI, getOnInstallUI, getSigInsightUI } from './ui';
import { handleUserInput } from './ui-input';
import { setState } from './state';

const MALICIOUS_CONTRACT = '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC';

/**
 * Handle incoming JSON-RPC requests, sent through `wallet_invokeSnap`.
 *
 * @param args - The request handler args as object.
 * @param args.origin - The origin of the request, e.g., the website that
 * invoked the snap.
 * @param args.request - A validated JSON-RPC request object.
 * @returns The result of `snap_dialog`.
 * @throws If the request method is not valid for this snap.
 */
export const onRpcRequest: OnRpcRequestHandler = async ({
  origin,
  request,
}) => {
  switch (request.method) {
    case 'hello':
    default:
      throw new Error('Method not found.');
  }
};

export const onKeyringRequest: OnKeyringRequestHandler = async ({
  origin,
  request,
}) => {
  return handleKeyringRequest(new SampleKeyring(), request) as any;
};

export const onSignature: OnSignatureHandler = async ({ signature }) => {
  const { signatureMethod, from, data } = signature;

  if (signatureMethod == 'eth_signTypedData_v4') {
    const domain = data.domain;
    if (domain.verifyingContract === MALICIOUS_CONTRACT) {    //  Logic to detect malicious info
      return {
        content: await getSigInsightUI(domain),
        severity: SeverityLevel.Critical,
      };
    }
  }
  return null;
};

export const onInstall: OnInstallHandler = async () => {
  const account = apiGetFFInfo();
  await setState({
    account
  });
  const component = await getOnInstallUI();

  await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'alert',
      content: component,
    },
  });
};

export const onHomePage: OnHomePageHandler = async () => {
  const account = await apiGetFFInfo();
  //  Get this info using an API call to the backend.
  await initBooking();
  const interfaceId = await getHomePageUI();
  return { id: interfaceId };
};

export const onUserInput: OnUserInputHandler = async ({ id, event }) => {
  await handleUserInput(id, event as any);
}