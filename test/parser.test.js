import request from 'supertest';
import { parser } from '../lib/app.js';

describe('takes a http request object and returns a parsed body', () => {
  it('should return null if a method is not POST, PUT, or PATCH', async () => {
    const value = await parser({ method: 'GET' });

    expect(value).toEqual(null);
  });
  it('throws error if content-type is not application/json', async () => {
    const newObject = { method: 'POST', body: 'hello-world', status: 200, contentType: 'text/plain' };
    const res = await parser(newObject);

    expect(res.status).toEqual(404);
  });
  xit('returns a deserialized body from req emitted events', async () => {
    const res = await request(parser);

    expect(res.body).toEqual();
  });
  xit('throws an error if failure happens in deserialization', async () => {
    const res = await request(parser);

    expect(res.status).toEqual(404);
  });
});
