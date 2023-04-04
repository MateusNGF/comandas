import { mock, MockProxy } from 'jest-mock-extended';
import { BadRequestError } from '../../../../domain/errors';
import { iInputItemUsecase } from 'src/domain/usecases/inventory';
import { iDatabase } from 'src/infra/database/contracts';
import {
  iCompanyRepository,
  iInventoryRepository,
} from 'src/infra/database/contracts/repositorys';
import {
  CompanyEntity,
  ItemEntity,
  ServiceEntity,
} from '../../../../domain/entities';
import { InputItemData } from '../InputItem.data';

describe('RegisterItem test', () => {
  let sut: iInputItemUsecase;

  let sessionDatabase: MockProxy<iDatabase.iSession>;
  let inventoryRepository: MockProxy<iInventoryRepository>;
  let companyRepository: MockProxy<iCompanyRepository>;

  let fakeInput: iInputItemUsecase.Input;
  let fakeCompany: CompanyEntity;

  function MakeText(lenth: number) {
    return Array(lenth).fill('A').join('');
  }

  beforeAll(() => {
    sessionDatabase = mock();
    inventoryRepository = mock();
    companyRepository = mock();
  });

  beforeEach(() => {
    sessionDatabase.startSession.mockImplementation(() => sessionDatabase);

    sut = new InputItemData(
      sessionDatabase,
      inventoryRepository,
      companyRepository
    );

    fakeInput = {
      name: 'Tecido',
      type: 'product',
      company_id: 'teste',
      sale_price: 1233,
    };

    fakeCompany = {
      id: 123,
      email: 'teste@email',
      cnpj: '123321',
      timezone: 'any',
      name_fantasy: 'Teste',
    };
  });

  it('Should return null if item is null', async () => {
    const response = await sut.exec(null);
    expect(response).toBe(null);
  });

  it('Should return BadRequestError when sale price be < 0', async () => {
    const response = sut.exec({
      ...fakeInput,
      sale_price: -1,
    });
    await expect(response).rejects.toThrowError(BadRequestError);
  });

  it('Should return BadRequestError when name length is greater than maximum.', async () => {
    const response = sut.exec({
      ...fakeInput,
      name: MakeText(ItemEntity.Settings.maxNameLength + 1),
    });
    await expect(response).rejects.toThrowError(BadRequestError);
  });

  it('Should return BadRequestError when name length is lass than minumun.', async () => {
    const response = sut.exec({
      ...fakeInput,
      name: MakeText(ItemEntity.Settings.minNameLength - 1),
    });
    await expect(response).rejects.toThrowError(BadRequestError);
  });

  it('Should return BadRequestError when description length is greater than maximum.', async () => {
    const response = sut.exec({
      ...fakeInput,
      description: MakeText(ItemEntity.Settings.maxDescriptionLength + 1),
    });
    await expect(response).rejects.toThrowError(BadRequestError);
  });

  it('Should return BadRequestError when description length is lass than minumun.', async () => {
    const response = sut.exec({
      ...fakeInput,
      description: MakeText(ItemEntity.Settings.minDescriptionLength - 1),
    });
    await expect(response).rejects.toThrowError(BadRequestError);
  });

  it('Should return BadRequestError when sale_price is lass than one', async () => {
    const response = sut.exec({
      ...fakeInput,
      sale_price: 0,
    });
    await expect(response).rejects.toThrowError(BadRequestError);
  });

  it('Should return BadRequestError when buy_price is lass than one', async () => {
    const response = sut.exec({
      ...fakeInput,
      buy_price: 0,
    });
    await expect(response).rejects.toThrowError(BadRequestError);
  });

  it('Should return BadRequestError when company not found', async () => {
    companyRepository.findById.mockResolvedValueOnce(null);
    const response = sut.exec(fakeInput);
    await expect(response).rejects.toThrowError(BadRequestError);
  });

  it('Should return BadRequestError when item name has record.', async () => {
    companyRepository.findById.mockResolvedValueOnce(fakeCompany);
    inventoryRepository.findByName.mockResolvedValue(fakeInput);

    const response = sut.exec(fakeInput);
    await expect(response).rejects.toThrowError(BadRequestError);
  });

  it('Should return null when insert product failed.', async () => {
    companyRepository.findById.mockResolvedValueOnce(fakeCompany);
    inventoryRepository.findByName.mockResolvedValue(null);
    inventoryRepository.create.mockResolvedValueOnce(null);
    const response = await sut.exec({
      ...fakeInput,
      type: 'product',
    });
    expect(response).toBe(null);
  });

  it('Should return null when insert service failed.', async () => {
    companyRepository.findById.mockResolvedValueOnce(fakeCompany);
    inventoryRepository.findByName.mockResolvedValue(null);
    inventoryRepository.create.mockResolvedValueOnce(null);
    const response = await sut.exec({
      ...fakeInput,
      type: 'service',
    });
    expect(response).toBe(null);
  });

  it('Should return fakeInput with id when insert sucess service.', async () => {
    const Output = { id: '123123' };
    const service: ServiceEntity = {
      ...fakeInput,
      type: 'service',
    };
    companyRepository.findById.mockResolvedValueOnce(fakeCompany);
    inventoryRepository.generateId.mockReturnValue(Output.id);
    inventoryRepository.findByName.mockResolvedValue(null);
    inventoryRepository.create.mockResolvedValueOnce(Output);
    const response = await sut.exec(service);
    expect(response).toEqual(
      expect.objectContaining({
        ...service,
        id: Output.id,
      })
    );
  });

  it('Should return fakeInput with id when insert product sucess.', async () => {
    const Output = { id: '123123' };
    const product: ServiceEntity = fakeInput;
    companyRepository.findById.mockResolvedValueOnce(fakeCompany);
    inventoryRepository.generateId.mockReturnValue(Output.id);
    inventoryRepository.findByName.mockResolvedValue(null);
    inventoryRepository.create.mockResolvedValueOnce(Output);
    const response = await sut.exec(product);
    expect(response).toEqual(
      expect.objectContaining({
        ...product,
        id: Output.id,
      })
    );
  });
});
