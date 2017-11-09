import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

import { MainEvent } from '../common/event/index';

import { Hero } from '../models/hero.model';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeroDetailComponent implements OnInit {

    @Input()
    color: string;

    @Input()
    set hero(value: Hero) {
        this._hero = value;
    }
    get hero(): Hero {
        return this._hero;
    }

    private _hero: Hero;

    constructor() { }

    ngOnInit() {
    }

    onEnter(event: any) {
        console.log('onEnter : ', event, this._hero);
        const that = this;
        const sendEvent: MainEvent = {
            event: event,
            action: 'modify_hero',
            target: that,
            data: this._hero
        };
        dispatchEvent( new CustomEvent(MainEvent.MAIN_COMMAND_EVENT, {detail: sendEvent}) );
    }

}
