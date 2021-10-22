
import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';


export class Regions {
  constructor(
    public nom: string,
    public code: string,
  ){}
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  public regions: Regions[] | any;
  constructor(
    public api: ApiService
  ) { }

  ngOnInit() {
    this.api.getRegions().subscribe(
      res => {
        this.regions = res
      }
    )
  }
 
}
