import { iUsecase } from "../../../domain/contracts";
import { ProductEntity } from "../../../domain/entities";
import { BadRequestError } from "../../../domain/errors";
import { iOutputProductUsecase } from "../../../domain/usecases/inventory";
import { iDatabase } from "../../../infra/database/contracts";
import { iInventoryRepository } from "../../../infra/database/contracts/repositorys";

export class OutputProductData implements iOutputProductUsecase {
    constructor(
        private readonly sessionDatabase : iDatabase.iSession,
        private readonly inventoryRepository: iInventoryRepository
    ) {}

    async exec(
        input: iOutputProductUsecase.Input,
        options?: iUsecase.Options
    ): Promise<iOutputProductUsecase.Output> {
       
        if (options?.session) {
            return await this.OutProducts(input, options)
        } else {

            const session = this.sessionDatabase.startSession()

            try {
                await session.initTransaction()
                const result = await this.OutProducts(input, { ...options, session })
                await session.commitTransaction()
                return result
            } catch (error) {
                await session.rollbackTransaction();
                throw error
            } finally {
                await session.endSession();
            }

        }
    }


    private async OutProducts(
        input: iOutputProductUsecase.Input,
        options?: iUsecase.Options
    ): Promise<iOutputProductUsecase.Output> {

        const {company_id, items} = input
        const output : Array<{id : string, name: string}> = []
        const promises = []

        if (!items.length) return false

        for (let i = 0; i < items.length; i++) {
            const productOut = items[i]
            const productDB = await this.inventoryRepository.findById(productOut.id, options) as ProductEntity

            if (!productDB) throw new BadRequestError(`Product ${productOut.id} not found.`)
            
            const quantityUpdated = productDB.quantity - productOut.quantity

            if (quantityUpdated < 0) throw new BadRequestError(`Has only ${productDB.quantity} - ${productDB.name.toLocaleLowerCase()} in inventory.`)

            const query = await this.inventoryRepository.update<ProductEntity>( company_id, { quantity: quantityUpdated}, options)
            output.push({
                id: productDB.id,
                name: productDB.name
            })
            promises.push(query)
        }

        const result : Array<boolean> = await Promise.all(promises)
        result.forEach((updatedProduct, index) => {
            if (!updatedProduct) throw new BadRequestError(`Product ${output[index].name} not updated.`)
        })

        return true
    }
}