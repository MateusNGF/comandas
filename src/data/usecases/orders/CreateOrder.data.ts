import { iOutputProductUsecase } from "src/domain/usecases/inventory";
import { OrderEntity, ProductOutputRecord } from "../../../domain/entities";
import { BadRequestError} from "../../../domain/errors";
import { iCreateOrderUsecase } from "../../../domain/usecases/orders";
import { iDatabase } from "../../../infra/database/contracts";
import { iCompanyRepository, iEventRepository, iOrderRepository } from "../../../infra/database/contracts/repositorys";

export class CreateOrderData implements iCreateOrderUsecase {

    constructor(
        private readonly sessionDataabse: iDatabase.iSession,
        private readonly orderRepository: iOrderRepository,
        private readonly companyRepository: iCompanyRepository,
        private readonly eventRepository: iEventRepository,
        private readonly outputProductUsecase: iOutputProductUsecase
    ) { }

    async exec(input: iCreateOrderUsecase.Input): Promise<any> {

        const session = this.sessionDataabse.startSession();

        try {
            session.initTransaction();

            const company_id = input.company_id;
            const event_id = input.event_id
            const itens_orders: Array<ProductOutputRecord> = input.itens


            if (!itens_orders?.length) throw new BadRequestError(`Need one item for create Order.`)
            
            const company = await this.companyRepository.findById(company_id)
            if (!company) throw new BadRequestError(`Company not found with ${company_id}.`)

            if (event_id){
                const event = await this.eventRepository.findById(event_id)
                if (!event) throw new BadRequestError(`Event not found with ${event_id}.`)
            }

            const recordOutputProducts = await this.outputProductUsecase.exec({
                company_id,
                items: itens_orders
            }, { session })

            const new_order: OrderEntity = {
                id: this.orderRepository.generateId(),
                company_id: company.id,
                event_id: event_id,
                itens: recordOutputProducts
            }

            const resultCreateOrder = await this.orderRepository.create(new OrderEntity(new_order), { session })

            if (!resultCreateOrder?.id) throw new BadRequestError(`Failed create order, try laiter.`)

            await session.commitTransaction();
            return {
                id: resultCreateOrder.id
            }
        } catch (error) {
            await session.rollbackTransaction();
            throw error
        } finally {
            await session.endSession();
        }
    }
}