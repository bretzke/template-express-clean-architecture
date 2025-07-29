export interface ILockProvider {
  acquireLock(): Promise<void>;
  releaseLock(): Promise<void>;
}
