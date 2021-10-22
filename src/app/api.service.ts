import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    public httpClient: HttpClient
  ) {
    
   }
   getDepartments(){
    const depUrl : string = `https://geo.api.gouv.fr/departements`
    return this.httpClient.get<any>(depUrl);
  }
  getRegions(){
    const regUrl : string = 'https://geo.api.gouv.fr/regions'
    return this.httpClient.get<any>(regUrl);
  }
}
