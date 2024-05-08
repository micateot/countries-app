import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit {

  private debouncer: Subject<string> = new Subject<string>()

  @Input()
  public placeholder: string = '';

  @Output()
  public onValue: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  public onDebounce: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('txtSearchInput') searchTerm!: ElementRef<HTMLInputElement>

  ngOnInit(): void {
    this.debouncer
      .pipe(
        debounceTime(1000)
      )
      .subscribe(value=>{
        console.log('debouncer value', value);
        this.onDebounce.emit(value);
      })
  }

  emittSearchValue(value: string): void {
    this.onValue.emit(value);
    this.searchTerm.nativeElement.value = '';
  }

  onKeyPress(value: string){
    // console.log(value);
    this.debouncer.next(value);
  }
  // * Esta manera emite el valor tomandolo desde el ts, en vez de pasarlo directamente desde el html como se ha hecho en le método
  // * que está por encima. Ambas maneras están bien.

  // emittSearchValue(): void {
    //   const term = this.searchTerm.nativeElement.value;
    //   this.onValue.emit(term);
    //   this.searchTerm.nativeElement.value = '';
    // }
}
