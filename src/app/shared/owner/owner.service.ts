import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  ownerAPI = 'https://thawing-chamber-47973.herokuapp.com/owners';
  
  constructor(private http: HttpClient) { }

  getAllOwners() : Observable<any> {
    return this.http.get<any>(this.ownerAPI);
  }
}
