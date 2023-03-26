import { iListEventsUsecase } from "src/domain/usecases/events";
import { OrderEntity } from "../../../../domain/entities";
import { iBaseRepository } from "./iBaseRepository";

export interface iOrderRepository extends iBaseRepository<OrderEntity>{
    create(order : OrderEntity, options ?: iBaseRepository.Options) : Promise<{id : string}>
    list(company_id  :string, filters : iListEventsUsecase.Filters,  options ?: iBaseRepository.Options) : Promise<Array<OrderEntity>>
}