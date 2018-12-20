import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MatTableDataSource, MatPaginator } from '@angular/material';
import { DataService } from '../../../services/data.service/data.service';
import { StaticVaruables } from '../../../shared/static.varuables';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ICustomer } from '../../../interfaces/ICustomer';
import { IProduct } from '../../../interfaces/IProduct';
import { SelectionModel } from '@angular/cdk/collections';
import { IInvoiceItem } from '../../../interfaces/IInvoiceItem';
import { SharingService } from '../../../services/sharing.service/sharing.service';

@Component ({
  selector: 'app-add-record-dialog',
  templateUrl: './invoice.new.record.component.html',
  styleUrls: ['./invoice.new.record.component.css']
})

export class DialogComponent implements OnInit {
  // Work with autofill input
  myControl = new FormControl();
  private paginator: MatPaginator; // Map paginator use for product list
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) { this.paginator = mp; this.initDataSourcePaginator(); }

  // All needeed information from CUSTOMERS DATABASE
  customersData: ICustomer[]; // get data from database
  customer: ICustomer; // use for input and get ICustomer object
  id: any; phone: any; address: any; // use for autofill information about customers
  filteredCustomers: Observable<ICustomer[]>; // dynamic search <customer> by input his name

  // All needeed information from PRODUCTS DATABASE
  isProductChoose = false; // use for display product table-block
  selection = new SelectionModel<IProduct>(true, []); // use for selected products
  productsDataSource: any; // use for format DataSource
  productsColumns = StaticVaruables.Customer_Choose_Products;
  product: IProduct;

  // All needeed information to build InvoiceItem object
  bucket: number[] = [];
  invoice_itemId = 0;


  constructor( public dialogRef: MatDialogRef<DialogComponent>, private service: DataService, private sharingService: SharingService) { }

  // Init Customers database
  ngOnInit(): void {
    this.service.getData(StaticVaruables.Get_Customers_Api).subscribe( data => {
      this.customersData = data;
      this.observeCustomers();
    });

    this.service.getData(StaticVaruables.Get_Products_Api).subscribe( data => {
      // Write Method here!!!
      this.initDataSource(data);
    });
  }

  /* ------------------------------------ BLOCK FOR CUSTOMERS ------------------------------------ */
  // Observe Customers list
  observeCustomers() {
    this.filteredCustomers = this.myControl.valueChanges
    .pipe(
      startWith<string | ICustomer>(''),
      map( value => typeof value === 'string' ? value : value.name),
      map( name => name ? this.findOption(name) : this.customersData.slice())
    );
  }

  // Display function. If we have object -> display object.name, else - nothing display
  displayFn(customer?: ICustomer): string { return customer ? customer.name : undefined; }

  // Custom filter for Autofill <Customer`s name> field
  findOption(name: string): ICustomer[] {
    const filterValue = name.toLowerCase();
    return this.customersData.filter( item =>
      item.name.toLowerCase().indexOf(filterValue) === 0);
  }

  // Button "Cancel" Click
  onNCancelClick(): void { this.dialogRef.close(); }

  // Button "Get Products"
  onGetProductsClick(): void { this.isProductChoose = true; }

  // Handle mouseover of Customers list and if we get mouseout - clear form
  mouseover(event) { this.id = event.id; this.phone = event.phone; this.address = event.address; }
  mouseout() { this.id = undefined; this.phone = undefined; this.address = undefined; }



  /* ------------------------------------ BLOCK FOR PRODUCTS ------------------------------------ */
  // Init DataSource for <products> table
  initDataSource(data: IProduct[]) { this.productsDataSource = new MatTableDataSource<IProduct>(data); }

  // Init paginator
  initDataSourcePaginator() {
    if (this.paginator === undefined) { return; }
    this.productsDataSource.paginator = this.paginator;
  }

  // Is all selected
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.productsDataSource.data.length;
    return numRows === numSelected;
  }

  // Select all rows, otherwise - clear them
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.productsDataSource.data.forEach(row => this.selection.select(row));
  }


  // Button "Done". Send information to <InvoiceFormater>
  onDoneClick() {
    // Check for empty list
    if (this.bucket.length === 0) { console.log('Nothing bought!'); return; }
    // this.sharingService.sendListId(this.bucket); console.log('Message sent!');
  }

  dropToBucket(product) {
    this.selection.toggle(product);
    const isSelect = this.selection.isSelected(product);

    if (isSelect) {
      // Pull products.id into array, for getting information about them.
      this.bucket.push(product.id);
      this.sharingService.sendListId(this.bucket); console.log('Message sent! =->', this.bucket);
    } else {
      let index = 0; // Set up index for search
      this.bucket.map( x => { product.id === x ? this.bucket.splice(index, 1) : index++; });
      this.sharingService.sendListId(this.bucket); console.log('Message sent! =->', this.bucket);
    }

  }

}

/* ----------- Class Helper ---------------------- */
export class InvoiceNewRecordComponent {

  // In constructor get all information about needeed datatables: Invoice, Customers, Products
  constructor(public dialog: MatDialog) { this.openDialog(); }

  // Open dialog
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: 'inherit',
      maxWidth: '640px',
      minWidth: '640px',
      panelClass: 'custom-dialog-container'
    });

    // After dialog close we need to save data
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed. Result => ', result);
    });

  }

}
