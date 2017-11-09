import { EventDispatcher } from '../../event/event-dispatcher';
import { CollectionEventKind, CollectionEvent } from '../../event/event.constant';
import { IMap } from './map.interface';

export class ArrayCollection {

    private _map: Array<any>;
    private _eventDispatcher: EventDispatcher;

    constructor() {
        this._map = [];
        this._eventDispatcher = new EventDispatcher();
    }

    addItem(value: any) {
        this._map.push(value);
        this.triggerDispatchEvent(value, CollectionEventKind.ADD);
    }

    removeItemAt(index: number): void {
        this.triggerDispatchEvent(new Array({index: index, value: this._map[index]}), CollectionEventKind.REMOVE);
        delete this._map[index];
    }

    containsIndex(index: number): boolean {
        return this._map[index] !== null;
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

    getItemValue(index: number): any {
        return this._map[index];
    }

    length(): number {
        return this._map.length;
    }

    isEmpty(): boolean {
        return this._map.length <= 0;
    }

    reset(): void {
        this._map = [];
        this.triggerDispatchEvent([] , CollectionEventKind.RESET);
    }

    removeAll(): void {
        this._map.length = 0;
        this.triggerDispatchEvent([] , CollectionEventKind.REMOVE);
    }

    compare(index: any, value: any): boolean {
        const result: boolean = (this._map[index] === value) ? true : false;
        return result;
    }

    contains(element): boolean {
        for (let i = 0; i < this._map.length; i++) {
            if (this._map[i] === element) {
                return true;
            }
        }
        return false;
    }

    toString(): string {
        return this._map.toString();
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
