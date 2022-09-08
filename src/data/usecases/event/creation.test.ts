import { Company, Event } from '@/src/domain/entities';
import {
  MissingParamError,
  UnauthorizedError,
} from '../../../../src/domain/errors';
import { iCreationEvent } from '@/src/domain/usecases/events';
import { CreationEventData } from './creation.data';
import { mock, MockProxy } from 'jest-mock-extended';
import {
  iCompanyRepository,
  iEventRepository,
} from '@/src/infra/database/contracts/repositorys';

describe('Creation Event', () => {
  let sut: iCreationEvent;

  let companyRepositorySpy: MockProxy<iCompanyRepository>;
  let eventRepositorySpy: MockProxy<iEventRepository>;

  let fakeCompany: Company;
  let fakeEvent: Event;
  let fakeBody: iCreationEvent.input;

  beforeAll(() => {
    companyRepositorySpy = mock();
    eventRepositorySpy = mock();
  });
  beforeEach(() => {
    sut = new CreationEventData(companyRepositorySpy, eventRepositorySpy);

    fakeEvent = {
      name: 'fake_event',
      description: 'fake_description',
      startData: 'any_data',
      endData: 'any_data',
    };

    fakeCompany = {
      _id: 'any_id',
      name_fantasy: 'any_name',
      cnpj: 'any_cnpj',
      email: 'any_email',
      password: 'any_password',
    };

    fakeBody = {
      companyId: 'any_id_company',
      event: fakeEvent,
    };
  });

  it('Should return error if companyId has missing.', async () => {
    delete fakeBody.companyId;
    const response = sut.exec(fakeBody);
    await expect(response).rejects.toThrow(
      new UnauthorizedError('CompanyId required.')
    );
  });

  it('Should return error if event is missing.', async () => {
    delete fakeBody.event;
    const response = sut.exec(fakeBody);
    await expect(response).rejects.toThrow(
      new MissingParamError('Missing event.')
    );
  });

  it('Should return error if companyId not has registered.', async () => {
    companyRepositorySpy.findById.mockResolvedValue(null);
    const response = sut.exec(fakeBody);

    await expect(response).rejects.toThrow(
      new UnauthorizedError('Company not found.')
    );
  });

  it('Should returun undefined if register event failed.', async () => {
    companyRepositorySpy.findById.mockResolvedValue(fakeCompany);
    eventRepositorySpy.register.mockResolvedValue(null);

    const response = await sut.exec(fakeBody);

    expect(response).toBe(undefined);
  });
});
