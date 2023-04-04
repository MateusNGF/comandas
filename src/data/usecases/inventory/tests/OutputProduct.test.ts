import { MockProxy, mock } from "jest-mock-extended";
import { ProductEntity } from "../../../../domain/entities";
import { iOutputProductUsecase } from "../../../../domain/usecases/inventory";
import { iDatabase } from "../../../../infra/database/contracts";
import { iInventoryRepository } from "../../../../infra/database/contracts/repositorys";
import { OutputProductData } from "../OutputProduct.data";
import { BadRequestError } from "../../../../domain/errors";



describe("OutputProductUsecase", () => {
    let sut : iOutputProductUsecase;

    let sessionDatabase : MockProxy<iDatabase.iSession>
    let inventoryRepository : MockProxy<iInventoryRepository>

    let incomingData : iOutputProductUsecase.Input;
    let productInventory : ProductEntity;

    beforeAll(() => {
        sessionDatabase = mock();
        inventoryRepository = mock();
    })

    beforeEach(() => {
        const company_id = "1";

        sut = new OutputProductData(sessionDatabase, inventoryRepository);

        productInventory = {
            id: "1",
            company_id: "1",
            sale_price: 12, 
            name: "Sabão",
            quantity: 10
        }
        incomingData = {
            company_id,
            items: [{
                id: productInventory.id,
                quantity: productInventory.quantity - 1
            }]
        }

        sessionDatabase.startSession.mockReturnValue(sessionDatabase)
        inventoryRepository.findById.mockResolvedValue(productInventory)
        inventoryRepository.update.mockResolvedValue(true)
    })


    it("should return false when input itens is empty", async () => {
        incomingData.items = []
        const output = await sut.exec(incomingData);
        expect(output).toEqual(false);
    })

    it('Should return BadRequestError when product not found.', async ()=> {
        inventoryRepository.findById.mockResolvedValue(null)
        const output = sut.exec(incomingData);
        await expect(output).rejects.toThrowError(BadRequestError);
    })

    it(`Should BadRequestError when quantity out is less of in inventory`, async () => {
        incomingData.items[0].quantity = productInventory.quantity + 1;

        const output = sut.exec(incomingData);
        await expect(output).rejects.toThrow(new BadRequestError(`Has only ${productInventory.quantity} - ${productInventory.name.toLocaleLowerCase()} in inventory.`));
    })

    it(`Should BadRequestError when update product failed`, async () => {
        inventoryRepository.update.mockResolvedValue(false)
        const output = sut.exec(incomingData);
        await expect(output).rejects.toThrow(new BadRequestError(`Product ${productInventory.name} not updated.`));
    })

    it(`Should return true when all product out with sucess.`, async () => {
        const output = await sut.exec(incomingData);
        expect(output).toEqual(true)
    })
})