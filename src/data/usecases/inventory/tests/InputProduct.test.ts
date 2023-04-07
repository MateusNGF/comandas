import { MockProxy, mock } from 'jest-mock-extended';
import { ProductEntity } from '../../../../domain/entities';
import { iInputProductUsecase } from '../../../../domain/usecases/inventory';
import { iDatabase } from '../../../../infra/database/contracts';
import { iInventoryRepository } from '../../../../infra/database/contracts/repositorys';
import { InputProductData } from '../InputProduct.data';

describe('InputProductUsecase', () => {
  let sut: iInputProductUsecase;

  let sessionDatabase: MockProxy<iDatabase.iSession>;
  let inventoryRepository: MockProxy<iInventoryRepository>;

  let incomingData: iInputProductUsecase.Input;
  const settinsProduct = ProductEntity.Settings;

  function MakeText(length: number) {
    return Array(length).fill('A').join('');
  }

  beforeAll(() => {
    sessionDatabase = mock();
    inventoryRepository = mock();
  });

  beforeEach(() => {
    sut = new InputProductData(sessionDatabase, inventoryRepository);

    incomingData = {
      company_id: '1',
      items: [
        {
          name: 'Sabão',
          description: 'Sabão de barra',
          buy_price: 10,
          sale_price: 12,
          quantity: 10,
        },
      ],
    };

    sessionDatabase.startSession.mockReturnValue(sessionDatabase);
    inventoryRepository.findByName.mockResolvedValue(false as any);
    inventoryRepository.create.mockResolvedValue({ id: '123' });
  });

  it('Should return empty list when input itens is empty', async () => {
    incomingData.items = [];
    const output = await sut.exec(incomingData);
    expect(output).toEqual([]);
  });

  it('Should return isError true when product name is very long.', async () => {
    const maxNameLength = settinsProduct.maxNameLength;
    incomingData.items[0].name = MakeText(maxNameLength + 1);
    const output = await sut.exec(incomingData);
    expect(output[0]).toEqual(
      expect.objectContaining({
        isError: true,
        message: `Very long product name at 0º, maximum ${maxNameLength} characters.`,
      })
    );
  });

  it('Should return isError true when product name is very short.', async () => {
    const minNameLength = settinsProduct.minNameLength;
    incomingData.items[0].name = MakeText(minNameLength - 1);
    const output = await sut.exec(incomingData);
    expect(output[0]).toEqual(
      expect.objectContaining({
        isError: true,
        message: `Very short product name at 0º, minimum ${minNameLength} characters.`,
      })
    );
  });

  it('Should return isError true when product description is very short.', async () => {
    const minDescriptionLength = settinsProduct.minDescriptionLength;
    incomingData.items[0].description = MakeText(minDescriptionLength - 1);
    const output = await sut.exec(incomingData);
    expect(output[0]).toEqual(
      expect.objectContaining({
        isError: true,
        message: `Very short product description at 0º, minimum ${minDescriptionLength} characters.`,
      })
    );
  });

  it('Should return isError true when product description is very long.', async () => {
    const maxDescriptionLength = settinsProduct.maxDescriptionLength;
    incomingData.items[0].description = MakeText(maxDescriptionLength + 1);
    const output = await sut.exec(incomingData);
    expect(output[0]).toEqual(
      expect.objectContaining({
        isError: true,
        message: `Very long product description at 0º, maximum ${maxDescriptionLength} characters.`,
      })
    );
  });

  it('Should return isError true when product sale price is less min permitted.', async () => {
    const minPriceSale = settinsProduct.minPriceSale;
    incomingData.items[0].sale_price = minPriceSale - 1;
    const output = await sut.exec(incomingData);
    expect(output[0]).toEqual(
      expect.objectContaining({
        isError: true,
        message: `Sale price for product at 0º cannot be less than ${minPriceSale}.`,
      })
    );
  });

  it('Should return isError true when product quantity is less one.', async () => {
    incomingData.items[0].quantity = 0;
    const output = await sut.exec(incomingData);
    expect(output[0]).toEqual(
      expect.objectContaining({
        isError: true,
        message: `Quantity for product at 0º cannot be less than 1.`,
      })
    );
  });

  it(`Should return isError true when product but price is less min price.`, async () => {
    const minBuyPrice = settinsProduct.minBuyPrice;

    incomingData.items[0].buy_price = minBuyPrice - 1;
    const output = await sut.exec(incomingData);
    expect(output[0]).toEqual(
      expect.objectContaining({
        isError: true,
        message: `Buy price for product at 0º cannot be less than ${minBuyPrice}.`,
      })
    );
  });

  it(`Should return isError true when product has record in database with equal name.`, async () => {
    inventoryRepository.findByName.mockResolvedValue(true as any);
    const output = await sut.exec(incomingData);
    expect(output[0]).toEqual(
      expect.objectContaining({
        isError: true,
        message: `Item at 0º with name ${incomingData.items[0].name} already exists.`,
      })
    );
  });

  it(`Should sucess when product is valid.`, async () => {
    const output = await sut.exec(incomingData);
    expect(output[0]).toEqual(
      expect.objectContaining({
        isError: false,
        message: `Item ${incomingData.items[0].name} created successfully.`,
      })
    );
  });

  it(`Should return error default when error is undefined.`, async () => {
    inventoryRepository.create.mockResolvedValue(null);
    const output = await sut.exec(incomingData);
    expect(output[0]).toEqual(
      expect.objectContaining({
        isError: true,
        message: `Failed to create products.`,
      })
    );
  });
});
