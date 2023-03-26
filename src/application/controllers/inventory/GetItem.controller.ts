import { iController } from "../../../application/contracts";
import { HttpRequest, HttpResponse } from "../../../application/helpers/http";
import { ItemEntity } from "../../../domain/entities";
import { HTTP_STATUS } from "../../../domain/types/Http.status";
import { iListInventoryUsecase } from "../../../domain/usecases/inventory";


export class GetItemController extends iController {
    constructor(
        private readonly listInventory : iListInventoryUsecase
    ){super();}

    async exec(request: HttpRequest): Promise<HttpResponse> {
        try {
            const company_id = request.headers.decodedTokenCompany.companyId
            const item_id = request.params.item_id

            let item: ItemEntity = null;

            if (item_id) {
                const filters: iListInventoryUsecase.FiltersList = {
                    id: item_id
                }

                const itens = await this.listInventory.exec({ company_id, filters })
                item = itens[0] ?? null
            }

            return this.sendSucess(HTTP_STATUS.OK, { item })
        } catch (error) {
            return this.sendError(error)
        }
    }
}