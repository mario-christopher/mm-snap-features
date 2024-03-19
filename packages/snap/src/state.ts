import { ManageStateOperation } from "@metamask/snaps-sdk";
import { Booking, SnapState } from "./types";

/**
 * Get the snap state.
 * @returns Snap State.
 */
export async function getState() {
  const snapState = await snap.request({
    method: 'snap_manageState',
    params: {
      operation: ManageStateOperation.GetState,
      encrypted: false,
    },
  });
  return (snapState ?? {}) as SnapState;
}

/**
 * Set the snap state.
 * @param state - The new state to set.
 */
export async function setState(state: SnapState) {
  try {
    const currentState = await getState();
    const newState = {
      ...currentState,
      ...state,
    } as SnapState;

    await snap.request({
      method: 'snap_manageState',
      params: {
        operation: ManageStateOperation.UpdateState,
        newState: newState as any,
        encrypted: false,
      },
    });
  } catch (error) {
    console.error(`Failed to set the Snap's state`);
  }
}

export async function updateBooking(info: Booking) {
  const currentState = await getState();
  const updatedBooking = {
    ...currentState.flightBooking,
    ...info
  };
  await setState({
    flightBooking: updatedBooking
  });
}

export async function getInterfaceState(id: string) {
  const state = await snap.request({
    method: 'snap_getInterfaceState',
    params: {
      id,
    },
  });
  return state;
}