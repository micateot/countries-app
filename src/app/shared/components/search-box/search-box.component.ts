import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent {

  @Input()
  public placeholder: string = '';

  @Output()
  public onValue: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('txtSearchInput') searchTerm!: ElementRef<HTMLInputElement>

  emittSearchValue(value: string): void {
    this.onValue.emit(value);
    this.searchTerm.nativeElement.value = '';
  }

  // * Esta manera emite el valor tomandolo desde el ts, en vez de pasarlo directamente desde el html como se ha hecho en le método
  // * que está por encima. Ambas maneras están bien.

  // emittSearchValue(): void {
  //   const term = this.searchTerm.nativeElement.value;
  //   this.onValue.emit(term);
  //   this.searchTerm.nativeElement.value = '';
  // }
}
