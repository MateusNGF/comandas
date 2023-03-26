import { iUsecase } from "../../../domain/contracts";
import { iListOrderUsecase } from "../../../domain/usecases/orders";
import { iOrderRepository } from "../../../infra/database/contracts/repositorys";



export class ListOrderData implements iListOrderUsecase {
    
    constructor(
        private readonly orderRepository  :iOrderRepository
    ){}

    async exec(input: iListOrderUsecase.Input, options?: iUsecase.Options): Promise<iListOrderUsecase.Ouput> {
        const {company_id, filters} = input
        return this.orderRepository.list(company_id, filters, options)
    }
}