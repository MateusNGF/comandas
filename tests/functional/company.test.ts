describe('Company access functional test', () => {
  it('should return a token then credentias valid', async () => {
    const { body, status } = await global.testRequest.get(
      '/api/company/access'
    );

    expect(status).toBe(200);
    expect(body).toEqual({ token: 'valid token' });
  });
});
