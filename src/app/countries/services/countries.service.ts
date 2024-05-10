import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {
    byCapital: {term: '', countries: []},
    byCountries: {term: '', countries: []},
    byRegion: {region: '', countries: []}

  }

  constructor(private httpClient: HttpClient) {
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage(){
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore))
  }

  private loadFromLocalStorage(){
    if(!localStorage.getItem('cacheStore')) return;
    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!);
  }

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.httpClient.get<Country[]>(url)
      .pipe(
        catchError( () => of([]) ),
        delay(2000)
      )
  }

  searchCapital(term: string): Observable<Country[]>{
    const url: string = `${this.apiUrl}/capital/${term}`;
    return this.getCountriesRequest(url)
      .pipe(
        tap( countries => this.cacheStore.byCapital = {term, countries}),
        tap( () => this.saveToLocalStorage())
      );
    // return this.httpClient.get<Country[]>(`${this.apiUrl}/capital/${term}`)
    // .pipe(
    //   // tap(countries => console.log('Paso por el tap', countries)),
    //   // map(countries => []),
    //   // tap(countries => console.log('Paso por el tap2', countries))
    //   // catchError( error => {
    //     //   console.log(error);
    //     //   return of([])
    //     // } )
    //     catchError( () => of([]) )
    //   )
  }

  searchByAlphaCode(code: string): Observable<Country | null>{
    return this.httpClient.get<Country[]>(`${this.apiUrl}/alpha/${code}`)
    .pipe(
      map( countries => countries.length>0 ? countries[0] : null),
      catchError( () => of(null) )
    )
  }

  searchByCountryName(term: string): Observable<Country[]>{
    const url: string = `${this.apiUrl}/name/${term}`
    return this.getCountriesRequest(url)
      .pipe(
        tap(countries => this.cacheStore.byCountries = {term, countries}),
        tap( () => this.saveToLocalStorage())
      );
  }

  searchByRegion(term: Region): Observable<Country[]>{
    const url: string = `${this.apiUrl}/region/${term}`;
    return this.getCountriesRequest(url)
      .pipe(
        tap(countries => this.cacheStore.byRegion = {region: term, countries}),
        tap( () => this.saveToLocalStorage())
      );
  }

}
