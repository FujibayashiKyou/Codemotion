import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {MatNativeDateModule, MatDialogModule, MAT_SNACK_BAR_DEFAULT_OPTIONS} from '@angular/material';

import { AppComponent } from './app.component';
import { TableComponent } from '../components/table.component/table.component';
import { HttpClientModule } from '@angular/common/http';
import { NavMenuComponent } from 'src/components/nav.menu.component/nav.menu.component';
import { MatTableModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from '../material-module';
// tslint:disable-next-line:max-line-length
import { DialogComponent } from '../components/dialog.component/invoice.dialog.new.record.component/invoice.new.record.component';
import { BucketComponent } from '../components/dialog.component/bucket.component/bucket.component';
import { ProductTableComponent } from 'src/components/table.component/product.table.component/product.table.component';
import { CustomerTableComponent } from 'src/components/table.component/customer.table.component/customer.table.component';
import { InvoiceTableComponent } from 'src/components/table.component/invoice.table.component/invoice.table.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    TableComponent,
    ProductTableComponent,
    CustomerTableComponent,
    InvoiceTableComponent,
    DialogComponent,
    BucketComponent
  ],
  entryComponents: [DialogComponent],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    MatDialogModule,
    DemoMaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
  providers: [ {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 3500}} ],
  bootstrap: [AppComponent]
})
export class AppModule { }
