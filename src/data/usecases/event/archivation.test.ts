import { MissingParamError, UnauthorizedError } from "../../../../src/domain/errors"
import { iArchivationEvent } from "../../../../src/domain/usecases/events"
import { iEventRepository } from "../../../../src/infra/database/contracts/repositorys"
import { mock, MockProxy } from "jest-mock-extended"
import { ArchivationEventData } from "./archivation.data"

describe("Archived event", () => {
  let sut : iArchivationEvent

  let eventRepository : MockProxy<iEventRepository>

  let fakeRequest : iArchivationEvent.input
  let fakeResponse : iArchivationEvent.output

  beforeAll(() => {
    eventRepository = mock()
  })

  beforeEach(() => {
    sut = new ArchivationEventData(
      eventRepository
    )
  
    fakeRequest = {
      companyId : "any_companyId",
      eventId : "any_eventId"
    }

    fakeResponse = {
      archived : false
    }

  })

  it("Should return undefined if update document failed.", async () => {
    eventRepository.archive.mockResolvedValue(null)

    const response = await sut.exec(fakeRequest)
    expect(response).toBe(undefined)
  })

  it("Should return MissingParamError if companyId is missing.", async () => {
    delete fakeRequest.companyId

    const response = sut.exec(fakeRequest)

    await expect(response).rejects.toThrow(
      new MissingParamError("companyId")
    );
  })

  it("Should return MissingParamError if eventId is missing.", async () => {
    delete fakeRequest.eventId

    const response = sut.exec(fakeRequest)

    await expect(response).rejects.toThrow(
      new MissingParamError("eventId")
    );
  })
})