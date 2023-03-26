import { ForbiddenError } from "../../../domain/errors";
import { append, PermitededItemInventoryList } from "../../../domain/utils";
import { iController } from "../../../application/contracts";
import { HttpRequest, HttpResponse } from "../../../application/helpers/http";
import { HTTP_STATUS } from "../../../domain/types/Http.status";
import { iListInventoryUsecase } from "../../../domain/usecases/inventory";


export class ListInventoryController extends iController {

    constructor(
        private readonly listInvetoryUsecase : iListInventoryUsecase
    ){super();}

    async exec(request: HttpRequest): Promise<HttpResponse> {
        try{
            const company_id = request.headers.decodedTokenCompany.companyId;
            let filters : iListInventoryUsecase.FiltersList = request.body;
            const item_id = request.params.item_id

            if (item_id){
                filters = append(filters, { id : item_id})
            }

            const inventory = await this.listInvetoryUsecase.exec({company_id, filters})

            return this.sendSucess(HTTP_STATUS.OK, {inventory})
        }catch(e){
            return this.sendError(e)
        }
    }
}