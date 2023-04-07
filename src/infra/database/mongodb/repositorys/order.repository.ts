import { Collection, Filter, ObjectId } from 'mongodb';
import { iListEventsUsecase } from '../../../../domain/usecases/events';
import { append } from '../../../../domain/utils';
import { OrderEntity } from '../../../../domain/entities';
import { iBaseRepository, iOrderRepository } from '../../contracts/repositorys';

export class OrderRepository implements iOrderRepository {
  constructor(private readonly Colletion: Collection<OrderEntity>) {}
  async create(
    order: OrderEntity,
    options?: iBaseRepository.Options
  ): Promise<{ id: string }> {
    const id = order.id ? order.id : this.generateId();
    const result = await this.Colletion.insertOne(
      {
        ...order,
        id,
      },
      { session: options?.session?.get() }
    );
    return result.acknowledged ? { id } : null;
  }
  findById(
    id: string,
    options?: iBaseRepository.Options
  ): Promise<OrderEntity> {
    return this.Colletion.findOne({ id }, { session: options?.session?.get() });
  }
  generateId(): string {
    return new ObjectId().toHexString();
  }

  list(
    company_id: string,
    filters: iListEventsUsecase.Filters,
    options?: iBaseRepository.Options
  ): Promise<OrderEntity[]> {
    type TypeFilter = Filter<OrderEntity>;

    let where: TypeFilter = { company_id };

    const appendWrere = (cont: TypeFilter) => append(where, cont);
    if (filters) {
      if (filters.id) {
        where = appendWrere({ id: filters.id as any });
      }

      if (filters.text) {
        where = appendWrere({ $text: { $search: filters.text } });
      }
    }

    return this.Colletion.find<OrderEntity>(where, {
      projection: {
        _id: 0,
      },
      session: options?.session?.get(),
    })
      .skip(Number(filters.offset) ?? 0)
      .limit(Number(filters.limit) ?? 20)
      .toArray();
  }
}
