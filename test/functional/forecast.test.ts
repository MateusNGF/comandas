describe('Beach forecast functional test', () => {
  it('should return a forecast with just a few times', async () => {
    const { body, status } = await global.testRequest.get(
      '/api/company/access'
    );

    expect(status).toBe(200);
    expect(body).toEqual({ ok: 1 });
  });
});
