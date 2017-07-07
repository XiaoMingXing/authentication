import { CacheStorageAbstract } from '../cache-storage-abstract.service';
import { CacheStoragesEnum } from '../../../enums/cache-storages.enum';
import { StorageValueInterface } from '../../../interfaces/storage-value.interface';
/**
 * Service for storing data in session storage
 */
export declare class CacheSessionStorage extends CacheStorageAbstract {
    getItem(key: string): any;
    setItem(key: string, value: StorageValueInterface): boolean;
    removeItem(key: string): void;
    clear(): void;
    type(): CacheStoragesEnum;
    isEnabled(): boolean;
}
