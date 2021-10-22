import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild  } from '@angular/core';
import { ApiService } from '../api.service';
import {Observable} from 'rxjs';
import { FormControl } from '@angular/forms';

export class Departements {
  constructor(
    public nom: string,
    public code: string,
    public codeRegion: string,
  ){}
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  control = new FormControl();
  filteredOptions: Observable<string[]> | undefined;
  allDepartments!: Departements[];
  list: any[] | undefined;

  @ViewChild('autocompleteInput') autocompleteInput: ElementRef | undefined;
  @Output() onSelectedOption = new EventEmitter();

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getDepartments().subscribe((posts) => {
      this.allDepartments = posts;
    });

    this.control.valueChanges.subscribe((userInput) => {
      let categoryList = this.filterList(userInput);
      this.list = categoryList;
    });
  }

  filterList(val: any) {
    if (typeof val != 'string') {
      return [];
    }
    if (val === '' || val === null) {
      return [];
    }
    return val
      ? this.allDepartments.filter(
          (s) => s.nom.toLowerCase().indexOf(val.toLowerCase()) != -1
        )
      : this.allDepartments;
  }
}
