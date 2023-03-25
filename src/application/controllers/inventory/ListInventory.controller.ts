import { ForbiddenError } from "../../../domain/errors";
import { PermitededItemInventoryList } from "../../../domain/utils";
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
            const filters : iListInventoryUsecase.FiltersList = request.body;

            const inventory = await this.listInvetoryUsecase.exec({company_id, filters})

            return this.sendSucess(HTTP_STATUS.OK, {inventory})
        }catch(e){
            return this.sendError(e)
        }
    }
}