import { iDateProvider } from "./contracts/iDateProvider.contract"

class DateManger implements iDateProvider {

    constructor(
        private readonly dateRef : string | Date = new Date()
    ){}

    now(): Date {
        return new Date()
    }

    isBefore(dateToCompare: string | Date): boolean {
        return new Date(this.dateRef) <= new Date(dateToCompare)
    }

    isAfter(dateToCompare: string | Date): boolean {
        return new Date(this.dateRef) >= new Date(dateToCompare)
    }

    isEqual(dateToCompare: string | Date): boolean {
        if (!dateToCompare) return;

        return new Date(this.dateRef) === new Date(dateToCompare)
    }

    tz(timezone ?: string): string {
        return new Date(this.dateRef).toLocaleString('pt-BR', { timeZone : timezone ?? process.env.TZ})
    }
}

export const DateProvider = (date ?: string | Date) : iDateProvider => new DateManger(date)