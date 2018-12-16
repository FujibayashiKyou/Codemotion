import { Component } from '@angular/core';
import { DataService } from '../../services/data.service/data.service';
import { SharingService } from '../../services/sharing.service/sharing.service';
import { StaticVaruables } from '../../shared/static.varuables';

@Component ({
  selector: 'app-nav-menu-component',
  templateUrl: './nav.menu.component.html'
})

export class NavMenuComponent {
  // Some constId for navigation links
  private readonly getProducts = StaticVaruables.NavMenuBarProductsId;
  private readonly getCustomers = StaticVaruables.NavMenuBarCustomersId;
  private readonly getInvoices = StaticVaruables.NavMenuBarInvoicesId;

  // Get choosen Id and read data table
  private keyId = '';
  private message: string;

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
    this.sharingService.changeMessage(this.keyId);
  }
}
