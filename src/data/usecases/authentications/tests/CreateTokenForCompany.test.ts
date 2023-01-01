import { Company } from "../../../../../src/domain/entities"
import { InternalError } from "../../../../../src/domain/errors"
import { iCreateTokenForCompany } from "../../../../../src/domain/usecases/authentications"
import { iTokenAdapter } from "../../../../../src/infra/cryptography/contracts"
import { iCompanyRepository } from "../../../../../src/infra/database/contracts/repositorys"
import { mock, MockProxy } from "jest-mock-extended"
import { CreateTokenForCompany } from "../CreateTokenForCompany.data"



describe("CreateTokenForCompany", ()=>{

    let sut : iCreateTokenForCompany

    let companyRepository : MockProxy<iCompanyRepository>
    let tokenAdapter : MockProxy<iTokenAdapter>


    let fakeInput: iCreateTokenForCompany.input;
    let fakeOutput: iCreateTokenForCompany.output;
    let fakeCompany: Company;


    beforeAll(() => {
        companyRepository = mock()
        tokenAdapter = mock()
    })


    beforeEach(() => {
        sut = new CreateTokenForCompany(
            tokenAdapter,
            companyRepository
        )

        fakeInput = { companyId: "01" }
        fakeOutput = { token : "any_token"}
        fakeCompany = {
            _id: "01",
            name_fantasy: 'any_name',
            timezone: "sao_paulo/brazilia",
            cnpj: 'any_cnpj',
            email: 'any_email'
        };
    })

    it("Should return void when company not found.", async () => {
        companyRepository.findById.mockResolvedValue(null)
        const result = sut.exec(fakeInput)
        await expect(result).rejects.toThrow(
            new InternalError('Company not found with id: '+fakeInput.companyId)
        );
    })

    it("Should return valid token when company found.", async () => {
        companyRepository.findById.mockResolvedValue(fakeCompany)
        tokenAdapter.createAccessToken.mockResolvedValue(fakeOutput.token)
        const result = await sut.exec(fakeInput)
        expect(result).toEqual(expect.objectContaining(fakeOutput))
        expect(result.token).toEqual(fakeOutput.token)
    })
})