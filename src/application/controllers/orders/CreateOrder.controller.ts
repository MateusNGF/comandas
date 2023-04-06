import { BadRequestError } from "../../../domain/errors";
import { iController } from "../../../application/contracts";
import { HttpRequest, HttpResponse } from "../../../application/helpers/http";
import { ProductOutputReference } from "../../../domain/entities";
import { HTTP_STATUS } from "../../../domain/types/Http.status";
import { iCreateOrderUsecase } from "../../../domain/usecases/orders";
import { ObjectManager } from "../../../domain/utils";



export class CreateOrderController extends iController {
    constructor(
        private readonly createOrderUsecase :iCreateOrderUsecase
    ){super();}

    async exec(request: HttpRequest): Promise<HttpResponse> {
        try{

            const company_id = request.headers.decodedTokenCompany.companyId
            const request_order : iCreateOrderUsecase.Input = {
                company_id : company_id,
                products : request.body
            }

            if (!Array.isArray(request_order.products)){
                throw new BadRequestError(`body need be array.`)
            }

            if (!request_order.products.length) {
                throw new BadRequestError(`Need one item in list.`)
            }
            for (let i = 0; i < request_order.products.length; i++) {
               ObjectManager.hasKeys<ProductOutputReference>(['id', 'quantity'], request_order.products[i]) 
            }

            const order_created = await this.createOrderUsecase.exec(request_order)

            return this.sendSucess(HTTP_STATUS.OK, {id : order_created?.id})
        }catch(error){
            return this.sendError(error)
        }
    }
}