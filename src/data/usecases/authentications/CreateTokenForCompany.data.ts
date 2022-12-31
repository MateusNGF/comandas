import { InternalError } from "../../../../src/domain/errors";
import { iCreateTokenForCompany } from "../../../../src/domain/usecases/authentications";
import { iTokenAdapter } from "../../../../src/infra/cryptography/contracts";
import { iCompanyRepository } from "../../../../src/infra/database/contracts/repositorys";


export class CreateTokenForCompany implements iCreateTokenForCompany {
    constructor(
        private readonly tokenAdapter: iTokenAdapter,
        private readonly companyRepository : iCompanyRepository
    ){}
    async exec(input: iCreateTokenForCompany.input): Promise<iCreateTokenForCompany.output> {
        const company = await this.companyRepository.findById(input.companyId)

        if (company) {
            const token = await this.tokenAdapter.createAccessToken({
                companyId : company._id,
                email : company.email,
                timezone : company.timezone
            })

            return {token}
        }else throw new InternalError("Company not found with id: " + input.companyId)
    }
}