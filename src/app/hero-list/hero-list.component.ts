import { Component, Input, Output, EventEmitter, OnInit, ViewEncapsulation } from '@angular/core';

import { Hero } from '../models/hero.model';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeroListComponent implements OnInit {
    @Input()
    set heroes(value: Hero[]) {
        this._heroList = value;
    }
    get heroes(): Hero[] {
      return this._heroList;
    }

    @Output() selectionHero: EventEmitter<Hero> = new EventEmitter();

    selectedHero: Hero;

    private _heroList: Hero[];

    constructor() { }

    ngOnInit() {
    }

    onSelect(hero: Hero): void {
        this.selectedHero = hero;
        this.selectionHero.emit(this.selectedHero);
    }

}
