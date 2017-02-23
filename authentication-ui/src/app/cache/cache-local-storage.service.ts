import {Injectable} from '@angular/core';
import {CacheStorageEnum} from "./cache-storages.enum";
import {StorageValueInterface} from "./cache-storage-value.interface";
import {CacheStorageAbstract} from "./cache-storage-abstract.service";

/**
 * Service for storing data in local storage
 */
@Injectable()
export class CacheLocalStorage extends CacheStorageAbstract {

  public getItem(key: string) {
    let value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  public setItem(key: string, value: StorageValueInterface) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      return false;
    }
  }

  public removeItem(key: string) {
    localStorage.removeItem(key);
  }

  public clear() {
    localStorage.clear();
  }

  public type() {
    return CacheStorageEnum.LOCAL_STORAGE;
  }
}
