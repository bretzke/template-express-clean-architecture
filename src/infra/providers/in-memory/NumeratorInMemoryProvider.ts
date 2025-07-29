import { INumeratorProvider } from '@/domain/providers/INumeratorProvider';

interface TestAndSetParams {
  oldValue: number;
  newValue: number;
}

export class NumeratorInMemoryProvider implements INumeratorProvider {
  private numerator = 1;

  async getNumerator(): Promise<number> {
    return this.numerator;
  }

  async testAndSetNewNumerator({ oldValue, newValue }: TestAndSetParams): Promise<void> {
    if (oldValue !== this.numerator) {
      throw new Error('oldValue is invalid');
    }

    this.numerator = newValue;
  }
}
