export interface IEventDispatcher {

    addEventListener(eventKind: string, callback: any): void;

    hasEventListener(event: string): boolean;

    removeEventListener(event, callback): void;

    dispatchEvent(event, details): void;
}
