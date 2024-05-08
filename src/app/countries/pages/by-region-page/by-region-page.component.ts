import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

type Region = 'Africa'|'Americas'|'Asia'|'Europe'|'Oceania';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent {

  public countries: Country[] = [];
  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public selectedRegion?: Region;

  constructor(private _countriesService: CountriesService){}

  searchByRegion( term: Region): void{
    this.selectedRegion = term;
    this._countriesService.searchByRegion(term).subscribe( countries => this.countries = countries);
  }
}
