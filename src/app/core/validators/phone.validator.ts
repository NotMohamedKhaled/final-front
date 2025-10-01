import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Validates that the control value contains only digits (0-9) and at least one digit
export function digitsOnlyValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value as string | null ;
        if (value == null || value === '') {
            return null; // let required handle empties
        }
        const isDigitsOnly = /^[0-9]+$/.test(value);
        return isDigitsOnly ? null : { digitsOnly: true };
    };
}


