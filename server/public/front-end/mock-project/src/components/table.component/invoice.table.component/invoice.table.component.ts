import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { SharingService } from '../../../services/sharing.service/sharing.service';
import { StaticVaruables } from '../../../shared/static.varuables';
import { Subscription } from 'rxjs';
import { ICustomer } from '../../../interfaces/ICustomer';
import { IInvoice } from '../../../interfaces/IInvoice';
import { MatTableDataSource, MatDialog, MatPaginator } from '@angular/material';

// Import animation
import {animate, state, style, transition, trigger} from '@angular/animations';
import { DataService } from '../../../services/data.service/data.service';
import { InvoiceNewRecordComponent } from '../../dialog.component/invoice.dialog.new.record.component/invoice.new.record.component';

@Component ({
  selector: 'app-invoice-table-component',
  templateUrl: 'invoice.table.component.html',
  styleUrls: ['invoice.table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class InvoiceTableComponent implements OnInit, OnDestroy {
  // Title of the table
  tableName: string = StaticVaruables.Invoice_Table_Title;
  columnsToDisplay: string[] = StaticVaruables.Invoice_Field_Set;
  data: any = [];

  // Map paginator use for product list
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) { this.paginator = mp; }
  private paginator: MatPaginator;

  // For more detail information about customer
  customer: ICustomer = {id: null, name: '', phone: '', address: '' };
  expandedElement: IInvoice | null;

  // Subscription
  private _updateData: Subscription;
  private _getCustomerData: Subscription;


  constructor(private sharingService: SharingService, private dataService: DataService, private dialog: MatDialog) { }


  // Init table data
  ngOnInit() {
    this._updateData = this.sharingService.data.subscribe( data => {
      this.initDataSource(data);
      console.log('Data in Invoice changed! ', data);
    });
   }

  // Unsubscribe here
  ngOnDestroy() {
    this._updateData.unsubscribe();
    this._getCustomerData.unsubscribe();
  }

  // Init data source with paginator
  initDataSource(data: any) {
    this.data = new MatTableDataSource(data);
    if (this.paginator === undefined || this.data === undefined) { return; }
    this.data.paginator = this.paginator;
  }

  // Get more information about customer via click on Invoice row
  getInformationAboutCustomer(value) {
    this._getCustomerData = this.dataService.getCustomerById(value.customer_id).subscribe(data => {
      this.customer = data;
      console.log('Click: ', this.customer);
    });
  }

  // Add row will create dialog, where we can input data
  addInvoice() { const temp = new InvoiceNewRecordComponent(this.dialog); }
}
