import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Subject, Observable } from 'rxjs';
import { ICountry } from '../schema/country/country.interface'

@Injectable({
  providedIn: 'root'
})
export class AppComponentService {
  favoritesList = new Subject<any[]>();

  constructor(
    private http: HttpClient
  ) { }

  getAllCountries(): Observable<ICountry[]> {
    return this.http.get<ICountry[]>('https://restcountries.eu/rest/v2/all');
  }
}
