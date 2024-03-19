import { getInterfaceState, setState, updateBooking } from "./state";
import { Booking, FFAccount } from "./types";

export function apiGetFFInfo() {
  //  mimic API Call
  return {
    ffNumber: "JHF8756J",
    firstName: "John",
    lastName: "Smith"
  } as FFAccount
}

export async function initBooking() {
  setState({
    flightBooking: {}
  });
}

export function bookingDefault() {
  const account = apiGetFFInfo();
  return {
    ffNumber: account.ffNumber,
    firstName: account.firstName,
    lastName: account.lastName,
    fromAirportCode: '',
    toAirportCode: '',
    startDate: '',
    returnDate: '',
    flexDays: 0,
    voucher: '',
  } as Booking;
}

export function accountDefault() {
  return apiGetFFInfo();
}

export async function validateForm(id: string, formName: string) {
  const errors: string[] = [];
  switch (formName) {
    case "form_BookingName": {
      const interfaceState = await getInterfaceState(id);
      const formValue = interfaceState[formName] as Booking;
      if (!formValue.firstName || formValue.firstName.length == 0) {
        errors.push("First name cannot be empty")
      }
      if (!formValue.lastName || formValue.lastName.length == 0) {
        errors.push("Last name cannot be empty")
      }
      await updateBooking({
        firstName: formValue.firstName || "",
        lastName: formValue.lastName || ""
      });
      break;
    }

    case "form_BookingDates": {
      const interfaceState = await getInterfaceState(id);
      const formValue = interfaceState[formName] as Booking;
      if (!formValue.startDate || formValue.startDate.length == 0) {
        errors.push("Start date cannot be empty")
      }
      if (!formValue.returnDate || formValue.returnDate.length == 0) {
        errors.push("Return date cannot be empty")
      }
      if ((formValue.flexDays as any) == 'undefined') {
        errors.push("Flex days should be 0 or more")
      }
      await updateBooking({
        startDate: formValue.startDate || "",
        returnDate: formValue.returnDate || "",
        flexDays: (formValue.flexDays as any) == 'undefined' ? 0 : formValue.flexDays as number
      });
      break;
    }

    case "form_BookingAirports": {
      const interfaceState = await getInterfaceState(id);
      const formValue = interfaceState[formName] as Booking;
      if (!formValue.fromAirportCode || formValue.fromAirportCode.length == 0) {
        errors.push("Starting Airport code cannot be empty")
      }
      if (!formValue.toAirportCode || formValue.toAirportCode.length == 0) {
        errors.push("Destination Airport code cannot be empty")
      }
      await updateBooking({
        fromAirportCode: formValue.fromAirportCode || "",
        toAirportCode: formValue.toAirportCode || ""
      });
      break;
    }
  }
  return errors;
}