import {Injectable} from '@angular/core';
import {CacheStorageAbstract} from "./cache-storage-abstract.service";
import {CacheStorageEnum} from "./cache-storages.enum";
import {StorageValueInterface} from "./cache-storage-value.interface";

/**
 * Service for storing data in session storage
 */
@Injectable()
export class CacheSessionStorage extends CacheStorageAbstract {

  public getItem(key: string) {
    let value = sessionStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  public setItem(key: string, value: StorageValueInterface) {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      return false;
    }
  }

  public removeItem(key: string) {
    sessionStorage.removeItem(key);
  }

  public clear() {
    sessionStorage.clear();
  }

  public type() {
    return CacheStorageEnum.SESSION_STORAGE;
  }
}
