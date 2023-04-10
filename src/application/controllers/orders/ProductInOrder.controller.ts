import { BadRequestError } from "../../../domain/errors";
import { iController } from "../../../application/contracts";
import { HttpRequest, HttpResponse } from "../../../application/helpers/http";
import { HTTP_STATUS } from "../../../domain/types/Http.status";
import { iInputProductInOrderUsecase } from "../../../domain/usecases/orders/iInputProductInOrder.usecase";



export class ProductInOder extends iController {
    constructor(
        private readonly InputProductOrderUsecase: iInputProductInOrderUsecase
    ){
        super();
    }


    async exec(request: HttpRequest): Promise<HttpResponse> {
        try{

            const {companyId} = request.headers.decodedTokenCompany;
            const {action, orderId} = request.params;
            const {itens} = request.body;

            if (!itens || !itens.length)
                throw new BadRequestError('Itens is required');

            let result = null;
            if (action === 'add'){
                result = await this.InputProductOrderUsecase.exec({
                    company_id: companyId,
                    order_id : orderId,
                    itens: itens
                })    
            }


            return this.sendSucess(HTTP_STATUS.OK, result)
        }catch(error){
            return this.sendError(error)
        }
    }
}