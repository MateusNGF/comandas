import { mock, MockProxy } from 'jest-mock-extended';
import { CompanyEntity } from '../../../../domain/entities';
import { BadRequestError } from '../../../../domain/errors';
import { iCreateOrderUsecase } from '../../../../domain/usecases/orders';
import { iDatabase } from '../../../../infra/database/contracts';
import {
  iCompanyRepository,
  iEventRepository,
  iOrderRepository,
} from '../../../../infra/database/contracts/repositorys';
import { CreateOrderData } from '../CreateOrder.data';
import { iOutputProductUsecase } from 'src/domain/usecases/inventory';

describe('CreateOrderData testings', () => {
  let sut: iCreateOrderUsecase;

  let sessionDatabase: MockProxy<iDatabase.iSession>;
  let orderRepository: MockProxy<iOrderRepository>;
  let companyRepository: MockProxy<iCompanyRepository>;
  let eventRepository: MockProxy<iEventRepository>;
  let outputProductUsecase: MockProxy<iOutputProductUsecase>;

  let fakeOrderRequest: iCreateOrderUsecase.Input;
  let fakeCompany: CompanyEntity;
  let generatedOrderId: string;

  beforeAll(() => {
    sessionDatabase = mock();
    eventRepository = mock();
    companyRepository = mock();
    outputProductUsecase = mock();
    orderRepository = mock();
  });

  beforeEach(() => {
    sut = new CreateOrderData(
      sessionDatabase,
      orderRepository,
      companyRepository,
      eventRepository,
      outputProductUsecase
    );

    fakeOrderRequest = {
      company_id: '123123',
      itens: [
        {
          id: '123',
          quantity: 2,
          name: '123P',
          type: 'product',
          sale_price: 12,
        },
      ],
    };

    fakeCompany = {
      id: '1',
      cnpj: '123321',
      email: '123@123',
      name_fantasy: 'teste 123',
      timezone: null,
    };

    generatedOrderId = '123123';

    sessionDatabase.startSession.mockImplementation(() => sessionDatabase);
    companyRepository.findById.mockResolvedValue(fakeCompany);
    orderRepository.generateId.mockReturnValue(generatedOrderId);
    orderRepository.create.mockResolvedValue({ id: generatedOrderId });
  });

  describe('Testing without associeted event.', () => {
    it('Should return BadRequestError when company not found.', async () => {
      companyRepository.findById.mockResolvedValue(null);
      const result = sut.exec(fakeOrderRequest);
      await expect(result).rejects.toThrow(
        new BadRequestError(
          `Company not found with ${fakeOrderRequest.company_id}.`
        )
      );
    });

    it('Should return BadRequestError when itens for order is empty.', async () => {
      fakeOrderRequest.itens = [];
      const result = sut.exec(fakeOrderRequest);
      await expect(result).rejects.toThrow(
        new BadRequestError(`Need one item for create Order.`)
      );
    });

    it('Should return BadRequestError when Order create failed.', async () => {
      orderRepository.create.mockResolvedValue(null);
      const result = sut.exec(fakeOrderRequest);
      await expect(result).rejects.toThrow(
        new BadRequestError(`Failed create order, try laiter.`)
      );
    });

    it('Should return same id of generate id when all process sucess.', async () => {
      const result = await sut.exec(fakeOrderRequest);
      expect(result).toMatchObject({
        id: generatedOrderId,
      });
    });
  });

  describe('Testing with associeted event.', () => {
    let event_id: string;

    beforeEach(() => {
      event_id = 'event_id_valid';

      fakeOrderRequest.event_id = event_id;

      eventRepository.findById.mockResolvedValue({ id: event_id } as any);
    });

    it('Should return BadRequestError when event not found.', async () => {
      fakeOrderRequest.event_id = 'event_id_invalid';

      eventRepository.findById.mockResolvedValue(null);

      const result = sut.exec(fakeOrderRequest);
      await expect(result).rejects.toThrow(
        new BadRequestError(
          `Event not found with ${fakeOrderRequest.event_id}.`
        )
      );
    });

    it('Should return same id of generate id when all process sucess and associted event.', async () => {
      const result = await sut.exec(fakeOrderRequest);
      expect(result).toMatchObject({
        id: generatedOrderId,
      });
    });
  });
});
