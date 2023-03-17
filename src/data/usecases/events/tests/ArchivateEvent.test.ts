import { MissingParamError } from '../../../../domain/errors';
import { mock, MockProxy } from 'jest-mock-extended';
import { ArchivateEventData } from '../ArchivateEvent.data';
import { iArchivateEvent } from '../../../../../src/domain/usecases/events';
import { iEventRepository } from '../../../../../src/infra/database/contracts/repositorys';

describe('Archived event', () => {
  let sut: iArchivateEvent;

  let eventRepository: MockProxy<iEventRepository>;

  let fakeRequest: iArchivateEvent.input;
  let fakeResponse: iArchivateEvent.output;

  beforeAll(() => {
    eventRepository = mock();
  });

  beforeEach(() => {
    sut = new ArchivateEventData(eventRepository);

    fakeRequest = {
      companyId: 'any_companyId',
      eventId: 'any_eventId',
      action: 'archive',
    };
  });

  it('Should return false if archive document failed.', async () => {
    eventRepository.archive.mockResolvedValue(undefined);

    const response = await sut.exec(fakeRequest);
    expect(response).toBe(false);
  });

  it('Should return false if unarchive document failed.', async () => {
    fakeRequest.action = 'unarchive';

    eventRepository.unarchive.mockResolvedValue(undefined);

    const response = await sut.exec(fakeRequest);
    expect(response).toBe(false);
  });

  it('Should return true if unarchive document success.', async () => {
    fakeRequest.action = 'unarchive';

    eventRepository.unarchive.mockResolvedValue(true);

    const response = await sut.exec(fakeRequest);
    expect(response).toBe(true);
  });

  it('Should return true if archive document success.', async () => {
    fakeRequest.action = 'archive';

    eventRepository.archive.mockResolvedValue(true);

    const response = await sut.exec(fakeRequest);
    expect(response).toBe(true);
  });

  it('Should return MissingParamError if companyId is missing.', async () => {
    delete fakeRequest.companyId;

    const response = sut.exec(fakeRequest);

    await expect(response).rejects.toThrow(new MissingParamError('companyId'));
  });

  it('Should return MissingParamError if eventId is missing.', async () => {
    delete fakeRequest.eventId;

    const response = sut.exec(fakeRequest);

    await expect(response).rejects.toThrow(new MissingParamError('eventId'));
  });

  it('Should return MissingParamError if action is missing.', async () => {
    delete fakeRequest.action;

    const response = sut.exec(fakeRequest);

    await expect(response).rejects.toThrow(new MissingParamError('action'));
  });
});
