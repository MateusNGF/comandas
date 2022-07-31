import supertest from "supertest"
import AppExpress from '@src/main/config/appExpress'

describe("Beach forecast functional test", () => {
  it('should return a forecast with just a few times', async () => {
    const {body, status} = await supertest(await AppExpress.init()).get('/api/company/access');

    expect(status).toBe(200)
    expect(body).toEqual({ ok : 1})
  })
})