import request from 'supertest';

const baseUrl = 'http://localhost:3000';

describe('API Endpoints', () => {
  it('GET / returns { status: "success" }', async () => {
    const res = await request(baseUrl).get('/');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'success' });
  });
});