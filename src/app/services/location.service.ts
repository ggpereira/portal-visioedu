import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ILocation } from '../shared/models/location';
import { fromEventPattern } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) {}

  getLocation(): Observable<ILocation> {
    return this.http.get<ILocation>('http://ip-api.com/json?fields=status,message,country,region,regionName,city');
  }
}
