@Injectable({
  providedIn: 'root'
})
export class DataService {
  // Base ApiUrl address
  private base = 'http://localhost:8000/api/';

  // API URL
  private products = 'products';
  private customers = 'customers';
  private invoices = 'invoices';

  constructor(private http: HttpClient) { }


  // Warning, we return Observable<any[]>, but if we need we can return Interface. So i left this Interfaces if we need more flexability
  public getData(route: string): Observable<any[]> {
    // Format complete api url
    const completeApiUrl = this.base + route;

    switch (route) {
      case (this.products):   { return this.http.get<IProduct[]>(completeApiUrl); }
      case (this.customers): { return this.http.get<ICustomer[]>(completeApiUrl); }
      case (this.invoices): { return this.http.get<IInvoice[]>(completeApiUrl); }
      default: return null;
    }
  }
}

/* ------------------------------------------------- */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// My Models import
import { IInvoice } from '../../interfaces/IInvoice';
import { ICustomer } from '../../interfaces/ICustomer';
import { IProduct } from '../../interfaces/IProduct';
