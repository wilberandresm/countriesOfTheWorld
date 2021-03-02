import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { ICountry } from '../../schema/country/country.interface'
import { AppComponentService } from '../../services/app.component.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit, OnChanges {
  @Input() region: string;
  @Input() filterValue: string;

  countries: ICountry[] = [];
  countriesForShow: ICountry[] = [];
  borders = [];
  listBorders: string;
  countryModal: any;
  loading = false;
  favourite = [];
  open: boolean = false;

  constructor(
    private service: AppComponentService,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.getCountry();
  }

  getCountry() {
    this.loading = true;
    this.service.getAllCountries().subscribe(
      (response) => {
        this.countries = response;
        this.countriesForShow = response;
        this.loading = false;
        this.cdr.detectChanges();
      })
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.region && changes.region.currentValue != changes.region.previousValue) {
      this.filterValue = this.filterValue ? this.filterValue : '';
      this.countriesForShow = this.countries.filter(cards => cards.name.toLowerCase().includes(this.filterValue.toLowerCase()))
      this.getFilterCards(this.countriesForShow);
    }
    if (changes.filterValue && changes.filterValue.currentValue != changes.filterValue.previousValue) {
      this.countriesForShow = this.countries.filter(cards => cards.name.toLowerCase().includes(this.filterValue.toLowerCase()))
      this.getFilterCards(this.countriesForShow)
    }

  }
  getFilterCards(cards: any) {
    this.region = this.region ? this.region : 'all';
    if (this.region === 'all') {
      this.countriesForShow = cards;
    } else {
      this.countriesForShow = cards.filter(card => card.region === this.region);
    }
  }
  openModal(item) {
    this.countryModal = item;
    this.open = true;
    this.countries.forEach(value => {
      this.countryModal.borders.forEach(valueBorder => {
        if (value.alpha3Code === valueBorder) {
          this.borders.push(value.name)
        }
      });
    });
    this.listBorders = this.borders.join();

  }
  toggleModal() {
    this.open = false;
    this.borders = [];
  }
  add() {
    if (this.favourite.length) {
      this.favourite.forEach(value => {
        if (value.numericCode !== this.countryModal.numericCode) {
          this.favourite.push(this.countryModal)
        }
      })
    } else {
      this.favourite.push(this.countryModal)
    }

    this.service.favoritesList.next(this.favourite);
  }

}
