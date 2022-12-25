import { iAuthenticationAndReturnTokenCompany } from "../../../../src/domain/usecases/authentication"
import { iAccessCompany } from "../../../../src/domain/usecases/company"
import { mock, MockProxy } from "jest-mock-extended"
import { AccessCompany } from "./AccessCompany.data"



describe("Access Company usecase", () => {
    let sut : iAccessCompany

    let authenticateAndReturnToken : MockProxy<iAuthenticationAndReturnTokenCompany>

    let fakeInputCredentials : iAccessCompany.input
    let fakeOutput: iAccessCompany.output

    beforeAll(() => {
        authenticateAndReturnToken = mock()
    })

    beforeEach(() => {
        sut = new AccessCompany(
            authenticateAndReturnToken
        )

        fakeInputCredentials ={
            password : "fake_password",
            email : "fake_email",
            cnpj : "fake_cnpj"
        }

        fakeOutput = {
            token : "fake_token"
        }
    })


    it("Should um valid token when credentials is valid", async () => {
        authenticateAndReturnToken.exec.mockResolvedValue(fakeOutput)

        const result = await sut.exec(fakeInputCredentials)
        expect(result).toEqual(expect.objectContaining(fakeOutput))
    })
})