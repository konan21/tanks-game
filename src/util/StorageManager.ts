import {isEmpty, isNil} from "lodash";

export class StorageManager {
  private _storage: Storage = window["localStorage"];
  // private _keys: {[key: string]: string} = {};
  // private _values: {[key: string]: string} = {};

  public getValue(key: string): string {
    if (!isNil(this._storage)) {
      return this._storage.getItem(key);
    }
    console.log("Local storage is not available");
    return;
  }

  public setValue(key: string, value: string): void {
    if (!isNil(this._storage)) {
      this._storage.setItem(key, value);
    }
    console.log("Error when setting to Local storage");
  }

  public hasKey(key: string): boolean {
    if (isEmpty(key) || isNil(key)) {
      return false;
    }
    return Boolean(this.getValue(key));
  }
}
