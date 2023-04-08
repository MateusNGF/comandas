import { mock, MockProxy } from 'jest-mock-extended';
import { ArchivateEventData } from '../ArchivateEvent.data';
import { iArchivateEvent } from '../../../../../src/domain/usecases/events';
import { iEventRepository } from '../../../../../src/infra/database/contracts/repositorys';

describe('Archived event', () => {
  let sut: iArchivateEvent;

  let eventRepository: MockProxy<iEventRepository>;

  let fakeRequest: iArchivateEvent.input;

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
});
