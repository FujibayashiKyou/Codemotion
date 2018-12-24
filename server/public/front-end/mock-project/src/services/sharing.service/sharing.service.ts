import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { StaticVaruables } from 'src/shared/static.varuables';

@Injectable({
  providedIn: 'root'
})
export class SharingService {
  // Message for Tables Views
  private messageSource = new BehaviorSubject<string>(StaticVaruables.Invoices_Api);
  currentMessage = this.messageSource.asObservable();

  // Data for Product, Customer table
  data = new BehaviorSubject<any>([]);

  // Message fot Bucket Component
  shopList = new Subject<number[]>();

  constructor() { }

  // Get changed message from NavMenuComponent and send it to TableComponent
  changeMessage(message: string) { this.messageSource.next(message); }

  // Handle change data in table: Product, Customer
  changeData(_data: any) { this.data.next(_data); }

  // Share data with bucket
  sendListId(productsId: number[]) { this.shopList.next(productsId); }
}
