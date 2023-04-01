import {
  ItemEntity,
  ProductEntity,
  ServiceEntity,
} from '../../../domain/entities';
import { BadRequestError } from '../../../domain/errors';
import { iInputItemUsecase } from '../../../domain/usecases/inventory';
import { iDatabase } from '../../../infra/database/contracts';
import {
  iCompanyRepository,
  iInventoryRepository,
} from '../../../infra/database/contracts/repositorys';

export class InputItemData implements iInputItemUsecase {
  constructor(
    private readonly sessionDatabase: iDatabase.iSession,
    private readonly inventoryRepository: iInventoryRepository,
    private readonly companyRepository: iCompanyRepository
  ) {}

  async exec<Item extends ItemEntity>(
    input: iInputItemUsecase.Input<Item>
  ): Promise<iInputItemUsecase.Output<Item>> {
    const session = this.sessionDatabase.startSession();

    try {
      session.initTransaction();

      if (!input) return null;

      const item = input;

      const settings = ItemEntity.Settings;

      if (item.name.length > settings.maxNameLength)
        throw new BadRequestError(
          `Very large item name of ${item.name}, maximum ${settings.maxNameLength} characters.`
        );
      if (item.name.length < settings.minNameLength)
        throw new BadRequestError(
          `Very short item name of ${item.name}, minimum ${settings.minNameLength} characters.`
        );

      if (item.description) {
        if (item.description.length > settings.maxDescriptionLength)
          throw new BadRequestError(
            `Very large item description of ${item.description}, maximum ${settings.maxDescriptionLength} characters.`
          );
        if (item.description.length < settings.minDescriptionLength)
          throw new BadRequestError(
            `Very short item description of ${item.description}, minimum ${settings.minDescriptionLength} characters.`
          );
      }

      if (item.sale_price < settings.minPriceSale)
        throw new BadRequestError(
          `Sale price for ${item.name} cannot be less than ${settings.minPriceSale}.`
        );

      if (item.type == 'product') {
        const product: ProductEntity = item;
        const settings = ProductEntity.Settings;

        if (product.quantity < 1)
          throw new BadRequestError(
            `Product ${product.name} need one or more quantity.`
          );
        if (product.buy_price < settings.minBuyPrice)
          throw new BadRequestError(
            `Buy price for ${product.name} cannot be less than ${settings.minBuyPrice}.`
          );
      }

      const company = await this.companyRepository.findById(item.company_id);
      if (!company)
        throw new BadRequestError(
          `Company was not found with id ${item.company_id}`
        );

      const hasItemRecord = await this.inventoryRepository.findByName(
        item.name,
        company.id
      );
      if (hasItemRecord)
        throw new BadRequestError(
          `the ${item.type} has one record with this name: ${item.name}`
        );

      const itemWithId = this.makeItem(item);
      const resultInserted = await this.inventoryRepository.create(itemWithId, {
        session,
      });
      if (resultInserted?.id) {
        await session.commitTransaction();
        return itemWithId as Item;
      }

      return null;
    } catch (error) {
      await session.rollbackTransaction();
      throw error;
    } finally {
      await session.endSession();
    }
  }

  private makeItem(item: ItemEntity): ItemEntity {
    if (item.type == 'product') {
      return new ProductEntity({
        ...item,
        id: this.inventoryRepository.generateId(),
      });
    }

    if (item.type == 'service') {
      return new ServiceEntity({
        ...item,
        id: this.inventoryRepository.generateId(),
      });
    }
  }
}
