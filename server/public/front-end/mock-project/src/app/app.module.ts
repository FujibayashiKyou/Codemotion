import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TableComponent } from '../components/table.component/table.component';
import { HttpClientModule } from '@angular/common/http';
import { NavMenuComponent } from 'src/components/nav.menu.component/nav.menu.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
