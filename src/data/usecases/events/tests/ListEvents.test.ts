import { mock, MockProxy } from 'jest-mock-extended';
import { BadRequestError } from '../../../../domain/errors';
import { iListEventsUsecase } from '../../../../domain/usecases/events';
import { iEventRepository } from '../../../../infra/database/contracts/repositorys';
import { ListEventsData } from '../ListEvents.data';

describe('Archived event', () => {
  let sut: iListEventsUsecase;

  let eventRepository: MockProxy<iEventRepository>;

  let fakeInput: iListEventsUsecase.Input;
  let fakeListEvents: iListEventsUsecase.Output;

  beforeAll(() => {
    eventRepository = mock();
  });

  beforeEach(() => {
    sut = new ListEventsData(eventRepository);

    fakeInput = {
      companyId: 'any_companyId',
      filters: {},
    };

    fakeListEvents = [
      {
        id: 'ID1',
        name: 'Teste1',
        start_date: new Date('12/12/2002'),
        end_date: new Date('13/12/2002'),
        company_id: fakeInput.companyId,
      },
      {
        id: 'ID2',
        name: 'Teste2',
        start_date: new Date('5/12/2002'),
        end_date: new Date('8/12/2002'),
        company_id: fakeInput.companyId,
      },
      {
        id: 'ID3',
        name: 'Teste3',
        start_date: new Date('10/12/2002'),
        end_date: new Date('15/12/2002'),
        company_id: fakeInput.companyId,
      },
    ];
  });

  it('Should return BadRequestError when company_id not is null.', async () => {
    fakeInput.companyId = null;
    const result = sut.exec(fakeInput);
    await expect(result).rejects.toThrow(
      new BadRequestError('Missing company id')
    );
  });

  it('Should return empty list when company_id not has event.', async () => {
    eventRepository.list.mockResolvedValue([]);
    const result = await sut.exec(fakeInput);
    expect(result).toEqual([]);
  });

  it('Should return list of event when company has records events.', async () => {
    eventRepository.list.mockResolvedValue(fakeListEvents);
    const result = await sut.exec(fakeInput);
    expect(result).toEqual(fakeListEvents);
  });
});
