import { StaticVaruables } from './../../../shared/static.varuables';
import { Component, OnInit, ViewChild, OnDestroy, Input } from '@angular/core';
import { DataService } from '../../../services/data.service/data.service';
import { SharingService } from '../../../services/sharing.service/sharing.service';
import { IProduct } from '../../../interfaces/IProduct';
import { MatTableDataSource, MatPaginator } from '@angular/material';

import { IInvoiceItem } from '../../../interfaces/IInvoiceItem';
import { IBucket } from '../../../interfaces/IBucket';
import { Subscription } from 'rxjs';
import { IInvoice } from '../../../interfaces/IInvoice';

@Component({
  selector: 'app-bucket-component',
  templateUrl: './bucket.component.html',
  styleUrls: ['./bucket.component.css']
})
export class BucketComponent implements OnInit, OnDestroy {
  private paginator: MatPaginator; // Map paginator use for product list
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) { this.paginator = mp; }
  @Input() customer_id: number;

  private _sharingService: Subscription;
  private _dataService: Subscription;
  idsArray: number[] = [];
  bucket: IBucket[] = [];

  // Form for InvoiceItems
  invoiceItems: IInvoiceItem[] = [];

  // Varuables for table
  dataSource: any;
  _columns = StaticVaruables.Bucket_Information_Fields;

  constructor(private dataService: DataService, private sharingService: SharingService) { }

  // Init shop list, and two observables. 1 -> Shop List | 2 -> Bucket
  ngOnInit(): void {
    this._sharingService = this.sharingService.shopList.subscribe( listChanged => {
      this.idsArray = listChanged;
      console.log('idsArray: ', this.idsArray);

      // Update our bucket.
      this.dataService.updateBucket(this.idsArray);
    });

    // Observe our bucket for updates
    this._dataService = this.dataService.bucket.subscribe( bucket => {
      const data: IProduct[] = [];
      bucket.forEach(node => {
        this.dataService.getProductInfo(node).subscribe(product => {
          data.push(product);
          this.initBucket(data);
        });
      });
    });
  }

  ngOnDestroy(): void {
    const invoice: IInvoice = {id: null,
      customer_id: this.customer_id,
      discount: 0,
      total: this.getTotalCost()
    };

    // Add invoice into database
    this.dataService.addInvoice(JSON.stringify(invoice)).subscribe(data => {
      invoice.id = data.id;
      this.bucket.forEach(item => {
        const invoice_item: IInvoiceItem = {id: null,
          invoice_id: invoice.id,
          product_id: item.product.id,
          quantity: item.quantity
        };

        // Add invoice item into database
        this.dataService.addInvoiceItem(JSON.stringify(invoice_item), invoice.id)
          .subscribe( result => console.log('Adding...', result));
      });
    });

    // Close all Obsrvables objects
    this._sharingService.unsubscribe();
    this._dataService.unsubscribe();
    console.log('Too late');
  }

  // Convert products into IBucket interface. This needeed for quantity prop.
  initBucket(data: IProduct[]) {
    this.bucket = [];

    data.forEach(product => {
      const productPack: IBucket = { product: product,
        quantity: 1,
        total: null
      };
      productPack.total = product.price * productPack.quantity;

      // Push product into bucket
      this.bucket.push(productPack);
    });
    this.initDataSource(this.bucket);
  }

  // Init data table information
  initDataSource(data: IBucket[]) {
    this.dataSource = new MatTableDataSource<IBucket>(data);
    this.initDataSourcePaginator();

    console.log('Bucket: ', this.bucket);
  }

  // Init paginator
  initDataSourcePaginator() { if (this.paginator === undefined) { return; } this.dataSource.paginator = this.paginator; }

  /* ============================= Counters and Total price BLOCK ===================================== */
  // Counter buttons and total count
  // tslint:disable-next-line:max-line-length
  minus(pack) { pack.quantity > 1 ? pack.quantity-- : pack.quantity = 1; pack.total = this.total(pack.quantity, pack.product.price); console.log('Package: ', pack); }
  // tslint:disable-next-line:max-line-length
  plus(pack) { pack.quantity >= 1 ? pack.quantity++ : pack.quantity = 1; pack.total = this.total(pack.quantity, pack.product.price); console.log('Package: ', pack); }
  total(quantity: number, price: number) { return quantity * price; }

  // Get total cost of Order
  getTotalCost() { return this.bucket.map(t => t.total).reduce((acc, value) => acc + value, 0); }
}
