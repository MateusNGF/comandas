import { MockProxy, mock } from "jest-mock-extended";
import { iOutputProductUsecase } from "src/domain/usecases/inventory";
import { iInputProductInOrderUsecase } from "src/domain/usecases/orders/iInputProductInOrder.usecase"
import { iDatabase } from "src/infra/database/contracts";
import { iOrderRepository } from "src/infra/database/contracts/repositorys";
import { InputProductInOrderData } from "../InputProductInOrder.data";
import { OrderEntity } from "src/domain/entities";



describe('InputProductInOrder', () => {
    let sut : iInputProductInOrderUsecase

    let sessionDatabase: MockProxy<iDatabase.iSession>;
    let orderRepository: MockProxy<iOrderRepository>;
    let outputProductUsecase: MockProxy<iOutputProductUsecase>;


    let inputData : iInputProductInOrderUsecase.Input;
    let orderMock :Partial<OrderEntity>;

    beforeAll(() => {
        sessionDatabase = mock();
        orderRepository = mock();
        outputProductUsecase = mock();
    })

    beforeAll(() => {
        sut = new InputProductInOrderData(
            sessionDatabase,
            orderRepository,
            outputProductUsecase
        )
        inputData = {
            company_id : "123123",
            order_id: "123321",
            itens : [
                {
                    id: "123",
                    quantity: 2,
                }
            ]
        }

        orderMock = {
            id: "123",
            company_id: "123123",
            itens : [{
                id: "123",
                sale_price: 12,
                quantity: 2,
                name: "123P",
                type: "product",
            }]
        } 

        sessionDatabase.startSession.mockImplementation(() => sessionDatabase)
        orderRepository.findById.mockResolvedValue(orderMock as OrderEntity)
        orderRepository.update.mockResolvedValue(orderMock as OrderEntity)
    })
})