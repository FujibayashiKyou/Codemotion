import { FormControl } from '@angular/forms';
export class CustomValidators {

  static validateCustomerName(c: FormControl) {
    const value = c.value;
    return typeof value === 'string' ? { validateCustomerName: { valid: false } } : { validateCustomerName: { valid: true } };
  }

}


