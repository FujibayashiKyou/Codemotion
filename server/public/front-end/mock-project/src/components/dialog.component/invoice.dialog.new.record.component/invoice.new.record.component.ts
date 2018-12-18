import { Component, Inject, OnInit, AfterViewInit, AfterContentChecked } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataService } from '../../../services/data.service/data.service';
import { StaticVaruables } from '../../../shared/static.varuables';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ICustomer } from '../../../interfaces/ICustomer';

@Component ({
  selector: 'app-add-record-dialog',
  templateUrl: './invoice.new.record.component.html',
  styleUrls: ['./invoice.new.record.component.css']
})

export class DialogComponent implements OnInit, AfterContentChecked {
  // Work with autofill input
  myControl = new FormControl();
  filteredCustomers: Observable<ICustomer[]>;
  data: ICustomer[];

  // Selected Customer
  customer: ICustomer;
  phone: any;
  id: any;
  address: any;


  constructor( public dialogRef: MatDialogRef<DialogComponent>, private service: DataService) { }

  // Init Customers database
  ngOnInit(): void {
    this.service.getData(StaticVaruables.Get_Customers_Api).subscribe( data => {
      this.data = data;
      this.observeCustomers();
    });
  }

  ngAfterContentChecked(): void {
  }

  // Observe Customers list
  observeCustomers() {
    this.filteredCustomers = this.myControl.valueChanges
    .pipe(
      startWith<string | ICustomer>(''),
      map( value => typeof value === 'string' ? value : value.name),
      map( name => name ? this.findOption(name) : this.data.slice())
    );
  }

  // Display function. If we have object -> display object.name, else - nothing display
  displayFn(customer?: ICustomer): string {
    return customer ? customer.name : undefined;
  }

  // Custom filter for Autofill <Customer`s name> field
  findOption(name: string): ICustomer[] {
    const filterValue = name.toLowerCase();
    return this.data.filter( item =>
      item.name.toLowerCase().indexOf(filterValue) === 0);
  }

  // Button Cancel Click
  onNoClick(): void { this.dialogRef.close(); }

  // Button O.K. Click
  onYesClick(): void {
    if (this.customer.id !== undefined) {
      console.log('Id: ', this.customer.id,
        ' Name: ', this.customer.name,
        ' Address: ', this.customer.address);

        this.id = this.customer.id;
        this.phone = this.customer.phone;
        this.address = this.customer.address;
    } else { console.log('Error!'); }

    // this.dialogRef.close();
  }
}

/* ----------- Class Helper ---------------------- */
export class InvoiceNewRecordComponent {

  // In constructor get all information about needeed datatables: Invoice, Customers, Products
  constructor(public dialog: MatDialog) {
    this.openDialog();
  }


  // Open dialog
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '800'
    });

    // After dialog close we need to save data
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed. Result => ', result);
    });

  }

}
