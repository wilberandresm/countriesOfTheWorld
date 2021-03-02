import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { AppComponentService } from 'src/app/services/app.component.service';

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
  open: boolean = false;
  country = []
  favoritiesCountries$: Observable<any> = this.service.favoritesList;

  constructor(private service: AppComponentService) { }

  ngOnInit(): void {
    this.favoritiesCountries$.subscribe((obj) => {
      this.country = obj
    })
  }
  eraserSearch() {
    this.input.nativeElement.value = '';
    this.search.emit(this.input.nativeElement.value);
  }

  openModal() {
    this.open = true;
    this.favoritiesCountries$.subscribe((obj) => {
      this.country = obj
    })

  }
  toggleModal() {
    this.open = false;
  }
  delete(id: number) {
    this.country.splice(id, 1);
    this.service.favoritesList.next(this.country);
  }
}
