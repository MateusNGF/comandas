export interface iDateProvider {

    now() : iDateProvider
    isBefore(dateToCompare : string | Date) : boolean
    isAfter(dateToCompare : string | Date) : boolean
    isEqual(dateToCompare : string | Date) : boolean

    toISOString() : string
    toDateString(locateFormar ?: string) : string

    addDays(days : number) : iDateProvider

    tz(timezone : string) : string
}