export interface INumeratorProvider {
  getNumerator(): Promise<number>;
  testAndSetNewNumerator(data: { oldValue: number; newValue: number }): Promise<void>;
}
