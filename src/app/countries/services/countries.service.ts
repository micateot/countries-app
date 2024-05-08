import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1'

  constructor(private httpClient: HttpClient) { }

  searchCapital(term: string): Observable<Country[]>{
    return this.httpClient.get<Country[]>(`${this.apiUrl}/capital/${term}`)
    .pipe(
      // tap(countries => console.log('Paso por el tap', countries)),
      // map(countries => []),
      // tap(countries => console.log('Paso por el tap2', countries))
      // catchError( error => {
        //   console.log(error);
        //   return of([])
        // } )
        catchError( () => of([]) )
      )
  }

  searchByAlphaCode(code: string): Observable<Country | null>{
    return this.httpClient.get<Country[]>(`${this.apiUrl}/alpha/${code}`)
    .pipe(
      map( countries => countries.length>0 ? countries[0] : null),
      catchError( () => of(null) )
    )
  }
  searchByCountryName(term: string): Observable<Country[]>{
    return this.httpClient.get<Country[]>(`${this.apiUrl}/name/${term}`)
      .pipe(
        catchError( () => of([]) )
      )
  }

  searchByRegion(term: string): Observable<Country[]>{
    return this.httpClient.get<Country[]>(`${this.apiUrl}/region/${term}`)
      .pipe(
        catchError( () => of([]) )
      )
  }

}