import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharingService {
  private messageSource = new BehaviorSubject<string>('');
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  // Get changed message from NavMenuComponent and send it to TableComponent
  changeMessage(message: string) {
    this.messageSource.next(message);
  }
}
