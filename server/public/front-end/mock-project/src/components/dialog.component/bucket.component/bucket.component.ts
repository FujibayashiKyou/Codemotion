import { StaticVaruables } from './../../../shared/static.varuables';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../../services/data.service/data.service';
import { SharingService } from '../../../services/sharing.service/sharing.service';
import { IProduct } from '../../../interfaces/IProduct';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-bucket-component',
  templateUrl: './bucket.component.html',
  styleUrls: ['./bucket.component.css']
})
export class BucketComponent implements OnInit {
  private paginator: MatPaginator; // Map paginator use for product list
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) { this.paginator = mp; }
  idsArray: number[] = [];
  bucket: IProduct[] = [];

  // Varuables for table
  dataSource: any;
  _columns = StaticVaruables.Product_Field_Set;

  constructor(private dataService: DataService, private sharingService: SharingService) { }

  // Init shop list, and two observables. 1 -> Shop List | 2 -> Bucket
  ngOnInit(): void {
    this.sharingService.shopList.subscribe( listChanged => {
      this.idsArray = listChanged;
      console.log('idsArray: ', this.idsArray);

      // Update our bucket.
      this.dataService.updateBucket(this.idsArray);
    });

    // Observe our bucket for updates
    this.dataService.bucket.subscribe( bucket => {
      const data: IProduct[] = [];
      bucket.forEach(node => {
        this.dataService.getProductInfo(node).subscribe(product => {
          data.push(product);
          this.initDataSource(data);
        });
      });
    });
    // let idsArray = this.sharingService.getList();
  }

  initDataSource(data: IProduct[]) { this.dataSource = new MatTableDataSource<IProduct>(data); this.initDataSourcePaginator(); }
  // Init paginator
  initDataSourcePaginator() {
    if (this.paginator === undefined) { return; }
    this.dataSource.paginator = this.paginator;
  }
}



  // // Init datasource for Table
  // fillBucket(shopList: number[], bucket: IProduct[]) {
  //   // Step 1. Detect direction. Or we will add products to bucket, or not
  //   const direction = shopList.length > bucket.length ? true : false;
  //   console.log('Direction is: ', direction);

  //   // Step 2. Create Switch - Case.
  //   switch (direction) {
  //     case (true): {             // If we have to add products do this case
  //       shopList.forEach(node => {
  //         this.dataService.getProductInfo(node).subscribe(product => {
  //           bucket.indexOf(product) === -1 ? bucket.push(product) : console.log('Product already here: ', product);
  //         });
  //       });
  //       break;
  //     }
  //     case (false): {            // If we have to remove products do this case
  //       let newBucket: IProduct[] = [];

  //       shopList.forEach(node => {
  //         this.dataService.getProductInfo(node).subscribe(product => {
  //           bucket.indexOf(product) !== -1 ? console.log('Product was removed: ', product) : console.log('This will never run here');
  //           bucket.indexOf(product) !== -1 ? newBucket.push(product) : console.log('This will never run here');
  //         });
  //       });
  //       // Rewrite our bucket
  //       bucket = newBucket;
  //       break;
  //     }
  //   }
  // }
