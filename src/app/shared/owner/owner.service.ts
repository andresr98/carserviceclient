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

  getOwnerByDni(dni) : Observable<any> {
    const newAPI = this.ownerAPI + '/search/findByDni?dni=' + dni;
    return this.http.get<any>(newAPI);
  }

  saveOwner(owner: any): Observable<any> {
    let result: Observable<Object>;
    if (owner['href']) {
      result = this.http.put(owner.href, owner);
    } else {
      result = this.http.post(this.ownerAPI, owner);
    }
    return result;
  }

  deleteOwnerByHref(href: any): Observable<any> {
    return this.http.delete<any>(href);
  }
}
