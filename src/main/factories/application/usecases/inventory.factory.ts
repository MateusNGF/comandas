import { RegisterItemData } from "../../../../data/usecases/inventory";
import { iRegisterItemUsecase } from "../../../../domain/usecases/inventory";
import { makeCompanyRepository, makeInventoryRepository, makeSessionInMongo } from "../../infra/database/mongo.factory";



export function makeRegisterItemUsecase() : iRegisterItemUsecase {
    const inventoryRepository = makeInventoryRepository()
    const companyRepository = makeCompanyRepository()
    const sessionDatabase = makeSessionInMongo()

    return new RegisterItemData(
        sessionDatabase, 
        inventoryRepository, 
        companyRepository
    )
}