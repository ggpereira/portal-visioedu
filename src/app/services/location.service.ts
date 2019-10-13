import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ILocation } from '../shared/models/location';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) {}

  getLocation(): Observable<ILocation> {
    return this.http.get<ILocation>(environment.apiLocation);
  }


  getCidades():  

}
