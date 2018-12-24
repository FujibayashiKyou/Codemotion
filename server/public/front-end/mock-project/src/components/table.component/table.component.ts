@Component({
  selector: 'app-table-component',
  templateUrl: './table.component.html'
})

export class TableComponent implements OnInit, OnDestroy {

  // Semaphore
  isInvoice = false;
  isProduct = false;

  // Save Subscription and unsubscripe in OnDestroy
  private _dataService: Subscription;
  private _sharingService: Subscription;


  constructor(private service: DataService,
     private sharingService: SharingService ) { }

  // When Page start, we need to view Invoice table
  ngOnInit(): void {
    // Get message from NavMenuBar item clicked. If we have different messages -> Update table
    this._sharingService = this.sharingService.currentMessage.subscribe(message => {
      this.isInvoice = (message === StaticVaruables.Invoices_Api) ? true : false;
      this.isProduct = (message === StaticVaruables.Get_Products_Api) ? true : false;

      console.log('Message: ', message);

      // Update table view
      this._dataService = this.service.getData(message).subscribe(data => {

        // Sharing data to other components
        this.sharingService.changeData(data);
      }, error => {
        console.log('Troubles with GET request. Look at "table.component.ts"', error);
      });
    });
  }


  // Close all subscriptions
  ngOnDestroy(): void {
    this._sharingService.unsubscribe();
    this._dataService.unsubscribe();
  }

}


import { Component, OnInit, OnDestroy } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Subscription } from 'rxjs';

// Import Services
import { DataService } from '../../services/data.service/data.service';
import { SharingService } from '../../services/sharing.service/sharing.service';

// Import Vocabulary
import { StaticVaruables } from '../../shared/static.varuables';




