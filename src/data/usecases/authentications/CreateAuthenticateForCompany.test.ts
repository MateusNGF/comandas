import { Auth } from "../../../domain/entities";
import { UnauthorizedError } from "../../../domain/errors";
import { iCreateAuthenticateForCompanyUsecase, iHasAuthenticationRecordCompany } from "../../../domain/usecases/authentications";
import { iAuthenticationRepository } from "../../../infra/database/contracts/repositorys";
import { mock, MockProxy } from "jest-mock-extended";
import { CreateAuthenticateForCompanyData } from "./CreateAuthenticateForCompany.data";

describe('Create Authentication for company', () => {

    let sut : iCreateAuthenticateForCompanyUsecase;
    
    let hasAuthenticationRecordCompanyUsecaseMock : MockProxy<iHasAuthenticationRecordCompany>
    let authenticationRepositoryMock: MockProxy<iAuthenticationRepository>

    let fakeValidDataAuth : Auth;
    let fakeInputCredentials : iCreateAuthenticateForCompanyUsecase.input

    const unauthorizedErrorInHasRecordAuth = new UnauthorizedError('This CNPJ or Email has record, try change your passwoord.')

    beforeAll(() => {
        authenticationRepositoryMock = mock()
        hasAuthenticationRecordCompanyUsecaseMock = mock()
    })


    beforeEach(() => {

        sut = new CreateAuthenticateForCompanyData(
            authenticationRepositoryMock,
            hasAuthenticationRecordCompanyUsecaseMock
        )

        fakeValidDataAuth = {
            _id: "01",
            email: "any_email@gmail.com",
            cnpj: "fake_cnpj",
            password : "fake_pwd",
            associeteded_id : "fake_associeted_id"
        };
        
        fakeInputCredentials = {
            associeteded_id : "fake_associeted_id",
            email: "any_email@gmail.com",
            cnpj: "fake_cnpj",
            password : "fake_pwd"
        }
    })


    it("Should return UnauthorizedError when email is record", async () => {
        
        delete fakeInputCredentials.cnpj
        hasAuthenticationRecordCompanyUsecaseMock.exec.mockRejectedValue(unauthorizedErrorInHasRecordAuth);

        const response = sut.exec(fakeInputCredentials);
  
        await expect(response).rejects.toThrow(
            unauthorizedErrorInHasRecordAuth
        );
    })

    it("Should return UnauthorizedError when cnpj is record", async () => {
        delete fakeInputCredentials.email

        hasAuthenticationRecordCompanyUsecaseMock.exec.mockRejectedValue(unauthorizedErrorInHasRecordAuth);

        const response = sut.exec(fakeInputCredentials);
  
        await expect(response).rejects.toThrow(
            unauthorizedErrorInHasRecordAuth
        );
    })

    it('Should return auth_id when record sucess create auth.', async () => {
        const tokenMockado = {token : "token_mockado"}

        hasAuthenticationRecordCompanyUsecaseMock.exec.mockResolvedValue(undefined)

        authenticationRepositoryMock.create.mockResolvedValue(fakeValidDataAuth);
    
        const response = await sut.exec(fakeInputCredentials);
    
        expect(response).toEqual(expect.objectContaining({
          authId : fakeValidDataAuth._id
        }));
      });
});
