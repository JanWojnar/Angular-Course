import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DataStorageService} from "../shared/data-storage/data-storage.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() featureSelected = new EventEmitter<string>();

  constructor(private dataStorageService: DataStorageService) {
  }

  ngOnInit(): void {

  }
  collapsed = true;

  onSelect(selection: string){
    this.featureSelected.emit(selection);
  }

  onSave(){
    this.dataStorageService.storeRecipes();
  }

  onFetchData(){
    this.dataStorageService.fetchRecipes().subscribe();
  }
}
