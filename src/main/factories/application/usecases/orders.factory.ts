import { CreateOrderData, ListOrderData } from "../../../../data/usecases/orders";
import { iCreateOrderUsecase, iListOrderUsecase } from "../../../../domain/usecases/orders";
import { makeCompanyRepository, makeInventoryRepository, makeOrderRepository, makeSessionInMongo } from "../../infra/database/mongo.factory";



export function makeCreateOrderUsecase(): iCreateOrderUsecase {
    const sessionDatabase = makeSessionInMongo();
    const inventoryRepository = makeInventoryRepository();
    const companyRepository = makeCompanyRepository();
    const orderRepository = makeOrderRepository();


    return new CreateOrderData(
        sessionDatabase,
        orderRepository, 
        inventoryRepository, 
        companyRepository
    )
}

export function makeListOrdersUsecase(): iListOrderUsecase {
    const orderRepository = makeOrderRepository();

    return new ListOrderData(orderRepository)
}