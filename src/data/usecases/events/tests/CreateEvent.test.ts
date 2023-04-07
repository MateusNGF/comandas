import { CompanyEntity, EventEntity } from '../../../../../src/domain/entities';
import { BadRequestError } from '../../../../domain/errors';
import { CreateEventData } from '../CreateEvent.data';
import { mock, MockProxy } from 'jest-mock-extended';
import {
  iCompanyRepository,
  iEventRepository,
} from '../../../../infra/database/contracts/repositorys';
import { iCreateEventUsecase } from '../../../../domain/usecases/events';
import { iDatabase } from '../../../../../src/infra/database/contracts';

describe('Creation Event', () => {
  let sut: iCreateEventUsecase;

  let sessionDatabase: MockProxy<iDatabase.iSession>;
  let companyRepositorySpy: MockProxy<iCompanyRepository>;
  let eventRepositorySpy: MockProxy<iEventRepository>;

  let fakeCompany: CompanyEntity;
  let fakeEvent: EventEntity;

  beforeAll(() => {
    sessionDatabase = mock();
    companyRepositorySpy = mock();
    eventRepositorySpy = mock();
  });
  beforeEach(() => {
    sessionDatabase.startSession.mockReturnValue(sessionDatabase);

    sut = new CreateEventData(
      sessionDatabase,
      companyRepositorySpy,
      eventRepositorySpy
    );

    fakeCompany = {
      id: 'any_id',
      name_fantasy: 'any_name',
      timezone: null,
      cnpj: 'any_cnpj',
      email: 'any_email',
    };

    fakeEvent = {
      name: 'fake_event',
      description: 'fake_description',
      company_id: fakeCompany.id,
      start_date: new Date('2024/02/12'),
      end_date: new Date('2024/02/15'),
    };
  });

  it('Should returun BadRequestError if start_date is before end_date.', async () => {
    fakeEvent = {
      ...fakeEvent,
      start_date: new Date('2023/03/2'),
      end_date: new Date('2023/03/1'),
    };
    const response = sut.exec(fakeEvent);
    await expect(response).rejects.toThrow(
      new BadRequestError(
        'The start date cannot be equal to or after the end date of the event.'
      )
    );
  });

  it('Should return UnauthorizedError if companyId not has registered.', async () => {
    companyRepositorySpy.findById.mockResolvedValue(null);
    const response = sut.exec(fakeEvent);

    await expect(response).rejects.toThrow(
      new BadRequestError('Company not found.')
    );
  });

  it('Should returun BadRequestError if register event failed.', async () => {
    companyRepositorySpy.findById.mockResolvedValue(fakeCompany);
    eventRepositorySpy.register.mockResolvedValue(null);

    const response = sut.exec(fakeEvent);
    await expect(response).rejects.toThrow(
      new BadRequestError('Failed create event, try latey.')
    );
  });

  it('Should returun recorded event when sucess register.', async () => {
    const output = {
      id: '123123',
    };
    companyRepositorySpy.findById.mockResolvedValue(fakeCompany);
    eventRepositorySpy.generateId.mockReturnValue(output.id);
    eventRepositorySpy.register.mockResolvedValue(output);

    const response = await sut.exec(fakeEvent);
    expect(response).toMatchObject({
      ...fakeEvent,
      id: output.id,
    });
  });
});
