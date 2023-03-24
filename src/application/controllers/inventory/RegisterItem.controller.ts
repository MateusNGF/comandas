import { time } from "console";
import { iController } from "../../../application/contracts";
import { HttpRequest, HttpResponse } from "../../../application/helpers/http";
import { ItemEntity, ProductEntity } from "../../../domain/entities";
import { BadRequestError } from "../../../domain/errors";
import { iRegisterItemUsecase } from "../../../domain/usecases/inventory";
import { ObjectManager } from "../../../domain/utils";



export class RegisterItemController extends iController {

    constructor(
        private readonly usecase: iRegisterItemUsecase
    ) { super(); }

    async exec(request: HttpRequest): Promise<HttpResponse> {
        try {
            const item: ItemEntity = request.body
            const { companyId } = request.headers.decodedTokenCompany
            if (!item) throw new BadRequestError("Need one item")

            ObjectManager.hasKeys<ItemEntity>(['name', 'type', 'sale_price'], item)
            if (item.type == 'product') {
                const product: ProductEntity = item;
                ObjectManager.hasKeys<ProductEntity>(['quantity'], product)
            }

            const result = await this.usecase.exec({
                ...item,
                company_id : companyId 
            })

            if (!result) throw new BadRequestError('Register item failed, try again.')
            return this.sendSucess(200, result)
        } catch (e) {
            return this.sendError(e)
        }
    }
}