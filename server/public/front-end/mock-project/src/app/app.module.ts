import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material';

import { AppComponent } from './app.component';
import { TableComponent } from '../components/table.component/table.component';
import { HttpClientModule } from '@angular/common/http';
import { NavMenuComponent } from 'src/components/nav.menu.component/nav.menu.component';
import { MatTableModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from '../material-module';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    DemoMaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
