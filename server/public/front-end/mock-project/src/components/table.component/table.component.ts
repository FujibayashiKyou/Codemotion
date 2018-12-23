@Component({
  selector: 'app-table-component',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class TableComponent implements OnInit, OnDestroy {
  // Varuable to contain Database objects
  tableTitle: string;
  columnsToDisplay: string[];
  expandedElement: IInvoice | null;
  isInvoice = false;

  customer: ICustomer = {id: null, name: '', phone: '', address: '' };

  // Our responce from tables
  public dataSource: any;

  // Message needeet to update table when link from NavMenuBar will pressed
  private message: string;

  // Save Subscription and unsubscripe in OnDestroy
  private _dataService: Subscription;


  constructor(private service: DataService,
     private sharingService: SharingService,
     private dialog: MatDialog) { }

  // When Page start, we need to view Invoice table
  ngOnInit(): void {
    // Default table
    this.updateTable(StaticVaruables.Invoices_Api);

     // Get message from NavMenuBar item clicked. If we have different messages -> Update table
     this.sharingService.currentMessage.subscribe(message => {
      if (this.message !== message && message !== '') {
        this.message = message;
        console.log('Message: ', message);
        // Update table view
        this.updateTable(this.message);
      }
    });
  }

  // Close all subscriptions
  ngOnDestroy(): void {
    this._dataService.unsubscribe();
  }


  // Update table view
  private updateTable(source: string) {
    // Prepare some information about table
    this.prepareTable(source);
    this._dataService = this.service.getData(source).subscribe( data => {
      this.dataSource = new MatTableDataSource(data);
    }, error => {
      console.log('Troubles with GET request. Look at "table.component.ts"', error);
    });
  }

  // Detect kind of table
  private prepareTable(source: string) {
    // Is this Invoice Api Url?
    this.isInvoice = (source === StaticVaruables.Invoices_Api) ? true : false;
    const isProducts = (source === StaticVaruables.Get_Products_Api) ? true : false;

    if (this.isInvoice) {                                        // If it is Invoice table
      this.tableTitle = StaticVaruables.Invoice_Table_Title;
      this.columnsToDisplay = StaticVaruables.Invoice_Field_Set;
    } else if (isProducts) {                                     // If it is Products table
      this.tableTitle = StaticVaruables.Product_Table_Title;
      this.columnsToDisplay = StaticVaruables.Product_Field_Set;
    } else {                                                     // If it is Customer table
      this.tableTitle = StaticVaruables.Customers_Table_Title;
      this.columnsToDisplay = StaticVaruables.Customers_Field_Set;
    }
  }

  // Filter for Customer and Product tables
  applyFilter(filterValue: string) { this.dataSource.filter = filterValue.trim().toLowerCase(); }

  // Add row will create dialog, where we can input data
  addInvoice() { let temp = new InvoiceNewRecordComponent(this.dialog); }

  // Click handler
  getInformationAboutCustomer(value) {
    this.service.getCustomerById(value.customer_id).subscribe(data => {
      this.customer = data;
      console.log('Click: ', this.customer);
    });

  }
}


/* --------------------------------------------------------------------- */
// System imports
import { MatTableDataSource, MatDialog } from '@angular/material';
import { Component, DoCheck, OnInit, OnDestroy } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


// Import Services
import { DataService } from '../../services/data.service/data.service';
import { SharingService } from '../../services/sharing.service/sharing.service';

// Import Vocabulary
import { StaticVaruables } from '../../shared/static.varuables';

// Import animation
import {animate, state, style, transition, trigger} from '@angular/animations';
import { IInvoice } from '../../interfaces/IInvoice';
import { InvoiceNewRecordComponent } from '../dialog.component/invoice.dialog.new.record.component/invoice.new.record.component';
import { Subscription } from 'rxjs';
import { ICustomer } from '../../interfaces/ICustomer';

