import AppExpress from '../src/main/apps/appExpress';
import supertest from 'supertest';

beforeAll(async () => {
  const app = await AppExpress.init();
  global.testRequest = supertest(app);
});

afterAll(async () => {
  await AppExpress.close();
});
