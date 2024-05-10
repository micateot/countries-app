import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})
export class ByCountryPageComponent implements OnInit {

  public countries: Country[] = [];
  public isLoading: boolean = false;
  public initialValue: string = '';

  constructor(private _countriesService: CountriesService){}
  ngOnInit(): void {
    this.initialValue = this._countriesService.cacheStore.byCountries.term;
    this.countries = this._countriesService.cacheStore.byCountries.countries;
  }

  searchByName(term: string){
    this.isLoading = true;
    this._countriesService.searchByCountryName(term).subscribe( countries => {
      this.isLoading = false;
      this.countries= countries
    })
  }
}
