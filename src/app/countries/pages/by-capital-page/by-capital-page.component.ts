import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [
  ]
})
export class ByCapitalPageComponent implements OnInit{

  public countries: Country[] = [];
  public isLoading: boolean = false;
  public initialValue: string = '';

  constructor(private _countriesService: CountriesService){}

  ngOnInit(): void {
    this.countries = this._countriesService.cacheStore.byCapital.countries;
    this.initialValue = this._countriesService.cacheStore.byCapital.term;
    console.log('initialValue', this.initialValue);

  }

  searchByCapital( term: string): void {
    this.isLoading = true;
    this._countriesService.searchCapital(term).subscribe( countries =>
      {
        this.countries = countries;
        this.isLoading = false;
      }
    );
  }

}
