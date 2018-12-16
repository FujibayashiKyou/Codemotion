import { Product } from '../../models/Product';
import { Component, OnInit, DoCheck } from '@angular/core';
import { DataService } from '../../services/data.service/data.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Customer } from '../../models/Customer';
import { Invoice } from '../../models/Invoice';
import { SharingService } from '../../services/sharing.service/sharing.service';
import { StaticVaruables } from '../../shared/static.varuables';

@Component({
  selector: 'app-table-component',
  templateUrl: './table.component.html',
  styleUrls: []
})

export class TableComponent implements OnInit, DoCheck {
  // Varuable to contain Database objects
  private tableTitle: string;
  private tableHeader: string[];
  private data: any[];

  // Message needeet to update table when link from NavMenuBar will pressed
  private message: string;
  private isUpdate = false;

  constructor(private service: DataService, private sharingService: SharingService) { }

  // When SPA start - we ned to show "INVOICE" data table
  ngOnInit(): void { this.getInvoiceList(); }

  // Here we catch NavMenuBar click, and get Message from it
  ngDoCheck(): void {
    // Get message from NavMenuBar item clicked. If we have different messages -> Update table
    this.sharingService.currentMessage.subscribe(message => {
      if (this.message !== message) {
        this.message = message;

        // Mark table as unupdateble
        this.isUpdate = false;
      }
    });

    // Check if table has been already updated. If YES -> return
    if (this.isUpdate === true) { return; }

    // If table is not update, get Message from NavMenuBar and get neddeed information
    switch (this.message) {
      case(StaticVaruables.NavMenuBarProductsId): {
        this.getProductList();
        break;
      }
      case(StaticVaruables.NavMenuBarCustomersId): {
        this.getCustomerList();
        break;
      }
      case(StaticVaruables.NavMenuBarInvoicesId): {
        this.getInvoiceList();
        break;
      }
    }

    // Set table as updated
    this.isUpdate = true;
  }

  // Get PRODUCTS list
  getProductList() {
    this.tableTitle = 'PRODUCTS';
    this.tableHeader = Product.fieldSet;

    this.service.getProducts().subscribe( (data: Product[]) => {
      console.log('PRODUCTS: ', data);
      this.data = data;
    }, error => {
      console.log('PRODUCTS RECEIVE FROM DATABASE ERROR | ', error);
    });
  }

  // Get CUSTOMERS list
  getCustomerList() {
    this.tableTitle = 'CUSTOMERS';
    this.tableHeader = Customer.fieldSet;

    this.service.getCustomers().subscribe( (data: Customer[]) => {
      console.log('CUSTOMERS: ', data);
      this.data = data;
    }, error => {
      console.log('CUSTOMERS RECEIVE FROM DATABASE ERROR | ', error);
    });
  }

  // Get INVOICES list
  getInvoiceList() {
    this.tableTitle = 'INVOICES';
    this.tableHeader = Invoice.fieldSet;

    this.service.getInvoices().subscribe( (data: Invoice[]) => {
      console.log('INVOICES: ', data);
      this.data = data;
    }, error => {
      console.log('INVOICES RECEIVE FROM DATABASE ERROR | ', error);
    });
  }

  // Safe original order from JSON answer
  public keepOriginalOrder = (a, b) => a.key;
}
