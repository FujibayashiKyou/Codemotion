import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { StaticVaruables } from '../../../shared/static.varuables';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { SharingService } from '../../../services/sharing.service/sharing.service';
import { Subscription } from 'rxjs';

@Component ({
  selector: 'app-customer-table-component',
  templateUrl: 'customer.table.component.html',
  styleUrls: ['customer.table.component.css']
})

export class CustomerTableComponent implements OnInit, OnDestroy {
  // Title of the table
  tableName: string = StaticVaruables.Customers_Table_Title;
  columnsToDisplay: string[] = StaticVaruables.Customers_Field_Set;
  data: any = [];

  // Map paginator use for product list
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) { this.paginator = mp; }
  private paginator: MatPaginator;

  // Service ref, for unsubscribe
  private _updateData: Subscription;

  constructor(private sharingService: SharingService) { }

  // Init table data and observables
  ngOnInit() {
    this._updateData = this.sharingService.data.subscribe( data => {
      this.initDataSource(data);
      console.log('Data in CUstomers changed! ', data);
    });
   }

  // Unsubscribe here
  ngOnDestroy() { this._updateData.unsubscribe(); }

  // Init data source with paginator
  initDataSource(data: any) {
    this.data = new MatTableDataSource(data);
    if (this.paginator === undefined || this.data === undefined) { return; }
    this.data.paginator = this.paginator;
  }

  // Filter for Customer and Product tables
  applyFilter(filterValue: string) { this.data.filter = filterValue.trim().toLowerCase(); }

}
