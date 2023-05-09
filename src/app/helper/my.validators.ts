import {AbstractControl, ValidatorFn} from "@angular/forms";

export function myValidator(sentence: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {

    const isMatch = control.value?.toLowerCase() === sentence.toLowerCase()
    return isMatch ? null : { 'matchSentence': true };
  };
}
