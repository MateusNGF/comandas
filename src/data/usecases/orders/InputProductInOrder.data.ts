import { iUsecase } from "../../../domain/contracts";
import { ProductOutputRecord } from "../../../domain/entities";
import { BadRequestError, ForbiddenError } from "../../../domain/errors";
import { iOutputProductUsecase } from "../../../domain/usecases/inventory";
import { iInputProductInOrderUsecase } from "../../../domain/usecases/orders/iInputProductInOrder.usecase";
import { iDatabase } from "../../../infra/database/contracts";
import { iOrderRepository } from "../../../infra/database/contracts/repositorys";



export class InputProductInOrderData implements iInputProductInOrderUsecase{
    constructor(
        private readonly sessionDataabse: iDatabase.iSession,
        private readonly orderRepository: iOrderRepository,
        private readonly outputProductUsecase: iOutputProductUsecase
    ) {}

    async exec(input: iInputProductInOrderUsecase.Input, options?: iUsecase.Options): Promise<iInputProductInOrderUsecase.Ouput> {

        if (options?.session) {
            return this.InputProductInOrder(input, options);
        } else {
            const session = this.sessionDataabse.startSession();

            try {
                await session.initTransaction();
                const result = await this.InputProductInOrder(input, { ...options, session });
                await session.commitTransaction();
                return result;
            } catch (error) {
                await session.rollbackTransaction();
                throw error
            } finally {
                await session.endSession();
            }
        }
    }


    protected async InputProductInOrder(
        input: iInputProductInOrderUsecase.Input,
        options?: iUsecase.Options
    ): Promise<iInputProductInOrderUsecase.Ouput> {
        const { company_id, order_id, itens } = input

        const order = await this.orderRepository.findById(order_id);
        if (!order)
            throw new BadRequestError(`Order with id ${order_id} not found.`)

        if (order.company_id !== company_id)
            throw new ForbiddenError(`Operation denied.`)


        const recordOutputProducts : Array<ProductOutputRecord> = await this.outputProductUsecase.exec({company_id,items: itens}, options);


        for (let ps = 0; ps < recordOutputProducts.length; ps++) {
            const product = recordOutputProducts[ps];

            if (!order.itens.length) {
                order.itens.push(product)
            }else{
                order.itens.forEach((itemOrder, index) => {
                    if (
                        itemOrder.id === product.id &&
                        itemOrder.sale_price === product.sale_price 
                    ){
                        console.log( order.itens[index].quantity)
                        order.itens[index].quantity += product.quantity
                    } else {
                        order.itens.push(product)
                    }
                })
            }
            
        }

        const orderUpdated = await this.orderRepository.update(order, options)
        if (!orderUpdated) throw new BadRequestError(`Update Order failed.`)

        return recordOutputProducts
    }
}