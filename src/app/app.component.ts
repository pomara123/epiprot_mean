import { Component } from '@angular/core';
// Import the DataService
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Define a proteins property to hold our protein data
  proteins: Array<any>;

   // Create an instance of the DataService through dependency injection
   constructor(private _dataService: DataService) {

    // Access the Data Service's getProteins() method we defined
    this._dataService.getProteins()
        .subscribe(res => this.proteins = res);
  }
}
