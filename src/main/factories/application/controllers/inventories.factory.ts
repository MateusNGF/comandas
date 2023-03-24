import { iController } from "src/application/contracts";
import { RegisterItemController } from "../../../../application/controllers";
import { iRegisterItemUsecase } from "src/domain/usecases/inventory";
import { makeRegisterItemUsecase } from "../usecases/inventory.factory";



export const makeRegisterItemController = () : iController => {

    const registerItemUsecase : iRegisterItemUsecase = makeRegisterItemUsecase()

    return new RegisterItemController(
        registerItemUsecase
    )
}