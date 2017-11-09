import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';

import { EventDispatcher, CommandActionMap, CollectionEvent, MainEvent } from '../common/event/index';
import { IMap, HashMapCollection } from '../common/utils/collections/index';

import { Hero } from '../models/hero.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit, OnDestroy {

  HEROES: Hero[] = [
    { id: 11, name: 'Mr. Nice' },
    { id: 12, name: 'Narco' },
    { id: 13, name: 'Bombasto' },
    { id: 14, name: 'Celeritas' },
    { id: 15, name: 'Magneta' },
    { id: 16, name: 'RubberMan' },
    { id: 17, name: 'Dynama' },
    { id: 18, name: 'Dr IQ' },
    { id: 19, name: 'Magma' },
    { id: 20, name: 'Tornado' }
  ];

  selectedHero: Hero;

  eventDispatcher: EventDispatcher = new EventDispatcher();

  commandActionMap: CommandActionMap = new CommandActionMap();

  constructor() { }

  ngOnInit() {
      // Event Dispatcher Test
      this.eventTest();
      // Collection Test
      this.collectionTest();
      // add event
      this.addEvent();
      // add action
      this.addAction();
  }

  ngOnDestroy() {
      this.removeEvent();
      this.removeAction();
  }

  addEvent() {
      addEventListener(MainEvent.MAIN_COMMAND_EVENT, this.onCommandAction, true);
  }

  addAction() {
      this.commandActionMap.addAction('modify_hero', (data: any) => { console.log('modify_hero : ', data); });
  }

  removeAction() {
    this.commandActionMap.removeAction('modify_hero');
  }

  removeEvent() {
      removeEventListener(MainEvent.MAIN_COMMAND_EVENT, this.onCommandAction, true);
  }

  eventTest() {
      this.eventDispatcher.addEventListener('getUserInfo', (details) => {
        console.log('getUserInfo : ', details);
      });

      this.eventDispatcher.dispatchEvent('getUserInfo', {
          username: 'Kenneth',
          accountType: 'admin'
      });
  }

  collectionTest() {
      const map: IMap = new HashMapCollection();
      console.log('map : ', map);
      map.addEventListener(CollectionEvent.COLLECTION_CHANGE, this.collectionEventHandler);
      map.addItem('John', '212-452-8086');
      map.addItem('James', '718-345-3455');
      map.addItem('Micheal', '917-782-8822');
      map.addItem('Ron', '212-426-8855');
      map.addItem('Mike', '212-255-2436');
      map.addItem('Jenny', '718-344-2433');
      map.addItem('Jack', '917-222-4352');
      map.addItem('Riki', '981-222-1122');
      console.log('All items: ', map.toString());
      console.log('containsKey Jack? ', map.containsKey('Jack'));
      console.log('containsValue 718-344-2433? ', map.containsValue('718-344-2433'));
      console.log('getItemKey 718-344-2433: ', map.getItemKey('718-344-2433'));
      console.log('getItemValue Jenny: ', map.getItemValue('Jenny'));

      map.removeItemAt('Riki');
      console.log('Remove Riki.');
      console.log('getItemValue Riki: ', map.getItemValue('Riki'));
      console.log('Comapre: ', map.compare('Ron', '212-426-8855'));

      map.removeAll();
      console.log('\nAll items: ' + map.toString() + '\n');
  }

  onSelected(event: Hero) {
      this.selectedHero = event;
  }

  private collectionEventHandler = (event: any) => {
      console.log('collectionEventHandler : ', event.kind, event.items);
  }

  private onCommandAction = (event: CustomEvent) => {
      console.log('onCommandAction : ', event);
      this.commandActionMap.executeAction(event.detail.action, event.detail.data);
  }

}
