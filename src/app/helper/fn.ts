import {DatePipe} from "@angular/common";

export function getCurrentDate() {
  const datePipe = new DatePipe('en-US');
  const currentDateFormatted = datePipe.transform(new Date(), 'yyyy-MM-dd');
  return currentDateFormatted ?? Date.now().toString()

}
