import { UserInputEventType } from "@metamask/snaps-sdk";
import { bookingDefault, validateForm } from "./utils";
import { updateBooking } from "./state";
import {
  updateUI_Account,
  updateUI_BookFlight_Airports,
  updateUI_BookFlight_Dates,
  updateUI_BookFlight_Name,
  updateUI_BookFlight_Review,
  updateUI_BookFlight_Voucher,
  updateUI_FlightHistory,
  updateUI_Home
} from "./ui";

export async function handleUserInput(id: string, event: {
  type: UserInputEventType;
  name?: string | undefined;
}) {
  if (event.type === UserInputEventType.ButtonClickEvent) {
    switch (event.name) {
      case "btnAccountInfo": {
        await updateUI_Account(id)
        break;
      }

      case "btnFlightHistory": {
        await updateUI_FlightHistory(id)
        break;
      }

      case "btnBookFlight_Start": {
        await updateBooking(bookingDefault());
        await updateUI_BookFlight_Name(id)
        break;
      }

      //  ===== Book Flight - Names Page
      case "btnBookFlight_Name_Cancel": {
        await updateUI_Home(id)
        break;
      }
      case "btnBookFlight_Name_Next": {
        const errors = await validateForm(id, "form_BookingName");
        if (errors.length == 0) {
          await updateUI_BookFlight_Dates(id)
        } else {
          await updateUI_BookFlight_Name(id, errors)
        }
        break;
      }

      //  ===== Book Flight - Dates Page
      case "btnBookFlight_Dates_Back": {
        await validateForm(id, "form_BookingDates");
        await updateUI_BookFlight_Name(id)
        break;
      }
      case "btnBookFlight_Dates_Next": {
        const errors = await validateForm(id, "form_BookingDates");
        if (errors.length == 0) {
          await updateUI_BookFlight_Airports(id)
        } else {
          await updateUI_BookFlight_Dates(id, errors)
        }
        break;
      }

      //  ===== Book Flight - Airports Page
      case "btnBookFlight_Airports_Back": {
        await validateForm(id, "form_BookingAirports");
        await updateUI_BookFlight_Dates(id)
        break;
      }
      case "btnBookFlight_Airports_Next": {
        const errors = await validateForm(id, "form_BookingAirports");
        if (errors.length == 0) {
          await updateUI_BookFlight_Review(id)
        } else {
          await updateUI_BookFlight_Airports(id, errors)
        }
        break;
      }

      //  ===== Book Flight - Review Page
      case "btnBookFlight_Review_Back": {
        await updateUI_BookFlight_Airports(id)
        break;
      }
      case "btnBookFlight_Review_Next": {
        await updateUI_BookFlight_Voucher(id)
        break;
      }

      case "btnBackToHome": {
        await updateUI_Home(id)
        break;
      }

      default:
        break;
    }
  }
}