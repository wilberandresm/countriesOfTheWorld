import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-search-country',
  templateUrl: './search-country.component.html',
  styleUrls: ['./search-country.component.scss']
})
export class SearchCountryComponent implements OnInit {
  @Output() search: EventEmitter<string> = new EventEmitter();
  @Output() region: EventEmitter<string> = new EventEmitter();
  @ViewChild('input') input;

  selected: string = '';

  constructor() { }

  ngOnInit(): void {
  }
  eraserSearch() {
    this.input.nativeElement.value = '';
    this.search.emit(this.input.nativeElement.value);
  }

}
