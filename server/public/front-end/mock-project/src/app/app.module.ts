import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {MatNativeDateModule, MatDialogModule} from '@angular/material';

import { AppComponent } from './app.component';
import { TableComponent } from '../components/table.component/table.component';
import { HttpClientModule } from '@angular/common/http';
import { NavMenuComponent } from 'src/components/nav.menu.component/nav.menu.component';
import { MatTableModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from '../material-module';
// tslint:disable-next-line:max-line-length
import { DialogComponent } from '../components/dialog.component/invoice.dialog.new.record.component/invoice.new.record.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    TableComponent,
    DialogComponent,
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
