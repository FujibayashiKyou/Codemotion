import { Injectable } from '@angular/core';
import { ICustomer } from '../../interfaces/ICustomer';

@Injectable({
  providedIn: 'root'
})
export class CustomerParserService {

  constructor(private data: ICustomer[]) { }

  getCustomerNames() {
    let names = [];

    this.data.forEach(customer => {
      names.push(customer.name);
    });
  }
}
