import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MatTableDataSource, MatPaginator, ErrorStateMatcher, MatSnackBar } from '@angular/material';
import { DataService } from '../../../services/data.service/data.service';
import { StaticVaruables } from '../../../shared/static.varuables';
import { FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ICustomer } from '../../../interfaces/ICustomer';
import { IProduct } from '../../../interfaces/IProduct';
import { SelectionModel } from '@angular/cdk/collections';
import { SharingService } from '../../../services/sharing.service/sharing.service';
import { CustomerNameValidator } from '../../../shared/validators/customer.validator';
import { CurrencyPipe, getCurrencySymbol } from '@angular/common';

@Component ({
  selector: 'app-add-record-dialog',
  templateUrl: './invoice.new.record.component.html',
  styleUrls: ['./invoice.new.record.component.css']
})

export class DialogComponent implements OnInit {
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) { this.paginator = mp; this.initDataSourcePaginator(); }
  private paginator: MatPaginator; // Map paginator use for product list


  constructor( public dialogRef: MatDialogRef<DialogComponent>,
    private service: DataService, private sharingService: SharingService, public snackBar: MatSnackBar) { }
  // Work with autofill input

  myControl = new FormControl('', [ Validators.required, Validators.pattern(''), CustomerNameValidator.validCustomer ] );

  // All needeed information from CUSTOMERS DATABASE
  customersData: ICustomer[]; // get data from database
  customer: ICustomer = {id: null, name: '', phone: '', address: ''};
  filteredCustomers: Observable<ICustomer[]>; // dynamic search <customer> by input his name

  // All needeed information from PRODUCTS DATABASE
  isProductChoose = false; // use for display product table-block
  isItCustomer = false;
  selection = new SelectionModel<IProduct>(true, []); // use for selected products
  productsDataSource: any; // use for format DataSource
  productsColumns = StaticVaruables.Customer_Choose_Products;
  product: IProduct;

  // All needeed information to build InvoiceItem object
  bucket: number[] = [];
  invoice_itemId = 0;

  // Total count
  total = 0;

  // Init Customers database
  ngOnInit(): void {
    // Protect dialog from missclick
    this.dialogRef.disableClose = true;

    this.service.getData(StaticVaruables.Get_Customers_Api).subscribe( data => {
      this.customersData = data;
      this.observeCustomers();
    });

    this.service.getData(StaticVaruables.Get_Products_Api).subscribe( data => {
      this.initDataSource(data);
    });
  }

  /* ------------------------------------ BLOCK FOR CUSTOMERS ------------------------------------ */
  // Observe Customers list
  observeCustomers() {
    this.filteredCustomers = this.myControl.valueChanges
    .pipe(
      startWith<string | ICustomer>(''),
      map( value => {
        if (typeof value === 'string') {
          this.resetCustomersValues();
          return value;
        } else {
          this.setCustomersValues(value);
          return value.name; }
      }),
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
  resetCustomersValues() { this.customer.id = null; this.customer.phone = ''; this.customer.address = ''; this.isItCustomer = false; }
  setCustomersValues(_: ICustomer) { this.customer.id = _.id; this.customer.phone = _.phone; this.customer.address = _.address; this.isItCustomer = true; }
  mouseover(customer) { this.setCustomersValues(customer); }
  mouseout() {this.resetCustomersValues(); }
  onkeypress(customer) { console.log('customer: ', customer); }

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
    this.dialogRef.close();
  }

  // Catch selected item, and drop it into bucket
  dropToBucket(product) {
    this.selection.toggle(product);
    const isSelect = this.selection.isSelected(product);

    if (isSelect) {
      // Pull products.id into array, for getting information about them.
      this.bucket.push(product.id);
      this.sharingService.sendListId(this.bucket); console.log('Message sent! =->', this.bucket);

      // Snack-Bar
      this.total += product.price;
      this.snackBar.open('Drop to bucket: ', product.name + ( ' (Total: ' + this.total.toFixed(2) + ' USD )'));

    } else {
      let index = 0; // Set up index for search
      this.bucket.map( x => { product.id === x ? this.bucket.splice(index, 1) : index++; });
      this.sharingService.sendListId(this.bucket); console.log('Message sent! =->', this.bucket);

      // Snack-Bar
      this.total -= product.price;
      this.snackBar.open('Remove from bucket: ', product.name + ( ' (Total: ' + this.total.toFixed(2) + ' USD )'));
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
