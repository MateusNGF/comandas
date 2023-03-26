import { iUsecase } from "../../../domain/contracts";
import { OrderEntity, ProductEntity } from "../../../domain/entities";
import { BadRequestError, ForbiddenError } from "../../../domain/errors";
import { iCreateOrderUsecase } from "../../../domain/usecases/orders";
import { iDatabase } from "../../../infra/database/contracts";
import { iCompanyRepository, iInventoryRepository, iOrderRepository } from "../../../infra/database/contracts/repositorys";

export class CreateOrderData implements iCreateOrderUsecase {

    constructor(
        private readonly sessionDataabse: iDatabase.iSession,
        private readonly orderRepository: iOrderRepository,
        private readonly inventoryRepository: iInventoryRepository,
        private readonly companyRepository: iCompanyRepository,
    ) { }

    async exec(input: iCreateOrderUsecase.Input, options?: iUsecase.Options): Promise<any> {

        const session = this.sessionDataabse.startSession();

        try {
            session.initTransaction();

            const company_id = input.company_id;
            const itens_orders: Array<OrderEntity.ItemOrder> = input.itens


            const company = await this.companyRepository.findById(company_id)
            if (!company)
                throw new BadRequestError(`Company not found with ${company_id}.`)

            if (!itens_orders?.length)
                throw new BadRequestError(`Need one item for create Order.`)


            const new_order: OrderEntity = {
                id: this.orderRepository.generateId(),
                company_id: company.id,
                itens: []
            }

            const updateItensPromise: Array<Promise<boolean>> = [];
            for (let item_index = 0; item_index < itens_orders.length; item_index++) {
                const order_item = itens_orders[item_index]
                const current_item: ProductEntity = await this.inventoryRepository.findById(order_item.id, { session })

                if (!current_item)
                    throw new BadRequestError(`Item not found.`)
                if (current_item.type != 'product')
                    throw new ForbiddenError(`Only accepted product for Order.`)

                if (order_item.quantity < 0){
                    throw new BadRequestError(`The ${item_index+1}º Item cannot be quantity less than zero`)
                }

                if (order_item.quantity > current_item.quantity)
                    throw new BadRequestError(`The ${current_item.type} ${current_item.name} be insufficient quantity in the inventory.`)

                new_order.itens.push({
                    id: current_item.id,
                    sale_price: current_item.sale_price,
                    quantity: order_item.quantity,
                    name: current_item.name
                })

                const fields_updates : Partial<ProductEntity> = {
                    id : current_item.id,
                    quantity : current_item.quantity -  order_item.quantity,
                    updated_at : new Date()
                }

                updateItensPromise.push(this.inventoryRepository.update(company_id, fields_updates))
            }

            const resultUpdateItens = await Promise.all(updateItensPromise)
            if (resultUpdateItens.includes(false)) {
                throw new BadRequestError(`Update failed in ${new_order.itens[resultUpdateItens.findIndex((status) => !status)].name}.`)
            }

            const resultCreateOrder = await this.orderRepository.create(new OrderEntity(new_order), { session })
            if (!resultCreateOrder?.id)
                throw new BadRequestError(`Failed create order, try laiter.`)

            await session.commitTransaction();
            return {
                id: new_order.id
            }
        } catch (error) {
            await session.rollbackTransaction();
            throw error
        } finally {
            await session.endSession();
        }
    }
}