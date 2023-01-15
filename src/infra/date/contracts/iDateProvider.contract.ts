export interface iDateProvider {
  now(): iDateProvider;
  isBefore(dateToCompare: string | Date): boolean;
  isAfter(dateToCompare: string | Date): boolean;
  isEqual(dateToCompare: string | Date): boolean;

  toISOString(): string;
  toDateString(locateFormar?: iDateProvider.Locates): string;

  addDays(days: number): iDateProvider;
  subtractDays(days: number): iDateProvider;

  tz(timezone: iDateProvider.Timezone): string;
}

export namespace iDateProvider {
  export type Locates = 'en-US' | 'pt-BR';
  export type Timezone = string;
}
