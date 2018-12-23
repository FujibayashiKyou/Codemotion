import { Validators, FormControl } from '@angular/forms';

export class CustomerNameValidator {

  static validCustomer(c: FormControl) {
    if (typeof c.value === 'string') { console.log('This is string'); return ({ validCustomer: false }); }
    else { console.log('This is customer: ', c.value); return null; }
  }

}
