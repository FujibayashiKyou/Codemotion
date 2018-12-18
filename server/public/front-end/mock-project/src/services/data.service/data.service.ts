@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  // Warning, we return Observable<any[]>, but if we need we can return Interface. So i left this Interfaces if we need more flexability
  public getData(route: string): Observable<any[]> {

    switch (route) {
      case (StaticVaruables.Get_Products_Api):   { return this.http.get<IProduct[]>(route); }
      case (StaticVaruables.Get_Customers_Api): { return this.http.get<ICustomer[]>(route); }
      case (StaticVaruables.Get_Invoices_Api): { return this.http.get<IInvoice[]>(route); }
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
import { StaticVaruables } from '../../shared/static.varuables';
