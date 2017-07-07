import { CacheStoragesEnum } from '../../enums/cache-storages.enum';
import { StorageValueInterface } from '../../interfaces/storage-value.interface';
/**
 * Abstract cache storage
 */
export declare abstract class CacheStorageAbstract {
    /**
     * Get item from storage
     * @param key
     */
    abstract getItem(key: string): StorageValueInterface;
    /**
     * Set item to storage
     * @param key
     * @param value
     */
    abstract setItem(key: string, value: StorageValueInterface): boolean;
    /**
     * Remove item from storage
     * @param key
     */
    abstract removeItem(key: string): void;
    /**
     * Clear item in storage
     */
    abstract clear(): void;
    /**
     * Get current storage type
     */
    abstract type(): CacheStoragesEnum;
    /**
     * Check if storage is enabled
     */
    abstract isEnabled(): boolean;
}
