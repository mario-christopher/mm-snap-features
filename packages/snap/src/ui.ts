import { form, input, row, heading, image, panel, text, divider, button, copyable } from '@metamask/snaps-sdk';
import { FFAccount } from "./types";
import { getState } from './state';
import { accountDefault, bookingDefault } from './utils';
import logo from "../images/SnappyAir.svg";

const siteUrl = "[Snappy Airlines](https://snappy-air.com/snap)";

export async function getOnInstallUI() {
  const snapState = await getState();
  const account = snapState.account ?? accountDefault();

  const panelComponent = panel([
    ...itemsHeader(),
    ...itemsAccount(account),
    ...itemsFooter(),
  ]);
  return panelComponent;
}

export async function getSigInsightUI(domain: any) {
  const panelComponent = panel([
    heading('Danger!'),
    text(
      `${domain.verifyingContract} has been identified as a malicious verifying contract.`,
    ),
  ]);
  return panelComponent;
}

export async function getHomePageUI() {
  return await snap.request({
    method: 'snap_createInterface',
    params: {
      ui: panel([
        ...itemsHome(),
      ]),
    },
  });
}

export async function updateUI_Home(id: string) {
  const snapState = await getState();
  const account = snapState.account ?? accountDefault();
  await snap.request({
    method: 'snap_updateInterface',
    params: {
      id,
      ui: panel([
        ...itemsHome(),
      ]),
    },
  });
}

export async function updateUI_Account(id: string) {
  const snapState = await getState();
  const account = snapState.account ?? accountDefault();
  await snap.request({
    method: 'snap_updateInterface',
    params: {
      id,
      ui: panel([
        ...itemsAccount(account),
        ...itemsBackToHome(),
      ]),
    },
  });
}

export async function updateUI_FlightHistory(id: string) {
  const snapState = await getState();
  const account = snapState.account ?? accountDefault();
  await snap.request({
    method: 'snap_updateInterface',
    params: {
      id,
      ui: panel([
        ...itemsFlightHistory(account),
        ...itemsBackToHome(),
      ]),
    },
  });
}

export async function updateUI_BookFlight_Name(id: string, errors: string[] = []) {
  const snapState = await getState();
  const booking = snapState.flightBooking ?? bookingDefault();
  await snap.request({
    method: 'snap_updateInterface',
    params: {
      id,
      ui: panel([
        row("Enter the passenger's name", text("Pg: 1 of 5")),
        form({
          name: 'form_BookingName',
          children: [
            input({
              name: 'firstName',
              value: booking.firstName,
              placeholder: "First name"
            }),
            input({
              name: 'lastName',
              value: booking.lastName,
              placeholder: "Last name"
            }),
          ],
        }),

        button({
          value: "Cancel",
          buttonType: 'button',
          name: "btnBookFlight_Name_Cancel",
          variant: 'secondary'
        }),
        button({
          value: "Next >",
          buttonType: 'button',
          name: "btnBookFlight_Name_Next",
          variant: 'secondary'
        }),
        ...itemErrors(errors)
      ]),
    },
  });
}

export async function updateUI_BookFlight_Dates(id: string, errors: string[] = []) {
  const snapState = await getState();
  const booking = snapState.flightBooking ?? bookingDefault();
  await snap.request({
    method: 'snap_updateInterface',
    params: {
      id,
      ui: panel([
        row("Enter the flight dates", text("Pg: 2 of 5")),
        form({
          name: 'form_BookingDates',
          children: [
            input({
              name: 'startDate',
              value: booking.startDate,
              placeholder: "MM/DD/YYYY"
            }),
            input({
              name: 'returnDate',
              value: booking.returnDate,
              placeholder: "MM/DD/YYYY"
            }),
            input({
              name: 'flexDays',
              value: String(booking.flexDays),
              placeholder: '0',
              inputType: 'number'
            }),
          ],
        }),

        button({
          value: "< Back",
          buttonType: 'button',
          name: "btnBookFlight_Dates_Back",
          variant: 'secondary'
        }),
        button({
          value: "Next >",
          buttonType: 'button',
          name: "btnBookFlight_Dates_Next",
          variant: 'secondary'
        }),
        ...itemErrors(errors)
      ]),
    },
  });
}

