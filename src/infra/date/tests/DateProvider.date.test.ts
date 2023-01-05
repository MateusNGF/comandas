import { iDateProvider } from "../contracts/iDateProvider.contract"
import { DateProvider } from "../DateProvider.date"


describe('Date Provider', () => {
    let sut : iDateProvider

    it('Should return true if dateA is before dateB', () => {
        let dateA = '2002/03/21'
        let dateB = '2002/03/22'

        expect(DateProvider(dateA).isBefore(dateB)).toEqual(true)
    })

    it('Should return false if dateA not is before dateB', () => {
        let dateA = '2002/03/23'
        let dateB = '2002/03/22'

        expect(DateProvider(dateA).isBefore(dateB)).toEqual(false)
    })

    it('Should return true if dateA is after dateB', () => {
        let dateA = '2002/03/23'
        let dateB = '2002/03/22'

        expect(DateProvider(dateA).isAfter(dateB)).toEqual(true)
    })

    it('Should return false if dateA not is after dateB', () => {
        let dateA = '2002/03/20'
        let dateB = '2002/03/22'

        expect(DateProvider(dateA).isAfter(dateB)).toEqual(false)
    })


    it('Should return a date with 3 day more - (pt-BR)', () => {
        let dateInput = '2002/03/20'
        let dateOutput = '23/03/2002'

        let dateWithAdd = DateProvider(dateInput).addDays(3)
        expect(dateWithAdd.toDateString('pt-BR')).toEqual(dateOutput)
    })

    it('Should return a date with 45 day more - (pt-BR)', () => {
        let dateInput = '2002/01/03'

        // dia, mes e ano
        let dateOutput = '17/02/2002'

        let dateWithAdd = DateProvider(dateInput).addDays(45)
        expect(dateWithAdd.toDateString('pt-BR')).toEqual(dateOutput)
    })

    it('Should return false if after adding 3 days the test date is less than the date summed to 3 days', () => {
        let dateInput = '2002/01/03'
        let dateForTest = '2002/01/07'

        let dateWithAdd = DateProvider(dateInput).addDays(3)
        let isAfter = dateWithAdd.isAfter(dateForTest)
        expect(isAfter).toEqual(false)
    })

    it('Should return true if after adding 3 days the test date is greater than the date added to 3 days', () => {
        let dateInput = '2023/01/01'
        let dateForTest = '2023/01/02'

        let dateWithAdd = DateProvider(dateInput).addDays(3)
        let isAfter = dateWithAdd.isAfter(dateForTest)
        expect(isAfter).toEqual(true)
    })
})