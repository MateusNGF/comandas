export interface iDateProvider {
    now() : Date
    isBefore(dateToCompare : string | Date) : boolean
    isAfter(dateToCompare : string | Date) : boolean
    isEqual(dateToCompare : string | Date) : boolean
    tz(timezone : string) : string
}