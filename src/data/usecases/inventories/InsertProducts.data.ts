import { Product } from '../../../domain/entities/sub/product.entity';
import { BadRequestError } from '../../../domain/errors';
import { iInsertProducts } from '../../../domain/usecases/inventory/iInsertProducts.usecase';
import { iInventoryRepository } from '../../../infra/database/contracts/repositorys/iInventoryRepository';
import { DateProvider } from '../../../infra/date/DateProvider.date';

export class InsertProductsData implements iInsertProducts {
  constructor(
    private readonly inventoryRepository: iInventoryRepository
  ) {}
  
    async exec(input: iInsertProducts.input): Promise<iInsertProducts.output> {
      const {companyId} = input
        let { products } = input

        const inventory = await this.inventoryRepository.finByCompanyId(companyId)
        if (!inventory) throw new BadRequestError("Inventory not found.")

        if (!products.length) return;

        products = products.map((product) => {
            return new Product({
                ...product,
                created_at : DateProvider().toISOString(),
                updated_at : DateProvider().toISOString()
            })
        })
        
        const insertedProducts = await this.inventoryRepository.insertProducts(inventory._id, products)
        if (!insertedProducts.length) throw new BadRequestError("Insert failed")

        return insertedProducts
    }
}
