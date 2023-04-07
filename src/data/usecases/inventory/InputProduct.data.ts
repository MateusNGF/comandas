import { iInputProductUsecase } from '../../../domain/usecases/inventory';
import {
  ProductEntity,
} from '../../../domain/entities';
import { iDatabase } from '../../../infra/database/contracts';
import {
  iInventoryRepository,
} from '../../../infra/database/contracts/repositorys';
import { iUsecase } from '../../../domain/contracts';

export class InputProductData implements iInputProductUsecase {
  constructor(
    private readonly sessionDatabase: iDatabase.iSession,
    private readonly inventoryRepository: iInventoryRepository
  ) { }

  async exec(
    input: iInputProductUsecase.Input,
    options: iUsecase.Options
  ): Promise<iInputProductUsecase.Output> {

    if (options?.session) {
      return this.inputProducts(input, options)
    }

    const session = this.sessionDatabase.startSession();

    try {
      await session.initTransaction();
      const result = await this.inputProducts(input, { ...options, session });
      await session.commitTransaction();
      return result
    } catch (error) {
      await session.rollbackTransaction();
      throw error;
    } finally {
      await session.endSession();
    }
  }

  private async inputProducts(
    input: iInputProductUsecase.Input,
    options: iUsecase.Options
  ) {

    const { company_id, items } = input

    if (!items.length) return []

    const resultOperations = Array(items.length).fill({
      isError: true,
      message: `Failed to create products.`
    } as iInputProductUsecase.ResultOperation)

    function makeError(message : string) {
      return { isError: true, message }
    }

    for (let i = 0; i < items.length; i++) {
      const productIncoming = items[i];

      const settings = ProductEntity.Settings;

      if (productIncoming.name.length > settings.maxNameLength) {
        resultOperations[i] = makeError(`Very long product name at ${i}º, maximum ${settings.maxNameLength} characters.`)
        continue;
      }

      if (productIncoming.name.length < settings.minNameLength) {
        resultOperations[i] = makeError(`Very short product name at ${i}º, minimum ${settings.minNameLength} characters.`);
        continue;
      }

      if (productIncoming.description) {

        if (productIncoming.description.length > settings.maxDescriptionLength) {
          resultOperations[i] = makeError(`Very long product description at ${i}º, maximum ${settings.maxDescriptionLength} characters.`);
          continue;
        }

        if (productIncoming.description.length < settings.minDescriptionLength) {
          resultOperations[i] = makeError(`Very short product description at ${i}º, minimum ${settings.minDescriptionLength} characters.`);
          continue;
        }
      }

      if (productIncoming.sale_price < settings.minPriceSale)
        {
          resultOperations[i] = makeError(`Sale price for product at ${i}º cannot be less than ${settings.minPriceSale}.`);
          continue;
        }

      if (productIncoming.quantity < 1)
        {
          resultOperations[i] = makeError(`Quantity for product at ${i}º cannot be less than 1.`);
          continue;
        }

      if (productIncoming.buy_price && productIncoming.buy_price < settings.minBuyPrice)
        {
          resultOperations[i] = makeError(`Buy price for product at ${i}º cannot be less than ${settings.minBuyPrice}.`);
          continue;
        }


      const hasItemRecord = await this.inventoryRepository.findByName(productIncoming.name, company_id, options);
      if (hasItemRecord){
        resultOperations[i] = makeError(`Item at ${i}º with name ${productIncoming.name} already exists.`);
        continue;
      }

      const product = new ProductEntity({
        ...productIncoming,
        company_id,
      })

      const runQueryInsert = await this.inventoryRepository.create(product, options);
      if (runQueryInsert?.id) {
        resultOperations[i] = {
          isError: false,
          message: `Item ${productIncoming.name} created successfully.`
        }
      }
    }

    return resultOperations
  }

}