export async function updateUI_BookFlight_Airports(id: string, errors: string[] = []) {
  const snapState = await getState();
  const booking = snapState.flightBooking ?? bookingDefault();
  await snap.request({
    method: 'snap_updateInterface',
    params: {
      id,
      ui: panel([
        row("Enter the flight airports", text("Pg: 3 of 5")),
        form({
          name: 'form_BookingAirports',
          children: [
            input({
              name: 'fromAirportCode',
              value: booking.fromAirportCode,
              placeholder: "From Airport CODE"
            }),
            input({
              name: 'toAirportCode',
              value: booking.toAirportCode,
              placeholder: "To Airport Code"
            }),
          ],
        }),

        button({
          value: "< Back",
          buttonType: 'button',
          name: "btnBookFlight_Airports_Back",
          variant: 'secondary'
        }),
        button({
          value: "Next >",
          buttonType: 'button',
          name: "btnBookFlight_Airports_Next",
          variant: 'secondary'
        }),
        ...itemErrors(errors)
      ]),
    },
  });
}

export async function updateUI_BookFlight_Review(id: string) {
  const snapState = await getState();
  const booking = snapState.flightBooking ?? bookingDefault();
  await snap.request({
    method: 'snap_updateInterface',
    params: {
      id,
      ui: panel([
        row("Review your flight info.", text("Pg: 4 of 5")),
        row("Passenger Name", text(`${booking.lastName}, ${booking.firstName}`)),
        row("Start Date", text(`${booking.startDate}`)),
        row("Return Date", text(`${booking.returnDate}`)),
        row("Flex Days", text(`${booking.flexDays}`)),
        row("From", text(`${booking.fromAirportCode}`)),
        row("To", text(`${booking.toAirportCode}`)),

        button({
          value: "< Back",
          buttonType: 'button',
          name: "btnBookFlight_Review_Back",
          variant: 'secondary'
        }),
        button({
          value: "Next >",
          buttonType: 'button',
          name: "btnBookFlight_Review_Next",
          variant: 'secondary'
        }),
      ]),
    },
  });
}

export async function updateUI_BookFlight_Voucher(id: string) {
  const snapState = await getState();
  const booking = snapState.flightBooking ?? bookingDefault();
  await snap.request({
    method: 'snap_updateInterface',
    params: {
      id,
      ui: panel([
        row("Congratulations !", text("Pg: 5 of 5")),
        copyable({
          value: "WcQIoTTyelqT2EhT8QWIRiOYik5Ls8UQRmGCSeeAZyg"
        }),
        text(`You can use this Voucher on ${siteUrl} to purchase your Ticket.`),
        divider(),
        button({
          value: "Go to Home page",
          buttonType: 'button',
          name: "btnBackToHome",
          variant: 'secondary'
        }),
      ]),
    },
  });
}

function itemsHeader() {
  return [
    heading("Snappy Airlines"),
    image(logo),
    divider(),
  ];
}

function itemsFooter() {
  return [
    divider(),
    text(
      `Check out more about our Snap at ${siteUrl}`,
    ),
    divider(),
    text(
      "Visit the Snap's **Home page** to book your next flight.",
    ),
  ];
}

function itemsAccount(account: FFAccount) {
  return [
    row(`Customer`, text(`${account.lastName}, ${account.firstName}`)),
    row("Frequent flyer no.", text(`${account.ffNumber}`)),
    row("Member since", text("Nov 12, 2003")),
    row("Miles accumulated", text("67,089")),
  ];
}

function itemsHome() {
  return [
    ...itemsHeader(),
    button({
      value: "Account Info.",
      buttonType: 'button',
      name: "btnAccountInfo",
      variant: 'secondary'
    }),
    button({
      value: "Flight history",
      buttonType: 'button',
      name: "btnFlightHistory",
      variant: 'secondary'
    }),
    button({
      value: "Book flight",
      buttonType: 'button',
      name: "btnBookFlight_Start",
      variant: 'secondary'
    }),
  ];
}

function itemsFlightHistory(account: FFAccount) {
  return [
    text(`Hi ${account.firstName}, your Frequent Flyer Number is`),
    copyable(`${account.ffNumber}`),
    text(`Your last flight was on [01/16/2024 to Cancun](https://snappy-air.com/snap/cancun)`),
    text(
      'Your upcoming flight to Denver is on [02/22/2024](https://snappy-air.com/snap/denver). It is on time.',
    ),
  ];
}

function itemsBackToHome() {
  return [
    button({
      value: "< Back",
      buttonType: 'button',
      name: "btnBackToHome",
      variant: 'secondary'
    }),
  ];
}

function itemErrors(errors: string[]) {
  const panelItems: any[] = [];
  if (errors.length != 0) {
      panelItems.push(divider());
      panelItems.push(heading("Errors"))
      for (const err of errors) {
          panelItems.push(text(err));
      }
  }
  return panelItems;
}