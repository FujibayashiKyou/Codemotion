import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, filter, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Product } from 'src/models/Product';
import { Customer } from 'src/models/Customer';
import { Invoice } from '../../models/Invoice';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // Base ApiUrl address
  private base = 'http://localhost:8000/api';
  private products = '/products';
  private customers = '/customers';
  private invoices = '/invoices';

  constructor(private http: HttpClient) { }

  // Get PRODUCTS
  public getProducts(): Observable<Product[]> {
    const completeApiUrl = this.base + this.products;
     return this.http.get<Product[]>(completeApiUrl);
  }

  // Get CUSTOMERS
  public getCustomers(): Observable<Customer[]> {
    const completeApiUrl = this.base + this.customers;
    return this.http.get<Customer[]>(completeApiUrl, {responseType: 'json'});
  }

  // Get INVOICES
  public getInvoices(): Observable<Invoice[]> {
    const completeApiUrl = this.base + this.invoices;
    return this.http.get<Invoice[]>(completeApiUrl);
  }


}
