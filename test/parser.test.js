import request from 'supertest';
import { parser } from '../lib/parser.js';

describe('takes a http request object and returns a parsed body', () => {
  it('should return null if a method is not POST, PUT, or PATCH', async () => {
    const res = await request(parser).get('/');

    expect(res.status).toEqual(404);
  });
  it('throws error if content-type is not application/json', async () => {
    const newObject = { body: 'hello-world', status: 200, contentType: 'text/plain' };
    const res = await request(parser).send(newObject);

    expect(res.status).toEqual(404);
  });
  it('returns a deserialized body from req emitted events', async () => {
    const res = await request(parser);

    expect(res.body).toEqual();
  });
  it('throws an error if failure happens in deserialization', async () => {
    const res = await request(parser);

    expect(res.status).toEqual(404);

  });
});
