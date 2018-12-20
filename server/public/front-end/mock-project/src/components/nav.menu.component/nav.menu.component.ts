import { Component } from '@angular/core';
import { SharingService } from '../../services/sharing.service/sharing.service';
import { StaticVaruables } from '../../shared/static.varuables';

@Component ({
  selector: 'app-nav-menu-component',
  templateUrl: './nav.menu.component.html'
})

export class NavMenuComponent {
  // Some constId for navigation links
  readonly getProducts = StaticVaruables.Nav_MenuBar_ProductsId;
  readonly getCustomers = StaticVaruables.Nav_MenuBar_CustomersId;
  readonly getInvoices = StaticVaruables.Nav_MenuBar_InvoicesId;

  // Get choosen Id and read data table
  private keyId = '';

  constructor(private sharingService: SharingService) { }

  // Get linkId, and show needeed Database
  private eventListener(event) {
    const target = event.target || event.srcElement || event.currentTarget;
    const idAttr = target.attributes.id;
    const value = idAttr.nodeValue;

    // If elements id not null, set keyId
    if (value != null) {
      this.keyId = value;
    }

    // Send message into TableComponent
    if (this.keyId === this.getProducts) { this.sharingService.changeMessage(StaticVaruables.Get_Products_Api); }
    if (this.keyId === this.getCustomers) { this.sharingService.changeMessage(StaticVaruables.Get_Customers_Api); }
    if (this.keyId === this.getInvoices) { this.sharingService.changeMessage(StaticVaruables.Get_Invoices_Api); }
  }
}
