@Injectable({
  providedIn: 'root'
})
export class DataService {
  httpOptions = { headers: new HttpHeaders( {'Content-Type': 'application/json'}) };
  bucket = new Subject<number[]>();

  constructor(private http: HttpClient) { }

  // Warning, we return Observable<any[]>, but if we need we can return Interface. So i left this Interfaces if we need more flexability
  public getData(route: string): Observable<any[]> {
    switch (route) {
      case (StaticVaruables.Get_Products_Api):   { return this.http.get<IProduct[]>(route).catch(this.handleError); }
      case (StaticVaruables.Get_Customers_Api): { return this.http.get<ICustomer[]>(route).catch(this.handleError); }
      case (StaticVaruables.Invoices_Api): { return this.http.get<IInvoice[]>(route).catch(this.handleError); }
      default: return null;
    }
  }

  // Get Customer by ID
  public getCustomerById(id: number): Observable<ICustomer> {
    return this.http.get<ICustomer>(StaticVaruables.Get_Customers_Api + '/' + id);
  }

  // Get Product by ID
  public getProductInfo(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(StaticVaruables.Get_Products_Api + '/' + id);
  }

  // Update bucket when get new shopList
  updateBucket(list: number[]) { this.bucket.next(list); }

  // ======================== POST SECTION ================================
  // Add invoice in database
  public addInvoice(invoice: string): Observable<IInvoice> {
    return this.http.post<IInvoice>(StaticVaruables.Invoices_Api, invoice, this.httpOptions).catch(this.handleError);
  }

  // Add invoice items in database
  public addInvoiceItem(invoice_item: string, invoiceId: number): Observable<IInvoiceItem> {
    console.log('Receive json: ', invoice_item);
    const apiUrl = StaticVaruables.Invoices_Api + '/' + invoiceId + '/items';
    return this.http.post<IInvoiceItem>(apiUrl, invoice_item, this.httpOptions).catch(this.handleError);
  }


  /* ---------------------------- Handle Errors ---------------------------------- */
  private handleError(errorResponce: HttpErrorResponse) {
    if (errorResponce.error instanceof ErrorEvent) {
      console.log('Client Side Error: ', errorResponce.error.message);
    } else {
      console.log('Server Side Error: ', errorResponce);
    }

    return Observable.throw('Sorry, server is down. Try, please, little bit later...');
  }
}

/* ------------------------------------------------- */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import 'rxjs/add/operator/catch';

// My Models import
import { IInvoice } from '../../interfaces/IInvoice';
import { ICustomer } from '../../interfaces/ICustomer';
import { IProduct } from '../../interfaces/IProduct';
import { StaticVaruables } from '../../shared/static.varuables';
import { IInvoiceItem } from 'src/interfaces/IInvoiceItem';
import { catchError } from 'rxjs/operators';

