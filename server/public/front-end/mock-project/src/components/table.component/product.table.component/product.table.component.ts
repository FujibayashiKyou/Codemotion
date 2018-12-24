import { Component, Input, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Subject, Subscription } from 'rxjs';
import { SharingService } from '../../../services/sharing.service/sharing.service';
import { StaticVaruables } from '../../../shared/static.varuables';

@Component ({
  selector: 'app-product-table-component',
  templateUrl: 'product.table.component.html',
  styleUrls: ['product.table.component.css']
})

export class ProductTableComponent implements OnInit, OnDestroy {
  // Title of the table
  tableName: string = StaticVaruables.Product_Table_Title;
  columnsToDisplay: string[] = StaticVaruables.Product_Field_Set;
  data: any = [];

  // Map paginator use for product list
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) { this.paginator = mp; }
  private paginator: MatPaginator;

  // Service ref, for unsubscribe
  private _updateData: Subscription;

  // Constructor
  constructor(private sharingService: SharingService) { }

  // Init table and handle data update
  ngOnInit() {
    this._updateData = this.sharingService.data.subscribe( data => {
      this.initDataSource(data);
      console.log('Data in Products changed! ', data);
    });
  }

  // Unsubscribe all Observables here
  ngOnDestroy() {
    this._updateData.unsubscribe();
  }


  // Init data source with paginator
  initDataSource(data: any) {
    this.data = new MatTableDataSource(data);
    if (this.paginator === undefined || this.data === undefined) { return; }
    this.data.paginator = this.paginator;
  }

  // Filter for Customer and Product tables
  applyFilter(filterValue: string) { this.data.filter = filterValue.trim().toLowerCase(); }

}
