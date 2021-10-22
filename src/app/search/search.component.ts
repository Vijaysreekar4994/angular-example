import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';
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
  departments: string[] = [];
  filteredDepartments!: Observable<string[]>;
  constructor(
    public api: ApiService
  ) { }

  ngOnInit() {
    this.api.getDepartments(this.departments).subscribe(
      res => {
        this.departments = res
        console.log(res, 'departments')
      }
    ),
    this.filteredDepartments = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    console.log("filteredDepartments",this.filteredDepartments);
  }
  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    console.log("departments array",this.departments);
    return this.departments.filter((dep: any) => this._normalizeValue(dep).includes(filterValue));
  }
  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }
}
