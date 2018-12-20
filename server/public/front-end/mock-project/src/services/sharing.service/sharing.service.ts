import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { IInvoiceItem } from '../../interfaces/IInvoiceItem';

@Injectable({
  providedIn: 'root'
})
export class SharingService {
  // Message for Tables Views
  private messageSource = new BehaviorSubject<string>('');
  currentMessage = this.messageSource.asObservable();

  // Message fot Bucket Component
  shopList = new Subject<number[]>();

  constructor() { }

  // Get changed message from NavMenuComponent and send it to TableComponent
  changeMessage(message: string) { this.messageSource.next(message); }

  // Share data with bucket
  sendListId(productsId: number[]) { this.shopList.next(productsId); }
}
