import { mock, MockProxy } from "jest-mock-extended";
import { CompanyEntity, ItemEntity, ProductEntity } from "../../../../domain/entities";
import { BadRequestError, ForbiddenError } from "../../../../domain/errors";
import { iCreateOrderUsecase } from "../../../../domain/usecases/orders";
import { iDatabase } from "../../../../infra/database/contracts";
import { iCompanyRepository, iInventoryRepository, iOrderRepository } from "../../../../infra/database/contracts/repositorys";
import { append } from "../../../../domain/utils";
import { CreateOrderData } from "../CreateOrder.data";

describe('CreateOrderData testings', () => {
    let sut: iCreateOrderUsecase;

    let sessionDatabase: MockProxy<iDatabase.iSession>;
    let orderRepository: MockProxy<iOrderRepository>;
    let inventoryRepository: MockProxy<iInventoryRepository>;
    let companyRepository: MockProxy<iCompanyRepository>;

    let fakeOrderRequest: iCreateOrderUsecase.Input;
    let fakeInventory: Array<ProductEntity>;
    let fakeCompany: CompanyEntity;

    function MakeText(lenth: number) {
        return Array(lenth).fill('A').join('');
    }

    beforeAll(() => {
        sessionDatabase = mock();
        inventoryRepository = mock();
        companyRepository = mock();
        orderRepository = mock();
    });

    beforeEach(() => {
        sessionDatabase.startSession.mockImplementation(() => sessionDatabase);

        sut = new CreateOrderData(
            sessionDatabase,
            orderRepository,
            inventoryRepository,
            companyRepository
        );

        fakeOrderRequest = {
            company_id: "123123",
            itens: [
                {
                    id: "123",
                    quantity: 2,
                }
            ]
        }

        fakeCompany = {
            id: "1",
            cnpj: "123321",
            email: "123@123",
            name_fantasy: "teste 123",
            timezone: null
        }

        fakeInventory = [
            {
                id: "123",
                name: "123P",
                type: 'product',
                sale_price: 12,
                quantity: 5,
                company_id: fakeCompany.id
            }
        ]
    });


    it('Should return BadRequestError when company not found.', async () => {
        companyRepository.findById.mockResolvedValue(null)
        const result = sut.exec(fakeOrderRequest)
        await expect(result).rejects.toThrow(new BadRequestError(`Company not found with ${fakeOrderRequest.company_id}.`))
    })

    it('Should return BadRequestError when itens for order is empty.', async () => {
        companyRepository.findById.mockResolvedValue(fakeCompany)
        fakeOrderRequest.itens = []
        const result = sut.exec(fakeOrderRequest)
        await expect(result).rejects.toThrow(new BadRequestError(`Need one item for create Order.`))
    })

    it('Should return BadRequestError when itens not found with id.', async () => {
        companyRepository.findById.mockResolvedValue(fakeCompany)
        orderRepository.generateId.mockReturnValue("123123")
        inventoryRepository.findById.mockResolvedValue(null)

        const result = sut.exec(fakeOrderRequest)
        await expect(result).rejects.toThrow(new BadRequestError(`Item not found.`))
    })

    it('Should return BadRequestError when itens not be product.', async () => {
        companyRepository.findById.mockResolvedValue(fakeCompany)
        orderRepository.generateId.mockReturnValue("123123")
        inventoryRepository.findById.mockResolvedValue({ type: 'service' } as ItemEntity)

        const result = sut.exec(fakeOrderRequest)
        await expect(result).rejects.toThrow(new ForbiddenError(`Only accepted product for Order.`))
    })

    it('Should return BadRequestError when itens request has quantity less zero.', async () => {
        const current_item_founded = fakeInventory[0]
        
        fakeOrderRequest.itens[0].quantity = -1

        companyRepository.findById.mockResolvedValue(fakeCompany)
        orderRepository.generateId.mockReturnValue("123123")
        inventoryRepository.findById.mockResolvedValue(current_item_founded)

        const result = sut.exec(fakeOrderRequest)
        await expect(result).rejects.toThrow(new BadRequestError(`The 1º Item cannot be quantity less than zero`))
    })
    

    it('Should return BadRequestError when itens insufficient quantity.', async () => {
        let current_item_founded = fakeInventory[0]
        companyRepository.findById.mockResolvedValue(fakeCompany)
        orderRepository.generateId.mockReturnValue("123123")

        current_item_founded = append(current_item_founded, { quantity: fakeOrderRequest.itens[0].quantity - 1 } as ProductEntity)
        inventoryRepository.findById.mockResolvedValue(current_item_founded)

        const result = sut.exec(fakeOrderRequest)
        await expect(result).rejects.toThrow(new BadRequestError(`The ${current_item_founded.type} ${current_item_founded.name} be insufficient quantity in the inventory.`))
    })

    it('Should return BadRequestError when itens not be update.', async () => {
        const current_item_founded = fakeInventory[0]
        companyRepository.findById.mockResolvedValue(fakeCompany)
        orderRepository.generateId.mockReturnValue("123123")

        inventoryRepository.findById.mockResolvedValue(current_item_founded)
        inventoryRepository.update.mockResolvedValue(false)
        const result = sut.exec(fakeOrderRequest)
        await expect(result).rejects.toThrow(new BadRequestError(`Update failed in ${current_item_founded.name}.`))
    })

    it('Should return BadRequestError when Order create failed.', async () => {
        const current_item_founded = fakeInventory[0]
        companyRepository.findById.mockResolvedValue(fakeCompany)
        orderRepository.generateId.mockReturnValue("123123")

        inventoryRepository.findById.mockResolvedValue(current_item_founded)
        inventoryRepository.update.mockResolvedValue(true)
        orderRepository.create.mockResolvedValue(null)
        const result = sut.exec(fakeOrderRequest)
        await expect(result).rejects.toThrow(new BadRequestError(`Failed create order, try laiter.`))
    })

    it('Should return same id of generate id when all process sucess.', async () => {
        const generatedId = "123123"
        const current_item_founded = fakeInventory[0]
        companyRepository.findById.mockResolvedValue(fakeCompany)
        orderRepository.generateId.mockReturnValue(generatedId)

        inventoryRepository.findById.mockResolvedValue(current_item_founded)
        inventoryRepository.update.mockResolvedValue(true)
        orderRepository.create.mockResolvedValue({ id: generatedId })
        const result = await sut.exec(fakeOrderRequest)
        expect(result).toMatchObject({
            id: generatedId
        })
    })


})