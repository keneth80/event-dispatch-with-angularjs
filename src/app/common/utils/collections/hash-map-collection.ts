import { EventDispatcher } from '../../event/event-dispatcher';
import { CollectionEventKind, CollectionEvent } from '../../event/event.constant';
import { IMap } from './map.interface';

export class HashMapCollection implements IMap {

    private _map: any;
    private _eventDispatcher: EventDispatcher;

    constructor() {
        this._map = {};
        this._eventDispatcher = new EventDispatcher();
    }

    addItem(key: any, value: any) {
        this._map[key] = value;
        this.triggerDispatchEvent(new Array({key: key, value: value}), CollectionEventKind.ADD);
    }

    removeItemAt(key: any): void {
        this.triggerDispatchEvent(new Array({key: key, value: this._map[key]}), CollectionEventKind.REMOVE);
        delete this._map[key];
    }

    containsKey(key: any): boolean {
        return this._map[key] !== null;
    }

    containsValue(value: any): boolean {
        let result: boolean;
        for ( const key in this._map ) {
            if (this._map[key] === value) {
                result = true;
                break;
            }
        }
        return result;
    }

    getKeys(): Array<any> {
        const keys: Array<any> = [];

        for (const key in this._map) {
            if (this._map.hasOwnProperty(key)) {
                keys.push( key );
            }
        }
        return keys;
    }

    getItemKey(value: any): string {
        let keyName: string = null;
        for (const key in this._map) {
            if (this._map[key] === value) {
                keyName = key;
                break;
            }
        }
        return keyName;
    }

    getItemValue(key: any): any {
        return this._map[key];
    }

    getItemsValues(): Array<any> {
        const values: Array<any> = [];

        for (const key in this._map) {
            if (this._map.hasOwnProperty(key)) {
                values.push(this._map[key]);
            }
        }
        return values;
    }

    length(): number {
        let length = 0;

        // tslint:disable-next-line:forin
        for (const key in this._map) {
            length++;
        }
        return length;
    }

    isEmpty(): boolean {
        return length <= 0;
    }

    reset(): void {
        // tslint:disable-next-line:forin
        for (const key in this._map) {
            this._map[key] = null;
        }
        this.triggerDispatchEvent([] , CollectionEventKind.RESET);
    }

    removeAll(): void {
        // tslint:disable-next-line:forin
        for (const key in this._map) {
            this.removeItemAt(key);
        }
        this.triggerDispatchEvent([] , CollectionEventKind.REMOVE);
    }

    clone(): any {
        const cloneMap: IMap = this;
        cloneMap.removeAll();
        return cloneMap;
    }

    keySet(): Array<any> {
        const keys = [];

        // tslint:disable-next-line:forin
        for (const key in this._map) {
            keys.push( key );
        }
        return keys;
    }

    addAll(m: HashMapCollection): void {
        for (const key in this._map) {
            if (this._map[key] !== null) {
                delete this._map[key];
            }
        }
        // tslint:disable-next-line:forin
        for (const key in m) {
            this._map[key] = m.getItemValue(key);
        }
        this.triggerDispatchEvent(new Array('AddAll') , CollectionEventKind.ADD);
    }

    compare(key: any, value: any): boolean {
        const result: boolean = (this._map[key] === value) ? true : false;
        return result;
    }

    toString(): string {
        let string = '';

        // tslint:disable-next-line:forin
        for (const key in this._map) {
            string = string + 'key: ' + key + ', value: ' + this._map[key].toString() + '\n';
        }
        return string;
    }

    addEventListener(type: string, listener: any): void {
        this._eventDispatcher.addEventListener(type, listener);
    }

    dispatchEvent(eventKind: string, event: any): boolean {
        return this._eventDispatcher.dispatchEvent(eventKind, event);
    }

    hasEventListener(type: string): boolean {
        return this._eventDispatcher.hasEventListener(type);
    }

    removeEventListener(type: string, listener: any): void {
        this._eventDispatcher.removeEventListener(type, listener);
    }

    private triggerDispatchEvent(array: Array<any>, eventKind: string): void {
        // dispatch Event
        const event: any = {
            kind: eventKind,
            items: array
        };
        this._eventDispatcher.dispatchEvent(CollectionEvent.COLLECTION_CHANGE, event);
    }
}
