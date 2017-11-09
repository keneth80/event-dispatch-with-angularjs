import { HashMapCollection } from './hash-map-collection';
import { IEventDispatcher } from '../../event/index';

export interface IMap extends IEventDispatcher {
    /**
     * Add a pair to the collection.
     *
     * @param Map key.
     * @param Map value
     *
     */
    addItem(key: any, value: any): void;

    /**
     * Remove an item based on key.
     *
     * @param key	The collection key.
     *
     */
    removeItemAt(key: any): void;

    /**
     * Check if the collection contains a key.
     *
     * @param key	collection key.
     * @return	true|false
     *
     */
    containsKey(key: any): boolean;

    /**
     * Check if collection contain value.
     * @param value	value from any type.
     * @return	true|false
     *
     */
    containsValue(value: any): boolean;

    /**
     * Return the item key based on it's value.
     *
     * @param value	The item value.
     * @return	The item Key.
     *
     */
    getItemKey(value: any): String;

    /**
     * Retrieve an item value based on its key.
     *
     * @param key	Key can be any type. Usually string.
     * @return	The value.
     *
     */
    getItemValue(key: any): any;

    /**
     * Method to retrieve the values.
     * @return An array with all the values in the map.
     *
     */
    getItemsValues(): Array<any>;

    /**
     * Method to check the size of the HashMap Collection.
     *
     * @return	Size of the collection.
     *
     */
    length(): number;


    isEmpty(): Boolean;

    reset(): void;

    removeAll(): void;

    /**
     * Clone the map, the keys and values themselves are not cloned.
     *
     * @return	Returns a shallow copy.
     *
     */
    clone(): any;

    /**
     * Returns an array collection of the keys contained in this map.
     *
     * @return Returns an array view of the keys contained in this map.
     *
     */
    keySet(): Array<any>;

    /**
     * Copies all of the mappings from the specified map to this map 
     * These mappings will be replace for any mappings that this map had 
     * for the keys currently in the specified map.
     *
     * @param m	a HashMap collection containing keys and values.
     *
     */
    addAll(m: HashMapCollection): void;

    /**
     * Compare specified key with the map value for equality. 
     */
    compare(key: any, value: any): boolean;

    /**
     * Method to convert the map into a string representation consists of a list of key-value. 
     *
     * @return Returns a string representation of this map. The string representation consists of a list of key-value. 
     *
     */
    toString(): string;
}
