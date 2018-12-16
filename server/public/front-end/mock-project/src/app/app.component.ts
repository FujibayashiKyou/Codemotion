import { Component } from '@angular/core';
import { DataService } from '../services/data.service/data.service';
import { SharingService } from '../services/sharing.service/sharing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private service: DataService, private sharingService: SharingService) { }

}
