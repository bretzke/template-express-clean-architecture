import { ILockProvider } from '@/domain/providers/ILockProvider';

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export class LockInMemoryProvider implements ILockProvider {
  private static isLocked = false;
  private static readonly RETRY_INTERVAL_MS = 100;
  private static readonly TIMEOUT_MS = 10000;

  async acquireLock(): Promise<void> {
    const start = Date.now();

    while (true) {
      if (!LockInMemoryProvider.isLocked) {
        LockInMemoryProvider.isLocked = true;
        return;
      }

      const elapsed = Date.now() - start;
      if (elapsed >= LockInMemoryProvider.TIMEOUT_MS) {
        throw new Error('Failed to acquire lock: timeout');
      }

      await sleep(LockInMemoryProvider.RETRY_INTERVAL_MS);
    }
  }

  async releaseLock(): Promise<void> {
    if (!LockInMemoryProvider.isLocked) {
      throw new Error('Failed to release lock: lock not held');
    }

    LockInMemoryProvider.isLocked = false;
  }
}
