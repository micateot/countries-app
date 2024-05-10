import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSubscription?: Subscription;

  @Input()
  public initialValue: string = '';

  @Input()
  public placeholder: string = '';

  @Output()
  public onValue: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  public onDebounce: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('txtSearchInput') searchTerm!: ElementRef<HTMLInputElement>

  ngOnInit(): void {
    this.debouncerSubscription = this.debouncer
      .pipe(
        debounceTime(1000)
      )
      .subscribe(value=>{
        this.onDebounce.emit(value);
      })
  }

  ngOnDestroy(): void {
    this.debouncerSubscription?.unsubscribe()
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
